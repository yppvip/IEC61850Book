"""Build saved, corrected reference data from checked names and reviewed local OCR.
Run after curate_part74.py; normal website rebuild needs only the saved JSON.
"""
from pathlib import Path
from collections import defaultdict
import json,re,difflib
from part74_catalog import ROSTER,ABBR_NAMES
from part74_fields import FIELDS
from part74_dictionary_names import NAMES
from part74_summaries import revise
from part74_values import ENUMS
ROOT=Path(__file__).resolve().parents[1]
raw=json.loads((ROOT/'tmp/part74-ocr/candidates.json').read_text(encoding='utf-8'))
overrides={'Beh':'只读的实际行为，由逻辑设备 LLN0.Mod 与本节点 Mod 组合确定。','Mod':'运行模式的可控请求；其枚举和全组合行为见取值页。','AngLod':'距离保护负荷区域的幅角；与 RisLod 一起限定负荷侵入区域，不能当作相量测量角。','PctOfs':'距离特性偏移按线路长度百分数表示，结合范围与斜率读保护区域。','PctRch':'距离特性范围按线路长度百分数表示。','RisGndRch':'四边形接地距离元件的电阻覆盖范围，须结合极化、零序补偿与线路角。','RisLod':'负荷区的电阻范围；配合 AngLod 区分正常负荷与保护动作区。','RisPhRch':'四边形单相距离元件的电阻覆盖范围。','SwgVal':'电网振荡检测边界，与阻抗轨迹穿越内外边界的时间配合。','LivDeaMod':'母线/线路带电或无电压组合的检同期方式，编码见取值页。','LevMod':'记录通道触发电平方式，编码见取值页。','Health':'节点健康状态；LLN0 聚合所关联逻辑设备的最差健康状态。','AutoRecSt':'自动重合闸准备、进行或成功状态，编码见取值页。','CBOpCap':'断路器当前物理操作能力；不能直接代替闭锁或联锁许可。','MemFull':'内存满的百分数阈值；MemUsed 是占用百分比，MemOv 是溢出状态。','MmeRs':'原表 9 此处打印 MmeRs，RDRE 中打印 MemRs；用于复位存储器。保留拼写差异。','PresTr':'原表名称为压力跳闸而中文解释写 Level 告警；存在语义不一致，需核对版次/设备文档。','H2':'油中氢气测量反映绝缘状态；浓度单位/倍率必须沿 CDC.units 与工程配置核对。','H2O':'油中相对饱和湿度百分数，须与同测点 H2OTmp 油温一起读。','H2OTmp':'测量油中相对饱和湿度时的油温，单位 ℃。','PhyNam':'原表 9 打印 PhyNam，而 LPHD 表打印 PhyName；表示物理设备铭牌。','Chtrg':'表 9 打印 Chtrg，通道表打印 ChTrg；表示记录通道触发。','GnSp':'表 9 打印 GnSp，ZGEN 表打印 GnSpd；表示发电机速度。','FanCtlGen':'控制全部风扇；级别编码与 FanCtl 相同，需区分整组和单台。','FanCtl':'控制单台风扇；不活动/各级编码见取值页。','PmpCtlGen':'表 9 的 PmpCtlGen 对应冷却控制表的 PumpCtlGen；控制全部水泵。','PmpCtl':'表 9 的 PmpCtl 对应冷却控制表的 PumpCtl；控制单台水泵。'}
data=[]
for page,names in NAMES.items():
 rows=[d for d in raw['data'] if d['page']==page]
 if page==84:
  i=next(i for i,d in enumerate(rows) if 'FanCtl' in d['name']);r=rows[i];rows[i:i+1]=[dict(r),dict(r)]
 if page==94:
  r=rows[0];rows[0:1]=[dict(r),dict(r)]
 assert len(rows)==len(names),(page,len(rows),len(names))
 for name,r in zip(names,rows):
  desc=r['desc'].replace('IRUE','TRUE').replace('FAISE','FALSE').replace('lRUE','TRUE')
  desc=re.sub(r'"?TRUE[”"]?表示','为 TRUE 时表示',desc)
  desc=re.sub(r'[“”"\s]+','',desc)
  # Keep a short semantic summary; tables/diagrams supply detailed relationships separately.
  desc=desc.split('。')[0].split('下图')[0].split('参见')[0][:105].rstrip('，；:：')
  desc=revise(name,overrides.get(name,desc))
  enum=next((title for ident,_,title,_ in ENUMS if name==ident),None)
  if enum:desc=enum+'；编码与完整含义见取值页。'
  data.append(dict(name=name,summary=desc,page=page))
abbr=[]
zhfix={'Acs':'访问','Alm':'告警','Cap':'能力','H2':'氢气','HP':'热点','In':'输入','Pmp':'水泵','Rec':'重合闸','Red':'降低','Rv':'反向','Stop':'停止','Thm':'热','TP':'三极、三相','Vlv':'阀门','Wid':'宽度','Win':'窗口','Ev':'评估','Imp':'与相别无关的阻抗','Un':'低于、欠量','Age':'老化、时效；原表另列冷却','Bnd':'范围、带宽；结合 BndCtr/BndWid 读控制带','Plt':'板、铭牌组成词'}
enfix={'DQ0':'Direct, quadrature and zero axis quantities','IEEE':'Institute of Electrical and Electronics Engineers','Tx':'Transmit, transmitted','Vac':'Vacuum','Z':'Impedance','Z0':'Zero sequence impedance','Z1':'Positive sequence impedance','Tmp':'Temperature (degrees Celsius)'}
for a in raw['abbreviations']:
 a=dict(a);a['en']=enfix.get(a['name'],a['en']).strip('‘’');a['zh']=zhfix.get(a['name'],a['zh'])
 if a['name'] in ['Tmh','Tmm','Tms','Tmms']:a['en']=a['en'].split('=')[-1]
 examples=[d['name'] for d in data if len(a['name'])>1 and a['name'] in d['name']][:3]
 a['usage']='用作数据名组成词；'+('例：'+'、'.join(examples)+'。' if examples else '按父节点功能和数据上下文理解，不单独定义业务。')
 special={'A':'三相/相别有关电流组成词；与 Amp 的相别无关量区分。','ACSI':'7-2 的对象和服务接口；连接 LN 数据到读、报告与控制。','CDC':'DO 的属性结构类型；先用 7-4 确定语义，再查 7-3。','CT':'本表为 Current Transducer；一次设备语境也常指 Current Transformer。','VT':'本表为 Voltage Transducer；一次设备语境也常指 Voltage Transformer。','M/O':'节点数据是否必备或可选；不表示权限、当前值或服务器支持全部服务。','Hz':'数据名组成词/频率量；作为单位符号时 Hz 是 hertz（赫兹）。','m':'本表表示 minutes；SI 单位表中的 m 是 metre（米），不能混用。','Sec':'本表为 Security；秒的单位用 s，时间名称按 Tms/Tmms 区分。','Tmms':'后缀提示毫秒时间，具体值的类型和范围仍查 CDC。','Lo':'Low（低）；LO=Lockout，大小写区分。','LO':'Lockout（闭锁）；Lo=Low，大小写区分。','Ts':'带符号代数和；相反方向谐波功率可抵消。','Tu':'绝对值累加；用于反映谐波负担而非净输送功率。'}
 a['usage']=special.get(a['name'],a['usage']);abbr.append(a)
# Preserve explicitly observed source inconsistencies.
for ln,names in {'PMRI':['StrInhTmm'],'RDRE':['FltNum','GriFltNum','MemUsed'],'XSWI':['SwTyp','SwOpCap','MaxOpCap'],'ZGIL':['EEHealth']}.items():
 for f in FIELDS[ln]:
  if f['name'] in names:f['cdc']='ISI'
for f in FIELDS['RADR']+FIELDS['RBDR']:
 if f['name']=='COMTRADE':f.update(cdc='—',format_row=True)
FIELDS['TVTR'].insert(-3,dict(name='HzRtg',cdc='ASG',presence='O',transient=False))
for f in FIELDS['MHAN']:
 if f['name'] in ['ThdEvnAmp','TddEvnAmp','NomA']:
  f['name']={'ThdEvnAmp':'ThdEvenAmp','TddEvnAmp':'TddEvenAmp','NomA':'NormA'}[f['name']]
FIELDS['ZGEN']=[f for f in FIELDS['ZGEN'] if not (f['name']=='DmdPwr' and f['cdc']=='MV')]
FIELDS['ZGEN'].insert(9,dict(name='GnSpd',cdc='MV',presence='O',transient=False))
for f in FIELDS['GSAL']:
 if f['name']=='SvcViol':f['name']='SvcVoil'
out={'baseline':'DL/T 860.74-2006 / IEC 61850-7-4:2003','classes':ROSTER,'fields':FIELDS,'dictionary':data,'abbreviations':abbr,'missing_scan':'PDF 72 重复印刷 58；印刷 68 缺失。ZBAT 数据表与 ZBSH 首表不可核对；ZBSH 续表仍在 PDF 73。'}
(ROOT/'scripts/part74_data.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8')
print('Saved',len(ROSTER)-1,'classes',sum(len(v) for v in FIELDS.values()),'field rows',len(data),'dictionary names',len(abbr),'abbreviations')
