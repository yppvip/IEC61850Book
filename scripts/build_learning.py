"""Build the original developer learning track; UTF-8, no network or source SCD needed."""
from pathlib import Path
from html import escape
import json

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'outputs'
PAGES = []

def link(file, label, anchor=''):
    return f'<a href="{file}.html{("#" + anchor) if anchor else ""}">{label}</a>'

def section(id, title, body):
    return f'<section><h2 id="{id}">{title}</h2>{body}</section>'

def table(headers, rows):
    return '<div class="reference-table"><table><thead><tr>' + ''.join(f'<th scope="col">{v}</th>' for v in headers) + '</tr></thead><tbody>' + ''.join('<tr>' + ''.join(f'<td>{v}</td>' for v in row) + '</tr>' for row in rows) + '</tbody></table></div>'

def answer(question, body):
    return f'<details class="self-check"><summary>{question} · 展开参考答案</summary>{body}</details>'

def flow(id, title, steps, caption):
    # Vertical layout keeps labels at a readable size in the main reading column.
    height = 36 + len(steps) * 92
    nodes = []
    for i, (label, note) in enumerate(steps):
        y = 16 + i * 92
        if i:
            nodes.append(f'<path d="M350 {y-22}V{y-4}" class="svg-link" marker-end="url(#{id}-arrow)"/>')
        nodes.append(f'<rect x="24" y="{y}" width="652" height="68" rx="9" class="svg-frame"/><text x="46" y="{y+27}" class="svg-title">{escape(label)}</text><text x="46" y="{y+51}" class="svg-text">{escape(note)}</text>')
    return f'<figure class="concept-figure learning-figure"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 {height}" role="img" aria-labelledby="{id}-title {id}-desc"><title id="{id}-title">{title}</title><desc id="{id}-desc">{escape(caption)}</desc><defs><marker id="{id}-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#477b9e"/></marker></defs>{"".join(nodes)}</svg><figcaption>{caption}</figcaption></figure>'

SOURCES = {
    'iec': ('IEC 官方：技术原理与语义、语言、通信三部分', 'https://iec61850.dvl.iec.ch/what-is-61850/technical-principles/'),
    'power': ('Schneider Electric Electrical Installation Guide：有功、无功与视在功率', 'https://www.electrical-installation.org/enwiki/Definition_of_reactive_power'),
    'ct': ('Schneider Electric：CT 二次开路风险与负载说明', 'https://www.se.com/us/en/faqs/FA125574/'),
    'protection': ('SEL 工程师课程：故障、过流、距离、差动与保护配合的知识范围', 'https://selinc.com/selu/courses/prot/401/'),
    'secondary': ('SEL：数字化二次系统、过程层与时间同步', 'https://selinc.com/solutions/digital-secondary-systems/'),
}

def page(file, title, subtitle, sections, source_keys, group='技术知识'):
    sources = ''.join(f'<li><a href="{SOURCES[k][1]}">{SOURCES[k][0]}</a></li>' for k in source_keys)
    sources += '<li>库内标准基线：' + link('standard-part-7-3', '7-3 的属性、品质和单位') + '；' + link('standard-part-7-4', '7-4 的 LN 与数据语义') + '；' + link('standard-part-6-scl', '第 6 部分的引用关系') + '。具体版次和缺页边界以对应页说明为准。</li>'
    body = '\n'.join(sections)
    body += section('sources', '来源、适用范围与继续阅读', '<p>本页是面向软件开发人员的原创基础解读；图、数值和情境均为原创、脱敏教学材料，不是标准原文、完整工程或定值方案。外部资料用于原理核对，厂商实现不泛化为所有设备的能力；正文、图表和练习可完全离线阅读。来源核对日期：2026-10-14。</p><ul>' + sources + '</ul><p>上级：' + link('learning-path', '零基础学习路线') + '。沿页面底部的学习顺序继续阅读；标准全表用于遇到具体对象时回查。</p>')
    html = f'''<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{title}｜IEC 61850 离线知识库</title><link rel="stylesheet" href="../assets/style.css"></head>
<body><header class="top"><div class="chapter"><p class="section-kicker">{group} · 开发人员学习路径</p><h1>{title}</h1><p>{subtitle}</p></div></header>
<main class="chapter">{body}</main><footer class="foot">原创离线教材 · 从物理对象、信号语义逐步进入模型与工程引用</footer><script src="../assets/navigation.js"></script></body></html>
'''
    (OUT / 'chapters' / f'{file}.html').write_text(html, encoding='utf-8')
    PAGES.append([file, title, group])

stages = [
    ('01', '先建立电气量的直觉', '知道设备承载什么', [('electrical-fundamentals','电路、三相电与功率')], '能解释 10 kV、200 A、kW 与 kWh 分别是什么，说明公式的条件。'),
    ('02', '看懂一次系统', '先看能量路径，再看信息路径', [('primary-diagrams','一次接线与设备'),('primary-and-roles','一次系统与设备角色')], '能区分断路器、隔离开关、接地开关、CT、VT 和变压器；沿图定位间隔。'),
    ('03', '理解测量与保护', '物理量如何变成数据，故障如何被切除', [('measurement-chain','互感器、采样与信号'),('protection-control-fundamentals','保护、控制与跳闸闭环'),('protection-ied-guide','保护 IED 功能范围')], '能追踪采样→判据→出口→反馈，解释通信成功与设备动作的区别。'),
    ('04', '放回变电站自动化架构', '把设备和功能放进层级', [('bay-and-automation-levels','间隔与自动化层级'),('three-level-two-network','三层两网'),('core-concept-comparisons','易混概念对照'),('acsi-abstraction','ACSI 抽象接口')], '能解释一次/二次、站控/间隔/过程层，以及网络与逻辑层级的区别。'),
    ('05', '进入标准信息模型', '从领域对象到类型与实例', [('ied-data-model','IED → LN → DO → DA'),('data-attributes-reference','属性和值'),('cdc-common-types','品质、时间与公用类型'),('control-input-models','控制和输入')], '能沿一个 DO 找到 CDC、FC、q/t、单位与枚举来源。'),
    ('06', '阅读工程配置', '用 XML 引用形成可核对证据', [('engineering-files','工程交换文件'),('scd-in-ten-minutes','十分钟读懂 SCD'),('scd-reading-toolbox','引用追踪工具箱'),('annotated-xml-examples','最小 XML 示例'),('control-blocks-reference','数据集与控制块')], '能按实例和类型两个方向追踪 FCDA、控制块和订阅，识别缺失证据。'),
    ('07', '学习通信与软件语义', '模型、服务与传输分别核对', [('communication-process','通信与过程层'),('acsi-services','ACSI 服务'),('service-mapping','服务映射'),('packet-analysis','静态协议字段'),('developer-data-contracts','开发人员的数据契约')], '能分清 SV、GOOSE、Report 与控制；正确处理质量、时间、重复与失效。'),
    ('08', '完成静态工程练习', '把所学串成证据链', [('feeder-learning-case','馈线综合练习与答案'),('engineering-model-reading','工程证据核查'),('engineering-practice','变更与交付'),('symptom-troubleshooting','分层排障'),('safety-and-test-boundaries','安全与测试边界')], '能列出配置能证明什么、还缺什么；不以名称或报文到达代替业务和现场证据。'),
]
stage_html = ''.join(f'<li><span class="stage-number">{n}</span><div><h3>{title}</h3><p>{desc}</p><p>{" → ".join(link(f,t) for f,t in links)}</p><p class="meta"><b>完成标志：</b>{goal}</p></div></li>' for n,title,desc,links,goal in stages)
page('learning-path', '从编程到电气：零基础学习路线', '先认识电网和设备，再理解信号、功能、信息模型与工程配置。', [
    section('start', '读者起点与学习方式', '<p>你已经熟悉类型系统、引用、网络和状态机，可以快速理解 XML 和对象层级；更需要补的是“数据描述了哪一种物理现象，以及系统为什么这样动作”。先完成下面 8 阶段，再把 LN/CDC 全表作为字典使用。每一步的完成标志比阅读时长更有用。</p><div class="notice">首次阅读从' + link('electrical-fundamentals','电气量与三相电') + '开始。已熟悉电气基础者可直接进入第 5 阶段；正在查对象时用首页术语检索与标准文库。</div>'),
    section('route', '按前置知识推进的 8 阶段', '<ol class="learning-stages">' + stage_html + '</ol>'),
    section('gaps', '这次补齐了哪些知识缺口', table(['原有基础','需要补齐的桥梁','现在的入口'], [
        ('LN、CDC 和标准数据全表','电压、电流、三相、功率与电能的物理含义',link('electrical-fundamentals','电气基础')),
        ('Substation / Bay 与设备缩写','一次接线、母线、端子/连接节点与设备功能',link('primary-diagrams','一次接线')),
        ('SV、MMXU、品质和时标','CT/VT 变比、方向、采样、测量窗口与事件时间',link('measurement-chain','测量链')),
        ('PTOC / PTRC / XCBR 和控制模型','故障、选择性、出口、断路器机构与反馈闭环',link('protection-control-fundamentals','保护控制基础')),
        ('协议字段与服务清单','缓存失效、重复事件、品质、跨设备时间和控制结果',link('developer-data-contracts','开发数据契约')),
        ('分散的专题和参考工程证据','一个教学馈线贯穿物理、对象、服务与排查',link('feeder-learning-case','综合练习')),
    ]) + '<p>后续进阶可研究短路计算、接地系统与零序网络、变压器接线组别和差动补偿、保护整定配合、IEC 62351 安全工程及项目试验规范。本路线只介绍理解 IEC 61850 所需的前置概念，不把这些进阶专题声称为已完整覆盖。</p>'),
    section('lookup', '学到哪里，再查哪一部分标准', table(['遇到的问题','回查入口'], [
        ('为何分信息模型、服务与映射？',link('standard-library-overview','标准概论') + ' → ' + link('standard-part-7-1','7-1 原理')),
        ('读取、报告、控制的对象与服务？',link('standard-part-7-2','7-2 ACSI')),
        ('一个 DO 有哪些属性，品质、FC、单位是什么？',link('standard-part-7-3','7-3 CDC') + ' → ' + link('cdc-attribute-dictionary','属性字典')),
        ('LN 的功能和 DO 的标准语义？',link('standard-part-7-4','7-4 LN') + ' → ' + link('ln-data-dictionary','数据字典')),
        ('XML 实例如何引用类型、网络与订阅？',link('standard-part-6-scl','第 6 部分 SCL')),
    ])),
], ['iec'])

page('electrical-fundamentals', '电气基础：从电路到三相功率', '把电压、电流、频率、功率和电能变成可解释的数据。', [
    section('circuit', '电网在输送什么：回路、电压与电流', '<p>发电侧把其他形式的能量转换为电能，经输电、变电、配电送到负荷。变压器改变电压等级；相同有功功率和功率因数下，提高输送电压能减小电流，从而降低导体的 I²R 损耗。它不凭空产生能量。</p><p>电压 U 是两个点之间的电势差，单位 V；电流 I 是电荷流动的速率，单位 A。电流需要闭合路径，不能只看一条出线就认为没有回路。一次单线图把三相画成一条线，回路的中性点、接地、相间返回路径须结合接线方式理解。</p>' + table(['概念','入门关系','使用条件与开发提示'], [
        ('电阻 R / 阻抗 Z','直流电阻：U=IR；正弦稳态相量：U̲=Z̲I̲','Ω。交流中 R、感抗和容抗共同影响幅值、相位；不要对故障波形直接套稳态比值。'),
        ('节点电流 / 回路电压','按约定方向，节点电流代数和为 0；闭合回路电压代数和为 0','是电路建模关系；测量误差、互感器变比和相位须另处理。'),
        ('额定值 / 实测值 / 定值','设备标称能力 / 当时测量 / 保护控制参数','额定 600 A 不表示一直流 600 A；整定阈值不是实时电流。'),
        ('一次 / 二次','主电力回路 / 测量保护控制回路','“二次值”也可特指互感器输出值，要说明语境。'),
    ])),
    section('ac', '交流、有效值和相量', '<p>正弦量可写为 u(t)=√2·U·sin(2πft+φ)，其中 U 为有效值（RMS），f 为频率，φ 为相位。50 Hz 的周期为 20 ms，这只是本页教学条件。有效值反映与相同电阻发热等效的大小；纯正弦时峰值=√2×有效值，有直流偏置或谐波时不能照搬。</p><p>相量用幅值和角度表示同一频率的正弦量，适于比较电压、电流相位；它不是一帧 SV 中的瞬时采样点。SV 提供采样序列，装置算法根据窗口计算 RMS、相量、功率等。窗口、滤波、基准角和更新周期不同，结果可以不同。</p><div class="notice">开发人员要先问“这是瞬时值、RMS、基波相量还是统计量”，再讨论数值是否一致。深入见' + link('ln-measurement','M 组的相量、谐波与统计窗口','phase') + '。</div>'),
    section('three-phase', '三相：相量差产生线电压', '<p>三相交流的三组相量在理想对称系统中依次相差 120°。以对称星形相电压为例，线电压 UAB 是 UA 与 UB 的相量差，因此线电压有效值 UL=√3·Uph。相序表示三相达到相同相位的先后次序；相别、相序和电流正方向必须独立记录。</p>' + table(['场景','关系','不能省略的前提'], [
        ('对称星形连接','UL=√3·Uph；IL=Iph','相电压指相对星点；对地电压还取决于中性点接地及运行状态。'),
        ('对称三角形负载','UL=Uph；IL=√3·Iph','这里的相量是负载支路量，不要把“相电流”直接等同于线路导体电流。'),
        ('三相不平衡 / 接地故障','逐相/序分量分析','不能用一个单相量乘 √3 概括全部状态；零序回路取决于接地和变压器接线。'),
        ('三相残流','Ia+Ib+Ic=3I0（相量和）','不是三相 RMS 幅值直接相加；CT 极性、接线和专用零序 CT 也影响读数。'),
    ]) + '<p>例如对称星形系统 UL=10 kV，则 Uph≈5.77 kV。“10 kV”在系统标称语境通常指线电压，但具体数据对象仍要核对量定义。详见' + link('ln-measurement','序分量与相量参考','phase') + '。</p>'),
    section('power', '有功、无功、视在功率与电能', '<p>在对称三相、正弦稳态条件下，用线电压 UL、线电流 IL 的有效值，有 P=√3·UL·IL·cosφ，Q=√3·UL·IL·sinφ，S=√3·UL·IL，且 S²=P²+Q²。有功 P 对应平均能量转换；无功 Q 描述储能元件与电源间的周期性交换；视在 S 反映电压与电流对设备容量的要求。</p>' + table(['量','单位','看数据时要问什么'], [
        ('P / Q / S','W / var / VA','k、M 倍率是什么？正负方向按发电、受电还是指定参考？'),
        ('功率因数 PF','无量纲，通常 P/S','非正弦时不能总当作基波 cosφ；确认是否位移因数。'),
        ('有功电能 E=∫Pdt','Wh / kWh','累计方向、起算点、冻结时间、复位/回卷和倍率是什么？'),
        ('频率 f','Hz','测量窗口与品质怎样？50 Hz 是此例条件，不是所有系统唯一值。'),
    ]) + '<p>原创算例：UL=10 kV、IL=200 A、cosφ=0.9（电流滞后）时，S≈3.464 MVA、P≈3.118 MW、Q≈1.510 Mvar。若有功保持 2 h，电能约 6.235 MWh。读数变成 kW 后应约为 3118，不能把它当成 3.118 W。</p><p class="meta">公式原理核对：<a href="' + SOURCES['power'][1] + '">Electrical Installation Guide 功率关系</a>。数值为原创算例，不用于设备选型或整定。</p>'),
    section('fault', '正常、过载、短路和接地不是同一件事', table(['状态','物理含义','为什么保护逻辑不同'], [
        ('正常负荷','在运行约束内供给用电设备','电流非零通常是正常状态，不能“有电流就报警”。'),
        ('过载','超过允许负载或热能力','往往考虑热积累与持续时间；不能只比较一次瞬时峰值。'),
        ('短路','不同电位点形成异常低阻通路','可能造成大电流、电压跌落和暂态，但故障电流受电源与阻抗限制。'),
        ('接地故障','带电回路与地出现非预期通路','大小与特征受中性点接地方式影响，不能一概认为都是很大的电流。'),
        ('测量/通信异常','物理过程可能正常，观测链却失真或失效','不能把无效值、缺数据当作 0 A 或断电。'),
    ]) + '<p>这些区别决定要读哪些测量量、序分量、保护起动和质量信息。保护功能的完整设计还需系统分析，继续看' + link('protection-control-fundamentals','保护原理与动作链') + '。</p>'),
    section('check', '自检：把数值放回物理语境', answer('收到 0 A 就能认定线路停电吗？', '<p>不能。先检查量的品质、时标、单位、CT 通道和数据新鲜度；即使真实无负荷电流，也不证明设备无电压或已隔离。</p>') + answer('10 kV、200 A 能否直接算出有功功率？', '<p>还缺相数/接线、平衡与波形条件、功率因数和方向定义。对称正弦三相下可以先算 S≈3.464 MVA；P 仍需 PF。</p>')),
], ['power','protection'])

primary_svg = '''<figure class="concept-figure learning-figure"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 620" role="img" aria-labelledby="single-title single-desc"><title id="single-title">原创单母线馈线单线示意</title><desc id="single-desc">母线到隔离开关、断路器、电流互感器和馈线。VT 与接地开关为支路；虚线表示测量信号。位置仅用于学习。</desc><path class="primary-wire" d="M70 52H580M200 52V106M200 144V208M200 252V520M200 82H450V117M200 380H440V422M440 468V498"/><path class="primary-wire" d="M200 144L220 110M440 468L460 428M420 498H460M426 508H454M434 518H446"/><rect x="182" y="208" width="36" height="44" fill="white" stroke="#204d6c" stroke-width="2"/><circle cx="200" cy="314" r="22" fill="none" stroke="#204d6c" stroke-width="2"/><circle cx="450" cy="139" r="22" fill="white" stroke="#204d6c" stroke-width="2"/><path d="M222 314H325M472 139H565" class="svg-dash"/><text x="74" y="34" class="svg-title">单母线（示意）</text><text x="56" y="133" class="svg-text">QS 隔离开关</text><text x="245" y="235" class="svg-text">QF 断路器</text><text x="335" y="319" class="svg-text">CT → 电流采样</text><text x="482" y="178" class="svg-text">VT → 电压采样</text><text x="458" y="450" class="svg-text">接地开关</text><text x="108" y="550" class="svg-title">馈线 → 负荷</text><text x="36" y="589" class="svg-note">实线：电气连接　虚线：测量信息　开关图形仅为阅读示意</text></svg><figcaption>原创简化图：CT 套于主回路；VT 通过支路取电压；接地开关接向地。省略保护器件、其他隔离设备与中性点，不能当作施工或倒闸接线图。</figcaption></figure>'''
page('primary-diagrams', '一次接线：从单线图认识设备与拓扑', '先沿能量回路定位设备，再追踪测量、保护和控制。', [
    section('position', '先分清图纸层次', '<p>一次系统承担电能的输送、变换和分配；二次系统负责测量、保护、控制、信号与辅助供电。单线图重在电气连接；二次原理图重在互感器、接点、线圈与逻辑回路；端子图/接线图重在端子及电缆连接；SCD 重在模型和通信工程引用。四种材料能互相核对，但各自省略的信息不同。</p>' + primary_svg),
    section('devices', '一次设备各自解决什么问题', table(['设备 / 常见缩写','功能','关联模型与限制'], [
        ('断路器 Circuit Breaker / CB（图中 QF）','在规定能力内合、分正常电流和故障电流','XCBR 表示断路器信息；线圈和机构完成物理动作。收到命令不代表已分位。'),
        ('隔离开关 Disconnector / DS（图中 QS）','提供隔离功能、建立隔离边界','常关联 XSWI；一般不承担负荷或短路电流开断，特殊额定切换能力须查设备资料。'),
        ('接地开关 Earthing Switch / ES','将指定导体接地，供安全措施等使用','与隔离开关、断路器有联锁关系；位置语义仍需查工程对象定义。'),
        ('CT / VT（PT）','测量电流 / 电压，并使测量保护回路获得适合的信号','TCTR / TVTR 描述相应信息；可由常规互感器或其他传感器实现。'),
        ('电力变压器 Power Transformer','连接不同电压等级，并由接线组别等影响相位与零序通路','不等同于测量用 CT/VT；YPTR、YLTC 等功能须按设备配置查证。'),
        ('母线 Busbar / 线路 Line','汇集回路 / 连接电网不同位置','母线是电气导体，不是 Ethernet 总线；Busbar 与 station bus 语境不同。'),
        ('避雷器 / 电容器 / 电抗器','限制过电压 / 无功补偿 / 限流或无功调节等','功能取决于实际接线；不能由一个设备名推定全部用途。'),
    ]) + '<p>QF、QS 是本页助读代号，不是全行业统一设备编号。IEC 61850 LN 类名也不是一次图的图形符号。设备模型深入见' + link('ln-switch-transformer','X/T/Y 组') + '。</p>'),
    section('topology', '母线、间隔与电气连接', '<p>一个间隔 Bay 围绕线路、主变或母联等回路组织设备和功能。单母线、分段、双母线等接线方式决定可连接路径；开关状态改变当前拓扑。母联连接母线系统，分段连接同一母线的分段；项目称谓须按图纸解释。</p><p>SCL 一次结构可用 <code>Terminal</code> 的 <code>connectivityNode</code> 引用 <code>ConnectivityNode</code> 表达连接。同一节点表示按模型声明的电气相连；它不同于 LN 的网络通信端点。只找 Bay 目录或统计 LN 数量不能得到完整实时拓扑，实时开关状态、模型完整性和应用规则还需另外核对。</p>' + table(['读图顺序','记录内容','下一层证据'], [
        ('找电压等级与母线','明确 kV、母线名称和馈线接入点','VoltageLevel 与图纸图例'),
        ('沿主回路找开关与 CT','记录断路器、隔离点、互感器相对位置','ConductingEquipment / Terminal / ConnectivityNode'),
        ('找支路与跨区边界','VT、接地支路、变压器绕组与 CT 位置','不要把全部图元排成一根串联链'),
        ('再找功能与 IED','保护区、测量点、操作对象','LNode → iedName / ldInst / prefix / lnClass / lnInst'),
    ])),
    section('secondary', '二次回路与站用直流为何必须认识', '<p>常规方案中，CT/VT 二次回路把电气量送入装置；保护出口接点、控制电源、跳闸线圈和断路器机构构成执行链。站用直流系统通常由充电装置与蓄电池等组成，在站用交流异常时维持关键保护控制供电，具体配置以设计为准。</p><p>数字化方案用 MU、SV、GOOSE 和过程接口替代部分信号电缆，但传感器、机构、控制电源、接线与辅助接点仍然存在。网络连通不能证明跳闸直流回路完好。阅读到“出口成功、位置未变”时，应想到机构、电源、回路与反馈，不只想到 IP。</p><p>同一一次设备可由多个 LN 共同表达，一台 IED 也可以实现多种功能。继续看' + link('primary-and-roles','一次对象到 LNode / LN 的桥梁') + '。</p>'),
    section('check', '自检：图中哪些线不能当成网线', answer('SCD 里有 XCBR，是否证明它一定连接到图中的断路器？', '<p>不能。先核对 LNode、一次设备和接线/点表；再核对装置的实际 I/O 与试验记录。LN 类说明模型语义，不能独自证明物理绑定。</p>') + answer('断路器分位是否足以认定已满足检修隔离？', '<p>不能。分位只是一个设备状态，隔离、接地、验电与工作许可等由现场规程和实际措施确定。软件显示不能充当作业许可。</p>')),
], ['iec','secondary','ct'])

page('measurement-chain', '测量链：互感器、采样、品质与时间', '从一次电流电压到 SV、测量对象与事件记录。', [
    section('chain', '同一个电流，为什么会有多种数字', '<p>一次电流经过传感、变换、采样和算法，才能成为系统显示值。常规 CT/VT 可直接接入保护测控 IED；数字化过程层可先由 MU 采样，再以 SV 提供给多个装置。不同架构有不同采样位置，不能假定每台 IED 都有独立 MU。</p>' + flow('sample-chain','一次量到应用显示的测量链', [
        ('一次量 → CT / VT 或传感器','记录测量点、相别、变比、极性和额定条件'),
        ('模拟信号 → A/D 采样（可在 MU 内）','SV 传递采样序列；还需核对通道、缩放和同步'),
        ('算法 → RMS / 相量 / 功率','滤波与窗口决定更新速度、相位基准和暂态响应'),
        ('对象 → 数据集 / 报告 → 应用','把数值与品质、时标、单位和工程来源一起使用'),
    ], '原创流程：是信号变换关系，不是每个工程必有的设备串联拓扑。')),
    section('transformer', 'CT / VT：变比、方向、负载与失真', table(['项目','如何理解','开发人员要保存的元数据'], [
        ('CT 变比','例如 600/1 A，额定电流比 600；理想范围内 0.5 A 二次对应 300 A 一次','一次/二次额定值、当前档位、缩放发生的位置，避免再乘一次变比。'),
        ('VT 变比','例如同一量定义下的 10000/100 V，比值 100','相对地还是线间；是否已换算；实际铭牌与配置，不凭电压等级猜变比。'),
        ('极性与方向','端子极性和参考方向决定相位、功率方向、差动比较','相别、接线、正方向、相角基准；负数不自动表示故障。'),
        ('负载 Burden / 准确特性','CT/VT 二次设备及引线构成负载，影响准确度','保护/计量用途、准确特性、额定负载；同一一次量可有不同测量绕组。'),
        ('CT 饱和','大电流、暂态和负载等可能使输出偏离理想比例','幅值与波形失真可能影响保护和测量，不能当作普通量程线性缩放处理。'),
    ]) + '<p class="caution">物理边界：常规 CT 在一次有电流时二次开路可能产生危险高电压；VT 二次短路也有危险。这里用于理解设备与数据链，不提供现场拆接步骤。CT 原理边界见 <a href="' + SOURCES['ct'][1] + '">Schneider 官方说明</a>；传感器类型与检修方式以设备资料和规程为准。</p>'),
    section('sampling', '采样、窗口与死区：三种不同的时间尺度', '<p>原创算例在 50 Hz、80 点/周波条件下，采样率 fs=4000 点/s，采样间隔为 250 μs；这只是算术示例，实际 <code>smpRate</code> 的解释还需结合版次、<code>smpMod</code>、采样规范与设备配置。不能凭一个数直接认定单位，也不能把点/s 等同于帧/s，一个报文可携带多个 ASDU。</p>' + table(['机制','解决的问题','对应用的影响'], [
        ('采样率与抗混叠','连续量如何变成离散序列','奈奎斯特条件针对带限信号；还需模拟/数字滤波，不能只提高报文频率。'),
        ('RMS / 相量窗口','从一段样本估计特征量','同一瞬间的 SV 点值不能与窗口 RMS 直接相等比较。'),
        ('测量死区与报告触发','避免很小变化反复产生更新','无新报告可能是值未跨死区，不一定是网络故障。'),
        ('完整性周期 / GI','按周期或总召获得数据快照','报告间隔、采样周期和显示刷新周期是不同参数。'),
    ]) + '<p>模拟量、整数缩放与 <code>sVC</code> 等语义见' + link('cdc-common-types','公用数据类型') + '；死区和触发见' + link('cdc-measurement','测量 CDC') + '。</p>'),
    section('quality', '数值、品质、时标和单位组成一个整体', '<p>一个浮点数本身不足以表达电力测量。至少要同时理解对象引用、FC、数值、q、t、单位/倍率和来源；具体组合以该 DO 的 CDC 定义为准，不意味着所有对象都无条件包含同一组属性。</p>' + table(['信息','用途','典型误用'], [
        ('q 品质','有效性、细节、来源、测试、操作员闭锁等按类型定义解释','把 invalid、questionable、oldData 或 test 忽略后直接显示“正常”。'),
        ('t 与时间质量','对象的事件/更新时刻及同步状态；具体时刻语义取决于对象','把接收时间当作源时间，或把所有 t 都解释成采样发生时刻。'),
        ('单位 / 倍率','例如 A 与 kA，W 与 MW','已有工程值再乘 CT 变比，或重复应用十进制倍率。'),
        ('双点位置','中间态、分、合、异常等语义由类型与编码核对','把所有非零值转 true 会混淆分合及异常。'),
    ]) + '<p>具体 Quality 位及位置编码以' + link('cdc-common-types','公用类型定义') + '、' + link('ln-values-reference','取值参考') + '和实际 <code>EnumType</code> 为准。</p>'),
    section('time', 'SOE、接收时间与对时', '<p>SOE（Sequence of Events）通常指按事件时间记录和分析状态变化的事件顺序。源事件时间、装置记录时间、网关接收时间和应用展示时间不是同一时刻；传输缓冲、时钟误差与重连补传都可能改变到达顺序。</p><p>跨装置比较事件要核对时钟同步状态、误差和时间质量。采样对齐又不同于仅给事件标记日历时刻：多端量比较要求适合应用的同步性能。PTP、IRIG-B、SNTP 等须依据配置、时钟链和设备能力选用，不能以“已经对时”统一承诺所有应用精度。</p><p>同步原理核对：<a href="' + SOURCES['secondary'][1] + '">SEL 数字二次系统与时间同步</a>。库内参考：' + link('acsi-engineering-workflows','时间与服务工程核查') + '。</p>'),
    section('check', '自检：先确认尺度再比较', answer('600/1 A 的 CT，应用已收到 300 A，还需要再乘 600 吗？', '<p>先确认该值是否已为一次工程值。若已换算则不能再乘；若只是未换算二次量才按已核对比例转换。单位 A 本身不足以区分一次/二次语境。</p>') + answer('10:00:00 的事件在 10:00:03 收到，能否直接报告 3 秒网络延迟？', '<p>不能。还要证明两端时钟可比，并排除报告缓冲、处理、重连补传等延迟。应分别保存源时间和接收时间及其质量。</p>')),
], ['ct','secondary','iec'])

page('protection-control-fundamentals', '保护与控制：从故障到跳闸闭环', '认识保护区、选择性、动作判据、执行回路与位置反馈。', [
    section('purpose', '保护为何存在：检测异常并限制影响范围', '<p>保护系统在满足判据时识别故障或异常，按设计切除故障或发出告警。选择性要求尽量只切除必要范围；速动性、灵敏性、可靠性需结合系统条件平衡。可靠性同时涉及该动作时能动作，以及不该动作时不误动。</p><p>保护区由一次设备与测量边界等确定，CT 安装位置对差动保护区尤其重要；它不是一个 VLAN，也不必等于一个 Bay 或一台 IED。主保护与后备保护可能覆盖不同范围、使用不同判据与时限。不能把页面中的功能表当作完整保护配置或整定规则。</p>'),
    section('principles', '四种典型原理如何建立直觉', table(['原理 / 常见编号','观察什么','成立条件与关联 LN'], [
        ('过流 50 / 51','电流是否满足门槛及时间条件','速断/延时、方向和配合须按工程定义；PTOC 常用于延时过流，其他瞬时功能另查相应 LN。'),
        ('差动 87','保护区各端电流经方向、变比和相位补偿后的不平衡','PDIF；励磁涌流、CT 饱和、同步及补偿都可影响判据，不能直接拿两列 RMS 相减。'),
        ('距离 21','电压、电流形成的故障测量阻抗与区段判据','PDIS；不是用网络时延测地理距离，也不是对任意原始 U/I 就得出故障位置。'),
        ('零序 / 接地相关','3I0、3U0 等残余/序分量及其方向、时间条件','LN 依具体功能查证；受接地系统、CT 接线与变压器接线影响。'),
    ]) + '<p>50/51、87、21 等是常见 ANSI/IEEE 装置功能编号，属于助读对照；LN 类名是另一套语义，不能一对一替换所有工程配置。深入看' + link('ln-protection','P 组功能表') + '与' + link('protection-ied-guide','保护 IED 范围') + '。</p><p class="meta">原理范围核对：<a href="' + SOURCES['protection'][1] + '">SEL 电力系统保护课程</a>。本页没有提供可投产定值。</p>'),
    section('trip', '起动、动作、出口、分闸是不同事件', flow('trip-chain','保护到断路器的动作链', [
        ('测量与判据 → 保护起动 / 动作','例如 PTOC.Str / Op；起动不必然形成最终跳闸'),
        ('跳闸逻辑 → 出口要求','例如 PTRC.Tr；还需逻辑、投退、闭锁和出口绑定'),
        ('硬接点或 GOOSE → 执行接口','过程接口 / 智能终端驱动跳闸回路；网络到达不是动作完成'),
        ('控制电源 → 线圈 → 断路器机构','执行需要实际回路、机构与能量；设备动作有机械过程'),
        ('辅助接点 → 位置信号 → 应用','XCBR.Pos 等反映观测反馈，需同时检查品质与时间'),
    ], '原创逻辑链：功能可在同一 IED 内实现或跨设备分配。图不规定固定 LN 组合与接线。') + '<p>保护动作由保护逻辑触发，通常并非一次 MMS <code>Operate</code> 请求；不能把保护出口与操作员遥控混为同一个服务流程。</p>'),
    section('control', '遥控、联锁与位置反馈', '<p>操作员控制是一条带权限与条件的业务链。选择、执行和返回结果依 <code>ctlModel</code> 与装置能力而定；选择成功、执行服务响应、命令终止与位置变化表示不同阶段。CILO 可提供联锁信息，CSWI 可表达开关控制，XCBR/XSWI 表达设备信息；实际分配和连线以工程与装置逻辑为准。</p>' + table(['概念','作用','不能由什么代替'], [
        ('就地 / 远方','决定当前控制来源是否被允许','TCP 已连接或有账号不代表具备设备操作权限。'),
        ('联锁 Interlocking','核对其他设备状态和条件，防止不允许的操作','单个 CILO 对象存在不证明联锁接线和逻辑正确。'),
        ('闭锁 / 投退','根据条件禁止某功能，或使某功能投入/退出','不能把所有闭锁合为一个全局 boolean，也不能把某质量 test 位当作投退命令。'),
        ('同期检查 / 重合闸','特定场景下检查合闸条件 / 故障切除后按逻辑再合闸','不适用于每个间隔；RSYN / RREC 等按功能查证。'),
        ('位置反馈','报告实际观测的分合/中间/异常位置','命令已发送或服务返回成功不能直接写成“设备已合”。'),
    ]) + '<p>控制服务的完整语义见' + link('control-input-models','控制与输入模型') + '、' + link('cdc-control','可控 CDC') + '。</p>'),
    section('failure', '失灵、重合闸与主后备的关系', '<p>发出跳闸要求后，如果按设计判据、时限等判断断路器未切除故障，断路器失灵保护可启动进一步切除范围。常会综合电流与辅助接点等信息，而不是对界面弹窗超时做一次简单重试。RBRF 表达失灵相关信息，RREC 表达重合闸相关功能；不意味着所有工程都采用同一判据和时序。</p><p>工程分析应按因果链记录“故障→保护起动→动作→出口→反馈→电流变化→后续功能”。SOE 的到达顺序不能直接当作因果顺序，需核对源时间及品质。</p>'),
    section('check', '自检：把服务与物理动作分开', answer('PTOC.Op.general=true、XCBR.Pos 仍为合位，先能得出什么结论？', '<p>只能说当前观测显示保护动作与位置尚未形成预期闭环。Op 为结构化动作对象，这里读取其 general 属性，不能把整个 DO 当 boolean。还需核对时序、品质、PTRC/出口逻辑、订阅或硬接点、控制电源、机构和反馈绑定，不能单独判定网络故障或断路器失灵。</p>') + answer('遥控请求超时，软件能否自动再发一次？', '<p>超时意味着结果未知，实际设备可能已动作。先依据服务模型核对终止结果、位置和控制状态，由受控业务流程决定后续动作；不能照搬普通查询的自动重试策略。</p>')),
], ['protection','secondary','iec'])

page('developer-data-contracts', '给开发人员的数据契约与工程边界', '把熟悉的软件概念与电力数据语义对接。', [
    section('mapping', '哪些软件经验可复用，哪些类比需要限界', table(['熟悉的概念','可用于理解','类比的边界'], [
        ('类、实例与结构体','LN/DO/DA 与 LNodeType/DOType/DAType','CDC 定义领域语义与属性约束，不能仅按同名字段或 JSON 结构合并。'),
        ('外键与依赖图','FCDA、类型 ID、ExtRef 的引用追踪','引用存在只证明模型关系，不证明订阅配置已下载或现场回路正确。'),
        ('发布订阅 / 事件','GOOSE、报告和输入订阅','不同服务的重传、缓冲、触发、接收判断与失效处理不同，不能套统一消息队列承诺。'),
        ('RPC / 状态机','控制请求、选择、操作、终止','返回值和物理反馈分层；不可承诺“请求成功=断路器完成动作”。'),
        ('版本化 Schema','SCL 命名空间、版次与工程修订','根命名空间字符串不足以区分全部模型/服务能力；还需版本、修订、命名空间与设备声明。'),
    ])),
    section('record', '建议在应用中保存的完整测点语境', '<p>以下是原创应用层记录建议，不是 IEC 61850 标准 JSON，也不是要求每个数据对象都有这些属性。按实际 CDC 和服务记录适用项，明确原始值与派生值。</p><pre><code>' + escape(json.dumps({
        'objectReference': 'LearnIEDMEAS/MMXU1.A.phsA.cVal.mag.f', 'fc': 'MX',
        'value': 300.0, 'unit': 'A', 'valueBasis': 'primary RMS; confirmed by engineering map',
        'quality': {'validity': 'good', 'test': False},
        'sourceTime': 'original source timestamp', 'timeQuality': 'preserved from source',
        'receiveTime': 'application receive timestamp', 'freshness': 'evaluated by application policy',
        'engineeringRevision': 'teaching-R1', 'evidence': 'type chain + signal map; physical binding pending'
    },ensure_ascii=False,indent=2)) + '</code></pre><p><code>LearnIEDMEAS</code> 是本例假定的 LDName；对象引用按 <code>LDName/LNName.Data...</code> 组织，不把 IED、LD 都当作斜杠目录。实例与 LDName 构造规则应由 SCL 和适用版本核对。本例数值读取相量幅值的浮点成员，q/t 按相应结构化对象关联；<code>quality</code> 为节选，不能用它覆盖完整 Quality 字段。</p><p><code>valueBasis</code>、<code>freshness</code>、<code>engineeringRevision</code> 是建议的应用元数据；单位、变比、参考方向从工程证据确认，不能凭对象名自行补齐。</p>'),
    section('failure', '失效处理：不把观测缺失改写为物理状态', table(['遇到的现象','合适的处理方向','常见错误'], [
        ('连接断开 / 数据过期','保留最后值并明确失效原因与接收时刻，按对象和应用策略判断新鲜度','把超时自动改为 0、分闸或正常。'),
        ('GOOSE 重传或重复接收','依据控制块、状态/序列号及接收状态处理；结合生存时间判断失效','每收到一帧都创建一次新业务跳闸事件；把链路重传当作物理重复动作。'),
        ('报告重连 / 缓冲补传','核对 BRCB/URCB、EntryID、缓冲溢出和 GI/完整性信息','承诺永不漏事件，或把补传到达顺序当作源事件顺序。'),
        ('测试/取代/品质变化','保留来源和品质，按服务与装置规则区分运行、测试和取代','“有值就可用”；把 Quality.test 与 GOOSE simulation、LN.Mod 混为一位。'),
        ('控制结果未知','保存请求关联、状态与终止信息，核对新位置及品质，走业务决策','超时立即无限重试，或提前把界面位置改为目标值。'),
    ]) + '<p>详细属性与接收机制回查' + link('acsi-runtime-models','运行模型') + '、' + link('communication-process','通信与过程层') + '和' + link('safety-and-test-boundaries','安全与测试边界') + '。上表是应用设计方向，不是替代协议状态机的伪实现。</p>'),
    section('versions', '从“解析成功”到“工程成立”有几层检查', '<ol><li><b>语法层：</b>XML 是否可解析，字符编码和命名空间是否正确。</li><li><b>模式层：</b>对应版次的 XSD 是否通过；通过仍不保证语义和工程完整。</li><li><b>引用层：</b>实例、类型、FCDA、DataSet、控制块和外部订阅能否正反追踪。</li><li><b>语义/能力层：</b>CDC、FC、枚举、单位、服务配置是否符合指定基线、设备能力与工程规范。</li><li><b>交付层：</b>源文件、修订、工具导入导出、设备配置版本与变更记录能否对应。</li><li><b>现场功能层：</b>实际接线、功能逻辑、时序、网络性能与受控试验结果是否满足要求。</li></ol><p>配置阅读工具最多证明它实际检查到的层次。对于未检查的项应写“未验证”或“证据缺失”，不要把上游通过等价为现场通过。IEC 官方将语义、SCL 和通信作为相互配合的部分，参见 <a href="' + SOURCES['iec'][1] + '">IEC 技术原理</a>。</p>'),
    section('security', '网络工程、权限和变更也是数据的一部分', '<p>IP/MAC/APPID/VLAN 用于连接与流量识别，不承载完整业务含义。VLAN 逻辑隔离也不等同于认证、加密或访问授权。PRP/HSR 等冗余提高特定故障下的可用性，但不代替业务去重、告警和一致性检查；两网、设备双配置与应用主备须分别分析。</p><p>安全工程可继续研究 IEC 62351、账户权限、时间源、工程访问及审计；具体方案按项目要求和设备支持核对。本库不配置在线服务或设备。变更应保存修改对象、影响订阅、配置修订、回退依据与复核记录，详见' + link('engineering-practice','工程实践与变更管理') + '。</p>'),
    section('check', '自检：两种“正确”之间还缺什么', answer('两个同名 stVal 可以按字段名合并吗？', '<p>不能。先按对象引用、DO 的 CDC、DA 类型、FC、枚举、版次与测点绑定确认语义。断路器位置、告警状态和保护动作都可能有 stVal，却不是同一个业务类型。</p>') + answer('为什么应用还要有 freshness，q=good 不够吗？', '<p>q 是源对象的品质表达；应用在断链后仍可能缓存最后一次 good。新鲜度反映当前接收和服务状态，需要独立保存，不能直接伪造标准 q 位。</p>')),
], ['iec','secondary'], '工程应用')

page('feeder-learning-case', '综合练习：从一条馈线读到工程证据', '一个原创场景，串起一次设备、测量、保护、模型、服务与排查。', [
    section('scenario', '教学场景与已知条件', '<p>虚构馈线 Learn-F01：单母线，线电压 10 kV、50 Hz；负荷在本算例中对称且正弦，电流 180 A、功率因数 0.9（滞后）。常规 CT 比为 600/1 A。功能说明要求采集电流、提供过流保护、跳开指定断路器，并把位置和动作事件送至 HMI。</p><p>这里没有整定值、完整 SCD 或真实地址。所有标识、数字和假设均为原创、脱敏教学用途，不等同于可投产工程。你要形成“已知、可计算、需证据、不能推断”四类记录。</p>'),
    section('physical', '第 1 步：从物理回路到测点', '<p>先画出母线、断路器、CT 和负荷的关系，标明 CT 位置、极性、相别与参考方向。若采用 MU，补充采样通道与数据输出关系；若直接模拟接入 IED，不应凭空增加 MU。</p>' + answer('计算本例的二次电流、S、P 和恒定 1 小时电能', '<p>理想 CT 线性范围内，I二次=180/600=0.3 A。S=√3×10 kV×180 A≈3.118 MVA；P=0.9S≈2.806 MW；恒定 1 h 时 E≈2.806 MWh。工程中还需核对测量误差、波形、方向和量的基准。</p>') + '<p>如果应用显示 0.3 A，先确认一次/二次语境；如果显示 180 A，不要再乘 600。需要的证据是铭牌、档位、装置缩放与点表，不能只看单位。</p>'),
    section('model', '第 2 步：写出功能与对象候选', table(['需求','可能的标准对象','必须补充的证据'], [
        ('电流测量','MMXU.A 的相分量，按实际 CDC 追踪 cVal / q / t 等','LNodeType → DOType → DAType；单位/倍率、相别、一次量基准与通道映射。'),
        ('延时过流保护','PTOC 的 Str、Op 等','功能说明、定值和投退；仅有 LN 不证明阈值、配合及出口。'),
        ('跳闸整合','PTRC.Tr 等','实际逻辑与出口绑定；可能在装置内，也可能跨 IED。'),
        ('断路器位置','XCBR.Pos 的状态、品质、时标','一次设备绑定、双点编码、辅助接点和反馈接线。'),
        ('控制','CSWI / XCBR 相关控制对象','实际控制对象与 ctlModel、权限和闭锁规则，不强制固定实现。'),
    ]) + '<p>名称仅为语义候选，实例可有前缀和其他部署。不要从 <code>LearnIED</code>、MAC 或 APPID 倒推线路功能。</p>'),
    section('services', '第 3 步：为数据交换选择适用服务', table(['交换内容','候选机制','检查证据'], [
        ('采样序列（若数字化过程层）','SV','SampledValueControl → DataSet / FCDA → SMV，订阅输入、采样配置和时间同步。'),
        ('跨设备快速跳闸 / 闭锁（若设计采用）','GOOSE','GSEControl → DataSet → GSE，接收 Inputs / ExtRef 及装置内逻辑。'),
        ('HMI 位置、测量、事件','MMS 报告等','ReportControl、DataSet、触发、缓冲与客户端配置；不是所有显示都逐点轮询。'),
        ('操作员命令','映射后的控制服务','ctlModel、选择/操作、权限与终止结果；实际位置仍从反馈对象核对。'),
    ]) + '<p>相同业务需求可以有不同设备与通信实现；教学链中的箭头不是强制网络架构。</p>'),
    section('evidence', '第 4 步：建立可复核的引用记录', '''<p>可以复制下面的记录格式离线练习。它是阅读表，不执行解析、发包或设备操作。</p><pre>一次位置：Learn-F01 / 断路器（教学）
绑定依据：一次图编号 + LNode 属性 + 设备点表（缺项记“待核对”）
实例：IED → AccessPoint → Server → LDevice → LN
类型：lnType → LNodeType.DO.type → DOType → DA / SDO → DAType / EnumType
数值：FC、类型、单位/倍率、一次/二次量、相别与方向、q / t
交换：DataSet.FCDA → 发布/报告控制块 → 通信项 / 接收端输入
业务：装置内逻辑 → 出口 / 反馈点；配置修订与设备版本
结论：哪些引用已找到；哪些需图纸、手册或试验才可证明</pre>''' + '<p>练习材料：' + link('annotated-xml-examples','原创 XML 片段') + '。完成教学追踪后，再阅读' + link('scd-model-evidence','脱敏 SCD 证据') + '与' + link('ln-scd-evidence','参考工程实例') + '；后两者的来源和摘录边界按页内说明使用。</p>'),
    section('troubleshooting', '第 5 步：对三个现象提出下一条证据', answer('保护动作已上送 HMI，但断路器仍显示合位', '<p>先核对源时间和品质是否可比、反馈是否新鲜，再查动作→PTRC/出口→硬接点或 GOOSE/订阅→执行回路→机构→辅助接点的链。HMI 有动作事件只证明该观察路径，不能证明跳闸输出已执行。</p>') + answer('三相测量为 0，但品质无效且连接刚断开', '<p>结论应是测量失效/未知，不能认定无电流或停电。保存最后有效值、失效状态与时间，核对接收链、数据源和测量链。</p>') + answer('SCD 能导入，是否完成了这个馈线的验收？', '<p>导入最多说明该工具接受了文件；还要分别检查模式、引用、语义、设备能力、交付版本和现场功能。必须写明本次究竟通过了哪一层检查。</p>')),
    section('completion', '完成标志与继续练习', '<ul><li>能从一次测量点追到一个模型对象，解释数值、单位、方向、q 和 t。</li><li>能区分保护起动、动作、出口、设备反馈，以及控制服务阶段。</li><li>能说出每个引用的目标以及缺失证据，不以命名推断实际绑定。</li><li>能把异常分到物理测量、逻辑、配置、通信、执行与应用显示各层。</li></ul><p>下一步到' + link('engineering-model-reading','工程模型阅读') + '记录证据，再按' + link('symptom-troubleshooting','现象排障路径') + '练习分层定位。返回' + link('learning-path','学习路线') + '检查是否已达到各阶段目标。</p>'),
], ['power','iec','secondary','protection'], '工程应用')

# Kept separately so navigation, checks and maintenance can use the same manifest.
(OUT / 'data' / 'learning-pages.json').write_text(json.dumps(PAGES, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
glossary = [
    ('learning-route','零基础学习路线','Developer learning path',['学习顺序','电气入门','开发人员'],'从电气量、一次接线、测量保护进入信息模型、SCL、通信和静态综合练习。','learning-path','route'),
    ('electric-circuit','电路与回路','Electric circuit',['电压','电流','阻抗','额定值'],'先明确电势差、电流方向和闭合路径；额定值、实时测量和保护定值是不同语义。','electrical-fundamentals','circuit'),
    ('three-phase-basics','三相与线电压','Three-phase quantities',['线电压','相电压','星形','三角形','相序'],'区分线量、相量和接线方式；√3 关系须按对称条件与量定义使用。','electrical-fundamentals','three-phase'),
    ('power-energy-basics','功率与电能','Power and energy',['有功','无功','视在功率','功率因数','kW','kWh','MW','MWh'],'P、Q、S 分别用 W、var、VA；电能是有功功率的时间积分，方向、单位和倍率须核对。','electrical-fundamentals','power'),
    ('wave-rms-basics','采样值、有效值与相量','Samples, RMS and phasors',['瞬时值','有效值','峰值','RMS','相量'],'瞬时采样点与算法窗口得到的 RMS/相量不同；纯正弦时峰值才等于 √2 倍 RMS。','electrical-fundamentals','ac'),
    ('fault-basics','过载、短路与接地故障','Overload and faults',['过载','短路','接地故障','中性点'],'故障特征受电源、阻抗和接地方式影响；无效数据或缺数据不能当成物理断电。','electrical-fundamentals','fault'),
    ('primary-diagram-guide','一次接线与单线图','Single-line diagram',['单线图','一次接线','二次原理图','端子图'],'先读电气连接与设备边界，再查模型与通信；一条线概略表示三相回路。','primary-diagrams','position'),
    ('breaker-basics','断路器与隔离开关','Circuit breaker and disconnector',['QF','QS','CB','DS','接地开关'],'断路器按额定能力开断电流；隔离、接地与控制反馈有独立作用，不能用一个位置代替完整安全边界。','primary-diagrams','devices'),
    ('busbar-topology','母线与电气拓扑','Busbar and topology',['母线','母联','分段','ConnectivityNode','Terminal'],'一次电气连接可通过 Terminal 引用 ConnectivityNode；它不同于网络连接，实时拓扑还需开关状态。','primary-diagrams','topology'),
    ('dc-trip-supply','站用直流与跳闸回路','Station DC and trip circuit',['站用直流','跳闸线圈','控制电源','辅助接点'],'网络传递信息，控制电源、执行回路与机构完成动作，辅助接点提供位置观测。','primary-diagrams','secondary'),
    ('ct-ratio-basics','互感器变比与极性','Instrument transformer ratio and polarity',['CT 变比','VT 变比','二次值','极性','一次值','二次开路'],'核对测量点、变比、相别、极性和缩放位置，避免重复换算；常规 CT 的带流二次开路有危险。','measurement-chain','transformer'),
    ('ct-saturation-basics','CT 饱和与负载','CT saturation and burden',['CT 饱和','二次负载','Burden','准确度'],'CT 输出可能偏离理想比例，影响测量和保护；准确特性与负载不能用线性缩放代替。','measurement-chain','transformer'),
    ('sample-window','采样率与测量窗口','Sampling and measurement windows',['采样率','抗混叠','奈奎斯特','死区','80 点'],'采样周期、算法窗口、报告触发和显示周期不同；smpRate 的单位须结合采样模式和版次。','measurement-chain','sampling'),
    ('soe-basics','事件顺序记录 SOE','Sequence of Events',['SOE','事件顺序','源时间','接收时间','对时'],'到达顺序不等于物理事件顺序；跨装置比较需核对时间质量、时钟误差和补传。','measurement-chain','time'),
    ('protection-zone-basics','保护区与选择性','Protection zone and selectivity',['保护区','选择性','速动性','灵敏性','主保护','后备保护'],'保护区以一次系统和测量边界等为依据；主后备的范围、判据和时限由工程设计决定。','protection-control-fundamentals','purpose'),
    ('protection-principles','过流、差动与距离原理','Protection principles',['50','51','87','21','过流原理','差动原理','距离原理'],'分别观察幅值与时间、补偿后的电流不平衡、故障测量阻抗；常见编号与 LN 类不可机械互换。','protection-control-fundamentals','principles'),
    ('trip-loop','保护动作与跳闸闭环','Protection-to-trip loop',['起动','动作','出口','跳闸闭环','分闸反馈'],'沿判据、跳闸逻辑、出口、执行回路、机构和位置反馈逐层核对，事件上送不能证明设备动作。','protection-control-fundamentals','trip'),
    ('control-permission-basics','遥控、联锁与反馈','Control permissions and feedback',['就地远方','联锁','同期检查','投退'],'选择、执行、终止和位置反馈是不同阶段；权限与联锁条件需按实际控制模型核对。','protection-control-fundamentals','control'),
    ('developer-contract','开发人员的数据契约','Application data contract',['数据契约','freshness','新鲜度','重复事件','控制重试'],'将对象引用、FC、数值、品质、源时间、接收时间、单位和工程修订一起使用；超时不能直接当作物理状态。','developer-data-contracts','record'),
    ('validation-layers','工程验证层级','Engineering validation layers',['解析成功','模式校验','引用校验','现场验收'],'XML 可解析、XSD、引用、语义、设备能力、交付和现场功能属于不同检查层次。','developer-data-contracts','versions'),
    ('feeder-case','馈线综合练习','Feeder learning case',['馈线练习','学习自检','参考答案','600/1'],'用原创馈线场景练习量纲、互感器、保护模型、服务选择与工程证据追踪。','feeder-learning-case','scenario'),
]
terms = [dict(id='learn-'+id, zh=zh, en=en, aliases=aliases, category='电气基础与学习路径', level='物理对象 → 信号 → 模型 → 工程', summary=summary, related=[], href=f'chapters/{file}.html#{anchor}') for id,zh,en,aliases,summary,file,anchor in glossary]
(OUT / 'data' / 'learning-terms.js').write_text('/* Original beginner glossary, generated by scripts/build_learning.py. */\n(function () {\n  const terms = window.IEC61850_TERMS;\n  for (const entry of ' + json.dumps(terms, ensure_ascii=False, indent=2) + ') {\n    const old = terms.find(term => term.id === entry.id);\n    if (old) Object.assign(old, entry); else terms.push(entry);\n  }\n}());\n', encoding='utf-8')
print(f'Built {len(PAGES)} learning pages')
