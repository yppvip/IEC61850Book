(function () {
  'use strict';

  const ETHERNET_LINKTYPE = 1;
  const MAX_FRAMES = 200000;
  const state = { frames: [], diagnostics: [], selected: null };
  const captureInput = document.querySelector('#capture-file');
  const status = document.querySelector('#parser-status');
  const summary = document.querySelector('#parser-summary');
  const frameList = document.querySelector('#frame-list');
  const frameDetail = document.querySelector('#frame-detail');
  const signalList = document.querySelector('#signal-list');
  const diagnosticList = document.querySelector('#diagnostic-list');

  const escapeHtml = value => String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
  const hex = value => `0x${Number(value).toString(16).padStart(4, '0').toUpperCase()}`;
  const mac = bytes => Array.from(bytes, value => value.toString(16).padStart(2, '0')).join(':');
  const hexBytes = bytes => Array.from(bytes, value => value.toString(16).padStart(2, '0')).join(' ');
  const timeText = timestamp => new Date(timestamp).toLocaleString('zh-CN', { hour12: false }) + `.${String(Math.floor((timestamp % 1) * 1000)).padStart(3, '0')}`;

  function addDiagnostic(message, frameNumber) {
    state.diagnostics.push({ message, frameNumber });
  }

  function readPcap(buffer) {
    if (buffer.byteLength < 24) throw new Error('PCAP 文件小于全局头长度（24 字节）。');
    const bytes = new Uint8Array(buffer);
    const magic = Array.from(bytes.slice(0, 4)).map(value => value.toString(16).padStart(2, '0')).join('');
    const formats = {
      'a1b2c3d4': { littleEndian: false, nanoseconds: false },
      'd4c3b2a1': { littleEndian: true, nanoseconds: false },
      'a1b23c4d': { littleEndian: false, nanoseconds: true },
      '4d3cb2a1': { littleEndian: true, nanoseconds: true }
    };
    const format = formats[magic];
    if (!format) throw new Error(`不是受支持的经典 PCAP 魔数：0x${magic}。`);
    const view = new DataView(buffer);
    const linkType = view.getUint32(20, format.littleEndian);
    if (linkType !== ETHERNET_LINKTYPE) addDiagnostic(`PCAP 链路类型为 ${linkType}，当前阶段仅完整支持 Ethernet（1）。`);
    const frames = [];
    let offset = 24;
    while (offset < buffer.byteLength) {
      if (frames.length >= MAX_FRAMES) {
        addDiagnostic(`为保护浏览器性能，仅加载前 ${MAX_FRAMES} 帧。`);
        break;
      }
      if (offset + 16 > buffer.byteLength) {
        addDiagnostic(`PCAP 记录头在偏移 ${offset} 截断。`);
        break;
      }
      const seconds = view.getUint32(offset, format.littleEndian);
      const fraction = view.getUint32(offset + 4, format.littleEndian);
      const capturedLength = view.getUint32(offset + 8, format.littleEndian);
      const originalLength = view.getUint32(offset + 12, format.littleEndian);
      const dataStart = offset + 16;
      const dataEnd = dataStart + capturedLength;
      if (dataEnd > buffer.byteLength) {
        addDiagnostic(`第 ${frames.length + 1} 帧声明长度 ${capturedLength}，但文件在偏移 ${buffer.byteLength} 截断。`, frames.length + 1);
        break;
      }
      const milliseconds = seconds * 1000 + fraction / (format.nanoseconds ? 1000000 : 1000);
      frames.push({ number: frames.length + 1, timestamp: milliseconds, bytes: bytes.slice(dataStart, dataEnd), capturedLength, originalLength, linkType });
      offset = dataEnd;
    }
    return frames;
  }

  function readPcapng(buffer) {
    if (buffer.byteLength < 28) throw new Error('PCAPNG 文件小于 Section Header Block 最小长度。');
    const bytes = new Uint8Array(buffer);
    const view = new DataView(buffer);
    const frames = [];
    const interfaces = [];
    let offset = 0;
    let littleEndian;
    const readBlockLength = start => view.getUint32(start + 4, littleEndian);
    const paddedLength = length => (length + 3) & ~3;

    while (offset + 12 <= buffer.byteLength) {
      const typeBytes = hexBytes(bytes.slice(offset, offset + 4)).replaceAll(' ', '').toLowerCase();
      if (typeBytes === '0a0d0d0a') {
        if (offset + 12 > buffer.byteLength) throw new Error(`PCAPNG Section Header 在偏移 ${offset} 截断。`);
        const bom = hexBytes(bytes.slice(offset + 8, offset + 12)).replaceAll(' ', '').toLowerCase();
        if (bom === '4d3c2b1a') littleEndian = true;
        else if (bom === '1a2b3c4d') littleEndian = false;
        else throw new Error(`PCAPNG Section Header 的字节序魔数无效：0x${bom}。`);
        const length = readBlockLength(offset);
        if (length < 28 || offset + length > buffer.byteLength || view.getUint32(offset + length - 4, littleEndian) !== length) throw new Error(`PCAPNG Section Header 在偏移 ${offset} 的块长度无效。`);
        interfaces.length = 0;
        offset += length;
        continue;
      }
      if (littleEndian === undefined) throw new Error('PCAPNG 缺少 Section Header Block。');
      const blockType = view.getUint32(offset, littleEndian);
      const blockLength = readBlockLength(offset);
      if (blockLength < 12 || offset + blockLength > buffer.byteLength || view.getUint32(offset + blockLength - 4, littleEndian) !== blockLength) {
        throw new Error(`PCAPNG 块在偏移 ${offset} 的长度无效或截断。`);
      }
      if (blockType === 1) {
        if (blockLength < 20) { addDiagnostic(`PCAPNG Interface Description Block 在偏移 ${offset} 过短。`); }
        else {
          const linkType = view.getUint16(offset + 8, littleEndian);
          let timestampResolution = 0.000001;
          let optionOffset = offset + 16;
          const optionEnd = offset + blockLength - 4;
          while (optionOffset + 4 <= optionEnd) {
            const code = view.getUint16(optionOffset, littleEndian);
            const optionLength = view.getUint16(optionOffset + 2, littleEndian);
            if (code === 0) break;
            if (optionOffset + 4 + optionLength > optionEnd) { addDiagnostic(`PCAPNG 接口选项在偏移 ${optionOffset} 截断。`); break; }
            if (code === 9 && optionLength === 1) {
              const value = bytes[optionOffset + 4];
              timestampResolution = value & 0x80 ? Math.pow(2, -(value & 0x7f)) : Math.pow(10, -value);
            }
            optionOffset += 4 + paddedLength(optionLength);
          }
          interfaces.push({ linkType, timestampResolution });
        }
      } else if (blockType === 6) {
        if (blockLength < 32) { addDiagnostic(`PCAPNG Enhanced Packet Block 在偏移 ${offset} 过短。`); }
        else if (frames.length >= MAX_FRAMES) { addDiagnostic(`为保护浏览器性能，仅加载前 ${MAX_FRAMES} 帧。`); break; }
        else {
          const interfaceId = view.getUint32(offset + 8, littleEndian);
          const timestampHigh = view.getUint32(offset + 12, littleEndian);
          const timestampLow = view.getUint32(offset + 16, littleEndian);
          const capturedLength = view.getUint32(offset + 20, littleEndian);
          const originalLength = view.getUint32(offset + 24, littleEndian);
          const dataStart = offset + 28;
          if (dataStart + capturedLength > offset + blockLength - 4) addDiagnostic(`PCAPNG 第 ${frames.length + 1} 帧的捕获长度越过块边界。`, frames.length + 1);
          else {
            const iface = interfaces[interfaceId];
            if (!iface) addDiagnostic(`PCAPNG 第 ${frames.length + 1} 帧引用不存在的接口 ${interfaceId}。`, frames.length + 1);
            const ticks = timestampHigh * 4294967296 + timestampLow;
            frames.push({ number: frames.length + 1, timestamp: iface ? ticks * iface.timestampResolution * 1000 : 0, bytes: bytes.slice(dataStart, dataStart + capturedLength), capturedLength, originalLength, linkType: iface?.linkType ?? -1 });
          }
        }
      }
      offset += blockLength;
    }
    return frames;
  }

  function readTlv(bytes, offset, limit) {
    if (offset >= limit) throw new Error('TLV 缺少 Tag。');
    const tag = bytes[offset++];
    if ((tag & 0x1f) === 0x1f) throw new Error(`暂不支持高 Tag 编号（偏移 ${offset - 1}）。`);
    if (offset >= limit) throw new Error('TLV 缺少 Length。');
    const lengthByte = bytes[offset++];
    let length;
    if (lengthByte < 0x80) length = lengthByte;
    else {
      const count = lengthByte & 0x7f;
      if (!count || count > 4 || offset + count > limit) throw new Error(`BER Length 在偏移 ${offset - 1} 无效。`);
      length = 0;
      for (let index = 0; index < count; index++) length = length * 256 + bytes[offset++];
    }
    const valueStart = offset;
    const valueEnd = valueStart + length;
    if (valueEnd > limit) throw new Error(`BER TLV 在偏移 ${valueStart} 声明长度 ${length}，越过父容器边界。`);
    return { tag, length, valueStart, valueEnd, nextOffset: valueEnd };
  }

  function unsigned(bytes) {
    let value = 0;
    for (const byte of bytes) value = value * 256 + byte;
    return Number.isSafeInteger(value) ? String(value) : `0x${hexBytes(bytes).replaceAll(' ', '')}`;
  }

  function signed(bytes) {
    if (!bytes.length) return '0';
    let value = 0;
    for (const byte of bytes) value = value * 256 + byte;
    if (bytes[0] & 0x80) value -= Math.pow(256, bytes.length);
    return Number.isSafeInteger(value) ? String(value) : `0x${hexBytes(bytes).replaceAll(' ', '')}`;
  }

  function text(bytes) { return new TextDecoder('ascii', { fatal: false }).decode(bytes); }

  function decodeDataValue(bytes, tlv) {
    const value = bytes.slice(tlv.valueStart, tlv.valueEnd);
    if (tlv.tag === 0x83) return { value: value.some(byte => byte !== 0) ? 'true' : 'false', quality: '—' };
    if (tlv.tag === 0x84) return { value: `BIT STRING ${hexBytes(value)}`, quality: '原始位串' };
    if (tlv.tag === 0x85) return { value: signed(value), quality: '—' };
    if (tlv.tag === 0x86) return { value: unsigned(value), quality: '—' };
    if (tlv.tag === 0x89) return { value: text(value), quality: '—' };
    return { value: `Tag ${hex(tlv.tag)}: ${hexBytes(value)}`, quality: '原始 TLV' };
  }

  function readAppIdHeader(bytes, offset) {
    if (offset + 8 > bytes.length) throw new Error('IEC 61850 二层应用头不足 8 字节。');
    const appid = (bytes[offset] << 8) | bytes[offset + 1];
    const length = (bytes[offset + 2] << 8) | bytes[offset + 3];
    if (length < 8) throw new Error(`APPID ${hex(appid)} 的 Length=${length} 小于固定头。`);
    if (offset + length > bytes.length) throw new Error(`APPID ${hex(appid)} 的 Length=${length} 越过捕获帧边界。`);
    return { appid, length, apduStart: offset + 8, apduEnd: offset + length, reserved1: (bytes[offset + 4] << 8) | bytes[offset + 5], reserved2: (bytes[offset + 6] << 8) | bytes[offset + 7] };
  }

  function parseGoose(bytes, offset) {
    const header = readAppIdHeader(bytes, offset);
    const root = readTlv(bytes, header.apduStart, header.apduEnd);
    if (root.tag !== 0x61 || root.nextOffset !== header.apduEnd) throw new Error('GOOSE APDU 不是完整的 tag 0x61 容器。');
    const names = { 0x80: 'gocbRef', 0x81: 'timeAllowedToLive', 0x82: 'datSet', 0x83: 'goID', 0x84: 't', 0x85: 'stNum', 0x86: 'sqNum', 0x87: 'test', 0x88: 'confRev', 0x89: 'ndsCom', 0x8a: 'numDatSetEntries', 0xab: 'allData' };
    const fields = [
      { name: 'APPID', value: hex(header.appid), offset, length: 2 }, { name: 'Length', value: String(header.length), offset: offset + 2, length: 2 },
      { name: 'Reserved1', value: hex(header.reserved1), offset: offset + 4, length: 2 }, { name: 'Reserved2', value: hex(header.reserved2), offset: offset + 6, length: 2 },
      { name: 'GOOSE PDU', value: 'Tag 0x61', offset: header.apduStart, length: root.nextOffset - header.apduStart }
    ];
    const signals = [];
    let cursor = root.valueStart;
    while (cursor < root.valueEnd) {
      const tlv = readTlv(bytes, cursor, root.valueEnd);
      const value = bytes.slice(tlv.valueStart, tlv.valueEnd);
      const name = names[tlv.tag] || `未知 GOOSE Tag ${hex(tlv.tag)}`;
      if (tlv.tag === 0x80 || tlv.tag === 0x82 || tlv.tag === 0x83) fields.push({ name, value: text(value), offset: cursor, length: tlv.nextOffset - cursor });
      else if ([0x81, 0x85, 0x86, 0x88, 0x8a].includes(tlv.tag)) fields.push({ name, value: unsigned(value), offset: cursor, length: tlv.nextOffset - cursor });
      else if ([0x87, 0x89].includes(tlv.tag)) fields.push({ name, value: value.some(byte => byte !== 0) ? 'true' : 'false', offset: cursor, length: tlv.nextOffset - cursor });
      else if (tlv.tag === 0x84) fields.push({ name, value: `UTC 时间原始值：${hexBytes(value)}`, offset: cursor, length: tlv.nextOffset - cursor });
      else if (tlv.tag === 0xab) {
        fields.push({ name, value: `${tlv.length} 字节`, offset: cursor, length: tlv.nextOffset - cursor });
        let itemCursor = tlv.valueStart;
        let item = 0;
        while (itemCursor < tlv.valueEnd) {
          const dataTlv = readTlv(bytes, itemCursor, tlv.valueEnd);
          const decoded = decodeDataValue(bytes, dataTlv);
          item++;
          fields.push({ name: `allData 第 ${item} 项`, value: decoded.value, offset: itemCursor, length: dataTlv.nextOffset - itemCursor });
          signals.push({ name: `GOOSE 第 ${item} 项`, value: decoded.value, quality: decoded.quality, mapping: '未导入 SCL', offset: itemCursor });
          itemCursor = dataTlv.nextOffset;
        }
      } else fields.push({ name, value: hexBytes(value), offset: cursor, length: tlv.nextOffset - cursor });
      cursor = tlv.nextOffset;
    }
    return { fields, appid: header.appid, signals };
  }

  function parseSv(bytes, offset) {
    const header = readAppIdHeader(bytes, offset);
    const root = readTlv(bytes, header.apduStart, header.apduEnd);
    if (root.tag !== 0x60 || root.nextOffset !== header.apduEnd) throw new Error('SV APDU 不是完整的 tag 0x60 容器。');
    const fields = [
      { name: 'APPID', value: hex(header.appid), offset, length: 2 }, { name: 'Length', value: String(header.length), offset: offset + 2, length: 2 },
      { name: 'Reserved1', value: hex(header.reserved1), offset: offset + 4, length: 2 }, { name: 'Reserved2', value: hex(header.reserved2), offset: offset + 6, length: 2 },
      { name: 'SV PDU', value: 'Tag 0x60', offset: header.apduStart, length: root.nextOffset - header.apduStart }
    ];
    const signals = [];
    let cursor = root.valueStart;
    while (cursor < root.valueEnd) {
      const tlv = readTlv(bytes, cursor, root.valueEnd);
      if (tlv.tag === 0x80) fields.push({ name: 'noASDU', value: unsigned(bytes.slice(tlv.valueStart, tlv.valueEnd)), offset: cursor, length: tlv.nextOffset - cursor });
      else if (tlv.tag === 0xa2) {
        let asduCursor = tlv.valueStart;
        let asduNumber = 0;
        while (asduCursor < tlv.valueEnd) {
          const asdu = readTlv(bytes, asduCursor, tlv.valueEnd);
          if (asdu.tag !== 0x30) throw new Error(`SV seqASDU 中发现非 Sequence Tag ${hex(asdu.tag)}。`);
          asduNumber++;
          fields.push({ name: `ASDU ${asduNumber}`, value: `${asdu.length} 字节`, offset: asduCursor, length: asdu.nextOffset - asduCursor });
          let fieldCursor = asdu.valueStart;
          while (fieldCursor < asdu.valueEnd) {
            const field = readTlv(bytes, fieldCursor, asdu.valueEnd);
            const value = bytes.slice(field.valueStart, field.valueEnd);
            const labels = { 0x80: 'svID', 0x81: 'datSet', 0x82: 'smpCnt', 0x83: 'confRev', 0x84: 'refrTm', 0x85: 'smpSynch', 0x86: 'smpRate', 0x87: 'sample', 0x88: 'smpMod' };
            const name = `ASDU ${asduNumber} ${labels[field.tag] || `未知 Tag ${hex(field.tag)}`}`;
            let display = hexBytes(value);
            if ([0x80, 0x81].includes(field.tag)) display = text(value);
            else if ([0x82, 0x83, 0x85, 0x86, 0x88].includes(field.tag)) display = unsigned(value);
            fields.push({ name, value: display, offset: fieldCursor, length: field.nextOffset - fieldCursor });
            if (field.tag === 0x87) signals.push({ name: `SV ASDU ${asduNumber} sample`, value: hexBytes(value), quality: '原始 sample；待 SCL 映射', mapping: '未导入 SCL', offset: fieldCursor });
            fieldCursor = field.nextOffset;
          }
          asduCursor = asdu.nextOffset;
        }
      } else fields.push({ name: `未知 SV Tag ${hex(tlv.tag)}`, value: hexBytes(bytes.slice(tlv.valueStart, tlv.valueEnd)), offset: cursor, length: tlv.nextOffset - cursor });
      cursor = tlv.nextOffset;
    }
    return { fields, appid: header.appid, signals };
  }

  function parseEthernet(frame) {
    const bytes = frame.bytes;
    if (frame.linkType !== ETHERNET_LINKTYPE) return { protocol: '未知链路类型', status: '未解析', fields: [] };
    if (bytes.length < 14) return { protocol: '截断 Ethernet', status: '错误', fields: [{ name: '错误', value: '不足 14 字节', offset: 0, length: bytes.length }] };
    let offset = 12;
    let etherType = (bytes[offset] << 8) | bytes[offset + 1];
    offset += 2;
    const vlans = [];
    while ([0x8100, 0x88a8, 0x9100].includes(etherType)) {
      if (offset + 4 > bytes.length) return { protocol: '截断 VLAN', status: '错误', fields: [{ name: '错误', value: 'VLAN Tag 截断', offset, length: bytes.length - offset }] };
      const tci = (bytes[offset] << 8) | bytes[offset + 1];
      vlans.push({ pcp: (tci >> 13) & 7, dei: (tci >> 12) & 1, id: tci & 0x0fff });
      etherType = (bytes[offset + 2] << 8) | bytes[offset + 3];
      offset += 4;
    }
    const protocol = etherType === 0x88b8 ? 'GOOSE（候选）' : etherType === 0x88ba ? 'SV/SMV（候选）' : etherType === 0x0800 ? 'IPv4' : etherType === 0x86dd ? 'IPv6' : `EtherType ${hex(etherType)}`;
    const fields = [
      { name: 'Destination MAC', value: mac(bytes.slice(0, 6)), offset: 0, length: 6 },
      { name: 'Source MAC', value: mac(bytes.slice(6, 12)), offset: 6, length: 6 },
      ...vlans.map((vlan, index) => ({ name: `VLAN ${index + 1}`, value: `ID=${vlan.id}, PCP=${vlan.pcp}, DEI=${vlan.dei}`, offset: 14 + index * 4, length: 4 })),
      { name: 'EtherType', value: hex(etherType), offset: offset - 2, length: 2 }
    ];
    const packet = { protocol, status: etherType === 0x88b8 || etherType === 0x88ba ? 'IEC 61850 候选' : '已识别链路层', source: mac(bytes.slice(6, 12)), destination: mac(bytes.slice(0, 6)), vlans, etherType, payloadOffset: offset, fields, signals: [] };
    try {
      if (etherType === 0x88b8) Object.assign(packet, parseGoose(bytes, offset), { protocol: 'GOOSE', status: '已解析' });
      if (etherType === 0x88ba) Object.assign(packet, parseSv(bytes, offset), { protocol: 'SV/SMV', status: '已解析' });
    } catch (error) {
      if (etherType === 0x88b8 || etherType === 0x88ba) { packet.status = `解析错误：${error.message}`; packet.parseError = error.message; }
    }
    return packet;
  }

  function renderSummary() {
    const counts = state.frames.reduce((result, frame) => { result[frame.packet.protocol] = (result[frame.packet.protocol] || 0) + 1; return result; }, {});
    const first = state.frames[0];
    const last = state.frames.at(-1);
    const metrics = [`总帧数：${state.frames.length}`, `GOOSE 候选：${counts['GOOSE（候选）'] || 0}`, `SV 候选：${counts['SV/SMV（候选）'] || 0}`, `诊断：${state.diagnostics.length}`];
    if (first && last) metrics.splice(1, 0, `时间范围：${timeText(first.timestamp)} 至 ${timeText(last.timestamp)}`);
    summary.innerHTML = metrics.map(metric => `<span>${escapeHtml(metric)}</span>`).join('');
  }

  function renderFrames() {
    if (!state.frames.length) { frameList.innerHTML = '<tr><td colspan="7">未从文件中读取到帧。</td></tr>'; return; }
    frameList.innerHTML = state.frames.map(frame => {
      const packet = frame.packet;
      const vlan = packet.vlans?.map(item => item.id).join(', ') || '—';
      return `<tr data-frame="${frame.number}"><td>${frame.number}</td><td>${escapeHtml(timeText(frame.timestamp))}</td><td>${escapeHtml(packet.protocol)}</td><td>${escapeHtml(packet.source ? `${packet.source} → ${packet.destination}` : '—')}</td><td>${escapeHtml(vlan)}</td><td>${packet.appid === undefined ? '—' : escapeHtml(hex(packet.appid))}</td><td>${escapeHtml(packet.status)}</td></tr>`;
    }).join('');
  }

  function selectFrame(number) {
    const frame = state.frames.find(item => item.number === number);
    if (!frame) return;
    state.selected = number;
    document.querySelectorAll('[data-frame]').forEach(row => row.classList.toggle('selected', Number(row.dataset.frame) === number));
    const packet = frame.packet;
    const fields = packet.fields.map(field => `<tr><td>${escapeHtml(field.name)}</td><td>${escapeHtml(field.value)}</td><td>${field.offset}</td><td>${field.length}</td></tr>`).join('');
    frameDetail.className = '';
    frameDetail.innerHTML = `<p><b>第 ${frame.number} 帧</b> · ${escapeHtml(timeText(frame.timestamp))} · 捕获 ${frame.capturedLength} 字节（原始 ${frame.originalLength} 字节）</p><div class="table-wrap"><table><thead><tr><th>字段</th><th>值</th><th>偏移</th><th>长度</th></tr></thead><tbody>${fields}</tbody></table></div><h3>原始字节</h3><pre class="map">${escapeHtml(hexBytes(frame.bytes))}</pre>`;
  }

  function renderDiagnostics() {
    const packetErrors = state.frames.filter(frame => frame.packet.parseError).map(frame => ({ frameNumber: frame.number, message: frame.packet.parseError }));
    const items = [...state.diagnostics, ...packetErrors];
    diagnosticList.innerHTML = items.length ? items.map(item => `<li>${item.frameNumber ? `第 ${item.frameNumber} 帧：` : ''}${escapeHtml(item.message)}</li>`).join('') : '<li>未发现结构或协议解析诊断。</li>';
  }

  function renderSignals() {
    const rows = state.frames.flatMap(frame => frame.packet.signals.map(signal => ({ ...signal, frame })));
    signalList.innerHTML = rows.length ? rows.map(row => `<tr><td>${escapeHtml(row.name)}</td><td>${escapeHtml(timeText(row.frame.timestamp))}</td><td>${escapeHtml(row.value)}</td><td>${escapeHtml(row.quality)}</td><td>${row.frame.number}</td><td>${escapeHtml(row.mapping)}</td></tr>`).join('') : '<tr><td colspan="6">尚未解析出 GOOSE / SV 数据项。</td></tr>';
  }

  async function loadCapture(file) {
    state.frames = [];
    state.diagnostics = [];
    state.selected = null;
    status.textContent = `正在读取 ${file.name}…`;
    try {
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      const magic = hexBytes(bytes.slice(0, 4)).replaceAll(' ', '').toLowerCase();
      state.frames = magic === '0a0d0d0a' ? readPcapng(buffer) : readPcap(buffer);
      state.frames.forEach(frame => { frame.packet = parseEthernet(frame); });
      status.textContent = `已离线读取 ${file.name}：${state.frames.length} 帧。`;
    } catch (error) {
      addDiagnostic(error.message);
      status.textContent = `无法解析 ${file.name}：${error.message}`;
    }
    renderSummary();
    renderFrames();
    renderSignals();
    renderDiagnostics();
    frameDetail.className = 'empty';
    frameDetail.textContent = '选择一帧后显示协议字段、字节偏移和原始数据。';
  }

  captureInput.addEventListener('change', event => { const file = event.target.files?.[0]; if (file) loadCapture(file); });
  frameList.addEventListener('click', event => { const row = event.target.closest('[data-frame]'); if (row) selectFrame(Number(row.dataset.frame)); });
  window.IEC61850PacketParser = { readPcap, readPcapng, parseEthernet };
}());
