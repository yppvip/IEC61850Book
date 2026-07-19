(function () {
  'use strict';

  const ETHERNET_LINKTYPE = 1;
  const MAX_FRAMES = 200000;
  const state = { frames: [], diagnostics: [], selected: null, scl: null, selectedSignals: new Set() };
  const captureInput = document.querySelector('#capture-file');
  const sclInput = document.querySelector('#scl-file');
  const status = document.querySelector('#parser-status');
  const summary = document.querySelector('#parser-summary');
  const frameList = document.querySelector('#frame-list');
  const frameDetail = document.querySelector('#frame-detail');
  const signalList = document.querySelector('#signal-list');
  const protocolFilter = document.querySelector('#protocol-filter');
  const signalFilter = document.querySelector('#signal-filter');
  const signalProtocolFilter = document.querySelector('#signal-protocol-filter');
  const signalAppidFilter = document.querySelector('#signal-appid-filter');
  const signalTimeStart = document.querySelector('#signal-time-start');
  const signalTimeEnd = document.querySelector('#signal-time-end');
  const plotGapThreshold = document.querySelector('#plot-gap-threshold');
  const signalChart = document.querySelector('#signal-chart');
  const signalChartStatus = document.querySelector('#signal-chart-status');
  const signalChartTooltip = document.querySelector('#signal-chart-tooltip');
  const diagnosticList = document.querySelector('#diagnostic-list');
  const frameDetailTitle = document.querySelector('#frame-detail-title');
  const previousFrameButton = document.querySelector('#previous-frame');
  const nextFrameButton = document.querySelector('#next-frame');

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

  function unsignedValue(bytes) {
    let value = 0;
    for (const byte of bytes) value = value * 256 + byte;
    return Number.isSafeInteger(value) ? { text: String(value), numeric: value } : { text: `0x${hexBytes(bytes).replaceAll(' ', '')}`, numeric: null };
  }

  function signedValue(bytes) {
    if (!bytes.length) return { text: '0', numeric: 0 };
    let value = 0;
    for (const byte of bytes) value = value * 256 + byte;
    if (bytes[0] & 0x80) value -= Math.pow(256, bytes.length);
    return Number.isSafeInteger(value) ? { text: String(value), numeric: value } : { text: `0x${hexBytes(bytes).replaceAll(' ', '')}`, numeric: null };
  }

  function unsigned(bytes) { return unsignedValue(bytes).text; }
  function signed(bytes) { return signedValue(bytes).text; }

  function text(bytes) { return new TextDecoder('ascii', { fatal: false }).decode(bytes); }

  function childrenBy(element, name) { return Array.from(element.children || []).filter(child => child.localName === name); }
  function descendantsBy(element, name) { return Array.from(element.getElementsByTagName('*')).filter(child => child.localName === name); }
  function appidFromText(value) { return value && /^(?:0x)?[0-9a-f]+$/i.test(value.trim()) ? Number.parseInt(value.trim().replace(/^0x/i, ''), 16) : undefined; }
  function fcdaParts(fcda, defaultLd) {
    const ld = fcda.getAttribute('ldInst') || defaultLd || '?';
    const prefix = fcda.getAttribute('prefix') || '';
    const lnClass = fcda.getAttribute('lnClass') || 'LN0';
    const lnInst = fcda.getAttribute('lnInst') || '';
    const doName = fcda.getAttribute('doName') || '?';
    const daName = fcda.getAttribute('daName') || '';
    const fc = fcda.getAttribute('fc') || '?';
    return { ld, prefix, lnClass, lnInst, doName, daName, fc };
  }

  function fcdaLabel(fcda, defaultLd) {
    const parts = fcdaParts(fcda, defaultLd);
    return `${parts.ld}/${parts.prefix}${parts.lnClass}${parts.lnInst}.${parts.doName}${parts.daName ? `.${parts.daName}` : ''} [${parts.fc}]`;
  }

  function describeElement(element, source) {
    const value = element?.getAttribute?.('desc')?.trim();
    return value ? { value, source } : null;
  }

  function uniqueDescriptions(candidates) {
    const seen = new Set();
    return candidates.filter(Boolean).filter(candidate => {
      const key = `${candidate.source}\u0000${candidate.value}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function typeIndexes(documentXml) {
    const byId = name => new Map(descendantsBy(documentXml, name).filter(element => element.getAttribute('id')).map(element => [element.getAttribute('id'), element]));
    const enumTypes = new Map();
    for (const enumType of descendantsBy(documentXml, 'EnumType')) {
      const id = enumType.getAttribute('id');
      if (!id) continue;
      enumTypes.set(id, childrenBy(enumType, 'EnumVal').map(value => ({ ordinal: value.getAttribute('ord'), value: value.textContent.trim(), source: `EnumType ${id}/EnumVal@ord=${value.getAttribute('ord') || ''}` })));
    }
    return { lNodeTypes: byId('LNodeType'), doTypes: byId('DOType'), daTypes: byId('DAType'), enumTypes };
  }

  function localLogicalNode(ldevice, ln0, parts) {
    if (parts.lnClass === 'LN0') return ln0;
    return childrenBy(ldevice, 'LN').find(ln => ln.getAttribute('lnClass') === parts.lnClass && (ln.getAttribute('inst') || '') === parts.lnInst && (ln.getAttribute('prefix') || '') === parts.prefix);
  }

  function resolveTypePath(logicalNode, parts, indexes) {
    const trail = [];
    const lNodeType = indexes.lNodeTypes.get(logicalNode?.getAttribute('lnType'));
    if (!lNodeType) return { trail, doElement: null, leaf: null, enumValues: [] };
    trail.push({ kind: 'LNodeType', id: lNodeType.getAttribute('id') });
    const doElement = childrenBy(lNodeType, 'DO').find(element => element.getAttribute('name') === parts.doName.split('.')[0]);
    const doType = indexes.doTypes.get(doElement?.getAttribute('type'));
    if (!doElement || !doType) return { trail, doElement, leaf: null, enumValues: [] };
    trail.push({ kind: 'DOType', id: doType.getAttribute('id') });
    let container = doType;
    let childName = 'DA';
    let leaf = null;
    for (const segment of parts.daName.split('.').filter(Boolean)) {
      leaf = childrenBy(container, childName).find(element => element.getAttribute('name') === segment);
      if (!leaf) break;
      const typeId = leaf.getAttribute('type');
      trail.push({ kind: leaf.localName, name: segment, bType: leaf.getAttribute('bType') || '', type: typeId || '' });
      const daType = indexes.daTypes.get(typeId);
      if (daType) {
        trail.push({ kind: 'DAType', id: daType.getAttribute('id') });
        container = daType;
        childName = 'BDA';
      } else {
        container = null;
        childName = 'BDA';
      }
      if (!container && segment !== parts.daName.split('.').filter(Boolean).at(-1)) break;
    }
    const enumValues = indexes.enumTypes.get(leaf?.getAttribute('type')) || [];
    return { trail, doElement, leaf, enumValues };
  }

  function resolveInstanceDescription(logicalNode, parts) {
    if (!logicalNode) return null;
    let current = childrenBy(logicalNode, 'DOI').find(element => element.getAttribute('name') === parts.doName.split('.')[0]);
    if (!current) return null;
    for (const segment of parts.daName.split('.').filter(Boolean)) {
      const next = childrenBy(current, 'SDI').find(element => element.getAttribute('name') === segment) || childrenBy(current, 'DAI').find(element => element.getAttribute('name') === segment);
      if (!next) break;
      current = next;
    }
    return describeElement(current, 'IED 实例 DOI/SDI/DAI@desc');
  }

  function resolveFcdaSemantic(iedName, ldevice, ln0, fcda, indexes) {
    const parts = fcdaParts(fcda, ldevice.getAttribute('inst') || '');
    const logicalNode = localLogicalNode(ldevice, ln0, parts);
    const typePath = resolveTypePath(logicalNode, parts, indexes);
    const descriptions = uniqueDescriptions([
      describeElement(fcda, 'FCDA@desc'),
      resolveInstanceDescription(logicalNode, parts),
      describeElement(typePath.leaf, 'DataTypeTemplates 数据属性@desc'),
      describeElement(typePath.doElement, 'DataTypeTemplates DO@desc'),
      describeElement(logicalNode, 'IED 逻辑节点@desc')
    ]);
    const address = fcdaLabel(fcda, ldevice.getAttribute('inst') || '');
    return {
      signalKey: `${iedName}/${address}`,
      address,
      ...parts,
      description: descriptions[0]?.value || '',
      descriptionSource: descriptions[0]?.source || '',
      descriptionCandidates: descriptions,
      typePath: typePath.trail,
      bType: typePath.leaf?.getAttribute('bType') || '',
      typeId: typePath.leaf?.getAttribute('type') || '',
      enumValues: typePath.enumValues
    };
  }

  function svSampleLayoutEvidence(entries) {
    const missing = [];
    if (!entries.length) missing.push('DataSet/FCDA 通道列表');
    if (entries.some(entry => !entry.bType)) missing.push('FCDA 数据类型');
    // SCL 的 FCDA 类型本身不足以证明 sample 的字节打包、质量字段位置和比例；这些必须来自可验证的工程约定或受支持的扩展。
    missing.push('sample 通道字节布局', '质量字段位置', '比例/单位工程约定');
    return { confirmed: false, missing, reason: `SV 绘图已禁用：缺少${missing.join('、')}。` };
  }

  function networkAppid(doc, iedName, ldInst, cbName, service) {
    const candidates = descendantsBy(doc, 'ConnectedAP').filter(item => item.getAttribute('iedName') === iedName);
    for (const connection of candidates) {
      const block = descendantsBy(connection, service).find(item => item.getAttribute('ldInst') === ldInst && item.getAttribute('cbName') === cbName);
      if (!block) continue;
      const parameter = descendantsBy(block, 'P').find(item => item.getAttribute('type') === 'APPID');
      const appid = parameter && appidFromText(parameter.textContent);
      if (appid !== undefined) return appid;
    }
    return undefined;
  }

  function parseScl(textValue) {
    const documentXml = new DOMParser().parseFromString(textValue, 'application/xml');
    if (descendantsBy(documentXml, 'parsererror').length) throw new Error('SCD/ICD XML 格式无效，浏览器无法解析。');
    const goose = [];
    const sv = [];
    const indexes = typeIndexes(documentXml);
    for (const ied of descendantsBy(documentXml, 'IED')) {
      const iedName = ied.getAttribute('name');
      if (!iedName) continue;
      for (const ldevice of descendantsBy(ied, 'LDevice')) {
        const ldInst = ldevice.getAttribute('inst') || '';
        const ln0 = childrenBy(ldevice, 'LN0')[0];
        if (!ln0) continue;
        const dataSets = new Map(childrenBy(ln0, 'DataSet').map(dataSet => [dataSet.getAttribute('name'), childrenBy(dataSet, 'FCDA').map(fcda => resolveFcdaSemantic(iedName, ldevice, ln0, fcda, indexes))]));
        for (const control of childrenBy(ln0, 'GSEControl')) {
          const cbName = control.getAttribute('name') || '';
          const dataSet = control.getAttribute('datSet') || '';
          goose.push({ iedName, ldInst, cbName, dataSet, entries: dataSets.get(dataSet) || [], appid: networkAppid(documentXml, iedName, ldInst, cbName, 'GSE') });
        }
        for (const control of childrenBy(ln0, 'SampledValueControl')) {
          const cbName = control.getAttribute('name') || '';
          const dataSet = control.getAttribute('datSet') || '';
          const entries = dataSets.get(dataSet) || [];
          sv.push({ iedName, ldInst, cbName, svID: control.getAttribute('smvID') || '', dataSet, entries, sampleLayout: svSampleLayoutEvidence(entries), appid: networkAppid(documentXml, iedName, ldInst, cbName, 'SMV') });
        }
      }
    }
    return { goose, sv, typeIndexes: { lNodeTypes: indexes.lNodeTypes.size, doTypes: indexes.doTypes.size, daTypes: indexes.daTypes.size, enumTypes: indexes.enumTypes.size } };
  }

  function resolveSignals() {
    for (const frame of state.frames) {
      const packet = frame.packet;
      for (const signal of packet.signals) {
        signal.name = signal.defaultName || signal.name;
        signal.value = signal.decodedValue ?? signal.value;
        signal.valueKind = signal.decodedValueKind ?? signal.valueKind;
        if (Object.hasOwn(signal, 'decodedNumericValue')) signal.numericValue = signal.decodedNumericValue;
        signal.enumValue = '';
        signal.mapping = '未导入 SCL';
        signal.semantic = null;
        signal.sclEntries = [];
        signal.mappingCandidates = [];
        signal.sampleLayout = null;
        signal.description = '';
        signal.descriptionSource = '';
        signal.engineeringValue = null;
        signal.plotEligibility = { eligible: false, reason: '未导入 SCL，不能确认数据集信号。' };
        if (!state.scl) continue;
        if (signal.kind === 'goose') {
          const candidates = state.scl.goose.filter(item => (item.appid === undefined || item.appid === packet.appid) && (!packet.metadata?.gocbRef || packet.metadata.gocbRef.endsWith(`$GO$${item.cbName}`)) && (!packet.metadata?.datSet || !item.dataSet || item.dataSet === packet.metadata.datSet));
          signal.mappingCandidates = candidates;
          if (candidates.length === 1 && candidates[0].entries[signal.index]) {
            signal.semantic = candidates[0].entries[signal.index];
            signal.name = signal.semantic.address;
            signal.description = signal.semantic.description;
            signal.descriptionSource = signal.semantic.descriptionSource;
            signal.mapping = `已匹配 ${candidates[0].iedName}/${candidates[0].ldInst}/${candidates[0].cbName}`;
            applyGooseValueSemantics(signal);
          } else signal.mapping = candidates.length > 1 ? `SCL 候选 ${candidates.length} 个，未自动选择` : 'SCL 中未找到匹配 GOOSE 控制块';
        }
        if (signal.kind === 'sv') {
          const candidates = state.scl.sv.filter(item => (item.appid === undefined || item.appid === packet.appid) && (!signal.svID || !item.svID || item.svID === signal.svID));
          signal.mappingCandidates = candidates;
          if (candidates.length === 1) {
            signal.sclEntries = candidates[0].entries;
            signal.sampleLayout = candidates[0].sampleLayout;
            signal.name = `SV sample（${candidates[0].dataSet || candidates[0].cbName}）`;
            signal.mapping = `已匹配 ${candidates[0].iedName}/${candidates[0].ldInst}；样本字节布局待类型确认`;
            signal.plotEligibility = { eligible: false, reason: candidates[0].sampleLayout.reason };
          } else signal.mapping = candidates.length > 1 ? `SCL 候选 ${candidates.length} 个，未自动选择` : 'SCL 中未找到匹配 SV 控制块';
        }
      }
    }
  }

  function applyGooseValueSemantics(signal) {
    const semantic = signal.semantic;
    if (!semantic) return;
    if (signal.numericValue !== null && semantic.enumValues.length) {
      const enumValue = semantic.enumValues.find(item => Number(item.ordinal) === signal.numericValue);
      if (enumValue && enumValue.value) {
        signal.enumValue = enumValue.value;
        signal.valueKind = 'enum';
        signal.value = `${enumValue.value} (${signal.rawValue})`;
      }
    }
    if (signal.numericValue !== null) signal.engineeringValue = signal.numericValue;
    const statusKinds = new Set(['boolean', 'integer', 'unsigned', 'enum']);
    const measurementKinds = new Set(['integer', 'unsigned', 'float']);
    if (semantic.fc === 'ST' && statusKinds.has(signal.valueKind)) {
      signal.plotEligibility = { eligible: true, mode: 'step', reason: '' };
      return;
    }
    if (semantic.fc === 'MX' && measurementKinds.has(signal.valueKind) && Number.isFinite(signal.numericValue)) {
      signal.plotEligibility = { eligible: true, mode: 'line', reason: '' };
      return;
    }
    const reason = ['string', 'timestamp'].includes(signal.valueKind)
      ? `${signal.valueKind === 'string' ? '字符串' : '时间'}类型不可绘制。`
      : semantic.fc !== 'ST' && semantic.fc !== 'MX'
        ? `功能约束 ${semantic.fc || '未知'} 不属于可绘制的 ST/MX。`
        : '值类型未被安全数值化，不能绘制。';
    signal.plotEligibility = { eligible: false, reason };
  }

  function decodeFloatingPoint(value) {
    const format = value[0];
    const byteLength = format === 8 ? 4 : format === 11 ? 8 : 0;
    if (!byteLength || value.length !== byteLength + 1) return null;
    const numeric = byteLength === 4 ? new DataView(value.buffer, value.byteOffset + 1, 4).getFloat32(0, false) : new DataView(value.buffer, value.byteOffset + 1, 8).getFloat64(0, false);
    return Number.isFinite(numeric) ? numeric : null;
  }

  function decodeDataValue(bytes, tlv) {
    const value = bytes.slice(tlv.valueStart, tlv.valueEnd);
    const rawValue = hexBytes(value);
    if (tlv.tag === 0x83) {
      const numericValue = value.some(byte => byte !== 0) ? 1 : 0;
      return { value: numericValue ? 'true' : 'false', rawValue, numericValue, valueKind: 'boolean', quality: '—' };
    }
    if (tlv.tag === 0x84) return { value: `BIT STRING ${rawValue}`, rawValue, numericValue: null, valueKind: 'bit-string', quality: '原始位串' };
    if (tlv.tag === 0x85) {
      const decoded = signedValue(value);
      return { value: decoded.text, rawValue: decoded.text, numericValue: decoded.numeric, valueKind: 'integer', quality: '—' };
    }
    if (tlv.tag === 0x86) {
      const decoded = unsignedValue(value);
      return { value: decoded.text, rawValue: decoded.text, numericValue: decoded.numeric, valueKind: 'unsigned', quality: '—' };
    }
    if (tlv.tag === 0x87) {
      const numericValue = decodeFloatingPoint(value);
      return numericValue === null
        ? { value: `FLOATING-POINT ${rawValue}`, rawValue, numericValue: null, valueKind: 'raw', quality: '浮点格式未识别' }
        : { value: String(numericValue), rawValue, numericValue, valueKind: 'float', quality: '—' };
    }
    if (tlv.tag === 0x89) return { value: text(value), rawValue, numericValue: null, valueKind: 'string', quality: '—' };
    if (tlv.tag === 0x8a) return { value: `BinaryTime ${rawValue}`, rawValue, numericValue: null, valueKind: 'timestamp', quality: '协议内时间原始值' };
    return { value: `Tag ${hex(tlv.tag)}: ${rawValue}`, rawValue, numericValue: null, valueKind: 'raw', quality: '原始 TLV' };
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
    const metadata = {};
    let cursor = root.valueStart;
    while (cursor < root.valueEnd) {
      const tlv = readTlv(bytes, cursor, root.valueEnd);
      const value = bytes.slice(tlv.valueStart, tlv.valueEnd);
      const name = names[tlv.tag] || `未知 GOOSE Tag ${hex(tlv.tag)}`;
      if (tlv.tag === 0x80 || tlv.tag === 0x82 || tlv.tag === 0x83) { metadata[name] = text(value); fields.push({ name, value: metadata[name], offset: cursor, length: tlv.nextOffset - cursor }); }
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
          signals.push({ name: `GOOSE 第 ${item} 项`, defaultName: `GOOSE 第 ${item} 项`, kind: 'goose', index: item - 1, ...decoded, decodedValue: decoded.value, decodedValueKind: decoded.valueKind, decodedNumericValue: decoded.numericValue, engineeringValue: null, plotEligibility: { eligible: false, reason: '未导入 SCL，不能确认数据集信号。' }, mapping: '未导入 SCL', offset: itemCursor });
          itemCursor = dataTlv.nextOffset;
        }
      } else fields.push({ name, value: hexBytes(value), offset: cursor, length: tlv.nextOffset - cursor });
      cursor = tlv.nextOffset;
    }
    return { fields, appid: header.appid, signals, metadata };
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
          let svID = '';
          while (fieldCursor < asdu.valueEnd) {
            const field = readTlv(bytes, fieldCursor, asdu.valueEnd);
            const value = bytes.slice(field.valueStart, field.valueEnd);
            const labels = { 0x80: 'svID', 0x81: 'datSet', 0x82: 'smpCnt', 0x83: 'confRev', 0x84: 'refrTm', 0x85: 'smpSynch', 0x86: 'smpRate', 0x87: 'sample', 0x88: 'smpMod' };
            const name = `ASDU ${asduNumber} ${labels[field.tag] || `未知 Tag ${hex(field.tag)}`}`;
            let display = hexBytes(value);
            if ([0x80, 0x81].includes(field.tag)) { display = text(value); if (field.tag === 0x80) svID = display; }
            else if ([0x82, 0x83, 0x85, 0x86, 0x88].includes(field.tag)) display = unsigned(value);
            fields.push({ name, value: display, offset: fieldCursor, length: field.nextOffset - fieldCursor });
            if (field.tag === 0x87) signals.push({ name: `SV ASDU ${asduNumber} sample`, defaultName: `SV ASDU ${asduNumber} sample`, kind: 'sv', svID, value: hexBytes(value), decodedValue: hexBytes(value), rawValue: hexBytes(value), numericValue: null, decodedNumericValue: null, valueKind: 'raw', decodedValueKind: 'raw', engineeringValue: null, quality: '原始 sample；待 SCL 映射', plotEligibility: { eligible: false, reason: 'SV sample 尚未按可验证布局拆分通道。' }, mapping: '未导入 SCL', offset: fieldCursor });
            fieldCursor = field.nextOffset;
          }
          asduCursor = asdu.nextOffset;
        }
      } else fields.push({ name: `未知 SV Tag ${hex(tlv.tag)}`, value: hexBytes(bytes.slice(tlv.valueStart, tlv.valueEnd)), offset: cursor, length: tlv.nextOffset - cursor });
      cursor = tlv.nextOffset;
    }
    return { fields, appid: header.appid, signals };
  }

  function ipv4(bytes, offset) { return Array.from(bytes.slice(offset, offset + 4)).join('.'); }

  function parseMmsCandidate(bytes, offset) {
    if (offset + 20 > bytes.length) throw new Error('IPv4 头截断。');
    const versionIhl = bytes[offset];
    const version = versionIhl >> 4;
    const ipLength = (versionIhl & 0x0f) * 4;
    if (version !== 4 || ipLength < 20 || offset + ipLength > bytes.length) throw new Error('IPv4 版本或头长度无效。');
    if (bytes[offset + 9] !== 6) return null;
    const tcp = offset + ipLength;
    if (tcp + 20 > bytes.length) throw new Error('TCP 头截断。');
    const sourcePort = (bytes[tcp] << 8) | bytes[tcp + 1];
    const destinationPort = (bytes[tcp + 2] << 8) | bytes[tcp + 3];
    if (sourcePort !== 102 && destinationPort !== 102) return null;
    const tcpLength = (bytes[tcp + 12] >> 4) * 4;
    if (tcpLength < 20 || tcp + tcpLength > bytes.length) throw new Error('TCP 头长度无效。');
    const payload = tcp + tcpLength;
    const fields = [
      { name: 'IPv4 Source', value: ipv4(bytes, offset + 12), offset: offset + 12, length: 4 }, { name: 'IPv4 Destination', value: ipv4(bytes, offset + 16), offset: offset + 16, length: 4 },
      { name: 'TCP Source Port', value: String(sourcePort), offset: tcp, length: 2 }, { name: 'TCP Destination Port', value: String(destinationPort), offset: tcp + 2, length: 2 }
    ];
    let status = 'TCP/102 候选；等待流重组';
    if (payload + 4 <= bytes.length && bytes[payload] === 0x03 && bytes[payload + 1] === 0x00) {
      const tpktLength = (bytes[payload + 2] << 8) | bytes[payload + 3];
      fields.push({ name: 'TPKT Version', value: '3', offset: payload, length: 1 }, { name: 'TPKT Length', value: String(tpktLength), offset: payload + 2, length: 2 });
      if (tpktLength < 4) throw new Error('TPKT Length 小于 4。');
      if (payload + tpktLength > bytes.length) status = 'TCP/102 + TPKT；当前帧不含完整 PDU，需流重组';
      else {
        status = 'TCP/102 + TPKT 候选；COTP/MMS 深度字段待流重组器支持';
        if (payload + 7 <= bytes.length) fields.push({ name: 'COTP Header', value: hexBytes(bytes.slice(payload + 4, Math.min(payload + 11, payload + tpktLength))), offset: payload + 4, length: Math.min(7, tpktLength - 4) });
      }
    }
    return { protocol: 'MMS/TCP 候选', status, source: `${ipv4(bytes, offset + 12)}:${sourcePort}`, destination: `${ipv4(bytes, offset + 16)}:${destinationPort}`, fields, signals: [] };
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
      if (etherType === 0x0800) { const mms = parseMmsCandidate(bytes, offset); if (mms) Object.assign(packet, mms, { vlans, etherType, payloadOffset: offset }); }
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
    const visible = state.frames.filter(frame => !protocolFilter.value || frame.packet.protocol === protocolFilter.value);
    if (!visible.length) { frameList.innerHTML = '<tr><td colspan="7">没有符合当前协议筛选的帧。</td></tr>'; updateFrameNavigation(); return; }
    frameList.innerHTML = visible.map(frame => {
      const packet = frame.packet;
      const vlan = packet.vlans?.map(item => item.id).join(', ') || '—';
      const selected = frame.number === state.selected;
      return `<tr data-frame="${frame.number}" role="button" tabindex="0" aria-selected="${selected}"><td>${frame.number}</td><td>${escapeHtml(timeText(frame.timestamp))}</td><td>${escapeHtml(packet.protocol)}</td><td>${escapeHtml(packet.source ? `${packet.source} → ${packet.destination}` : '—')}</td><td>${escapeHtml(vlan)}</td><td>${packet.appid === undefined ? '—' : escapeHtml(hex(packet.appid))}</td><td>${escapeHtml(packet.status)}</td></tr>`;
    }).join('');
    updateFrameNavigation();
  }

  function visibleFrames() { return state.frames.filter(frame => !protocolFilter.value || frame.packet.protocol === protocolFilter.value); }

  function updateFrameNavigation() {
    const visible = visibleFrames();
    const index = visible.findIndex(frame => frame.number === state.selected);
    previousFrameButton.disabled = index <= 0;
    nextFrameButton.disabled = index < 0 || index >= visible.length - 1;
  }

  function selectFrame(number, moveToDetail = false) {
    const frame = state.frames.find(item => item.number === number);
    if (!frame) return;
    state.selected = number;
    document.querySelectorAll('[data-frame]').forEach(row => {
      const selected = Number(row.dataset.frame) === number;
      row.classList.toggle('selected', selected);
      row.setAttribute('aria-selected', String(selected));
    });
    const packet = frame.packet;
    const fields = packet.fields.map(field => `<tr><td>${escapeHtml(field.name)}</td><td>${escapeHtml(field.value)}</td><td>${field.offset}</td><td>${field.length}</td></tr>`).join('');
    const mappingEvidence = packet.signals.length ? `<h3>信号映射证据</h3><div class="table-wrap"><table><thead><tr><th>地址</th><th>描述</th><th>描述来源</th><th>值类型</th><th>原始 / 工程值</th><th>质量</th><th>映射</th></tr></thead><tbody>${packet.signals.map(signal => `<tr><td>${escapeHtml(signal.semantic?.address || signal.name)}</td><td>${escapeHtml(signal.description || '')}</td><td>${escapeHtml(signal.descriptionSource || '')}</td><td>${escapeHtml(signal.valueKind || 'raw')}</td><td>${escapeHtml(signal.rawValue || signal.value)}${signal.engineeringValue !== null && signal.engineeringValue !== undefined ? ` / ${escapeHtml(signal.engineeringValue)}` : ''}</td><td>${escapeHtml(signal.quality)}</td><td>${escapeHtml(signal.mapping)}</td></tr>`).join('')}</tbody></table></div>` : '';
    frameDetail.className = '';
    frameDetail.innerHTML = `<p><b>第 ${frame.number} 帧</b> · ${escapeHtml(timeText(frame.timestamp))} · 捕获 ${frame.capturedLength} 字节（原始 ${frame.originalLength} 字节）</p><div class="table-wrap"><table><thead><tr><th>字段</th><th>值</th><th>偏移</th><th>长度</th></tr></thead><tbody>${fields}</tbody></table></div>${mappingEvidence}<h3>原始字节</h3><pre class="map">${escapeHtml(hexBytes(frame.bytes))}</pre>`;
    updateFrameNavigation();
    if (moveToDetail && window.matchMedia('(max-width: 860px)').matches) {
      frameDetailTitle.focus({ preventScroll: true });
      frameDetailTitle.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function selectRelativeFrame(direction) {
    const visible = visibleFrames();
    const index = visible.findIndex(frame => frame.number === state.selected);
    const target = visible[index + direction];
    if (target) selectFrame(target.number);
  }

  function renderDiagnostics() {
    const packetErrors = state.frames.filter(frame => frame.packet.parseError).map(frame => ({ frameNumber: frame.number, message: frame.packet.parseError }));
    const items = [...state.diagnostics, ...packetErrors];
    diagnosticList.innerHTML = items.length ? items.map(item => `<li>${item.frameNumber ? `第 ${item.frameNumber} 帧：` : ''}${escapeHtml(item.message)}</li>`).join('') : '<li>未发现结构或协议解析诊断。</li>';
  }

  function signalRows() { return state.frames.flatMap(frame => frame.packet.signals.map(signal => ({ ...signal, frame }))); }

  function inputTimestamp(input) {
    if (!input.value) return null;
    const timestamp = new Date(input.value).getTime();
    return Number.isFinite(timestamp) ? timestamp : null;
  }

  function visibleSignalRows() {
    const query = signalFilter.value.trim().toLocaleLowerCase();
    const appidQuery = signalAppidFilter.value.trim().toLocaleLowerCase();
    const start = inputTimestamp(signalTimeStart);
    const end = inputTimestamp(signalTimeEnd);
    return signalRows().filter(row => {
      const protocol = row.frame.packet.protocol;
      if (signalProtocolFilter.value && protocol !== signalProtocolFilter.value) return false;
      if (appidQuery) {
        if (row.frame.packet.appid === undefined) return false;
        const candidates = [hex(row.frame.packet.appid), String(row.frame.packet.appid)];
        if (!candidates.some(value => value.toLocaleLowerCase().includes(appidQuery))) return false;
      }
      if (start !== null && row.frame.timestamp < start) return false;
      if (end !== null && row.frame.timestamp > end) return false;
      return !query || `${row.name} ${row.description || ''} ${row.value} ${row.mapping}`.toLocaleLowerCase().includes(query);
    });
  }

  function renderSignals() {
    const rows = visibleSignalRows();
    signalList.innerHTML = rows.length ? rows.map(row => {
      const eligible = Boolean(row.signalKey && row.plotEligibility?.eligible);
      const selected = eligible && state.selectedSignals.has(row.signalKey);
      const selector = eligible
        ? `<input class="signal-plot-select" type="checkbox" data-signal-key="${escapeHtml(row.signalKey)}" aria-label="绘制 ${escapeHtml(row.name)}" ${selected ? 'checked' : ''}>`
        : `<span class="plot-unavailable">不可绘制：${escapeHtml(row.plotEligibility?.reason || '未唯一映射信号。')}</span>`;
      return `<tr><td>${selector}</td><td>${escapeHtml(row.name)}</td><td>${escapeHtml(row.description || '')}</td><td>${escapeHtml(timeText(row.frame.timestamp))}</td><td>${escapeHtml(row.value)}</td><td>${escapeHtml(row.quality)}</td><td><button class="frame-link" type="button" data-source-frame="${row.frame.number}">第 ${row.frame.number} 帧</button></td><td>${escapeHtml(row.mapping)}</td></tr>`;
    }).join('') : '<tr><td colspan="8">尚未解析出符合当前筛选的 GOOSE / SV 数据项。</td></tr>';
    renderWaveforms(rows);
  }

  function selectedSeries(rows) {
    const series = new Map();
    for (const row of rows) {
      if (!row.signalKey || !state.selectedSignals.has(row.signalKey) || !row.plotEligibility?.eligible) continue;
      const value = row.engineeringValue ?? row.numericValue;
      if (!Number.isFinite(value)) continue;
      if (!series.has(row.signalKey)) series.set(row.signalKey, { key: row.signalKey, name: row.name, description: row.description || '', mode: row.plotEligibility.mode, values: [] });
      series.get(row.signalKey).values.push({ timestamp: row.frame.timestamp, value, displayValue: row.value, quality: row.quality, frameNumber: row.frame.number });
    }
    return Array.from(series.values()).map(item => ({ ...item, values: item.values.sort((left, right) => left.timestamp - right.timestamp) }));
  }

  function downsample(points, maximum = 2400) {
    if (points.length <= maximum) return points;
    const step = Math.ceil(points.length / maximum);
    const sampled = points.filter((_, index) => index % step === 0);
    if (sampled.at(-1) !== points.at(-1)) sampled.push(points.at(-1));
    return sampled;
  }

  function median(values) {
    if (!values.length) return 0;
    const sorted = [...values].sort((left, right) => left - right);
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
  }

  function chartGap(points) {
    const configured = Number(plotGapThreshold.value);
    if (Number.isFinite(configured) && configured > 0) return configured;
    const gaps = points.slice(1).map((point, index) => point.timestamp - points[index].timestamp).filter(gap => gap > 0);
    const typical = median(gaps);
    return typical ? typical * 3 : Infinity;
  }

  function svgLinePath(points, x, y, mode, gap) {
    let path = '';
    points.forEach((point, index) => {
      const previous = points[index - 1];
      const disconnected = index && point.timestamp - previous.timestamp > gap;
      if (!index || disconnected) path += `M ${x(point.timestamp).toFixed(2)} ${y(point.value).toFixed(2)} `;
      else if (mode === 'step') path += `H ${x(point.timestamp).toFixed(2)} V ${y(point.value).toFixed(2)} `;
      else path += `L ${x(point.timestamp).toFixed(2)} ${y(point.value).toFixed(2)} `;
    });
    return path.trim();
  }

  function renderWaveforms(rows = visibleSignalRows()) {
    const series = selectedSeries(rows);
    if (!series.length) {
      signalChartStatus.textContent = state.selectedSignals.size ? '当前筛选范围内没有已选信号的可绘制数值。' : '在时间线中勾选可绘制信号后显示趋势图。';
      signalChart.innerHTML = '';
      return;
    }
    signalChartStatus.textContent = `显示 ${series.length} 个信号；图表使用抓包帧时间戳。点击数据点可跳转至来源帧。`;
    signalChart.innerHTML = series.map((item, index) => renderWaveform(item, index)).join('');
  }

  function renderWaveform(series, index) {
    const points = downsample(series.values);
    const width = 720;
    const height = 220;
    const pad = { left: 62, right: 18, top: 24, bottom: 38 };
    const minTime = points[0].timestamp;
    const maxTime = points.at(-1).timestamp;
    const minValue = Math.min(...points.map(point => point.value));
    const maxValue = Math.max(...points.map(point => point.value));
    const timeSpan = maxTime - minTime || 1;
    const valuePadding = minValue === maxValue ? Math.max(Math.abs(minValue) * 0.1, 1) : (maxValue - minValue) * 0.08;
    const lower = minValue - valuePadding;
    const upper = maxValue + valuePadding;
    const x = value => pad.left + (value - minTime) / timeSpan * (width - pad.left - pad.right);
    const y = value => height - pad.bottom - (value - lower) / (upper - lower) * (height - pad.top - pad.bottom);
    const ticks = [lower, (lower + upper) / 2, upper];
    const gap = chartGap(points);
    const path = svgLinePath(points, x, y, series.mode, gap);
    const axisTime = time => new Date(time).toLocaleTimeString('zh-CN', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dots = points.map(point => `<circle class="wave-point wave-series-${index % 6}" cx="${x(point.timestamp).toFixed(2)}" cy="${y(point.value).toFixed(2)}" r="3" data-wave-frame="${point.frameNumber}" data-wave-name="${escapeHtml(series.name)}" data-wave-time="${escapeHtml(timeText(point.timestamp))}" data-wave-value="${escapeHtml(point.displayValue)}" data-wave-quality="${escapeHtml(point.quality)}"></circle>`).join('');
    return `<figure class="wave-figure"><figcaption><b>${escapeHtml(series.name)}</b>${series.description ? ` · ${escapeHtml(series.description)}` : ''}<span class="meta"> · ${series.mode === 'step' ? 'ST 阶梯图' : 'MX 数值图'} · ${points.length}${points.length < series.values.length ? `/${series.values.length} 点（抽样显示）` : ' 点'}</span></figcaption><svg class="wave-svg wave-series-${index % 6}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(series.name)} 的趋势图"><title>${escapeHtml(series.name)} 趋势图</title><desc>纵轴范围 ${lower.toPrecision(6)} 到 ${upper.toPrecision(6)}，横轴为抓包时间。</desc><line class="wave-axis" x1="${pad.left}" y1="${height - pad.bottom}" x2="${width - pad.right}" y2="${height - pad.bottom}"></line><line class="wave-axis" x1="${pad.left}" y1="${pad.top}" x2="${pad.left}" y2="${height - pad.bottom}"></line>${ticks.map(value => `<g><line class="wave-grid" x1="${pad.left}" y1="${y(value).toFixed(2)}" x2="${width - pad.right}" y2="${y(value).toFixed(2)}"></line><text class="wave-label" x="${pad.left - 8}" y="${(y(value) + 4).toFixed(2)}" text-anchor="end">${value.toPrecision(5)}</text></g>`).join('')}<text class="wave-label" x="${pad.left}" y="${height - 12}">${escapeHtml(axisTime(minTime))}</text><text class="wave-label" x="${width - pad.right}" y="${height - 12}" text-anchor="end">${escapeHtml(axisTime(maxTime))}</text><path class="wave-path" d="${path}"></path>${dots}</svg></figure>`;
  }

  function reconcileSignalSelection() {
    const eligible = new Set(signalRows().filter(row => row.signalKey && row.plotEligibility?.eligible).map(row => row.signalKey));
    for (const signalKey of state.selectedSignals) if (!eligible.has(signalKey)) state.selectedSignals.delete(signalKey);
  }

  function showWaveTooltip(point, event) {
    signalChartTooltip.textContent = `${point.dataset.waveName} · ${point.dataset.waveTime} · ${point.dataset.waveValue} · ${point.dataset.waveQuality} · 第 ${point.dataset.waveFrame} 帧`;
    signalChartTooltip.hidden = false;
    const container = signalChart.getBoundingClientRect();
    const tooltipWidth = signalChartTooltip.offsetWidth;
    const left = Math.max(4, Math.min(event.clientX - container.left + 10, container.width - tooltipWidth - 4));
    signalChartTooltip.style.left = `${left}px`;
    signalChartTooltip.style.top = `${Math.max(4, event.clientY - container.top + 10)}px`;
  }

  async function loadCapture(file) {
    state.frames = [];
    state.diagnostics = [];
    state.selected = null;
    state.selectedSignals.clear();
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
    resolveSignals();
    renderSignals();
    renderDiagnostics();
    frameDetail.className = 'empty';
    frameDetail.textContent = '选择一帧后显示协议字段、字节偏移和原始数据。';
  }

  captureInput.addEventListener('change', event => { const file = event.target.files?.[0]; if (file) loadCapture(file); });
  protocolFilter.addEventListener('change', renderFrames);
  [signalFilter, signalProtocolFilter, signalAppidFilter, signalTimeStart, signalTimeEnd].forEach(input => input.addEventListener(input.type === 'search' ? 'input' : 'change', renderSignals));
  plotGapThreshold.addEventListener('input', () => renderWaveforms());
  sclInput.addEventListener('change', async event => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      state.scl = parseScl(await file.text());
      status.textContent = `已导入 ${file.name}：${state.scl.goose.length} 个 GOOSE 控制块，${state.scl.sv.length} 个 SV 控制块。`;
      resolveSignals();
      reconcileSignalSelection();
      renderSignals();
      if (state.selected) selectFrame(state.selected);
    } catch (error) {
      state.scl = null;
      status.textContent = `无法解析 ${file.name}：${error.message}`;
      addDiagnostic(`SCD/ICD：${error.message}`);
      renderDiagnostics();
    }
  });
  frameList.addEventListener('click', event => { const row = event.target.closest('[data-frame]'); if (row) selectFrame(Number(row.dataset.frame), true); });
  frameList.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const row = event.target.closest('[data-frame]');
    if (!row) return;
    event.preventDefault();
    selectFrame(Number(row.dataset.frame), true);
  });
  previousFrameButton.addEventListener('click', () => selectRelativeFrame(-1));
  nextFrameButton.addEventListener('click', () => selectRelativeFrame(1));
  signalList.addEventListener('change', event => {
    const selector = event.target.closest('.signal-plot-select');
    if (!selector) return;
    if (selector.checked) state.selectedSignals.add(selector.dataset.signalKey);
    else state.selectedSignals.delete(selector.dataset.signalKey);
    renderSignals();
  });
  signalList.addEventListener('click', event => {
    const button = event.target.closest('[data-source-frame]');
    if (button) selectFrame(Number(button.dataset.sourceFrame), true);
  });
  signalChart.addEventListener('mouseover', event => {
    const point = event.target.closest('.wave-point');
    if (point) showWaveTooltip(point, event);
  });
  signalChart.addEventListener('mouseout', event => {
    if (event.target.closest('.wave-point')) signalChartTooltip.hidden = true;
  });
  signalChart.addEventListener('click', event => {
    const point = event.target.closest('.wave-point');
    if (point) selectFrame(Number(point.dataset.waveFrame));
  });
  window.IEC61850PacketParser = { readPcap, readPcapng, parseEthernet, parseScl, parseMmsCandidate };
}());
