"""Curated teaching data for DL/T 860.73-2004; not a normative transcription."""
CONDITIONS = [
('M','Mandatory','必须有；例如 SPS.stVal。'),('O','Optional','可选；出现时仍须满足类型与语义规则。'),
('PICS_SUBST','条件代码：支持取代','支持 Substitution 时，取代组属性必须存在；原文部分表印作 PIC_SUBST。PICS 为 Protocol Implementation Conformance Statement（协议实现一致性声明）。'),
('GC_1','条件代码：至少一个','同一数据实例的指定候选属性至少有一个。'),('GC_2(n)','条件代码：成组存在','编号 n 相同的属性一起有或一起没有；不同 CDC 的 n 不互相绑定。'),
('GC_CON','条件代码：配置依赖','与某可选属性相关的配置只能在该属性存在时出现，需按具体表的关联关系判断。'),
('AC_LN0_M','条件代码：LLN0 条件必选','对象在 LLN0 中时必选，否则可选；原表拼写 LN0、LLN0 有差异。'),('AC_LN0_EX','条件代码：LLN0 专属','LPL.ldNs 只允许在 LLN0 中；与“LLN0 内是否需要显式声明”分别判断。'),
('AC_DLD_M','条件代码：LN 命名空间','LPL.lnNs 的命名空间不同于 ldNs 时必须出现。'),('AC_DLN_M','条件代码：数据命名空间','dataNs 不同于上级 ldNs/lnNs 的命名空间时必须出现。'),
('AC_DLNDA_M','条件代码：CDC 命名空间','CDC 定义不同于上级 ldNs/lnNs 或 dataNs 时，cdcNs/cdcName 必须出现。'),
('AC_SCAV','条件代码：换算配置','AnalogueValue 的 i、f 都有时必须有；只有 i 时可选；只有 f 时不要求。'),
('AC_ST','条件代码：有状态','可控类支持状态反馈时必选。'),('AC_CO_M','条件代码：有控制时必选','可控类支持控制时必选。'),('AC_CO_O','条件代码：有控制时可选','可控类支持控制时可选。'),
('AC_SG_M','条件代码：有定值组时必选','支持定值组时必须有。'),('AC_SG_O','条件代码：有定值组时可选','支持定值组时可以有。'),
('AC_NSG_M','条件代码：无定值组时必选','不支持定值组时必须有。'),('AC_NSG_O','条件代码：无定值组时可选','不支持定值组时可以有。'),('AC_RMS_M','条件代码：RMS 引用','hvRef=rms 时必须有 rmsCyc。RMS=Root Mean Square，均方根/有效值。')]

# name | type | FC | trigger | domain | presence | meaning
def rows(s): return [line.split('|') for line in s.strip().splitlines() if line.strip()]
COMMON = rows('''d|VISIBLE STRING255|DC|—|文本|O|数据文字描述
dU|UNICODE STRING255|DC|—|Unicode 文本|O|可包含中文的描述
cdcNs|VISIBLE STRING255|EX|—|命名空间标识|AC_DLNDA_M|CDC 属性结构定义的来源
cdcName|VISIBLE STRING255|EX|—|CDC 名称|AC_DLNDA_M|和 cdcNs 一起标识扩展类
dataNs|VISIBLE STRING255|EX|—|命名空间标识|AC_DLN_M|数据对象语义定义的来源''')
def qt(fc='ST',presence='M',tp='M'):
 return rows(f'q|Quality|{fc}|qchg|见品质类型|{presence}|数据可信度\nt|TimeStamp|{fc}|—|UTC 时标与时间品质|{tp}|相关状态变化/测量时间')
def subst(typ,name='subVal',fc='SV'):
 return rows(f'subEna|BOOLEAN|SV|—|FALSE / TRUE|PICS_SUBST|使用过程值 / 使用取代值\n{name}|{typ}|{fc}|—|与被取代属性相符|PICS_SUBST|取代用值\nsubQ|Quality|SV|—|见品质类型|PICS_SUBST|取代用品质\nsubID|VISIBLE STRING64|SV|—|设备地址或 NULL|PICS_SUBST|取代来源标识')
CDC=[]
def cdc(code,en,zh,group,table,pdf,meaning,fields,notes='',common=True):
 CDC.append(dict(code=code,en=en,zh=zh,group=group,table=table,pdf=pdf,meaning=meaning,fields=fields+(COMMON if common else []),notes=notes))
for code,en,zh,tab,pg,typ,domain in [
('SPS','Single Point Status','单点状态',14,'16','BOOLEAN','FALSE / TRUE'),('DPS','Double Point Status','双点状态',15,'16–17','CODED ENUM','intermediate-state / off / on / bad-state'),('INS','Integer Status','整数状态',16,'17–18','INT32','−2147483648…2147483647；具体语义看 DO 定义')]:
 cdc(code,en,zh,'status',tab,pg,'只读状态：提供当前状态、品质、时间；支持取代时增加取代组。',rows(f'stVal|{typ}|ST|dchg|{domain}|M|当前状态')+qt()+subst(typ),
 'SPS 的 TRUE/FALSE 含义由 DO 决定，例如告警成立/不成立。DPS 是四态反馈，不是两个独立的 SPS；常用编码 0 中间态、1 off、2 on、3 异常态须结合所用映射或 EnumType。INS 是整数容器，不能把所有 INS 都解释为设备健康状态。')
cdc('ACT','Protection Activation Information','保护激活信息','status',17,'18–19','保护是否启动/动作的分相与汇总信息；具体是启动还是动作由 DO 语义决定。',rows('''general|BOOLEAN|ST|dchg|FALSE / TRUE|M|总激活信息；相事件的或关系
phsA|BOOLEAN|ST|dchg|FALSE / TRUE|O|A 相
phsB|BOOLEAN|ST|dchg|FALSE / TRUE|O|B 相
phsC|BOOLEAN|ST|dchg|FALSE / TRUE|O|C 相
neut|BOOLEAN|ST|dchg|FALSE / TRUE|O|接地/中性线相关事件''')+qt()+rows('operTim|TimeStamp|CF|—|绝对时间|O|表 17 拼作 operTim；表 49 operTm(ACT) 关联选相合分'), '并非必须三相都为 TRUE 才令 general=TRUE；无方向字段，也没有表列取代组。')
acdf=rows('general|BOOLEAN|ST|dchg|FALSE / TRUE|M|总激活\ndirGeneral|ENUMERATED|ST|dchg|unknown / forward / backward / both|M|总体方向；分相方向不同时可为 both')
for j,(ph,di) in enumerate([('phsA','dirPhsA'),('phsB','dirPhsB'),('phsC','dirPhsC'),('neut','dirNeut')],1):
 acdf+=rows(f'{ph}|BOOLEAN|ST|dchg|FALSE / TRUE|GC_2({j})|相/中性线激活\n{di}|ENUMERATED|ST|dchg|unknown / forward / backward|GC_2({j})|对应方向')
cdc('ACD','Directional Protection Activation Information','方向保护激活信息','status',18,'19–20','在 ACT 式激活信息旁给出保护判据的方向。',acdf+qt(),'分相激活与方向成对出现。forward/backward 的参考方向需要项目/设备定义；不是仅凭对象名字判定线路能量流向。')
cdc('SEC','Security Violation Counting','安全违例计数','status',19,'20','记录安全相关违规次数和最近违规信息。',rows('''cnt|INT32U|ST|dchg|0…4294967295|M|累计违规次数
sev|ENUMERATED|ST|—|unknown / critical / major / minor / warning|M|最近违规严重性
t|TimeStamp|ST|—|时标|M|最近违规时间
addr|OCTET STRING64|ST|—|最多 64 字节；解释由映射确定|O|导致计数增加的远端来源地址
addInfo|VISIBLE STRING64|ST|—|附加文本|O|最近违规补充说明'''),'SEC 原表没有 q。critical 指涉及危急安全操作/数据的特权访问尝试；major 指涉及非常重要安全操作/数据的访问尝试；minor 指特权数据访问被拒绝；warning 比 minor 更轻；unknown 为无法确定。它是信息模型，不能单凭计数证明设备已具备完整网络安全防护。')
cdc('BCR','Binary Counter Reading','二进制计数器读数','status',20,'21','累计计数与冻结快照；二进制表示整数计数，不是 BOOLEAN。',rows('''actVal|INT128|ST|dchg|−2^127…2^127−1|M|当前累计计数
frVal|INT128|ST|dupd|同 actVal|GC_2(1)|冻结时复制的计数
frTm|TimeStamp|ST|dupd|冻结时间|GC_2(1)|最近冻结时刻''')+qt()+rows('''units|Unit|CF|—|附录 A|O|工程量单位
pulsQty|FLOAT32|CF|—|每个计数单位对应量|M|工程量=计数×pulsQty
frEna|BOOLEAN|CF|—|FALSE / TRUE|GC_2(1)|是否启动冻结
strTm|TimeStamp|CF|—|绝对起始时间|GC_2(1)|冻结时间基准
frPd|INT32|CF|—|ms；0 表示一次|GC_2(1)|冻结周期
frRs|BOOLEAN|CF|—|FALSE / TRUE|GC_2(1)|冻结后是否复零'''),'例如 actVal=120、pulsQty=0.5，表示 60 个所声明单位。冻结复制值；复零改变累计值；读取只是访问值。冻结相关六项为同组。参考 SCD 的 BCR 数值类型须单独核对，不能用这张早期表强行覆盖。')
for code,en,zh,tab,pg,val,inst,typ,sub in [('MV','Measured Value','测量值',22,'22–23','mag','instMag','AnalogueValue','subMag'),('CMV','Complex Measured Value','复数测量值',23,'23–24','cVal','instCVal','Vector','subCVal')]:
 f=rows(f'{inst}|{typ}|MX|—|类型允许域|O|未经死区更新的即时值\n{val}|{typ}|MX|dchg|类型允许域|M|经过死区规则更新的值\nrange|ENUMERATED|MX|dchg|normal / high / low / high-high / low-low / 扩展|O|所处区间')+qt('MX')+subst('AnalogueValue',sub)
 f+=rows(f'units|Unit|CF|—|附录 A|O|数值/相量模的单位\ndb|INT32U|CF|—|0…100000；每单位 0.001%|'+('O' if code=='MV' else 'GC_CON')+'|死区配置\nzeroDb|INT32U|CF|—|0…100000；每单位 0.001%|O|零点附近钳制\nrangeC|RangeConfig|CF|—|六个边界值|GC_CON|range 的配置')
 f+=rows('sVC|ScaledValueConfig|CF|—|scaleFactor / offset|AC_SCAV|整数与浮点换算') if code=='MV' else rows('''magSVC|ScaledValueConfig|CF|—|scaleFactor / offset|AC_SCAV|模的换算
angleSVC|ScaledValueConfig|CF|—|scaleFactor / offset|AC_SCAV|表 23 拼作 angleSVC，表 49 为 angSVC
angRef|ENUMERATED|CF|—|V / A / other|O|单个 CMV 的角度参考''')
 f+=rows('smpRate|INT32U|CF|—|每额定周期样本数；直流为每秒|O|本测量的采样率')
 cdc(code,en,zh,'measurement',tab,pg,'用于监控中的模拟量'+('数值。' if code=='MV' else '相量（模和幅角）。'),f,'MV.mag 表示幅值；CMV.cVal.mag/ang 分别为模和角度。原表 23 subCVal 类型印为 AnalogueValue，但表 49 对应 instCVal（Vector）；阅读实现必须回查实际 DAType，不能按印刷冲突生成配置。')
cdc('SAV','Sampled Analogue Value','采样值','measurement',24,'25','描述一个采样时刻的模拟量，通常用于采样值传输。',rows('instMag|AnalogueValue|MX|—|整数/浮点|M|采样模拟量')+qt('MX',tp='O')+rows('''units|Unit|CF|—|附录 A|O|单位
sVC|ScaledValueConfig|CF|—|scaleFactor / offset|AC_SCAV|换算
min|AnalogueValue|CF|—|最小过程量|O|过程下限
max|AnalogueValue|CF|—|最大过程量|O|过程上限'''),'SAV 是数据类；SV/SMV 是采样值传输模型/协议。SAV 不含 mag 死区字段。t 在该版 SAV 为 O，采样帧还可能用采样序号/同步信息表达时间。')
ANG='Va / Vb / Vc / Aa / Ab / Ac / Vab / Vbc / Vca / Vother / Aother'
for code,en,zh,tab,pg,names in [('WYE','Wye','相对地相关测量值',25,'25–26',['phsA','phsB','phsC','neut','net','res']),('DEL','Delta','相对相相关测量值',26,'26–27',['phsAB','phsBC','phsCA'])]:
 angle_domain=ANG+(' / 0' if code=='DEL' else '')
 cdc(code,en,zh,'measurement',tab,pg,'同时刻的三相量集合；WYE/DEL 是结构标识，不能据此推断实际一次绕组接线。',rows('\n'.join(f'{n}|CMV（子 DO）|由子类决定|由子类决定|cVal、q、t 等|GC_1|对应相/线量' for n in names))+rows(f'angRef|ENUMERATED|CF|—|{angle_domain}|O|集合统一角度参考'),'子 CMV 不再使用自己的 angRef，使用集合的 angRef；所有成员 t 相同。WYE.neut 为中性线量；res 为相电流代数和；net 还包含中性线电流，符号方向须一致。原表 DEL 额外列 0，WYE 未列；应核对所用版本与模板。')
cdc('SEQ','Sequence','顺序值/序分量','measurement',27,'27','把三相量变换为序分量或直交轴分量。不是按时间排列的事件序列。',rows('''c1|CMV（子 DO）|由子类决定|由子类决定|序分量|M|第 1 分量
c2|CMV（子 DO）|由子类决定|由子类决定|序分量|M|第 2 分量
c3|CMV（子 DO）|由子类决定|由子类决定|序分量|M|第 3 分量
seqT|ENUMERATED|MX|—|pos-neg-zero / dir-quad-zero|M|决定 c1/c2/c3 的语义
phsRef|ENUMERATED|CF|—|A / B / C / 扩展|O|变换参考相'''),'pos-neg-zero → 正序/负序/零序；dir-quad-zero → 直轴/交轴/零轴。三个 CMV 的 t 相同；正常对称三相通常正序为主，负序/零序的解释还需测量与接线证据。')
for code,en,zh,tab,pg,names in [('HMV','Harmonic Measured Value','谐波值',28,'28',['har']),('HWYE','Harmonic Wye','WYE 谐波值',29,'29',['phsAHar','phsBHar','phsCHar','neutHar','netHar','resHar']),('HDEL','Harmonic Delta','DEL 谐波值',30,'30–31',['phsABHar','phsBCHar','phsCAHar'])]:
 f=qt('MX')+rows('\n'.join(f'{n}|ARRAY[0…numHar] OF Vector|MX|dchg, dupd|每项为模/幅角|'+('M' if k==0 else 'O')+'|对应量的谱分量' for k,n in enumerate(names)))
 f+=rows('''numHar|INT16U|CF|—|1…65535，还受分析能力限制|M|谱数组最大索引
numCyc|INT16U|CF|—|1…65535|M|分析窗口工频周期数
evalTm|INT16U|CF|—|ms|M|分析/估计时间窗
units|Unit|CF|—|附录 A|O|模的单位
smpRate|INT32U|CF|—|每周期采样次数；直流为每秒|O|限制可分析的最高频率
frequency|FLOAT32|CF|—|基频，Hz|M|额定或分析基频
hvRef|ENUMERATED|CF|—|fundamental / rms / absolute|O|模相对基波/有效值/绝对量
rmsCyc|'''+('INT16U' if code=='HDEL' else 'INT32U')+'''|CF|—|有效值计算周波数|AC_RMS_M|hvRef=rms 时需要''')
 if code!='HMV':f+=rows(f'angRef|ENUMERATED|CF|—|{ANG}|O|相角基准')
 cdc(code,en,zh,'measurement',tab,pg,'描述谐波、分谐波或谐间波谱；谐波为基频整数倍，分谐波低于基频，谐间波非整数倍。',f,'数组下标 0 是直流分量；在单周期谐波条件下 1 是基波、2 是二次谐波。分析窗口变化时不能继续把所有下标等同谐波次数。原表 HDEL 用 numCycl/rmscyc，其他表用 numCyc/rmsCyc；仅注明差异，不改写源 SCD。')

def control(typ,state,domain,statedomain):
 return rows(f'ctlVal|{typ}|CO|—|{domain}|AC_CO_M|请求控制值\noperTm|TimeStamp|CO|—|绝对操作时间|AC_CO_O|预约操作时刻\norigin|Originator|CO, ST|—|orCat / orIdent|AC_CO_O|命令/最近变位的原发者\nctlNum|INT8U|CO, ST|—|0…255|AC_CO_O|同一命令序列标识\n{state}|'+('ValWithTrans' if state=='valWTr' else typ if typ!='CODED ENUM' else 'CODED ENUM')+f'|ST|dchg|{statedomain}|AC_ST|状态反馈')+qt(presence='AC_ST',tp='AC_ST')+rows('stSeld|BOOLEAN|ST|dchg|FALSE / TRUE|AC_CO_O|控制对象是否已被选择')
def ctlconfig(timeout='INT32U'):
 return rows(f'ctlModel|CtlModels|CF|—|五种控制模式|M|控制流程\nsboTimeout|{timeout}|CF|—|ms|AC_CO_O|选择有效时限\nsboClass|SboClasses|CF|—|operate-once / operate-many|AC_CO_O|操作后释放/保留选择')
for code,en,zh,tab,pg,typ,state,dom,sdom in [
('SPC','Controllable Single Point','可控的单点',32,'32','BOOLEAN','stVal','off(FALSE) / on(TRUE)','FALSE / TRUE'),
('DPC','Controllable Double Point','可控的双点',33,'33','BOOLEAN','stVal','off(FALSE) / on(TRUE)','intermediate-state / off / on / bad-state'),
('INC','Controllable Integer Status','可控的整数状态',34,'34','INT32','stVal','INT32 域与应用限制','INT32 域与 DO 语义'),
('BSC','Binary Controlled Step Position Information','二进制受控步位置信息',35,'35','CODED ENUM','valWTr','stop / lower / higher / reserved','posVal=−64…63；transInd=FALSE/TRUE'),
('ISC','Integer Controlled Step Position Information','整数受控步位置信息',36,'36','INT8','valWTr','−64…63，并受 minVal/maxVal 限制','posVal=−64…63；transInd=FALSE/TRUE')]:
 f=control(typ,state,dom,sdom)
 if code=='DPC':f[4][1]='CODED ENUM'
 subtyp='ValWithTrans' if state=='valWTr' else ('CODED ENUM' if code=='DPC' else typ)
 f+=subst(subtyp,fc='ST（原表）' if code in ['INC','BSC','ISC'] else 'SV')
 if code=='INC':
  for r in f:
   if r[0] in ['stVal','q','t']:r[5]='M'
 if code in ['SPC','DPC']:f+=rows('pulseConfig|PulseConfig|CF|—|cmdQual/onDur/offDur/numPls|AC_CO_O|控制输出脉冲配置')
 if code=='BSC':f+=rows('persistent|BOOLEAN|CF|—|FALSE 单步 / TRUE 持续|M|输出方式')
 f+=ctlconfig('INT8U' if code=='BSC' else 'INT32U')
 if code in ['INC','BSC','ISC']:
  it='INT32' if code=='INC' else 'INT8';ut='INT32U' if code=='INC' else 'INT8U'
  f+=rows(f'minVal|{it}|CF|—|允许最小值|O|控制范围下限\nmaxVal|{it}|CF|—|允许最大值|O|控制范围上限\nstepSize|{ut}|CF|—|1…(maxVal−minVal)|O|允许相邻值间隔')
 note={'SPC':'例如软件功能投入/退出；实际用途取决于 DO。','DPC':'ctlVal 是两态命令；stVal 是四态反馈。两者类型不同；命令成功响应和开关到位反馈必须区分。','INC':'例如整数目标模式；表 49 针对 INC 提到 ctlVal=0 的复位语义，需要具体对象支持，不能把任意整数控制都当计数器。原表 subVal 的 FC 印为 ST，与取代用途冲突；应回查适用模型。','BSC':'例如 lower/higher 调一档；persistent=TRUE 持续动作直到 stop 或当地超时。原表 sboTimeout=INT8U（其他类 INT32U），subVal 的 FC 印为 ST；应作为原版差异核对，不能照抄成通用 SCL。','ISC':'例如直接指定目标档位；反馈仍含过渡标志，区别于 BSC 的升/降方向命令。原表 subVal 的 FC 印为 ST，阅读取代用途时须核对适用模型。'}[code]
 cdc(code,en,zh,'control',tab,pg,'控制请求与状态反馈组成同一数据类，FC 把用途分开。',f,note)
cdc('APC','Controllable Analogue Set Point Information','可控模拟设点信息','control',38,'37–38','所给早期版的模拟设点和相关模拟信息。',rows('''setMag|AnalogueValue|SP, MX|dchg|类型域与 minVal/maxVal 限制|M|设点/反馈；原版双 FC
origin|Originator|SP, MX|—|原发者结构|O|来源
operTm|TimeStamp|SP|—|绝对时间|O|预约时刻
q|Quality|ST（原表）|qchg|品质类型|M|设点相关品质
t|TimeStamp|ST（原表）|—|时间戳|M|相关变化时间
ctlModel|CtlModels|CF|—|控制模式|M|控制行为
units|Unit|CF|—|附录 A|O|设点单位
sVC|ScaledValueConfig|CF|—|scaleFactor / offset|AC_SCAV|换算
minVal|AnalogueValue|CF|—|下限|O|设点范围
maxVal|AnalogueValue|CF|—|上限|O|设点范围
stepSize|INT32U（原表）|CF|—|1…(maxVal−minVal)|O|设点步长'''),'TISSUE 28 修订为 ctlVal/CO 命令和 mxVal/MX 反馈，并增加 ctlNum；不要把 APC 旧版 setMag/SP 直接写成现代工程。表 38 stepSize 印为 INT32U；后续修订使用 AnalogueValue，须以所用版次/模型为准。')
for code,en,zh,tab,pg,name,typ in [('SPG','Single Point Setting','单点定值',40,'39','setVal','BOOLEAN'),('ING','Integer Status Setting','整数状态定值',41,'39','setVal','INT32'),('ASG','Analogue Setting','模拟定值',43,'40','setMag','AnalogueValue')]:
 domain='FALSE / TRUE' if code=='SPG' else '类型允许域和工程定值限制'
 f=rows(f'{name}|{typ}|SP|—|{domain}|AC_NSG_M|无定值组时的定值\n{name}|{typ}|SG, SE|—|{domain}|AC_SG_M|有定值组时激活/编辑视图')
 if code=='ASG':f+=rows('units|Unit|CF|—|附录 A|O|定值单位\nsVC|ScaledValueConfig|CF|—|scaleFactor / offset|AC_SCAV|换算')
 if code!='SPG':f+=rows(f'minVal|{typ}|CF|—|下限|O|允许范围\nmaxVal|{typ}|CF|—|上限|O|允许范围\nstepSize|'+('INT32U' if code=='ING' else 'AnalogueValue')+'|CF|—|1…(maxVal−minVal)，原表范围写法|O|允许相邻定值间隔')
 cdc(code,en,zh,'setting',tab,pg,'定义应用使用的参数；例如功能开关、整数配置、保护阈值。',f,'SP=Setpoint，在定值语境表示无组定值；SG=Setting Group 激活值，只读；SE=Setting Group Editable 编辑值，通过定值组流程写入。相同名称的多行是 FC 视图规则，不是简单复制同名 XML DA。')
f=[]
for fc,cond in [('SP','AC_NSG'),('SG, SE','AC_SG')]:
 f+=rows(f'setCharact|ENUMERATED|{fc}|—|1…48，16 保留|{cond}_M|曲线类型')
 f+=rows('\n'.join(f'setPar{a}|FLOAT32|{fc}|—|由选用曲线公式决定|{cond}_O|公式参数 {a}' for a in 'ABCDEF'))
cdc('CURVE','Setting Curve','定值曲线','setting',44,'41','以曲线类型加参数描述保护特性。',f,'所给表 44 的 SG/SE 分支仍误印 AC_NSG_M/O，本站标明按定值组逻辑解读为 AC_SG_M/O，保留原文差异说明。参数 A～F 没有统一单位或通用取值；标准化公式参数通常只读，自定义公式参数是否可改看实现。')
cdc('DPL','Device Name Plate','设备铭牌','description',46,'42','标识物理设备的供货信息。',rows('''vendor|VISIBLE STRING255|DC|—|供货方名称|M|厂商
hwRev|VISIBLE STRING255|DC|—|硬件版本|O|硬件修订
swRev|VISIBLE STRING255|DC|—|软件版本|O|软件修订
serNum|VISIBLE STRING255|DC|—|序列号|O|设备个体
model|VISIBLE STRING255|DC|—|产品名称|O|型号
location|VISIBLE STRING255|DC|—|安装位置|O|位置描述''')+COMMON[2:],'DPL 原表没有 d/dU 行；location 是描述文本，不能据厂商或型号推断保护功能。',common=False)
cdc('LPL','Logical Node Name Plate','逻辑节点铭牌','description',47,'43','描述逻辑节点及其定义来源；LLN0 还承载逻辑设备信息。',rows('''vendor|VISIBLE STRING255|DC|—|供货方|M|LN 实现供货方
swRev|VISIBLE STRING255|DC|—|软件版本|M|LN 软件修订
d|VISIBLE STRING255|DC|—|文本|M|LN 描述
dU|UNICODE STRING255|DC|—|Unicode 文本|M|LN 描述
configRev|VISIBLE STRING255|DC|—|用户定义修订标识|AC_LN0_M|LLN0 上语义相关配置变化标识
ldNs|VISIBLE STRING255|DC|—|只在 LLN0|AC_LN0_EX；表 47 印作 AC_LLNO_M|LD 命名空间
lnNs|VISIBLE STRING255|DC|—|LN 定义标识|AC_DLD_M|LN 命名空间''')+COMMON[2:],'configRev 的语义由用户定义；不同于报告/GOOSE 控制块 ConfRev，也不同于 SCL Header 的版本。原表条件代码拼写不一致，按第 5 章与第 7.2 节分别解释作用域与声明条件。',common=False)
cdc('CSD','Curve Shape Description','曲线形状描述','description',48,'43','以点对数组提供曲线的实际形状，和 CURVE 的类型/公式参数互补。',rows('''xUnit|Unit|DC|—|附录 A|M|横轴单位
xD|VISIBLE STRING255|DC|—|轴语义文本|M|横轴表示什么量
yUnit|Unit|DC|—|附录 A|M|纵轴单位
yD|VISIBLE STRING255|DC|—|轴语义文本|M|纵轴表示什么量
numPts|INT16U|DC|—|2…65535|M|点数
crvPts|ARRAY[1…numPts] OF Point|原表未填；描述上下文|—|xVal/yVal 为 FLOAT32|M|点对数组
d|VISIBLE STRING255|DC|—|文本|M|整体描述
dU|UNICODE STRING255|DC|—|Unicode 文本|M|整体描述''')+COMMON[2:],'知道 (x,y) 点还不等于知道插值算法、边界外处理或保护时限；这些必须另查应用定义。表 49 yUnit 说明误写“x 轴”，本站按表 48 和属性含义解释为 y 轴。',common=False)

# Table 49 uses contextual repeated entries; dictionary gives one anchor per name.
DICTIONARY = {}
def define(names,meaning):
 for n in names.split():DICTIONARY[n]=meaning
define('actVal','当前累计整数计数；BCR 的计量值须乘 pulsQty，不能把计数直接当电能。')
define('addInfo','SEC 最近安全违例的附加说明文本。')
define('addr','SEC 导致计数增加的远端地址；可能是应用、IP 或链路地址，形式由映射决定。')
define('angRef','相角的参考量。CMV 与 WYE/DEL 的允许域不同；集合使用统一参考。谐波通常相对于基波。')
define('angSVC','角度整数/浮点表示的换算配置。表 23 拼作 angleSVC；以实际 DAType 为准。')
define('c1','SEQ 第 1 分量：seqT=pos-neg-zero 为正序，dir-quad-zero 为直轴。')
define('c2','SEQ 第 2 分量：负序或交轴，取决于 seqT。')
define('c3','SEQ 第 3 分量：零序或零轴，取决于 seqT。')
define('cdcName','CDC 名称，与 cdcNs 共同标识定义；DOType@cdc 是 SCL 类别，需和扩展声明区分。')
define('cdcNs','CDC 属性结构的定义来源；结构超出上级定义时显式声明，不是 XML xmlns。')
define('cnt','SEC 的安全违例计数值，INT32U；最近事件说明与累计计数并读。')
define('configRev','LPL 配置修订标识；当 LLN0 所属 LD 与客户功能有关的模型语义变化时需要改变；格式与检测办法由用户定义。')
define('crvPts','CSD 曲线点数组；每个 Point 含 xVal、yVal；编号从 1 至 numPts。')
define('ctlModel','控制流程的模式。status-only 不含命令值；无状态反馈的早期控制实例仅允许 normal-security 两种模式。')
define('ctlNum','控制序列号 0…255；同一序列服务使用同一号，服务器在响应和相关状态变化报告中带回；不是全局唯一编号。')
define('ctlVal','命令目标；SPC/DPC 为布尔，INC 为整数，BSC 为 stop/lower/higher，ISC 为目标位置；不能与状态反馈混同。INC 的 0 复位语义须结合 DO。')
define('cVal','复数死区值。模和角度分别从 instCVal 计算死区；Vector 的 mag/ang 再展开到 i/f。')
define('d','文字描述；LPL 中描述 LN。文字不取代标准 DO 定义。')
define('dataNs','DO 语义的定义来源；与上级 LN/LD 定义不同才需按条件声明。')
define('db','死区配置：所给表 49 为量程差的 0.001% 单位；绝对阈值=(max−min)×db/100000。积分算法有时间量纲；不能直接套用静态差值算法。')
define('dirGeneral','保护总体方向；分相方向不同时可为 both。方向参考由功能定义。')
define('dirNeut','接地/中性线相关保护方向；分量允许 unknown/forward/backward。')
for x in 'ABC':define('dirPhs'+x,x+' 相保护方向；与同相激活标志配对。')
define('dU','Unicode 文字描述，可写中文；与 d 是编码/表现差异。')
define('evalTm','谐波/谐间波计算或估计窗口，ms；先换为秒才可与 Hz 相乘。')
define('frEna','BCR 冻结使能；TRUE 按 strTm、frPd、frRs 冻结，FALSE 停止冻结。')
define('frequency','额定/分析基频，Hz；例如 50 Hz 周期为 20 ms，60 Hz 为约 16.67 ms。')
define('frPd','冻结间隔，ms；0 表示仅在 strTm 做一次冻结。原表类型 INT32，但负周期没有业务意义。')
define('frRs','每次冻结后是否将累计计数复零；FALSE 保持累计，TRUE 重新累计。')
define('frTm','最近冻结时刻，区别于当前计数的 t 与计划起点 strTm。')
define('frVal','冻结快照的计数，保持到下一次冻结；即使数值相同也可能有 dupd 更新事件。')
define('general','相事件的逻辑或汇总：一个相关相启动/动作即可使总标志成立；具体启动/动作语义由 DO 定义。')
define('har','谱数组：0 直流；单周期条件下其余索引对应基波与高次谐波；长窗口/谐间波时索引与频率间隔须重解。')
define('hvRef','谐波模采用基波相对值 fundamental、有效值相对值 rms 或绝对值 absolute；rms 需要 rmsCyc。')
define('hwRev','设备硬件修订信息。')
define('instCVal','即时相量 Vector；cVal 是按死区更新的相量。这里“即时”不表示它是 SAV 每个瞬时波形采样。')
define('instMag','即时测量值或采样模拟量；不同 CDC 的时间/滤波语义需结合 MV 或 SAV 判断。')
define('ldNs','LPL 在 LLN0 中声明 LD 默认定义来源。')
define('lnNs','LN 定义不同于 LD 默认来源时的显式声明。')
define('location','设备安装位置的描述文本。')
define('mag','MV 中为按死区更新的幅值；Vector.mag 中为相量的模。属性路径与父类型决定语义。')
define('magSVC','Vector 模的整数/浮点换算配置。')
define('max','过程测量上限；超过时按范围品质规则置 outOfRange/questionable；与命令上限 maxVal 区分。')
define('maxVal','控制/定值可接受范围上限；结合 minVal、stepSize 和具体 CDC 的类型。')
define('min','过程测量下限；低于时按范围品质规则处理。')
define('minVal','控制/定值可接受范围下限。')
define('model','供货方特定产品名称。')
define('net','净电流：相电流代数和加中性线电流；必须统一参考方向，不能直接相加模的数值。')
define('netHar','净电流的谱数组，结构同 har。')
define('neut','WYE 中为中性线 CMV；ACT/ACD 中为接地/中性线相关启动或动作 BOOLEAN。同名不保证同型。')
define('neutHar','中性线量的谱数组。')
define('numCyc','分析窗口的工频周波数；表 HDEL 与表 49 公式还出现 numCycl 写法。')
define('numHar','返回谱数组的最高索引，>0；表 49 给出最高分析范围公式，但采样单位、evalTm(ms)、numCyc/numCycl 有歧义，不能未经版次核准当成可执行计算式。')
define('numPts','CSD 点数，>1；须与 crvPts 的长度对应。')
define('operTm','控制类：TimeActivatedOperate 的绝对执行时刻；ACT：选相合分的操作时间，原表 17 写 operTim。不是事件时标 t。')
define('origin','可控值最近变化/命令请求的原发者，包含 orCat 和 orIdent；不等于 IED 的设备名称。')
define('persistent','BSC FALSE 每次升/降一步；TRUE 持续输出直到 stop 或当地超时；重复 Operate 可重新触发，行为按实现。')
for x in 'ABC':define('phs'+x,'WYE 中为 '+x+' 相 CMV，集合成员同时采集/确定；ACT/ACD 中为 '+x+' 相启动/动作布尔标志。')
for x in ['AB','BC','CA']:define('phs'+x,'DEL 中的 '+x+' 相间 CMV；三个成员对应同一采集/确定时间。')
for x in ['A','B','C','AB','BC','CA']:define('phs'+x+'Har',x+' 相或相间量的谱数组，数组元素为 Vector；索引规则同 har。')
define('phsRef','三相量到序分量变换所用的参考相 A/B/C。')
define('pulseConfig','命令输出的脉冲/持续方式；cmdQual、onDur、offDur、numPls 定义输出时序。不是 GOOSE 重传参数。')
define('pulsQty','每个 BCR 计数单位对应的工程量；当前量=actVal×pulsQty，冻结量=frVal×pulsQty。表 49 属性名误印 pulseQty。')
define('q','相关值的品质；覆盖范围由 CDC 决定，SEC 无 q，复合 WYE/DEL/SEQ 从子 CMV 读取 q。')
define('range','normal/high/low/high-high/low-low 的区间状态；跨区变化可触发事件，超 min/max 还要看品质，high-high 本身未必无效。')
define('rangeC','range 使用的六个边界：hhLim/hLim/lLim/llLim/min/max。')
define('res','剩余电流：相电流的代数和；不含中性线项，区别于 net。')
define('resHar','剩余电流的谱数组。')
define('rmsCyc','用于计算有效值 RMS 的工频周波数；hvRef=rms 时必须提供。')
define('sboClass','选择后操作一次即释放 operate-once，或操作后在超时前保持选择 operate-many。')
define('sboTimeout','操作前选择保留时限，ms；过期后不能继续使用旧选择。')
define('seqT','pos-neg-zero：c1 正序、c2 负序、c3 零序；dir-quad-zero：直轴、交轴、零轴。')
define('serNum','设备个体序列号，不是网络帧序号。')
define('setCharact','曲线选择：1…15 标准化特性；16 保留；17…32 自定义公式；33…48 点对定义。不是每种曲线共用同一组参数。')
for x in 'ABCDEF':define('setPar'+x,'CURVE 所选公式的参数 '+x+'；数值、单位和是否可写依赖该公式，不可从字段名推断。')
define('setMag','模拟定值/设点；ASG 为参数，早期 APC 为设点与反馈（存在后续勘误）；需通过父 CDC 和 FC 区分。')
define('setVal','SPG/ING 状态定值，分别是 BOOLEAN/INT32；不要与 stVal 当前状态混用。')
define('sev','最近安全违例严重性 unknown/critical/major/minor/warning；是分级标签，不是厂商告警数字的通用映射。')
define('smpRate','测量/谱计算的采样速率；早期表 49 在交流描述为每额定周期样本数，直流为每秒。原表谐波行还写最小值 2×frequency，与交流每周期单位有解释冲突；不直接套算工程值。与 SVCB 的 SmpRate 和 smpMod 分开核对。')
define('stepSize','允许相邻命令/定值之间的步长；INC/ING、BSC/ISC、ASG 的类型不同。不能把 FLOAT32 精度当步长。')
define('strTm','BCR 冻结计划的起始时间；已过起点时，周期冻结沿起点的 frPd 网格进入下一个间隔。')
define('stSeld','对象是否处于已选择状态，BOOLEAN；它不是控制模式 ctlModel。')
define('stVal','当前状态；SPS 为布尔，DPS 为四态，INS 为整数；DPC 的 stVal 和 ctlVal 不同型。')
define('subCVal','CMV 的取代值，语义替换 instCVal；原表 23 类型与表 49 语义不一致，核对 Vector 实现。')
define('subEna','取代使能；FALSE 使用过程来源，TRUE 使用预先准备的取代值/品质；宜先设值和 subQ，再使能。')
define('subID','取代设备的标识/地址；未使能或未知时为 NULL。')
define('subMag','MV 替换 instMag 的值；mag 的死区过程需继续按应用规则处理。')
define('subQ','取代用的品质；被取代不必是 invalid，但 source 应体现 substituted。')
define('subVal','SPS/DPS/INS/SPC/DPC/INC 替换 stVal；BSC/ISC 替换 valWTr。原表 49 重复 ISC 且漏印 INC，不按错行推断类型。')
define('sVC','AnalogueValue 的换算配置；f=i×scaleFactor+offset。原表 49 的 subVal/setVal 泛称与具体模拟类 subMag/setMag 分开核对。')
define('swRev','软件版本信息；不是 SCL 根元素的 version/revision/release。')
define('t','相关值的时间戳；状态对应变位、测量对应相关更新，BCR 当前计数用 t 而冻结另有 frTm。原表 49 t 行误抄品质措辞，按 TimeStamp 类型解读。')
define('units','数值/模的工程单位及倍率；不用于 Vector.ang（角度为度）；曲线横纵轴分别用 xUnit/yUnit。')
define('valWTr','步位置结构，含 posVal 与 transInd；过渡标志不能被误读为稳定到位。')
define('vendor','供货方名称；不凭名称推断设备支持的功能或标准版次。')
define('xD','CSD 横轴的语义描述，说明横坐标表示什么量。')
define('xUnit','CSD 横轴单位和倍率。')
define('yD','CSD 纵轴的语义描述。')
define('yUnit','CSD 纵轴单位；表 49 误写 x 轴，按表 48 的字段角色解释。')
define('zeroDb','零点附近强制归零的阈值；0…100000，每单位为量程差的 0.001%。MV 用于 mag，CMV 用于 cVal.mag。')

CURVES=['ANSI 极端反时限','ANSI 非常反时限','ANSI 一般反时限','ANSI 中等反时限','ANSI 定时限（缺省定时限过流）','长时间极端反时限','长时间非常反时限','长时间反时限','IEC 一般反时限','IEC 非常反时限','IEC 反时限','IEC 极端反时限','IEC 短时间反时限','IEC 长时间反时限','IEC 定时限','保留']
