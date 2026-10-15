"""Build the offline ObjectReference guide from a read-only SCD and a static template.

Published examples rename IED, type, dataset and control-block identifiers; source
lines and SHA-256 retain traceability. No network or device operations are used.
"""
from pathlib import Path
from hashlib import sha256
import html
import json
import re
from lxml import etree as ET

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'outputs'
SOURCE = ROOT / 'source/南雷变2026041614.scd'
PAGE = 'object-reference.html'
TITLE = '对象引用：语法、SCD 追踪与工程使用'
NS = {'s': 'http://www.iec.ch/61850/2003/SCL'}


def local(element):
    return ET.QName(element).localname


def ancestor(element, tag):
    return next(e for e in element.iterancestors() if local(e) == tag)


def one(elements, label):
    if len(elements) != 1:
        raise ValueError(f'{label}: expected one definition, found {len(elements)}')
    return elements[0]


def xml(element):
    return '<pre data-language="xml"><code>' + html.escape(
        ET.tostring(element, encoding='unicode', pretty_print=True).strip()
    ) + '</code></pre>'


def table(headers, rows):
    def cell(v):
        return html.escape(str(v))
    return '<div class="reference-table"><table><thead><tr>' + ''.join(
        '<th scope="col">' + cell(h) + '</th>' for h in headers
    ) + '</tr></thead><tbody>' + ''.join('<tr>' + ''.join(
        '<td>' + cell(v) + '</td>' for v in row
    ) + '</tr>' for row in rows) + '</tbody></table></div>'


class Model:
    def __init__(self, root):
        self.root = root
        self.templates = {}
        for e in root.find('s:DataTypeTemplates', NS):
            self.templates.setdefault((local(e), e.get('id')), []).append(e)

    def template(self, tag, identifier):
        return one(self.templates.get((tag, identifier), []), tag + ' type ID')

    def resolve(self, ied, member):
        """Resolve ordinary non-array SCL FCDA fields; retain the owning server scope.

        Array indexes are deliberately rejected, rather than silently discarded.
        This is an evidence extractor, not a complete SCL conformance validator.
        """
        if member.get('ix') is not None or any(
            c in member.get(k, '') for k in ('doName', 'daName') for c in '()'
        ):
            raise ValueError('array selection needs an edition-aware index resolver')
        ld = one(ied.xpath('./s:AccessPoint/s:Server/s:LDevice[@inst=$i]',
                           namespaces=NS, i=member.get('ldInst')), 'LD/server scope')
        ln = one([e for e in ld if local(e) in ('LN', 'LN0')
                  and e.get('prefix', '') == member.get('prefix', '')
                  and e.get('lnClass') == member.get('lnClass')
                  and e.get('inst', '') == member.get('lnInst', '')], 'LN instance')
        lt = self.template('LNodeType', ln.get('lnType'))
        if lt.get('lnClass') != ln.get('lnClass'):
            raise ValueError('LN and LNodeType lnClass mismatch')
        parts = member.get('doName', '').split('.')
        do = one(lt.xpath('./s:DO[@name=$n]', namespaces=NS, n=parts[0]), 'DO')
        dt = self.template('DOType', do.get('type'))
        chain = [ln, lt, do, dt]
        for part in parts[1:]:
            sdo = one(dt.xpath('./s:SDO[@name=$n]', namespaces=NS, n=part), 'SDO')
            dt = self.template('DOType', sdo.get('type'))
            chain.extend([sdo, dt])
        da_path = member.get('daName', '')
        if da_path:
            names = da_path.split('.')
            leaf = one(dt.xpath('./s:DA[@name=$n]', namespaces=NS, n=names[0]), 'DA')
            if leaf.get('fc') != member.get('fc'):
                raise ValueError('FC mismatch')
            chain.append(leaf)
            for name in names[1:]:
                if leaf.get('bType') != 'Struct':
                    raise ValueError('child requested below a primitive DA/BDA')
                dat = self.template('DAType', leaf.get('type'))
                leaf = one(dat.xpath('./s:BDA[@name=$n]', namespaces=NS, n=name), 'BDA')
                chain.extend([dat, leaf])
        else:
            leaf = None
            if not dt.xpath('./s:DA[@fc=$f]', namespaces=NS, f=member.get('fc')):
                raise ValueError('FCD has no members in the requested FC')
        return ld, ln, dt, chain, leaf


def build():
    digest = sha256(SOURCE.read_bytes()).hexdigest()
    tree = ET.parse(str(SOURCE), ET.XMLParser(resolve_entities=False, no_network=True))
    root = tree.getroot()
    model = Model(root)
    aliases = {}
    def alias(tag, name):
        key = (tag, name)
        if key not in aliases:
            number = 1 + sum(k[0] == tag for k in aliases)
            aliases[key] = {'IED': 'DemoIED_', 'LNodeType': 'DemoLNType_',
                            'DOType': 'DemoDOType_', 'DAType': 'DemoDAType_',
                            'EnumType': 'DemoEnum_', 'DataSet': 'DemoSet_',
                            'GSEControl': 'DemoGoCB_', 'ReportControl': 'DemoRCB_',
                            'LogControl': 'DemoLCB_'}[tag] + str(number)
        return aliases[key]

    def renamed(e):
        attrs = {k: v for k, v in e.attrib.items() if k in (
            'name', 'id', 'type', 'lnType', 'inst', 'ldName', 'prefix', 'lnClass',
            'ldInst', 'lnInst', 'doName', 'daName', 'fc', 'bType', 'cdc',
            'dchg', 'qchg', 'dupd', 'datSet', 'buffered', 'confRev', 'bufTime', 'intgPd')}
        tag = local(e)
        if tag == 'IED':
            attrs = {'name': alias('IED', e.get('name'))}
        if tag in ('LNodeType', 'DOType', 'DAType', 'EnumType'):
            attrs['id'] = alias(tag, e.get('id'))
        if 'lnType' in attrs:
            attrs['lnType'] = alias('LNodeType', attrs['lnType'])
        if 'type' in attrs and tag in ('DO', 'SDO'):
            attrs['type'] = alias('DOType', attrs['type'])
        if 'type' in attrs and tag in ('DA', 'BDA'):
            attrs['type'] = alias('DAType' if attrs.get('bType') == 'Struct' else 'EnumType', attrs['type'])
        if tag in ('DataSet', 'GSEControl', 'ReportControl', 'LogControl'):
            attrs['name'] = alias(tag, e.get('name'))
        if 'datSet' in attrs:
            attrs['datSet'] = alias('DataSet', attrs['datSet'])
        return ET.Element(tag, attrs)

    stats = {
        'ied': len(root.findall('s:IED', NS)),
        'logical_nodes': len(root.xpath('.//s:LN | .//s:LN0', namespaces=NS)),
        'ldName': len(root.xpath('.//s:LDevice[@ldName]', namespaces=NS)),
        'pdis': len(root.xpath('.//s:LN[@lnClass="PDIS"]', namespaces=NS)),
        'extref': len(root.xpath('.//s:ExtRef', namespaces=NS)),
    }
    candidates = root.xpath('.//s:FCDA[@doName="AnIn1" and @daName="mag.f" and @prefix="GO" and @lnClass="GGIO"]', namespaces=NS)
    measurement = next(f for f in candidates if f.getparent().getparent().find('s:GSEControl', NS) is not None)
    start = root.xpath('.//s:FCDA[@doName="Str" and @lnClass="PTRC" and @fc="ST" and not(@daName)]', namespaces=NS)[0]
    cases, blocks = [], {}
    for label, member in [('measurement', measurement), ('start', start)]:
        ied = ancestor(member, 'IED')
        ld, ln, dt, chain, leaf = model.resolve(ied, member)
        if leaf is None:
            # The selected example is a non-structured ACD FCD; expose its complete ST group.
            chain = chain + dt.xpath('./s:DA[@fc=$f]', namespaces=NS, f=member.get('fc'))
        ds = member.getparent()
        owner_ln = ds.getparent()
        owner_ld = owner_ln.getparent()
        cbs = [e for e in owner_ln if e.get('datSet') == ds.get('name')]
        ldname = ld.get('ldName') or alias('IED', ied.get('name')) + ld.get('inst')
        lnname = ln.get('prefix', '') + ln.get('lnClass') + ln.get('inst', '')
        object_ref = ldname + '/' + lnname + '.' + member.get('doName')
        if member.get('daName'):
            object_ref += '.' + member.get('daName')
        chain_rows = []
        for e in chain:
            a = renamed(e).attrib
            chain_rows.append([local(e), a.get('name') or a.get('id') or lnname,
                               '; '.join(k + '=' + v for k, v in a.items() if k not in ('name', 'id')),
                               e.sourceline])
        # Reconstructed minimal fragments: preserve selected source fields, omit all unrelated model content.
        wrapper = ET.Element('SCLExcerpt')
        i = renamed(ied); wrapper.append(i)
        ap = ET.SubElement(i, 'AccessPoint', name='DemoAP')
        srv = ET.SubElement(ap, 'Server')
        l = renamed(ld); srv.append(l); l.append(renamed(ln))
        templates = ET.SubElement(wrapper, 'DataTypeTemplates')
        template_nodes = {}
        last_template = None
        for e in chain[1:]:
            if local(e) in ('LNodeType', 'DOType', 'DAType'):
                key = (local(e), e.get('id'))
                if key not in template_nodes:
                    template_nodes[key] = renamed(e); templates.append(template_nodes[key])
                last_template = template_nodes[key]
            else:
                last_template.append(renamed(e))
        if label == 'start':
            for da in dt.findall('s:DA', NS):
                if da.get('fc') == member.get('fc') and da.get('bType') == 'Enum':
                    enum = model.template('EnumType', da.get('type'))
                    en = renamed(enum)
                    for val in enum:
                        v = ET.SubElement(en, 'EnumVal', ord=val.get('ord'))
                        v.text = val.text
                    templates.append(en)
        exchange = ET.Element('ExchangeExcerpt')
        d = renamed(ds); exchange.append(d); d.append(renamed(member))
        for cb in cbs:
            exchange.append(renamed(cb))
        index = list(ds).index(member) + 1
        rows = [
            ['对象引用 / FC', object_ref + ' [' + member.get('fc') + ']', '由实际字段重建，IED 名已替换'],
            ['数据集拥有者', alias('IED', ied.get('name')) + owner_ld.get('inst') + '/' + owner_ln.get('prefix', '') + owner_ln.get('lnClass') + owner_ln.get('inst', ''), '数据源 LD 与数据集拥有者分别解析'],
            ['DataSet / 成员序号', alias('DataSet', ds.get('name')) + ' / 第 ' + str(index) + ' 项（从 1 计）', 'DataSet 行 ' + str(ds.sourceline) + '；FCDA 行 ' + str(member.sourceline)],
            ['成员粒度', '属性路径 ' + member.get('daName') if leaf is not None else 'FCD：该 DO 的 ST 属性组', 'CDC=' + dt.get('cdc')],
        ]
        for cb in cbs:
            rows.append([local(cb), alias(local(cb), cb.get('name')), '行 ' + str(cb.sourceline) + '；datSet 引用同一数据集'])
        if label == 'measurement':
            gse = root.xpath('./s:Communication/s:SubNetwork/s:ConnectedAP[@iedName=$i]/s:GSE[@ldInst=$l and @cbName=$c]', namespaces=NS, i=ied.get('name'), l=owner_ld.get('inst'), c=cbs[0].get('name'))
            for g in gse:
                rows.append(['Communication/GSE', 'iedName + apName + ldInst + cbName 联合匹配', '行 ' + str(g.sourceline) + '；地址不作为业务语义证据'])
        direct_extrefs = root.xpath('.//s:ExtRef[@iedName=$i and @ldInst=$l and @prefix=$p and @lnClass=$c and @lnInst=$n and @doName=$d and @daName=$a]', namespaces=NS, i=ied.get('name'), l=ld.get('inst'), p=ln.get('prefix', ''), c=ln.get('lnClass'), n=ln.get('inst', ''), d=member.get('doName'), a=member.get('daName', ''))
        record = {'case': label, 'object_reference': object_ref, 'fc': member.get('fc'),
                  'cdc': dt.get('cdc'), 'leaf_type': leaf.get('bType') if leaf is not None else None,
                  'fcda_line': member.sourceline, 'dataset_line': ds.sourceline,
                  'member_position_one_based': index, 'chain': chain_rows,
                  'control_blocks': [{'kind': local(c), 'alias': alias(local(c), c.get('name')), 'line': c.sourceline} for c in cbs],
                  'exact_field_extref_matches': len(direct_extrefs)}
        cases.append(record)
        blocks[label.upper()] = (table(['核对项', '脱敏结果', '来源 / 边界'], rows)
                                   + xml(wrapper) + table(['层级', '名称 / 类型别名', '定义字段', '源行'], chain_rows)
                                   + xml(exchange))
    # An actual input declaration illustrates source vs receiver and implementation binding.
    ext = root.xpath('.//s:ExtRef[@lnClass="XCBR" and @doName="Pos" and @daName="stVal"]', namespaces=NS)[0]
    source_ied = one(root.xpath('./s:IED[@name=$n]', namespaces=NS, n=ext.get('iedName')), 'ExtRef source IED')
    probe = ET.Element('FCDA', {k: ext.get(k, '') for k in ('ldInst', 'prefix', 'lnClass', 'lnInst', 'doName', 'daName')}, fc='ST')
    model.resolve(source_ied, probe)
    ext_clone = ET.Element('ExtRef', {k: ext.get(k, '') for k in ('ldInst', 'prefix', 'lnClass', 'lnInst', 'doName', 'daName')}, iedName=alias('IED', ext.get('iedName')), intAddr='DemoInternalBinding')
    blocks['EXTREF'] = '<p>源文件行 ' + str(ext.sourceline) + ' 的实际输入声明重构如下；发布方 IED 名和内部绑定已替换。该记录没有声明 serviceType 或 srcCBName，不能据此补造唯一发布控制块。</p>' + xml(ext_clone)
    evidence = {'source': '../source/' + SOURCE.name, 'sha256': digest,
                'scl': {k: root.get(k) for k in ('version', 'revision', 'release')},
                'statistics': stats, 'examples_are_renamed': True, 'cases': cases,
                'extref_example_line': ext.sourceline,
                'limits': ['XML structure and selected reference resolution only', 'No complete XSD or device validation', 'No PDIS instance and no explicit ldName in this file', 'Array and full edition-specific validation are outside this extractor']}
    (OUT / 'data/object-reference-evidence.json').write_text(json.dumps(evidence, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    text = (ROOT / 'scripts/templates/object-reference.html').read_text(encoding='utf-8')
    blocks['SHA256'] = digest
    blocks['STATS'] = table(['文件观察', '数量'], [[k, v] for k, v in stats.items()])
    for key, value in blocks.items():
        text = text.replace('{{' + key + '}}', value)
    if re.search(r'\{\{[A-Z]+\}\}', text):
        raise ValueError('unfilled page template')
    (OUT / 'chapters' / PAGE).write_text(text, encoding='utf-8')
    integrate()
    assert sha256(SOURCE.read_bytes()).hexdigest() == digest, 'source SCD changed'
    print(json.dumps({'page': PAGE, 'source_sha256': digest, 'statistics': stats,
                      'cases': [{k: c[k] for k in ('case', 'object_reference', 'fc', 'leaf_type')} for c in cases]}, ensure_ascii=False, indent=2))


def integrate():
    nav = OUT / 'assets/navigation.js'
    text = nav.read_text(encoding='utf-8')
    if '"' + PAGE + '"' not in text:
        text = text.replace('"ied-data-model.html",\n        "IED 与数据模型",\n        "模型入门"\n      ],', '"ied-data-model.html",\n        "IED 与数据模型",\n        "模型入门"\n      ],\n      ["' + PAGE + '", "' + TITLE + '", "模型入门"],', 1)
    if "'object-reference'" not in text:
        text = text.replace("'ied-data-model','data-attributes-reference'", "'ied-data-model','object-reference','data-attributes-reference'", 1)
    if '"' + PAGE + '"' not in text:
        raise ValueError('navigation integration failed')
    nav.write_text(text, encoding='utf-8')
    for name in ('index.html',):
        path = OUT / name
        text = path.read_text(encoding='utf-8')
        if 'id="object-reference-entry"' not in text:
            text = text.replace('<section class="card" id="reference">', '<section class="card" id="object-reference-entry"><p class="section-kicker">常用工程速查 · 数据模型</p><h2>看到一个信号名，从哪里开始查？</h2><p><a href="chapters/' + PAGE + '"><b>' + TITLE + ' →</b></a></p><p>从 PROT/PDIS1.Str.general 的拆解，走到指定 SCD 的类型、FCDA、控制块和订阅证据；附开发与调试检查清单。</p></section>\n<section class="card" id="reference">', 1)
        if 'data/object-reference-terms.js' not in text:
            text = text.replace('<script src="assets/app.js">', '<script src="data/object-reference-terms.js"></script><script src="assets/app.js">', 1)
        path.write_text(text, encoding='utf-8')
    home = OUT / 'assets/home.js'
    text = home.read_text(encoding='utf-8')
    if 'href="#object-reference-entry"' not in text:
        text = text.replace('<li><a href="#reference">', '<li><a href="#object-reference-entry">对象引用速查</a></li><li><a href="#reference">', 1)
    home.write_text(text, encoding='utf-8')
    related = ['ied-data-model', 'acsi-common-types', 'scd-reading-toolbox', 'scd-in-ten-minutes',
               'developer-data-contracts', 'engineering-model-reading', 'control-blocks-reference', 'ln-protection']
    for stem in related:
        path = OUT / 'chapters' / (stem + '.html')
        text = path.read_text(encoding='utf-8')
        if 'id="object-reference-guide"' not in text:
            text = text.replace('</main>', '<section><h2 id="object-reference-guide">对象引用专题与工程速查</h2><p><a href="' + PAGE + '">' + TITLE + '</a>：集中查名称拆解、各层级用途、SCD 提取、FCD/FCDA、MMS 表达，以及开发与调试复习清单。</p></section></main>', 1)
        path.write_text(text, encoding='utf-8')
    entries = [
        ('overview', '对象引用', 'ObjectReference', ['Object Reference', '信号引用', '点名', '对象路径', 'PROT/PDIS1.Str.general'], '对象引用逐级定位 LD、LN、DO、DA；完整逻辑设备名、FC 和实际业务绑定分别确认。', 'overview'),
        ('syntax', '对象引用语法与层级', 'Object reference syntax', ['LDRef', 'LNRef', 'DARef', 'LDName/LNName', 'SDO', 'BDA'], '斜杠分隔 LD/LN，点分隔后续层级；按模板区分 DO/SDO、DA/BDA，名称区分大小写。', 'syntax'),
        ('ldname', '逻辑设备完整名与实例名', 'LDName and ldInst', ['ldName', 'ldInst', 'IEDName', 'prefix', 'lnClass', 'lnInst'], '通常 LDName 由 IED 名与 LD 实例名拼接；显式 ldName 按版本与配置处理，不把 PROT 自动当完整名。', 'naming'),
        ('scd', '从 SCD 提取对象引用', 'SCL reference resolution', ['lnType', 'LNodeType', 'DOType', 'DAType', 'EnumType', 'SCD提取'], '按命名空间解析实例和类型，保留服务器上下文，再组装引用与 FC；DOI/DAI 并非全部模型成员清单。', 'scd'),
        ('fcda', 'FCD 与 FCDA 成员粒度', 'FCD and FCDA', ['FCD', 'FCDA', 'daName', '数据集成员'], '有 daName 时定位属性，无 daName 的适用 FCD 成员选取 DO 在该 FC 下的属性组，必须保留顺序和结构。', 'dataset'),
        ('mms', '对象引用与 MMS 名称', 'MMS domainID and itemID', ['domainID', 'itemID', '$ST$', '$MX$', 'MMS对象名'], '区分 ACSI 点路径、MMS 域与带 FC 的项目名，以及 SDK 特定的引用表示。', 'mms'),
        ('extref', '输入订阅的源引用与内部绑定', 'ExtRef source and internal binding', ['ExtRef', 'intAddr', 'srcCBName', 'serviceType'], 'ExtRef 的源 IED/LD/LN/DO/DA 与接收端 intAddr 分别解释；信息不全时保留发布控制块候选。', 'exchange'),
        ('practice', '对象引用开发与调试清单', 'Object reference engineering checklist', ['对象不存在', '品质', '配置版本', '调试', '开发人员'], '从完整名和 FC 到类型、数据集及运行版本逐层核查，值、品质和时标共同判断。', 'practice'),
    ]
    terms = [dict(id='objref-' + id, zh=zh, en=en, aliases=aliases,
                  category='对象引用与工程追踪', level='数据模型 → 模型入门 → 对象引用',
                  summary=summary, related=['objref-overview'] if id != 'overview' else ['objref-scd', 'objref-practice'],
                  href='chapters/' + PAGE + '#' + anchor)
             for id, zh, en, aliases, summary, anchor in entries]
    js = '/* Generated by scripts/build_object_reference.py. */\n(function () {\n  const terms = window.IEC61850_TERMS;\n  for (const entry of ' + json.dumps(terms, ensure_ascii=False, indent=2) + ') {\n    const index = terms.findIndex(t => t.id === entry.id);\n    if (index < 0) terms.push(entry); else terms[index] = entry;\n  }\n}());\n'
    (OUT / 'data/object-reference-terms.js').write_text(js, encoding='utf-8')


if __name__ == '__main__':
    build()
