"""Build static protection guides; source SCD is read only."""
from pathlib import Path
from html import escape
from collections import Counter
import xml.etree.ElementTree as ET
import hashlib,json,re
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'outputs'
MODEL='common-ld-datasets.html'
NINE='nine-unifications.html'
LD_HINTS=dict(zip('LD0 PROT MEAS CTRL RCD PIGO PISV RPIT MUSV MUGO'.split(),[
'查公共信息、告警与控制块；不是 LN0 的同义词','查保护 P/R 组 LN、起动/动作和数据集','查测量 LN、MX、单位、品质和时间','查控制 LN、位置、控制模型和联闭锁','查记录、日志/文件和控制配置','查 LN/Inputs 是否承担保护相关 GOOSE 输入','查 LN/Inputs 是否承担保护相关采样输入','按实际 LN/DO 和输入映射查证，不由缩写判断业务','查采样控制块、成员和类型','查 GOOSE 控制块及实际发布订阅角色']))
DS_NAMES='dsTripInfo dsAlarm dsWarning dsRelayEna dsRelayBlk dsRelayState dsRelayFunEn dsDeviceState dsCommState dsRelayAin dsAin dsDin dsRelayDin dsSetting dsSetGrpNum dsGOOSE dsSV dsLog'.split()
DS_HINTS=['起动/动作信息，详见本页案例','查告警等级和复归说明','查警示信息，不预设等级分界','查投入/使能成员及 FC','查闭锁/压板成员与内部映射','查保护状态、品质和触发','查功能使能对象及 FC','查装置状态/监视对象','查通信监视对象和链路关联','查保护模拟量、单位及倍率','查模拟量类型和 FC','查开入/状态、品质和时间','查保护输入模型与逻辑','查参数 FC，不等同于写定值服务','查组号和 SGCB 对应','查 GSEControl 引用及成员','查 SampledValueControl 引用','查日志成员及 LogControl']
def write(p,s):p.write_text(s,encoding='utf-8')
def table(head,rows):
 cell=lambda tag,x:'<'+tag+'>'+escape(str(x))+'</'+tag+'>'
 return '<div class="reference-table"><table><thead><tr>'+''.join(cell('th',x) for x in head)+'</tr></thead><tbody>'+''.join('<tr>'+''.join(cell('td',x) for x in row)+'</tr>' for row in rows)+'</tbody></table></div>'
def evidence():
 files=sorted((ROOT/'source').glob('*.scd'))
 assert len(files)==1,'Expected one reference SCD'
 raw=files[0].read_bytes();r=ET.fromstring(raw)
 ns={'s':r.tag.split('}')[0][1:]}
 lc=Counter(x.get('inst') for x in r.findall('.//s:LDevice',ns))
 dc=Counter(x.get('name') for x in r.findall('.//s:DataSet',ns))
 types={x.get('id'):x for x in r.find('s:DataTypeTemplates',ns)}
 cases=[(server,ld,owner,ds) for server in r.findall('.//s:Server',ns) for ld in server.findall('s:LDevice',ns) for owner in ld for ds in owner.findall('s:DataSet',ns) if ds.get('name')=='dsTripInfo']
 server,ld,owner,ds=cases[0]
 assert ld.get('inst')=='PROT' and owner.tag.endswith('LN0')
 members=[]
 for m in ds:
  target=[x for x in server.findall('s:LDevice',ns) if x.get('inst')==m.get('ldInst')]
  assert len(target)==1
  lns=[x for x in target[0].findall('s:LN',ns) if all(x.get(k,'')==m.get(v,'') for k,v in [('prefix','prefix'),('lnClass','lnClass'),('inst','lnInst')])]
  assert len(lns)==1
  do=types[lns[0].get('lnType')].find("s:DO[@name='%s']"%m.get('doName'),ns)
  assert do is not None
  dt=types[do.get('type')]
  attrs=[{'name':x.get('name'),'bType':x.get('bType')} for x in dt.findall('s:DA',ns) if x.get('fc')==m.get('fc')]
  assert attrs
  a=dict(m.attrib)
  if a.get('prefix'):a['prefix']='Demo'
  members.append(dict(index=len(members)+1,fcda=a,cdc=dt.get('cdc'),attributes_in_source_order=attrs))
 assert len(members)==6 and all(x['fcda'].get('fc')=='ST' and 'daName' not in x['fcda'] for x in members)
 controls={tag:[x for x in owner.findall('s:'+tag,ns) if x.get('datSet')=='dsTripInfo'] for tag in ['ReportControl','GSEControl','SampledValueControl']}
 assert len(controls['ReportControl'])==1 and not controls['GSEControl'] and not controls['SampledValueControl']
 rc=controls['ReportControl'][0]
 assert rc.get('buffered')=='true'
 lines=raw.decode('utf-8-sig').splitlines()
 selected=dict(ied_alias='DemoProtection',ld='PROT',ln='LLN0',dataset='dsTripInfo',members=members,control_counts={k:len(v) for k,v in controls.items()},report={k:rc.get(k) for k in ['buffered','datSet','confRev','bufTime','intgPd']})
 selected['source_lines']={tag:next(i for i,l in enumerate(lines,1) if re.search(pattern,l)) for tag,pattern in [('dataset',r'<DataSet\b[^>]*name="dsTripInfo"'),('report',r'<ReportControl\b[^>]*datSet="dsTripInfo"')]}
 ev=dict(source='project-reference-scd (identity omitted)',sha256=hashlib.sha256(raw).hexdigest(),scope='This file only; first dsTripInfo in document order. No business meaning or standards compliance inferred from names.',ld_counts={k:lc[k] for k in LD_HINTS},dataset_counts={k:dc[k] for k in DS_NAMES},trip_count=len(cases),selected=selected,aliases='IED, nonempty LN prefix and report identity replaced with Demo aliases; original type IDs omitted.')
 write(OUT/'data/common-datasets-evidence.json',json.dumps(ev,ensure_ascii=False,indent=2)+'\n')
 frag=ET.Element('LN0',dict(lnClass='LLN0',lnType='DemoLLN0',inst=''))
 d=ET.SubElement(frag,'DataSet',dict(name='dsTripInfo'))
 for x in members:ET.SubElement(d,'FCDA',x['fcda'])
 ET.SubElement(frag,'ReportControl',dict(name='DemoTripReport',rptID='DemoTripReport',**selected['report']))
 ET.indent(frag,space='  ')
 rows=[]
 for x in members:
  a=x['fcda'];ref=a.get('prefix','')+a['lnClass']+a['lnInst']+'.'+a['doName']+' ['+a['fc']+']'
  rows.append([x['index'],ref,x['cdc'],', '.join(y['name']+':'+y['bType'] for y in x['attributes_in_source_order'])])
 return dict(LD_TABLE=table(['LD 名','次数','下一步查证'],[(k,lc[k],v) for k,v in LD_HINTS.items()]),DATASET_TABLE=table(['数据集名','次数','阅读方向（需成员及引用证实）'],[(k,dc[k],v) for k,v in zip(DS_NAMES,DS_HINTS)]),TRIP_COUNT=str(len(cases)),TRIP_XML='<pre data-language="xml"><code>'+escape(ET.tostring(frag,encoding='unicode'))+'</code></pre>',MEMBER_TABLE=table(['序号','脱敏 FCD 引用','CDC','本例 ST 属性顺序'],rows))
def integrate():
 p=OUT/'assets/navigation.js';s=p.read_text(encoding='utf-8')
 m=re.search(r'const groups = (\[.*?\]);',s,re.S);groups=json.loads(m[1])
 model=next(x for x in groups if x['id']=='model')
 if not any(x[0]==MODEL for x in model['items']):model['items'].insert(2,[MODEL,'常用 LD 与数据集：dsTripInfo 调试案例','模型入门'])
 if not any(x['id']=='protection' for x in groups):
  groups.insert(next(i for i,x in enumerate(groups) if x['id']=='terms'),dict(id='protection',label='继电保护九统一',entry=NINE,items=[[NINE,'九统一：设计、模型与信息规范','标准化设计导读']]))
 s=s[:m.start(1)]+json.dumps(groups,ensure_ascii=False,indent=2)+s[m.end(1):];write(p,s)
 p=OUT/'index.html';s=p.read_text(encoding='utf-8')
 card='<section class="card" id="practical-model-entry"><p class="section-kicker">常见对象与标准化设计</p><h2>从 dsTripInfo 读到继电保护九统一</h2><p><a href="chapters/'+MODEL+'"><b>常用 LD 与数据集：dsTripInfo 调试案例 →</b></a></p><p>10 类 LD、18 类数据集，参考 SCD 的成员、类型和缓冲报告引用；区分动作信息、出口与执行反馈。</p><p><a href="chapters/'+NINE+'"><b>继电保护九统一 →</b></a> 九项内容、国网与南网适用边界、SCL 关联及版本资料。</p></section>\n'
 if 'id="practical-model-entry"' not in s:s=s.replace('<section class="card" id="reference">',card+'<section class="card" id="reference">',1)
 if 'data/protection-guides-terms.js' not in s:s=s.replace('<script src="assets/app.js">','<script src="data/protection-guides-terms.js"></script><script src="assets/app.js">',1)
 write(p,s)
 p=OUT/'assets/home.js';s=p.read_text(encoding='utf-8')
 if 'href="#practical-model-entry"' not in s:s=s.replace('<li><a href="#reference">','<li><a href="#practical-model-entry">LD / 数据集与九统一</a></li><li><a href="#reference">',1)
 write(p,s)
 for stem in ['ied-data-model','control-blocks-reference','object-reference','protection-ied-guide','engineering-model-reading','engineering-practice','abbreviation-index','setting-group-development']:
  p=OUT/'chapters'/(stem+'.html');s=p.read_text(encoding='utf-8')
  if 'id="protection-guides"' not in s:s=s.replace('</main>','<nav class="notice" id="protection-guides" aria-label="关联专题"><b>常见数据集与继电保护标准化设计</b><p><a href="'+MODEL+'">常用 LD 与 dsTripInfo 数据集案例</a>：沿成员、类型与控制块查证。<a href="'+NINE+'">继电保护九统一</a>：九项内容、两网适用边界与模型关系。</p></nav></main>',1)
  write(p,s)
 rows=[
 ('trip','dsTripInfo 数据集案例','dsTripInfo',['保护动作数据集','动作信息','brcbTripInfo'],'核对 PROT/LLN0、6 个 ST/FCD 成员及 BRCB 引用，不凭名字认定 GOOSE 出口。',MODEL,'trip-case'),
 ('ld','常用逻辑设备 LD','Logical Device',['常用LD','常用 LD',*LD_HINTS],'参考文件的 10 类 LD 与查证方向，不按实例名断定业务。',MODEL,'ld-catalog'),
 ('datasets','常用数据集目录','Common DataSets',['常用数据集',*DS_NAMES],'18 类数据集出现统计和阅读方向，用成员、类型及控制块确认用途。',MODEL,'dataset-catalog'),
 ('structure','FCD 结构与报告成员顺序','FCD report member structure',['数据集成员顺序','inclusion','结构化报告'],'未填 daName 的成员可为 FCD 结构；inclusion 按数据集成员定位，随后按模型展开。',MODEL,'trip-case'),
 ('report','动作报告与跳闸出口区别','Protection event versus trip output',['保护动作报告','跳闸出口','dsTripInfo GOOSE'],'报告上送、GOOSE 出口和断路器分位需分别查证。',MODEL,'report-reading'),
 ('troubleshoot','数据集调试现象','DataSet troubleshooting',['没有报告','数据集错位','数据集调试'],'核对完整身份、成员顺序、粒度、ConfRev、RCB 及版本。',MODEL,'troubleshooting'),
 ('nine','继电保护九统一','Nine unifications',['九统一','继电保护标准化','九统一规范'],'功能、回路、端子、接口、压板、定值和报告格式、指示灯、菜单及信息规范。',NINE,'nine-items'),
 ('scope','国网与南网保护标准化范围','Utility protection design scope',['国网九统一','南网九统一','国家电网','南方电网','Q/GDW','Q/CSG'],'共用模型机制与企业、项目及设备约束分层，不自动等同两网要求。',NINE,'grid-scope'),
 ('virtual','虚端子与标准化模型','Virtual terminal and standardized model',['虚端子','九统一模型','九统一数据集'],'联查发布成员、控制块、通信、接收 ExtRef 和内部映射。',NINE,'model-mapping'),
 ('versions','九统一规范版本与资料','Protection standard version baseline',['九统一版本','九统一标准号','九统一资料'],'以正式文件、条款及工程/设备版本追溯，不将未核验条款当作现行要求。',NINE,'versions')]
 terms=[dict(id='protection-guide-'+i,zh=zh,en=en,aliases=a,category='继电保护与常用数据集',level=('数据模型 → 常用 LD 与数据集' if file==MODEL else '继电保护九统一 → 标准化设计导读'),summary=summary,related=['protection-guide-nine' if i!='nine' else 'protection-guide-trip'],href='chapters/'+file+'#'+anchor) for i,zh,en,a,summary,file,anchor in rows]
 write(OUT/'data/protection-guides-terms.js','/* Generated by scripts/build_protection_guides.py. */\n(function(){const terms=window.IEC61850_TERMS;for(const entry of '+json.dumps(terms,ensure_ascii=False,indent=2)+'){const i=terms.findIndex(t=>t.id===entry.id);if(i<0)terms.push(entry);else terms[i]=entry;}}());\n')
 p=ROOT/'scripts/check_offline.py';s=p.read_text(encoding='utf-8')
 s=s.replace("new+=['object-reference','setting-group-development']","new+=['object-reference','setting-group-development','common-ld-datasets','nine-unifications']")
 if "require('./outputs/data/protection-guides-terms.js');" not in s:s=s.replace("require('./outputs/data/setting-group-terms.js');process.stdout", "require('./outputs/data/setting-group-terms.js');require('./outputs/data/protection-guides-terms.js');process.stdout")
 s=s.replace("'objref-','setting-dev-'))", "'objref-','setting-dev-','protection-guide-'))")
 s=s.replace("OUT/'data/object-reference-terms.js',OUT/'data/setting-group-terms.js']", "OUT/'data/object-reference-terms.js',OUT/'data/setting-group-terms.js',OUT/'data/protection-guides-terms.js']")
 write(p,s)
def build():
 values=evidence()
 for file in [MODEL,NINE]:
  s=(ROOT/'scripts/templates'/file).read_text(encoding='utf-8-sig')
  for key,value in values.items():s=s.replace('{{'+key+'}}',value)
  assert not re.search(r'\{\{[A-Z_]+\}\}',s)
  write(OUT/'chapters'/file,s)
 integrate()
 print(json.dumps(dict(pages=[MODEL,NINE],terms=10,ld_types=10,dataset_names=18,source_read_only=True)))
if __name__=='__main__':build()
