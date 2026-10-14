"""Curated class roster / scan table locations for DL/T 860.74-2006 (IEC 2003)."""
# Class | Chinese function | English function gloss | PDF page | table top y at 1205 px
ROSTER_TEXT='''LPHD|物理设备信息|Physical device information|15|763
COMMON|公用逻辑节点信息|Common logical node information|16|188
LLN0|逻辑节点零|Logical node zero|16|1322
PDIF|差动保护|Differential protection|19|964
PDIR|方向比较|Directional comparison|20|736
PDIS|距离保护|Distance protection|20|1356
PDOP|方向过功率|Directional overpower|22|180
PDUP|方向欠功率|Directional underpower|22|890
PFRC|频率变化率|Rate of change of frequency|23|180
PHAR|谐波制动|Harmonic restraint|23|952
PHIZ|接地检测|Earth fault detection|24|272
PIOC|瞬时过电流|Instantaneous overcurrent|24|1015
PMRI|禁止电动机重新启动|Motor restart inhibition|25|180
PMSS|电动机启动时间监视|Motor starting supervision|25|1035
POPF|过功率因数|Over power factor|26|300
PPAM|相角测量保护|Phase angle measuring protection|26|1120
PSCH|保护配置|Protection scheme|27|320
PSDE|灵敏方向接地故障|Sensitive directional earth fault|28|375
PTEF|瞬时接地故障|Transient earth fault|28|1115
PTOC|延时过电流|Time overcurrent|29|375
PTOF|过频率|Overfrequency|29|1345
PTOV|过电压|Overvoltage|30|875
PTRC|保护跳闸条件|Protection trip conditioning|31|300
PTTR|过热保护|Thermal overload|31|1060
PTUC|欠电流|Undercurrent|32|1160
PTUV|欠电压|Undervoltage|33|815
PUPF|欠功率因数|Under power factor|34|315
PTUF|欠频率|Underfrequency|34|1175
PVOC|电压闭锁延时过电流|Voltage controlled time overcurrent|35|620
PVPH|电压频率保护|Volts per hertz|36|188
PZSU|零速或欠速|Zero speed or underspeed|36|1068
RDRE|扰动记录功能|Disturbance recorder|37|920
RADR|扰动记录模拟通道|Analogue disturbance channel|38|1145
RBDR|扰动记录状态量通道|Binary disturbance channel|39|772
RDRS|扰动记录处理|Disturbance record handling|40|185
RBRF|断路器失灵|Breaker failure|40|660
RDIR|方向元件|Directional element|41|180
RFLO|故障定位|Fault location|41|1040
RPSB|电网振荡检测与闭锁|Power swing detection and blocking|42|1090
RREC|自动重合闸|Auto reclosing|43|870
RSYN|同步检查与同步调节|Synchronism check and synchronising|44|340
CALH|告警处理|Alarm handling|45|685
CCGR|冷却组控制|Cooling group control|45|1190
CILO|联锁|Interlocking|46|1230
CPOW|定点分合|Point on wave switching|47|405
CSWI|开关控制器|Switch controller|47|1160
GAPC|通用自动过程控制|Generic automatic process control|48|685
GGIO|通用过程输入输出|Generic process input output|49|185
GSAL|通用安全应用|Generic security application|49|1070
IARC|存档|Archiving|50|308
IHMI|人机接口|Human machine interface|50|1040
ITCI|远方控制接口|Telecontrol interface|50|1380
ITMI|远方监视接口|Telemonitoring interface|51|280
ANCR|中性点电流调节|Neutral current regulation|51|1040
ARCO|无功控制|Reactive power control|52|275
ATCC|自动分接开关控制|Automatic tap changer control|52|985
AVCO|电压控制|Voltage control|54|180
MDIF|差动测量|Differential measurement|55|180
MHAI|相别有关谐波与间谐波|Phase related harmonics and interharmonics|55|1360
MHAN|相别无关谐波与间谐波|Non phase related harmonics and interharmonics|57|1030
MMTR|计量|Metering|59|282
MMXN|相别无关测量|Non phase related measurement|59|1188
MMXU|三相测量|Three phase measurement|60|859
MSQI|相序与不平衡|Sequence and imbalance|61|672
MSTA|计量统计|Measurement statistics|62|348
SARC|电弧监视与诊断|Arc monitoring and diagnostics|63|598
SIMG|气体绝缘介质监视|Gas insulation monitoring|63|1352
SIML|液体绝缘介质监视|Liquid insulation monitoring|64|1138
SPDC|局部放电监视与诊断|Partial discharge monitoring|65|1115
XCBR|断路器|Circuit breaker|66|422
XSWI|开关设备|Switch|67|210
TCTR|电流互感器|Current transformer|67|1166
TVTR|电压互感器|Voltage transformer|68|708
YEFN|接地故障中性点补偿|Earth fault neutral compensation|69|180
YLTC|分接开关|Load tap changer|69|843
YPSH|功率分流|Power shunt|70|286
YPTR|电力变压器|Power transformer|70|1025
ZAXN|辅助电源|Auxiliary network|71|786
ZBAT|电池|Battery|71|1376
ZBSH|套管|Bushing|73|180
ZCAB|电力电缆|Power cable|73|590
ZCAP|电容器组|Capacitor bank|73|1078
ZCON|转换器|Converter|74|270
ZGEN|发电机|Generator|74|782
ZGIL|气体绝缘线路|Gas insulated line|75|1057
ZLIN|电力架空线|Power overhead line|76|188
ZMOT|电动机|Motor|76|694
ZREA|电抗器|Reactor|76|1462
ZRRC|旋转无功元件|Rotating reactive component|77|708
ZSAR|浪涌抑制器|Surge arrester|77|1287
ZTCF|晶闸管控制频率转换器|Thyristor controlled frequency converter|78|623
ZTCR|晶闸管控制无功元件|Thyristor controlled reactive component|78|1213'''
ROSTER=[]
for row in ROSTER_TEXT.splitlines():
    name,zh,en,page,y=row.split('|');ROSTER.append(dict(name=name,zh=zh,en=en,page=int(page),y=int(y)))
GROUPS={'L':('系统逻辑节点','ln-system','5.3'),'P':('保护功能','ln-protection','5.4'),'R':('保护相关功能','ln-protection-related','5.5'),'C':('控制','ln-control-generic','5.6'),'G':('通用功能引用','ln-control-generic','5.7'),'I':('接口与存档','ln-control-generic','5.8'),'A':('自动控制','ln-automatic','5.9'),'M':('计量与测量','ln-measurement','5.10'),'S':('传感器与监视','ln-monitoring-equipment','5.11'),'X':('开关设备','ln-switch-transformer','5.12'),'T':('仪用互感器','ln-switch-transformer','5.13'),'Y':('电力变压器及相关功能','ln-switch-transformer','5.14'),'Z':('其他电力设备','ln-monitoring-equipment','5.15')}
# Verified names in chapter 4, in printed order. Tm includes four subordinate unit suffixes.
ABBR_NAMES={
6:'A Acs ACSI Acu Age Alm',
7:'Amp An Ang Auth Auto Aux Av B Bat Beh Bin Blk Bnd Bo Cap Capac Car CB CDC CE Cf Cfg CG Ch Cha Chg Chk Chr Cir Clc Clk Cls Cnt Col Cor Crd Crv CT Ctl Ctr Cyc Dea Den',
8:'Det DExt Diag Dif Dir Dis Dl Dlt Dmd Dn DPCSO DQ0 Drag Drv DS Dsch Dur EC EE EF Ena Eq Ev Ex Exc Excl Ext FA Fact Fan Flt Flw FPF Fu Fwd Gen Gn Gnd Gr Grd Gri H H2',
9:'H2O Ha Hi HP Hz IEEE Imb Imp In Ina Incr Ind Inh Ins Int ISCSO km L LD LDC LDCR LDCX LDCZ LED Len Lev Lg Lim Lin Liv LN Lo LO Loc Lod Lok Los Lst LTC m M/O Max Mem',
10:'Min Mod Mot ms Mst MT N Nam Net Ng Nom Num Ofs Op Opn Out Ov Pa Par Pct Per PF Ph Phy Pls Plt Pmp Po Pol Pos POW PP PPV Pres Prg Pri Pro Ps Pst Pwr Qty R R0',
11:'R1 Rat Rcd Rch Rcl Re React Rec Red Rel Rem Res Ris Rl Rms Rot Rs Rsl Rst Rsv Rte Rtg Rv Rx S1 S2 Sch SCO SCSM Sec Seq Set Sh Spd SPl SPCSO Src St Stat Stop Std Str Sts',
12:'Sup Svc Sw Swg Syn Tap Td Tdf Test Thd Thm TiF Tm Tmh Tmm Tms Tmms Tmp To Tot TP Tr Trg Ts Tu Tx Typ Un V VA Vac Val Var Vlv Vol VT W Wac Watt Wei Wh Wid Win',
13:'Wrm X0 X1 Z Z0 Z1 Zer Zn Zro'}
