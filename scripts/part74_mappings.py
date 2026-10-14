"""Historical 7-5 requirement to this 7-4 model relationships from tables 3-8."""
PROTECTION_TEXT='''瞬时接地|—|PTEF|PTEF|补偿接地示例见 B.1
方向接地故障功率保护|—|PWDE|PSDE|按灵敏方向接地模型说明
零速和欠速|14|PZSU|PZSU|同类功能
距离|21|PDIS|PDIS / PSCH|各区间单独实例，方案协调另用 PSCH
电压频率|24|PVPH|PVPH|电压与频率的关系
定时欠电压|27|PTUV|PTUV|欠量门槛与延时
方向/反向功率|32|PDPR|PDOP / PDUP|方向模式决定反向用途
欠电流/欠功率|37|PUCP|PTUC / PDUP|根据实际受监视量拆分
失磁和欠励|40|PUEX|PDUP|原表以方向欠功率建模
反相或相平衡电流|46|PPBR|PTOC|结合序电流或负序/正序关系
相序电压|47|PPBV|PTOV|结合三相信息与处理
过热|49|PTTR|PTTR|热模型
转子过热|49R|PROL|PTTR|相同类的特定用途
定子过热|49S|PSOL|PTTR|相同类的特定用途
瞬时过电流或上升率|50|PIOC|PIOC|瞬时过流功能
交流定时过电流|51|PTOC|PTOC|门槛与延时
电压控制或反时限过电流|51V|PVOC|PVOC|电压/电流特性与延时
功率因数|55|PPFR|POPF / PUPF|过量和欠量拆分
定时过电压|59|PTOV|PTOV|过量门槛与延时
直流过电压|59DC|PDOV|PTOV|原表合并交流/直流用途
电压或电流平衡|60|PVCB|PTOV / PTOC|按电压/电流范围建模
接地故障/接地检测|64|PHIZ|PHIZ|测量原理按节点说明
转子接地|64R|PREF|PTOC|定时过流功能实例
定子接地|64S|PSEF|PTOC|定时过流功能实例
匝间故障|64W|PITF|PTOC|定时过流功能实例
交流方向过电流|67|PDOC|PTOC|结合方向信息
方向接地故障|67N|PDEF|PTOC|结合接地/方向信息
直流定时过电流|76|PDCO|PTOC|原表同时适用于交流/直流
相角或失步|78|PPAM|PPAM|相角条件
频率|81|PFRQ|PTOF / PTUF / PFRC|过频、欠频与变化率拆分
高频或纵联保护|85|RCPW|PSCH|方案协调取代旧要求名
差动|87|PDIF|PDIF|按保护范围/测量输入具体化
比相|87P|PPDF|PDIF|原表按差动类建模
线路差动|87L|PLDF|PDIF|同一类的线路用途
零序差动|87N|PNDF|PDIF|同一类的序分量用途
变压器差动|87T|PTDF|PDIF / PHAR|差动与谐波制动分开
母线差动|87B|PBDF|PDIF / PDIR|差动或方向比较原理
电动机差动|87M|PMDF|PDIF|同一类的电动机用途
发电机差动|87G|PGDF|PDIF|同一类的发电机用途
电动机启动|49R, 66, 48, 51LR|PMSU|PMRI / PMSS|启动禁止与时间监视分开'''
PROTECTION=[row.split('|') for row in PROTECTION_TEXT.splitlines()]
OTHER=[
('表 4 / PDF 37','高频/纵联','RCPW','PSCH','方案协调模型'),
('表 4 / PDF 37','方向元件','—','RDIR','与 P 组节点组合，需要时独立实例化'),
('表 4 / PDF 37','扰动记录采集','RDRE','RDRE / RADR / RBDR','共同功能、模拟通道、状态通道分开'),
('表 4 / PDF 37','其他保护相关','R…','R…','原表标示 1:1 关系'),
('表 5 / PDF 45','变压器含冷却系统','YPTR','CCGR','冷却控制从变压器本体功能分开'),
('表 5 / PDF 45','分接开关调节控制器','CTCC','ATCC','自动控制模型'),
('表 6 / PDF 51','自动分接开关调节','—','ATCC','回引表 5'),
('表 6 / PDF 51','同步切换','AsySw / CPBC','CPOW','按定点分合建模，原表保留旧功能标签'),
('表 6 / PDF 51','零电压跳闸','AZVT','PTUV','需要区分暂态电压降零与线路永久断开，适当延时'),
('表 7 / PDF 54','测量','MMXU','MMXU / MMXN','三相与相别无关/单相'),
('表 7 / PDF 54','计量','MMTR','MMTR / MSTA','累计计量量与统计分别表示'),
('表 7 / PDF 54','谐波/间谐波','MHAI','MHAI / MHAN','三相与相别无关/单相'),
('表 7 / PDF 54','差动测量','—','MDIF','保护所用计算/测量数据'),
('表 8 / PDF 63','绝缘介质监视','SIMS','SIML / SIMG','液体（如油）与气体（如 SF6）分别建模')]
