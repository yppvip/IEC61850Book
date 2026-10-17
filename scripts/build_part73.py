"""Build the offline 7-3 guide. Run from any directory; source SCD is read-only."""
from pathlib import Path
from collections import Counter, defaultdict
import html, json, re, hashlib, xml.etree.ElementTree as ET
from part73_data import CDC, CONDITIONS, DICTIONARY, CURVES, rows
ROOT=Path(__file__).resolve().parents[1]; OUT=ROOT/'outputs'
esc=lambda s:html.escape(str(s))
def p(s):return '<p>'+s+'</p>'
def code(s):return '<code>'+esc(s)+'</code>'
def link(f,t,a=''):return '<a href="'+f+'.html'+('#'+a if a else '')+'">'+esc(t)+'</a>'
def sec(i,t,s):return '<section><h2 id="'+i+'">'+esc(t)+'</h2>'+s+'</section>'
def table(h,rs):return '<div class="reference-table"><table><thead><tr>'+''.join('<th scope="col">'+esc(x)+'</th>' for x in h)+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+str(x)+'</td>' for x in r)+'</tr>' for r in rs)+'</tbody></table></div>'
def pre(s):return '<pre data-language="xml"><code>'+esc(s)+'</code></pre>'
def diagram(i,title,items,caption):
 h=30+len(items)*90
 s=f'<figure class="concept-figure"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 {h}" role="img" aria-labelledby="{i}-title {i}-desc"><title id="{i}-title">{esc(title)}</title><desc id="{i}-desc">{esc(caption)}</desc>'
 for k,(label,note) in enumerate(items):
  y=15+90*k
  s+=f'<rect x="20" y="{y}" width="780" height="65" rx="10" class="svg-node"/><text x="40" y="{y+25}" class="svg-text">{esc(label)}</text><text x="40" y="{y+49}" class="svg-note">{esc(note)}</text>'
  if k<len(items)-1:s+=f'<path d="M410 {y+65} v20 m-5 -6 l5 6 l5 -6" class="svg-link"/>'
 return s+'</svg><figcaption>'+esc(caption)+'</figcaption></figure>'
FILES={g:'cdc-'+g for g in ['status','measurement','control','setting','description']}
TITLES={'status':'状态信息 CDC：SPS 至 BCR','measurement':'测量信息 CDC：MV、相量、采样与谐波','control':'可控信息 CDC：命令、反馈与 SBO','setting':'定值 CDC：SPG、ING、ASG 与 CURVE','description':'描述信息 CDC：DPL、LPL 与 CSD'}
pages=[]
SUPPLEMENTS={}
SUPPLEMENTS['cdc-common-types']=[
sec('quality-matrix','品质细化标志与有效性的组合',p('6.2.3 的关系表限定单项原因通常对应的有效性；多种原因同时发生还需综合处理。以下“✓”表示原表标出的关联，不是允许忽略其他故障。')+table(['detailQual','invalid','questionable','适用对象 / 补充'],[('overflow','✓','—','测量；超出所用类型可表示范围'),('outOfRange','✓','✓','测量；超出预设范围，服务器按情况判断'),('badReference','✓','✓','测量/计数；基准异常'),('oscillatory','✓','✓','状态输入；短时隐匿可疑，持续抖动无效'),('failure','✓','—','检测出的内部/外部故障'),('oldData','—','✓','未在规定时限更新'),('inconsistent','—','✓','来源存在不一致'),('inaccurate','—','✓','精度不足')])+p('原文 6.2.3 关系表没有表号；不能称为模拟值类型的“表 2”。表 2 实际是 AnalogueValue。振荡判定窗口 t_osc、允许隐匿次数、allowed-age 时限是实现/应用参数，不能从 q 本身读出阈值。')),
sec('substitution-cases','取代、闭锁与断链的四种组合',table(['信息链情形（对照原图 3）','上层观察','解释'],[('A：过程输入闭锁，未取代','questionable / oldData','保留输入可能过时；操作员闭锁还应标 operatorBlocked'),('B：过程侧已启用取代','substituted','替代值及其品质向上传递，不等于输入恢复'),('C：过程侧取代后，中间链路断开','substituted + questionable / oldData','保留的取代值也可能过时'),('D：链路断开，中间服务器再做取代','中间层提供 substituted 及本层取代品质','本层替代值可用与下层恢复是两件事')])+p('source、validity、test 与 operatorBlocked 表达不同维度。test 与真假值独立；闭锁通信更新和闭锁物理输入都可能造成 oldData，但 operatorBlocked 专门说明操作员闭锁。')),
sec('primitive-values','基本值域与结构数组',table(['表示','基本域 / 结构','怎样读取'],[('BOOLEAN','FALSE / TRUE','业务真值含义看 DO'),('INT8 / INT8U','−128…127 / 0…255','ValWithTrans.posVal 和 ISC 命令另限 −64…63'),('INT16U','0…65535','numHar/numCyc 要 >0；numPts 要 >1'),('INT32 / INT32U','−2³¹…2³¹−1 / 0…2³²−1','具体配置项还有应用限制'),('INT128','−2¹²⁷…2¹²⁷−1','所给早期 BCR 表列类型；工程声明另核对'),('FLOAT32','32 位浮点；不能逐一列举','允许范围、单位、步长由应用定义，不把精度当步长'),('VISIBLE STRINGn / UNICODE STRINGn','最长 n 的可见/Unicode 文本','XML 编码 UTF-8 与 DA 的标准类型不同层次'),('OCTET STRINGn','最多 n 字节的字节串','不自动当 ASCII 字符串解释'),('ARRAY[0…numHar]','含下标 0，共 numHar+1 项','零项为 DC 分量，不漏算一个'),('ARRAY[1…numPts]','共 numPts 个 Point','xVal/yVal 均 FLOAT32，轴单位另给')])+p('TimeStamp 是 7-2 的公共类型，包含 UTC 时间与时间品质，参见 '+link('acsi-common-types','TimeStamp、TimeQuality 与 ObjectReference')+'。其时间准确度不等于模拟数值精度。'))]
SUPPLEMENTS['cdc-measurement']=[
sec('deadband-example','死区、零死区与范围的数例',p('以 min=0、max=100 A、db=1000 为原创示例：简单差值死区=100×1000/100000=1 A。原表还允许积分等具有可比较效果的算法；本站数例只解释差值算法，不声称所有服务器按该算法更新。')+table(['instMag','上次 mag','差值','简单算法结果'],[('10 A','10 A','0','保持 10 A'),('10.6 A','10 A','0.6 A','未超过 1 A，保持 10 A'),('11.2 A','10 A','1.2 A','超过阈值，更新到 11.2 A')])+p('积分死区配置具有 %·s 的时间量纲，不能直接当成相同的瞬时幅值差。zeroDb 若为 100，同一量程下零点阈值为 0.1 A，零点附近值按钳制规则归零；它不替代品质故障判断。CMV 的模/角死区分别处理，不能用电流单位比较角差。')+diagram('deadband-concept','即时值与死区值',[('instMag 持续反映计算得到的即时幅值','不是每个小变化都触发 mag 的改变'),('算法用 db 与已发布值判断是否更新','阈值跨越时 mag 更新，积分算法另有时间累积'),('mag 变化 → dchg 条件','是否报告还取决于数据集、报告控制块和 TrgOps'),('range 跨区与 q 变化分别观察','range/dchg 和 q/qchg 不与幅值事件混为一个原因')],'原创差值示例；不是设备统一算法。')+table(['区间','典型阈值关系','解释'],[('high-high','高于 hhLim','高高区'),('high','hLim 与 hhLim 之间','高区'),('normal','lLim 与 hLim 之间','正常区'),('low','llLim 与 lLim 之间','低区'),('low-low','低于 llLim','低低区'),('超出 min/max','低于 min 或高于 max','按原类型说明置 outOfRange/questionable，不是第六个 range 基线枚举')])+p('合理阈值通常有 min ≤ llLim ≤ lLim ≤ hLim ≤ hhLim ≤ max；边界等号归属、回差与更新策略需核对采用的定义/设备。')),
sec('harmonic-index','谱数组的窗口与原表公式',p('单周期条件下 har[0] 为直流，har[1] 为基波；numCyc>1 时原表说明谐波项序号涉及 n×2^(numCyc−1)，其余为分谐波及其倍数。evalTm 不等于工频周期时解释为谐间波估计窗口。不要把这段专用索引规则泛化为所有 FFT 的定义。')+p('原表 49 的最高范围表达式记为 '+code('numHar_max = (1/2) × smpRate × frequency × evalTm × 2^(numCycl−1) + 1')+'。原文 evalTm 用 ms、smpRate 交流用每周期样本数，同时出现 numCyc/numCycl 拼写；量纲和数组末项计数需要适用版次澄清，本式只用于追溯，不用于生成工程值。')+table(['参数 / 域','功能','教学理解'],[('frequency','基频 Hz','50 Hz 对应工频周期 20 ms'),('numCyc','谱计算的工频周期数','窗口周期与数组索引规则共同影响分谐波表示'),('evalTm','估计窗口 ms','100 ms=0.1 s；先转换单位再讨论频率分辨率'),('smpRate','采样密度','采样上限约束可分析的频率范围'),('numHar','谱数组最高索引','数组 0…numHar 包含 DC，共 numHar+1 项'),('hvRef / rmsCyc','绝对模或归一化参考','fundamental 相对基波；rms 相对有效值并要求 rmsCyc；absolute 绝对量')]))]
SUPPLEMENTS['cdc-status']=[sec('freeze-example','BCR 冻结、复零与读取示例',table(['时刻 / 设置','actVal','frVal / frTm','理解'],[('strTm 前；frEna=TRUE','随计数增加','上次快照','尚未进入本次冻结时刻'),('strTm=12:00:00；frPd=60000 ms','冻结前 120','复制 120；frTm=12:00:00','周期起点冻结'),('frRs=FALSE，12:00:30','例如 150','仍 120 / 12:00:00','当前累计增长，快照保持'),('12:01:00 再冻结','例如 180','180 / 12:01:00','即使与旧快照值相同也可有 dupd'),('若 frRs=TRUE','冻结后复为 0 再累计','保留冻结前值','快照保存上一窗口，当前计数重新开始'),('frPd=0','按一次冻结设置','只在 strTm 做一次快照','读取 frVal 不触发新冻结')])+p('本表数值与时刻均为原创教学例。strTm 已过而周期冻结启用时，按起点的周期网格确定后续时刻；冻结使能、周期、复零、快照时标和读取分别是不同概念。pulsQty 与 units/multiplier 一起决定计数的工程量。'))]
def page(f,t,sections,source,group='数据模型'):
 sections=sections+SUPPLEMENTS.get(f,[])
 start=sec('reading','阅读位置与版本',p('上级：'+link('standard-library-overview','标准文库')+' → '+link('standard-part-7-3','第 7-3 部分：公用数据类')+'。')+p('基线：DL/T 860.73—2004 / IEC 61850-7-3:2003。本文为原创中文知识解读，覆盖这份文件，类型、值域、存在条件与服务按该版区分；后续勘误和参考 SCD 2007 B4 另标。表格汇总不替代标准原文、设备手册或可投产工程。')+p('前置：'+link('ied-data-model','IED、LN、DO、DA')+' · '+link('standard-part-7-2','ACSI 服务')+'。'))
 end=sec('sources','来源与继续阅读',p('原文定位：'+source+'。PDF 页按文件顺序从 1 起；印刷正文页=PDF 页−4。原文件共 57 页，原路径：'+code('D:/IEC61850资料/IEC61850标准[中文.完整版]/860[1].7-3.pdf')+'；本站内容离线独立可读。')+p('继续阅读：'+link('standard-part-7-3','第 7-3 部分总览')+' · '+link('cdc-common-types','公用属性类型')+' · '+link('cdc-attribute-dictionary','表 49 属性字典')+' · '+link('cdc-scd-evidence','SCD 类型证据')+'。'))
 nav='<nav class="chapter-nav" aria-label="章节导航"><a href="../index.html">首页</a> · '+link('standard-part-7-3','第 7-3 部分')+'</nav>'
 content='<!doctype html>\n<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(t)+'｜IEC 61850 离线知识库</title><link rel="stylesheet" href="../assets/style.css"></head><body><header class="top"><div class="chapter">'+nav+'<p class="section-kicker">'+group+' · 第 7-3 部分专题</p><h1>'+esc(t)+'</h1><p>先理解信息用途，再沿类型结构读取值、品质、配置和定义来源。</p></div></header><main class="chapter">'+start+'\n'+'\n'.join(sections)+end+'</main><footer class="footer">IEC 61850 离线知识库 · 原版、修订和工程观测分别说明</footer><script src="../assets/navigation.js"></script></body></html>\n'
 (OUT/'chapters'/f'{f}.html').write_text(content,encoding='utf-8');pages.append((f,t,group))

abbr=[('CDC','Common Data Class','公用数据类','共同的属性结构、类型、FC、触发与存在条件。'),('FC','Functional Constraint','功能约束','按状态、测量、命令、取代、配置、定值等用途组织访问。'),('TrgOp','Trigger Option','触发选项','属性能产生的事件类别，不等于控制块已经使能。'),('dchg','Data Change','数据变化','值按 CDC 规则改变；测量要考虑死区。'),('qchg','Quality Change','品质变化','品质变化，即使数值相同也可产生事件。'),('dupd','Data Update','数据更新','更新一次即可产生事件，值不必变化。'),('SBO','Select Before Operate','操作前选择','选择并保留对象，再提交操作。'),('SP','Setpoint','设点 / 无组定值','早期 APC 为设点，SPG/ING/ASG 为无定值组参数；必须结合 CDC。'),('ST','Status information','状态信息','例如 stVal/q/t 的状态视图。'),('MX','Measurements','测量信息','例如 mag/cVal 的测量视图。'),('CO','Control','控制','控制命令用途；通过控制服务而非普通写状态。'),('SV','Substitution','取代','FC=SV 指取代；协议语境 SV 指 Sampled Values，两个含义不同。'),('CF','Configuration','配置','死区、单位、控制模式等配置。'),('DC','Description','描述','文字、铭牌等描述属性。'),('SG','Setting Group','定值组','激活定值视图。'),('SE','Setting Group Editable','可编辑定值组','被选择编辑组的定值视图。'),('EX','Extended Definition','扩展定义','指向外部定义命名空间。'),('RMS','Root Mean Square','均方根 / 有效值','平方、平均、再开方；谐波比例可选 rms 引用。'),('SI','International System of Units','国际单位制','单位与倍率统一表示工程量，名称缩写来自法语 Système international。'),('DA','Data Attribute','数据属性','DO 的组成，能继续含结构分量。'),('BDA','Basic Data Attribute','基础数据属性','SCL DAType 内的分量，可进一步嵌套结构。'),('SDO','Sub Data Object','子数据对象','复合 CDC 中的子 DO，例如 WYE.phsA。')]
coverage=[('引言、1～4','职责、引用与缩略语','standard-part-7-3','scope'),('5','20 个存在条件代码','standard-part-7-3','conditions'),('6.1～6.13 / 表 1～11','品质、模拟值、范围、位置、脉冲、原发者、单位、向量、点、控制模式','cdc-common-types','quality'),('7.1～7.2 / 表 12','CDC 与命名空间','standard-part-7-3','namespace'),('7.3 / 表 13～20','基本状态模板与 7 类状态 CDC','cdc-status','template'),('7.4 / 表 21～30','测量模板与 9 类测量 CDC','cdc-measurement','template'),('7.5～7.6 / 表 31～38','可控状态、模拟模板与 6 类可控 CDC','cdc-control','template'),('7.7～7.8 / 表 39～44','状态、模拟定值模板与 4 类定值 CDC','cdc-setting','template'),('7.9 / 表 45～48','描述模板与 3 类描述 CDC','cdc-description','template'),('8 / 表 49','全部属性名、上下文及嵌套关系','cdc-attribute-dictionary','dictionary'),('附录 A / A.1～A.5','58 项单位表行与 20 个倍率前缀','cdc-units-fc','units'),('附录 B / B.1','18 个 FC 表项（含 XX 通配）','cdc-units-fc','fc')]
namespace=table(['属性','位置 / 类型 / FC','作用','何时显式声明'],[
('ldNs','LLN0.NamPlt（LPL）；VISIBLE STRING255 / DC','LD 默认定义来源','只在 LLN0；LD 定义超出默认标准时声明'),('lnNs','LN.NamPlt（LPL）；VISIBLE STRING255 / DC','LN 类及数据定义来源','不同于上级 ldNs'),('dataNs','数据对象；VISIBLE STRING255 / EX','DO 语义定义来源','不同于上级 LD/LN 定义'),('cdcNs','数据对象；VISIBLE STRING255 / EX','CDC 属性结构定义来源','结构不同于继承定义'),('cdcName','与 cdcNs 同组；VISIBLE STRING255 / EX','该命名空间内的 CDC 名称','按 AC_DLNDA_M 和 cdcNs 一起使用')])
page('standard-part-7-3','第 7-3 部分：公用数据类 CDC',[
sec('scope','1. 从信息内容进入属性结构',p('IEC 61850 把设备功能表示为逻辑节点 LN（Logical Node），把该功能中的信息表示为数据对象 DO（Data Object）。例如“开关位置”是一个信息对象；它需要同时表达位置值、值是否可信、何时变化、能否受控以及相关配置。CDC 就是为这类对象规定共同的结构。它不是设备型号，也不是通信报文。')+table(['标准部分','职责','怎样接到本章'],[('7-1','建模原理','理解类/实例/包含/引用'),('7-2','ACSI 对象与服务','定义读写、报告、控制、定值组行为'),('7-3','CDC 与属性类型','本章给共同结构与属性语义'),('7-4','LN/DO 的功能语义','说明 Pos、Str、A 等对象是什么意思并选择 CDC'),('6','SCL 配置','通过 LNodeType/DOType/DAType/EnumType 表达模型'),('8-1、9-x','具体服务映射 SCSM','决定协议结构、线上编码与传输')])+p('范围还可用于站间、站到控制中心、分布式发电及计量信息交换；是否适用某对象需看其建模定义。本文只提供静态知识。')),
sec('hierarchy','2. 一条类型链怎样读',diagram('cdc-chain','从 DO 到叶子值',[('LN 的 DO：A，CDC=WYE','7-4 给三相电流语义；7-3 给 WYE 结构'),('SDO：phsA，CDC=CMV','这是一个子数据对象，不是一个 FLOAT32'),('DA：cVal，类型 Vector','相量包含模 mag 和可选幅角 ang'),('BDA：mag，类型 AnalogueValue','整数 i 和/或浮点 f 至少有一个'),('叶子：f，类型 FLOAT32','把值与单位、倍率、品质、时间一起读')],'包含层级与类型引用并读；数字本身不能说明测量对象。')+p('“模板”说明一类 CDC 的组成分区及继承服务；具体 CDC 再给字段。SCL 的类型模板是配置表示，两者都叫模板但作用不同。')),
sec('classes','3. 本版 29 种 CDC 导航',table(['CDC','英文名称','中文 / 用途','详表'],[(code(c['code']),esc(c['en']),esc(c['zh']+'：'+c['meaning']),link(FILES[c['group']],'属性、值域与条件',c['code'].lower())) for c in CDC])),
sec('conditions','4. M、O、条件代码怎样使用',p('M/O/C 列回答“这个属性是否必须出现”，不是值是否为 0，也不是客户端的访问权限。C 表示 Conditional（条件性），具体条件用下列代码表达。条件代码没有统一的标准英文全拼，本站解释其规则，不编造缩写展开。')+table(['代码','英文 / 角色','规则与用法'],[(code(a),esc(b),esc(c)) for a,b,c in CONDITIONS])+p('例如 ACD.phsA 与 dirPhsA 标为 GC_2(1)，二者同时有或同时没有；WYE.phsA/B/C/neut/net/res 标为 GC_1，不要求六者全有；SPS 支持取代时，subEna/subVal/subQ/subID 均须存在。属性缺省值、属性不存在、值为 FALSE 是三件不同的事。')),
sec('namespace','5. 命名空间与扩展边界',p('Namespace（命名空间）回答“这个名称与结构由哪份定义解释”。上层提供默认，下层只有定义来源不同才需要显式声明。它使扩展可追溯，不能靠名字猜扩展含义。这里的 ldNs/lnNs/dataNs/cdcNs 是信息模型中的定义来源，XML 根元素 xmlns 则表示 XML 语法命名空间。')+namespace+diagram('ns-chain','定义来源逐层细化',[('LD / LLN0.NamPlt.ldNs','逻辑设备的默认定义来源'),('LN / NamPlt.lnNs','有差异才覆盖 LD 默认'),('DO / dataNs','有差异才声明数据语义来源'),('CDC / cdcNs + cdcName','有差异才声明属性结构来源')],'作用域逐层下降；数据语义来源与 CDC 结构来源分别声明。')+p('原创示意：LN 使用标准定义，新增厂家 DO 的语义可通过 dataNs 指向扩展定义；若该 DO 仍使用未改变的 SPS，不能仅因为 DO 是扩展就断言 SPS 结构也扩展。若新增 DA 或改变标准 DA 定义，则还要核对 CDC 扩展声明。命名空间字符串应由定义者发布，本文不编造标准命名空间标识。')),
sec('abbreviations','6. 缩略语和属性名的阅读规则',table(['标识','英文','中文','功能与用法'],[(code(a),esc(b),esc(c),esc(d)) for a,b,c,d in abbr])+p('属性名通常由语义片段组成：st=state/status，ctl=control，set=setting/setpoint，sub=substitution，inst=instantaneous，mag=magnitude，ang=angle，phs=phase，Har=harmonic，Ns=namespace，Rev=revision。它们是助记解释，不保证每个名称都是正式英文缩略语。'+link('cdc-attribute-dictionary','setMag 等全部字段字典')+' 可按属性路径进一步查。')),
sec('coverage','7. 覆盖范围与阅读路径',table(['原文','本页/专题覆盖','入口'],[(a,b,link(c,'打开',d)) for a,b,c,d in coverage])+p('先读公用属性类型，再按信息用途选择 CDC。表 49 为反向查询入口，最后用参考 SCD 验证实际类型链。所有 29 类均解释表列属性，有限枚举尽量列全；范围由具体对象决定的整数/浮点值不伪造业务枚举。'))], '引言、正文第 1～8 章、表 1～49、附录 A/B', '标准文库')

quality=[('validity','CODED ENUM','good / invalid / reserved / questionable','总有效性；invalid 不宜使用，questionable 由客户按应用判断'),('detailQual','PACKED LIST','下列 8 个 BOOLEAN 标志','说明无效/可疑的原因'),('detailQual.overflow','BOOLEAN','FALSE / TRUE','超过所选数值类型表示能力'),('detailQual.outOfRange','BOOLEAN','FALSE / TRUE','超过预设过程范围，数值可能仍能表示'),('detailQual.badReference','BOOLEAN','FALSE / TRUE','基准源无法校准/不可靠'),('detailQual.oscillatory','BOOLEAN','FALSE / TRUE','状态输入过于频繁变化/抖动'),('detailQual.failure','BOOLEAN','FALSE / TRUE','检测出内外故障'),('detailQual.oldData','BOOLEAN','FALSE / TRUE','更新超龄；保留值可能已过时'),('detailQual.inconsistent','BOOLEAN','FALSE / TRUE','检测出不一致'),('detailQual.inaccurate','BOOLEAN','FALSE / TRUE','未达到来源声明精度'),('source','CODED ENUM','process / substituted；默认 process','来源为过程或取代'),('test','BOOLEAN','FALSE / TRUE；默认 FALSE','数据处于测试用途'),('operatorBlocked','BOOLEAN','FALSE / TRUE；默认 FALSE','操作员闭锁更新，应同时置 oldData')]
ctls=[('0','status-only','只提供状态','无 Select/Operate','用于建模为可控类但本实例仅反馈'),('1','direct-with-normal-security','直接控制，一般安全','Operate → 服务结果','应用接受普通命令应答，不要求增强终结通知'),('2','sbo-with-normal-security','操作前选择，一般安全','Select → Operate → 服务结果','需要对象保留且普通应答足够'),('3','direct-with-enhanced-security','直接控制，增强安全','Operate → 服务结果 → CommandTermination','需要命令执行结束通知与状态监督'),('4','sbo-with-enhanced-security','操作前选择，增强安全','SelectWithValue → Operate → 服务结果 → CommandTermination','需要先保留对象/值并监督执行结束')]
page('cdc-common-types','公用数据属性类型：品质、数值与控制模式',[
sec('quality','1. Quality 品质的全部字段',p('数值说明“是什么”，q 说明“这个值现在能信到什么程度”。Quality 是 PACKED LIST，语义上包含有效性、细化品质、来源、测试与闭锁。此版表 1 各分量标为 M；未支持的功能按规定默认处理，实际报文编码由映射决定，不能把表内行数当字节数。')+table(['属性路径','类型','全部值域 / 默认','意义'],[(code(a),b,esc(c),esc(d)) for a,b,c,d in quality])+p('有效性通常用 2 位，8 个细化标志加 source/test/operatorBlocked 得到本版常见 13 位语义；bit 顺序与打包以所用 SCSM 为准。reserved 是保留编码，不是第四种可用有效性。Quality 与 TimeStamp 内的时间品质 TimeQuality 作用不同。')+table(['场景','品质组合','怎样理解'],[('数值超过类型能力','invalid + overflow','不能仅截断后当真实值'),('超出配置量程但数值仍可表示','questionable + outOfRange','与正常区间告警区别'),('操作员冻结输入刷新','operatorBlocked + oldData','保留的是闭锁前值'),('合法取代值','source=substituted，可同时 validity=good','好品质不证明物理采集恢复'),('测试数据','test=TRUE','客户处理按测试策略，与原值真假无关'),('多级网关断链','下层 q 及上层 oldData/有效性共同考虑','上层看到的品质可受链路影响，不只来自传感器')])+diagram('quality-source','品质与多级来源',[('过程输入 → 下层服务器','采集异常可能产生 failure / outOfRange / invalid'),('网关作为客户读取下层值','链路故障可造成 oldData；接收的 q 不能被随意抹去'),('网关作为服务器向上提供值','取代后应反映 substituted 及取代值品质'),('上层客户决策','分别检查 validity、source、test、operatorBlocked')],'品质随信息链传递；多级取代/闭锁的优先规则需要应用定义。')+p('细化标志并非任意独立组合：检测到相关异常应结合 validity 标记 invalid/questionable；6.2.3 节的未编号关系表进一步给出适用组合，不能从单一比特推导完整处理策略。')),
sec('analogue','2. AnalogueValue 与 ScaledValueConfig',table(['类型 / 字段','基本类型','域 / 条件','解释'],[('AnalogueValue.i','INT32','−2^31…2^31−1；GC_1','整数表示'),('AnalogueValue.f','FLOAT32','浮点；GC_1','工程量的浮点表示'),('ScaledValueConfig.scaleFactor','FLOAT32','M，非零','比例系数'),('ScaledValueConfig.offset','FLOAT32','M，非零偏移不是强制；本版要求定义值','偏移量')])+p('i/f 至少有一个；两者都有时应保持一致。关系为 '+code('f = i × scaleFactor + offset')+'。例如 i=1234、scaleFactor=0.1、offset=−5，则 f=118.4（所声明工程单位）。这与 units.multiplier 的十进制单位倍率是两层信息，不能重复乘倍率或跳过偏移。该数例为原创演算。')+p('只有 f 时不要求换算配置；只有 i 时配置可离线交换；i/f 都有时按 AC_SCAV 必须提供。FLOAT32 的表示范围/精度不是传感器精度，也不能列成所有可能的实际测量值。')),
sec('range','3. RangeConfig、死区与零点钳制',table(['字段','类型 / 条件','用途'],[(n,'AnalogueValue / M',d) for n,d in [('hhLim','高高限'),('hLim','高限'),('lLim','低限'),('llLim','低低限'),('min','最小过程量'),('max','最大过程量')]])+table(['区间（由低到高）','range','品质含义'],[('低于 min','low-low','questionable + outOfRange'),('min 到 llLim','low-low','在过程允许域内，品质可为 good'),('llLim 到 lLim','low','品质可为 good'),('lLim 到 hLim','normal','品质可为 good'),('hLim 到 hhLim','high','品质可为 good'),('hhLim 到 max','high-high','品质可为 good'),('高于 max','high-high','questionable + outOfRange')])+p('阈值上的相等处理、回差及跨区事件过滤要查实现；上表表示区间关系，不替设备规定边界比较符。过程 min/max 与控制 minVal/maxVal 是不同字段。')+p('db 决定何时更新 mag/cVal，zeroDb 决定零附近何时强制为 0。两者的 0…100000 对应 0…100%，每计数单位 0.001%。例如量程 0…200 A，db=500 表示 0.5%，简单差值算法阈值为 1 A；99.9→100.2 A 未越死区，不证明测量没刷新。积分死区另有时间量纲和当地算法。')+diagram('deadband','测量与事件生成',[('instMag 随采集/计算更新','这是连续更新来源，未必逐次报告'),('死区 db：决定是否更新 mag','简单例：量程 200 A、db=500 → 阈值 1 A'),('零点阈值 zeroDb 与范围 range','零附近钳制、跨区变化是另外的规则'),('DA 事件 → 控制块 TrgOps → Report/Log','dchg/qchg/dupd 仅描述可用触发；还须配置订阅和使能')],'采样刷新、死区更新、报告发送不能互相替代。')),
sec('position-pulse','4. 位置、脉冲和点类型',table(['类型.属性','基本类型','值域 / 条件','用途'],[('ValWithTrans.posVal','INT8','−64…63；M','步/档位置'),('ValWithTrans.transInd','BOOLEAN','FALSE / TRUE；O','是否在过渡中'),('PulseConfig.cmdQual','ENUMERATED','pulse / persistent；M','脉冲/持续输出'),('PulseConfig.onDur','INT32U','ms；0 当地定义；M','脉冲宽度'),('PulseConfig.offDur','INT32U','ms；0 当地定义；M','脉冲间隔'),('PulseConfig.numPls','INT32U','次数；0 当地定义；M','脉冲数'),('Point.xVal','FLOAT32','M','曲线点横坐标'),('Point.yVal','FLOAT32','M','曲线点纵坐标')])+p('原创脉冲例：onDur=100 ms，offDur=200 ms，numPls=3，生成三次 100 ms 输出，中间各间隔 200 ms。persistent 由当地控制逻辑决定停止，不能据此断言输出永久保持。位置例 posVal=5、transInd=TRUE 表示有位置编号且正在过渡；不能当稳定第 5 档。')),
sec('origin','5. Originator 原发者',table(['字段','类型 / 条件','含义'],[('orCat','ENUMERATED / M','原发者类别'),('orIdent','OCTET STRING64 / M','实现/映射可识别的地址；NULL 保留为未知/未报告')])+table(['常用序号（须核对 EnumType）','orCat','来源'],[(str(i),a,b) for i,(a,b) in enumerate([('not-supported','不支持类别'),('bay-control','间隔层人工客户'),('station-control','站控层人工客户'),('remote-control','站外远方人工客户'),('automatic-bay','间隔层自动功能'),('automatic-station','站控层自动功能'),('automatic-remote','站外自动功能'),('maintenance','维护/服务工具'),('process','无控制请求的过程变位，例如外部跳闸')])])+p('origin 用于解释变位/命令来源。orIdent 的字节并非固定 IED 名或固定 IP 字符串，不应凭格式猜操作者身份。')),
sec('vector-unit','6. Unit 与 Vector：mag 和 ang',table(['类型.属性','类型','域 / 条件','功能'],[('Unit.SIUnit','ENUMERATED','附录 A；M','单位种类'),('Unit.multiplier','ENUMERATED','十进制指数；O，默认 0','0→10^0=1，3→10^3，−3→10^−3'),('Vector.mag','AnalogueValue','M','复数值的模'),('Vector.ang','AnalogueValue','O，单位为度','复数值的幅角；基准由使用场合确定')])+p('例如 phsA.cVal.mag.f=10，units.SIUnit=A，multiplier=3，则为 10 kA；若 ang.f=−30，则表示相对 angRef 的 −30°。只有模时不能凭空补相角。CMV.angRef 的 V/A/other 与复合 WYE/DEL 的具体相参考不同；'+link('cdc-units-fc','附录 A 单位全表')+' 和 '+link('cdc-measurement','测量类')+' 分别说明。')),
sec('control-models','7. CtlModels 的五种控制模式',p('命名由两条轴组成：direct/sbo 表示直接操作或先选择；normal/enhanced-security 表示控制执行监督等级。SBO=Select Before Operate（操作前选择）。这里 security 主要是操作过程的可靠性/监督机制，不能当作加密或身份认证能力。')+table(['常用编码','枚举文本','含义 / 功能','流程','使用条件示例'],ctls)+p('增强模式区分命令受理与执行结束，通过 CommandTermination 等机制监督结果；命令成功受理不等于一次开关已到位。SelectWithValue 在增强 SBO 中将预选与请求值关联；它不是随便读一下对象。本文说明场景选择因素，不替项目选定控制模式。')+p('原文第 6.12 节出现 enhenced 拼写，第 8 章与实际枚举常用 enhanced；索引保留错误拼写作为搜索别名，正文用 enhanced。')),
sec('sbo-class','8. SboClasses：操作一次或多次',table(['枚举','含义 / 功能','使用场景','释放条件'],[('operate-once','完成相应操作流程后回到未选择状态','一次开/合等独立请求','再次操作前重新选择'),('operate-many','操作后在选择超时前保持准备状态','同一客户连续调节等，需要实现支持','取消、超时或其他规定释放条件')])+diagram('sbo-flow','选择和操作的关系',[('Select / SelectWithValue 成功','服务器为客户保留控制对象，受 sboTimeout 限制'),('Operate 请求','校验客户、选择、请求值与允许的检查条件'),('命令响应 / 增强模式执行终结','受理结果与动作完成结果分别观察'),('operate-once 释放；operate-many 维持至超时等条件','保留选择不代表无限有效，也不免除每次操作校验')],'概念流程；增强/普通模式和故障路径详见 ACSI。')+p('sboTimeout 是时间参数，sboClass 是操作后状态规则，stSeld 是当前选择状态。三者不能互相代替。'+link('acsi-runtime-models','控制服务详解','control')+'。'))], '第 6 章，表 1～11；第 8 章品质、死区及控制属性解释')

def service_table(g):
 read='ALL（CO 除外）' if g=='control' else 'ALL'
 wr={'status':'DC、CF、SV','measurement':'DC、CF、SV','control':'DC、CF、SV；表 31 还印 AX','setting':'DC、CF；表 42 另列 SP','description':'DC'}[g]
 dswr='DC、CF' if g=='setting' else wr
 rs=[('GetDataValues',read,'读取允许访问的属性，不能据服务表断言全部设备支持'),('GetDataDefinition','ALL','发现类型定义'),('SetDataValues',wr,'写配置、描述或取代/定值；不直接写 ST/MX'),('GetDataSetValues',read,'按数据集引用读取成员'),('SetDataSetValues',dswr,'成员须允许写；数据集本身不赋予写权限'),('Report','由报告数据集限定','继承报告服务；还需控制块、触发及订阅条件')]
 if g=='control':rs += [('Select / SelectWithValue','CO','一般 SBO / 增强 SBO 的选择'),('Cancel','CO','取消选择或允许取消的操作'),('Operate','CO；表 37 的旧 APC 为 SP','提交控制请求'),('CommandTermination','CO','增强安全执行终结通知'),('Synchrocheck','CO，控制检查语义','同期检查；实际操作参数与服务流程查 7-2'),('TimeActivatedOperate','CO；表 37 的旧 APC 为 SP','预约绝对时刻操作')]
 if g=='setting':rs += [('SetEditSGValues（表 39 单数写法）','SE','写被选编辑组的值'),('GetSGValues（表 39 单数写法）','SG、SE','读取激活或编辑组视图')]
 return table(['继承服务 / 行为','模板 FC 范围','功能与使用边界'],rs)+p('ALL 是服务表的范围记法，不是 DA 的 fc="ALL"。报告列不表示任一 FC 都能在任一映射中发布。表 31 的 AX 未在本版附录 B 中定义，也不在本章 CDC 属性行中使用；保留原版差异，不把 AX 加入 SCD 作为已确认的 FC。')
def cdc_section(c):
 rs=[]
 for row in c['fields']:
  n,ty,fc,tr,dom,cond,meaning=row
  norm={'angleSVC':'angSVC','operTim':'operTm','numCycl':'numCyc'}.get(n,n)
  name=link('cdc-attribute-dictionary',n,'da-'+norm) if norm in DICTIONARY else code(n)
  rs.append([name,esc(ty),esc(fc),esc(tr),esc(dom),esc(cond),esc(meaning)])
 return sec(c['code'].lower(),c['code']+' · '+c['zh'],p(c['en']+'。'+c['meaning'])+p('原文表 '+str(c['table'])+'；PDF '+c['pdf']+' 页。数据名继承 DATA 类；下表列本 CDC 的表列属性/子对象。')+table(['属性 / 子 DO','类型','FC','TrgOp','值域 / 单位','M/O/C','意义'],rs)+p(c['notes'])+p('实际工程例：'+link('cdc-scd-evidence','查 '+c['code']+' 的模板与实例','example-'+c['code'].lower())+'；参考文件没有该类时明确标记，使用原创数例理解。'))

groupintro={
'status':('基本状态信息模板 · 表 13','值/状态 → 取代 → 配置、描述、扩展；状态提供观察结果，取代提供明确的替代来源。','状态不一定是设备开/关：保护激活是事件标志，整数状态是编码容器，安全计数是次数，BCR 是计量累计。保护用于检测异常并触发相应动作；启动与动作的区分由 LN/DO 决定。'),
'measurement':('基本测量值信息模板 · 表 21','测量值 → 取代 → 配置、描述、扩展；简单幅值、相量、三相集合、序分量和谱值分别选 CDC。','电流表示电荷流动强弱（A），电压表示电位差（V）。交流值随时间周期变化，幅值/有效值、相角和波形采样是不同信息。三相 A/B/C 相位相关；相对地与相间量的参考点不同。相量是周期信号的幅度与相位表示，不能把其模当每时刻瞬时值。'),
'control':('基本可控状态模板 · 表 31 / 可控模拟模板 · 表 37','控制与反馈 → 可选取代 → 配置、描述、扩展；可控模拟旧模板是设点与测量值 → 配置、描述、扩展。','控制是请求设备采取动作，状态是观察结果。二进制升/降步位控制发方向命令，整数步位控制发目标位置。APC 的早期设点服务与后续修订需要单独对照。'),
'setting':('基本状态定值模板 · 表 39 / 基本模拟定值模板 · 表 42','定值 → 配置、描述、扩展；状态定值用布尔/整数，模拟定值用 AnalogueValue，曲线用类型与参数。','定值是应用参数，例如阈值或功能选择，通常改变以后影响后续判断。可控对象的命令则请求当前动作。定值组把多个参数成套维护与切换，不能仅改变一个 XML Val 就证明已切换设备运行组。'),
'description':('基本描述信息模板 · 表 45','描述信息 → 配置/扩展；通过数据与数据集读写、报告模型继承访问。','设备铭牌描述物理设备，逻辑节点铭牌描述功能对象，曲线形状描述提供坐标和语义。描述文本解释人类可读信息，但不取代类结构和工程引用。')}
for g in FILES:
 title,structure,concept=groupintro[g]
 sections=[sec('template','1. '+title,p(structure)+p(concept)+service_table(g))]
 if g=='status':
  sections.append(sec('state-values','2. 单点、双点和方向值对照',table(['值','状态反馈含义','控制/方向的区别'],[('FALSE / TRUE','SPS 单点；SPC 状态','是否成立由 DO 定义；不要从名称猜有效电平'),('intermediate-state','DPS/DPC 中间状态','DPC 的命令 ctlVal 仍只有 off/on'),('off','DPS/DPC 断开/关闭状态语义','常用 Dbpos 编码 1'),('on','DPS/DPC 接通/打开状态语义','常用 Dbpos 编码 2'),('bad-state','DPS/DPC 状态异常','不是 q.invalid 的同义词，应并读 q'),('unknown / forward / backward','ACD 分量方向','必须配合该分量激活标志'),('both','ACD 总体方向','分相方向不同的汇总，不在本版分相域中')])+p('二接点反馈的组合含义要查装置定义；不要把接点的 00/11 与线上 Dbpos 编码未经映射就等同。')))
 if g=='measurement':
  sections.append(sec('spectrum','2. 幅值、相量、三相和谱的阅读',diagram('measurement-branches','测量的不同表示',[('SAV.instMag：波形采样','单个采样时刻的模拟量；不经 MV.mag 的死区'),('MV.mag / CMV.cVal：幅值或相量','经过测量计算/死区更新；CMV 含模与可选角'),('WYE / DEL / SEQ：多个 CMV 子对象','三相相对地、相间或序/直交轴分量'),('HMV / HWYE / HDEL：Vector 数组','数组下标与分析窗口/基频决定谱的解释')],'这些 CDC 按信息表现区分；不是一种固定转换流水线。')+table(['概念','原创示例','不能遗漏的条件'],[('平衡三相相量','10∠0°、10∠−120°、10∠120°','幅值同单位、同参考、同一时间'),('相间电压','Uab=Ua−Ub','相量相减，不是两个模直接相减'),('剩余电流','Ia+Ib+Ic','符号/相角一致，不能把三个幅值相加'),('单周期谐波数组','har[0] DC；har[1] 50 Hz；har[2] 100 Hz','基频为 50 Hz 且处于单周期谐波条件'),('谐間波','75 Hz 对 50 Hz 基频不是整数倍','分析窗决定频率间隔，不能叫第 1.5 个数组元素')])+p('有效值 RMS 是周期内平方平均再开方的量。谐波含量用 fundamental/rms/absolute 三种基准，2 A 的五次谐波与“2% 五次谐波”并不相同。原表 49 关于最高谐波索引和 smpRate 的表达存在量纲/命名疑点；可靠基本关系为采样频率限制可分析频率，精确索引算法须查设备与所用版次。')))
 if g=='control':
  sections.append(sec('apc-revision','2. APC 旧版与修订对照',p('本站先展示所给表 38 的 SP/MX 结构，再解释修订。'+ '<a href="https://iec61850.tissue-db.com/tissues/28">IEC TISSUE 28</a>'+' 指出同名 setMag 的双 FC 无法直接按 SCL 建模，并规定命令改为 ctlVal/CO、反馈为 mxVal/MX；也要求相关映射同步修订。')+table(['内容','所给早期表','TISSUE 28 修订方向'],[('命令','setMag / SP','ctlVal / CO'),('反馈','setMag / MX','mxVal / MX'),('原发者与预约时间','SP 相关','命令部分改为 CO'),('命令序列','未列 ctlNum','增加 ctlNum'),('服务','表 37 Operate、TimeActivatedOperate 用 SP','按控制类/映射重新核对')])+p('参考 SCD 没有 APC 类型时，不把 ASG.setMag 当成 APC 例子。修订信息用于解释差异；不能只靠 SCL 根版本证明某设备采用哪一 CDC 版次。')+p(link('cdc-common-types','五种控制模式与 SBO','control-models')+' · '+link('acsi-runtime-models','控制服务行为','control'))))
 if g=='setting':
  sections.append(sec('setting-flow','2. SP、SG、SE 与定值组流程',diagram('setting-chain','从定值结构进入运行组管理',[('无组参数：SP 的 setVal / setMag','通过对象/服务规定修改参数'),('有组参数：选择编辑组 EditSG','SE 指向待编辑视图，SG 是当前激活视图'),('写 SE → 确认编辑 CnfEdit','修改与确认是运行服务步骤，XML 模板只是定义'),('选择激活组 ActSG → 读取验证','确认非激活组不切组；当前组生效按版次核对')],'定值组服务由 7-2 定义，7-3 规定参数值的类型。')+p('原创对照：ASG 阈值 5 A 是保护判断参数；APC 请求一个模拟目标是过程控制命令；MV 显示 5 A 是测量结果。三个数字相同，父 CDC、FC、服务用途却不同。'+link('acsi-runtime-models','定值组详细流程','settings')+'。')))
 sections += [cdc_section(c) for c in CDC if c['group']==g]
 if g=='setting':
  sections.append(sec('curve-values','CURVE.setCharact 的全部代码',table(['代码','曲线特性 / 解释'],[(str(i+1),v) for i,v in enumerate(CURVES)]+[(str(i),'自定义公式曲线 '+str(i-16)+'，参数 A～F 的语义由公式定义') for i in range(17,33)]+[(str(i),'点对定义曲线 '+str(i-32)+'，形状通过 CSD 读取') for i in range(33,49)])+p('反时限表示输入量越高，在相应公式适用域内动作时间通常越短；定时限在触发条件成立后按固定延时。曲线编号不能替代起动阈值、时间系数、参数及单位。表 49 公式示意写 x=f(y,…)，不据此擅自交换 CSD 横纵轴；必须读 xD/yD。')))
 if g=='description':
  sections.append(sec('curve-example','CURVE 与 CSD 怎样配合',diagram('curve-link','公式与形状的关系',[('CURVE：setCharact + setParA…F','选择特性并给出适用参数'),('CSD：xD/xUnit、yD/yUnit','先说明坐标轴是什么量和用什么单位'),('CSD：numPts + crvPts[1…n]','每个 Point 提供 xVal/yVal'),('应用定义：范围、插值、越界与动作逻辑','点对本身不定义完整保护实现')],'两种 CDC 描述同类特性的不同方面；无自动引用关系可凭名字推断。')+table(['原创教学点','xVal（倍数）','yVal（s）'],[('1','1.5','10'),('2','2','5'),('3','4','1')])+p('这组点只示意输入增大而时间减小，未采用任何设备或 IEC/ANSI 的标准公式，不能用于整定。')))
 page(FILES[g],TITLES[g],sections,'第 7.'+{'status':'3','measurement':'4','control':'5～7.6','setting':'7～7.8','description':'9'}[g]+' 节及对应属性表；表 49 语义')

# Reverse dictionary: one row per Table 49 name, preserving contextual semantics.
usage=defaultdict(list)
for c in CDC:
 for r in c['fields']:
  name={'angleSVC':'angSVC','operTim':'operTm'}.get(r[0],r[0]);key=(c['code'],r[1],r[2])
  if key not in usage[name]:usage[name].append(key)
dictionary_rows=[]
for n,meaning in DICTIONARY.items():
 u=usage[n]
 dictionary_rows.append([f'<span id="da-{n}">{code(n)}</span>',esc(meaning),'<br>'.join(link(FILES[next(c['group'] for c in CDC if c['code']==a)],a,a.lower())+'：'+esc(b)+' / '+esc(d) for a,b,d in u) or '表 49 的结构分量/上下文，参见公用类型', '表 49；PDF 44–52（印刷 40–48）'])
relation_rows=[]
for c in CDC:
 if any(r[0]=='q' for r in c['fields']):
  names={'ACT':'general、phsA/B/C、neut','ACD':'general、dirGeneral、phsA/B/C、dirPhsA/B/C、neut、dirNeut','BCR':'q→actVal/frVal；t→actVal；冻结时标 frTm','MV':'q→instMag/mag/range；t→mag/range','CMV':'q→instCVal/cVal/range；t→cVal/range','SAV':'instMag','HMV':'har','HWYE':'全部相/中性线/净值/剩余谱数组','HDEL':'三个相间谱数组','BSC':'valWTr','ISC':'valWTr','APC':'旧版 setMag'}.get(c['code'],'stVal')
  relation_rows.append([link(FILES[c['group']],c['code'],c['code'].lower()),names])
page('cdc-attribute-dictionary','表 49：数据属性完整解读与反向字典',[
sec('dictionary','1. 表 49 的全部属性名',p('表 49 跨 PDF 44～52 页。本表按原文顺序整理 '+str(len(DICTIONARY))+' 个不同属性名；原文跨页续行、同名多语境（如 phsA、neut、operTm）合并到同一入口，分别解释意义。类型与 FC 从对应 CDC 表追溯，不能从属性名唯一推断。原表 angleSVC/angSVC、operTim/operTm、pulseQty/pulsQty 等拼写差异列入说明。')+table(['属性名','中文含义、功能与使用边界','在哪些 CDC / 类型 / FC','来源'],dictionary_rows)),
sec('relations','2. q、t、取代与单位的作用对象',table(['CDC','q/t 关联的值'],relation_rows)+p('SEC 只有 t 关联 cnt，没有 q；WYE/DEL/SEQ 的 q/t 在子 CMV，不要凭空加顶层 q。BCR 冻结快照用 frTm 区别于当前计数的 t。')+table(['取代组','被取代的值','时序 / 关联'],[('subVal','SPS/DPS/INS/SPC/DPC/INC 的 stVal；BSC/ISC 的 valWTr','类型与被取代值相符'),('subMag','MV.instMag','再按测量计算/死区规则看 mag'),('subCVal','CMV.instCVal','实际结构核对 Vector'),('subQ','q','来源 substituted 与有效性分别表示'),('subID','取代标识','未使能/未知时为 NULL'),('subEna','使用哪种来源','先写取代值与品质，再启用 TRUE')])+table(['单位字段','作用范围','补充'],[('units','BCR.actVal/frVal；MV.instMag/mag；CMV 的模；SAV.instMag','乘 pulsQty 或按 sVC 换算是另外步骤'),('units','谐波 Vector 的 mag；APC/ASG.setMag','相对谱值还需看 hvRef'),('Vector.ang','度 °','不套用模的 SIUnit'),('xUnit/yUnit','CSD 的横/纵坐标','须同时看 xD/yD')])+p('原表 t 行使用了品质措辞且 q 表列重复/错位；本站按对应类型表解释 TimeStamp。subVal 子表重复 ISC、缺 INC，单位子表重复 CMV、HDEL 谱字段漏 Har；均注明差异并按上位 CDC 表核对。')),
sec('names','3. 结构分量与 SCL 映射名补充',table(['名称','英文助记 / 作用','父类型 / 位置'],[('i / f','integer / floating point，整数/浮点','AnalogueValue'),('scaleFactor / offset','比例系数 / 偏移','ScaledValueConfig'),('mag / ang','magnitude / angle，模/幅角','Vector'),('hhLim / hLim / lLim / llLim','high-high / high / low / low-low limit','RangeConfig'),('posVal / transInd','position value / transient indication','ValWithTrans'),('cmdQual / onDur / offDur / numPls','command qualifier / 开时长 / 关间隔 / 脉冲数','PulseConfig'),('orCat / orIdent','originator category / identifier','Originator'),('SIUnit / multiplier','单位 / 十进制倍率指数','Unit'),('xVal / yVal','横纵坐标','Point'),('Oper / SBO / SBOw / Cancel','操作 / 一般选择 / 带值选择 / 取消','映射到 SCL 的控制结构；不属于表 49 的原始属性名'),('ctlVal / origin / ctlNum / T / Test / Check','命令结构成员','例如参考 SCD Oper 的 DAType/BDA；T 与 t、Test 与 q.test 不混同')])+p('属性名大小写具有意义。SP 是 FC 设点，不是 SPS，也不是 stVal 的类型；SBO 是选择模型，SBOw 是映射结构名称。'))], '第 8 章完整表 49（PDF 44～52 页）及第 6～7 章类型关联')

unit_groups=[('a1','A.1 基本量和无量纲',[
('无量纲','none','—','不带物理量纲，不等于未指定单位'),('长度','metre','m','米'),('质量','kilogram','kg','千克'),('时间','second','s','秒'),('电流','ampere','A','安培'),('热力学温度','kelvin','K','开尔文'),('物质的量','mole','mol','摩尔'),('发光强度','candela','cd','坎德拉')]),
('a2','A.2 导出量',[
('平面角','degree','deg','度；与 rad 分开'),('平面角','radian','rad','弧度'),('立体角','steradian','sr','球面度'),('吸收剂量','gray','Gy','J/kg'),('放射性活度','becquerel','Bq','1/s'),('摄氏温度','degree Celsius','°C','与 K 的零点不同'),('剂量当量','sievert','Sv','J/kg，含应用语义'),('电容','farad','F','C/V'),('电荷','coulomb','C','A·s'),('电导','siemens','S','A/V'),('电感','henry','H','Wb/A'),('电位差 / 电压','volt','V','W/A'),('电阻','ohm','Ω','V/A'),('能量','joule','J','N·m'),('力','newton','N','kg·m/s²'),('频率','hertz','Hz','1/s'),('照度','lux','lx','lm/m²'),('光通量','lumen','lm','原表符号 Lm，SI 常用小写 lm'),('磁通','weber','Wb','V·s'),('磁通密度','tesla','T','Wb/m²'),('功率','watt','W','J/s'),('压力','pascal','Pa','N/m²')]),
('a3','A.3 组合量',[
('面积','square metre','m²','长度平方'),('体积','cubic metre','m³','长度立方'),('速度','metre per second','m/s','长度/时间'),('加速度','metre per second squared','m/s²','速度变化率'),('体积流量','cubic metre per second','m³/s','体积/时间'),('燃料（热）效率，原表称谓','metre per cubic metre','m/m³','保留原表量纲；不是通用的无量纲效率'),('质量矩，原表 moment of mass','kilogram metre','kg·m','不能误写成转动惯量 kg·m²；原表符号大小写有疑点'),('密度','kilogram per cubic metre','kg/m³','质量/体积'),('运动黏度','square metre per second','m²/s','原表泛称 viscosity；此量纲是运动黏度'),('热导率','watt per metre kelvin','W/(m·K)','单位温度梯度下导热能力'),('热容量','joule per kelvin','J/K','升温所需能量/温差'),('浓度','parts per million','ppm','百万分之一；质量/体积等基准由定义决定'),('旋转频率','reciprocal second','1/s','转数/时间，按量定义'),('角速度','radian per second','rad/s','角度变化率')]),
('a4','A.4 电气系统量',[
('视在功率','volt ampere','VA','电压与电流有效值形成的功率量'),('有功功率','watt','W','平均能量传递速率'),('无功功率','var','var','原表 Var；交流功率分量'),('相角','degree','°','与 Vector.ang 的度一致'),('功率因数','cos phi','cosφ','原表表述；正弦稳态时可用 cosφ，非正弦时总功率因数须另辨'),('伏秒','volt second','V·s','电压的时间积分量纲'),('电压平方','volt squared','V²','平方量'),('安秒','ampere second','A·s','电流的时间积分量纲'),('电流平方','ampere squared','A²','平方量'),('电流平方时间积','ampere squared second','A²·s','原表写 A²t，需按时间单位解释'),('视在电能','volt ampere hour','VA·h','视在功率的时间积分'),('有功电能','watt hour','W·h','1 Wh=3600 J'),('无功电能','var hour','var·h','无功功率的时间积分'),('电压频率比，原表列磁通','volt per hertz','V/Hz','保留原表单位；不可直接当作任意场合磁通 Wb 的数值')])]
prefixes=[(-24,'yocto','y'),(-21,'zepto','z'),(-18,'atto','a'),(-15,'femto','f'),(-12,'pico','p'),(-9,'nano','n'),(-6,'micro','μ'),(-3,'milli','m'),(-2,'centi','c'),(-1,'deci','d'),(1,'deca','da'),(2,'hecto','h'),(3,'kilo','k'),(6,'mega','M'),(9,'giga','G'),(12,'tera','T'),(15,'peta','P'),(18,'exa','E'),(21,'zetta','Z'),(24,'yotta','Y')]
fcs=[('ST','Status information','状态','D','过程状态，读/报告/记录，可按模型取代；不普通写状态'),('MX','Measurements','测量','D','过程或计算测量，读/报告/记录，可取代；不普通写测量'),('CO','Control','控制','D','通过控制服务操作；原附录的可读表述需结合 CO 映射/服务表'),('SP','Setpoint','设点 / 无组定值','D、CB','值可读并按对象服务修改；早期 APC 还用它表达设点控制'),('SV','Substitution','取代','D','读写取代参数，影响状态/测量值的来源'),('CF','Configuration','配置','D','读写配置；立即或按实现延后生效'),('DC','Description','描述','D','读写文字/铭牌，权限与实现仍有限制'),('SG','Setting Group','定值组','D','读当前激活组，不能普通写 SG'),('SE','Setting Group Editable','可编辑定值组','D','通过 SGCB 服务编辑选定组，确认编辑与激活分开'),('EX','Extended Definition','扩展定义','D','指向定义命名空间；不是业务扩展值本身'),('BR','Buffered Report','缓存报告控制','CB','BRCB，读写控制信息并受使能状态/权限约束'),('RP','Unbuffered Report','非缓存报告控制','CB','URCB，读写控制信息'),('LG','Logging','日志控制','CB','LCB，读写控制信息'),('GO','GOOSE control','GOOSE 控制','CB','GoCB，控制事件发布；不是 GOOSE 的业务数据'),('GS','GSSE control','GSSE 控制','CB','GsCB，旧模型保留；不与 GOOSE 混称'),('MS','Multicast Sampled Values','多播采样值控制','CB','MSVCB，控制多播采样值；不是采样数据的 FC'),('US','Unicast Sampled Values','单播采样值控制','CB','单播 SVCB；本版中文点对点广播用语易混'),('XX','Wildcard','通配范围','服务参数','访问 FCD 内任意 FC；不写为 DA 的 fc="XX"')]
page('cdc-units-fc','附录 A/B：单位、倍率与功能约束 FC',[
sec('units','1. 附录 A 的全部单位表项',p('附录 A 是规范性附录，A.1～A.4 共 58 个表行。它给出量、单位名和单位符号；各表的序号重新开始，序号不是 SIUnit 的全局枚举编码。实际 SCL 必须沿 units.SIUnit.type 读 EnumType 的 ord/文本，不能把每张表的“1”都写入设备。相同单位可服务不同量，单位相同不证明业务语义相同。')),
*[sec(i,t,table(['物理量','单位英文','符号','解释 / 来源差异'],rs)) for i,t,rs in unit_groups],
sec('multipliers','2. A.5 全部 20 个倍率前缀',p('multiplier 表示十进制指数，不是直接乘数。工程读数=数值×10^multiplier；模拟量若仅提供 i，还要先按 sVC 换算。前缀与单位符号大小写有意义：m 是 milli，M 是 mega。')+table(['multiplier 指数','倍率','前缀英文','符号'],[(str(n),'10^'+str(n),w,s) for n,w,s in prefixes]+[('0（缺省）','1','无前缀；不占 A.5 的 20 行','—')])+p('原创例：setMag.f=5，SIUnit=A，multiplier=−3 → 0.005 A；multiplier=3 → 5000 A。倍率改变会改变数值解释；显示成 mA 或 kA 要和配置一致。')),
sec('fc','3. 附录 B 的全部 18 个 FC 表项',p('附录 B 为资料性附录，重列 7-2 的 FC。D/CB 标记分别说明数据属性/控制块上下文。这里说明功能与服务，不把可写表项解释为任何客户在任何状态都能写。')+table(['FC','英文助记','中文','适用上下文','功能与使用'],fcs)+table(['原表初始值 / 存储栏','理解方式'],[('ST/MX 从过程或应用取初始值','服务器的过程/计算数据源；不是从任意 XML Val 恢复实时状态'),('CO 无初始值','命令不是设备启动后的固定状态'),('SP/SV/CF/DC/SG/EX 和控制块等提及配置初值','描述配置/初始化来源；原文多处同时写“其值不可变”，与允许读写列冲突，应分别核对配置初值、运行写权限和映射规则'),('SE 通过编辑定值组服务形成有效值','不要把 SGCB 编辑/确认与激活等同'),('SV 初值 FALSE 等表述','按具体属性解释，例如 subEna；不是所有 SV 字段都能取 BOOLEAN'),('XX 仅服务通配','不属于普通 DA 的类型模板定义')])+p('FC 是用途分组：DC 与 EX 都可能装字符串，但 DC 是描述，EX 是定义引用；SP 与 SG/SE 都可能是 setMag，但有无定值组决定访问模型。'+link('cdc-setting','定值类与运行流程','setting-flow')+'。'))], '附录 A 表 A.1～A.5（PDF 53～55）；附录 B 表 B.1（PDF 56～57）')

# Actual, read-only SCD evidence. Preserve names as explicitly requested by user.
scd_path=ROOT/'source/南雷变2026041614.scd'
scd_bytes=scd_path.read_bytes();root=ET.fromstring(scd_bytes)
ns={'s':'http://www.iec.ch/61850/2003/SCL'}
dtt=root.find('s:DataTypeTemplates',ns)
types={e.get('id'):e for e in dtt}
dotypes=[e for e in dtt if e.tag.endswith('}DOType')]
counts=Counter(e.get('cdc') for e in dotypes)
instance_refs=defaultdict(list)
for ied in root.findall('s:IED',ns):
 for ld in ied.findall('.//s:LDevice',ns):
  for ln in list(ld):
   if ln.tag.split('}')[-1] not in ['LN','LN0']:continue
   lnt=types.get(ln.get('lnType'))
   if lnt is None:continue
   ln_name=(ln.get('prefix') or '')+(ln.get('lnClass') or '')+(ln.get('inst') or '')
   for do in lnt.findall('s:DO',ns):
    instance_refs[do.get('type')].append((ied.get('name'),ld.get('inst'),ln_name,do.get('name'),ln.get('lnType')))
lines=scd_bytes.decode('utf-8-sig').splitlines()
def source_line(tag,identifier):
 pattern=re.compile(r'<'+tag+r'\b[^>]*\bid=["\']'+re.escape(identifier)+r'["\']')
 return next((i+1 for i,l in enumerate(lines) if pattern.search(l)),None)
def xml_snippet(e):
 s=ET.tostring(e,encoding='unicode')
 s=re.sub(r'<(/?)ns0:',r'<\1',s).replace(' xmlns:ns0="'+ns['s']+'"','')
 return s.strip()
def nested_types(e):
 results=[];seen=set()
 def walk(current,path):
  for child in current:
   tag=child.tag.split('}')[-1];ref=child.get('type')
   if tag not in ['DA','BDA','SDO'] or not ref or ref in seen:continue
   target=types.get(ref)
   if target is None:continue
   seen.add(ref);newpath=path+'.'+child.get('name','?')
   results.append((newpath,ref,target));walk(target,newpath)
 walk(e,e.get('cdc',e.get('id')))
 return results
evidence=[];sections=[]
for c in CDC:
 matches=[e for e in dotypes if e.get('cdc')==c['code']]
 if not matches:
  sections.append(sec('example-'+c['code'].lower(),c['code']+'：参考文件未声明',p('在本文件 DataTypeTemplates 中未发现 cdc="'+c['code']+'" 的 DOType。本站标准属性表仍覆盖此类，数值示意为原创教学例；不能拿其他 CDC 的同名字段充当此类证据。')))
  evidence.append({'cdc':c['code'],'count':0});continue
 # Prefer a type used directly by a LN DO; otherwise child reference is explicit.
 e=next((x for x in matches if instance_refs[x.get('id')]),matches[0]);eid=e.get('id');refs=instance_refs[eid]
 fields=[(x.tag.split('}')[-1],x.get('name',''),x.get('bType','—'),x.get('type','—'),x.get('fc','—'),', '.join(a+'='+x.get(a) for a in ['dchg','qchg','dupd','count'] if x.get(a) is not None)) for x in e]
 parents=[(x.get('id'),child.get('name')) for x in dotypes for child in x.findall('s:SDO',ns) if child.get('type')==eid]
 body=p('文件内该 CDC 有 '+str(len(matches))+' 个 DOType；选取 '+code(eid)+'。源文件行 '+str(source_line('DOType',eid))+'。')
 if refs:
  body+=table(['IED','LDevice.inst','LN','DO','LNodeType'],[tuple(esc(x) for x in r) for r in refs[:3]])+p('引用链：IED → LDevice → LN.lnType → LNodeType.DO.type → DOType；这里只展示前 3 个实际声明引用，不根据设备名推断现场业务。')
 else:
  body+=table(['父 DOType','SDO 名'],parents[:6])+p('该模板没有被 LN 的 DO 直接引用；上表列可观察到的子对象引用。未引用模板也可能保留在文件中，不能当成运行实例。')
 body+=table(['节点种类','name','bType','type 引用','FC','触发 / 数量'],[tuple(esc(v) for v in r) for r in fields])+pre(xml_snippet(e))
 nests=nested_types(e)
 if nests:
  body+=table(['路径','被引用类型','源行','含义'],[(esc(a),code(b),str(source_line(x.tag.split('}')[-1],b)),esc(', '.join(y.get('name','') for y in x)) if x.tag.endswith('}DAType') else '枚举：ord / 文本如下') for a,b,x in nests])
  for a,b,x in nests[:12]:body+=p(code(a)+' → '+code(b))+pre(xml_snippet(x))
 notices=[]
 if c['code']=='BCR':notices.append('原版表 20 actVal/frVal 为 INT128，本模板实际 bType='+e.find("s:DA[@name='actVal']",ns).get('bType')+'；差异必须保留，不能将工程类型改写成原版类型。')
 if c['code']=='CMV':notices.append('本工程 subCVal 引用 Vector 结构；与早期表 23 的 AnalogueValue 印刷行有差异。')
 if c['code'] in ['SPG','ING','ASG','CURVE']:notices.append('本片段的 FC 以实际 DA 为准。模板与 Val 可证明配置声明；不能证明设备激活组或运行值。')
 if c['code']=='DPC':notices.append('SBOw/Oper/Cancel 是 SCL 映射结构；请沿 DAType 读取 ctlVal、origin、ctlNum、T、Test、Check 等 BDA。不是直接写 stVal。')
 if notices:body+=p(' '.join(notices))
 sections.append(sec('example-'+c['code'].lower(),c['code']+'：'+eid,body))
 evidence.append({'cdc':c['code'],'count':len(matches),'id':eid,'line':source_line('DOType',eid),'instances':refs[:3],'parents':parents[:6],'nested_type_ids':[b for a,b,x in nests]})
meta={'source':'source/南雷变2026041614.scd','sha256':hashlib.sha256(scd_bytes).hexdigest(),'root':root.attrib,'cdc_counts':dict(sorted(counts.items())),'do_types':len(dotypes),'examples':evidence,'baseline_cdc_count':len(CDC),'table49_unique_names':len(DICTIONARY),'unit_rows':sum(len(v) for i,t,v in unit_groups),'multiplier_prefixes':len(prefixes),'fc_rows':len(fcs)}
(OUT/'data/part73-evidence.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
page('cdc-scd-evidence','参考 SCD：CDC、属性与类型引用证据',[
sec('scope','1. 文件范围与读法',p('只读分析 '+code(meta['source'])+'，保留用户指定的真实名称与技术关键字。本页不是设备能力认证，也不从 IED 名、厂商、MAC 或 APPID 推断业务。全部片段来自该文件的类型定义，行号便于回到源文件核对。')+table(['观测项','实际声明'],[('SCL 根版本',esc(' / '.join(k+'='+str(v) for k,v in root.attrib.items()))),('DOType 总数',str(len(dotypes))),('不同 CDC 字符串数',str(len(counts))),('本版 29 类的覆盖',str(sum(counts[c['code']]>0 for c in CDC))+' 类有定义；缺 '+', '.join(c['code'] for c in CDC if not counts[c['code']])),('文件 SHA-256',code(meta['sha256']))])+p('本工程另含 ENS、ENC、STG，未列入所给 2003 版 29 类表。根版本 2007 B4 说明 SCL 语法版次，不能独自证明每一 CDC 的标准命名空间或设备运行支持。')),
sec('counts','2. 所有 CDC 的模板统计',table(['cdc 字符串','DOType 数','本版关系'],[(code(a),str(b),'本版 CDC' if any(c['code']==a for c in CDC) else '本版表 12 以外的工程声明') for a,b in sorted(counts.items())])),
sec('reading-chain','3. 沿引用读取数值结构',p('例如 WYE 的 phsA → CMV.cVal → Vector.mag → AnalogueValue.i/f；每一层先读节点种类，再按 type 找下一层定义。单位、倍率、配置和枚举分支同样要沿 type 追踪。下面逐类给出真实 DOType 及其嵌套定义。未出现的类明确列出。')+diagram('scd-type-chain','SCL 里的 CDC 结构链',[('LN.lnType → LNodeType','找到本 LN 采用的 DO 清单'),('DO.type → DOType.cdc','找到具体 CDC 属性和 FC'),('SDO.type → 另一个 DOType','复合对象的子 CDC'),('DA/BDA.type → DAType / EnumType','结构分量或枚举编码，直到基本类型')],'type 是文件内的引用标识，cdc 是类名；二者不能互换。')),
*sections], '用户参考 SCD 的 DataTypeTemplates 与 IED/LDevice/LN 引用；各节列源行', 'SCL 配置')

# Search index additions are built from the same reviewed data as the pages.
terms=[]
def term(identifier,zh,en,aliases,summary,href,category='数据模型'):
 terms.append({'id':identifier,'zh':zh,'en':en,'aliases':aliases,'category':category,'level':'第 7-3 部分','summary':summary,'related':['cdc'],'href':'chapters/'+href})
term('part73-guide','公用数据类完整导读','IEC 61850-7-3 CDC guide',['7-3','第7-3部分','公用数据类规范'],'按所给 2003 版逐项解释 29 类、属性类型、表 49、单位和 FC。','standard-part-7-3.html','标准文库')
for c in CDC:term('cdc-'+c['code'].lower(),c['zh'],c['en'],[c['code']],c['meaning']+' '+c['notes'],FILES[c['group']]+'.html#'+c['code'].lower())
canonical={'CDC':'cdc','FC':'fc','TrgOp':'acsi72-trgop','dchg':'trigger-dchg','qchg':'trigger-qchg','dupd':'trigger-dupd','SBO':'acsi72-sbo'}
for a,b,z,meaning in abbr:
 if a not in [x[0] for x in fcs]:term(canonical.get(a,'part73-abbr-'+a.lower()),z,b,[a],meaning,'standard-part-7-3.html#abbreviations')
for a,b,meaning in CONDITIONS:term('presence-'+re.sub('[^a-z0-9]','-',a.lower()),a+' 存在条件',b,[a],meaning,'standard-part-7-3.html#conditions')
for n,meaning in DICTIONARY.items():term('da-'+n.lower(),n+' 数据属性',n,[n],meaning,'cdc-attribute-dictionary.html#da-'+n)
for a,b,z,ctx,meaning in fcs:term('fc-'+a.lower(),z+'功能约束',b,[a,'FC='+a],meaning,'cdc-units-fc.html#fc')
for path,btype,domain,meaning in quality:term('part73-quality-'+path.lower().replace('.','-'),path+' 品质',path,[path],domain+'；'+meaning,'cdc-common-types.html#quality')
for codevalue,enum,meaning,flow,use in ctls:term('part73-ctl-'+codevalue,meaning,enum,[enum]+(['sbo-with-enhencedsecurit','sbo-with-enhenced-security'] if codevalue=='4' else []),flow+'；'+use,'cdc-common-types.html#control-models')
for enum,meaning in [('operate-once','一次操作后释放选择'),('operate-many','允许选择有效期内连续操作')]:term('part73-'+enum,meaning,enum,[enum],'SboClasses 控制操作完成后的选择状态；需结合 sboTimeout。','cdc-common-types.html#sbo-class')
term('presence-c','C 属性存在标记','Conditional',['C','M/O/C'],'按条件代码决定属性是否出现；C 不是任意选取。','standard-part-7-3.html#conditions')
term('quality','品质','Quality',['q','品质','质量位','数据质量'],'全部 validity、detailQual、source、test、operatorBlocked 字段与来源/闭锁关系。','cdc-common-types.html#quality')
js='/* Generated by scripts/build_part73.py; local script for file://. */\n(function () {\n  const additions = '+json.dumps(terms,ensure_ascii=False,indent=2)+';\n  const terms = window.IEC61850_TERMS;\n  for (const entry of additions) {\n    const old = terms.find(term => term.id === entry.id);\n    if (old) {\n      entry.aliases = [...new Set([...old.aliases, old.zh, ...entry.aliases])];\n      entry.related = [...new Set([...old.related, ...entry.related])].filter(id => id !== entry.id);\n      Object.assign(old, entry);\n    } else terms.push(entry);\n  }\n}());\n'
(OUT/'data/part73-terms.js').write_text(js,encoding='utf-8')
print(json.dumps({'pages':len(pages),'cdc':len(CDC),'attributes':len(DICTIONARY),'terms':len(terms),'evidence':meta['do_types']},ensure_ascii=False))
