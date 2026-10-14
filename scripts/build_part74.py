"""Rebuild the offline 7-4 guide from checked JSON and the read-only reference SCD."""
from pathlib import Path
from collections import Counter,defaultdict
import html,json,re,hashlib,copy
from lxml import etree as ET
from part74_catalog import GROUPS
from part74_values import ENUMS,MODE_ROWS,BOOLEAN_ROWS
from part74_mappings import PROTECTION,OTHER
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'outputs'
DATA=json.loads((ROOT/'scripts/part74_data.json').read_text(encoding='utf-8'))
CLASSES=DATA['classes'];FIELDS=DATA['fields'];DICTIONARY={d['name']:d for d in DATA['dictionary']}
esc=lambda v:html.escape(str(v))
def code(v):return '<code>'+esc(v)+'</code>'
def p(v):return '<p>'+v+'</p>'
def link(f,t,a=''):return '<a href="'+f+'.html'+('#'+a if a else '')+'">'+esc(t)+'</a>'
def sec(i,t,b):return '<section><h2 id="'+i+'">'+esc(t)+'</h2>'+b+'</section>'
def table(h,rows):return '<div class="reference-table"><table><thead><tr>'+''.join('<th scope="col">'+esc(x)+'</th>' for x in h)+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+str(v)+'</td>' for v in row)+'</tr>' for row in rows)+'</tbody></table></div>'
def pre(x):return '<pre data-language="xml"><code>'+esc(x)+'</code></pre>'
def graph(i,title,items,caption):
 h=30+len(items)*88
 s=f'<figure class="concept-figure"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 {h}" role="img" aria-labelledby="{i}-title {i}-desc"><title id="{i}-title">{esc(title)}</title><desc id="{i}-desc">{esc(caption)}</desc>'
 for k,(a,b) in enumerate(items):
  y=15+88*k;s+=f'<rect class="svg-node" x="15" y="{y}" width="790" height="66" rx="10"/><text class="svg-text" x="35" y="{y+26}">{esc(a)}</text><text class="svg-note" x="35" y="{y+50}">{esc(b)}</text>'
  if k<len(items)-1:s+=f'<path class="svg-link" d="M410 {y+66} v20 m-5 -6 l5 6 l5 -6"/>'
 return s+'</svg><figcaption>'+esc(caption)+'</figcaption></figure>'
def forkgraph():
 return '''<figure class="concept-figure"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 310" role="img" aria-labelledby="inherit-title inherit-desc"><title id="inherit-title">逻辑节点结构与公用信息继承</title><desc id="inherit-desc">7-2 抽象逻辑节点结构由 LPHD 与公用逻辑节点继承，公用逻辑节点的必备数据再由 LLN0 与域专用节点继承。包含和继承不是同一关系。</desc><rect class="svg-node" x="230" y="10" width="360" height="60" rx="8"/><text class="svg-text" x="250" y="45">7-2 抽象 LN：结构与服务</text><path class="svg-link" d="M410 70 v20 H170 v25 M410 90 H615 v25"/><rect class="svg-node" x="25" y="115" width="290" height="65" rx="8"/><text class="svg-text" x="45" y="142">LPHD：物理设备信息</text><text class="svg-note" x="45" y="163">有自己的必备数据</text><rect class="svg-node" x="400" y="115" width="405" height="65" rx="8"/><text class="svg-text" x="420" y="142">公用 LN 信息：Mod / Beh 等</text><text class="svg-note" x="420" y="163">除 LPHD 外，继承其必备信息</text><path class="svg-link" d="M610 180 v20 H470 v30 M610 200 H710 v30"/><rect class="svg-node" x="385" y="230" width="165" height="60" rx="8"/><text class="svg-text" x="412" y="265">LLN0</text><rect class="svg-node" x="590" y="230" width="215" height="60" rx="8"/><text class="svg-text" x="610" y="265">XCBR / PTOC 等</text></svg><figcaption>按第 5.3 节重绘。COMMON 只是本站说明模板，不是可实例化的 lnClass。</figcaption></figure>'''
def phasor_figure():
 return '''<figure class="concept-figure"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 470" role="img" aria-labelledby="phasor-title phasor-desc"><title id="phasor-title">平衡三相相电压与线电压</title><desc id="phasor-desc">三条相电压向量以中性点为参考，夹角为120度。AB线电压是A相电位向量减B相电位向量，画为从B端点指向A端点的向量。</desc><path d="M80 235 H745 M300 430 V40" stroke="#cbdce6" stroke-width="2"/><circle cx="300" cy="235" r="170" fill="none" stroke="#d2e0e6" stroke-dasharray="6 6"/><path d="M300 235 H470 l-13 -7 m13 7 l-13 7 M300 235 L215 87.8 l5 15 m-5 -15 l15 5 M300 235 L215 382.2 l15 -5 m-15 5 l5 -15" fill="none" stroke="#086baf" stroke-width="4"/><path d="M215 87.8 L470 235 l-16 1 m16 -1 l-11 -12" fill="none" stroke="#d36a29" stroke-width="4"/><text class="svg-text" x="485" y="230">A 相</text><text class="svg-text" x="160" y="65">B 相</text><text class="svg-text" x="160" y="420">C 相</text><text class="svg-text" x="315" y="270">N / 参考原点</text><text class="svg-text" x="315" y="210">AN：相电压</text><text class="svg-text" x="335" y="115">AB：线电压 = AN − BN</text><text class="svg-note" x="430" y="375">PhV → WYE，相别分量</text><text class="svg-note" x="430" y="405">PPV → DEL，相间分量</text></svg><figcaption>原创平衡三相相量示意，箭头长度无工程数值意义。相电压与线电压的参考点不同；不平衡时不能套用固定比例。</figcaption></figure>'''
def impedance_figure():
 return '''<figure class="concept-figure"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 420" role="img" aria-labelledby="rx-title rx-desc"><title id="rx-title">距离保护的电阻电抗平面</title><desc id="rx-desc">横轴为电阻R，纵轴为电抗X。示意四边形保护区域与靠近电阻轴的负荷区域；区域形状和大小由具体保护算法与定值决定，不是本标准的统一动作曲线。</desc><path d="M55 340 H730 l-12 -6 m12 6 l-12 6 M90 380 V30 l-6 12 m6 -12 l6 12" fill="none" stroke="#385c71" stroke-width="3"/><text class="svg-text" x="740" y="348">R</text><text class="svg-text" x="100" y="35">X</text><path d="M225 250 L300 85 L485 120 L505 245 Z" fill="#dcecf7" stroke="#146ca0" stroke-width="3"/><circle cx="380" cy="175" r="6" fill="#146ca0"/><text class="svg-text" x="395" y="185">Z = R + jX</text><text class="svg-text" x="525" y="135">保护区域示意</text><text class="svg-note" x="525" y="162">范围、方向和时限分别核对</text><path d="M90 340 L240 305 L300 340 Z" fill="#ffe8cd" stroke="#cb833e" stroke-width="2"/><text class="svg-text" x="150" y="290">负荷区：RisLod / AngLod</text><path d="M485 120 H600 M505 245 H600" stroke="#94acb8" stroke-dasharray="5 5"/><text class="svg-note" x="160" y="390">RisGndRch / RisPhRch、X1、LinAng 等各有作用</text></svg><figcaption>按第 6 章几何关系原创改绘，仅解释坐标与区域，不提供保护曲线、整定值或现场判断。</figcaption></figure>'''
pages=[]
def page(f,title,sections,source,group='数据模型'):
 start=sec('reading','阅读位置、版次与来源边界',p('上级：'+link('standard-part-7-4','第 7-4 部分')+'。前置：'+link('standard-part-7-2','7-2 对象与服务')+' · '+link('standard-part-7-3','7-3 CDC 属性结构')+'。')+p('以 DL/T 860.74—2006 / IEC 61850-7-4:2003 为基线；英文功能说明是本站助读译释，不声称每个节点代码都是英文首字母缩写。参考工程为 SCL 2007 B4，标准、原表差异、工程声明及原创教学例分别说明。')+p('原 PDF 113 页，印刷正文页通常为 PDF 页−4；PDF 72 重复印刷 58，印刷 68 缺失，影响 ZBAT 与 ZBSH 首表。以下原文定位以 PDF 页为准。内容为原创知识解读，不能代替标准、设备手册或投产校验。'))
 end=sec('sources','原文定位与继续阅读',p('本页定位：'+esc(source)+'。参考标准原路径：'+code('E:/IEC61850标准[中文.完整版]/860[1].7-4.pdf')+'。')+p('继续阅读：'+link('standard-part-7-4','总览')+' · '+link('ln-system','公用信息')+' · '+link('ln-data-dictionary','数据字典')+' · '+link('ln-values-reference','取值关系')+' · '+link('ln-scd-evidence','实际 SCD 类型链')+'。'))
 content='<!doctype html>\n<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(title)+'｜IEC 61850 离线知识库</title><link rel="stylesheet" href="../assets/style.css"><link rel="stylesheet" href="../assets/part74.css"></head><body><header class="top"><div class="chapter"><p class="section-kicker">'+group+' · 第 7-4 部分专题</p><h1>'+esc(title)+'</h1><p>先确定功能与数据语义，再沿 CDC 和 SCL 类型引用核对。</p></div></header><main class="chapter">'+start+'\n'+'\n'.join(sections)+end+'</main><footer class="footer">IEC 61850 离线知识库 · 基线版次与工程观测分别说明</footer><script src="../assets/navigation.js"></script><script src="../assets/part74.js"></script></body></html>\n'
 (OUT/'chapters'/f'{f}.html').write_text(content,encoding='utf-8');pages.append((f,title,group))

# Local evidence: parse once; no network, schema resolution, or modification of SCD.
source=ROOT/'source/南雷变2026041614.scd'
tree=ET.parse(str(source),ET.XMLParser(resolve_entities=False,no_network=True));root=tree.getroot();NS={'s':ET.QName(root).namespace}
q=lambda e,path:e.findall(path,NS)
lns=q(root,'.//s:LN')+q(root,'.//s:LN0');counts=Counter(x.get('lnClass') for x in lns)
types={x.get('id'):x for x in q(root,'.//s:LNodeType')};dotypes={x.get('id'):x for x in q(root,'.//s:DOType')};datypes={x.get('id'):x for x in q(root,'.//s:DAType')};enumtypes={x.get('id'):x for x in q(root,'.//s:EnumType')}
baseline={c['name'] for c in CLASSES if c['name']!='COMMON'}
samples={};enum_usage=defaultdict(list)
for kind,templates in [('DA',dotypes),('BDA',datypes)]:
 for ident,e in templates.items():
  for da in e:
   if da.get('bType')=='Enum':enum_usage[da.get('type')].append({'container':ident,'attribute':da.get('name'),'line':da.sourceline,'kind':kind})
for cls in sorted(counts):
 ln=next(x for x in lns if x.get('lnClass')==cls);anc={ET.QName(x).localname:x for x in ln.iterancestors()};ied=anc['IED'];ld=anc['LDevice'];typ=types[ln.get('lnType')]
 objs=[]
 for do in q(typ,'s:DO'):
  dt=dotypes.get(do.get('type'));attrs=[]
  if dt is not None:
   for da in dt:
    attrs.append({'kind':ET.QName(da).localname,'name':da.get('name'),'bType':da.get('bType'),'type':da.get('type'),'fc':da.get('fc'),'line':da.sourceline})
  objs.append({'name':do.get('name'),'type':do.get('type'),'cdc':dt.get('cdc') if dt is not None else None,'line':do.sourceline,'type_line':dt.sourceline if dt is not None else None,'attributes':attrs})
 frag=ET.Element(ln.tag,nsmap={None:NS['s']},attrib=dict(ln.attrib))
 for child in list(ln)[:2]:frag.append(copy.deepcopy(child))
 samples[cls]={'IED':ied.get('name'),'LDevice':ld.get('inst'),'prefix':ln.get('prefix',''),'inst':ln.get('inst',''),'lnClass':cls,'lnType':ln.get('lnType'),'desc':ln.get('desc',''),'line':ln.sourceline,'type_line':typ.sourceline,'objects':objs,'xml':ET.tostring(frag,encoding='unicode',pretty_print=True),'type_xml':ET.tostring(typ,encoding='unicode',pretty_print=True)}
enum_groups=defaultdict(list)
for ident,e in enumtypes.items():enum_groups[tuple((v.get('ord'),''.join(v.itertext()).strip()) for v in e)].append(ident)
evidence={'source':'source/南雷变2026041614.scd','sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'pdf_sha256':hashlib.sha256(Path(r'E:/IEC61850标准[中文.完整版]/860[1].7-4.pdf').read_bytes()).hexdigest(),'root_version':dict(root.attrib),'IED':len(q(root,'.//s:IED')),'LN_instances':len(lns),'class_counts':dict(sorted(counts.items())),'LNodeType_count':len(types),'DOType_count':len(dotypes),'DAType_count':len(datypes),'EnumType_count':len(enumtypes),'baseline_classes':len(baseline),'baseline_observed':sorted(baseline&set(counts)),'baseline_absent':sorted(baseline-set(counts)),'outside_baseline':sorted(set(counts)-baseline),'samples':samples,'enum_groups':[{'members':v,'values':list(k),'usage':[u for ident in v for u in enum_usage[ident]]} for k,v in enum_groups.items()],'coverage':{'field_rows':sum(map(len,FIELDS.values())),'dictionary_names':len(DICTIONARY),'abbreviations':len(DATA['abbreviations'])},'missing_scan':DATA['missing_scan']}
(OUT/'data/part74-evidence.json').write_text(json.dumps(evidence,ensure_ascii=False,indent=2),encoding='utf-8')

ALIASES={'PhyName':'PhyNam','ChTrg':'Chtrg','DiffAClc':'DifAClc','PumpCtlGen':'PmpCtlGen','PumpCtl':'PmpCtl','PumpOvCur':'PmpOvCur','PumpAlm':'PmpAlm','MemRs':'MmeRs','GnSpd':'GnSp','Dq0Seq':'DQ0Seq','ThdEvenAmp':'ThdEvnAmp','TddEvenAmp':'TddEvnAmp','NormA':'NomA','SvcVoil':'SvcViol'}
EXTRA={'A':'相别有关电流复合量；WYE 将相量/相分量组织在子 DO 中。','W':'单相有功功率复合量。','VAr':'单相无功功率复合量。','VA':'单相视在功率复合量。','Z':'单相阻抗复合量。','Amp1':'MDIF 的 A 相采样电流。','Amp2':'MDIF 的 B 相采样电流。','Amp3':'MDIF 的 C 相采样电流。','Volt':'ZAXN 辅助电源电压；该表打印 Volt，字典采用 Vol。','PwrFrq':'ZTCF 目标频率。','VRed1':'第一级降压命令；含编号的数据沿对应实例解释。','VRed2':'第二级降压命令。','MaxNumSlp':'电网振荡检测允许的最大滑差次数，需结合评估窗口。'}
EXTRA.update({'GndOp':'PSDE 表列的接地门槛（3I0）；原表中文写“接地启动值”，不是 ACT 动作状态。','StrDlTmms':'PSDE 启动延时，名称指毫秒；原表 CDC 仍列 ASG。','OpMod':'RDRE/IARC 工作模式（全部使用、覆盖等）；表 9 用 RcdMod 描述存储策略，保留名称差异。'})
def dname(n):return ALIASES.get(n,n)
def dlink(n):
 if n=='COMTRADE':return '仅通过 COMTRADE 文件访问的通道数据（非 DO 名）'
 return link('ln-data-dictionary',n,'data-'+dname(n)) if dname(n) in DICTIONARY or n in EXTRA else code(n)
def meaning(n):
 return DICTIONARY[dname(n)]['summary'] if dname(n) in DICTIONARY else EXTRA.get(n,'按本节点的功能与数据名组成词解释；原表语境见下述定位。')
from part73_data import CDC
CDC_INDEX={c['code']:(c['group'],c['meaning']) for c in CDC}
def cdclink(c):
 if c=='ISI':return link('cdc-status','ISI（原表；7-3 为 INS）','ins')
 if c=='—':return '文件格式，原表 CDC 列为空'
 return link('cdc-'+CDC_INDEX[c][0],c,c.lower()) if c in CDC_INDEX else code(c)
CLASS_NOTES={
'LPHD':'反映实际物理设备；PhyHealth 与外部一次设备 EEHealth、某功能的 Health 分开读取。Proxy 是该物理设备信息是否作为代理的声明。',
'LLN0':'逻辑设备的公共信息节点。SCL 用 LN0 元素承载 lnClass=LLN0；不是 lnClass=LN0。服务控制块位置需沿实际 SCD 核对。',
'PDIF':'比较进入保护范围与流出保护范围的电流。区内故障可能出现差流；变比、极性、同步、励磁涌流及制动影响判定。原理不等于某厂家算法。',
'PDIR':'比较多个方向信号形成保护决策，例如母线各间隔方向信息；它不同于单个方向元件 RDIR。',
'PDIS':'用测得的电压、电流计算阻抗并按阻抗平面区域判定。多段对应多个实例；不能仅凭 inst 编号推断实际整定范围。参考工程无 PDIS。',
'PSCH':'协调线路两端保护信息。允许欠范围、允许超范围和闭锁是不同方案；原表 ProTx/ProRx 是瞬态 SPS，其他输出的 CDC 仍按表分别读取。',
'PTRC':'汇集与调理保护动作，形成 Tr；可处理跳闸模式与最小脉冲等。Op 表示动作、Tr 表示送往断路器的跳闸条件，不能把每个 Op 都当成断路器已跳开。',
'PHAR':'谐波制动用于区分某些非故障过程与保护条件；它输出 Str 的含义应结合保护组合，不能把“谐波”自动等同于故障。',
'PTEF':'检测补偿网络接地故障产生的瞬态充电电流；Str 或 Op 至少一个出现（C）。',
'PSDE':'检测灵敏方向接地故障，可观察残余电流；若用于跳闸，应核对策略和互感器性能。原表时间定值 StrDlTmms/OpDlTmms 列为 ASG，勿据名称擅自改 ING。',
'PMRI':'限制电动机重复启动，关注冷/热启动次数、温度与时间窗。原表 StrInhTmm 的 CDC 写 ISI，需与 7-3 INS 定义核版。',
'PMSS':'监视启动电流与允许启动/堵转时间；与 PMRI 的再次启动许可分开。',
'RBRF':'保护发出跳闸后，检查电流和/或断路器状态是否按时响应，决定再跳本断路器或跳其他断路器。OpEx/OpIn 至少一个出现（C）。',
'RDIR':'方向元件以极化参考量判方向；方向可由保护 Str 自带，只有需要独立元件或其定值时才另建 RDIR。',
'RFLO':'提供故障阻抗和位置估算；位置不是实测地理坐标，不应凭电阻、电抗独立生成现场结论。',
'RPSB':'区分阻抗轨迹的电网振荡与故障。C1 对应检测用途（Str/BlkZn），C2 对应滑极用途（Op）；不能把 C1/C2 当数值枚举。',
'RREC':'保护跳闸后的自动重合闸协调，涉及次数、间隔、复归、同期条件与闭锁；自动重合输出不代表物理断路器一定成功闭合。',
'RSYN':'检同期比对两侧电压、频率、相角；VInd/HzInd/AngInd 为 TRUE 是越限，不是“允许合闸”。Rel 才表达相关条件满足的释放信息。',
'RDRE':'共同记录参数与协调；RADR/RBDR 按通道实例化。原表文件数据只经 COMTRADE 访问；网页只解释文件与模型关系。',
'RADR':'模拟记录通道，通道编号与触发参数由此组织；原表“仅经过 COMTRADE 访问”不是名为 COMTRADE 的 DO。',
'RBDR':'状态记录通道；同样按通道实例化并与 RDRE 协调。',
'CILO':'只表达联锁条件许可 EnaOpn/EnaCls。条件许可、设备闭锁、控制服务、物理动作是不同环节。',
'CSWI':'代表开关控制功能，Pos 用 DPC；可按相提供 PosA/B/C。联锁检查由 CILO 表达，过程设备由 XCBR/XSWI 表达。',
'CPOW':'在交流波形选定时刻执行分合，用于控制开断/合闸过程；须结合开关机构延时，不能把逻辑时刻当成实际触头时刻。',
'GGIO':'标准专用功能不足或过程 I/O 映射时的通用模型。Ind/Alm/AnIn 等必须结合实际 desc、配置绑定与文档解释；不能从厂家名猜业务。',
'GSAL':'授权、访问控制、服务权限和未激活关联的安全监视；这些计数不等于安全机制已经启用或符合某安全规范。原表 SvcVoil 与表 9 SvcViol 拼写不同。',
'IARC':'存档能力、存储占用、溢出与控制；状态与容量阈值不同。',
'IHMI':'人机接口功能边界。本版仅公用信息，不应自行补一套 HMI 命令对象作为标准必备项。',
'ITCI':'远方控制接口边界；本版表仅公用信息，具体服务见 7-2。',
'ITMI':'远方监视接口边界；本版表仅公用信息。',
'ATCC':'调节分接开关以维持电压，结合负荷电流、环流、压降补偿和并列运行。TapChg/TapPos 至少一个（C）；控制器与 YLTC 执行部件分开。',
'ANCR':'中性点补偿电流自动调节，关联 YEFN 的线圈位置。',
'ARCO':'无功自动控制与电容器等设备协调，DschBlk 表达放电闭锁。',
'AVCO':'电压自动控制，受接地故障、电流/电压越限等闭锁。',
'MMTR':'电能计量，将功率对时间累计；本工程未发现此节点，计量案例为原创。',
'MSTA':'在分析窗口内求平均/最大/最小量，EvStr 启动分析间隔，EvTmms 给窗口。窗口统计不等于即时值或长期电能。',
'MHAI':'按相表示谐波/间谐波，Hz 与 HzSet 二者取一（C）。HWYE/HDEL 是频谱结构，不是单个浮点值。',
'MHAN':'相别无关频谱。原表写 ThdEvenAmp/TddEvenAmp/NormA，表 9 对应 ThdEvnAmp/TddEvnAmp/NomA，保留拼写差异。',
'MMXU':'三相电流、电压、功率、阻抗及频率。PhV 是相电压，PPV 是线电压；WYE/DEL 给相分量或相间分量。',
'MMXN':'单相或相别无关量；不要把 Watt/VoltAmpr 简化为三相总量。',
'MSQI':'提供正序、负序、零序和不平衡信息。原节点表 Dq0Seq 与字典 DQ0Seq 大小写不同。',
'MDIF':'差动测量用于支持保护；OpARem 或 Amp1/Amp2/Amp3 至少一个（C）。测量模型与 PDIF 的保护判断分开。',
'XCBR':'断路器过程设备模型。位置、操作次数、蓄能/物理能力、闭锁分别表示；它不是“保护算法节点”。',
'XSWI':'开关设备模型，可区分负荷开关、隔离开关和接地开关。原表若写 ISI，保留与 INS 的差异。',
'TCTR':'提供电流采样值。基线说明传输的是修正后的工程一次值；实际工程仍须沿配置核对尺度和单位，不直接用 Rat 再乘一次。',
'TVTR':'提供电压采样值与熔丝故障。Rat/Cor/AngCor 是外部常规传感器的变比和修正信息，不自动等于发布采样量还需再次换算。',
'YEFN':'消弧线圈与接地故障中性点补偿；ECA 是线圈电流，ColTapPos/ColPos 表示离散/连续调节位置。',
'YLTC':'分接开关执行部件；TapChg/TapPos 至少一个，EndPosL/EndPosR 是限位反馈。',
'YPTR':'电力变压器模型；热点、铁心接地、运行状态、额定量与保护 PTTR 是不同功能。',
'ZBAT':'本扫描印刷 68 缺失，不能声称列完节点专用数据。结合表 9 可学习 BatHi/BatLo/BatTest/HiBatVal/LoBatVal，但不补造 CDC 或必选性。',
'ZBSH':'本扫描仅保留续表的参考量 RefReact/RefPF/RefV，首表缺失；表 9 还给 LosFact 等相关定义，但不据此补造首表。',
'ZGEN':'发电机设备状态与控制。节点表 GnSpd 与字典 GnSp 拼写不同；额定功率/电压、速度、励磁状态不能混为一种量。',
'ZSAR':'浪涌抑制器动作 OPSA 带 T 瞬态标志，操作计数与动作瞬态分开。'}
CLASS_NOTES['PSDE']+=' 此表 Ang 为 U0 与 I0 间的相角，GndStr 为 3U0 门槛、GndOp 为 3I0 门槛；零序量与残余量的比例约定不能省略。'
CLASS_NOTES['RDRE']+=' 原表说明触发方式有关联：RDRE 为内部触发时，RADR/RBDR 也须内部触发；RDRE 为外部触发时，通道采用外部触发无扩展，采用内部触发可扩展外部触发模式。'

page('standard-part-7-4','第 7-4 部分：兼容逻辑节点类和数据类',[
sec('scope','1. 本部分回答什么问题',p('当工程人员说“测量电流”“保护动作”“断路器位置”，计算机需要统一的功能名、数据名与结构。7-4 规定功能模型 LN（Logical Node）和数据语义；7-3 给 CDC（Common Data Class）的属性结构；7-2 给对象及访问服务；第 6 部分用 SCL（Substation Configuration Language）表达实例和引用。')+table(['层次','例子','查阅位置'],[('功能类','PTOC：延时过流保护','本部分第 5 章'),('数据对象 DO','Str：启动；Op：动作','本部分第 5 / 6 章'),('数据结构 CDC','Str→ACD；Op→ACT',link('standard-part-7-3','7-3 CDC')),('属性 DA / BDA','general、phsA、q、t、dirGeneral',link('cdc-common-types','属性、品质与类型')),('服务','读、报告、控制、定值组',link('standard-part-7-2','7-2 ACSI')),('工程实例','prefix / lnClass / inst / lnType',link('ln-scd-evidence','SCD 证据'))])+p('它适用于变电站和馈线设备等信息建模；引言同时提及站间、站到控制中心、分布式发电和计量。适用某功能不意味着一个 IED 必须具备全部节点，也不意味着配置声明已经证明实际设备行为。')),
sec('start','2. 初学者阅读路线',graph('read74','从电气概念到工程对象',[('先认识：电流、电压、功率、电能、故障与开关','测量是观察；保护是判定；控制是发出命令'),('第 5 章：选择 LN，再定位 DO','按功能进入节点分类，读 M/O/C 与 T'),('第 6 章：解释数据名与明确取值','短缩写可由第 4 章组合，但以完整数据定义为准'),('7-3：展开 CDC 与属性值','状态值、命令值、品质、时标、单位分别读取'),('SCD：寻找实例并追踪类型引用','实际出现的对象与标准可能项分别列出')],'本站重绘的阅读路径。')+p(link('ln-system','公用信息与继承')+' → '+link('ln-measurement','测量、计量与电气基础')+' → '+link('ln-switch-transformer','开关与互感器')+' → '+link('ln-protection','保护')+' → '+link('ln-scd-evidence','工程证据')+'。')),
sec('groups','3. 第 5 章的 13 个逻辑节点组',table(['首字母','组的用途','本版具体类数','分类页'],[(code(g),esc(v[0]),sum(c['name'].startswith(g) for c in CLASSES if c['name']!='COMMON'),link(v[1],v[0])) for g,v in GROUPS.items()])+p('组字母表示功能归属，不按物理设备厂家、网络协议或 IED 名划分。S/T/X/Y/Z 组可能位于过程装置，也可能作为更高层 IED 的外部过程映像。H/F/W/O/B/N 等字母在原表注中预留给其他应用领域；不把这些预留字母充当本版已经定义的节点类。')),
sec('inventory','4. 91 类的功能总索引',table(['LN 类','中文功能','英文功能助读','实例数 / 工程观察','查阅'],[(code(c['name']),esc(c['zh']),esc(c['en']),str(counts.get(c['name'],0)),link(GROUPS[c['name'][0]][1],'节点及数据表',c['name'])) for c in CLASSES if c['name']!='COMMON'])+p('“0”只表示参考工程未观察到；不表示标准没有此节点，也不证明设备不支持。公用信息 COMMON 另用于继承说明，不属于这 91 个具体类。')),
sec('coverage','5. 章节覆盖与扫描缺页',table(['原文章节 / 表','本库内容','入口'],[('引言、1～3；图 1','范围、建模分工与阅读路径','本页'),('4；印刷 2～9','273 个缩写入口，含 Tm 的四个时间后缀',link('ln-abbreviations','缩写全表')),('5.1～5.3；表 1 / 2；图 2','分组、存在标记、信息分类、结构与继承',link('ln-system','公共信息')),('5.4～5.5；表 3 / 4','保护功能与相关节点',link('ln-protection','保护')+' / '+link('ln-protection-related','保护相关')),('5.6～5.9；表 5 / 6','控制、通用、接口、自动控制',link('ln-control-generic','控制与接口')+' / '+link('ln-automatic','自动控制')),('5.10；表 7','测量、频谱、相序、统计、计量',link('ln-measurement','测量与计量')),('5.11～5.15；表 8','监视、开关、互感器、变压器及设备',link('ln-monitoring-equipment','监视与设备')+' / '+link('ln-switch-transformer','开关与互感器')),('6；表 9','519 个名称与明示取值、几何关系',link('ln-data-dictionary','名称字典')+' / '+link('ln-values-reference','取值表')),('附录 A.1～A.8','规范性复用/扩展与命名空间',link('ln-extension-modeling','扩展规则')),('附录 B.1～B.8','补偿接地、保护链、差动、记录、分配、母线、重合与距离变体',link('ln-extension-modeling','建模例')),('附录 C；表 C.1','7-5 功能要求与 7-4 模型的边界',link('ln-extension-modeling','功能要求边界'))])+p('本库节点表有 '+str(sum(map(len,FIELDS.values())))+' 行，公共继承行集中表达。ZBAT 专用表与 ZBSH 首表因印刷 68 缺失不声称完整；所有类仍有明确入口，保留可核对的续表和第 6 章知识。'))
], '正文全篇与附录；PDF 1～113','标准文库')

public_sections=[
sec('inheritance','1. 类、实例、包含与继承',forkgraph()+p('“继承”是某类沿用上位类规定的数据/服务；“包含”是一个对象有下一级对象；“引用”是用标识指向另一份定义。把 XCBR 放在 LLN0 下面画继承树是错误的：它们同属某个 LD，但 XCBR 并非继承 LLN0。')+graph('instance74','SCL 的实例与模板',[('IED → AccessPoint → Server → LDevice','这是实际配置的包含路径'),('LN0 / LN：prefix + lnClass + inst','这是实例身份；如 Cha + PTOC + 1'),('lnType → DataTypeTemplates / LNodeType','这是引用，模板定义哪些 DO'),('DO.type → DOType.cdc → DA / SDO','CDC 决定属性结构，SDO 再引用 DOType'),('DA.type → DAType / EnumType','结构分量和编码标签继续追踪')],'包含树与类型引用链分开；源名称见 SCD 页。')+p('本工程 ChaPTOC1 的 desc 声明“充电过流I段”，可说明该配置的文字标注；不能把所有名为 ChaPTOC1 的其他工程也自动解释为同一业务。')),
sec('categories','2. 六类信息如何一起读',table(['分类','作用与更新特点','例子 / CDC','怎样使用'],[('公用 LN 信息','与具体保护/测量功能相对独立的模式、行为、健康、铭牌','Mod/INC、Beh/INS、Health/INS、NamPlt/LPL','先认识节点自身'),('状态信息','就地产生，正常读/报告；需要取代时另有机制','Str/ACD、Op/ACT、EnaCls/SPS','启动、动作、许可不是同一事件'),('定值','功能运行参数，通常不频繁修改','StrVal/ASG、OpDlTmms/ING','是否分组由 CDC、FC、SGCB 与实现决定'),('测量值','过程量或计算量，正常不可当普通控制命令写入','MMXU.A/WYE、TotW/MV','结合单位、品质、时标与测量方法'),('控制','命令改变操作状态/位置或执行复位','XCBR.Pos/DPC、TapChg/BSC','按控制服务与 ctlModel 操作，反馈另读'),('计量值','一段时间的累计量，例如电能','MMTR.TotWh/BCR','计数、冻结、复零、倍率一起读')])+p('这些是第 5 章的数据用途分区；FC（Functional Constraint）是属性的功能约束，二者不是一一等同。一个 DPC 同时含状态反馈 ST、命令 CO 和配置 CF。定值对象可能含 SP，也可能参与 SG/SE 的定值组视图。')),
sec('flags','3. M/O/C 与 T',table(['标记','完整含义','本版规则与例子'],[('M','Mandatory / 必备','该具体类实例须包含该项；公共必备数据除 LPHD 外继承'),('O','Optional / 可选','类允许采用；具体实例有无沿 LNodeType 查询'),('C','Conditional / 条件性','本节点说明指定的一组至少使用一个，如 PTEF.Str/Op'),('C1 / C2','不同的条件组','RPSB 的检测用途与滑极用途分别说明'),('T','Transient / 瞬态','针对 FC=ST 的布尔处理：真→假复位不产生该瞬态的事件报告/日志；不能仅靠轮询捕捉瞬态'),('空白 T 列','未标该瞬态特性','不能从“Op”名称自动补 T')])+p('7-4 DO 的 M/O/C 不应替代 7-3 DA 的存在条件。DO 可选且实际已实例化时，内部必须出现的 DA 仍须按 CDC 实现。T 也不等同于 SCL 的 dchg/qchg/dupd 或 TrgOps，后者决定事件类别与服务配置。')),
sec('modes','4. Mod、Beh、Health 与外部设备',table(['数据','区分','深入阅读'],[('Mod / Beh','Mod 是模式请求，Beh 是结合上层后的实际只读行为',link('ln-values-reference','五种模式与 25 种组合','mode')),('Health / PhyHealth / EEHealth','功能健康 / 物理设备健康 / 外部设备健康',link('ln-values-reference','三种健康状态','Health')),('NamPlt / PhyName / EEName','节点铭牌 LPL / 物理设备铭牌 DPL / 外部设备铭牌 DPL',link('cdc-description','LPL 与 DPL')),('Loc','就地/远方；LLN0 与 LN 冲突时就地优先','不是通用的访问权限凭证')])+p('公用可选项在具体类中可不继承、继承为可选或要求为必备；例如 XCBR 的 Loc/OpCnt 为 M，不能仅看公用模板中的 O。'))]

def node_section(c):
 n=c['name'];fs=FIELDS[n];note=CLASS_NOTES.get(n,c['zh']+'功能：节点描述对象/状态及相关配置；标准模型不规定完整厂家实现。'+('设备本体功能与保护、控制或监视功能分开查阅。' if n[0]=='Z' else ''))
 found=counts.get(n,0)
 out=p(esc(c['en'])+'；'+esc(note))
 if n not in ['LPHD','COMMON']:out+=p('继承：'+link('ln-system','Mod、Beh、Health、NamPlt 公用必备信息','COMMON')+'。下表为本类另列项；同名专用要求优先按本表。')
 if n in ['ZBAT','ZBSH']:out+=p('<strong>扫描缺页边界：</strong>'+esc(CLASS_NOTES[n]))
 rs=[]
 for f in fs:
  name=f['name'];summary=meaning(name)
  if f.get('format_row'):summary='对应模拟/状态输入通道数据；通过文件格式访问，原表没有 DO 名或 CDC 定义。'
  rs.append((dlink(name),cdclink(f['cdc']),esc(f['presence']),'T' if f['transient'] else '—',esc(summary)))
 out+=table(['数据名 / 语义入口','CDC / 属性入口','M/O/C','瞬态 T','功能简述'],rs) if rs else p('本扫描可核对表中仅公用信息；ZBAT 的专用表受上述缺页限制。' if n=='ZBAT' else '本版该类不另列专用数据，沿用公用信息与相应服务。')
 nextc=CLASSES[CLASSES.index(c)+1] if CLASSES.index(c)+1<len(CLASSES) else None
 endpage=nextc['page'] if nextc else 78
 if n=='COMMON':out+=p('原文：5.3.3，PDF 16。COMMON 是本站说明模板，不是 lnClass；在 LLN0 和域专用 LN 的实际类型里查找这些公用数据。')
 else:out+=p('原文：'+GROUPS.get(n[0],('', '', '5.3'))[2]+'，PDF '+str(c['page'])+('～'+str(endpage) if endpage!=c['page'] else '')+'；工程观察：'+str(found)+' 个实例。'+(link('ln-scd-evidence','查看真实类型链','scd-'+n) if found else '本工程未出现，不能借其他类同名数据充当此类证据。'))
 return sec(n,n+'：'+c['zh'],out)
page('ln-system','公用逻辑节点信息：组成、继承与状态',public_sections+[node_section(c) for c in CLASSES if c['name'] in ['COMMON','LPHD','LLN0']], '5.1～5.3，表 1 / 2，图 2；PDF 13～17')

group_intros={
'ln-protection':[
sec('basics','保护功能：从观察量到动作条件',p('保护在异常电流、电压、温度、频率或阻抗等条件下作出动作判定。它需要范围、门槛和时间配合：过流阈值可越限，延时可用于避免暂态或让更接近故障的保护先切除。本站的数例用于理解，不用于计算现场整定。')+graph('trip74','测量、判定与跳闸',[('TCTR / TVTR 提供过程电流与电压','采样、比例、品质和时间决定输入是否可解释'),('PTOC / PDIS / PDIF 等保护实例','Str 检出启动条件；Op 表示保护动作'),('需要时 PSCH 协调对端信息','线路两端信号、允许或闭锁方案另有边界'),('PTRC 汇集动作并处理跳闸条件','Tr、TrMod、TrPlsTmms 不等于物理触头状态'),('XCBR 表达断路器过程状态','Pos、操作能力与 OpCnt 用于查看执行结果')],'原创功能链。节点可分布于多个 LD/IED；传送方式不能只凭这幅图决定。')+table(['常见对象','非电气读者的理解','功能边界'],[('过电流 / 欠电流','电流高于 / 低于门槛','PIOC 瞬时；PTOC 延时；PTUC 欠量'),('过电压 / 欠电压','电压偏高 / 偏低','PTOV / PTUV；单靠名称不能决定接地/相间测量'),('频率与变化率','交流变化的快慢，以及快慢改变的速率','PTOF / PTUF / PFRC'),('差动','保护范围各端电流经过方向/尺度配合后的不平衡','PDIF；PHAR 为制动相关功能'),('距离','电压、电流给出的阻抗落入动作区','PDIS；每段一个实例'),('热','电流、温度、热模型与历史共同影响温升','PTTR；不把电流阈值代替温度过程'),('功率方向、功率因数、相角','功率流向以及电压/电流相位关系','PDOP / PDUP / POPF / PUPF / PPAM')]))],
'ln-protection-related':[
sec('coordination','保护相关节点：记录、方向、失灵和重合',graph('related74','故障后的协调过程',[('保护 Str / Op → PTRC.Tr','先说明哪个动作条件触发，再看跳闸'),('RBRF 检查动作后电流/位置是否响应','再跳本断路器与跳其他断路器输出分开'),('RDRE 协调 RADR / RBDR 的记录','记录开始/完成、通道编号、前后窗口分开'),('RREC 协调重合闸与 CSWI / RSYN','是否允许重合、同期条件、次数/时间分开'),('RFLO / RPSB / RDIR 提供专用信息','位置估算、振荡判断、方向参考各有用途')],'表达功能协作，不预设所有工程都采用这条时序。')+p('扰动记录的 COMTRADE（Common format for Transient Data Exchange for power systems）是文件交换格式；它不等于 IEC 61850 的在线采样协议。原标准引用 IEC 60255-24，按本次范围仅解释模型与记录参数。'))],
'ln-control-generic':[
sec('control-chain','许可、命令、反馈与物理能力',graph('switch74','开关控制链',[('IHMI / ITCI 提供操作入口','控制者身份、就地远方与服务选择是上下文'),('CILO.EnaOpn / EnaCls 给联锁许可','例如防止不允许的设备组合'),('CSWI.Pos 组织分合控制','DPC 命令与状态属于同一 DO 的不同属性'),('需要时 CPOW 控制波形相位时刻','补偿执行机构时延，输出 OpOpn / OpCls'),('XCBR / XSWI 表达设备本体','Pos 反馈、BlkOpn/BlkCls 与物理能力分别检查')],'许可不保证执行成功；物理能力不保证联锁已允许。')+table(['概念','例子','为什么分开'],[('许可','CILO.EnaCls=TRUE','逻辑规则允许'),('闭锁','XCBR.BlkCls','某来源禁止合闸'),('物理能力','CBOpCap / MaxOpCap','机构有多少可用操作序列'),('控制过程','ctlModel / SBO / 操作结果','客户端如何提交控制'),('反馈','Pos.stVal / q / t','设备是否到达目标位置')])+p('GAPC 表达通用自动过程控制，GGIO 表达通用 I/O，GSAL 表达安全监视。使用 GGIO 不会让名字自带业务定义；实际 desc 与引用证据必须保留。'))],
'ln-automatic':[
sec('feedback','自动控制：目标、比较、执行与反馈',graph('auto74','电压与分接开关反馈',[('测量：CtlV、LodA、CircA 等','电压、负荷电流与并列运行环流'),('设定：BndCtr / BndWid / CtlDlTmms','控制带中心、宽度与延时'),('判定：压降补偿和闭锁条件','LDC 的 R/X 或 Z 模式与调节限值'),('ATCC / AVCO 发调节请求','TapChg 相对升降；TapPos 目标位置'),('YLTC 执行并返回位置/限位','EndPosR/EndPosL 与机械执行过程')],'原创反馈链；一次电压方向与升降挡关系需按设备核对。')+p('例：原创控制带中心 110 kV、总宽度 2 kV，可把目标带理解为 109～111 kV；实际设备的带宽定义、回差、延时和变比需核对。越过带边缘不等于立刻调挡，更不等于允许无限调挡。'))],
'ln-measurement':[
sec('electrical','电气基础：电流、电压、功率与电能',table(['量 / 缩写','直观含义','单位 / 关系','模型例'],[('电流 I / A','通过导体的电荷流动；模型名 A 与单位 A 需按位置区分','ampere / A', 'TCTR、MMXU.A'),('电压 U / V','两个电位之间的差；相对中性点或两相之间不同','volt / V','PhV 相电压；PPV 线电压'),('有功功率 P / W','转为有用功或热的平均传能速率','watt / W；例如电阻发热','TotW、PhW / W'),('无功功率 Q / VAr','交流电磁场与电源间的周期交换成分','var；正负方向取决于约定','TotVAr、VAr'),('视在功率 S / VA','电压/电流有效值的乘积形成的容量量','VA；正弦单相时 S=U×I','TotVA、VA'),('功率因数 PF','有功功率相对于视在功率的比例','正弦单相时 |PF|=|cosφ|；非正弦不能简化成同一相角','TotPF、PF'),('电能 Wh','功率对时间累计','100 kW 恒定用 2 h → 200 kWh（原创）','MMTR.TotWh / BCR'),('频率 Hz','交流重复变化的每秒周期数','50 Hz 对应 20 ms 周期','Hz、HzRtg、HzSet')])+p('上述功率关系限定正弦、适当参考方向与相/总量语境；三相量、不平衡和非正弦测量应采用相应定义。不能把不平衡三相直接套成单相量乘三。RMS（Root Mean Square，有效值）表示平方平均再开方，采样瞬时值与有效值不能互换。')),
sec('phase','相量、相电压、线电压与序分量',phasor_figure()+graph('phase74','量的组织方式',[('采样值 SAV：某一采样时刻的值','时域序列；TCTR / TVTR / MDIF'),('相量 CMV：幅值 + 相角','相角必须说明参考相量；不是一个普通 FLOAT32'),('WYE：按相组织复合量','phsA / phsB / phsC、neut、net、res 等按 CDC'),('DEL：按相间组织复合量','phsAB / phsBC / phsCA，不能当三相相电压'),('SEQ：正序 / 负序 / 零序分量','用于描述三相不平衡；不是三条原始相波形')],'数据包含结构按 7-3 继续展开。')+p('正序表示正常相序的一组三相分量，负序为相反相序分量，零序三相同相。它们是分析表示，不是新增三根实际导线。中性点电流、残余电流、零序电流与接线/比例约定相关，不把 N、Res、3I0、I0 不加说明地等同。')),
sec('harmonics','谐波、间谐波与统计窗口',table(['概念 / 名称','如何理解','相关字段'],[('谐波 H / Ha','相对于基频的整数倍；50 Hz 基频的二次为 100 Hz','HA/HPhV/HPPV 等频谱'),('次谐波 / 间谐波','低于基频或非整数倍频率成分；例如 25 Hz、75 Hz 相对于 50 Hz','同一类实例的频率与分析窗决定用途'),('Thd / Td','总谐波失真/总失真；分母与方法要核对','ThdA、ThdVol，另有 Odd/Evn 分量'),('Tdd','总需求失真；IEEE 519 引用的需求电流基准','TddA、TddAmp、NomA/NormA'),('Ts / Tu','谐波功率带符号代数和 / 绝对值和','HTsW/HTuW、HaTsWatt/HaTuWatt'),('Cf / K 因子 / Tdf / TiF','峰值、附加负担、降额与电话影响指标','按对应计算定义，不仅凭名称套统一公式'),('平均 / 最大 / 最小','必须指定时间窗；读到的最大值不是实时值','MSTA.Av*/Max*/Min* 与 EvTmms')])+p('本版 5.10.3 原文写 EvTmms=1/Hz，但字段名和单位指毫秒，解释周期时应先统一单位：T(ms)=1000/f(Hz)，50 Hz 为 20 ms，60 Hz 约 16.667 ms。原文还混用 EvalTmms/EvTmms、NumCycl/NumCyc、SmpRte/其他采样命名；保留来源差异，不自动生成配置。Hz/HzSet 二选一；NumCyc 和窗口影响可分析频率，最高频率还受采样率限制。')+p('已有 '+link('cdc-measurement','7-3 频谱结构与数组')+' 提供 HWYE/HDEL/HMV 和索引边界；本页解释功能用途。'))],
'ln-switch-transformer':[
sec('equipment','一次设备与逻辑模型',table(['实际对象','相关 LN','区分'],[('断路器 / Circuit Breaker','XCBR；控制 CSWI；联锁 CILO','本体、命令组织与许可分别表达'),('隔离 / 接地 / 负荷开关','XSWI / SwTyp','开关类型与开断能力不同'),('电流互感器 CT','TCTR','实物转换/绝缘功能与通信采样模型不同'),('电压互感器 VT / 常用 PT','TVTR','电压采样、熔丝故障与比例配置分开'),('变压器','YPTR；YLTC；ATCC；PTTR 等','本体、分接执行、自动控制与热保护分开'),('消弧线圈','YEFN；ANCR','对接地电容电流进行补偿的设备与自动调节功能'),('功率分流部件','YPSH','位置、闭锁与物理操作能力')])+p('这是一种功能拆分，不能据一个 LN 推断现场具体接线，也不要求每个设备节点都处在独立 IED 中。相别建模需要时用多个实例表达，实例描述说明相别，不能单靠最后一位数字猜相。'))],
'ln-monitoring-equipment':[
sec('monitoring','监视、设备健康与保护动作',table(['监视量','实际含义','告警/闭锁/跳闸区别'],[('电弧','故障电弧或开关电弧相关监视','SARC.FADet 与 SwArcDet 的来源不同'),('气体绝缘','压力、密度、温度及介质水平','SIMG.InsAlm/InsBlk/InsTr 不能合成一个告警'),('液体绝缘','温度、液位、压力、油中湿度/氢气','SIML.H2O 要与 H2OTmp 一起读'),('局部放电','绝缘局部区域放电活动','SPDC.AcuPaDsch 表达声学水平；不凭一次告警确定损坏程度'),('套管 / 电池','损耗系数、参考电容等 / 电压与测试','当前扫描缺印刷 68，节点表有明确缺页边界')])+p('告警表示需要关注，闭锁表示禁止某操作，跳闸信息表示应隔离异常设备的动作条件；门槛和具体处置依赖应用/设备。设备节点 Z* 表达实体功能，S* 表达监视功能，P* 表达保护判定，它们可同时出现在同一 IED。'))]
}
for file,intros in group_intros.items():
 if file=='ln-protection':intros=intros+[sec('requirements-map','表 3：功能要求标签与本版保护模型',p('这是所给版次引用的 DL/T 860.5 与 IEEE C37.2 功能标签对照，帮助识别历史名称；不是从设备名反推保护功能的规则，也不是跨版次全集。')+table(['功能','IEEE 引用标签','7-5 要求名','本版 7-4 建模','关系说明'],[(esc(a),code(b),code(c),esc(d),esc(e)) for a,b,c,d,e in PROTECTION])+p('多个旧功能名可归入同一 LN 类；不同输入、定值、方向或区间通常通过不同实例表示。'))]
 if file=='ln-control-generic':intros=intros+[sec('requirements-map','表 4～8：功能拆分与历史标签',table(['定位','功能','7-5 要求名','本版 7-4 建模','如何理解'],[(esc(a),esc(b),code(c),esc(d),esc(e)) for a,b,c,d,e in OTHER]))]
 cs=[c for c in CLASSES if c['name']!='COMMON' and GROUPS[c['name'][0]][1]==file]
 title={'ln-protection':'保护功能逻辑节点：P 组全表','ln-protection-related':'保护相关逻辑节点：R 组全表','ln-control-generic':'控制、通用功能与接口：C / G / I 组','ln-automatic':'自动控制逻辑节点：A 组','ln-measurement':'测量、计量与电气基础：M 组','ln-switch-transformer':'开关、互感器与变压器：X / T / Y 组','ln-monitoring-equipment':'传感器监视与其他电力设备：S / Z 组'}[file]
 page(file,title,intros+[node_section(c) for c in cs],'第 5 章；各节点节内给 PDF 定位')

def mode_merge(a,b):
 if 5 in [a,b]:return 5
 test=any(x in [3,4] for x in [a,b]);blocked=any(x in [2,4] for x in [a,b])
 return 4 if test and blocked else 3 if test else 2 if blocked else 1
value_sections=[
sec('mode','Mod / Beh：五种模式与全部组合',table(['编码','模式','功能','过程输出','报告（本版表 9）','控制服务','过程数据'],[(a,code(b),c,d,e,f,g) for a,b,c,d,e,f,g in MODE_ROWS])+p('配置/能力数据在五种模式下均可见。这里只是本版的模型行为表，不能用它证明某设备已严格实现；现代版次/设备差异另核对。Beh 为只读结果，不把写 Mod 的请求等同于已生效。')+table(['本 LN.Mod ↓ / LLN0.Mod →']+[str(x)+' '+MODE_ROWS[x-1][1] for x in range(1,6)],[[str(a)+' '+MODE_ROWS[a-1][1]]+[str(mode_merge(a,b))+' '+MODE_ROWS[mode_merge(a,b)-1][1] for b in range(1,6)] for a in range(1,6)])+p('例：本 LN.Mod=on(1)，LLN0.Mod=test(3)，实际 Beh=test(3)；本 LN=blocked(2)、LD=test(3)，Beh=test-blocked(4)；任一为 off(5)，结果为 off(5)。不是对编码简单取最大值。来源 PDF 80 / 91。')),
sec('booleans','布尔量不统一等同于“正常 / 异常”',table(['对象','FALSE / 0','TRUE / 1'],BOOLEAN_ROWS)+p('布尔值是二元真值，业务语义由 DO 定义。BlkCls 为 TRUE 表示禁止合闸，EnaCls 为 TRUE 表示联锁允许，AngInd 为 TRUE 表示相角差不满足同期条件。三者同为 SPS，也不能交换业务解释。'))]
for name,pdf,title,vals in ENUMS:
 value_sections.append(sec(name,title+'：'+name,p('原文表 9，PDF '+str(pdf)+'（印刷 '+str(pdf-4)+'）。编码来自本份标准；工程 EnumType 可能采用不同标签/扩展项，另沿类型引用核对。')+table(['编码 / 值','含义'],[(code(a),esc(b)) for a,b in vals])))
value_sections += [
sec('numeric','数值、单位、百分数与时间不能只看缩写',table(['字段 / 家族','量纲或参考','读取关系'],[('OpDlTmms / RsDlTmms / Rec*Tmms / TrPlsTmms','毫秒 ms','200 ms=0.2 s；延时、脉宽、重合间隔分别用'),('InhTmm / EqTmm / MaxStrTmm','分钟 min','原表 m 在缩写表为分钟；单位表 m 为米'),('SetTms / LokRotTms / PerTrgTms','秒 s','按全名区分，不能凭 ING 推断单位'),('LoSet / HiSet','标称电流百分数','先确认百分数的额定参考量'),('PctRch / PctOfs','线路长度百分数','100% 的基准线路由配置/应用说明'),('BndCtr / BndWid','电压或额定电压百分数','控制带中心、总宽度、回差的定义另查'),('MemUsed / MemFull','占用百分数 / 满阈值百分数','不等于记录数 NumRcd 或溢出 MemOv'),('FltDiskm / LinLenKm','千米 km','估算位置与线路长度不能视为地理坐标'),('Cor / Rat / AngCor','幅值修正、变比、相角修正','一次值已换算时不能再次重复乘变比'),('H2 / H2O / H2OTmp','氢气浓度 / 湿度百分数 / ℃','浓度单位倍率沿实际配置核对'),('SPG / ING / ASG','布尔、整数、模拟定值 CDC','连续数值不能穷举，列类型、单位、范围与参考基准')])+p('原文并未给所有定值的上下限或步长；不补造“标准推荐整定值”。INT32/FLOAT32 的表示范围不等于设备可用范围。原表 ISI/INS、名称与单位不一致处见 '+link('ln-data-dictionary','差异说明','differences')+'。')),
sec('geometry','距离保护的阻抗平面与电网振荡',impedance_figure()+graph('impedance74','从阻抗点到区域判定',[('复阻抗 Z = R + jX','R 为电阻轴，X 为电抗轴；相量比须满足适用条件'),('PDIS 的动作区：PoRch / X1 / LinAng 等','姆欧圆或四边形等区域由具体原理与定值决定'),('负荷区：RisLod + AngLod','大负荷可能接近动作区；不可只看阻抗模'),('接地区域：RisGndRch + K0Fact / K0FactAng','零序补偿、相/地计时器与方向条件分别核对'),('RPSB：阻抗轨迹穿越区域的时间','振荡可以缓慢移动，故障可快速跃迁；具体判据属实现')],'重绘为语义关系图，来源表 9 AngLod/PctOfs/RisGndRch/SwgVal；不生成现场保护范围。')+p('标准图中的 PDIS1/2/3 是不同实例。源码工程没有 PDIS，不将其他保护节点的数字后缀解释成距离段。K0Fact 的复数补偿还涉及序阻抗与测量电流约定；原表公式需连同原定义读取，不能只按字段名直接给出一次故障定位结果。'))]
page('ln-values-reference','7-4 数据取值：枚举、模式组合与量纲',value_sections,'第 6 章表 9，PDF 79～102；Mod/Beh 为 PDF 80 / 91')

DIFFERENCES=[
('扫描缺页','PDF 72 是印刷 58 的重复','印刷 68 不在该扫描','ZBAT 专用表与 ZBSH 首表不声称完整'),
('整数状态类型','部分原表写 ISI','7-3 本版定义 INS','保留原表 ISI，链接 INS 的对应解释，不静默改写规范'),
('节点表 / 名称字典','PhyName / PhyNam','ChTrg / Chtrg；GnSpd / GnSp','分别保留原表字形，工程仍读实际 XML'),
('差动电流','PDIF 的 DiffAClc','表 9 的 DifAClc','通过别名解释同一出处，不自动重命名工程'),
('记录复位','RDRE 的 MemRs','表 9 的 MmeRs','指向复位存储器说明，保留印刷差异'),
('记录模式','RDRE / IARC 列 OpMod','表 9 列 RcdMod','语境关联但不声称类型/业务完全等价'),
('水泵控制','CCGR 的 Pump*','表 9 的 Pmp*','整组/单台、过流/故障分别对应'),
('频谱定值 / 数组','MHAN 的 Even / NormA','表 9 的 Evn / NomA','名称、频率窗口单位与算法定义均需核版'),
('相别与单位','MMXU 的 A/W/Z/VAr','表 9 的 PhA/PhW/PhZ 等','说明用途，不把名称差异视为任意可互换'),
('跳闸 / 告警解释','PresTr 的名称与 SIML 表为跳闸','表 9 中文解释写 Level 告警','明确有原文语义差异'),
('秒 / 分钟 / 安全','Tms / Tmm / Sec','不同时间后缀；Sec=Security','遵循完整名称与单位，不按单个英文片段猜测')]
dictionary_sections=[
sec('usage','1. 查一个数据名的步骤',p('首先定位父 LN，再看第 5 章选择的 CDC、M/O/C 与 T；本页解释语义，'+link('ln-values-reference','取值页')+'列明示枚举，'+link('cdc-attribute-dictionary','7-3 属性字典')+'解释 DA。DO=Op 与 DA=ctlVal 属于不同层级；stVal/q/t 不是 Op 的英文“全拼”。')+p('下面列出表 9 的 519 个名称，并对节点表中的少量印刷变体提供别名。搜索在本地完成；中文或英文均可。')+'<label class="part74-filter">筛选数据名或含义 <input type="search" data-filter="dictionary" placeholder="例如 Pos、跳闸、Tmms" aria-label="筛选 7-4 数据字典"></label><p class="meta" data-filter-count="dictionary" aria-live="polite"></p>'),
sec('differences','2. 原文差异与大小写',table(['位置','原文一','原文二 / 边界','本库处理'],[(esc(a),code(b),esc(c),esc(d)) for a,b,c,d in DIFFERENCES]))]
byletter=defaultdict(list)
for name,d in DICTIONARY.items():byletter[name[0].upper()].append((name,d))
enum_names={n for n,_,_,_ in ENUMS}|{'Mod','Beh'}
for initial,items in sorted(byletter.items()):
 rows=[]
 for name,d in items:
  uses=[c['name'] for c in CLASSES if any(dname(f['name'])==name for f in FIELDS[c['name']])]
  usage=' · '.join(link(GROUPS[c[0]][1],c,c) for c in uses if c!='COMMON')
  if 'COMMON' in uses:usage=link('ln-system','公用信息','COMMON')+(' · '+usage if usage else '')
  if not usage:usage='表 9 定义；节点分配按具体第 5 章表 / 扩展定义核对'
  value=link('ln-values-reference','明示取值', 'mode' if name in ['Mod','Beh'] else name) if name in enum_names else '单位/参考/边界见简述及 '+link('ln-values-reference','数值关系','numeric')
  variants=[a for a,b in ALIASES.items() if b==name]
  label=code(name)+(('<br><span class="meta">节点表：'+esc(' / '.join(variants))+'</span>') if variants else '')
  rows.append('<tr data-filter-item="dictionary" id="data-'+name+'"><td>'+label+'</td><td>'+esc(d['summary'])+'</td><td>'+usage+'</td><td>'+value+'</td><td>PDF '+str(d['page'])+'</td></tr>')
 body='<div class="reference-table"><table><thead><tr><th scope="col">数据名 DO</th><th scope="col">语义简述</th><th scope="col">节点反向引用</th><th scope="col">取值</th><th scope="col">来源</th></tr></thead><tbody>'+''.join(rows)+'</tbody></table></div>'
 dictionary_sections.append(sec('letter-'+initial,initial+'：数据名称',body))
dictionary_sections.append(sec('variants','节点表的补充名称与别名',table(['名称','说明','对应名称'],[(code(a),esc(meaning(a)),dlink(b)) for a,b in ALIASES.items()])+''.join('<p id="data-'+n+'">'+code(n)+'：'+esc(v)+'（节点表语境的补充解读，非表 9 新增项）。</p>' for n,v in EXTRA.items())))
page('ln-data-dictionary','第 6 章：519 个数据名称与反向索引',dictionary_sections,'第 6 章，表 9；PDF 79～102')

absections=[sec('naming','缩写用于组词，完整语义仍查 DO',p('例如 ChNum=Channel+Number（通道编号）；OpDlTmms=Operate+Delay+Time in milliseconds（动作延时，毫秒）。完整数据名区分大小写。缩写的“意义”与数据的“用途/取值”分别查本表与 '+link('ln-data-dictionary','数据字典')+'；不为 C1、GC_1 等条件代码编造英文全拼。')+table(['例子','拆解','读法'],[('PhyHealth','Phy + Health','物理设备健康'),('ChaMotEna','Cha + Mot + Ena','允许蓄能电动机；不是随意授权操作员'),('GriFltNum','Gri + Flt + Num','电网故障编号，由本地分配'),('OpCntRs','Op + Cnt + Rs','可复位动作计数'),('ThdEvnPhV','Thd + Evn + Ph + V','偶分量相电压谐波失真；Evn 属补充组成词'),('K0FactAng','零序补偿 K0 + Fact + Ang','复数补偿系数的角；以完整定义为准')])+p('Evn/Odd/Ih 等在表 9 中出现，但不一定单独列入第 4 章；另标作补充组成词。')+'<label class="part74-filter">筛选缩写 <input type="search" data-filter="abbreviations" placeholder="例如 CT、Pwr、时间" aria-label="筛选 7-4 缩写"></label><p class="meta" data-filter-count="abbreviations" aria-live="polite"></p>')]
for pdf in range(6,14):
 rows=['<tr data-filter-item="abbreviations" id="abbr-'+a['name'].replace('/','-')+'"><td>'+code(a['name'])+'</td><td>'+esc(a['en'])+'</td><td>'+esc(a['zh'])+'</td><td>'+esc(a['usage'])+'</td></tr>' for a in DATA['abbreviations'] if a['page']==pdf]
 absections.append(sec('pdf-'+str(pdf),'第 4 章缩写：PDF '+str(pdf),'<div class="reference-table"><table><thead><tr><th scope="col">缩写</th><th scope="col">英文原文 / 拼写校正</th><th scope="col">中文</th><th scope="col">功能与用法</th></tr></thead><tbody>'+''.join(rows)+'</tbody></table></div>'))
absections.append(sec('supplement','补充组成词与专业缩写',table(['缩写 / 原文','中文','用途'],[('DO / Data Object','数据对象','功能中的一类信息'),('DA / Data Attribute','数据属性','数据对象的结构内容'),('BDA / Basic Data Attribute','基础数据属性','结构属性中的分量'),('SCD / Substation Configuration Description','变电站配置描述','工程实例、通信、模型模板与绑定'),('IED / Intelligent Electronic Device','智能电子设备','实现一个或多个功能节点'),('FC / Functional Constraint','功能约束','属性状态、测量、控制等访问视图'),('Evn / Even；Odd','偶数 / 奇数','谐波偶/奇分量'),('Ih / Interharmonics','间谐波','表 9 中的频谱名称组成词'),('COMTRADE','电力系统暂态数据交换通用格式','文件格式；不是在线采样协议'),('RMS / Root Mean Square','均方根 / 有效值','不要与峰值或某次采样值混用'),('M / O / C / T','必备 / 可选 / 条件 / 瞬态','节点表标志，详见公共信息页')])) )
page('ln-abbreviations','第 4 章：缩写、英文、中文与用法',absections,'第 4 章；PDF 6～13','标准文库')

annex_sections=[
sec('extension','附录 A：优先复用，再扩展',graph('extend74','扩展选择路径',[('已有合适 LN 类？→ 使用它及全部必备数据','功能变体、相别、段别优先用多个实例'),('已有该 LN 的可选数据？→ 使用可选项','不要为相同标准功能另造名字'),('需要同语义多份数据？→ 用编号扩展','如多个热点测点，实例描述解释每个编号'),('需要其他标准数据？→ 优先查第 6 章','保持原语义并指定合适 CDC'),('确无标准覆盖？→ 新 LN / DO / CDC','按命名约定、定义来源、唯一性和公开文档管理')],'A.1～A.8 的原创决策图。命名空间是定义追溯，不自动保证互操作。')+table(['条款','规范性要点','应用说明'],[('A.1','可用标准类及必备数据优先；变体用实例','不能为相同功能随意改类名'),('A.2','同类多实例表示不同用途/相别/区间','PTOC 的相/地用途，PDIS1/2/3，YPTR 各相，ZAXN 各电源'),('A.3','同语义数据多次定义使用编号扩展','HPTmp1…4 是不同测温点，不是四种 CDC'),('A.4','新 LN 首字母按组，其他字符与功能英文相关','命名空间、系统内唯一及公开说明'),('A.5','新 LN 的自动门入口控制与灭火示例','ADEC 示例展示四字符助记；示例不等于设备必须支持'),('A.6','新 DO 优先用第 4 章缩写，每一数据名指定一个 CDC','不同层级的名字与结构定义分别记录'),('A.7','油颜色的新数据示例','原例为 ColrTOil，类型打印 ISI；保留与 INS 差异'),('A.8','没有合适 CDC 才扩展/新增 CDC','属性结构定义来源与 DO 业务来源分别说明')])+p('命名空间向下继承与差异声明见 '+link('standard-part-7-3','ldNs / lnNs / dataNs / cdcNs','namespace')+'。XML xmlns 的语法命名空间不代替这些业务模型定义来源。')),
sec('examples','实例化、编号与定义来源示例',table(['方式','原创例子','什么意思'],[('多个 LN 实例','DemoPDIS1 / DemoPDIS2 / DemoPDIS3','同类用于不同区间；具体范围由定值和描述给出'),('同一 LN 中编号 DO','HPTmp1 / HPTmp2','同语义不同测点，CDC 可以相同'),('多个物理相单元','DemoYPTR1 / DemoYPTR2 / DemoYPTR3','按相建模时用明确描述关联相别'),('不同电源实例','DemoZAXN1 / DemoZAXN2','电源额定值/位置有明示文档，不靠实例数字猜电压')])+pre('<LNodeType xmlns="http://www.iec.ch/61850/2003/SCL" id="Example_YPTR" lnClass="YPTR">\n  <DO name="Mod" type="ExampleINC"/>\n  <DO name="Beh" type="ExampleINS"/>\n  <DO name="Health" type="ExampleINS"/>\n  <DO name="NamPlt" type="ExampleLPL"/>\n  <DO name="HPTmp1" type="ExampleMV"/>\n  <DO name="HPTmp2" type="ExampleMV"/>\n</LNodeType>')+p('以上为原创 XML 结构片段；引用的 Example* 类型未在片段中展开，不是完整可投产 SCL。测点与定义来源由配套模型文档说明。完整语法成立不代表通过 XSD 或功能校验。')),
sec('b1','B.1：补偿接地网络的瞬态与持续信息',graph('earth74','PTEF 与 PSDE',[('接地故障发生 → 对地电容的瞬态充电过程','PTEF 用于检出故障开始'),('补偿网络还有残余电流与方向信息','PSDE 可用于观察故障开始与结束'),('是否送跳闸 → 由保护策略与互感器性能决定','不是所有接地检出都立即等同跳闸')],'按 B.1 重绘；不提供真实故障电流波形或整定值。')),
sec('b2','B.2：PSCH 协调，PTRC 形成跳闸条件',graph('psch74','线路两端保护协作',[('站 A：PDIS 多段 / PTOC 等保护','各实例给启动与动作信息'),('PSCH：站 A 与站 B 的方案协调','传送正向故障信息、允许/闭锁与弱馈等'),('PTRC：组合直接动作与 PSCH 动作','处理相别、脉冲等跳闸条件'),('XCBR：每端断路器过程模型','执行结果沿位置、品质和事件检查')],'可以跨多个逻辑设备和 IED；参考 SCD 的存在不证明已复原此图全部绑定。')),
sec('b3','B.3：MDIF 与 PDIF 的分工',p('MDIF 组织本地/对端测量，PDIF 用这些输入形成保护判断。多端差动需先处理方向、尺度和时间一致性，比较相量和并计算制动量。原附录给三端线路示例；实际算法、对端数据交换机制与常数不由本示例统一规定。')+graph('diff74','多端测量与差动判断',[('端 A / B / C 的测量','本地采样与对端测量各有来源、品质、时间'),('MDIF 组织相量或采样数据','测量可供观察，不等于保护已经动作'),('PDIF 计算差流/制动并判断','范围、算法、制动与延时一起决定'),('PTRC → XCBR','保护条件与物理状态分开')],'按 B.3 改画的功能关系。')),
sec('b4','B.4：扰动记录的逻辑设备',graph('recorder74','一个记录 LD 的功能节点',[('输入：TCTR / TVTR / XCBR / GGIO','传统接线时输入映像可在本地；过程总线可在外部'),('每个模拟通道 → RADR；状态通道 → RBDR','N 个模拟、M 个状态通道按实例组织'),('RDRE：共同参数与触发协调','前/后窗口、记录开始/完成与存储策略'),('LLN0：该记录 LD 的公共信息','不是把 RADR 作为 RDRE 的继承子类')],'图为包含/协作关系；文件内容访问遵循 COMTRADE 语境。')),
sec('b5','B.5：同一功能可分配在不同 IED 中',table(['分配示例','功能模型','传送关系'],[('保护 IED 通过电缆跳开断路器','PTOC / PDIS / PTRC，过程输入映像','跳闸逻辑与硬接线分开'),('保护与过程 IED 分离','保护功能与 XCBR 可在不同设备','GSE 类事件交换用于协调'),('两种保护分置专用 IED','节点类不因分配变化而改名','总线及通信性能按实际工程确定')])+p('“逻辑功能在哪台机器运行”和“数据经过什么协议传输”是不同问题。图中 GSE 是通用变电站事件服务语境，具体 GOOSE/GSSE 映射另查 '+link('service-mapping','映射专题')+'，不能根据节点类自动推断网络报文。')),
sec('b6','B.6：PDIR 的母线方向比较',graph('bus74','多个间隔的方向汇集',[('间隔 1…n：PTOC 等检出故障并给方向','方向参考与母线拓扑须明确'),('PDIR 比较围绕母线的方向信息','结合母线映像判断保护范围内的故障'),('各间隔 PTRC → 各间隔 XCBR','方向决策和每个断路器的跳闸条件分开')],'没有完整拓扑/方向绑定时不推断参考工程实际采用此方案。')),
sec('b7','B.7：RREC、CSWI 与 XCBR 协调',graph('reclose74','重合闸协作',[('PTOC 等动作，经 PTRC 请求跳闸','跳闸事件与断路器位置反馈分别观察'),('RREC：自动使能、闭锁、次数与延时','首次/再次间隔、复归与状态 AutoRecSt'),('RSYN / CSWI：相关检查与合闸请求','传统服务或事件传送按分配和实时能力决定'),('XCBR：过程设备的实际位置','成功合闸需靠反馈，而不是仅凭 RREC.Op')],'按 B.7 原理重绘；不替代现场试验。')),
sec('b8','B.8：PDIS 不是一张固定的万能定值表',table(['实例变体','原附录重点','阅读方法'],[('正常段','相/地共用时间模式与阻抗/电阻边界','TmDlMod + OpDlTmms，联合范围/负荷区'),('高端段','多相与单相接地有独立计时器','PhDlMod/PhDlTmms 与 GndDlMod/GndDlTmms 分别读'),('简单阻抗单相段','只保留少量动作延时与阻抗范围字段','不从简化表反推所有复杂定值均应存在')])+p('同类不同实例的合理可选集合可以不同。第 5 章给允许的模型，第 6 章解释数据，附录展示组合变化；它们不能合并成每台设备必须具备的完整定值清单。')),
sec('annex-c','附录 C：功能要求与节点建模的分工',table(['7-5 功能要求名','本版 7-4 状态','为什么'],[('STIM：主定时','未使用专用节点','系统时间可由外部资源与服务提供'),('SSYS：系统监视','未使用该专用节点','强烈依赖实现，L 组可提供部分基本监视'),('GTES：测试信号发生器','未使用该专用节点','原附录指向范围外测试功能及第 10 部分')])+p('未建立专用 LN 不等于功能不存在。7-5 提要求，7-4 定模型，服务与通信栈也可以实现部分系统功能。'))]
page('ln-extension-modeling','附录 A/B/C：扩展规则与功能建模',annex_sections,'附录 A.1～A.8、B.1～B.8、C；PDF 103～113','数据模型')

scd_sections=[
sec('overview','工程观测集合与原始名称',p('本页从指定 SCD 实际读取，保留 IED、LD、LN 和类型 ID 原名，不根据名称或地址猜业务。desc 仅作为配置声明引用；它不是运行状态。源文件 '+ '<a href="../../source/'+esc(source.name)+'">'+esc(source.name)+'</a>'+' 未修改；完整统计见 <a href="../data/part74-evidence.json">part74-evidence.json</a>。')+table(['统计项','实际读取'],[('SCL 根版本',esc(' / '.join(root.get(k,'') for k in ['version','revision','release']))),('IED',len(q(root,'.//s:IED'))),('LN / LN0 实例',len(lns)),('lnClass 字符串',len(counts)),('LNodeType / DOType / DAType / EnumType',str(len(types))+' / '+str(len(dotypes))+' / '+str(len(datypes))+' / '+str(len(enumtypes))),('本版观察到 / 未观察到的类',str(len(baseline&set(counts)))+' / '+str(len(baseline-set(counts))))])+p('SCD SHA-256：'+code(evidence['sha256'])+'。配置只声明模型，不证明设备在线服务、定值合法、XSD 完整符合或现场动作成功。')),
sec('classes','实际类与基线范围对照',table(['lnClass','实例数','本版关系','实例证据'],[(code(c),v,'本版类' if c in baseline else '本版 91 类之外；定义来源另查',link('ln-scd-evidence','实际模板','scd-'+c)) for c,v in sorted(counts.items())])+p('未出现的本版类：'+esc('、'.join(sorted(baseline-set(counts))))+'。其中 PDIS/MMTR 的解释采用标准模型与原创教学例。超出基线的类 '+esc('、'.join(sorted(set(counts)-baseline)))+' 仅按工程声明列出，不把它们自动解释成标准早期类。')),
sec('trace','实例、DO、SDO、DA 与枚举引用',graph('scd74','一条可以核对的证据链',[('真实 LN：IED / LD / prefix / lnClass / inst','源行定位实例，desc 是配置文字'),('LN.lnType → LNodeType.id','LNodeType.DO.name 与 type 列出信息对象'),('DO.type → DOType.cdc / DA / SDO','CDC 是声明；与本版差异分开'),('SDO.type → 另一个 DOType','例如三相量的相分量继续引用'),('DA.type → DAType 或 EnumType','EnumVal.ord 是工程编码，不用表的行号代替')],'以下示例保留实际名称，每个 XML 片段为源元素摘录；不声称完整引用链已通过模式校验。'))]
for cls,s in samples.items():
 body=p('实例：'+code(s['IED']+'/'+s['LDevice']+'/'+s['prefix']+cls+s['inst'])+'；源行 '+str(s['line'])+'；lnType='+code(s['lnType'])+'（模板行 '+str(s['type_line'])+'）。desc='+code(s['desc'])+'。')
 body+=table(['DO 名','DO.type / 源行','CDC 声明','与本版本类的关系'],[(code(d['name']),code(d['type'])+' / '+str(d['line']),code(d['cdc']), '本类表列名称' if any(f['name']==d['name'] for f in FIELDS.get(cls,[])) or d['name'] in ['Mod','Beh','Health','NamPlt'] else '未按本类原表逐字匹配；可能编号/扩展/版次差异，需沿定义核对') for d in s['objects']])
 body+='<details><summary>展开实际 LN 元素摘录（选取前两个子元素）</summary>'+pre(s['xml'])+'</details>'
 body+='<details><summary>展开完整 LNodeType 源元素摘录</summary>'+pre(s['type_xml'])+'</details>'
 # Representative direct DOType plus recursively referenced SDO/DAType/EnumType.
 preferred=['A','Pos','Str','Tr','PhyHealth','Amp','Vol','SeqA','TapPos','Ind1','Health']
 d=next((d for name in preferred for d in s['objects'] if d['name']==name),s['objects'][0] if s['objects'] else None)
 if d:
  visited=set();rows=[];snippets=[]
  def trace(kind,ident,path,depth=0):
   if depth>7:return
   pool={'DOType':dotypes,'DAType':datypes,'EnumType':enumtypes}[kind];e=pool.get(ident)
   if e is None:return
   key=(kind,ident)
   if key in visited:return
   visited.add(key);snippets.append((kind,ident,e.sourceline,ET.tostring(e,encoding='unicode',pretty_print=True)))
   for child in e:
    tag=ET.QName(child).localname;path2=path+'.'+child.get('name','')
    if tag=='EnumVal':continue
    rows.append((esc(path2),code(tag),code(child.get('bType',child.get('type',''))),code(child.get('fc','—')),str(child.sourceline)))
    if tag=='SDO':trace('DOType',child.get('type'),path2,depth+1)
    elif child.get('bType')=='Struct':trace('DAType',child.get('type'),path2,depth+1)
    elif child.get('bType')=='Enum':trace('EnumType',child.get('type'),path2,depth+1)
  trace('DOType',d['type'],d['name'])
  body+='<details><summary>追踪 '+esc(d['name'])+' 的 SDO / DA / BDA 与定义</summary>'+table(['包含路径','元素','类型 / 引用','FC','源行'],rows)
  for kind,ident,line,xml in snippets:body+=p(code(kind)+' '+code(ident)+' / 源行 '+str(line))+pre(xml)
  body+='</details>'
 scd_sections.append(sec('scd-'+cls,cls+'：实际实例与模板',body))
enum_body=p('115 个 EnumType 按完整 ord/标签序列归并成 '+str(len(enum_groups))+' 组。下面保留每个编码与标签，以及所有 DA/BDA 使用点；归并只表示声明序列相同，不保证业务含义相同。')
for k,(values,members) in enumerate(enum_groups.items(),1):
 enum_body+='<details><summary>枚举组 '+str(k)+'：'+str(len(members))+' 个模板，'+str(len(values))+' 个编码</summary>'+p('模板：'+esc('、'.join(members)))+table(['工程 ord','原标签'],[(code(a),esc(b)) for a,b in values])+table(['使用元素','容器模板 ID','属性名','源行'],[(esc(u['kind']),code(u['container']),code(u['attribute']),u['line']) for ident in members for u in enum_usage[ident]])+'</details>'
scd_sections.append(sec('enums','实际工程枚举：编码、标签与全部使用点',enum_body))
page('ln-scd-evidence','参考 SCD：逻辑节点实例、类型链与枚举',scd_sections,'参考 SCD 实际 XML 源行；与 7-4 基线逐字名称对照；未进行完整 XSD 或设备验证','SCL 配置')

terms=[]
for c in CLASSES:
 if c['name']=='COMMON':continue
 n=c['name'];terms.append(dict(id=n.lower(),zh=n+' '+c['zh'],en=c['en'],aliases=[n,c['zh']],category='数据模型',level='第 7-4 部分 / '+GROUPS[n[0]][0],summary=CLASS_NOTES.get(n,c['zh']+'功能模型；数据、CDC 与存在性见节点表。'),related=['ln','cdc','do'],href='chapters/'+GROUPS[n[0]][1]+'.html#'+n))
for d in DICTIONARY.values():
 terms.append(dict(id='part74-do-'+d['name'],zh=d['name'],en=d['name'],aliases=[d['name'],d['summary']]+[a for a,b in ALIASES.items() if b==d['name']],category='7-4 数据语义',level='LN → DO；不是 DA',summary=d['summary'],related=['ln','do','cdc'],href='chapters/ln-data-dictionary.html#data-'+d['name']))
for name,summary in EXTRA.items():
 terms.append(dict(id='part74-do-extra-'+name,zh=name,en=name,aliases=[name,summary],category='7-4 节点表补充名称',level='节点表语境；非表 9 新增项',summary=summary,related=['ln','do','cdc'],href='chapters/ln-data-dictionary.html#data-'+name))
terms.append(dict(id='comtrade',zh='COMTRADE',en='Common format for Transient Data Exchange for power systems',aliases=['COMTRADE','暂态数据交换格式','扰动记录文件'],category='保护相关功能',level='记录文件格式',summary='扰动记录文件交换格式；RADR/RBDR 的通道内容与记录协调分开，不能当作在线采样协议。',related=['rdre','radr','rbdr'],href='chapters/ln-protection-related.html#coordination'))
for a in DATA['abbreviations']:
 terms.append(dict(id='part74-abbr-'+a['name'].replace('/','-'),zh=a['name']+' '+a['zh'],en=a['en'],aliases=[a['name'],a['en'],a['zh']],category='7-4 缩略语',level='第 4 章组词',summary=a['usage'],related=['ln','do'],href='chapters/ln-abbreviations.html#abbr-'+a['name'].replace('/','-')))
for f,t,g in pages:
 terms.append(dict(id='part74-page-'+f,zh=t,en=t,aliases=[t,'7-4'],category=g,level='第 7-4 部分',summary='功能、语义、取值和原文定位完整关联阅读。',related=['ln','do','cdc'],href='chapters/'+f+'.html'))
js='(function(){const additions='+json.dumps(terms,ensure_ascii=False,indent=2)+';const terms=window.IEC61850_TERMS;for(const entry of additions){const old=terms.find(t=>t.id===entry.id);if(old){entry.aliases=[...new Set([...(old.aliases||[]),old.zh,...entry.aliases])];entry.related=[...new Set([...(old.related||[]),...entry.related])].filter(id=>id!==entry.id);Object.assign(old,entry);}else terms.push(entry);}}());\n'
(OUT/'data/part74-terms.js').write_text(js,encoding='utf-8')
(OUT/'data/part74-pages.json').write_text(json.dumps(pages,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'pages':len(pages),'classes':len(baseline),'fields':sum(map(len,FIELDS.values())),'dictionary':len(DICTIONARY),'abbreviations':len(DATA['abbreviations']),'observed_classes':len(counts),'enum_groups':len(enum_groups)},ensure_ascii=False))
