(function(){const additions=[
  {
    "id": "lphd",
    "zh": "LPHD 物理设备信息",
    "en": "Physical device information",
    "aliases": [
      "LPHD",
      "物理设备信息"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 系统逻辑节点",
    "summary": "反映实际物理设备；PhyHealth 与外部一次设备 EEHealth、某功能的 Health 分开读取。Proxy 是该物理设备信息是否作为代理的声明。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-system.html#LPHD"
  },
  {
    "id": "lln0",
    "zh": "LLN0 逻辑节点零",
    "en": "Logical node zero",
    "aliases": [
      "LLN0",
      "逻辑节点零"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 系统逻辑节点",
    "summary": "逻辑设备的公共信息节点。SCL 用 LN0 元素承载 lnClass=LLN0；不是 lnClass=LN0。服务控制块位置需沿实际 SCD 核对。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-system.html#LLN0"
  },
  {
    "id": "pdif",
    "zh": "PDIF 差动保护",
    "en": "Differential protection",
    "aliases": [
      "PDIF",
      "差动保护"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护功能",
    "summary": "比较进入保护范围与流出保护范围的电流。区内故障可能出现差流；变比、极性、同步、励磁涌流及制动影响判定。原理不等于某厂家算法。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection.html#PDIF"
  },
  {
    "id": "pdir",
    "zh": "PDIR 方向比较",
    "en": "Directional comparison",
    "aliases": [
      "PDIR",
      "方向比较"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护功能",
    "summary": "比较多个方向信号形成保护决策，例如母线各间隔方向信息；它不同于单个方向元件 RDIR。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection.html#PDIR"
  },
  {
    "id": "pdis",
    "zh": "PDIS 距离保护",
    "en": "Distance protection",
    "aliases": [
      "PDIS",
      "距离保护"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护功能",
    "summary": "用测得的电压、电流计算阻抗并按阻抗平面区域判定。多段对应多个实例；不能仅凭 inst 编号推断实际整定范围。参考工程无 PDIS。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection.html#PDIS"
  },
  {
    "id": "pdop",
    "zh": "PDOP 方向过功率",
    "en": "Directional overpower",
    "aliases": [
      "PDOP",
      "方向过功率"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护功能",
    "summary": "方向过功率功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection.html#PDOP"
  },
  {
    "id": "pdup",
    "zh": "PDUP 方向欠功率",
    "en": "Directional underpower",
    "aliases": [
      "PDUP",
      "方向欠功率"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护功能",
    "summary": "方向欠功率功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection.html#PDUP"
  },
  {
    "id": "pfrc",
    "zh": "PFRC 频率变化率",
    "en": "Rate of change of frequency",
    "aliases": [
      "PFRC",
      "频率变化率"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护功能",
    "summary": "频率变化率功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection.html#PFRC"
  },
  {
    "id": "phar",
    "zh": "PHAR 谐波制动",
    "en": "Harmonic restraint",
    "aliases": [
      "PHAR",
      "谐波制动"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护功能",
    "summary": "谐波制动用于区分某些非故障过程与保护条件；它输出 Str 的含义应结合保护组合，不能把“谐波”自动等同于故障。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection.html#PHAR"
  },
  {
    "id": "phiz",
    "zh": "PHIZ 接地检测",
    "en": "Earth fault detection",
    "aliases": [
      "PHIZ",
      "接地检测"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护功能",
    "summary": "接地检测功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection.html#PHIZ"
  },
  {
    "id": "pioc",
    "zh": "PIOC 瞬时过电流",
    "en": "Instantaneous overcurrent",
    "aliases": [
      "PIOC",
      "瞬时过电流"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护功能",
    "summary": "瞬时过电流功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection.html#PIOC"
  },
  {
    "id": "pmri",
    "zh": "PMRI 禁止电动机重新启动",
    "en": "Motor restart inhibition",
    "aliases": [
      "PMRI",
      "禁止电动机重新启动"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护功能",
    "summary": "限制电动机重复启动，关注冷/热启动次数、温度与时间窗。原表 StrInhTmm 的 CDC 写 ISI，需与 7-3 INS 定义核版。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection.html#PMRI"
  },
  {
    "id": "pmss",
    "zh": "PMSS 电动机启动时间监视",
    "en": "Motor starting supervision",
    "aliases": [
      "PMSS",
      "电动机启动时间监视"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护功能",
    "summary": "监视启动电流与允许启动/堵转时间；与 PMRI 的再次启动许可分开。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection.html#PMSS"
  },
  {
    "id": "popf",
    "zh": "POPF 过功率因数",
    "en": "Over power factor",
    "aliases": [
      "POPF",
      "过功率因数"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护功能",
    "summary": "过功率因数功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection.html#POPF"
  },
  {
    "id": "ppam",
    "zh": "PPAM 相角测量保护",
    "en": "Phase angle measuring protection",
    "aliases": [
      "PPAM",
      "相角测量保护"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护功能",
    "summary": "相角测量保护功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection.html#PPAM"
  },
  {
    "id": "psch",
    "zh": "PSCH 保护配置",
    "en": "Protection scheme",
    "aliases": [
      "PSCH",
      "保护配置"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护功能",
    "summary": "协调线路两端保护信息。允许欠范围、允许超范围和闭锁是不同方案；原表 ProTx/ProRx 是瞬态 SPS，其他输出的 CDC 仍按表分别读取。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection.html#PSCH"
  },
  {
    "id": "psde",
    "zh": "PSDE 灵敏方向接地故障",
    "en": "Sensitive directional earth fault",
    "aliases": [
      "PSDE",
      "灵敏方向接地故障"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护功能",
    "summary": "检测灵敏方向接地故障，可观察残余电流；若用于跳闸，应核对策略和互感器性能。原表时间定值 StrDlTmms/OpDlTmms 列为 ASG，勿据名称擅自改 ING。 此表 Ang 为 U0 与 I0 间的相角，GndStr 为 3U0 门槛、GndOp 为 3I0 门槛；零序量与残余量的比例约定不能省略。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection.html#PSDE"
  },
  {
    "id": "ptef",
    "zh": "PTEF 瞬时接地故障",
    "en": "Transient earth fault",
    "aliases": [
      "PTEF",
      "瞬时接地故障"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护功能",
    "summary": "检测补偿网络接地故障产生的瞬态充电电流；Str 或 Op 至少一个出现（C）。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection.html#PTEF"
  },
  {
    "id": "ptoc",
    "zh": "PTOC 延时过电流",
    "en": "Time overcurrent",
    "aliases": [
      "PTOC",
      "延时过电流"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护功能",
    "summary": "延时过电流功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection.html#PTOC"
  },
  {
    "id": "ptof",
    "zh": "PTOF 过频率",
    "en": "Overfrequency",
    "aliases": [
      "PTOF",
      "过频率"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护功能",
    "summary": "过频率功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection.html#PTOF"
  },
  {
    "id": "ptov",
    "zh": "PTOV 过电压",
    "en": "Overvoltage",
    "aliases": [
      "PTOV",
      "过电压"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护功能",
    "summary": "过电压功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection.html#PTOV"
  },
  {
    "id": "ptrc",
    "zh": "PTRC 保护跳闸条件",
    "en": "Protection trip conditioning",
    "aliases": [
      "PTRC",
      "保护跳闸条件"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护功能",
    "summary": "汇集与调理保护动作，形成 Tr；可处理跳闸模式与最小脉冲等。Op 表示动作、Tr 表示送往断路器的跳闸条件，不能把每个 Op 都当成断路器已跳开。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection.html#PTRC"
  },
  {
    "id": "pttr",
    "zh": "PTTR 过热保护",
    "en": "Thermal overload",
    "aliases": [
      "PTTR",
      "过热保护"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护功能",
    "summary": "过热保护功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection.html#PTTR"
  },
  {
    "id": "ptuc",
    "zh": "PTUC 欠电流",
    "en": "Undercurrent",
    "aliases": [
      "PTUC",
      "欠电流"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护功能",
    "summary": "欠电流功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection.html#PTUC"
  },
  {
    "id": "ptuv",
    "zh": "PTUV 欠电压",
    "en": "Undervoltage",
    "aliases": [
      "PTUV",
      "欠电压"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护功能",
    "summary": "欠电压功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection.html#PTUV"
  },
  {
    "id": "pupf",
    "zh": "PUPF 欠功率因数",
    "en": "Under power factor",
    "aliases": [
      "PUPF",
      "欠功率因数"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护功能",
    "summary": "欠功率因数功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection.html#PUPF"
  },
  {
    "id": "ptuf",
    "zh": "PTUF 欠频率",
    "en": "Underfrequency",
    "aliases": [
      "PTUF",
      "欠频率"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护功能",
    "summary": "欠频率功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection.html#PTUF"
  },
  {
    "id": "pvoc",
    "zh": "PVOC 电压闭锁延时过电流",
    "en": "Voltage controlled time overcurrent",
    "aliases": [
      "PVOC",
      "电压闭锁延时过电流"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护功能",
    "summary": "电压闭锁延时过电流功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection.html#PVOC"
  },
  {
    "id": "pvph",
    "zh": "PVPH 电压频率保护",
    "en": "Volts per hertz",
    "aliases": [
      "PVPH",
      "电压频率保护"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护功能",
    "summary": "电压频率保护功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection.html#PVPH"
  },
  {
    "id": "pzsu",
    "zh": "PZSU 零速或欠速",
    "en": "Zero speed or underspeed",
    "aliases": [
      "PZSU",
      "零速或欠速"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护功能",
    "summary": "零速或欠速功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection.html#PZSU"
  },
  {
    "id": "rdre",
    "zh": "RDRE 扰动记录功能",
    "en": "Disturbance recorder",
    "aliases": [
      "RDRE",
      "扰动记录功能"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护相关功能",
    "summary": "共同记录参数与协调；RADR/RBDR 按通道实例化。原表文件数据只经 COMTRADE 访问；网页只解释文件与模型关系。 原表说明触发方式有关联：RDRE 为内部触发时，RADR/RBDR 也须内部触发；RDRE 为外部触发时，通道采用外部触发无扩展，采用内部触发可扩展外部触发模式。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection-related.html#RDRE"
  },
  {
    "id": "radr",
    "zh": "RADR 扰动记录模拟通道",
    "en": "Analogue disturbance channel",
    "aliases": [
      "RADR",
      "扰动记录模拟通道"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护相关功能",
    "summary": "模拟记录通道，通道编号与触发参数由此组织；原表“仅经过 COMTRADE 访问”不是名为 COMTRADE 的 DO。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection-related.html#RADR"
  },
  {
    "id": "rbdr",
    "zh": "RBDR 扰动记录状态量通道",
    "en": "Binary disturbance channel",
    "aliases": [
      "RBDR",
      "扰动记录状态量通道"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护相关功能",
    "summary": "状态记录通道；同样按通道实例化并与 RDRE 协调。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection-related.html#RBDR"
  },
  {
    "id": "rdrs",
    "zh": "RDRS 扰动记录处理",
    "en": "Disturbance record handling",
    "aliases": [
      "RDRS",
      "扰动记录处理"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护相关功能",
    "summary": "扰动记录处理功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection-related.html#RDRS"
  },
  {
    "id": "rbrf",
    "zh": "RBRF 断路器失灵",
    "en": "Breaker failure",
    "aliases": [
      "RBRF",
      "断路器失灵"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护相关功能",
    "summary": "保护发出跳闸后，检查电流和/或断路器状态是否按时响应，决定再跳本断路器或跳其他断路器。OpEx/OpIn 至少一个出现（C）。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection-related.html#RBRF"
  },
  {
    "id": "rdir",
    "zh": "RDIR 方向元件",
    "en": "Directional element",
    "aliases": [
      "RDIR",
      "方向元件"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护相关功能",
    "summary": "方向元件以极化参考量判方向；方向可由保护 Str 自带，只有需要独立元件或其定值时才另建 RDIR。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection-related.html#RDIR"
  },
  {
    "id": "rflo",
    "zh": "RFLO 故障定位",
    "en": "Fault location",
    "aliases": [
      "RFLO",
      "故障定位"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护相关功能",
    "summary": "提供故障阻抗和位置估算；位置不是实测地理坐标，不应凭电阻、电抗独立生成现场结论。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection-related.html#RFLO"
  },
  {
    "id": "rpsb",
    "zh": "RPSB 电网振荡检测与闭锁",
    "en": "Power swing detection and blocking",
    "aliases": [
      "RPSB",
      "电网振荡检测与闭锁"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护相关功能",
    "summary": "区分阻抗轨迹的电网振荡与故障。C1 对应检测用途（Str/BlkZn），C2 对应滑极用途（Op）；不能把 C1/C2 当数值枚举。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection-related.html#RPSB"
  },
  {
    "id": "rrec",
    "zh": "RREC 自动重合闸",
    "en": "Auto reclosing",
    "aliases": [
      "RREC",
      "自动重合闸"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护相关功能",
    "summary": "保护跳闸后的自动重合闸协调，涉及次数、间隔、复归、同期条件与闭锁；自动重合输出不代表物理断路器一定成功闭合。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection-related.html#RREC"
  },
  {
    "id": "rsyn",
    "zh": "RSYN 同步检查与同步调节",
    "en": "Synchronism check and synchronising",
    "aliases": [
      "RSYN",
      "同步检查与同步调节"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 保护相关功能",
    "summary": "检同期比对两侧电压、频率、相角；VInd/HzInd/AngInd 为 TRUE 是越限，不是“允许合闸”。Rel 才表达相关条件满足的释放信息。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-protection-related.html#RSYN"
  },
  {
    "id": "calh",
    "zh": "CALH 告警处理",
    "en": "Alarm handling",
    "aliases": [
      "CALH",
      "告警处理"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 控制",
    "summary": "告警处理功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-control-generic.html#CALH"
  },
  {
    "id": "ccgr",
    "zh": "CCGR 冷却组控制",
    "en": "Cooling group control",
    "aliases": [
      "CCGR",
      "冷却组控制"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 控制",
    "summary": "冷却组控制功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-control-generic.html#CCGR"
  },
  {
    "id": "cilo",
    "zh": "CILO 联锁",
    "en": "Interlocking",
    "aliases": [
      "CILO",
      "联锁"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 控制",
    "summary": "只表达联锁条件许可 EnaOpn/EnaCls。条件许可、设备闭锁、控制服务、物理动作是不同环节。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-control-generic.html#CILO"
  },
  {
    "id": "cpow",
    "zh": "CPOW 定点分合",
    "en": "Point on wave switching",
    "aliases": [
      "CPOW",
      "定点分合"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 控制",
    "summary": "在交流波形选定时刻执行分合，用于控制开断/合闸过程；须结合开关机构延时，不能把逻辑时刻当成实际触头时刻。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-control-generic.html#CPOW"
  },
  {
    "id": "cswi",
    "zh": "CSWI 开关控制器",
    "en": "Switch controller",
    "aliases": [
      "CSWI",
      "开关控制器"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 控制",
    "summary": "代表开关控制功能，Pos 用 DPC；可按相提供 PosA/B/C。联锁检查由 CILO 表达，过程设备由 XCBR/XSWI 表达。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-control-generic.html#CSWI"
  },
  {
    "id": "gapc",
    "zh": "GAPC 通用自动过程控制",
    "en": "Generic automatic process control",
    "aliases": [
      "GAPC",
      "通用自动过程控制"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 通用功能引用",
    "summary": "通用自动过程控制功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-control-generic.html#GAPC"
  },
  {
    "id": "ggio",
    "zh": "GGIO 通用过程输入输出",
    "en": "Generic process input output",
    "aliases": [
      "GGIO",
      "通用过程输入输出"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 通用功能引用",
    "summary": "标准专用功能不足或过程 I/O 映射时的通用模型。Ind/Alm/AnIn 等必须结合实际 desc、配置绑定与文档解释；不能从厂家名猜业务。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-control-generic.html#GGIO"
  },
  {
    "id": "gsal",
    "zh": "GSAL 通用安全应用",
    "en": "Generic security application",
    "aliases": [
      "GSAL",
      "通用安全应用"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 通用功能引用",
    "summary": "授权、访问控制、服务权限和未激活关联的安全监视；这些计数不等于安全机制已经启用或符合某安全规范。原表 SvcVoil 与表 9 SvcViol 拼写不同。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-control-generic.html#GSAL"
  },
  {
    "id": "iarc",
    "zh": "IARC 存档",
    "en": "Archiving",
    "aliases": [
      "IARC",
      "存档"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 接口与存档",
    "summary": "存档能力、存储占用、溢出与控制；状态与容量阈值不同。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-control-generic.html#IARC"
  },
  {
    "id": "ihmi",
    "zh": "IHMI 人机接口",
    "en": "Human machine interface",
    "aliases": [
      "IHMI",
      "人机接口"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 接口与存档",
    "summary": "人机接口功能边界。本版仅公用信息，不应自行补一套 HMI 命令对象作为标准必备项。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-control-generic.html#IHMI"
  },
  {
    "id": "itci",
    "zh": "ITCI 远方控制接口",
    "en": "Telecontrol interface",
    "aliases": [
      "ITCI",
      "远方控制接口"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 接口与存档",
    "summary": "远方控制接口边界；本版表仅公用信息，具体服务见 7-2。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-control-generic.html#ITCI"
  },
  {
    "id": "itmi",
    "zh": "ITMI 远方监视接口",
    "en": "Telemonitoring interface",
    "aliases": [
      "ITMI",
      "远方监视接口"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 接口与存档",
    "summary": "远方监视接口边界；本版表仅公用信息。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-control-generic.html#ITMI"
  },
  {
    "id": "ancr",
    "zh": "ANCR 中性点电流调节",
    "en": "Neutral current regulation",
    "aliases": [
      "ANCR",
      "中性点电流调节"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 自动控制",
    "summary": "中性点补偿电流自动调节，关联 YEFN 的线圈位置。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-automatic.html#ANCR"
  },
  {
    "id": "arco",
    "zh": "ARCO 无功控制",
    "en": "Reactive power control",
    "aliases": [
      "ARCO",
      "无功控制"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 自动控制",
    "summary": "无功自动控制与电容器等设备协调，DschBlk 表达放电闭锁。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-automatic.html#ARCO"
  },
  {
    "id": "atcc",
    "zh": "ATCC 自动分接开关控制",
    "en": "Automatic tap changer control",
    "aliases": [
      "ATCC",
      "自动分接开关控制"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 自动控制",
    "summary": "调节分接开关以维持电压，结合负荷电流、环流、压降补偿和并列运行。TapChg/TapPos 至少一个（C）；控制器与 YLTC 执行部件分开。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-automatic.html#ATCC"
  },
  {
    "id": "avco",
    "zh": "AVCO 电压控制",
    "en": "Voltage control",
    "aliases": [
      "AVCO",
      "电压控制"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 自动控制",
    "summary": "电压自动控制，受接地故障、电流/电压越限等闭锁。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-automatic.html#AVCO"
  },
  {
    "id": "mdif",
    "zh": "MDIF 差动测量",
    "en": "Differential measurement",
    "aliases": [
      "MDIF",
      "差动测量"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 计量与测量",
    "summary": "差动测量用于支持保护；OpARem 或 Amp1/Amp2/Amp3 至少一个（C）。测量模型与 PDIF 的保护判断分开。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-measurement.html#MDIF"
  },
  {
    "id": "mhai",
    "zh": "MHAI 相别有关谐波与间谐波",
    "en": "Phase related harmonics and interharmonics",
    "aliases": [
      "MHAI",
      "相别有关谐波与间谐波"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 计量与测量",
    "summary": "按相表示谐波/间谐波，Hz 与 HzSet 二者取一（C）。HWYE/HDEL 是频谱结构，不是单个浮点值。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-measurement.html#MHAI"
  },
  {
    "id": "mhan",
    "zh": "MHAN 相别无关谐波与间谐波",
    "en": "Non phase related harmonics and interharmonics",
    "aliases": [
      "MHAN",
      "相别无关谐波与间谐波"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 计量与测量",
    "summary": "相别无关频谱。原表写 ThdEvenAmp/TddEvenAmp/NormA，表 9 对应 ThdEvnAmp/TddEvnAmp/NomA，保留拼写差异。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-measurement.html#MHAN"
  },
  {
    "id": "mmtr",
    "zh": "MMTR 计量",
    "en": "Metering",
    "aliases": [
      "MMTR",
      "计量"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 计量与测量",
    "summary": "电能计量，将功率对时间累计；本工程未发现此节点，计量案例为原创。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-measurement.html#MMTR"
  },
  {
    "id": "mmxn",
    "zh": "MMXN 相别无关测量",
    "en": "Non phase related measurement",
    "aliases": [
      "MMXN",
      "相别无关测量"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 计量与测量",
    "summary": "单相或相别无关量；不要把 Watt/VoltAmpr 简化为三相总量。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-measurement.html#MMXN"
  },
  {
    "id": "mmxu",
    "zh": "MMXU 三相测量",
    "en": "Three phase measurement",
    "aliases": [
      "MMXU",
      "三相测量"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 计量与测量",
    "summary": "三相电流、电压、功率、阻抗及频率。PhV 是相电压，PPV 是线电压；WYE/DEL 给相分量或相间分量。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-measurement.html#MMXU"
  },
  {
    "id": "msqi",
    "zh": "MSQI 相序与不平衡",
    "en": "Sequence and imbalance",
    "aliases": [
      "MSQI",
      "相序与不平衡"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 计量与测量",
    "summary": "提供正序、负序、零序和不平衡信息。原节点表 Dq0Seq 与字典 DQ0Seq 大小写不同。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-measurement.html#MSQI"
  },
  {
    "id": "msta",
    "zh": "MSTA 计量统计",
    "en": "Measurement statistics",
    "aliases": [
      "MSTA",
      "计量统计"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 计量与测量",
    "summary": "在分析窗口内求平均/最大/最小量，EvStr 启动分析间隔，EvTmms 给窗口。窗口统计不等于即时值或长期电能。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-measurement.html#MSTA"
  },
  {
    "id": "sarc",
    "zh": "SARC 电弧监视与诊断",
    "en": "Arc monitoring and diagnostics",
    "aliases": [
      "SARC",
      "电弧监视与诊断"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 传感器与监视",
    "summary": "电弧监视与诊断功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-monitoring-equipment.html#SARC"
  },
  {
    "id": "simg",
    "zh": "SIMG 气体绝缘介质监视",
    "en": "Gas insulation monitoring",
    "aliases": [
      "SIMG",
      "气体绝缘介质监视"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 传感器与监视",
    "summary": "气体绝缘介质监视功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-monitoring-equipment.html#SIMG"
  },
  {
    "id": "siml",
    "zh": "SIML 液体绝缘介质监视",
    "en": "Liquid insulation monitoring",
    "aliases": [
      "SIML",
      "液体绝缘介质监视"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 传感器与监视",
    "summary": "液体绝缘介质监视功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-monitoring-equipment.html#SIML"
  },
  {
    "id": "spdc",
    "zh": "SPDC 局部放电监视与诊断",
    "en": "Partial discharge monitoring",
    "aliases": [
      "SPDC",
      "局部放电监视与诊断"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 传感器与监视",
    "summary": "局部放电监视与诊断功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-monitoring-equipment.html#SPDC"
  },
  {
    "id": "xcbr",
    "zh": "XCBR 断路器",
    "en": "Circuit breaker",
    "aliases": [
      "XCBR",
      "断路器"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 开关设备",
    "summary": "断路器过程设备模型。位置、操作次数、蓄能/物理能力、闭锁分别表示；它不是“保护算法节点”。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-switch-transformer.html#XCBR"
  },
  {
    "id": "xswi",
    "zh": "XSWI 开关设备",
    "en": "Switch",
    "aliases": [
      "XSWI",
      "开关设备"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 开关设备",
    "summary": "开关设备模型，可区分负荷开关、隔离开关和接地开关。原表若写 ISI，保留与 INS 的差异。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-switch-transformer.html#XSWI"
  },
  {
    "id": "tctr",
    "zh": "TCTR 电流互感器",
    "en": "Current transformer",
    "aliases": [
      "TCTR",
      "电流互感器"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 仪用互感器",
    "summary": "提供电流采样值。基线说明传输的是修正后的工程一次值；实际工程仍须沿配置核对尺度和单位，不直接用 Rat 再乘一次。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-switch-transformer.html#TCTR"
  },
  {
    "id": "tvtr",
    "zh": "TVTR 电压互感器",
    "en": "Voltage transformer",
    "aliases": [
      "TVTR",
      "电压互感器"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 仪用互感器",
    "summary": "提供电压采样值与熔丝故障。Rat/Cor/AngCor 是外部常规传感器的变比和修正信息，不自动等于发布采样量还需再次换算。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-switch-transformer.html#TVTR"
  },
  {
    "id": "yefn",
    "zh": "YEFN 接地故障中性点补偿",
    "en": "Earth fault neutral compensation",
    "aliases": [
      "YEFN",
      "接地故障中性点补偿"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 电力变压器及相关功能",
    "summary": "消弧线圈与接地故障中性点补偿；ECA 是线圈电流，ColTapPos/ColPos 表示离散/连续调节位置。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-switch-transformer.html#YEFN"
  },
  {
    "id": "yltc",
    "zh": "YLTC 分接开关",
    "en": "Load tap changer",
    "aliases": [
      "YLTC",
      "分接开关"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 电力变压器及相关功能",
    "summary": "分接开关执行部件；TapChg/TapPos 至少一个，EndPosL/EndPosR 是限位反馈。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-switch-transformer.html#YLTC"
  },
  {
    "id": "ypsh",
    "zh": "YPSH 功率分流",
    "en": "Power shunt",
    "aliases": [
      "YPSH",
      "功率分流"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 电力变压器及相关功能",
    "summary": "功率分流功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-switch-transformer.html#YPSH"
  },
  {
    "id": "yptr",
    "zh": "YPTR 电力变压器",
    "en": "Power transformer",
    "aliases": [
      "YPTR",
      "电力变压器"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 电力变压器及相关功能",
    "summary": "电力变压器模型；热点、铁心接地、运行状态、额定量与保护 PTTR 是不同功能。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-switch-transformer.html#YPTR"
  },
  {
    "id": "zaxn",
    "zh": "ZAXN 辅助电源",
    "en": "Auxiliary network",
    "aliases": [
      "ZAXN",
      "辅助电源"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 其他电力设备",
    "summary": "辅助电源功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-monitoring-equipment.html#ZAXN"
  },
  {
    "id": "zbat",
    "zh": "ZBAT 电池",
    "en": "Battery",
    "aliases": [
      "ZBAT",
      "电池"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 其他电力设备",
    "summary": "本扫描印刷 68 缺失，不能声称列完节点专用数据。结合表 9 可学习 BatHi/BatLo/BatTest/HiBatVal/LoBatVal，但不补造 CDC 或必选性。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-monitoring-equipment.html#ZBAT"
  },
  {
    "id": "zbsh",
    "zh": "ZBSH 套管",
    "en": "Bushing",
    "aliases": [
      "ZBSH",
      "套管"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 其他电力设备",
    "summary": "本扫描仅保留续表的参考量 RefReact/RefPF/RefV，首表缺失；表 9 还给 LosFact 等相关定义，但不据此补造首表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-monitoring-equipment.html#ZBSH"
  },
  {
    "id": "zcab",
    "zh": "ZCAB 电力电缆",
    "en": "Power cable",
    "aliases": [
      "ZCAB",
      "电力电缆"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 其他电力设备",
    "summary": "电力电缆功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-monitoring-equipment.html#ZCAB"
  },
  {
    "id": "zcap",
    "zh": "ZCAP 电容器组",
    "en": "Capacitor bank",
    "aliases": [
      "ZCAP",
      "电容器组"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 其他电力设备",
    "summary": "电容器组功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-monitoring-equipment.html#ZCAP"
  },
  {
    "id": "zcon",
    "zh": "ZCON 转换器",
    "en": "Converter",
    "aliases": [
      "ZCON",
      "转换器"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 其他电力设备",
    "summary": "转换器功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-monitoring-equipment.html#ZCON"
  },
  {
    "id": "zgen",
    "zh": "ZGEN 发电机",
    "en": "Generator",
    "aliases": [
      "ZGEN",
      "发电机"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 其他电力设备",
    "summary": "发电机设备状态与控制。节点表 GnSpd 与字典 GnSp 拼写不同；额定功率/电压、速度、励磁状态不能混为一种量。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-monitoring-equipment.html#ZGEN"
  },
  {
    "id": "zgil",
    "zh": "ZGIL 气体绝缘线路",
    "en": "Gas insulated line",
    "aliases": [
      "ZGIL",
      "气体绝缘线路"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 其他电力设备",
    "summary": "气体绝缘线路功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-monitoring-equipment.html#ZGIL"
  },
  {
    "id": "zlin",
    "zh": "ZLIN 电力架空线",
    "en": "Power overhead line",
    "aliases": [
      "ZLIN",
      "电力架空线"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 其他电力设备",
    "summary": "电力架空线功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-monitoring-equipment.html#ZLIN"
  },
  {
    "id": "zmot",
    "zh": "ZMOT 电动机",
    "en": "Motor",
    "aliases": [
      "ZMOT",
      "电动机"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 其他电力设备",
    "summary": "电动机功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-monitoring-equipment.html#ZMOT"
  },
  {
    "id": "zrea",
    "zh": "ZREA 电抗器",
    "en": "Reactor",
    "aliases": [
      "ZREA",
      "电抗器"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 其他电力设备",
    "summary": "电抗器功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-monitoring-equipment.html#ZREA"
  },
  {
    "id": "zrrc",
    "zh": "ZRRC 旋转无功元件",
    "en": "Rotating reactive component",
    "aliases": [
      "ZRRC",
      "旋转无功元件"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 其他电力设备",
    "summary": "旋转无功元件功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-monitoring-equipment.html#ZRRC"
  },
  {
    "id": "zsar",
    "zh": "ZSAR 浪涌抑制器",
    "en": "Surge arrester",
    "aliases": [
      "ZSAR",
      "浪涌抑制器"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 其他电力设备",
    "summary": "浪涌抑制器动作 OPSA 带 T 瞬态标志，操作计数与动作瞬态分开。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-monitoring-equipment.html#ZSAR"
  },
  {
    "id": "ztcf",
    "zh": "ZTCF 晶闸管控制频率转换器",
    "en": "Thyristor controlled frequency converter",
    "aliases": [
      "ZTCF",
      "晶闸管控制频率转换器"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 其他电力设备",
    "summary": "晶闸管控制频率转换器功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-monitoring-equipment.html#ZTCF"
  },
  {
    "id": "ztcr",
    "zh": "ZTCR 晶闸管控制无功元件",
    "en": "Thyristor controlled reactive component",
    "aliases": [
      "ZTCR",
      "晶闸管控制无功元件"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分 / 其他电力设备",
    "summary": "晶闸管控制无功元件功能模型；数据、CDC 与存在性见节点表。",
    "related": [
      "ln",
      "cdc",
      "do"
    ],
    "href": "chapters/ln-monitoring-equipment.html#ZTCR"
  },
  {
    "id": "part74-do-AcsCtlFail",
    "zh": "AcsCtlFail",
    "en": "AcsCtlFail",
    "aliases": [
      "AcsCtlFail",
      "检测到访问控制失败次数"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "检测到访问控制失败次数",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-AcsCtlFail"
  },
  {
    "id": "part74-do-AcuPaDsch",
    "zh": "AcuPaDsch",
    "en": "AcuPaDsch",
    "aliases": [
      "AcuPaDsch",
      "局部放电噪声水平，单位dB"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "局部放电噪声水平，单位dB",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-AcuPaDsch"
  },
  {
    "id": "part74-do-AgeRat",
    "zh": "AgeRat",
    "en": "AgeRat",
    "aliases": [
      "AgeRat",
      "老化速率，如变压器老化速率"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "老化速率，如变压器老化速率",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-AgeRat"
  },
  {
    "id": "part74-do-Alm",
    "zh": "Alm",
    "en": "Alm",
    "aliases": [
      "Alm",
      "总告警"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "总告警",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Alm"
  },
  {
    "id": "part74-do-AlmLstOv",
    "zh": "AlmLstOv",
    "en": "AlmLstOv",
    "aliases": [
      "AlmLstOv",
      "TRUE指示告警列表溢出"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "TRUE指示告警列表溢出",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-AlmLstOv"
  },
  {
    "id": "part74-do-AlmThm",
    "zh": "AlmThm",
    "en": "AlmThm",
    "aliases": [
      "AlmThm",
      "热告警"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "热告警",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-AlmThm"
  },
  {
    "id": "part74-do-AlmVal",
    "zh": "AlmVal",
    "en": "AlmVal",
    "aliases": [
      "AlmVal",
      "测量量告警定值"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "测量量告警定值",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-AlmVal"
  },
  {
    "id": "part74-do-Amp",
    "zh": "Amp",
    "en": "Amp",
    "aliases": [
      "Amp",
      "非三相电路电流"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "非三相电路电流",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Amp"
  },
  {
    "id": "part74-do-Ang",
    "zh": "Ang",
    "en": "Ang",
    "aliases": [
      "Ang",
      "相电压和电流之间角度"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相电压和电流之间角度",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Ang"
  },
  {
    "id": "part74-do-AngCor",
    "zh": "AngCor",
    "en": "AngCor",
    "aliases": [
      "AngCor",
      "相量的相角补偿（可用于仪用互感器／传感器）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相量的相角补偿（可用于仪用互感器／传感器）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-AngCor"
  },
  {
    "id": "part74-do-AngInd",
    "zh": "AngInd",
    "en": "AngInd",
    "aliases": [
      "AngInd",
      "母线与线路电压相角差的检查结果；TRUE 为越限，FALSE 为未越限。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "母线与线路电压相角差的检查结果；TRUE 为越限，FALSE 为未越限。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-AngInd"
  },
  {
    "id": "part74-do-AngLod",
    "zh": "AngLod",
    "en": "AngLod",
    "aliases": [
      "AngLod",
      "距离保护负荷区域的幅角；与 RisLod 一起限定负荷侵入区域，不能当作相量测量角。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "距离保护负荷区域的幅角；与 RisLod 一起限定负荷侵入区域，不能当作相量测量角。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-AngLod"
  },
  {
    "id": "part74-do-AnIn",
    "zh": "AnIn",
    "en": "AnIn",
    "aliases": [
      "AnIn",
      "通用 I/O 的模拟输入；具体被测对象由配置描述和绑定说明。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "通用 I/O 的模拟输入；具体被测对象由配置描述和绑定说明。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-AnIn"
  },
  {
    "id": "part74-do-ArcCntRs",
    "zh": "ArcCntRs",
    "en": "ArcCntRs",
    "aliases": [
      "ArcCntRs",
      "电弧计数，可复位"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "电弧计数，可复位",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ArcCntRs"
  },
  {
    "id": "part74-do-ARtg",
    "zh": "ARtg",
    "en": "ARtg",
    "aliases": [
      "ARtg",
      "额定电流"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "额定电流",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ARtg"
  },
  {
    "id": "part74-do-AStr",
    "zh": "AStr",
    "en": "AStr",
    "aliases": [
      "AStr",
      "电流水平"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "电流水平",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-AStr"
  },
  {
    "id": "part74-do-AuthFail",
    "zh": "AuthFail",
    "en": "AuthFail",
    "aliases": [
      "AuthFail",
      "授权失败次数"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "授权失败次数",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-AuthFail"
  },
  {
    "id": "part74-do-Auto",
    "zh": "Auto",
    "en": "Auto",
    "aliases": [
      "Auto",
      "该数据允许或禁止自动控制器的输出电路输出"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "该数据允许或禁止自动控制器的输出电路输出",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Auto"
  },
  {
    "id": "part74-do-AutoRecSt",
    "zh": "AutoRecSt",
    "en": "AutoRecSt",
    "aliases": [
      "AutoRecSt",
      "自动重合闸状态；编码与完整含义见取值页。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "自动重合闸状态；编码与完整含义见取值页。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-AutoRecSt"
  },
  {
    "id": "part74-do-AutoUpLod",
    "zh": "AutoUpLod",
    "en": "AutoUpLod",
    "aliases": [
      "AutoUpLod",
      "为TRUE时表示扰动记录文件自动上载"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示扰动记录文件自动上载",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-AutoUpLod"
  },
  {
    "id": "part74-do-AuxSCO",
    "zh": "AuxSCO",
    "en": "AuxSCO",
    "aliases": [
      "AuxSCO",
      "为TRUE时表示切换至辅助电源运行命令"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示切换至辅助电源运行命令",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-AuxSCO"
  },
  {
    "id": "part74-do-AvAmps",
    "zh": "AvAmps",
    "en": "AvAmps",
    "aliases": [
      "AvAmps",
      "在所规定的分析时段内，平均电流"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "在所规定的分析时段内，平均电流",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-AvAmps"
  },
  {
    "id": "part74-do-AVCrv",
    "zh": "AVCrv",
    "en": "AVCrv",
    "aliases": [
      "AVCrv",
      "电压—电流动作特性曲线（x 为 V，y 为 A）；曲线类型和点结构沿 CURVE 读取。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "电压—电流动作特性曲线（x 为 V，y 为 A）；曲线类型和点结构沿 CURVE 读取。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-AVCrv"
  },
  {
    "id": "part74-do-AVSt",
    "zh": "AVSt",
    "en": "AVSt",
    "aliases": [
      "AVSt",
      "当前活动电压—电流动作特性的描述信息，不是一个电流采样值。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "当前活动电压—电流动作特性的描述信息，不是一个电流采样值。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-AVSt"
  },
  {
    "id": "part74-do-AvVA",
    "zh": "AvVA",
    "en": "AvVA",
    "aliases": [
      "AvVA",
      "在所定义分析时段内平均视在功率"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "在所定义分析时段内平均视在功率",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-AvVA"
  },
  {
    "id": "part74-do-AvVAr",
    "zh": "AvVAr",
    "en": "AvVAr",
    "aliases": [
      "AvVAr",
      "在所定义分析时段内平均无功功率"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "在所定义分析时段内平均无功功率",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-AvVAr"
  },
  {
    "id": "part74-do-AvVolts",
    "zh": "AvVolts",
    "en": "AvVolts",
    "aliases": [
      "AvVolts",
      "在所定义分析时段内平均电压"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "在所定义分析时段内平均电压",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-AvVolts"
  },
  {
    "id": "part74-do-AvW",
    "zh": "AvW",
    "en": "AvW",
    "aliases": [
      "AvW",
      "在所定义分析时段内平均有功功率"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "在所定义分析时段内平均有功功率",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-AvW"
  },
  {
    "id": "part74-do-BatHi",
    "zh": "BatHi",
    "en": "BatHi",
    "aliases": [
      "BatHi",
      "TRUE指示电池处于过充状态"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "TRUE指示电池处于过充状态",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-BatHi"
  },
  {
    "id": "part74-do-BatLo",
    "zh": "BatLo",
    "en": "BatLo",
    "aliases": [
      "BatLo",
      "为TRUE时表示电池电压已降至设定值之下"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示电池电压已降至设定值之下",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-BatLo"
  },
  {
    "id": "part74-do-BatTest",
    "zh": "BatTest",
    "en": "BatTest",
    "aliases": [
      "BatTest",
      "为TRUE时表示启动电池测试命令"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示启动电池测试命令",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-BatTest"
  },
  {
    "id": "part74-do-Beh",
    "zh": "Beh",
    "en": "Beh",
    "aliases": [
      "Beh",
      "只读的实际行为，由逻辑设备 LLN0.Mod 与本节点 Mod 组合确定。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "只读的实际行为，由逻辑设备 LLN0.Mod 与本节点 Mod 组合确定。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Beh"
  },
  {
    "id": "part74-do-BinIn",
    "zh": "BinIn",
    "en": "BinIn",
    "aliases": [
      "BinIn",
      "通用I/O的二进制输入矩阵，表示一组二进制输入"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "通用I/O的二进制输入矩阵，表示一组二进制输入",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-BinIn"
  },
  {
    "id": "part74-do-BkrTmms",
    "zh": "BkrTmms",
    "en": "BkrTmms",
    "aliases": [
      "BkrTmms",
      "断路器闭合时间，包括断路器动作前的其他延时"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "断路器闭合时间，包括断路器动作前的其他延时",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-BkrTmms"
  },
  {
    "id": "part74-do-BlkA",
    "zh": "BlkA",
    "en": "BlkA",
    "aliases": [
      "BlkA",
      "为TRUE时表示因电流闭锁操作"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示因电流闭锁操作",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-BlkA"
  },
  {
    "id": "part74-do-BlkAOv",
    "zh": "BlkAOv",
    "en": "BlkAOv",
    "aliases": [
      "BlkAOv",
      "为TRUE时表示电流越限闭锁开关操作"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示电流越限闭锁开关操作",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-BlkAOv"
  },
  {
    "id": "part74-do-BlkCls",
    "zh": "BlkCls",
    "en": "BlkCls",
    "aliases": [
      "BlkCls",
      "禁止相关设备合闸的闭锁信息；与设备操作能力、CILO 联锁许可分开。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "禁止相关设备合闸的闭锁信息；与设备操作能力、CILO 联锁许可分开。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-BlkCls"
  },
  {
    "id": "part74-do-BlkEF",
    "zh": "BlkEF",
    "en": "BlkEF",
    "aliases": [
      "BlkEF",
      "为TRUE时表示因接地故障闭锁开关动作"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示因接地故障闭锁开关动作",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-BlkEF"
  },
  {
    "id": "part74-do-BlkLV",
    "zh": "BlkLV",
    "en": "BlkLV",
    "aliases": [
      "BlkLV",
      "自动降压命令的最低控制电压边界（ATCC 中为模拟定值，不能当布尔量）。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "自动降压命令的最低控制电压边界（ATCC 中为模拟定值，不能当布尔量）。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-BlkLV"
  },
  {
    "id": "part74-do-BlkOpn",
    "zh": "BlkOpn",
    "en": "BlkOpn",
    "aliases": [
      "BlkOpn",
      "禁止相关设备分闸的闭锁信息；与设备操作能力、CILO 联锁许可分开。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "禁止相关设备分闸的闭锁信息；与设备操作能力、CILO 联锁许可分开。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-BlkOpn"
  },
  {
    "id": "part74-do-BlkRec",
    "zh": "BlkRec",
    "en": "BlkRec",
    "aliases": [
      "BlkRec",
      "闭锁重合闸"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "闭锁重合闸",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-BlkRec"
  },
  {
    "id": "part74-do-BlkRV",
    "zh": "BlkRV",
    "en": "BlkRV",
    "aliases": [
      "BlkRV",
      "自动升压命令的最高控制电压边界（ATCC 中为模拟定值）。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "自动升压命令的最高控制电压边界（ATCC 中为模拟定值）。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-BlkRV"
  },
  {
    "id": "part74-do-BlkV",
    "zh": "BlkV",
    "en": "BlkV",
    "aliases": [
      "BlkV",
      "由于电压条件而闭锁相关功能；TRUE 表示施加闭锁。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "由于电压条件而闭锁相关功能；TRUE 表示施加闭锁。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-BlkV"
  },
  {
    "id": "part74-do-BlkVal",
    "zh": "BlkVal",
    "en": "BlkVal",
    "aliases": [
      "BlkVal",
      "当测量值超过该值时（对反映下降数值功能，低于该值），闭锁功能运行"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "当测量值超过该值时（对反映下降数值功能，低于该值），闭锁功能运行",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-BlkVal"
  },
  {
    "id": "part74-do-BlkValA",
    "zh": "BlkValA",
    "en": "BlkValA",
    "aliases": [
      "BlkValA",
      "闭锁值（最小动作电流）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "闭锁值（最小动作电流）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-BlkValA"
  },
  {
    "id": "part74-do-BlkValV",
    "zh": "BlkValV",
    "en": "BlkValV",
    "aliases": [
      "BlkValV",
      "闭锁电压门槛，原表举最小动作电压。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "闭锁电压门槛，原表举最小动作电压。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-BlkValV"
  },
  {
    "id": "part74-do-BlkVOv",
    "zh": "BlkVOv",
    "en": "BlkVOv",
    "aliases": [
      "BlkVOv",
      "为TRUE时表示因电压越限闭锁开关操作"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示因电压越限闭锁开关操作",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-BlkVOv"
  },
  {
    "id": "part74-do-BlkZn",
    "zh": "BlkZn",
    "en": "BlkZn",
    "aliases": [
      "BlkZn",
      "闭锁某个距离保护实例/区间的动作；结合对应 PDIS 实例和 RPSB 用途。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "闭锁某个距离保护实例/区间的动作；结合对应 PDIS 实例和 RPSB 用途。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-BlkZn"
  },
  {
    "id": "part74-do-BndCtr",
    "zh": "BndCtr",
    "en": "BndCtr",
    "aliases": [
      "BndCtr",
      "控制范围中心，假定正向潮流"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "控制范围中心，假定正向潮流",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-BndCtr"
  },
  {
    "id": "part74-do-BndWid",
    "zh": "BndWid",
    "en": "BndWid",
    "aliases": [
      "BndWid",
      "控制电压范围，以电压或标称电压的百分数表示，假定正常正向潮流"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "控制电压范围，以电压或标称电压的百分数表示，假定正常正向潮流",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-BndWid"
  },
  {
    "id": "part74-do-CapDS",
    "zh": "CapDS",
    "en": "CapDS",
    "aliases": [
      "CapDS",
      "为TRUE时表示电容器组在线，或其开关闭合：FALSE表示电容器组离线，或其开关断开"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示电容器组在线，或其开关闭合：FALSE表示电容器组离线，或其开关断开",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-CapDS"
  },
  {
    "id": "part74-do-CarRx",
    "zh": "CarRx",
    "en": "CarRx",
    "aliases": [
      "CarRx",
      "解锁逻辑启动后，已接收到载波"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "解锁逻辑启动后，已接收到载波",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-CarRx"
  },
  {
    "id": "part74-do-CBOpCap",
    "zh": "CBOpCap",
    "en": "CBOpCap",
    "aliases": [
      "CBOpCap",
      "断路器操作能力；编码与完整含义见取值页。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "断路器操作能力；编码与完整含义见取值页。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-CBOpCap"
  },
  {
    "id": "part74-do-CECtl",
    "zh": "CECtl",
    "en": "CECtl",
    "aliases": [
      "CECtl",
      "整套冷却组控制（水泵和风扇）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "整套冷却组控制（水泵和风扇）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-CECtl"
  },
  {
    "id": "part74-do-CGAlm",
    "zh": "CGAlm",
    "en": "CGAlm",
    "aliases": [
      "CGAlm",
      "为TRUE时表示铁心接地告警，表明绝缘击穿"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示铁心接地告警，表明绝缘击穿",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-CGAlm"
  },
  {
    "id": "part74-do-ChaMotEna",
    "zh": "ChaMotEna",
    "en": "ChaMotEna",
    "aliases": [
      "ChaMotEna",
      "允许蓄能电动机，用于防止母线跳闸后电源过载"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "允许蓄能电动机，用于防止母线跳闸后电源过载",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ChaMotEna"
  },
  {
    "id": "part74-do-ChkRec",
    "zh": "ChkRec",
    "en": "ChkRec",
    "aliases": [
      "ChkRec",
      "是否采用检同期重合；TRUE 为检同期，FALSE 为不检同期。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "是否采用检同期重合；TRUE 为检同期，FALSE 为不检同期。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ChkRec"
  },
  {
    "id": "part74-do-ChNum",
    "zh": "ChNum",
    "en": "ChNum",
    "aliases": [
      "ChNum",
      "被监视通道编号（如COMTRADE中使用）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "被监视通道编号（如COMTRADE中使用）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ChNum"
  },
  {
    "id": "part74-do-ChrAng",
    "zh": "ChrAng",
    "en": "ChrAng",
    "aliases": [
      "ChrAng",
      "为得到最大灵敏度，电流极化量偏离角度"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为得到最大灵敏度，电流极化量偏离角度",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ChrAng"
  },
  {
    "id": "part74-do-Chtrg",
    "zh": "Chtrg",
    "en": "Chtrg",
    "aliases": [
      "Chtrg",
      "表 9 打印 Chtrg，通道表打印 ChTrg；表示记录通道触发。",
      "ChTrg"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "表 9 打印 Chtrg，通道表打印 ChTrg；表示记录通道触发。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Chtrg"
  },
  {
    "id": "part74-do-CircA",
    "zh": "CircA",
    "en": "CircA",
    "aliases": [
      "CircA",
      "并列运行变压器之间的被测环流（并列安装的变压器二次电流中一个分量）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "并列运行变压器之间的被测环流（并列安装的变压器二次电流中一个分量）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-CircA"
  },
  {
    "id": "part74-do-ClkRot",
    "zh": "ClkRot",
    "en": "ClkRot",
    "aliases": [
      "ClkRot",
      "TRUE 指示相序按规定参考方向顺时针旋转。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "TRUE 指示相序按规定参考方向顺时针旋转。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ClkRot"
  },
  {
    "id": "part74-do-CntClkRot",
    "zh": "CntClkRot",
    "en": "CntClkRot",
    "aliases": [
      "CntClkRot",
      "TRUE指示相序逆时针旋转（反向）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "TRUE指示相序逆时针旋转（反向）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-CntClkRot"
  },
  {
    "id": "part74-do-ColPos",
    "zh": "ColPos",
    "en": "ColPos",
    "aliases": [
      "ColPos",
      "表示线圈〈可动铁心位置）连续调节，如消弧线圈"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "表示线圈〈可动铁心位置）连续调节，如消弧线圈",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ColPos"
  },
  {
    "id": "part74-do-ColTapPos",
    "zh": "ColTapPos",
    "en": "ColTapPos",
    "aliases": [
      "ColTapPos",
      "表示线圈离散调节，如消弧线圈"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "表示线圈离散调节，如消弧线圈",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ColTapPos"
  },
  {
    "id": "part74-do-ConsTms",
    "zh": "ConsTms",
    "en": "ConsTms",
    "aliases": [
      "ConsTms",
      "时间常数，如热模型"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "时间常数，如热模型",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ConsTms"
  },
  {
    "id": "part74-do-Cor",
    "zh": "Cor",
    "en": "Cor",
    "aliases": [
      "Cor",
      "相量幅值修正（如用于仪用互感器/传感器）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相量幅值修正（如用于仪用互感器/传感器）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Cor"
  },
  {
    "id": "part74-do-CrdTmms",
    "zh": "CrdTmms",
    "en": "CrdTmms",
    "aliases": [
      "CrdTmms",
      "调用相关功能后，等待附加输入的协调延时，单位 ms。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "调用相关功能后，等待附加输入的协调延时，单位 ms。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-CrdTmms"
  },
  {
    "id": "part74-do-CtlDlTmms",
    "zh": "CtlDlTmms",
    "en": "CtlDlTmms",
    "aliases": [
      "CtlDlTmms",
      "达到预定正向潮流控制点后动作之前的控制延时时间"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "达到预定正向潮流控制点后动作之前的控制延时时间",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-CtlDlTmms"
  },
  {
    "id": "part74-do-CtlV",
    "zh": "CtlV",
    "en": "CtlV",
    "aliases": [
      "CtlV",
      "变压器二次侧电压，用于电压控制"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "变压器二次侧电压，用于电压控制",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-CtlV"
  },
  {
    "id": "part74-do-DeaBusVal",
    "zh": "DeaBusVal",
    "en": "DeaBusVal",
    "aliases": [
      "DeaBusVal",
      "自动重合闸等用，确认母线不带电的电压定值"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "自动重合闸等用，确认母线不带电的电压定值",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-DeaBusVal"
  },
  {
    "id": "part74-do-DeaLinVal",
    "zh": "DeaLinVal",
    "en": "DeaLinVal",
    "aliases": [
      "DeaLinVal",
      "自动重合闸等用，确认线路不带电的电压定值"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "自动重合闸等用，确认线路不带电的电压定值",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-DeaLinVal"
  },
  {
    "id": "part74-do-Den",
    "zh": "Den",
    "en": "Den",
    "aliases": [
      "Den",
      "绝缘介质密度"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "绝缘介质密度",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Den"
  },
  {
    "id": "part74-do-DenAlm",
    "zh": "DenAlm",
    "en": "DenAlm",
    "aliases": [
      "DenAlm",
      "异常条件，密度告警（FALSE表示正常；为TRUE时表示异常）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "异常条件，密度告警（FALSE表示正常；为TRUE时表示异常）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-DenAlm"
  },
  {
    "id": "part74-do-DetValA",
    "zh": "DetValA",
    "en": "DetValA",
    "aliases": [
      "DetValA",
      "用于在电流小于该定值时，确认断路器已断开"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "用于在电流小于该定值时，确认断路器已断开",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-DetValA"
  },
  {
    "id": "part74-do-DExt",
    "zh": "DExt",
    "en": "DExt",
    "aliases": [
      "DExt",
      "为TRUE时表示发电机去磁命令"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示发电机去磁命令",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-DExt"
  },
  {
    "id": "part74-do-Diag",
    "zh": "Diag",
    "en": "Diag",
    "aliases": [
      "Diag",
      "为TRUE时表示诊断在运行；FALSE表示诊断未运行"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示诊断在运行；FALSE表示诊断未运行",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Diag"
  },
  {
    "id": "part74-do-DifAClc",
    "zh": "DifAClc",
    "en": "DifAClc",
    "aliases": [
      "DifAClc",
      "差动电流",
      "DiffAClc"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "差动电流",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-DifAClc"
  },
  {
    "id": "part74-do-DifAng",
    "zh": "DifAng",
    "en": "DifAng",
    "aliases": [
      "DifAng",
      "两被测值间相角差定值，同步检查逻辑节点使用"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "两被测值间相角差定值，同步检查逻辑节点使用",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-DifAng"
  },
  {
    "id": "part74-do-DifAngClc",
    "zh": "DifAngClc",
    "en": "DifAngClc",
    "aliases": [
      "DifAngClc",
      "用于同期检查的两侧相角差计算值；不是相角差定值 DifAng。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "用于同期检查的两侧相角差计算值；不是相角差定值 DifAng。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-DifAngClc"
  },
  {
    "id": "part74-do-DifHz",
    "zh": "DifHz",
    "en": "DifHz",
    "aliases": [
      "DifHz",
      "用于同期检查的两侧频差定值。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "用于同期检查的两侧频差定值。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-DifHz"
  },
  {
    "id": "part74-do-DifHzClc",
    "zh": "DifHzClc",
    "en": "DifHzClc",
    "aliases": [
      "DifHzClc",
      "两被测值间频差计算值，同步检查逻辑节点使用"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "两被测值间频差计算值，同步检查逻辑节点使用",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-DifHzClc"
  },
  {
    "id": "part74-do-DifV",
    "zh": "DifV",
    "en": "DifV",
    "aliases": [
      "DifV",
      "两被测值间压差定值，同步检查逻辑节点使用"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "两被测值间压差定值，同步检查逻辑节点使用",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-DifV"
  },
  {
    "id": "part74-do-DifVClc",
    "zh": "DifVClc",
    "en": "DifVClc",
    "aliases": [
      "DifVClc",
      "两被测值间压差计算值，同步检查逻辑节点使用"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "两被测值间压差计算值，同步检查逻辑节点使用",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-DifVClc"
  },
  {
    "id": "part74-do-Dir",
    "zh": "Dir",
    "en": "Dir",
    "aliases": [
      "Dir",
      "故障或潮流方向"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "故障或潮流方向",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Dir"
  },
  {
    "id": "part74-do-DirMod",
    "zh": "DirMod",
    "en": "DirMod",
    "aliases": [
      "DirMod",
      "方向模式；编码与完整含义见取值页。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "方向模式；编码与完整含义见取值页。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-DirMod"
  },
  {
    "id": "part74-do-DltRcd",
    "zh": "DltRcd",
    "en": "DltRcd",
    "aliases": [
      "DltRcd",
      "为TRUE时表示删除选定记录"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示删除选定记录",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-DltRcd"
  },
  {
    "id": "part74-do-DmdPwr",
    "zh": "DmdPwr",
    "en": "DmdPwr",
    "aliases": [
      "DmdPwr",
      "功率需求"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "功率需求",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-DmdPwr"
  },
  {
    "id": "part74-do-DmdVArh",
    "zh": "DmdVArh",
    "en": "DmdVArh",
    "aliases": [
      "DmdVArh",
      "无功电能需求（缺省方向：无功功率流出母线）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "无功电能需求（缺省方向：无功功率流出母线）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-DmdVArh"
  },
  {
    "id": "part74-do-DmdWh",
    "zh": "DmdWh",
    "en": "DmdWh",
    "aliases": [
      "DmdWh",
      "有功电能需求（缺省方向：有功功率流出母线）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "有功电能需求（缺省方向：有功功率流出母线）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-DmdWh"
  },
  {
    "id": "part74-do-DPCSO",
    "zh": "DPCSO",
    "en": "DPCSO",
    "aliases": [
      "DPCSO",
      "通用双点控制"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "通用双点控制",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-DPCSO"
  },
  {
    "id": "part74-do-DQ0Seq",
    "zh": "DQ0Seq",
    "en": "DQ0Seq",
    "aliases": [
      "DQ0Seq",
      "直轴、交轴、零轴参量",
      "Dq0Seq"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "直轴、交轴、零轴参量",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-DQ0Seq"
  },
  {
    "id": "part74-do-DschBlk",
    "zh": "DschBlk",
    "en": "DschBlk",
    "aliases": [
      "DschBlk",
      "为TRUE时表示因电容器组处于放电状态，闭锁电容器组投入"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示因电容器组处于放电状态，闭锁电容器组投入",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-DschBlk"
  },
  {
    "id": "part74-do-DurTmms",
    "zh": "DurTmms",
    "en": "DurTmms",
    "aliases": [
      "DurTmms",
      "根据方案，发送载波信号的最小持续时间，单位 ms。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "根据方案，发送载波信号的最小持续时间，单位 ms。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-DurTmms"
  },
  {
    "id": "part74-do-ECA",
    "zh": "ECA",
    "en": "ECA",
    "aliases": [
      "ECA",
      "中性点补偿电网中通过消弧线圈的被测电流"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "中性点补偿电网中通过消弧线圈的被测电流",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ECA"
  },
  {
    "id": "part74-do-Echo",
    "zh": "Echo",
    "en": "Echo",
    "aliases": [
      "Echo",
      "弱馈功能回馈信号"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "弱馈功能回馈信号",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Echo"
  },
  {
    "id": "part74-do-EEHealth",
    "zh": "EEHealth",
    "en": "EEHealth",
    "aliases": [
      "EEHealth",
      "外部设备状况信息，如由逻辑节点XCBR控制的断路器"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "外部设备状况信息，如由逻辑节点XCBR控制的断路器",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-EEHealth"
  },
  {
    "id": "part74-do-EEName",
    "zh": "EEName",
    "en": "EEName",
    "aliases": [
      "EEName",
      "外部设备铭牌信息，如由逻辑节点CSWI控制的断路器XCBR"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "外部设备铭牌信息，如由逻辑节点CSWI控制的断路器XCBR",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-EEName"
  },
  {
    "id": "part74-do-EnaCls",
    "zh": "EnaCls",
    "en": "EnaCls",
    "aliases": [
      "EnaCls",
      "联锁功能确定该数据状态，为TRUE时表示允许装置合闸"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "联锁功能确定该数据状态，为TRUE时表示允许装置合闸",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-EnaCls"
  },
  {
    "id": "part74-do-EnaOpn",
    "zh": "EnaOpn",
    "en": "EnaOpn",
    "aliases": [
      "EnaOpn",
      "联锁功能确定该数据状态，为TRUE时表示允许装置分闸"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "联锁功能确定该数据状态，为TRUE时表示允许装置分闸",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-EnaOpn"
  },
  {
    "id": "part74-do-EndPosL",
    "zh": "EndPosL",
    "en": "EndPosL",
    "aliases": [
      "EndPosL",
      "为TRUE时表示有载分接开关处于最低挡位置"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示有载分接开关处于最低挡位置",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-EndPosL"
  },
  {
    "id": "part74-do-EndPosR",
    "zh": "EndPosR",
    "en": "EndPosR",
    "aliases": [
      "EndPosR",
      "为TRUE时表示有载分接开关处于最高挡位置"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示有载分接开关处于最高挡位置",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-EndPosR"
  },
  {
    "id": "part74-do-EnvTmp",
    "zh": "EnvTmp",
    "en": "EnvTmp",
    "aliases": [
      "EnvTmp",
      "环境温度"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "环境温度",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-EnvTmp"
  },
  {
    "id": "part74-do-EqTmm",
    "zh": "EqTmm",
    "en": "EqTmm",
    "aliases": [
      "EqTmm",
      "温度平衡时间(min),在温度平衡时间内，热记忆保持不变，即热记忆冻结"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "温度平衡时间(min),在温度平衡时间内，热记忆保持不变，即热记忆冻结",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-EqTmm"
  },
  {
    "id": "part74-do-EvTmms",
    "zh": "EvTmms",
    "en": "EvTmms",
    "aliases": [
      "EvTmms",
      "确定最低频率的评估时间（时间窗），单位ms"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "确定最低频率的评估时间（时间窗），单位ms",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-EvTmms"
  },
  {
    "id": "part74-do-ExclTmms",
    "zh": "ExclTmms",
    "en": "ExclTmms",
    "aliases": [
      "ExclTmms",
      "忽略来自同一信号源接连触发的抑制时间，单位ms"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "忽略来自同一信号源接连触发的抑制时间，单位ms",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ExclTmms"
  },
  {
    "id": "part74-do-FACntRs",
    "zh": "FACntRs",
    "en": "FACntRs",
    "aliases": [
      "FACntRs",
      "故障电弧计数，可复位"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "故障电弧计数，可复位",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-FACntRs"
  },
  {
    "id": "part74-do-FADet",
    "zh": "FADet",
    "en": "FADet",
    "aliases": [
      "FADet",
      "为TRUE时表示检测到故障电弧告警"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示检测到故障电弧告警",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-FADet"
  },
  {
    "id": "part74-do-Fail",
    "zh": "Fail",
    "en": "Fail",
    "aliases": [
      "Fail",
      "TRUE表明断路器操作失败，断路器失灵"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "TRUE表明断路器操作失败，断路器失灵",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Fail"
  },
  {
    "id": "part74-do-FailMod",
    "zh": "FailMod",
    "en": "FailMod",
    "aliases": [
      "FailMod",
      "断路器失灵检测方式；编码与完整含义见取值页。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "断路器失灵检测方式；编码与完整含义见取值页。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-FailMod"
  },
  {
    "id": "part74-do-FailTmms",
    "zh": "FailTmms",
    "en": "FailTmms",
    "aliases": [
      "FailTmms",
      "到断路器失灵功能向另一个装置发出跳闸命令为止的延时时间"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "到断路器失灵功能向另一个装置发出跳闸命令为止的延时时间",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-FailTmms"
  },
  {
    "id": "part74-do-FanA",
    "zh": "FanA",
    "en": "FanA",
    "aliases": [
      "FanA",
      "风扇电动机驱动电流，单位A"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "风扇电动机驱动电流，单位A",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-FanA"
  },
  {
    "id": "part74-do-FanCtlGen",
    "zh": "FanCtlGen",
    "en": "FanCtlGen",
    "aliases": [
      "FanCtlGen",
      "控制全部风扇；级别编码与 FanCtl 相同，需区分整组和单台。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "控制全部风扇；级别编码与 FanCtl 相同，需区分整组和单台。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-FanCtlGen"
  },
  {
    "id": "part74-do-FanCtl",
    "zh": "FanCtl",
    "en": "FanCtl",
    "aliases": [
      "FanCtl",
      "FanCtl / FanCtlGen 风扇控制；编码与完整含义见取值页。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "FanCtl / FanCtlGen 风扇控制；编码与完整含义见取值页。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-FanCtl"
  },
  {
    "id": "part74-do-FanFlw",
    "zh": "FanFlw",
    "en": "FanFlw",
    "aliases": [
      "FanFlw",
      "风扇空气流"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "风扇空气流",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-FanFlw"
  },
  {
    "id": "part74-do-FanOvCur",
    "zh": "FanOvCur",
    "en": "FanOvCur",
    "aliases": [
      "FanOvCur",
      "风扇过电流跳闸"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "风扇过电流跳闸",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-FanOvCur"
  },
  {
    "id": "part74-do-FltDiskm",
    "zh": "FltDiskm",
    "en": "FltDiskm",
    "aliases": [
      "FltDiskm",
      "故障位置估算距离，单位 km；不能直接当作地理坐标。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "故障位置估算距离，单位 km；不能直接当作地理坐标。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-FltDiskm"
  },
  {
    "id": "part74-do-FltLoop",
    "zh": "FltLoop",
    "en": "FltLoop",
    "aliases": [
      "FltLoop",
      "故障回路；编码与完整含义见取值页。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "故障回路；编码与完整含义见取值页。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-FltLoop"
  },
  {
    "id": "part74-do-FltNum",
    "zh": "FltNum",
    "en": "FltNum",
    "aliases": [
      "FltNum",
      "故障序号（序号分配是本地的事宜）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "故障序号（序号分配是本地的事宜）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-FltNum"
  },
  {
    "id": "part74-do-FltZ",
    "zh": "FltZ",
    "en": "FltZ",
    "aliases": [
      "FltZ",
      "故障阻抗"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "故障阻抗",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-FltZ"
  },
  {
    "id": "part74-do-FuFail",
    "zh": "FuFail",
    "en": "FuFail",
    "aliases": [
      "FuFail",
      "TRUE 指示 TVTR 所关联电压互感器的熔丝开断或故障。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "TRUE 指示 TVTR 所关联电压互感器的熔丝开断或故障。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-FuFail"
  },
  {
    "id": "part74-do-GasFlwTr",
    "zh": "GasFlwTr",
    "en": "GasFlwTr",
    "aliases": [
      "GasFlwTr",
      "由于产生气体，绝缘液体流（如油）跳闸（可用于瓦斯跳闸）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "由于产生气体，绝缘液体流（如油）跳闸（可用于瓦斯跳闸）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-GasFlwTr"
  },
  {
    "id": "part74-do-GasInsAlm",
    "zh": "GasInsAlm",
    "en": "GasInsAlm",
    "aliases": [
      "GasInsAlm",
      "由于异常条件，绝缘液体中气体报警(FALSE表示正常；为TRUE时表示告警，可用于瓦斯跳闸）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "由于异常条件，绝缘液体中气体报警(FALSE表示正常；为TRUE时表示告警，可用于瓦斯跳闸）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-GasInsAlm"
  },
  {
    "id": "part74-do-GasInsTr",
    "zh": "GasInsTr",
    "en": "GasInsTr",
    "aliases": [
      "GasInsTr",
      "由于危险条件，绝缘液体中气体跳闸（可用于瓦斯跳闸）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "由于危险条件，绝缘液体中气体跳闸（可用于瓦斯跳闸）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-GasInsTr"
  },
  {
    "id": "part74-do-GnCtl",
    "zh": "GnCtl",
    "en": "GnCtl",
    "aliases": [
      "GnCtl",
      "发电机控制"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "发电机控制",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-GnCtl"
  },
  {
    "id": "part74-do-GndDlMod",
    "zh": "GndDlMod",
    "en": "GndDlMod",
    "aliases": [
      "GndDlMod",
      "单相接地故障的动作延时方式使能；TRUE 为启用，FALSE 为关闭。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "单相接地故障的动作延时方式使能；TRUE 为启用，FALSE 为关闭。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-GndDlMod"
  },
  {
    "id": "part74-do-GndDlTmms",
    "zh": "GndDlTmms",
    "en": "GndDlTmms",
    "aliases": [
      "GndDlTmms",
      "单相接地故障动作延时，单位 ms；原节点表类型仍逐项核对。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "单相接地故障动作延时，单位 ms；原节点表类型仍逐项核对。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-GndDlTmms"
  },
  {
    "id": "part74-do-GndStr",
    "zh": "GndStr",
    "en": "GndStr",
    "aliases": [
      "GndStr",
      "如果对地测量值超过这个数值（对反映下降数值功能情况，低于这个数值），相关功能操作启动"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "如果对地测量值超过这个数值（对反映下降数值功能情况，低于这个数值），相关功能操作启动",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-GndStr"
  },
  {
    "id": "part74-do-GnSp",
    "zh": "GnSp",
    "en": "GnSp",
    "aliases": [
      "GnSp",
      "表 9 打印 GnSp，ZGEN 表打印 GnSpd；表示发电机速度。",
      "GnSpd"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "表 9 打印 GnSp，ZGEN 表打印 GnSpd；表示发电机速度。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-GnSp"
  },
  {
    "id": "part74-do-GnSt",
    "zh": "GnSt",
    "en": "GnSt",
    "aliases": [
      "GnSt",
      "发电机状态；编码与完整含义见取值页。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "发电机状态；编码与完整含义见取值页。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-GnSt"
  },
  {
    "id": "part74-do-GrAlm",
    "zh": "GrAlm",
    "en": "GrAlm",
    "aliases": [
      "GrAlm",
      "由配置指定的一组告警汇总，TRUE 表示该组告警。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "由配置指定的一组告警汇总，TRUE 表示该组告警。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-GrAlm"
  },
  {
    "id": "part74-do-GrdRx",
    "zh": "GrdRx",
    "en": "GrdRx",
    "aliases": [
      "GrdRx",
      "TRUE 表示接收到载波机接口的监护信号。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "TRUE 表示接收到载波机接口的监护信号。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-GrdRx"
  },
  {
    "id": "part74-do-GriFltNum",
    "zh": "GriFltNum",
    "en": "GriFltNum",
    "aliases": [
      "GriFltNum",
      "电网故障编号用于标识公用故障扰动记录〔编号分配是当地事宜）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "电网故障编号用于标识公用故障扰动记录〔编号分配是当地事宜）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-GriFltNum"
  },
  {
    "id": "part74-do-GrWrn",
    "zh": "GrWrn",
    "en": "GrWrn",
    "aliases": [
      "GrWrn",
      "由配置指定的一组预告汇总，TRUE 表示该组预告。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "由配置指定的一组预告汇总，TRUE 表示该组预告。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-GrWrn"
  },
  {
    "id": "part74-do-H2",
    "zh": "H2",
    "en": "H2",
    "aliases": [
      "H2",
      "油中氢气测量反映绝缘状态；浓度单位/倍率必须沿 CDC.units 与工程配置核对。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "油中氢气测量反映绝缘状态；浓度单位/倍率必须沿 CDC.units 与工程配置核对。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-H2"
  },
  {
    "id": "part74-do-H2Alm",
    "zh": "H2Alm",
    "en": "H2Alm",
    "aliases": [
      "H2Alm",
      "氢气监视告警；FALSE 为正常，TRUE 为告警。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "氢气监视告警；FALSE 为正常，TRUE 为告警。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-H2Alm"
  },
  {
    "id": "part74-do-H2O",
    "zh": "H2O",
    "en": "H2O",
    "aliases": [
      "H2O",
      "油中相对饱和湿度百分数，须与同测点 H2OTmp 油温一起读。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "油中相对饱和湿度百分数，须与同测点 H2OTmp 油温一起读。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-H2O"
  },
  {
    "id": "part74-do-H2OTmp",
    "zh": "H2OTmp",
    "en": "H2OTmp",
    "aliases": [
      "H2OTmp",
      "测量油中相对饱和湿度时的油温，单位 ℃。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "测量油中相对饱和湿度时的油温，单位 ℃。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-H2OTmp"
  },
  {
    "id": "part74-do-HA",
    "zh": "HA",
    "en": "HA",
    "aliases": [
      "HA",
      "谐波或间谐波电流A相、B相、C相、N、Net,Res相别相关序列"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "谐波或间谐波电流A相、B相、C相、N、Net,Res相别相关序列",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HA"
  },
  {
    "id": "part74-do-HaAmp",
    "zh": "HaAmp",
    "en": "HaAmp",
    "aliases": [
      "HaAmp",
      "相别无关谐波或间谐波电流序列"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别无关谐波或间谐波电流序列",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HaAmp"
  },
  {
    "id": "part74-do-HaAmpTm",
    "zh": "HaAmpTm",
    "en": "HaAmpTm",
    "aliases": [
      "HaAmpTm",
      "相别无关电流时间积"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别无关电流时间积",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HaAmpTm"
  },
  {
    "id": "part74-do-HaCfAmp",
    "zh": "HaCfAmp",
    "en": "HaCfAmp",
    "aliases": [
      "HaCfAmp",
      "相别无关电流的峰值因子；基波与峰值参考的计算约定按适用定义核对。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别无关电流的峰值因子；基波与峰值参考的计算约定按适用定义核对。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HaCfAmp"
  },
  {
    "id": "part74-do-HaCfVol",
    "zh": "HaCfVol",
    "en": "HaCfVol",
    "aliases": [
      "HaCfVol",
      "相别无关电压的峰值因子；基波与峰值参考的计算约定按适用定义核对。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别无关电压的峰值因子；基波与峰值参考的计算约定按适用定义核对。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HaCfVol"
  },
  {
    "id": "part74-do-HaKFact",
    "zh": "HaKFact",
    "en": "HaKFact",
    "aliases": [
      "HaKFact",
      "相别无关K因子"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别无关K因子",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HaKFact"
  },
  {
    "id": "part74-do-HaRmsAmp",
    "zh": "HaRmsAmp",
    "en": "HaRmsAmp",
    "aliases": [
      "HaRmsAmp",
      "相别无关电流谐波/间谐波有效值；与归一化失真百分数分开。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别无关电流谐波/间谐波有效值；与归一化失真百分数分开。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HaRmsAmp"
  },
  {
    "id": "part74-do-HaRmsVol",
    "zh": "HaRmsVol",
    "en": "HaRmsVol",
    "aliases": [
      "HaRmsVol",
      "相别无关电压谐波/间谐波有效值；与归一化失真百分数分开。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别无关电压谐波/间谐波有效值；与归一化失真百分数分开。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HaRmsVol"
  },
  {
    "id": "part74-do-HaRst",
    "zh": "HaRst",
    "en": "HaRst",
    "aliases": [
      "HaRst",
      "为（差动保护）制动而监视的谐波次数"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为（差动保护）制动而监视的谐波次数",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HaRst"
  },
  {
    "id": "part74-do-HaTdFact",
    "zh": "HaTdFact",
    "en": "HaTdFact",
    "aliases": [
      "HaTdFact",
      "相别无关变压器额定值下降系数"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别无关变压器额定值下降系数",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HaTdFact"
  },
  {
    "id": "part74-do-HaTiFact",
    "zh": "HaTiFact",
    "en": "HaTiFact",
    "aliases": [
      "HaTiFact",
      "相别无关电压的电话影响因子；不同计算方法分别解释。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别无关电压的电话影响因子；不同计算方法分别解释。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HaTiFact"
  },
  {
    "id": "part74-do-HATm",
    "zh": "HATm",
    "en": "HATm",
    "aliases": [
      "HATm",
      "相别有关电流时间积"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别有关电流时间积",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HATm"
  },
  {
    "id": "part74-do-HaTsWatt",
    "zh": "HaTsWatt",
    "en": "HaTsWatt",
    "aliases": [
      "HaTsWatt",
      "相别无关总谐波或间谐波有功功率代数和（无基波）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别无关总谐波或间谐波有功功率代数和（无基波）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HaTsWatt"
  },
  {
    "id": "part74-do-HaTuWatt",
    "zh": "HaTuWatt",
    "en": "HaTuWatt",
    "aliases": [
      "HaTuWatt",
      "相别无关总谐波或间谐波有功功率绝对值和（无基波）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别无关总谐波或间谐波有功功率绝对值和（无基波）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HaTuWatt"
  },
  {
    "id": "part74-do-HaVol",
    "zh": "HaVol",
    "en": "HaVol",
    "aliases": [
      "HaVol",
      "相别无关谐波或间谐波电压系列"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别无关谐波或间谐波电压系列",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HaVol"
  },
  {
    "id": "part74-do-HaVolAmp",
    "zh": "HaVolAmp",
    "en": "HaVolAmp",
    "aliases": [
      "HaVolAmp",
      "相别无关谐波或间谐波视在功率系列"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别无关谐波或间谐波视在功率系列",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HaVolAmp"
  },
  {
    "id": "part74-do-HaVolAmpr",
    "zh": "HaVolAmpr",
    "en": "HaVolAmpr",
    "aliases": [
      "HaVolAmpr",
      "相别无关谐波或间谐波无功功率系列"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别无关谐波或间谐波无功功率系列",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HaVolAmpr"
  },
  {
    "id": "part74-do-HaWatt",
    "zh": "HaWatt",
    "en": "HaWatt",
    "aliases": [
      "HaWatt",
      "相别无关谐波或间谐波有功功率系列"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别无关谐波或间谐波有功功率系列",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HaWatt"
  },
  {
    "id": "part74-do-HCfA",
    "zh": "HCfA",
    "en": "HCfA",
    "aliases": [
      "HCfA",
      "相别有关电流的峰值因子，按各相给出。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别有关电流的峰值因子，按各相给出。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HCfA"
  },
  {
    "id": "part74-do-HCfPhV",
    "zh": "HCfPhV",
    "en": "HCfPhV",
    "aliases": [
      "HCfPhV",
      "相电压峰值因子，按各相给出。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相电压峰值因子，按各相给出。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HCfPhV"
  },
  {
    "id": "part74-do-HCfPPV",
    "zh": "HCfPPV",
    "en": "HCfPPV",
    "aliases": [
      "HCfPPV",
      "线电压峰值因子，按相间给出。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "线电压峰值因子，按相间给出。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HCfPPV"
  },
  {
    "id": "part74-do-Health",
    "zh": "Health",
    "en": "Health",
    "aliases": [
      "Health",
      "Health / PhyHealth / EEHealth；编码与完整含义见取值页。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "Health / PhyHealth / EEHealth；编码与完整含义见取值页。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Health"
  },
  {
    "id": "part74-do-HiBatVal",
    "zh": "HiBatVal",
    "en": "HiBatVal",
    "aliases": [
      "HiBatVal",
      "电池过充告警值"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "电池过充告警值",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HiBatVal"
  },
  {
    "id": "part74-do-HiCtlV",
    "zh": "HiCtlV",
    "en": "HiCtlV",
    "aliases": [
      "HiCtlV",
      "自上次复位以来·最高控制电压"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "自上次复位以来·最高控制电压",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HiCtlV"
  },
  {
    "id": "part74-do-HiDmdA",
    "zh": "HiDmdA",
    "en": "HiDmdA",
    "aliases": [
      "HiDmdA",
      "自上次复位以来，最大电流需求"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "自上次复位以来，最大电流需求",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HiDmdA"
  },
  {
    "id": "part74-do-HiSet",
    "zh": "HiSet",
    "en": "HiSet",
    "aliases": [
      "HiSet",
      "高动作值，用标称电流百分比表示"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "高动作值，用标称电流百分比表示",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HiSet"
  },
  {
    "id": "part74-do-HiTapPos",
    "zh": "HiTapPos",
    "en": "HiTapPos",
    "aliases": [
      "HiTapPos",
      "自上次复位以来，最高分接开关位置"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "自上次复位以来，最高分接开关位置",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HiTapPos"
  },
  {
    "id": "part74-do-HiTrgLev",
    "zh": "HiTrgLev",
    "en": "HiTrgLev",
    "aliases": [
      "HiTrgLev",
      "高（正）触发电平"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "高（正）触发电平",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HiTrgLev"
  },
  {
    "id": "part74-do-HiVRtg",
    "zh": "HiVRtg",
    "en": "HiVRtg",
    "aliases": [
      "HiVRtg",
      "额定电压（高电压等级）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "额定电压（高电压等级）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HiVRtg"
  },
  {
    "id": "part74-do-Hkf",
    "zh": "Hkf",
    "en": "Hkf",
    "aliases": [
      "Hkf",
      "A、B、C 各相的 K 因子；不是一个统一的全设备标量。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "A、B、C 各相的 K 因子；不是一个统一的全设备标量。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Hkf"
  },
  {
    "id": "part74-do-HPhV",
    "zh": "HPhV",
    "en": "HPhV",
    "aliases": [
      "HPhV",
      "相电压及中性线对地电压谐波或间谐波系列"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相电压及中性线对地电压谐波或间谐波系列",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HPhV"
  },
  {
    "id": "part74-do-HPPV",
    "zh": "HPPV",
    "en": "HPPV",
    "aliases": [
      "HPPV",
      "线电压谐波或间谐波系列"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "线电压谐波或间谐波系列",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HPPV"
  },
  {
    "id": "part74-do-HPTmp",
    "zh": "HPTmp",
    "en": "HPTmp",
    "aliases": [
      "HPTmp",
      "绕组热点温度〔℃）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "绕组热点温度〔℃）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HPTmp"
  },
  {
    "id": "part74-do-HPTmpAlm",
    "zh": "HPTmpAlm",
    "en": "HPTmpAlm",
    "aliases": [
      "HPTmpAlm",
      "热点温度告警(FALSE表示正常：为TRUE时表示温度高）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "热点温度告警(FALSE表示正常：为TRUE时表示温度高）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HPTmpAlm"
  },
  {
    "id": "part74-do-HPTmpTr",
    "zh": "HPTmpTr",
    "en": "HPTmpTr",
    "aliases": [
      "HPTmpTr",
      "TRUE表明绕组热点温度过高，跳闸"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "TRUE表明绕组热点温度过高，跳闸",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HPTmpTr"
  },
  {
    "id": "part74-do-HRmsA",
    "zh": "HRmsA",
    "en": "HRmsA",
    "aliases": [
      "HRmsA",
      "按相给出的电流谐波/间谐波有效值；与总谐波失真百分数分开。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "按相给出的电流谐波/间谐波有效值；与总谐波失真百分数分开。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HRmsA"
  },
  {
    "id": "part74-do-HRmsPhV",
    "zh": "HRmsPhV",
    "en": "HRmsPhV",
    "aliases": [
      "HRmsPhV",
      "按相给出的相电压谐波/间谐波有效值。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "按相给出的相电压谐波/间谐波有效值。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HRmsPhV"
  },
  {
    "id": "part74-do-HRmsPPV",
    "zh": "HRmsPPV",
    "en": "HRmsPPV",
    "aliases": [
      "HRmsPPV",
      "按相间给出的线电压谐波/间谐波有效值。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "按相间给出的线电压谐波/间谐波有效值。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HRmsPPV"
  },
  {
    "id": "part74-do-HTdf",
    "zh": "HTdf",
    "en": "HTdf",
    "aliases": [
      "HTdf",
      "按相给出的变压器降额系数，反映相关频谱的影响。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "按相给出的变压器降额系数，反映相关频谱的影响。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HTdf"
  },
  {
    "id": "part74-do-HTif",
    "zh": "HTif",
    "en": "HTif",
    "aliases": [
      "HTif",
      "按相给出的电压电话影响因子；不同方法的定义须核对。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "按相给出的电压电话影响因子；不同方法的定义须核对。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HTif"
  },
  {
    "id": "part74-do-HTsW",
    "zh": "HTsW",
    "en": "HTsW",
    "aliases": [
      "HTsW",
      "相别有关，总的单相谐波或间谐波有功功率代数和（无基波）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别有关，总的单相谐波或间谐波有功功率代数和（无基波）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HTsW"
  },
  {
    "id": "part74-do-HTuW",
    "zh": "HTuW",
    "en": "HTuW",
    "aliases": [
      "HTuW",
      "相别有关，总的单相谐波或间谐波有功功率绝对值和（无基波）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别有关，总的单相谐波或间谐波有功功率绝对值和（无基波）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HTuW"
  },
  {
    "id": "part74-do-HVA",
    "zh": "HVA",
    "en": "HVA",
    "aliases": [
      "HVA",
      "A、B、C各相谐波或间谐波视在功率系列"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "A、B、C各相谐波或间谐波视在功率系列",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HVA"
  },
  {
    "id": "part74-do-HVAr",
    "zh": "HVAr",
    "en": "HVAr",
    "aliases": [
      "HVAr",
      "A、B、C 各相的谐波/间谐波无功功率序列。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "A、B、C 各相的谐波/间谐波无功功率序列。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HVAr"
  },
  {
    "id": "part74-do-HVStr",
    "zh": "HVStr",
    "en": "HVStr",
    "aliases": [
      "HVStr",
      "当三次谐波相电压测量值超过该数值时，PHIZ保护控制动作启动"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "当三次谐波相电压测量值超过该数值时，PHIZ保护控制动作启动",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HVStr"
  },
  {
    "id": "part74-do-HW",
    "zh": "HW",
    "en": "HW",
    "aliases": [
      "HW",
      "A、B、C 各相的谐波/间谐波有功功率序列。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "A、B、C 各相的谐波/间谐波有功功率序列。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HW"
  },
  {
    "id": "part74-do-Hz",
    "zh": "Hz",
    "en": "Hz",
    "aliases": [
      "Hz",
      "电网频率，Hz"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "电网频率，Hz",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Hz"
  },
  {
    "id": "part74-do-HzInd",
    "zh": "HzInd",
    "en": "HzInd",
    "aliases": [
      "HzInd",
      "母线与线路电压频差的检查结果；TRUE 为越限，FALSE 为未越限。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "母线与线路电压频差的检查结果；TRUE 为越限，FALSE 为未越限。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HzInd"
  },
  {
    "id": "part74-do-HzRtg",
    "zh": "HzRtg",
    "en": "HzRtg",
    "aliases": [
      "HzRtg",
      "额定频率"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "额定频率",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HzRtg"
  },
  {
    "id": "part74-do-HzSet",
    "zh": "HzSet",
    "en": "HzSet",
    "aliases": [
      "HzSet",
      "频率定值"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "频率定值",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-HzSet"
  },
  {
    "id": "part74-do-IhA",
    "zh": "IhA",
    "en": "IhA",
    "aliases": [
      "IhA",
      "按 A/B/C/N/Net/Res 分量组织的间谐波电流序列。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "按 A/B/C/N/Net/Res 分量组织的间谐波电流序列。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-IhA"
  },
  {
    "id": "part74-do-IhAmp",
    "zh": "IhAmp",
    "en": "IhAmp",
    "aliases": [
      "IhAmp",
      "与相别无关间谐波电流系列"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "与相别无关间谐波电流系列",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-IhAmp"
  },
  {
    "id": "part74-do-IhPhV",
    "zh": "IhPhV",
    "en": "IhPhV",
    "aliases": [
      "IhPhV",
      "间谐波相电压序列；按 AN/BN/CN/NG 等相对参考组织。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "间谐波相电压序列；按 AN/BN/CN/NG 等相对参考组织。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-IhPhV"
  },
  {
    "id": "part74-do-IhPPV",
    "zh": "IhPPV",
    "en": "IhPPV",
    "aliases": [
      "IhPPV",
      "间谐波线电压序列；按 AB/BC/CA 组织。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "间谐波线电压序列；按 AB/BC/CA 组织。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-IhPPV"
  },
  {
    "id": "part74-do-IhVA",
    "zh": "IhVA",
    "en": "IhVA",
    "aliases": [
      "IhVA",
      "A、B、C各相间谐波视在功率"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "A、B、C各相间谐波视在功率",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-IhVA"
  },
  {
    "id": "part74-do-IhVAr",
    "zh": "IhVAr",
    "en": "IhVAr",
    "aliases": [
      "IhVAr",
      "A、B、C各相间谐波无功功率"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "A、B、C各相间谐波无功功率",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-IhVAr"
  },
  {
    "id": "part74-do-IhVol",
    "zh": "IhVol",
    "en": "IhVol",
    "aliases": [
      "IhVol",
      "相别无关间谐波电压系列"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别无关间谐波电压系列",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-IhVol"
  },
  {
    "id": "part74-do-IhVolAmp",
    "zh": "IhVolAmp",
    "en": "IhVolAmp",
    "aliases": [
      "IhVolAmp",
      "相别无关间谐波视在功率系列"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别无关间谐波视在功率系列",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-IhVolAmp"
  },
  {
    "id": "part74-do-IhVolAmpr",
    "zh": "IhVolAmpr",
    "en": "IhVolAmpr",
    "aliases": [
      "IhVolAmpr",
      "相别无关间谐波无功功率系列"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别无关间谐波无功功率系列",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-IhVolAmpr"
  },
  {
    "id": "part74-do-IhW",
    "zh": "IhW",
    "en": "IhW",
    "aliases": [
      "IhW",
      "A、B、C 各相间谐波有功功率序列。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "A、B、C 各相间谐波有功功率序列。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-IhW"
  },
  {
    "id": "part74-do-IhWatt",
    "zh": "IhWatt",
    "en": "IhWatt",
    "aliases": [
      "IhWatt",
      "相别无关间谐波有功功率系列"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别无关间谐波有功功率系列",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-IhWatt"
  },
  {
    "id": "part74-do-ImbA",
    "zh": "ImbA",
    "en": "ImbA",
    "aliases": [
      "ImbA",
      "平均相电流偏差"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "平均相电流偏差",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ImbA"
  },
  {
    "id": "part74-do-ImbNgA",
    "zh": "ImbNgA",
    "en": "ImbNgA",
    "aliases": [
      "ImbNgA",
      "电流不平衡负序方法"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "电流不平衡负序方法",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ImbNgA"
  },
  {
    "id": "part74-do-ImbNgV",
    "zh": "ImbNgV",
    "en": "ImbNgV",
    "aliases": [
      "ImbNgV",
      "电压不平衡负序方法"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "电压不平衡负序方法",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ImbNgV"
  },
  {
    "id": "part74-do-ImbPPV",
    "zh": "ImbPPV",
    "en": "ImbPPV",
    "aliases": [
      "ImbPPV",
      "平均线电压偏差"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "平均线电压偏差",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ImbPPV"
  },
  {
    "id": "part74-do-ImbV",
    "zh": "ImbV",
    "en": "ImbV",
    "aliases": [
      "ImbV",
      "平均相电压偏差"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "平均相电压偏差",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ImbV"
  },
  {
    "id": "part74-do-ImbZroA",
    "zh": "ImbZroA",
    "en": "ImbZroA",
    "aliases": [
      "ImbZroA",
      "电流不平衡零序方法"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "电流不平衡零序方法",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ImbZroA"
  },
  {
    "id": "part74-do-ImbZroV",
    "zh": "ImbZroV",
    "en": "ImbZroV",
    "aliases": [
      "ImbZroV",
      "电压不平衡零序方法"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "电压不平衡零序方法",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ImbZroV"
  },
  {
    "id": "part74-do-Ina",
    "zh": "Ina",
    "en": "Ina",
    "aliases": [
      "Ina",
      "因未激活/不活动而终止的关联计数；结合安全监视语境。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "因未激活/不活动而终止的关联计数；结合安全监视语境。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Ina"
  },
  {
    "id": "part74-do-Ind",
    "zh": "Ind",
    "en": "Ind",
    "aliases": [
      "Ind",
      "通用指示"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "通用指示",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Ind"
  },
  {
    "id": "part74-do-InhTmm",
    "zh": "InhTmm",
    "en": "InhTmm",
    "aliases": [
      "InhTmm",
      "激活禁止重新启动条件后，电动机不得再次启动的时间，单位 min。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "激活禁止重新启动条件后，电动机不得再次启动的时间，单位 min。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-InhTmm"
  },
  {
    "id": "part74-do-InOv",
    "zh": "InOv",
    "en": "InOv",
    "aliases": [
      "InOv",
      "该数据指示输入缓冲区发生溢出，对于通信，重要信号可能丢失"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "该数据指示输入缓冲区发生溢出，对于通信，重要信号可能丢失",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-InOv"
  },
  {
    "id": "part74-do-InsAlm",
    "zh": "InsAlm",
    "en": "InsAlm",
    "aliases": [
      "InsAlm",
      "为TRUE时表示在达到预定限值后，如绝缘水平降低，给出告警"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示在达到预定限值后，如绝缘水平降低，给出告警",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-InsAlm"
  },
  {
    "id": "part74-do-InsBlk",
    "zh": "InsBlk",
    "en": "InsBlk",
    "aliases": [
      "InsBlk",
      "绝缘状态不允许安全操作时施加设备闭锁；门槛依赖介质及设备。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "绝缘状态不允许安全操作时施加设备闭锁；门槛依赖介质及设备。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-InsBlk"
  },
  {
    "id": "part74-do-InsLevMax",
    "zh": "InsLevMax",
    "en": "InsLevMax",
    "aliases": [
      "InsLevMax",
      "TRUE 表示绝缘介质水平已达到预设高限。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "TRUE 表示绝缘介质水平已达到预设高限。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-InsLevMax"
  },
  {
    "id": "part74-do-InsLevMin",
    "zh": "InsLevMin",
    "en": "InsLevMin",
    "aliases": [
      "InsLevMin",
      "TRUE 表示绝缘介质水平已达到预设低限。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "TRUE 表示绝缘介质水平已达到预设低限。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-InsLevMin"
  },
  {
    "id": "part74-do-InsTr",
    "zh": "InsTr",
    "en": "InsTr",
    "aliases": [
      "InsTr",
      "为TRUE时表示装置绝缘不能保证"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示装置绝缘不能保证",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-InsTr"
  },
  {
    "id": "part74-do-IntIn",
    "zh": "IntIn",
    "en": "IntIn",
    "aliases": [
      "IntIn",
      "通用整数状态输入；具体业务由工程定义说明。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "通用整数状态输入；具体业务由工程定义说明。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-IntIn"
  },
  {
    "id": "part74-do-ISCSO",
    "zh": "ISCSO",
    "en": "ISCSO",
    "aliases": [
      "ISCSO",
      "通用整数控制输出"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "通用整数控制输出",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ISCSO"
  },
  {
    "id": "part74-do-K0Fact",
    "zh": "K0Fact",
    "en": "K0Fact",
    "aliases": [
      "K0Fact",
      "零序补偿系数"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "零序补偿系数",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-K0Fact"
  },
  {
    "id": "part74-do-K0FactAng",
    "zh": "K0FactAng",
    "en": "K0FactAng",
    "aliases": [
      "K0FactAng",
      "零序补偿系数Ko角"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "零序补偿系数Ko角",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-K0FactAng"
  },
  {
    "id": "part74-do-LCol",
    "zh": "LCol",
    "en": "LCol",
    "aliases": [
      "LCol",
      "可动铁心最低位置"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "可动铁心最低位置",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LCol"
  },
  {
    "id": "part74-do-LDC",
    "zh": "LDC",
    "en": "LDC",
    "aliases": [
      "LDC",
      "线路压降补偿因子"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "线路压降补偿因子",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LDC"
  },
  {
    "id": "part74-do-LDCR",
    "zh": "LDCR",
    "en": "LDCR",
    "aliases": [
      "LDCR",
      "额定电流与正向潮流参考下，线路电阻部分对应的压降补偿量。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "额定电流与正向潮流参考下，线路电阻部分对应的压降补偿量。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LDCR"
  },
  {
    "id": "part74-do-LDCX",
    "zh": "LDCX",
    "en": "LDCX",
    "aliases": [
      "LDCX",
      "额定电流与正向潮流参考下，线路电抗部分对应的压降补偿量。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "额定电流与正向潮流参考下，线路电抗部分对应的压降补偿量。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LDCX"
  },
  {
    "id": "part74-do-LDCZ",
    "zh": "LDCZ",
    "en": "LDCZ",
    "aliases": [
      "LDCZ",
      "额定电流与正向潮流参考下，总阻抗对应的压降补偿量。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "额定电流与正向潮流参考下，总阻抗对应的压降补偿量。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LDCZ"
  },
  {
    "id": "part74-do-LEDRs",
    "zh": "LEDRs",
    "en": "LEDRs",
    "aliases": [
      "LEDRs",
      "复位所有LED发光二极管，为TRUE时表示复位"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "复位所有LED发光二极管，为TRUE时表示复位",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LEDRs"
  },
  {
    "id": "part74-do-Lev",
    "zh": "Lev",
    "en": "Lev",
    "aliases": [
      "Lev",
      "绝缘介质水平"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "绝缘介质水平",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Lev"
  },
  {
    "id": "part74-do-LevMod",
    "zh": "LevMod",
    "en": "LevMod",
    "aliases": [
      "LevMod",
      "扰动记录内部电平触发；编码与完整含义见取值页。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "扰动记录内部电平触发；编码与完整含义见取值页。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LevMod"
  },
  {
    "id": "part74-do-LHz",
    "zh": "LHz",
    "en": "LHz",
    "aliases": [
      "LHz",
      "为TRUE时表示低周；FALSE表示无动作"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示低周；FALSE表示无动作",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LHz"
  },
  {
    "id": "part74-do-LimAOv",
    "zh": "LimAOv",
    "en": "LimAOv",
    "aliases": [
      "LimAOv",
      "溢出闭锁电流限值"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "溢出闭锁电流限值",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LimAOv"
  },
  {
    "id": "part74-do-LimLodA",
    "zh": "LimLodA",
    "en": "LimLodA",
    "aliases": [
      "LimLodA",
      "LodA（百分比）电流上限值·超过该数值，自动调节命令终止"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "LodA（百分比）电流上限值·超过该数值，自动调节命令终止",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LimLodA"
  },
  {
    "id": "part74-do-LimVOv",
    "zh": "LimVOv",
    "en": "LimVOv",
    "aliases": [
      "LimVOv",
      "溢出闭锁电压限值"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "溢出闭锁电压限值",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LimVOv"
  },
  {
    "id": "part74-do-LinAng",
    "zh": "LinAng",
    "en": "LinAng",
    "aliases": [
      "LinAng",
      "馈线/线路阻抗的相角，用于保护范围或相应功能。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "馈线/线路阻抗的相角，用于保护范围或相应功能。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LinAng"
  },
  {
    "id": "part74-do-LinCapac",
    "zh": "LinCapac",
    "en": "LinCapac",
    "aliases": [
      "LinCapac",
      "线路电容"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "线路电容",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LinCapac"
  },
  {
    "id": "part74-do-LinLenKm",
    "zh": "LinLenKm",
    "en": "LinLenKm",
    "aliases": [
      "LinLenKm",
      "线路长度，单位 km。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "线路长度，单位 km。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LinLenKm"
  },
  {
    "id": "part74-do-LivBusVal",
    "zh": "LivBusVal",
    "en": "LivBusVal",
    "aliases": [
      "LivBusVal",
      "自动重合/同期检查中判定母线带电的电压门槛。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "自动重合/同期检查中判定母线带电的电压门槛。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LivBusVal"
  },
  {
    "id": "part74-do-LivDeaMod",
    "zh": "LivDeaMod",
    "en": "LivDeaMod",
    "aliases": [
      "LivDeaMod",
      "带电/不带电检验组合；编码与完整含义见取值页。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "带电/不带电检验组合；编码与完整含义见取值页。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LivDeaMod"
  },
  {
    "id": "part74-do-LivLinVal",
    "zh": "LivLinVal",
    "en": "LivLinVal",
    "aliases": [
      "LivLinVal",
      "自动重合/同期检查中判定线路带电的电压门槛。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "自动重合/同期检查中判定线路带电的电压门槛。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LivLinVal"
  },
  {
    "id": "part74-do-LoBatVal",
    "zh": "LoBatVal",
    "en": "LoBatVal",
    "aliases": [
      "LoBatVal",
      "电池低电压告警门槛；与 BatLo 的状态分开。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "电池低电压告警门槛；与 BatLo 的状态分开。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LoBatVal"
  },
  {
    "id": "part74-do-Loc",
    "zh": "Loc",
    "en": "Loc",
    "aliases": [
      "Loc",
      "就地/远方位置状态；TRUE 为就地，FALSE 为远方。LD 与 LN 冲突时就地主导。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "就地/远方位置状态；TRUE 为就地，FALSE 为远方。LD 与 LN 冲突时就地主导。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Loc"
  },
  {
    "id": "part74-do-LoCtlV",
    "zh": "LoCtlV",
    "en": "LoCtlV",
    "aliases": [
      "LoCtlV",
      "自最近复位以来，最低控制电压"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "自最近复位以来，最低控制电压",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LoCtlV"
  },
  {
    "id": "part74-do-LodA",
    "zh": "LodA",
    "en": "LodA",
    "aliases": [
      "LodA",
      "变压器负荷侧电流"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "变压器负荷侧电流",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LodA"
  },
  {
    "id": "part74-do-LodRsvAlm",
    "zh": "LodRsvAlm",
    "en": "LodRsvAlm",
    "aliases": [
      "LodRsvAlm",
      "到报警前的负荷储备"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "到报警前的负荷储备",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LodRsvAlm"
  },
  {
    "id": "part74-do-LodRsvTr",
    "zh": "LodRsvTr",
    "en": "LodRsvTr",
    "aliases": [
      "LodRsvTr",
      "到跳闸前的负荷储备"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "到跳闸前的负荷储备",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LodRsvTr"
  },
  {
    "id": "part74-do-LokRotTms",
    "zh": "LokRotTms",
    "en": "LokRotTms",
    "aliases": [
      "LokRotTms",
      "锁转子时间(s).该时间是启动期间，允许转子堵转时间"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "锁转子时间(s).该时间是启动期间，允许转子堵转时间",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LokRotTms"
  },
  {
    "id": "part74-do-LoSet",
    "zh": "LoSet",
    "en": "LoSet",
    "aliases": [
      "LoSet",
      "低运行值，标称电流的百分数"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "低运行值，标称电流的百分数",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LoSet"
  },
  {
    "id": "part74-do-LosFact",
    "zh": "LosFact",
    "en": "LosFact",
    "aliases": [
      "LosFact",
      "介质损耗系数（介质角变化量）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "介质损耗系数（介质角变化量）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LosFact"
  },
  {
    "id": "part74-do-LosOfGrd",
    "zh": "LosOfGrd",
    "en": "LosOfGrd",
    "aliases": [
      "LosOfGrd",
      "监护信号丢失"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "监护信号丢失",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LosOfGrd"
  },
  {
    "id": "part74-do-LosOil",
    "zh": "LosOil",
    "en": "LosOil",
    "aliases": [
      "LosOil",
      "为TRUE时表示发觉油损耗"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示发觉油损耗",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LosOil"
  },
  {
    "id": "part74-do-LosVac",
    "zh": "LosVac",
    "en": "LosVac",
    "aliases": [
      "LosVac",
      "为TRUE时表示真空度下降至预定水平之下"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示真空度下降至预定水平之下",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LosVac"
  },
  {
    "id": "part74-do-LoTapPos",
    "zh": "LoTapPos",
    "en": "LoTapPos",
    "aliases": [
      "LoTapPos",
      "自上次复位以来，最低分接开关位置"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "自上次复位以来，最低分接开关位置",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LoTapPos"
  },
  {
    "id": "part74-do-LoTrgLev",
    "zh": "LoTrgLev",
    "en": "LoTrgLev",
    "aliases": [
      "LoTrgLev",
      "低（负）触发电平"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "低（负）触发电平",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LoTrgLev"
  },
  {
    "id": "part74-do-LoVRtg",
    "zh": "LoVRtg",
    "en": "LoVRtg",
    "aliases": [
      "LoVRtg",
      "额定电压（低压等级）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "额定电压（低压等级）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LoVRtg"
  },
  {
    "id": "part74-do-LTCBlk",
    "zh": "LTCBlk",
    "en": "LTCBlk",
    "aliases": [
      "LTCBlk",
      "为TRUE时表示有载分接开关控制闭锁〈禁止）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示有载分接开关控制闭锁〈禁止）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LTCBlk"
  },
  {
    "id": "part74-do-LTCDragRs",
    "zh": "LTCDragRs",
    "en": "LTCDragRs",
    "aliases": [
      "LTCDragRs",
      "复位有载分接开关的高/低位置记忆，使记忆回到当前位置。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "复位有载分接开关的高/低位置记忆，使记忆回到当前位置。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LTCDragRs"
  },
  {
    "id": "part74-do-LV",
    "zh": "LV",
    "en": "LV",
    "aliases": [
      "LV",
      "为TRUE时表示低电压：FALSE表示无动作"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示低电压：FALSE表示无动作",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-LV"
  },
  {
    "id": "part74-do-MaxAmps",
    "zh": "MaxAmps",
    "en": "MaxAmps",
    "aliases": [
      "MaxAmps",
      "所规定分析时段中最大电流"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "所规定分析时段中最大电流",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MaxAmps"
  },
  {
    "id": "part74-do-MaxDlTmms",
    "zh": "MaxDlTmms",
    "en": "MaxDlTmms",
    "aliases": [
      "MaxDlTmms",
      "允许的操作时刻差，涉及请求/期望操作与实际完成之间的时段，单位 ms。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "允许的操作时刻差，涉及请求/期望操作与实际完成之间的时段，单位 ms。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MaxDlTmms"
  },
  {
    "id": "part74-do-MaxEna",
    "zh": "MaxEna",
    "en": "MaxEna",
    "aliases": [
      "MaxEna",
      "为TRUE时表示允许对超过设定值的电流进行监视，以检测电网振荡期间所发生的故障"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示允许对超过设定值的电流进行监视，以检测电网振荡期间所发生的故障",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MaxEna"
  },
  {
    "id": "part74-do-MaxFwdAng",
    "zh": "MaxFwdAng",
    "en": "MaxFwdAng",
    "aliases": [
      "MaxFwdAng",
      "正方向最大相角"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "正方向最大相角",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MaxFwdAng"
  },
  {
    "id": "part74-do-MaxImbA",
    "zh": "MaxImbA",
    "en": "MaxImbA",
    "aliases": [
      "MaxImbA",
      "平均电流最大偏差"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "平均电流最大偏差",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MaxImbA"
  },
  {
    "id": "part74-do-MaxImbPPV",
    "zh": "MaxImbPPV",
    "en": "MaxImbPPV",
    "aliases": [
      "MaxImbPPV",
      "平均线电压最大偏差"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "平均线电压最大偏差",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MaxImbPPV"
  },
  {
    "id": "part74-do-MaxImbV",
    "zh": "MaxImbV",
    "en": "MaxImbV",
    "aliases": [
      "MaxImbV",
      "各相相电压相对于平均值的最大偏差。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "各相相电压相对于平均值的最大偏差。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MaxImbV"
  },
  {
    "id": "part74-do-MaxNumRcd",
    "zh": "MaxNumRcd",
    "en": "MaxNumRcd",
    "aliases": [
      "MaxNumRcd",
      "可记录的最大记录数"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "可记录的最大记录数",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MaxNumRcd"
  },
  {
    "id": "part74-do-MaxNumStr",
    "zh": "MaxNumStr",
    "en": "MaxNumStr",
    "aliases": [
      "MaxNumStr",
      "允许的最大启动次数；必须与 MaxStrTmm 时间窗一起解释。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "允许的最大启动次数；必须与 MaxStrTmm 时间窗一起解释。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MaxNumStr"
  },
  {
    "id": "part74-do-MaxOpCap",
    "zh": "MaxOpCap",
    "en": "MaxOpCap",
    "aliases": [
      "MaxOpCap",
      "机构能量充足时的最大操作能力；当前能力 CBOpCap 不应超过该参考。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "机构能量充足时的最大操作能力；当前能力 CBOpCap 不应超过该参考。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MaxOpCap"
  },
  {
    "id": "part74-do-MaxOpTmms",
    "zh": "MaxOpTmms",
    "en": "MaxOpTmms",
    "aliases": [
      "MaxOpTmms",
      "逻辑接点最大动作时间(ms),用于相关功能协调工作"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "逻辑接点最大动作时间(ms),用于相关功能协调工作",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MaxOpTmms"
  },
  {
    "id": "part74-do-MaxRvAng",
    "zh": "MaxRvAng",
    "en": "MaxRvAng",
    "aliases": [
      "MaxRvAng",
      "反方向最大相角"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "反方向最大相角",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MaxRvAng"
  },
  {
    "id": "part74-do-MaxStrTmm",
    "zh": "MaxStrTmm",
    "en": "MaxStrTmm",
    "aliases": [
      "MaxStrTmm",
      "允许最大启动次数的时间段"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "允许最大启动次数的时间段",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MaxStrTmm"
  },
  {
    "id": "part74-do-MaxVA",
    "zh": "MaxVA",
    "en": "MaxVA",
    "aliases": [
      "MaxVA",
      "在规定的分析时段内最大视在功率"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "在规定的分析时段内最大视在功率",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MaxVA"
  },
  {
    "id": "part74-do-MaxVAr",
    "zh": "MaxVAr",
    "en": "MaxVAr",
    "aliases": [
      "MaxVAr",
      "在规定的分析时段内最大无功功率"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "在规定的分析时段内最大无功功率",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MaxVAr"
  },
  {
    "id": "part74-do-MaxVolts",
    "zh": "MaxVolts",
    "en": "MaxVolts",
    "aliases": [
      "MaxVolts",
      "在规定的分析时段内最大电压"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "在规定的分析时段内最大电压",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MaxVolts"
  },
  {
    "id": "part74-do-MaxW",
    "zh": "MaxW",
    "en": "MaxW",
    "aliases": [
      "MaxW",
      "在规定的分析时段内最大有功功率"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "在规定的分析时段内最大有功功率",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MaxW"
  },
  {
    "id": "part74-do-MaxWrmStr",
    "zh": "MaxWrmStr",
    "en": "MaxWrmStr",
    "aliases": [
      "MaxWrmStr",
      "允许热启动次数"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "允许热启动次数",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MaxWrmStr"
  },
  {
    "id": "part74-do-MemClr",
    "zh": "MemClr",
    "en": "MemClr",
    "aliases": [
      "MemClr",
      "为TRUE时表示清除内存"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示清除内存",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MemClr"
  },
  {
    "id": "part74-do-MemFull",
    "zh": "MemFull",
    "en": "MemFull",
    "aliases": [
      "MemFull",
      "内存满的百分数阈值；MemUsed 是占用百分比，MemOv 是溢出状态。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "内存满的百分数阈值；MemUsed 是占用百分比，MemOv 是溢出状态。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MemFull"
  },
  {
    "id": "part74-do-MemOv",
    "zh": "MemOv",
    "en": "MemOv",
    "aliases": [
      "MemOv",
      "为TRUE时表示内存溢出"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示内存溢出",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MemOv"
  },
  {
    "id": "part74-do-MmeRs",
    "zh": "MmeRs",
    "en": "MmeRs",
    "aliases": [
      "MmeRs",
      "原表 9 此处打印 MmeRs，RDRE 中打印 MemRs；用于复位存储器。保留拼写差异。",
      "MemRs"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "原表 9 此处打印 MmeRs，RDRE 中打印 MemRs；用于复位存储器。保留拼写差异。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MmeRs"
  },
  {
    "id": "part74-do-MemUsed",
    "zh": "MemUsed",
    "en": "MemUsed",
    "aliases": [
      "MemUsed",
      "占用内存百分比"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "占用内存百分比",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MemUsed"
  },
  {
    "id": "part74-do-MinAmps",
    "zh": "MinAmps",
    "en": "MinAmps",
    "aliases": [
      "MinAmps",
      "在规定的分析时段内最小电流"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "在规定的分析时段内最小电流",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MinAmps"
  },
  {
    "id": "part74-do-MinFwdAng",
    "zh": "MinFwdAng",
    "en": "MinFwdAng",
    "aliases": [
      "MinFwdAng",
      "正向最小相角"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "正向最小相角",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MinFwdAng"
  },
  {
    "id": "part74-do-MinOpTmms",
    "zh": "MinOpTmms",
    "en": "MinOpTmms",
    "aliases": [
      "MinOpTmms",
      "逻辑接点最小动作时间(ms),用于与老式机电型继电器配合"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "逻辑接点最小动作时间(ms),用于与老式机电型继电器配合",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MinOpTmms"
  },
  {
    "id": "part74-do-MinPPV",
    "zh": "MinPPV",
    "en": "MinPPV",
    "aliases": [
      "MinPPV",
      "最小线电压"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "最小线电压",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MinPPV"
  },
  {
    "id": "part74-do-MinRvAng",
    "zh": "MinRvAng",
    "en": "MinRvAng",
    "aliases": [
      "MinRvAng",
      "反向最小相角"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "反向最小相角",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MinRvAng"
  },
  {
    "id": "part74-do-MinVA",
    "zh": "MinVA",
    "en": "MinVA",
    "aliases": [
      "MinVA",
      "在规定的分析时段内最小视在功率"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "在规定的分析时段内最小视在功率",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MinVA"
  },
  {
    "id": "part74-do-MinVAr",
    "zh": "MinVAr",
    "en": "MinVAr",
    "aliases": [
      "MinVAr",
      "在规定的分析时段内最小无功功率"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "在规定的分析时段内最小无功功率",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MinVAr"
  },
  {
    "id": "part74-do-MinVolts",
    "zh": "MinVolts",
    "en": "MinVolts",
    "aliases": [
      "MinVolts",
      "在规定的分析时段内最小电压"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "在规定的分析时段内最小电压",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MinVolts"
  },
  {
    "id": "part74-do-MinW",
    "zh": "MinW",
    "en": "MinW",
    "aliases": [
      "MinW",
      "在规定的分析时段内最小有功功率"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "在规定的分析时段内最小有功功率",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MinW"
  },
  {
    "id": "part74-do-Mod",
    "zh": "Mod",
    "en": "Mod",
    "aliases": [
      "Mod",
      "运行模式的可控请求；其枚举和全组合行为见取值页。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "运行模式的可控请求；其枚举和全组合行为见取值页。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Mod"
  },
  {
    "id": "part74-do-MotDrvA",
    "zh": "MotDrvA",
    "en": "MotDrvA",
    "aliases": [
      "MotDrvA",
      "电动机驱动电流"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "电动机驱动电流",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MotDrvA"
  },
  {
    "id": "part74-do-MotStr",
    "zh": "MotStr",
    "en": "MotStr",
    "aliases": [
      "MotStr",
      "电动机启动门槛"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "电动机启动门槛",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MotStr"
  },
  {
    "id": "part74-do-MstAlm",
    "zh": "MstAlm",
    "en": "MstAlm",
    "aliases": [
      "MstAlm",
      "湿度传感器告警(FALSE表示正常；为TRUE时表示高湿）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "湿度传感器告警(FALSE表示正常；为TRUE时表示高湿）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MstAlm"
  },
  {
    "id": "part74-do-NamPlt",
    "zh": "NamPlt",
    "en": "NamPlt",
    "aliases": [
      "NamPlt",
      "逻辑节点铭牌"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "逻辑节点铭牌",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-NamPlt"
  },
  {
    "id": "part74-do-NeutAlm",
    "zh": "NeutAlm",
    "en": "NeutAlm",
    "aliases": [
      "NeutAlm",
      "为TRUE时表示中性点告警"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示中性点告警",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-NeutAlm"
  },
  {
    "id": "part74-do-NgEna",
    "zh": "NgEna",
    "en": "NgEna",
    "aliases": [
      "NgEna",
      "为TRUE时表示允许监视负序电流，以检测电网振荡中不对称故障"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示允许监视负序电流，以检测电网振荡中不对称故障",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-NgEna"
  },
  {
    "id": "part74-do-NomA",
    "zh": "NomA",
    "en": "NomA",
    "aliases": [
      "NomA",
      "本版引用 IEEE 519 的 TDD 计算所用规格化需求电流；节点表 NormA 拼写差异另标。",
      "NormA"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "本版引用 IEEE 519 的 TDD 计算所用规格化需求电流；节点表 NormA 拼写差异另标。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-NomA"
  },
  {
    "id": "part74-do-NumCntRs",
    "zh": "NumCntRs",
    "en": "NumCntRs",
    "aliases": [
      "NumCntRs",
      "计数器复位次数"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "计数器复位次数",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-NumCntRs"
  },
  {
    "id": "part74-do-NumCyc",
    "zh": "NumCyc",
    "en": "NumCyc",
    "aliases": [
      "NumCyc",
      "基频周期数"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "基频周期数",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-NumCyc"
  },
  {
    "id": "part74-do-NumPwrUp",
    "zh": "NumPwrUp",
    "en": "NumPwrUp",
    "aliases": [
      "NumPwrUp",
      "自上次复位以来，物理/逻辑装置加电次数"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "自上次复位以来，物理/逻辑装置加电次数",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-NumPwrUp"
  },
  {
    "id": "part74-do-NumRcd",
    "zh": "NumRcd",
    "en": "NumRcd",
    "aliases": [
      "NumRcd",
      "实际记录数"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "实际记录数",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-NumRcd"
  },
  {
    "id": "part74-do-OANL",
    "zh": "OANL",
    "en": "OANL",
    "aliases": [
      "OANL",
      "TRUE表明一次设备正空载运行"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "TRUE表明一次设备正空载运行",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-OANL"
  },
  {
    "id": "part74-do-Ofs",
    "zh": "Ofs",
    "en": "Ofs",
    "aliases": [
      "Ofs",
      "模拟量的偏移量"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "模拟量的偏移量",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Ofs"
  },
  {
    "id": "part74-do-OilFil",
    "zh": "OilFil",
    "en": "OilFil",
    "aliases": [
      "OilFil",
      "为TRUE时表示油过滤可操作/运行"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示油过滤可操作/运行",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-OilFil"
  },
  {
    "id": "part74-do-OilMotA",
    "zh": "OilMotA",
    "en": "OilMotA",
    "aliases": [
      "OilMotA",
      "油循环电动机驱动电流"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "油循环电动机驱动电流",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-OilMotA"
  },
  {
    "id": "part74-do-OilTmpIn",
    "zh": "OilTmpIn",
    "en": "OilTmpIn",
    "aliases": [
      "OilTmpIn",
      "冷却器进油温"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "冷却器进油温",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-OilTmpIn"
  },
  {
    "id": "part74-do-OilTmpOut",
    "zh": "OilTmpOut",
    "en": "OilTmpOut",
    "aliases": [
      "OilTmpOut",
      "冷却器出油温"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "冷却器出油温",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-OilTmpOut"
  },
  {
    "id": "part74-do-OilTmpSet",
    "zh": "OilTmpSet",
    "en": "OilTmpSet",
    "aliases": [
      "OilTmpSet",
      "油温设定点"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "油温设定点",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-OilTmpSet"
  },
  {
    "id": "part74-do-Op",
    "zh": "Op",
    "en": "Op",
    "aliases": [
      "Op",
      "保护功能的动作判断（ACT）；是否形成 Tr 以及断路器是否执行另读 PTRC/XCBR。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "保护功能的动作判断（ACT）；是否形成 Tr 以及断路器是否执行另读 PTRC/XCBR。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Op"
  },
  {
    "id": "part74-do-OpARem",
    "zh": "OpARem",
    "en": "OpARem",
    "aliases": [
      "OpARem",
      "差动测量/保护所用的远端动作电流相量。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "差动测量/保护所用的远端动作电流相量。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-OpARem"
  },
  {
    "id": "part74-do-OpCls",
    "zh": "OpCls",
    "en": "OpCls",
    "aliases": [
      "OpCls",
      "开关合闸动作信息；控制模型服务不适用时原文允许用相应事件状态传送，须持续足够长供检出。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "开关合闸动作信息；控制模型服务不适用时原文允许用相应事件状态传送，须持续足够长供检出。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-OpCls"
  },
  {
    "id": "part74-do-OpCnt",
    "zh": "OpCnt",
    "en": "OpCnt",
    "aliases": [
      "OpCnt",
      "不可复位动作计数"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "不可复位动作计数",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-OpCnt"
  },
  {
    "id": "part74-do-OpCntRs",
    "zh": "OpCntRs",
    "en": "OpCntRs",
    "aliases": [
      "OpCntRs",
      "可复位逻辑节点动作计数"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "可复位逻辑节点动作计数",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-OpCntRs"
  },
  {
    "id": "part74-do-OpDlTmms",
    "zh": "OpDlTmms",
    "en": "OpDlTmms",
    "aliases": [
      "OpDlTmms",
      "动作条件满足后至动作前的延时，单位 ms。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "动作条件满足后至动作前的延时，单位 ms。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-OpDlTmms"
  },
  {
    "id": "part74-do-OpEx",
    "zh": "OpEx",
    "en": "OpEx",
    "aliases": [
      "OpEx",
      "断路器失灵时跳开故障断路器以外的相关断路器，切除故障。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "断路器失灵时跳开故障断路器以外的相关断路器，切除故障。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-OpEx"
  },
  {
    "id": "part74-do-OpIn",
    "zh": "OpIn",
    "en": "OpIn",
    "aliases": [
      "OpIn",
      "断路器失灵时再次尝试跳开故障断路器本体。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "断路器失灵时再次尝试跳开故障断路器本体。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-OpIn"
  },
  {
    "id": "part74-do-OpOpn",
    "zh": "OpOpn",
    "en": "OpOpn",
    "aliases": [
      "OpOpn",
      "开关分闸动作信息；它不等于 Pos 已反馈分位。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "开关分闸动作信息；它不等于 Pos 已反馈分位。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-OpOpn"
  },
  {
    "id": "part74-do-OpOvA",
    "zh": "OpOvA",
    "en": "OpOvA",
    "aliases": [
      "OpOvA",
      "为TRUE时表示装置在过电流条件下运行"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示装置在过电流条件下运行",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-OpOvA"
  },
  {
    "id": "part74-do-OpOvExt",
    "zh": "OpOvExt",
    "en": "OpOvExt",
    "aliases": [
      "OpOvExt",
      "为TRUE时表示装置在过励磁条件下运行"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示装置在过励磁条件下运行",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-OpOvExt"
  },
  {
    "id": "part74-do-OpOvV",
    "zh": "OpOvV",
    "en": "OpOvV",
    "aliases": [
      "OpOvV",
      "为TRUE时表示装置在过电压条件下运行"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示装置在过电压条件下运行",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-OpOvV"
  },
  {
    "id": "part74-do-OPSA",
    "zh": "OPSA",
    "en": "OPSA",
    "aliases": [
      "OPSA",
      "为TRUE时表示浪涌抑制器动作"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示浪涌抑制器动作",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-OPSA"
  },
  {
    "id": "part74-do-OpTmh",
    "zh": "OpTmh",
    "en": "OpTmh",
    "aliases": [
      "OpTmh",
      "物理装置开始运行以来，运行小时数"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "物理装置开始运行以来，运行小时数",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-OpTmh"
  },
  {
    "id": "part74-do-OpUnExt",
    "zh": "OpUnExt",
    "en": "OpUnExt",
    "aliases": [
      "OpUnExt",
      "为TRUE时表示装置在欠励磁条件下运行"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示装置在欠励磁条件下运行",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-OpUnExt"
  },
  {
    "id": "part74-do-OpUnV",
    "zh": "OpUnV",
    "en": "OpUnV",
    "aliases": [
      "OpUnV",
      "为TRUE时表示装置在欠电压条件下运行"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示装置在欠电压条件下运行",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-OpUnV"
  },
  {
    "id": "part74-do-OutOv",
    "zh": "OutOv",
    "en": "OutOv",
    "aliases": [
      "OutOv",
      "该数据指示输出缓冲区发生溢出，对于通信，重要信号可能丢失"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "该数据指示输出缓冲区发生溢出，对于通信，重要信号可能丢失",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-OutOv"
  },
  {
    "id": "part74-do-PaDschAlm",
    "zh": "PaDschAlm",
    "en": "PaDschAlm",
    "aliases": [
      "PaDschAlm",
      "为TRUE时表示局部放电已达到设定告警水平"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示局部放电已达到设定告警水平",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PaDschAlm"
  },
  {
    "id": "part74-do-ParOp",
    "zh": "ParOp",
    "en": "ParOp",
    "aliases": [
      "ParOp",
      "变压器处于并列运行状态"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "变压器处于并列运行状态",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ParOp"
  },
  {
    "id": "part74-do-PctOfs",
    "zh": "PctOfs",
    "en": "PctOfs",
    "aliases": [
      "PctOfs",
      "距离特性偏移按线路长度百分数表示，结合范围与斜率读保护区域。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "距离特性偏移按线路长度百分数表示，结合范围与斜率读保护区域。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PctOfs"
  },
  {
    "id": "part74-do-PctRch",
    "zh": "PctRch",
    "en": "PctRch",
    "aliases": [
      "PctRch",
      "距离特性范围按线路长度百分数表示。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "距离特性范围按线路长度百分数表示。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PctRch"
  },
  {
    "id": "part74-do-PerTrgTms",
    "zh": "PerTrgTms",
    "en": "PerTrgTms",
    "aliases": [
      "PerTrgTms",
      "周期触发时间，单位s"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "周期触发时间，单位s",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PerTrgTms"
  },
  {
    "id": "part74-do-PF",
    "zh": "PF",
    "en": "PF",
    "aliases": [
      "PF",
      "A、B、C相功率因数，包括相角"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "A、B、C相功率因数，包括相角",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PF"
  },
  {
    "id": "part74-do-PhA",
    "zh": "PhA",
    "en": "PhA",
    "aliases": [
      "PhA",
      "A、B、C相电流(A)，包括相角"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "A、B、C相电流(A)，包括相角",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PhA"
  },
  {
    "id": "part74-do-PhAng",
    "zh": "PhAng",
    "en": "PhAng",
    "aliases": [
      "PhAng",
      "假定正向潮流和 PF=1 参考时，负荷电流 LodA 的相角关系。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "假定正向潮流和 PF=1 参考时，负荷电流 LodA 的相角关系。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PhAng"
  },
  {
    "id": "part74-do-PhDlMod",
    "zh": "PhDlMod",
    "en": "PhDlMod",
    "aliases": [
      "PhDlMod",
      "多相故障动作延时方式使能；TRUE 为启用，FALSE 为关闭。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "多相故障动作延时方式使能；TRUE 为启用，FALSE 为关闭。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PhDlMod"
  },
  {
    "id": "part74-do-PhDlTmms",
    "zh": "PhDlTmms",
    "en": "PhDlTmms",
    "aliases": [
      "PhDlTmms",
      "多相故障动作延时，单位 ms。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "多相故障动作延时，单位 ms。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PhDlTmms"
  },
  {
    "id": "part74-do-PhGndVal",
    "zh": "PhGndVal",
    "en": "PhGndVal",
    "aliases": [
      "PhGndVal",
      "对相对地测量，相对地是弱馈条件欠电压水平"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "对相对地测量，相对地是弱馈条件欠电压水平",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PhGndVal"
  },
  {
    "id": "part74-do-PhStop",
    "zh": "PhStop",
    "en": "PhStop",
    "aliases": [
      "PhStop",
      "相停止值"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相停止值",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PhStop"
  },
  {
    "id": "part74-do-PhStr",
    "zh": "PhStr",
    "en": "PhStr",
    "aliases": [
      "PhStr",
      "若相测量值超过该数值（对下降性质功能，则低于该数值),相关功能动作启动"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "若相测量值超过该数值（对下降性质功能，则低于该数值),相关功能动作启动",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PhStr"
  },
  {
    "id": "part74-do-PhV",
    "zh": "PhV",
    "en": "PhV",
    "aliases": [
      "PhV",
      "A、B、C相电压，包括相角"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "A、B、C相电压，包括相角",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PhV"
  },
  {
    "id": "part74-do-PhVA",
    "zh": "PhVA",
    "en": "PhVA",
    "aliases": [
      "PhVA",
      "A、B、c相视在功率，包括相角"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "A、B、c相视在功率，包括相角",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PhVA"
  },
  {
    "id": "part74-do-PhVAr",
    "zh": "PhVAr",
    "en": "PhVAr",
    "aliases": [
      "PhVAr",
      "A、B、C相无功功率，包括相角"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "A、B、C相无功功率，包括相角",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PhVAr"
  },
  {
    "id": "part74-do-PhW",
    "zh": "PhW",
    "en": "PhW",
    "aliases": [
      "PhW",
      "A、B、c相有功功率，包括相角"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "A、B、c相有功功率，包括相角",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PhW"
  },
  {
    "id": "part74-do-PhyHealth",
    "zh": "PhyHealth",
    "en": "PhyHealth",
    "aliases": [
      "PhyHealth",
      "物理设备健康状态，编码语义与 Health 相同；不等于外部一次设备健康 EEHealth。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "物理设备健康状态，编码语义与 Health 相同；不等于外部一次设备健康 EEHealth。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PhyHealth"
  },
  {
    "id": "part74-do-PhyNam",
    "zh": "PhyNam",
    "en": "PhyNam",
    "aliases": [
      "PhyNam",
      "原表 9 打印 PhyNam，而 LPHD 表打印 PhyName；表示物理设备铭牌。",
      "PhyName"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "原表 9 打印 PhyNam，而 LPHD 表打印 PhyName；表示物理设备铭牌。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PhyNam"
  },
  {
    "id": "part74-do-PhZ",
    "zh": "PhZ",
    "en": "PhZ",
    "aliases": [
      "PhZ",
      "各相阻抗相量；不是只有阻抗模的一个数字。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "各相阻抗相量；不是只有阻抗模的一个数字。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PhZ"
  },
  {
    "id": "part74-do-PlsTmms",
    "zh": "PlsTmms",
    "en": "PlsTmms",
    "aliases": [
      "PlsTmms",
      "规定重合逻辑节点发出的断路器合闸脉冲宽度"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "规定重合逻辑节点发出的断路器合闸脉冲宽度",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PlsTmms"
  },
  {
    "id": "part74-do-PmpAlm",
    "zh": "PmpAlm",
    "en": "PmpAlm",
    "aliases": [
      "PmpAlm",
      "水泵故障",
      "PumpAlm"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "水泵故障",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PmpAlm"
  },
  {
    "id": "part74-do-PmpCtlGen",
    "zh": "PmpCtlGen",
    "en": "PmpCtlGen",
    "aliases": [
      "PmpCtlGen",
      "表 9 的 PmpCtlGen 对应冷却控制表的 PumpCtlGen；控制全部水泵。",
      "PumpCtlGen"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "表 9 的 PmpCtlGen 对应冷却控制表的 PumpCtlGen；控制全部水泵。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PmpCtlGen"
  },
  {
    "id": "part74-do-PmpCtl",
    "zh": "PmpCtl",
    "en": "PmpCtl",
    "aliases": [
      "PmpCtl",
      "PmpCtl / PmpCtlGen 水泵控制；编码与完整含义见取值页。",
      "PumpCtl"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "PmpCtl / PmpCtlGen 水泵控制；编码与完整含义见取值页。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PmpCtl"
  },
  {
    "id": "part74-do-PmpOvCur",
    "zh": "PmpOvCur",
    "en": "PmpOvCur",
    "aliases": [
      "PmpOvCur",
      "水泵过电流跳闸",
      "PumpOvCur"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "水泵过电流跳闸",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PmpOvCur"
  },
  {
    "id": "part74-do-PolQty",
    "zh": "PolQty",
    "en": "PolQty",
    "aliases": [
      "PolQty",
      "方向判定的极化参考量；编码与完整含义见取值页。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "方向判定的极化参考量；编码与完整含义见取值页。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PolQty"
  },
  {
    "id": "part74-do-PoRch",
    "zh": "PoRch",
    "en": "PoRch",
    "aliases": [
      "PoRch",
      "极化范围是姆欧图直径"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "极化范围是姆欧图直径",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PoRch"
  },
  {
    "id": "part74-do-Pos",
    "zh": "Pos",
    "en": "Pos",
    "aliases": [
      "Pos",
      "设备位置状态与可选控制命令；手动开关仅表示状态，命令是否存在按 CDC/实例核对。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "设备位置状态与可选控制命令；手动开关仅表示状态，命令是否存在按 CDC/实例核对。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Pos"
  },
  {
    "id": "part74-do-PosA",
    "zh": "PosA",
    "en": "PosA",
    "aliases": [
      "PosA",
      "在A相可能单独操作处，该数据用于分合操作"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "在A相可能单独操作处，该数据用于分合操作",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PosA"
  },
  {
    "id": "part74-do-PosB",
    "zh": "PosB",
    "en": "PosB",
    "aliases": [
      "PosB",
      "在B相可能单独操作处，该数据用于分合操作"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "在B相可能单独操作处，该数据用于分合操作",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PosB"
  },
  {
    "id": "part74-do-PosC",
    "zh": "PosC",
    "en": "PosC",
    "aliases": [
      "PosC",
      "C 相独立分合的状态/控制对象。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "C 相独立分合的状态/控制对象。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PosC"
  },
  {
    "id": "part74-do-POWCap",
    "zh": "POWCap",
    "en": "POWCap",
    "aliases": [
      "POWCap",
      "定点分合能力；编码与完整含义见取值页。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "定点分合能力；编码与完整含义见取值页。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-POWCap"
  },
  {
    "id": "part74-do-PPV",
    "zh": "PPV",
    "en": "PPV",
    "aliases": [
      "PPV",
      "线电压"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "线电压",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PPV"
  },
  {
    "id": "part74-do-PPVVal",
    "zh": "PPVVal",
    "en": "PPVVal",
    "aliases": [
      "PPVVal",
      "对相间测量，弱馈条件欠电压水平"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "对相间测量，弱馈条件欠电压水平",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PPVVal"
  },
  {
    "id": "part74-do-Pres",
    "zh": "Pres",
    "en": "Pres",
    "aliases": [
      "Pres",
      "特殊容器压力"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "特殊容器压力",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Pres"
  },
  {
    "id": "part74-do-PresAlm",
    "zh": "PresAlm",
    "en": "PresAlm",
    "aliases": [
      "PresAlm",
      "异常条件，压力告警（FALSE表示正常，为TRUE时表示告警）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "异常条件，压力告警（FALSE表示正常，为TRUE时表示告警）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PresAlm"
  },
  {
    "id": "part74-do-PresTr",
    "zh": "PresTr",
    "en": "PresTr",
    "aliases": [
      "PresTr",
      "原表名称为压力跳闸而中文解释写 Level 告警；存在语义不一致，需核对版次/设备文档。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "原表名称为压力跳闸而中文解释写 Level 告警；存在语义不一致，需核对版次/设备文档。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PresTr"
  },
  {
    "id": "part74-do-PreTmms",
    "zh": "PreTmms",
    "en": "PreTmms",
    "aliases": [
      "PreTmms",
      "触发前记录窗口，单位 ms；不同于触发门槛。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "触发前记录窗口，单位 ms；不同于触发门槛。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PreTmms"
  },
  {
    "id": "part74-do-ProRx",
    "zh": "ProRx",
    "en": "ProRx",
    "aliases": [
      "ProRx",
      "为TRUE时表示保护功能已收到来自线路对端的正向故障信息"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示保护功能已收到来自线路对端的正向故障信息",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ProRx"
  },
  {
    "id": "part74-do-ProTx",
    "zh": "ProTx",
    "en": "ProTx",
    "aliases": [
      "ProTx",
      "为TRUE时表示保护检测到正向故障并已向线路对侧传输该信息"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示保护检测到正向故障并已向线路对侧传输该信息",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ProTx"
  },
  {
    "id": "part74-do-Proxy",
    "zh": "Proxy",
    "en": "Proxy",
    "aliases": [
      "Proxy",
      "为TRUE时表示逻辑节点是代理服务器"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示逻辑节点是代理服务器",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Proxy"
  },
  {
    "id": "part74-do-PstTmms",
    "zh": "PstTmms",
    "en": "PstTmms",
    "aliases": [
      "PstTmms",
      "触发后记录窗口，单位 ms。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "触发后记录窗口，单位 ms。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PstTmms"
  },
  {
    "id": "part74-do-PwrDn",
    "zh": "PwrDn",
    "en": "PwrDn",
    "aliases": [
      "PwrDn",
      "为TRUE时表示检测到装置电源断电"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示检测到装置电源断电",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PwrDn"
  },
  {
    "id": "part74-do-PwrFact",
    "zh": "PwrFact",
    "en": "PwrFact",
    "aliases": [
      "PwrFact",
      "未指定相功率因数"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "未指定相功率因数",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PwrFact"
  },
  {
    "id": "part74-do-PwrRtg",
    "zh": "PwrRtg",
    "en": "PwrRtg",
    "aliases": [
      "PwrRtg",
      "额定功率"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "额定功率",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PwrRtg"
  },
  {
    "id": "part74-do-PwrSupAlm",
    "zh": "PwrSupAlm",
    "en": "PwrSupAlm",
    "aliases": [
      "PwrSupAlm",
      "LPHD 所建模 IED 的本地电源告警；不等于整个站外部电源系统的健康。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "LPHD 所建模 IED 的本地电源告警；不等于整个站外部电源系统的健康。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PwrSupAlm"
  },
  {
    "id": "part74-do-PwrUp",
    "zh": "PwrUp",
    "en": "PwrUp",
    "aliases": [
      "PwrUp",
      "为TRUE时表示检测到装置加电"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示检测到装置加电",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PwrUp"
  },
  {
    "id": "part74-do-R0",
    "zh": "R0",
    "en": "R0",
    "aliases": [
      "R0",
      "零序线路电阻"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "零序线路电阻",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-R0"
  },
  {
    "id": "part74-do-R1",
    "zh": "R1",
    "en": "R1",
    "aliases": [
      "R1",
      "正序线路电阻"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "正序线路电阻",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-R1"
  },
  {
    "id": "part74-do-Rat",
    "zh": "Rat",
    "en": "Rat",
    "aliases": [
      "Rat",
      "仪用互感器/传感器变比"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "仪用互感器/传感器变比",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Rat"
  },
  {
    "id": "part74-do-RcdMade",
    "zh": "RcdMade",
    "en": "RcdMade",
    "aliases": [
      "RcdMade",
      "为TRUE时表示扰动记录完成"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示扰动记录完成",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-RcdMade"
  },
  {
    "id": "part74-do-RcdMod",
    "zh": "RcdMod",
    "en": "RcdMod",
    "aliases": [
      "RcdMod",
      "记录存储策略；编码与完整含义见取值页。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "记录存储策略；编码与完整含义见取值页。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-RcdMod"
  },
  {
    "id": "part74-do-RcdStr",
    "zh": "RcdStr",
    "en": "RcdStr",
    "aliases": [
      "RcdStr",
      "为TRUE时表示扰动记录过程开始"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示扰动记录过程开始",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-RcdStr"
  },
  {
    "id": "part74-do-RcdTrg",
    "zh": "RcdTrg",
    "en": "RcdTrg",
    "aliases": [
      "RcdTrg",
      "为TRUE时表示触发记录设备的外部命令"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示触发记录设备的外部命令",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-RcdTrg"
  },
  {
    "id": "part74-do-RclTmms",
    "zh": "RclTmms",
    "en": "RclTmms",
    "aliases": [
      "RclTmms",
      "重合闸复归时间（成功重合之后），单位ms"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "重合闸复归时间（成功重合之后），单位ms",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-RclTmms"
  },
  {
    "id": "part74-do-RCol",
    "zh": "RCol",
    "en": "RCol",
    "aliases": [
      "RCol",
      "可动铁心上升位置"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "可动铁心上升位置",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-RCol"
  },
  {
    "id": "part74-do-ReactPwrL",
    "zh": "ReactPwrL",
    "en": "ReactPwrL",
    "aliases": [
      "ReactPwrL",
      "为TRUE时表示降低无功功率：FALSE表示无动作"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示降低无功功率：FALSE表示无动作",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ReactPwrL"
  },
  {
    "id": "part74-do-ReactPwrR",
    "zh": "ReactPwrR",
    "en": "ReactPwrR",
    "aliases": [
      "ReactPwrR",
      "为TRUE时表示提高无功功率，FALSE表示无动作"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示提高无功功率，FALSE表示无动作",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ReactPwrR"
  },
  {
    "id": "part74-do-Rec1Tmms",
    "zh": "Rec1Tmms",
    "en": "Rec1Tmms",
    "aliases": [
      "Rec1Tmms",
      "第一次重合闸延时，单位 ms。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "第一次重合闸延时，单位 ms。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Rec1Tmms"
  },
  {
    "id": "part74-do-Rec2Tmms",
    "zh": "Rec2Tmms",
    "en": "Rec2Tmms",
    "aliases": [
      "Rec2Tmms",
      "第一次重合之后至第二次重合的延时，单位 ms。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "第一次重合之后至第二次重合的延时，单位 ms。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Rec2Tmms"
  },
  {
    "id": "part74-do-Rec3Tmms",
    "zh": "Rec3Tmms",
    "en": "Rec3Tmms",
    "aliases": [
      "Rec3Tmms",
      "第二次重合之后至第三次重合的延时，单位 ms。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "第二次重合之后至第三次重合的延时，单位 ms。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Rec3Tmms"
  },
  {
    "id": "part74-do-RefPF",
    "zh": "RefPF",
    "en": "RefPF",
    "aliases": [
      "RefPF",
      "运行时套管参考功率因数"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "运行时套管参考功率因数",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-RefPF"
  },
  {
    "id": "part74-do-RefReact",
    "zh": "RefReact",
    "en": "RefReact",
    "aliases": [
      "RefReact",
      "运行时套管参考电容"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "运行时套管参考电容",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-RefReact"
  },
  {
    "id": "part74-do-RefV",
    "zh": "RefV",
    "en": "RefV",
    "aliases": [
      "RefV",
      "运行时套管参考电压"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "运行时套管参考电压",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-RefV"
  },
  {
    "id": "part74-do-Rel",
    "zh": "Rel",
    "en": "Rel",
    "aliases": [
      "Rel",
      "TRUE表明满足所有要求条件，着手分合和运行操作：FALSE表示闭锁"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "TRUE表明满足所有要求条件，着手分合和运行操作：FALSE表示闭锁",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Rel"
  },
  {
    "id": "part74-do-ReTrgMod",
    "zh": "ReTrgMod",
    "en": "ReTrgMod",
    "aliases": [
      "ReTrgMod",
      "采集先前记录期间再次触发：TRUE 开始新记录，FALSE 忽略该再次触发。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "采集先前记录期间再次触发：TRUE 开始新记录，FALSE 忽略该再次触发。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ReTrgMod"
  },
  {
    "id": "part74-do-ReTrMod",
    "zh": "ReTrMod",
    "en": "ReTrMod",
    "aliases": [
      "ReTrMod",
      "断路器失灵再次跳闸方式；编码与完整含义见取值页。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "断路器失灵再次跳闸方式；编码与完整含义见取值页。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ReTrMod"
  },
  {
    "id": "part74-do-RHz",
    "zh": "RHz",
    "en": "RHz",
    "aliases": [
      "RHz",
      "为TRUE时表示上升频率；FALSE表示没有激活"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示上升频率；FALSE表示没有激活",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-RHz"
  },
  {
    "id": "part74-do-RisGndRch",
    "zh": "RisGndRch",
    "en": "RisGndRch",
    "aliases": [
      "RisGndRch",
      "四边形接地距离元件的电阻覆盖范围，须结合极化、零序补偿与线路角。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "四边形接地距离元件的电阻覆盖范围，须结合极化、零序补偿与线路角。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-RisGndRch"
  },
  {
    "id": "part74-do-RisLod",
    "zh": "RisLod",
    "en": "RisLod",
    "aliases": [
      "RisLod",
      "负荷区的电阻范围；配合 AngLod 区分正常负荷与保护动作区。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "负荷区的电阻范围；配合 AngLod 区分正常负荷与保护动作区。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-RisLod"
  },
  {
    "id": "part74-do-RisPhRch",
    "zh": "RisPhRch",
    "en": "RisPhRch",
    "aliases": [
      "RisPhRch",
      "四边形单相距离元件的电阻覆盖范围。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "四边形单相距离元件的电阻覆盖范围。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-RisPhRch"
  },
  {
    "id": "part74-do-Rm0",
    "zh": "Rm0",
    "en": "Rm0",
    "aliases": [
      "Rm0",
      "并行线路耦合互阻"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "并行线路耦合互阻",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Rm0"
  },
  {
    "id": "part74-do-RnbkRV",
    "zh": "RnbkRV",
    "en": "RnbkRV",
    "aliases": [
      "RnbkRV",
      "运行返回/回差相关的升压侧控制电压参考，需与降压动作门槛及控制带一起解释。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "运行返回/回差相关的升压侧控制电压参考，需与降压动作门槛及控制带一起解释。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-RnbkRV"
  },
  {
    "id": "part74-do-RsDlTmms",
    "zh": "RsDlTmms",
    "en": "RsDlTmms",
    "aliases": [
      "RsDlTmms",
      "复归条件满足后至复归前的延时，单位 ms。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "复归条件满足后至复归前的延时，单位 ms。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-RsDlTmms"
  },
  {
    "id": "part74-do-RsStat",
    "zh": "RsStat",
    "en": "RsStat",
    "aliases": [
      "RsStat",
      "装置统计复位命令；LPHD 的上下文与 GSAL 监视计数区分。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "装置统计复位命令；LPHD 的上下文与 GSAL 监视计数区分。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-RsStat"
  },
  {
    "id": "part74-do-RstA",
    "zh": "RstA",
    "en": "RstA",
    "aliases": [
      "RstA",
      "制动电流"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "制动电流",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-RstA"
  },
  {
    "id": "part74-do-RstMod",
    "zh": "RstMod",
    "en": "RstMod",
    "aliases": [
      "RstMod",
      "差动制动方式；编码与完整含义见取值页。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "差动制动方式；编码与完整含义见取值页。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-RstMod"
  },
  {
    "id": "part74-do-RV",
    "zh": "RV",
    "en": "RV",
    "aliases": [
      "RV",
      "TRUE 表示请求提高电压，FALSE 为未激活。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "TRUE 表示请求提高电压，FALSE 为未激活。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-RV"
  },
  {
    "id": "part74-do-RvABlk",
    "zh": "RvABlk",
    "en": "RvABlk",
    "aliases": [
      "RvABlk",
      "电流反向功能的闭锁信号。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "电流反向功能的闭锁信号。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-RvABlk"
  },
  {
    "id": "part74-do-RvAMod",
    "zh": "RvAMod",
    "en": "RvAMod",
    "aliases": [
      "RvAMod",
      "电流反向功能；编码与完整含义见取值页。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "电流反向功能；编码与完整含义见取值页。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-RvAMod"
  },
  {
    "id": "part74-do-RvATmms",
    "zh": "RvATmms",
    "en": "RvATmms",
    "aliases": [
      "RvATmms",
      "电流反向逻辑的检出延时，单位 ms。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "电流反向逻辑的检出延时，单位 ms。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-RvATmms"
  },
  {
    "id": "part74-do-RvRsTmms",
    "zh": "RvRsTmms",
    "en": "RvRsTmms",
    "aliases": [
      "RvRsTmms",
      "反向故障消失后，电流反向输出仍维持这一段时间"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "反向故障消失后，电流反向输出仍维持这一段时间",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-RvRsTmms"
  },
  {
    "id": "part74-do-SchTyp",
    "zh": "SchTyp",
    "en": "SchTyp",
    "aliases": [
      "SchTyp",
      "线路保护配置；编码与完整含义见取值页。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "线路保护配置；编码与完整含义见取值页。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-SchTyp"
  },
  {
    "id": "part74-do-SecTmms",
    "zh": "SecTmms",
    "en": "SecTmms",
    "aliases": [
      "SecTmms",
      "监护信号丢失检出的安全定时，单位 ms；Sec 为 Security。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "监护信号丢失检出的安全定时，单位 ms；Sec 为 Security。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-SecTmms"
  },
  {
    "id": "part74-do-SeqA",
    "zh": "SeqA",
    "en": "SeqA",
    "aliases": [
      "SeqA",
      "正序、负序、零序电流测量绝对值"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "正序、负序、零序电流测量绝对值",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-SeqA"
  },
  {
    "id": "part74-do-SeqV",
    "zh": "SeqV",
    "en": "SeqV",
    "aliases": [
      "SeqV",
      "正序、负序、零序电压测量绝对值"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "正序、负序、零序电压测量绝对值",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-SeqV"
  },
  {
    "id": "part74-do-SetA",
    "zh": "SetA",
    "en": "SetA",
    "aliases": [
      "SetA",
      "限制电动机启动的电流定值（如考虑运行条件或热应力）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "限制电动机启动的电流定值（如考虑运行条件或热应力）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-SetA"
  },
  {
    "id": "part74-do-SetTms",
    "zh": "SetTms",
    "en": "SetTms",
    "aliases": [
      "SetTms",
      "限制电动机启动的时间定值（如考虑运行条件或热应力）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "限制电动机启动的时间定值（如考虑运行条件或热应力）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-SetTms"
  },
  {
    "id": "part74-do-ShOpCap",
    "zh": "ShOpCap",
    "en": "ShOpCap",
    "aliases": [
      "ShOpCap",
      "分流开关操作能力；编码与完整含义见取值页。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "分流开关操作能力；编码与完整含义见取值页。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ShOpCap"
  },
  {
    "id": "part74-do-SPCSO",
    "zh": "SPCSO",
    "en": "SPCSO",
    "aliases": [
      "SPCSO",
      "通用单点可控状态输出"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "通用单点可控状态输出",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-SPCSO"
  },
  {
    "id": "part74-do-SPlTrTmms",
    "zh": "SPlTrTmms",
    "en": "SPlTrTmms",
    "aliases": [
      "SPlTrTmms",
      "断路器失灵再次试跳故障断路器前的单相延时，单位 ms。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "断路器失灵再次试跳故障断路器前的单相延时，单位 ms。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-SPlTrTmms"
  },
  {
    "id": "part74-do-StopVlv",
    "zh": "StopVlv",
    "en": "StopVlv",
    "aliases": [
      "StopVlv",
      "该数据控制和指示控制发电机动力的断流阀开度，如液体流量控制"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "该数据控制和指示控制发电机动力的断流阀开度，如液体流量控制",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-StopVlv"
  },
  {
    "id": "part74-do-Str",
    "zh": "Str",
    "en": "Str",
    "aliases": [
      "Str",
      "检出故障或不可接受条件的启动信息（ACD）；可包含相别与方向。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "检出故障或不可接受条件的启动信息（ACD）；可包含相别与方向。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Str"
  },
  {
    "id": "part74-do-StrInh",
    "zh": "StrInh",
    "en": "StrInh",
    "aliases": [
      "StrInh",
      "禁止重新启动状态信息"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "禁止重新启动状态信息",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-StrInh"
  },
  {
    "id": "part74-do-StrInhTmm",
    "zh": "StrInhTmm",
    "en": "StrInhTmm",
    "aliases": [
      "StrInhTmm",
      "禁止重新启动的时间信息，名称后缀为分钟；原表 CDC 为 ISI 的差异另标。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "禁止重新启动的时间信息，名称后缀为分钟；原表 CDC 为 ISI 的差异另标。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-StrInhTmm"
  },
  {
    "id": "part74-do-StrPOW",
    "zh": "StrPOW",
    "en": "StrPOW",
    "aliases": [
      "StrPOW",
      "为TRUE时表示由CSWI或RREC请求启动CPOW（如通过选择）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示由CSWI或RREC请求启动CPOW（如通过选择）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-StrPOW"
  },
  {
    "id": "part74-do-StrVal",
    "zh": "StrVal",
    "en": "StrVal",
    "aliases": [
      "StrVal",
      "被监视量的启动门槛；对应什么量由父 LN 的功能决定。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "被监视量的启动门槛；对应什么量由父 LN 的功能决定。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-StrVal"
  },
  {
    "id": "part74-do-SumSwARs",
    "zh": "SumSwARs",
    "en": "SumSwARs",
    "aliases": [
      "SumSwARs",
      "分合电流和，可复位"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "分合电流和，可复位",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-SumSwARs"
  },
  {
    "id": "part74-do-SupVArh",
    "zh": "SupVArh",
    "en": "SupVArh",
    "aliases": [
      "SupVArh",
      "无功电能供给（缺省方向：无功流入母线）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "无功电能供给（缺省方向：无功流入母线）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-SupVArh"
  },
  {
    "id": "part74-do-SupWh",
    "zh": "SupWh",
    "en": "SupWh",
    "aliases": [
      "SupWh",
      "有功电能供给（缺省方向；有功流入母线）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "有功电能供给（缺省方向；有功流入母线）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-SupWh"
  },
  {
    "id": "part74-do-SvcViol",
    "zh": "SvcViol",
    "en": "SvcViol",
    "aliases": [
      "SvcViol",
      "对于受支持但远方未获准执行的服务的权限违规监视；原 GSAL 表打印 SvcVoil。",
      "SvcVoil"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "对于受支持但远方未获准执行的服务的权限违规监视；原 GSAL 表打印 SvcVoil。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-SvcViol"
  },
  {
    "id": "part74-do-SwArcDet",
    "zh": "SwArcDet",
    "en": "SwArcDet",
    "aliases": [
      "SwArcDet",
      "为TRUE时表示发现分合电弧告警"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示发现分合电弧告警",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-SwArcDet"
  },
  {
    "id": "part74-do-SwgReact",
    "zh": "SwgReact",
    "en": "SwgReact",
    "aliases": [
      "SwgReact",
      "电网振荡电抗值范围"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "电网振荡电抗值范围",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-SwgReact"
  },
  {
    "id": "part74-do-SwgRis",
    "zh": "SwgRis",
    "en": "SwgRis",
    "aliases": [
      "SwgRis",
      "电网振荡电阻值范围"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "电网振荡电阻值范围",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-SwgRis"
  },
  {
    "id": "part74-do-SwgTmms",
    "zh": "SwgTmms",
    "en": "SwgTmms",
    "aliases": [
      "SwgTmms",
      "电网振荡检测时间，单位ms"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "电网振荡检测时间，单位ms",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-SwgTmms"
  },
  {
    "id": "part74-do-SwgVal",
    "zh": "SwgVal",
    "en": "SwgVal",
    "aliases": [
      "SwgVal",
      "电网振荡检测边界，与阻抗轨迹穿越内外边界的时间配合。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "电网振荡检测边界，与阻抗轨迹穿越内外边界的时间配合。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-SwgVal"
  },
  {
    "id": "part74-do-SwOpCap",
    "zh": "SwOpCap",
    "en": "SwOpCap",
    "aliases": [
      "SwOpCap",
      "开关操作能力；编码与完整含义见取值页。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "开关操作能力；编码与完整含义见取值页。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-SwOpCap"
  },
  {
    "id": "part74-do-SwTyp",
    "zh": "SwTyp",
    "en": "SwTyp",
    "aliases": [
      "SwTyp",
      "开关类型；编码与完整含义见取值页。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "开关类型；编码与完整含义见取值页。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-SwTyp"
  },
  {
    "id": "part74-do-SynPrg",
    "zh": "SynPrg",
    "en": "SynPrg",
    "aliases": [
      "SynPrg",
      "同步进行中"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "同步进行中",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-SynPrg"
  },
  {
    "id": "part74-do-TapBlkL",
    "zh": "TapBlkL",
    "en": "TapBlkL",
    "aliases": [
      "TapBlkL",
      "闭锁自动降挡命令时有载分接开关调节器的分接开关位置"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "闭锁自动降挡命令时有载分接开关调节器的分接开关位置",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TapBlkL"
  },
  {
    "id": "part74-do-TapBlkR",
    "zh": "TapBlkR",
    "en": "TapBlkR",
    "aliases": [
      "TapBlkR",
      "闭锁自动升挡命令时有载分接开关调节器的分接开关位置"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "闭锁自动升挡命令时有载分接开关调节器的分接开关位置",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TapBlkR"
  },
  {
    "id": "part74-do-TapChg",
    "zh": "TapChg",
    "en": "TapChg",
    "aliases": [
      "TapChg",
      "表示步进或调节一挡分接开关位置过程控制"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "表示步进或调节一挡分接开关位置过程控制",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TapChg"
  },
  {
    "id": "part74-do-TapPos",
    "zh": "TapPos",
    "en": "TapPos",
    "aliases": [
      "TapPos",
      "表示变压器离散调节，例如，用于有载分接开关调节器调节分接开关到指定位置"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "表示变压器离散调节，例如，用于有载分接开关调节器调节分接开关到指定位置",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TapPos"
  },
  {
    "id": "part74-do-TddA",
    "zh": "TddA",
    "en": "TddA",
    "aliases": [
      "TddA",
      "相别有关电流总需求失真（TDD），全部相关分量；按本版引用的 IEEE 519 定义和需求电流参考读取。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别有关电流总需求失真（TDD），全部相关分量；按本版引用的 IEEE 519 定义和需求电流参考读取。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TddA"
  },
  {
    "id": "part74-do-TddAmp",
    "zh": "TddAmp",
    "en": "TddAmp",
    "aliases": [
      "TddAmp",
      "相别无关电流总需求失真（TDD），全部相关分量；按本版引用的 IEEE 519 定义和需求电流参考读取。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别无关电流总需求失真（TDD），全部相关分量；按本版引用的 IEEE 519 定义和需求电流参考读取。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TddAmp"
  },
  {
    "id": "part74-do-TddEvnA",
    "zh": "TddEvnA",
    "en": "TddEvnA",
    "aliases": [
      "TddEvnA",
      "相别有关电流总需求失真（TDD），偶分量；按本版引用的 IEEE 519 定义和需求电流参考读取。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别有关电流总需求失真（TDD），偶分量；按本版引用的 IEEE 519 定义和需求电流参考读取。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TddEvnA"
  },
  {
    "id": "part74-do-TddEvnAmp",
    "zh": "TddEvnAmp",
    "en": "TddEvnAmp",
    "aliases": [
      "TddEvnAmp",
      "相别无关电流总需求失真（TDD），偶分量；按本版引用的 IEEE 519 定义和需求电流参考读取。",
      "TddEvenAmp"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别无关电流总需求失真（TDD），偶分量；按本版引用的 IEEE 519 定义和需求电流参考读取。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TddEvnAmp"
  },
  {
    "id": "part74-do-TddOddA",
    "zh": "TddOddA",
    "en": "TddOddA",
    "aliases": [
      "TddOddA",
      "相别有关电流总需求失真（TDD），奇分量；按本版引用的 IEEE 519 定义和需求电流参考读取。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别有关电流总需求失真（TDD），奇分量；按本版引用的 IEEE 519 定义和需求电流参考读取。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TddOddA"
  },
  {
    "id": "part74-do-TddOddAmp",
    "zh": "TddOddAmp",
    "en": "TddOddAmp",
    "aliases": [
      "TddOddAmp",
      "相别无关电流总需求失真（TDD），奇分量；按本版引用的 IEEE 519 定义和需求电流参考读取。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别无关电流总需求失真（TDD），奇分量；按本版引用的 IEEE 519 定义和需求电流参考读取。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TddOddAmp"
  },
  {
    "id": "part74-do-TestRsl",
    "zh": "TestRsl",
    "en": "TestRsl",
    "aliases": [
      "TestRsl",
      "测试结果值"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "测试结果值",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TestRsl"
  },
  {
    "id": "part74-do-ThdA",
    "zh": "ThdA",
    "en": "ThdA",
    "aliases": [
      "ThdA",
      "相别有关电流总谐波/间谐波失真，全部相关分量；计算方法与参考量须明确。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别有关电流总谐波/间谐波失真，全部相关分量；计算方法与参考量须明确。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ThdA"
  },
  {
    "id": "part74-do-ThdAmp",
    "zh": "ThdAmp",
    "en": "ThdAmp",
    "aliases": [
      "ThdAmp",
      "相别无关电流总谐波/间谐波失真，全部相关分量；计算方法与参考量须明确。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别无关电流总谐波/间谐波失真，全部相关分量；计算方法与参考量须明确。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ThdAmp"
  },
  {
    "id": "part74-do-ThdATmms",
    "zh": "ThdATmms",
    "en": "ThdATmms",
    "aliases": [
      "ThdATmms",
      "电流总谐波/间谐波失真告警延时，单位 ms；与对应 Val 门槛配合。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "电流总谐波/间谐波失真告警延时，单位 ms；与对应 Val 门槛配合。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ThdATmms"
  },
  {
    "id": "part74-do-ThdAVal",
    "zh": "ThdAVal",
    "en": "ThdAVal",
    "aliases": [
      "ThdAVal",
      "电流总谐波/间谐波失真告警门槛，按百分数表示。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "电流总谐波/间谐波失真告警门槛，按百分数表示。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ThdAVal"
  },
  {
    "id": "part74-do-ThdEvnA",
    "zh": "ThdEvnA",
    "en": "ThdEvnA",
    "aliases": [
      "ThdEvnA",
      "相别有关电流总谐波/间谐波失真，偶分量；计算方法与参考量须明确。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别有关电流总谐波/间谐波失真，偶分量；计算方法与参考量须明确。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ThdEvnA"
  },
  {
    "id": "part74-do-ThdEvnAmp",
    "zh": "ThdEvnAmp",
    "en": "ThdEvnAmp",
    "aliases": [
      "ThdEvnAmp",
      "相别无关电流总谐波/间谐波失真，偶分量；计算方法与参考量须明确。",
      "ThdEvenAmp"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别无关电流总谐波/间谐波失真，偶分量；计算方法与参考量须明确。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ThdEvnAmp"
  },
  {
    "id": "part74-do-ThdEvnPhV",
    "zh": "ThdEvnPhV",
    "en": "ThdEvnPhV",
    "aliases": [
      "ThdEvnPhV",
      "相别有关相电压总谐波/间谐波失真，偶分量；计算方法与参考量须明确。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别有关相电压总谐波/间谐波失真，偶分量；计算方法与参考量须明确。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ThdEvnPhV"
  },
  {
    "id": "part74-do-ThdEvnPPV",
    "zh": "ThdEvnPPV",
    "en": "ThdEvnPPV",
    "aliases": [
      "ThdEvnPPV",
      "相别有关线电压总谐波/间谐波失真，偶分量；计算方法与参考量须明确。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别有关线电压总谐波/间谐波失真，偶分量；计算方法与参考量须明确。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ThdEvnPPV"
  },
  {
    "id": "part74-do-ThdEvnVol",
    "zh": "ThdEvnVol",
    "en": "ThdEvnVol",
    "aliases": [
      "ThdEvnVol",
      "相别无关电压总谐波/间谐波失真，偶分量；计算方法与参考量须明确。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别无关电压总谐波/间谐波失真，偶分量；计算方法与参考量须明确。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ThdEvnVol"
  },
  {
    "id": "part74-do-ThdOddA",
    "zh": "ThdOddA",
    "en": "ThdOddA",
    "aliases": [
      "ThdOddA",
      "相别有关电流总谐波/间谐波失真，奇分量；计算方法与参考量须明确。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别有关电流总谐波/间谐波失真，奇分量；计算方法与参考量须明确。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ThdOddA"
  },
  {
    "id": "part74-do-ThdOddAmp",
    "zh": "ThdOddAmp",
    "en": "ThdOddAmp",
    "aliases": [
      "ThdOddAmp",
      "相别无关电流总谐波/间谐波失真，奇分量；计算方法与参考量须明确。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别无关电流总谐波/间谐波失真，奇分量；计算方法与参考量须明确。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ThdOddAmp"
  },
  {
    "id": "part74-do-ThdOddPhV",
    "zh": "ThdOddPhV",
    "en": "ThdOddPhV",
    "aliases": [
      "ThdOddPhV",
      "相别有关相电压总谐波/间谐波失真，奇分量；计算方法与参考量须明确。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别有关相电压总谐波/间谐波失真，奇分量；计算方法与参考量须明确。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ThdOddPhV"
  },
  {
    "id": "part74-do-ThdOddPPV",
    "zh": "ThdOddPPV",
    "en": "ThdOddPPV",
    "aliases": [
      "ThdOddPPV",
      "相别有关线电压总谐波/间谐波失真，奇分量；计算方法与参考量须明确。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别有关线电压总谐波/间谐波失真，奇分量；计算方法与参考量须明确。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ThdOddPPV"
  },
  {
    "id": "part74-do-ThdOddVol",
    "zh": "ThdOddVol",
    "en": "ThdOddVol",
    "aliases": [
      "ThdOddVol",
      "相别无关电压总谐波/间谐波失真，奇分量；计算方法与参考量须明确。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别无关电压总谐波/间谐波失真，奇分量；计算方法与参考量须明确。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ThdOddVol"
  },
  {
    "id": "part74-do-ThdPhV",
    "zh": "ThdPhV",
    "en": "ThdPhV",
    "aliases": [
      "ThdPhV",
      "相别有关相电压总谐波/间谐波失真，全部相关分量；计算方法与参考量须明确。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别有关相电压总谐波/间谐波失真，全部相关分量；计算方法与参考量须明确。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ThdPhV"
  },
  {
    "id": "part74-do-ThdPPV",
    "zh": "ThdPPV",
    "en": "ThdPPV",
    "aliases": [
      "ThdPPV",
      "相别有关线电压总谐波/间谐波失真，全部相关分量；计算方法与参考量须明确。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别有关线电压总谐波/间谐波失真，全部相关分量；计算方法与参考量须明确。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ThdPPV"
  },
  {
    "id": "part74-do-ThdVol",
    "zh": "ThdVol",
    "en": "ThdVol",
    "aliases": [
      "ThdVol",
      "相别无关电压总谐波/间谐波失真，全部相关分量；计算方法与参考量须明确。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别无关电压总谐波/间谐波失真，全部相关分量；计算方法与参考量须明确。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ThdVol"
  },
  {
    "id": "part74-do-ThdVTmms",
    "zh": "ThdVTmms",
    "en": "ThdVTmms",
    "aliases": [
      "ThdVTmms",
      "电压总谐波/间谐波失真告警延时，单位 ms；与对应 Val 门槛配合。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "电压总谐波/间谐波失真告警延时，单位 ms；与对应 Val 门槛配合。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ThdVTmms"
  },
  {
    "id": "part74-do-ThdVVal",
    "zh": "ThdVVal",
    "en": "ThdVVal",
    "aliases": [
      "ThdVVal",
      "电压总谐波/间谐波失真告警门槛，按百分数表示。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "电压总谐波/间谐波失真告警门槛，按百分数表示。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ThdVVal"
  },
  {
    "id": "part74-do-TmACrv",
    "zh": "TmACrv",
    "en": "TmACrv",
    "aliases": [
      "TmACrv",
      "电流—时间动作曲线：x 为电流 A，y 为时间；曲线结构查 CURVE。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "电流—时间动作曲线：x 为电流 A，y 为时间；曲线结构查 CURVE。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TmACrv"
  },
  {
    "id": "part74-do-TmDlChr",
    "zh": "TmDlChr",
    "en": "TmDlChr",
    "aliases": [
      "TmDlChr",
      "TRUE 表示线性延时特性，FALSE 表示反时限特性。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "TRUE 表示线性延时特性，FALSE 表示反时限特性。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TmDlChr"
  },
  {
    "id": "part74-do-TmDlMod",
    "zh": "TmDlMod",
    "en": "TmDlMod",
    "aliases": [
      "TmDlMod",
      "动作延时方式使能：TRUE 为启用，FALSE 为关闭。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "动作延时方式使能：TRUE 为启用，FALSE 为关闭。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TmDlMod"
  },
  {
    "id": "part74-do-TmExc",
    "zh": "TmExc",
    "en": "TmExc",
    "aliases": [
      "TmExc",
      "TRUE 表示 CPOW 允许的最大时间差已超出。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "TRUE 表示 CPOW 允许的最大时间差已超出。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TmExc"
  },
  {
    "id": "part74-do-TmMult",
    "zh": "TmMult",
    "en": "TmMult",
    "aliases": [
      "TmMult",
      "主要用于保护的时间标度倍率或时间标度定值"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "主要用于保护的时间标度倍率或时间标度定值",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TmMult"
  },
  {
    "id": "part74-do-Tmp",
    "zh": "Tmp",
    "en": "Tmp",
    "aliases": [
      "Tmp",
      "指定元件或容器的温度"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "指定元件或容器的温度",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Tmp"
  },
  {
    "id": "part74-do-TmpAlm",
    "zh": "TmpAlm",
    "en": "TmpAlm",
    "aliases": [
      "TmpAlm",
      "温度告警状态；FALSE 为正常，TRUE 为告警。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "温度告警状态；FALSE 为正常，TRUE 为告警。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TmpAlm"
  },
  {
    "id": "part74-do-TmpMax",
    "zh": "TmpMax",
    "en": "TmpMax",
    "aliases": [
      "TmpMax",
      "最大温度"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "最大温度",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TmpMax"
  },
  {
    "id": "part74-do-TmpRl",
    "zh": "TmpRl",
    "en": "TmpRl",
    "aliases": [
      "TmpRl",
      "温度和最大温度间关系"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "温度和最大温度间关系",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TmpRl"
  },
  {
    "id": "part74-do-TmTmpCrv",
    "zh": "TmTmpCrv",
    "en": "TmTmpCrv",
    "aliases": [
      "TmTmpCrv",
      "温度—时间动作曲线：x 为温度，y 为时间。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "温度—时间动作曲线：x 为温度，y 为时间。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TmTmpCrv"
  },
  {
    "id": "part74-do-TmTmpSt",
    "zh": "TmTmpSt",
    "en": "TmTmpSt",
    "aliases": [
      "TmTmpSt",
      "提供活动曲线特性"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "提供活动曲线特性",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TmTmpSt"
  },
  {
    "id": "part74-do-TmVCrv",
    "zh": "TmVCrv",
    "en": "TmVCrv",
    "aliases": [
      "TmVCrv",
      "电压—时间动作曲线：x 为电压 V，y 为时间。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "电压—时间动作曲线：x 为电压 V，y 为时间。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TmVCrv"
  },
  {
    "id": "part74-do-TmVSt",
    "zh": "TmVSt",
    "en": "TmVSt",
    "aliases": [
      "TmVSt",
      "提供活动曲线特性"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "提供活动曲线特性",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TmVSt"
  },
  {
    "id": "part74-do-Torq",
    "zh": "Torq",
    "en": "Torq",
    "aliases": [
      "Torq",
      "驱动力矩"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "驱动力矩",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Torq"
  },
  {
    "id": "part74-do-TotPF",
    "zh": "TotPF",
    "en": "TotPF",
    "aliases": [
      "TotPF",
      "三相电路平均功率因数"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "三相电路平均功率因数",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TotPF"
  },
  {
    "id": "part74-do-TotVA",
    "zh": "TotVA",
    "en": "TotVA",
    "aliases": [
      "TotVA",
      "三相电路总视在功率"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "三相电路总视在功率",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TotVA"
  },
  {
    "id": "part74-do-TotVAh",
    "zh": "TotVAh",
    "en": "TotVAh",
    "aliases": [
      "TotVAh",
      "自上次复位以来，净视在电能"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "自上次复位以来，净视在电能",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TotVAh"
  },
  {
    "id": "part74-do-TotVAr",
    "zh": "TotVAr",
    "en": "TotVAr",
    "aliases": [
      "TotVAr",
      "三相电路总无功功率"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "三相电路总无功功率",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TotVAr"
  },
  {
    "id": "part74-do-TotVArh",
    "zh": "TotVArh",
    "en": "TotVArh",
    "aliases": [
      "TotVArh",
      "自上次复位以来，净无功电能"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "自上次复位以来，净无功电能",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TotVArh"
  },
  {
    "id": "part74-do-TotW",
    "zh": "TotW",
    "en": "TotW",
    "aliases": [
      "TotW",
      "三相电路总有功功率"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "三相电路总有功功率",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TotW"
  },
  {
    "id": "part74-do-TotWh",
    "zh": "TotWh",
    "en": "TotWh",
    "aliases": [
      "TotWh",
      "自上次复位以来，净有功电能"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "自上次复位以来，净有功电能",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TotWh"
  },
  {
    "id": "part74-do-TPTrTmms",
    "zh": "TPTrTmms",
    "en": "TPTrTmms",
    "aliases": [
      "TPTrTmms",
      "断路器失灵再次试跳故障断路器前的三相延时，单位 ms。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "断路器失灵再次试跳故障断路器前的三相延时，单位 ms。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TPTrTmms"
  },
  {
    "id": "part74-do-Tr",
    "zh": "Tr",
    "en": "Tr",
    "aliases": [
      "Tr",
      "由 PTRC 形成的保护跳闸条件/命令信息；与实际断路器位置分开核对。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "由 PTRC 形成的保护跳闸条件/命令信息；与实际断路器位置分开核对。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Tr"
  },
  {
    "id": "part74-do-TrgMod",
    "zh": "TrgMod",
    "en": "TrgMod",
    "aliases": [
      "TrgMod",
      "扰动记录触发来源；编码与完整含义见取值页。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "扰动记录触发来源；编码与完整含义见取值页。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TrgMod"
  },
  {
    "id": "part74-do-TrMod",
    "zh": "TrMod",
    "en": "TrMod",
    "aliases": [
      "TrMod",
      "保护跳闸模式；编码与完整含义见取值页。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "保护跳闸模式；编码与完整含义见取值页。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TrMod"
  },
  {
    "id": "part74-do-TrPlsTmms",
    "zh": "TrPlsTmms",
    "en": "TrPlsTmms",
    "aliases": [
      "TrPlsTmms",
      "跳闸脉冲时间是断路器操作的最小脉冲时间"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "跳闸脉冲时间是断路器操作的最小脉冲时间",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TrPlsTmms"
  },
  {
    "id": "part74-do-TypRsCrv",
    "zh": "TypRsCrv",
    "en": "TypRsCrv",
    "aliases": [
      "TypRsCrv",
      "复归曲线；编码与完整含义见取值页。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "复归曲线；编码与完整含义见取值页。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-TypRsCrv"
  },
  {
    "id": "part74-do-UnBlkMod",
    "zh": "UnBlkMod",
    "en": "UnBlkMod",
    "aliases": [
      "UnBlkMod",
      "解除闭锁方式；编码与完整含义见取值页。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "解除闭锁方式；编码与完整含义见取值页。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-UnBlkMod"
  },
  {
    "id": "part74-do-UnBlkTmms",
    "zh": "UnBlkTmms",
    "en": "UnBlkTmms",
    "aliases": [
      "UnBlkTmms",
      "解除闭锁时间"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "解除闭锁时间",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-UnBlkTmms"
  },
  {
    "id": "part74-do-VHzCrv",
    "zh": "VHzCrv",
    "en": "VHzCrv",
    "aliases": [
      "VHzCrv",
      "电压/频率保护的曲线描述；原表以频率 Hz 为 x、电压 V 为 y。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "电压/频率保护的曲线描述；原表以频率 Hz 为 x、电压 V 为 y。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-VHzCrv"
  },
  {
    "id": "part74-do-VHzSt",
    "zh": "VHzSt",
    "en": "VHzSt",
    "aliases": [
      "VHzSt",
      "提供活动曲线特性"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "提供活动曲线特性",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-VHzSt"
  },
  {
    "id": "part74-do-VInd",
    "zh": "VInd",
    "en": "VInd",
    "aliases": [
      "VInd",
      "该数据给出母线和线路电压绝对值之差检验结果·FALSE说明电压差小于所要求的限值，满足同步检查的电压差条件"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "该数据给出母线和线路电压绝对值之差检验结果·FALSE说明电压差小于所要求的限值，满足同步检查的电压差条件",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-VInd"
  },
  {
    "id": "part74-do-Vol",
    "zh": "Vol",
    "en": "Vol",
    "aliases": [
      "Vol",
      "相别无关电压"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "相别无关电压",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Vol"
  },
  {
    "id": "part74-do-VoltAmp",
    "zh": "VoltAmp",
    "en": "VoltAmp",
    "aliases": [
      "VoltAmp",
      "非三相电路视在功率测量"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "非三相电路视在功率测量",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-VoltAmp"
  },
  {
    "id": "part74-do-VoltAmpr",
    "zh": "VoltAmpr",
    "en": "VoltAmpr",
    "aliases": [
      "VoltAmpr",
      "非三相电路无功功率"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "非三相电路无功功率",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-VoltAmpr"
  },
  {
    "id": "part74-do-VolChgRte",
    "zh": "VolChgRte",
    "en": "VolChgRte",
    "aliases": [
      "VolChgRte",
      "电压改变速率（时间上变化）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "电压改变速率（时间上变化）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-VolChgRte"
  },
  {
    "id": "part74-do-VOvSt",
    "zh": "VOvSt",
    "en": "VOvSt",
    "aliases": [
      "VOvSt",
      "为TRUE时表示电压强制控制状态"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示电压强制控制状态",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-VOvSt"
  },
  {
    "id": "part74-do-VRed",
    "zh": "VRed",
    "en": "VRed",
    "aliases": [
      "VRed",
      "为TRUE时表示降低电压激活，降低负荷侧电压至正常定值以下"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "为TRUE时表示降低电压激活，降低负荷侧电压至正常定值以下",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-VRed"
  },
  {
    "id": "part74-do-VRedVal",
    "zh": "VRedVal",
    "en": "VRedVal",
    "aliases": [
      "VRedVal",
      "当x级降低电压激活时，减少电压范围中间值（百分数）"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "当x级降低电压激活时，减少电压范围中间值（百分数）",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-VRedVal"
  },
  {
    "id": "part74-do-VRtg",
    "zh": "VRtg",
    "en": "VRtg",
    "aliases": [
      "VRtg",
      "额定电压"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "额定电压",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-VRtg"
  },
  {
    "id": "part74-do-VStr",
    "zh": "VStr",
    "en": "VStr",
    "aliases": [
      "VStr",
      "有关功能特定活动启动所必须达到的电压值"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "有关功能特定活动启动所必须达到的电压值",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-VStr"
  },
  {
    "id": "part74-do-WacTrg",
    "zh": "WacTrg",
    "en": "WacTrg",
    "aliases": [
      "WacTrg",
      "自计数器复位以来，监视电路复位装置的次数"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "自计数器复位以来，监视电路复位装置的次数",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-WacTrg"
  },
  {
    "id": "part74-do-Watt",
    "zh": "Watt",
    "en": "Watt",
    "aliases": [
      "Watt",
      "非三相电路有功功率"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "非三相电路有功功率",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Watt"
  },
  {
    "id": "part74-do-WeiMod",
    "zh": "WeiMod",
    "en": "WeiMod",
    "aliases": [
      "WeiMod",
      "弱馈功能模式；编码与完整含义见取值页。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "弱馈功能模式；编码与完整含义见取值页。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-WeiMod"
  },
  {
    "id": "part74-do-WeiOp",
    "zh": "WeiOp",
    "en": "WeiOp",
    "aliases": [
      "WeiOp",
      "弱馈功能动作信号"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "弱馈功能动作信号",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-WeiOp"
  },
  {
    "id": "part74-do-WeiTmms",
    "zh": "WeiTmms",
    "en": "WeiTmms",
    "aliases": [
      "WeiTmms",
      "弱馈协调时间，单位ms"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "弱馈协调时间，单位ms",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-WeiTmms"
  },
  {
    "id": "part74-do-WrmStr",
    "zh": "WrmStr",
    "en": "WrmStr",
    "aliases": [
      "WrmStr",
      "自上次复位以来，物理/逻辑设备的热启动次数。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "自上次复位以来，物理/逻辑设备的热启动次数。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-WrmStr"
  },
  {
    "id": "part74-do-X0",
    "zh": "X0",
    "en": "X0",
    "aliases": [
      "X0",
      "零序线路电抗"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "零序线路电抗",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-X0"
  },
  {
    "id": "part74-do-X1",
    "zh": "X1",
    "en": "X1",
    "aliases": [
      "X1",
      "正序线路电抗"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "正序线路电抗",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-X1"
  },
  {
    "id": "part74-do-Xm0",
    "zh": "Xm0",
    "en": "Xm0",
    "aliases": [
      "Xm0",
      "并行线路互感电抗"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "并行线路互感电抗",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Xm0"
  },
  {
    "id": "part74-do-Z0Ang",
    "zh": "Z0Ang",
    "en": "Z0Ang",
    "aliases": [
      "Z0Ang",
      "零序阻抗角；原文字典举近端 A 的参考。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "零序阻抗角；原文字典举近端 A 的参考。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Z0Ang"
  },
  {
    "id": "part74-do-Z0Mod",
    "zh": "Z0Mod",
    "en": "Z0Mod",
    "aliases": [
      "Z0Mod",
      "零序阻抗模；原文字典举远端 B 的参考，不能只凭名称推断本工程端点。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "零序阻抗模；原文字典举远端 B 的参考，不能只凭名称推断本工程端点。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Z0Mod"
  },
  {
    "id": "part74-do-Z1Ang",
    "zh": "Z1Ang",
    "en": "Z1Ang",
    "aliases": [
      "Z1Ang",
      "正序线路阻抗角。"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "正序线路阻抗角。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Z1Ang"
  },
  {
    "id": "part74-do-Z1Mod",
    "zh": "Z1Mod",
    "en": "Z1Mod",
    "aliases": [
      "Z1Mod",
      "正序线路阻抗模"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "正序线路阻抗模",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Z1Mod"
  },
  {
    "id": "part74-do-ZeroEna",
    "zh": "ZeroEna",
    "en": "ZeroEna",
    "aliases": [
      "ZeroEna",
      "零序电流监视允许(TRUE)"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "零序电流监视允许(TRUE)",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-ZeroEna"
  },
  {
    "id": "part74-do-Zm0Ang",
    "zh": "Zm0Ang",
    "en": "Zm0Ang",
    "aliases": [
      "Zm0Ang",
      "并行线互感阻抗角"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "并行线互感阻抗角",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Zm0Ang"
  },
  {
    "id": "part74-do-Zm0Mod",
    "zh": "Zm0Mod",
    "en": "Zm0Mod",
    "aliases": [
      "Zm0Mod",
      "并行线互感阻抗模"
    ],
    "category": "7-4 数据语义",
    "level": "LN → DO；不是 DA",
    "summary": "并行线互感阻抗模",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Zm0Mod"
  },
  {
    "id": "part74-do-extra-A",
    "zh": "A",
    "en": "A",
    "aliases": [
      "A",
      "相别有关电流复合量；WYE 将相量/相分量组织在子 DO 中。"
    ],
    "category": "7-4 节点表补充名称",
    "level": "节点表语境；非表 9 新增项",
    "summary": "相别有关电流复合量；WYE 将相量/相分量组织在子 DO 中。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-A"
  },
  {
    "id": "part74-do-extra-W",
    "zh": "W",
    "en": "W",
    "aliases": [
      "W",
      "单相有功功率复合量。"
    ],
    "category": "7-4 节点表补充名称",
    "level": "节点表语境；非表 9 新增项",
    "summary": "单相有功功率复合量。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-W"
  },
  {
    "id": "part74-do-extra-VAr",
    "zh": "VAr",
    "en": "VAr",
    "aliases": [
      "VAr",
      "单相无功功率复合量。"
    ],
    "category": "7-4 节点表补充名称",
    "level": "节点表语境；非表 9 新增项",
    "summary": "单相无功功率复合量。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-VAr"
  },
  {
    "id": "part74-do-extra-VA",
    "zh": "VA",
    "en": "VA",
    "aliases": [
      "VA",
      "单相视在功率复合量。"
    ],
    "category": "7-4 节点表补充名称",
    "level": "节点表语境；非表 9 新增项",
    "summary": "单相视在功率复合量。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-VA"
  },
  {
    "id": "part74-do-extra-Z",
    "zh": "Z",
    "en": "Z",
    "aliases": [
      "Z",
      "单相阻抗复合量。"
    ],
    "category": "7-4 节点表补充名称",
    "level": "节点表语境；非表 9 新增项",
    "summary": "单相阻抗复合量。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Z"
  },
  {
    "id": "part74-do-extra-Amp1",
    "zh": "Amp1",
    "en": "Amp1",
    "aliases": [
      "Amp1",
      "MDIF 的 A 相采样电流。"
    ],
    "category": "7-4 节点表补充名称",
    "level": "节点表语境；非表 9 新增项",
    "summary": "MDIF 的 A 相采样电流。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Amp1"
  },
  {
    "id": "part74-do-extra-Amp2",
    "zh": "Amp2",
    "en": "Amp2",
    "aliases": [
      "Amp2",
      "MDIF 的 B 相采样电流。"
    ],
    "category": "7-4 节点表补充名称",
    "level": "节点表语境；非表 9 新增项",
    "summary": "MDIF 的 B 相采样电流。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Amp2"
  },
  {
    "id": "part74-do-extra-Amp3",
    "zh": "Amp3",
    "en": "Amp3",
    "aliases": [
      "Amp3",
      "MDIF 的 C 相采样电流。"
    ],
    "category": "7-4 节点表补充名称",
    "level": "节点表语境；非表 9 新增项",
    "summary": "MDIF 的 C 相采样电流。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Amp3"
  },
  {
    "id": "part74-do-extra-Volt",
    "zh": "Volt",
    "en": "Volt",
    "aliases": [
      "Volt",
      "ZAXN 辅助电源电压；该表打印 Volt，字典采用 Vol。"
    ],
    "category": "7-4 节点表补充名称",
    "level": "节点表语境；非表 9 新增项",
    "summary": "ZAXN 辅助电源电压；该表打印 Volt，字典采用 Vol。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-Volt"
  },
  {
    "id": "part74-do-extra-PwrFrq",
    "zh": "PwrFrq",
    "en": "PwrFrq",
    "aliases": [
      "PwrFrq",
      "ZTCF 目标频率。"
    ],
    "category": "7-4 节点表补充名称",
    "level": "节点表语境；非表 9 新增项",
    "summary": "ZTCF 目标频率。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-PwrFrq"
  },
  {
    "id": "part74-do-extra-VRed1",
    "zh": "VRed1",
    "en": "VRed1",
    "aliases": [
      "VRed1",
      "第一级降压命令；含编号的数据沿对应实例解释。"
    ],
    "category": "7-4 节点表补充名称",
    "level": "节点表语境；非表 9 新增项",
    "summary": "第一级降压命令；含编号的数据沿对应实例解释。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-VRed1"
  },
  {
    "id": "part74-do-extra-VRed2",
    "zh": "VRed2",
    "en": "VRed2",
    "aliases": [
      "VRed2",
      "第二级降压命令。"
    ],
    "category": "7-4 节点表补充名称",
    "level": "节点表语境；非表 9 新增项",
    "summary": "第二级降压命令。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-VRed2"
  },
  {
    "id": "part74-do-extra-MaxNumSlp",
    "zh": "MaxNumSlp",
    "en": "MaxNumSlp",
    "aliases": [
      "MaxNumSlp",
      "电网振荡检测允许的最大滑差次数，需结合评估窗口。"
    ],
    "category": "7-4 节点表补充名称",
    "level": "节点表语境；非表 9 新增项",
    "summary": "电网振荡检测允许的最大滑差次数，需结合评估窗口。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-MaxNumSlp"
  },
  {
    "id": "part74-do-extra-GndOp",
    "zh": "GndOp",
    "en": "GndOp",
    "aliases": [
      "GndOp",
      "PSDE 表列的接地门槛（3I0）；原表中文写“接地启动值”，不是 ACT 动作状态。"
    ],
    "category": "7-4 节点表补充名称",
    "level": "节点表语境；非表 9 新增项",
    "summary": "PSDE 表列的接地门槛（3I0）；原表中文写“接地启动值”，不是 ACT 动作状态。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-GndOp"
  },
  {
    "id": "part74-do-extra-StrDlTmms",
    "zh": "StrDlTmms",
    "en": "StrDlTmms",
    "aliases": [
      "StrDlTmms",
      "PSDE 启动延时，名称指毫秒；原表 CDC 仍列 ASG。"
    ],
    "category": "7-4 节点表补充名称",
    "level": "节点表语境；非表 9 新增项",
    "summary": "PSDE 启动延时，名称指毫秒；原表 CDC 仍列 ASG。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-StrDlTmms"
  },
  {
    "id": "part74-do-extra-OpMod",
    "zh": "OpMod",
    "en": "OpMod",
    "aliases": [
      "OpMod",
      "RDRE/IARC 工作模式（全部使用、覆盖等）；表 9 用 RcdMod 描述存储策略，保留名称差异。"
    ],
    "category": "7-4 节点表补充名称",
    "level": "节点表语境；非表 9 新增项",
    "summary": "RDRE/IARC 工作模式（全部使用、覆盖等）；表 9 用 RcdMod 描述存储策略，保留名称差异。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html#data-OpMod"
  },
  {
    "id": "comtrade",
    "zh": "COMTRADE",
    "en": "Common format for Transient Data Exchange for power systems",
    "aliases": [
      "COMTRADE",
      "暂态数据交换格式",
      "扰动记录文件"
    ],
    "category": "保护相关功能",
    "level": "记录文件格式",
    "summary": "扰动记录文件交换格式；RADR/RBDR 的通道内容与记录协调分开，不能当作在线采样协议。",
    "related": [
      "rdre",
      "radr",
      "rbdr"
    ],
    "href": "chapters/ln-protection-related.html#coordination"
  },
  {
    "id": "part74-abbr-A",
    "zh": "A 电流",
    "en": "Current",
    "aliases": [
      "A",
      "Current",
      "电流"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "三相/相别有关电流组成词；与 Amp 的相别无关量区分。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-A"
  },
  {
    "id": "part74-abbr-Acs",
    "zh": "Acs 访问",
    "en": "Access",
    "aliases": [
      "Acs",
      "Access",
      "访问"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：AcsCtlFail。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Acs"
  },
  {
    "id": "part74-abbr-ACSI",
    "zh": "ACSI 抽象通信服务接口",
    "en": "Abstract Communication Service Interface",
    "aliases": [
      "ACSI",
      "Abstract Communication Service Interface",
      "抽象通信服务接口"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "7-2 的对象和服务接口；连接 LN 数据到读、报告与控制。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-ACSI"
  },
  {
    "id": "part74-abbr-Acu",
    "zh": "Acu 噪声",
    "en": "Acoustic",
    "aliases": [
      "Acu",
      "Acoustic",
      "噪声"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：AcuPaDsch。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Acu"
  },
  {
    "id": "part74-abbr-Age",
    "zh": "Age 老化、时效；原表另列冷却",
    "en": "Ageing",
    "aliases": [
      "Age",
      "Ageing",
      "老化、时效；原表另列冷却"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：AgeRat。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Age"
  },
  {
    "id": "part74-abbr-Alm",
    "zh": "Alm 告警",
    "en": "Alarm",
    "aliases": [
      "Alm",
      "Alarm",
      "告警"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：Alm、AlmLstOv、AlmThm。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Alm"
  },
  {
    "id": "part74-abbr-Amp",
    "zh": "Amp 与相别无关的电流",
    "en": "Current non phase related",
    "aliases": [
      "Amp",
      "Current non phase related",
      "与相别无关的电流"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：Amp、AvAmps、HaAmp。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Amp"
  },
  {
    "id": "part74-abbr-An",
    "zh": "An 模拟",
    "en": "Analogue",
    "aliases": [
      "An",
      "Analogue",
      "模拟"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：Ang、AngCor、AngInd。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-An"
  },
  {
    "id": "part74-abbr-Ang",
    "zh": "Ang 角度",
    "en": "Angle",
    "aliases": [
      "Ang",
      "Angle",
      "角度"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：Ang、AngCor、AngInd。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Ang"
  },
  {
    "id": "part74-abbr-Auth",
    "zh": "Auth 授权、权限",
    "en": "Authorisation",
    "aliases": [
      "Auth",
      "Authorisation",
      "授权、权限"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：AuthFail。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Auth"
  },
  {
    "id": "part74-abbr-Auto",
    "zh": "Auto 自动的",
    "en": "Automatic",
    "aliases": [
      "Auto",
      "Automatic",
      "自动的"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：Auto、AutoRecSt、AutoUpLod。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Auto"
  },
  {
    "id": "part74-abbr-Aux",
    "zh": "Aux 辅助设备",
    "en": "Auxiliary",
    "aliases": [
      "Aux",
      "Auxiliary",
      "辅助设备"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：AuxSCO。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Aux"
  },
  {
    "id": "part74-abbr-Av",
    "zh": "Av 平均",
    "en": "Average",
    "aliases": [
      "Av",
      "Average",
      "平均"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：AvAmps、AvVA、AvVAr。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Av"
  },
  {
    "id": "part74-abbr-B",
    "zh": "B 套管",
    "en": "Bushing",
    "aliases": [
      "B",
      "Bushing",
      "套管"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；按父节点功能和数据上下文理解，不单独定义业务。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-B"
  },
  {
    "id": "part74-abbr-Bat",
    "zh": "Bat 电池",
    "en": "Battery",
    "aliases": [
      "Bat",
      "Battery",
      "电池"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：BatHi、BatLo、BatTest。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Bat"
  },
  {
    "id": "part74-abbr-Beh",
    "zh": "Beh 特性、行为",
    "en": "Behaviour",
    "aliases": [
      "Beh",
      "Behaviour",
      "特性、行为"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：Beh。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Beh"
  },
  {
    "id": "part74-abbr-Bin",
    "zh": "Bin 二进制",
    "en": "Binary",
    "aliases": [
      "Bin",
      "Binary",
      "二进制"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：BinIn。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Bin"
  },
  {
    "id": "part74-abbr-Blk",
    "zh": "Blk 闭锁，被闭锁",
    "en": "Block, Blocked",
    "aliases": [
      "Blk",
      "Block, Blocked",
      "闭锁，被闭锁"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：BlkA、BlkAOv、BlkCls。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Blk"
  },
  {
    "id": "part74-abbr-Bnd",
    "zh": "Bnd 范围、带宽；结合 BndCtr/BndWid 读控制带",
    "en": "Band",
    "aliases": [
      "Bnd",
      "Band",
      "范围、带宽；结合 BndCtr/BndWid 读控制带"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：BndCtr、BndWid。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Bnd"
  },
  {
    "id": "part74-abbr-Bo",
    "zh": "Bo 底部",
    "en": "Bottom",
    "aliases": [
      "Bo",
      "Bottom",
      "底部"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；按父节点功能和数据上下文理解，不单独定义业务。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Bo"
  },
  {
    "id": "part74-abbr-Cap",
    "zh": "Cap 能力",
    "en": "Capability",
    "aliases": [
      "Cap",
      "Capability",
      "能力"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：CapDS、CBOpCap、LinCapac。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Cap"
  },
  {
    "id": "part74-abbr-Capac",
    "zh": "Capac 电容、容抗",
    "en": "Capacitance",
    "aliases": [
      "Capac",
      "Capacitance",
      "电容、容抗"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：LinCapac。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Capac"
  },
  {
    "id": "part74-abbr-Car",
    "zh": "Car 载波",
    "en": "Carrier",
    "aliases": [
      "Car",
      "Carrier",
      "载波"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：CarRx。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Car"
  },
  {
    "id": "part74-abbr-CB",
    "zh": "CB 断路器",
    "en": "Circuit Breaker",
    "aliases": [
      "CB",
      "Circuit Breaker",
      "断路器"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：CBOpCap、LTCBlk。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-CB"
  },
  {
    "id": "part74-abbr-CDC",
    "zh": "CDC 公用数据类",
    "en": "Common Data Class",
    "aliases": [
      "CDC",
      "Common Data Class",
      "公用数据类"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "DO 的属性结构类型；先用 7-4 确定语义，再查 7-3。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-CDC"
  },
  {
    "id": "part74-abbr-CE",
    "zh": "CE 冷却设备",
    "en": "Cooling Equipment",
    "aliases": [
      "CE",
      "Cooling Equipment",
      "冷却设备"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：CECtl。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-CE"
  },
  {
    "id": "part74-abbr-Cf",
    "zh": "Cf 峰值系数",
    "en": "Crest factor",
    "aliases": [
      "Cf",
      "Crest factor",
      "峰值系数"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：HaCfAmp、HaCfVol、HCfA。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Cf"
  },
  {
    "id": "part74-abbr-Cfg",
    "zh": "Cfg 配置、结构",
    "en": "Configuration",
    "aliases": [
      "Cfg",
      "Configuration",
      "配置、结构"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；按父节点功能和数据上下文理解，不单独定义业务。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Cfg"
  },
  {
    "id": "part74-abbr-CG",
    "zh": "CG 铁心接地",
    "en": "Core Ground",
    "aliases": [
      "CG",
      "Core Ground",
      "铁心接地"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：CGAlm。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-CG"
  },
  {
    "id": "part74-abbr-Ch",
    "zh": "Ch 通道",
    "en": "Channel",
    "aliases": [
      "Ch",
      "Channel",
      "通道"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：ChaMotEna、ChkRec、ChNum。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Ch"
  },
  {
    "id": "part74-abbr-Cha",
    "zh": "Cha 充电器",
    "en": "Charger",
    "aliases": [
      "Cha",
      "Charger",
      "充电器"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：ChaMotEna。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Cha"
  },
  {
    "id": "part74-abbr-Chg",
    "zh": "Chg 变化",
    "en": "Change",
    "aliases": [
      "Chg",
      "Change",
      "变化"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：TapChg、VolChgRte。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Chg"
  },
  {
    "id": "part74-abbr-Chk",
    "zh": "Chk 校验、检验",
    "en": "Check",
    "aliases": [
      "Chk",
      "Check",
      "校验、检验"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：ChkRec。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Chk"
  },
  {
    "id": "part74-abbr-Chr",
    "zh": "Chr 特点",
    "en": "Characteristic",
    "aliases": [
      "Chr",
      "Characteristic",
      "特点"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：ChrAng、TmDlChr。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Chr"
  },
  {
    "id": "part74-abbr-Cir",
    "zh": "Cir 环流",
    "en": "Circulating",
    "aliases": [
      "Cir",
      "Circulating",
      "环流"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：CircA。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Cir"
  },
  {
    "id": "part74-abbr-Clc",
    "zh": "Clc 计算",
    "en": "Calculate",
    "aliases": [
      "Clc",
      "Calculate",
      "计算"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：DifAClc、DifAngClc、DifHzClc。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Clc"
  },
  {
    "id": "part74-abbr-Clk",
    "zh": "Clk 时钟、顺时针方向",
    "en": "Clock, clockwise",
    "aliases": [
      "Clk",
      "Clock, clockwise",
      "时钟、顺时针方向"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：ClkRot、CntClkRot。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Clk"
  },
  {
    "id": "part74-abbr-Cls",
    "zh": "Cls 关闭、合闸",
    "en": "Close",
    "aliases": [
      "Cls",
      "Close",
      "关闭、合闸"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：BlkCls、EnaCls、OpCls。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Cls"
  },
  {
    "id": "part74-abbr-Cnt",
    "zh": "Cnt 计数",
    "en": "Counter",
    "aliases": [
      "Cnt",
      "Counter",
      "计数"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：ArcCntRs、CntClkRot、FACntRs。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Cnt"
  },
  {
    "id": "part74-abbr-Col",
    "zh": "Col 线圈",
    "en": "Coil",
    "aliases": [
      "Col",
      "Coil",
      "线圈"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：ColPos、ColTapPos、LCol。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Col"
  },
  {
    "id": "part74-abbr-Cor",
    "zh": "Cor 校正",
    "en": "Correction",
    "aliases": [
      "Cor",
      "Correction",
      "校正"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：AngCor、Cor。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Cor"
  },
  {
    "id": "part74-abbr-Crd",
    "zh": "Crd 协调、配合",
    "en": "Coordination",
    "aliases": [
      "Crd",
      "Coordination",
      "协调、配合"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：CrdTmms。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Crd"
  },
  {
    "id": "part74-abbr-Crv",
    "zh": "Crv 曲线",
    "en": "Curve",
    "aliases": [
      "Crv",
      "Curve",
      "曲线"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：AVCrv、TmACrv、TmTmpCrv。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Crv"
  },
  {
    "id": "part74-abbr-CT",
    "zh": "CT 电流互感器（传感器）",
    "en": "Current Transducer",
    "aliases": [
      "CT",
      "Current Transducer",
      "电流互感器（传感器）"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "本表为 Current Transducer；一次设备语境也常指 Current Transformer。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-CT"
  },
  {
    "id": "part74-abbr-Ctl",
    "zh": "Ctl 控制",
    "en": "Control",
    "aliases": [
      "Ctl",
      "Control",
      "控制"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：AcsCtlFail、CECtl、CtlDlTmms。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Ctl"
  },
  {
    "id": "part74-abbr-Ctr",
    "zh": "Ctr 中心",
    "en": "Centre",
    "aliases": [
      "Ctr",
      "Centre",
      "中心"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：BndCtr。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Ctr"
  },
  {
    "id": "part74-abbr-Cyc",
    "zh": "Cyc 周期",
    "en": "Cycle",
    "aliases": [
      "Cyc",
      "Cycle",
      "周期"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：NumCyc。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Cyc"
  },
  {
    "id": "part74-abbr-Dea",
    "zh": "Dea 不带电",
    "en": "Dead",
    "aliases": [
      "Dea",
      "Dead",
      "不带电"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：DeaBusVal、DeaLinVal、LivDeaMod。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Dea"
  },
  {
    "id": "part74-abbr-Den",
    "zh": "Den 密度",
    "en": "Density",
    "aliases": [
      "Den",
      "Density",
      "密度"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：Den、DenAlm。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Den"
  },
  {
    "id": "part74-abbr-Det",
    "zh": "Det 被检测",
    "en": "Detected",
    "aliases": [
      "Det",
      "Detected",
      "被检测"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：DetValA、FADet、SwArcDet。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Det"
  },
  {
    "id": "part74-abbr-DExt",
    "zh": "DExt 去磁",
    "en": "De-excitation",
    "aliases": [
      "DExt",
      "De-excitation",
      "去磁"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：DExt。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-DExt"
  },
  {
    "id": "part74-abbr-Diag",
    "zh": "Diag 诊断",
    "en": "Diagnostics",
    "aliases": [
      "Diag",
      "Diagnostics",
      "诊断"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：Diag。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Diag"
  },
  {
    "id": "part74-abbr-Dif",
    "zh": "Dif 差动、不同的、差异",
    "en": "Differential, difference",
    "aliases": [
      "Dif",
      "Differential, difference",
      "差动、不同的、差异"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：DifAClc、DifAng、DifAngClc。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Dif"
  },
  {
    "id": "part74-abbr-Dir",
    "zh": "Dir 方向",
    "en": "Direction",
    "aliases": [
      "Dir",
      "Direction",
      "方向"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：Dir、DirMod。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Dir"
  },
  {
    "id": "part74-abbr-Dis",
    "zh": "Dis 距离",
    "en": "Distance",
    "aliases": [
      "Dis",
      "Distance",
      "距离"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：FltDiskm。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Dis"
  },
  {
    "id": "part74-abbr-Dl",
    "zh": "Dl 延时、延迟",
    "en": "Delay",
    "aliases": [
      "Dl",
      "Delay",
      "延时、延迟"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：CtlDlTmms、DltRcd、GndDlMod。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Dl"
  },
  {
    "id": "part74-abbr-Dlt",
    "zh": "Dlt 删除",
    "en": "Delete",
    "aliases": [
      "Dlt",
      "Delete",
      "删除"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：DltRcd。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Dlt"
  },
  {
    "id": "part74-abbr-Dmd",
    "zh": "Dmd 需求",
    "en": "Demand",
    "aliases": [
      "Dmd",
      "Demand",
      "需求"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：DmdPwr、DmdVArh、DmdWh。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Dmd"
  },
  {
    "id": "part74-abbr-Dn",
    "zh": "Dn 向下",
    "en": "Down",
    "aliases": [
      "Dn",
      "Down",
      "向下"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：PwrDn。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Dn"
  },
  {
    "id": "part74-abbr-DPCSO",
    "zh": "DPCSO 双点可控状态输出",
    "en": "Double point controllable status output",
    "aliases": [
      "DPCSO",
      "Double point controllable status output",
      "双点可控状态输出"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：DPCSO。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-DPCSO"
  },
  {
    "id": "part74-abbr-DQ0",
    "zh": "DQ0 直轴、交轴、零轴参量",
    "en": "Direct, quadrature and zero axis quantities",
    "aliases": [
      "DQ0",
      "Direct, quadrature and zero axis quantities",
      "直轴、交轴、零轴参量"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：DQ0Seq。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-DQ0"
  },
  {
    "id": "part74-abbr-Drag",
    "zh": "Drag 把手",
    "en": "Drag hand",
    "aliases": [
      "Drag",
      "Drag hand",
      "把手"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：LTCDragRs。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Drag"
  },
  {
    "id": "part74-abbr-Drv",
    "zh": "Drv 驱动",
    "en": "Drive",
    "aliases": [
      "Drv",
      "Drive",
      "驱动"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：MotDrvA。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Drv"
  },
  {
    "id": "part74-abbr-DS",
    "zh": "DS 装置状态",
    "en": "Device State",
    "aliases": [
      "DS",
      "Device State",
      "装置状态"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：CapDS。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-DS"
  },
  {
    "id": "part74-abbr-Dsch",
    "zh": "Dsch 放电",
    "en": "Discharge",
    "aliases": [
      "Dsch",
      "Discharge",
      "放电"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：AcuPaDsch、DschBlk、PaDschAlm。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Dsch"
  },
  {
    "id": "part74-abbr-Dur",
    "zh": "Dur 期间、时段",
    "en": "Duration",
    "aliases": [
      "Dur",
      "Duration",
      "期间、时段"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：DurTmms。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Dur"
  },
  {
    "id": "part74-abbr-EC",
    "zh": "EC 接地线圈",
    "en": "Earth Coil",
    "aliases": [
      "EC",
      "Earth Coil",
      "接地线圈"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：CECtl、ECA。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-EC"
  },
  {
    "id": "part74-abbr-EE",
    "zh": "EE 外部设备",
    "en": "External Equipment",
    "aliases": [
      "EE",
      "External Equipment",
      "外部设备"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：EEHealth、EEName。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-EE"
  },
  {
    "id": "part74-abbr-EF",
    "zh": "EF 接地故障",
    "en": "Earth Fault",
    "aliases": [
      "EF",
      "Earth Fault",
      "接地故障"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：BlkEF。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-EF"
  },
  {
    "id": "part74-abbr-Ena",
    "zh": "Ena 被允许",
    "en": "Enabled",
    "aliases": [
      "Ena",
      "Enabled",
      "被允许"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：ChaMotEna、EnaCls、EnaOpn。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Ena"
  },
  {
    "id": "part74-abbr-Eq",
    "zh": "Eq 等价、等效",
    "en": "Equalization, Equal",
    "aliases": [
      "Eq",
      "Equalization, Equal",
      "等价、等效"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：EqTmm。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Eq"
  },
  {
    "id": "part74-abbr-Ev",
    "zh": "Ev 评估",
    "en": "Evaluation",
    "aliases": [
      "Ev",
      "Evaluation",
      "评估"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：EvTmms、TddEvnA、TddEvnAmp。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Ev"
  },
  {
    "id": "part74-abbr-Ex",
    "zh": "Ex 外部的",
    "en": "External",
    "aliases": [
      "Ex",
      "External",
      "外部的"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：DExt、ExclTmms、OpEx。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Ex"
  },
  {
    "id": "part74-abbr-Exc",
    "zh": "Exc 被超出",
    "en": "Exceeded",
    "aliases": [
      "Exc",
      "Exceeded",
      "被超出"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：ExclTmms、TmExc。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Exc"
  },
  {
    "id": "part74-abbr-Excl",
    "zh": "Excl 排除",
    "en": "Exclusion",
    "aliases": [
      "Excl",
      "Exclusion",
      "排除"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：ExclTmms。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Excl"
  },
  {
    "id": "part74-abbr-Ext",
    "zh": "Ext 激磁",
    "en": "Excitation",
    "aliases": [
      "Ext",
      "Excitation",
      "激磁"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：DExt、OpOvExt、OpUnExt。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Ext"
  },
  {
    "id": "part74-abbr-FA",
    "zh": "FA 故障电弧",
    "en": "Fault Arc",
    "aliases": [
      "FA",
      "Fault Arc",
      "故障电弧"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：FACntRs、FADet。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-FA"
  },
  {
    "id": "part74-abbr-Fact",
    "zh": "Fact 因子、系数",
    "en": "Factor",
    "aliases": [
      "Fact",
      "Factor",
      "因子、系数"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：HaKFact、HaTdFact、HaTiFact。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Fact"
  },
  {
    "id": "part74-abbr-Fan",
    "zh": "Fan 风扇",
    "en": "Fan",
    "aliases": [
      "Fan",
      "Fan",
      "风扇"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：FanA、FanCtlGen、FanCtl。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Fan"
  },
  {
    "id": "part74-abbr-Flt",
    "zh": "Flt 故障",
    "en": "Fault",
    "aliases": [
      "Flt",
      "Fault",
      "故障"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：FltDiskm、FltLoop、FltNum。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Flt"
  },
  {
    "id": "part74-abbr-Flw",
    "zh": "Flw 潮流",
    "en": "Flow",
    "aliases": [
      "Flw",
      "Flow",
      "潮流"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：FanFlw、GasFlwTr。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Flw"
  },
  {
    "id": "part74-abbr-FPF",
    "zh": "FPF 正向潮流",
    "en": "Forward Power Flow",
    "aliases": [
      "FPF",
      "Forward Power Flow",
      "正向潮流"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；按父节点功能和数据上下文理解，不单独定义业务。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-FPF"
  },
  {
    "id": "part74-abbr-Fu",
    "zh": "Fu 熔丝",
    "en": "Fuse",
    "aliases": [
      "Fu",
      "Fuse",
      "熔丝"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：FuFail、MemFull。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Fu"
  },
  {
    "id": "part74-abbr-Fwd",
    "zh": "Fwd 正向",
    "en": "Forward",
    "aliases": [
      "Fwd",
      "Forward",
      "正向"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：MaxFwdAng、MinFwdAng。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Fwd"
  },
  {
    "id": "part74-abbr-Gen",
    "zh": "Gen 通用的，一般的",
    "en": "General",
    "aliases": [
      "Gen",
      "General",
      "通用的，一般的"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：FanCtlGen、PmpCtlGen。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Gen"
  },
  {
    "id": "part74-abbr-Gn",
    "zh": "Gn 发电机",
    "en": "Generator",
    "aliases": [
      "Gn",
      "Generator",
      "发电机"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：GnCtl、GndDlMod、GndDlTmms。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Gn"
  },
  {
    "id": "part74-abbr-Gnd",
    "zh": "Gnd 地",
    "en": "Ground",
    "aliases": [
      "Gnd",
      "Ground",
      "地"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：GndDlMod、GndDlTmms、GndStr。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Gnd"
  },
  {
    "id": "part74-abbr-Gr",
    "zh": "Gr 组",
    "en": "Group",
    "aliases": [
      "Gr",
      "Group",
      "组"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：GrAlm、GrdRx、GriFltNum。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Gr"
  },
  {
    "id": "part74-abbr-Grd",
    "zh": "Grd 监护",
    "en": "Guard",
    "aliases": [
      "Grd",
      "Guard",
      "监护"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：GrdRx、LosOfGrd。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Grd"
  },
  {
    "id": "part74-abbr-Gri",
    "zh": "Gri 电网",
    "en": "Grid",
    "aliases": [
      "Gri",
      "Grid",
      "电网"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：GriFltNum。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Gri"
  },
  {
    "id": "part74-abbr-H",
    "zh": "H 与相别有关的谐波",
    "en": "Harmonics (phase related)",
    "aliases": [
      "H",
      "Harmonics (phase related)",
      "与相别有关的谐波"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；按父节点功能和数据上下文理解，不单独定义业务。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-H"
  },
  {
    "id": "part74-abbr-H2",
    "zh": "H2 氢气",
    "en": "Hydrogen",
    "aliases": [
      "H2",
      "Hydrogen",
      "氢气"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：H2、H2Alm、H2O。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-H2"
  },
  {
    "id": "part74-abbr-H2O",
    "zh": "H2O 水",
    "en": "Water",
    "aliases": [
      "H2O",
      "Water",
      "水"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：H2O、H2OTmp。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-H2O"
  },
  {
    "id": "part74-abbr-Ha",
    "zh": "Ha 与相别无关的谐波",
    "en": "Harmonics (non phase related)",
    "aliases": [
      "Ha",
      "Harmonics (non phase related)",
      "与相别无关的谐波"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：HaAmp、HaAmpTm、HaCfAmp。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Ha"
  },
  {
    "id": "part74-abbr-Hi",
    "zh": "Hi 高，最高",
    "en": "High, highest",
    "aliases": [
      "Hi",
      "High, highest",
      "高，最高"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：BatHi、HiBatVal、HiCtlV。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Hi"
  },
  {
    "id": "part74-abbr-HP",
    "zh": "HP 热点",
    "en": "Hot point",
    "aliases": [
      "HP",
      "Hot point",
      "热点"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：HPhV、HPPV、HPTmp。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-HP"
  },
  {
    "id": "part74-abbr-Hz",
    "zh": "Hz 频率",
    "en": "Frequency",
    "aliases": [
      "Hz",
      "Frequency",
      "频率"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "数据名组成词/频率量；作为单位符号时 Hz 是 hertz（赫兹）。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Hz"
  },
  {
    "id": "part74-abbr-IEEE",
    "zh": "IEEE 电气电子工程师协会",
    "en": "Institute of Electrical and Electronics Engineers",
    "aliases": [
      "IEEE",
      "Institute of Electrical and Electronics Engineers",
      "电气电子工程师协会"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；按父节点功能和数据上下文理解，不单独定义业务。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-IEEE"
  },
  {
    "id": "part74-abbr-Imb",
    "zh": "Imb 不平衡",
    "en": "Imbalance",
    "aliases": [
      "Imb",
      "Imbalance",
      "不平衡"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：ImbA、ImbNgA、ImbNgV。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Imb"
  },
  {
    "id": "part74-abbr-Imp",
    "zh": "Imp 与相别无关的阻抗",
    "en": "Impedance non phase related",
    "aliases": [
      "Imp",
      "Impedance non phase related",
      "与相别无关的阻抗"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；按父节点功能和数据上下文理解，不单独定义业务。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Imp"
  },
  {
    "id": "part74-abbr-In",
    "zh": "In 输入",
    "en": "Input",
    "aliases": [
      "In",
      "Input",
      "输入"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：AngInd、AnIn、BinIn。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-In"
  },
  {
    "id": "part74-abbr-Ina",
    "zh": "Ina 未激活",
    "en": "Inactivity",
    "aliases": [
      "Ina",
      "Inactivity",
      "未激活"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：Ina。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Ina"
  },
  {
    "id": "part74-abbr-Incr",
    "zh": "Incr 增量",
    "en": "Increment",
    "aliases": [
      "Incr",
      "Increment",
      "增量"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；按父节点功能和数据上下文理解，不单独定义业务。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Incr"
  },
  {
    "id": "part74-abbr-Ind",
    "zh": "Ind 指示",
    "en": "Indication",
    "aliases": [
      "Ind",
      "Indication",
      "指示"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：AngInd、HzInd、Ind。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Ind"
  },
  {
    "id": "part74-abbr-Inh",
    "zh": "Inh 禁止",
    "en": "Inhibit",
    "aliases": [
      "Inh",
      "Inhibit",
      "禁止"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：InhTmm、StrInh、StrInhTmm。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Inh"
  },
  {
    "id": "part74-abbr-Ins",
    "zh": "Ins 绝缘",
    "en": "Insulation",
    "aliases": [
      "Ins",
      "Insulation",
      "绝缘"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：GasInsAlm、GasInsTr、InsAlm。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Ins"
  },
  {
    "id": "part74-abbr-Int",
    "zh": "Int 整数",
    "en": "Integer",
    "aliases": [
      "Int",
      "Integer",
      "整数"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：IntIn。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Int"
  },
  {
    "id": "part74-abbr-ISCSO",
    "zh": "ISCSO 整数状态可控状态输出",
    "en": "Integer status controllable status output",
    "aliases": [
      "ISCSO",
      "Integer status controllable status output",
      "整数状态可控状态输出"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：ISCSO。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-ISCSO"
  },
  {
    "id": "part74-abbr-km",
    "zh": "km 千米",
    "en": "Kilometer",
    "aliases": [
      "km",
      "Kilometer",
      "千米"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：FltDiskm。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-km"
  },
  {
    "id": "part74-abbr-L",
    "zh": "L 较低",
    "en": "Lower",
    "aliases": [
      "L",
      "Lower",
      "较低"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；按父节点功能和数据上下文理解，不单独定义业务。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-L"
  },
  {
    "id": "part74-abbr-LD",
    "zh": "LD 逻辑装置",
    "en": "Logical Device",
    "aliases": [
      "LD",
      "Logical Device",
      "逻辑装置"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：LDC、LDCR、LDCX。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-LD"
  },
  {
    "id": "part74-abbr-LDC",
    "zh": "LDC 线路压降补偿",
    "en": "Line Drop Compensation",
    "aliases": [
      "LDC",
      "Line Drop Compensation",
      "线路压降补偿"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：LDC、LDCR、LDCX。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-LDC"
  },
  {
    "id": "part74-abbr-LDCR",
    "zh": "LDCR 线路压降补偿电阻",
    "en": "Line Drop Compensation Resistance",
    "aliases": [
      "LDCR",
      "Line Drop Compensation Resistance",
      "线路压降补偿电阻"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：LDCR。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-LDCR"
  },
  {
    "id": "part74-abbr-LDCX",
    "zh": "LDCX 线路压降补偿电抗",
    "en": "Line Drop Compensation Reactance",
    "aliases": [
      "LDCX",
      "Line Drop Compensation Reactance",
      "线路压降补偿电抗"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：LDCX。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-LDCX"
  },
  {
    "id": "part74-abbr-LDCZ",
    "zh": "LDCZ 线路压降补偿阻抗",
    "en": "Line Drop Compensation Impedance",
    "aliases": [
      "LDCZ",
      "Line Drop Compensation Impedance",
      "线路压降补偿阻抗"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：LDCZ。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-LDCZ"
  },
  {
    "id": "part74-abbr-LED",
    "zh": "LED 发光二极管",
    "en": "Light Emitting Diode",
    "aliases": [
      "LED",
      "Light Emitting Diode",
      "发光二极管"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：LEDRs。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-LED"
  },
  {
    "id": "part74-abbr-Len",
    "zh": "Len 长度",
    "en": "Length",
    "aliases": [
      "Len",
      "Length",
      "长度"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：LinLenKm。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Len"
  },
  {
    "id": "part74-abbr-Lev",
    "zh": "Lev 水平、电平、层次",
    "en": "Level",
    "aliases": [
      "Lev",
      "Level",
      "水平、电平、层次"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：HiTrgLev、InsLevMax、InsLevMin。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Lev"
  },
  {
    "id": "part74-abbr-Lg",
    "zh": "Lg 滞后",
    "en": "Lag",
    "aliases": [
      "Lg",
      "Lag",
      "滞后"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；按父节点功能和数据上下文理解，不单独定义业务。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Lg"
  },
  {
    "id": "part74-abbr-Lim",
    "zh": "Lim 限值",
    "en": "Limit",
    "aliases": [
      "Lim",
      "Limit",
      "限值"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：LimAOv、LimLodA、LimVOv。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Lim"
  },
  {
    "id": "part74-abbr-Lin",
    "zh": "Lin 线路",
    "en": "Line",
    "aliases": [
      "Lin",
      "Line",
      "线路"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：DeaLinVal、LinAng、LinCapac。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Lin"
  },
  {
    "id": "part74-abbr-Liv",
    "zh": "Liv 带电",
    "en": "Live",
    "aliases": [
      "Liv",
      "Live",
      "带电"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：LivBusVal、LivDeaMod、LivLinVal。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Liv"
  },
  {
    "id": "part74-abbr-LN",
    "zh": "LN 逻辑节点",
    "en": "Logical Node",
    "aliases": [
      "LN",
      "Logical Node",
      "逻辑节点"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；按父节点功能和数据上下文理解，不单独定义业务。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-LN"
  },
  {
    "id": "part74-abbr-Lo",
    "zh": "Lo 低",
    "en": "Low",
    "aliases": [
      "Lo",
      "Low",
      "低"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "Low（低）；LO=Lockout，大小写区分。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Lo"
  },
  {
    "id": "part74-abbr-LO",
    "zh": "LO 锁定、闭锁",
    "en": "Lockout",
    "aliases": [
      "LO",
      "Lockout",
      "锁定、闭锁"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "Lockout（闭锁）；Lo=Low，大小写区分。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-LO"
  },
  {
    "id": "part74-abbr-Loc",
    "zh": "Loc 就地",
    "en": "Local",
    "aliases": [
      "Loc",
      "Local",
      "就地"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：Loc。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Loc"
  },
  {
    "id": "part74-abbr-Lod",
    "zh": "Lod 负荷，装载",
    "en": "Load, loading",
    "aliases": [
      "Lod",
      "Load, loading",
      "负荷，装载"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：AngLod、AutoUpLod、LimLodA。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Lod"
  },
  {
    "id": "part74-abbr-Lok",
    "zh": "Lok 闭锁、锁定",
    "en": "Locked",
    "aliases": [
      "Lok",
      "Locked",
      "闭锁、锁定"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：LokRotTms。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Lok"
  },
  {
    "id": "part74-abbr-Los",
    "zh": "Los 损耗",
    "en": "Loss",
    "aliases": [
      "Los",
      "Loss",
      "损耗"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：LosFact、LosOfGrd、LosOil。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Los"
  },
  {
    "id": "part74-abbr-Lst",
    "zh": "Lst 列表",
    "en": "List",
    "aliases": [
      "Lst",
      "List",
      "列表"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：AlmLstOv。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Lst"
  },
  {
    "id": "part74-abbr-LTC",
    "zh": "LTC 有载分接开关",
    "en": "Load Tap Changer",
    "aliases": [
      "LTC",
      "Load Tap Changer",
      "有载分接开关"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：LTCBlk、LTCDragRs。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-LTC"
  },
  {
    "id": "part74-abbr-m",
    "zh": "m 分钟",
    "en": "minutes",
    "aliases": [
      "m",
      "minutes",
      "分钟"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "本表表示 minutes；SI 单位表中的 m 是 metre（米），不能混用。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-m"
  },
  {
    "id": "part74-abbr-M-O",
    "zh": "M/O 必备或可选数据对象",
    "en": "Data Object is Mandatory or Optional",
    "aliases": [
      "M/O",
      "Data Object is Mandatory or Optional",
      "必备或可选数据对象"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "节点数据是否必备或可选；不表示权限、当前值或服务器支持全部服务。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-M-O"
  },
  {
    "id": "part74-abbr-Max",
    "zh": "Max 最大",
    "en": "Maximum",
    "aliases": [
      "Max",
      "Maximum",
      "最大"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：InsLevMax、MaxAmps、MaxDlTmms。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Max"
  },
  {
    "id": "part74-abbr-Mem",
    "zh": "Mem 存储器、内存",
    "en": "Memory",
    "aliases": [
      "Mem",
      "Memory",
      "存储器、内存"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：MemClr、MemFull、MemOv。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Mem"
  },
  {
    "id": "part74-abbr-Min",
    "zh": "Min 最小",
    "en": "Minimum",
    "aliases": [
      "Min",
      "Minimum",
      "最小"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：InsLevMin、MinAmps、MinFwdAng。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Min"
  },
  {
    "id": "part74-abbr-Mod",
    "zh": "Mod 模式",
    "en": "Mode",
    "aliases": [
      "Mod",
      "Mode",
      "模式"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：DirMod、FailMod、GndDlMod。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Mod"
  },
  {
    "id": "part74-abbr-Mot",
    "zh": "Mot 电动机",
    "en": "Motor",
    "aliases": [
      "Mot",
      "Motor",
      "电动机"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：ChaMotEna、MotDrvA、MotStr。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Mot"
  },
  {
    "id": "part74-abbr-ms",
    "zh": "ms 毫秒",
    "en": "Milliseconds",
    "aliases": [
      "ms",
      "Milliseconds",
      "毫秒"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：BkrTmms、ConsTms、CrdTmms。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-ms"
  },
  {
    "id": "part74-abbr-Mst",
    "zh": "Mst 潮湿",
    "en": "Moisture",
    "aliases": [
      "Mst",
      "Moisture",
      "潮湿"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：MstAlm。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Mst"
  },
  {
    "id": "part74-abbr-MT",
    "zh": "MT 主油箱",
    "en": "Main Tank",
    "aliases": [
      "MT",
      "Main Tank",
      "主油箱"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；按父节点功能和数据上下文理解，不单独定义业务。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-MT"
  },
  {
    "id": "part74-abbr-N",
    "zh": "N 中性线（点）",
    "en": "Neutral",
    "aliases": [
      "N",
      "Neutral",
      "中性线（点）"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；按父节点功能和数据上下文理解，不单独定义业务。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-N"
  },
  {
    "id": "part74-abbr-Nam",
    "zh": "Nam 名称",
    "en": "Name",
    "aliases": [
      "Nam",
      "Name",
      "名称"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：EEName、NamPlt、PhyNam。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Nam"
  },
  {
    "id": "part74-abbr-Net",
    "zh": "Net 净和",
    "en": "Net sum",
    "aliases": [
      "Net",
      "Net sum",
      "净和"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；按父节点功能和数据上下文理解，不单独定义业务。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Net"
  },
  {
    "id": "part74-abbr-Ng",
    "zh": "Ng 否定、负序",
    "en": "Negative",
    "aliases": [
      "Ng",
      "Negative",
      "否定、负序"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：ImbNgA、ImbNgV、NgEna。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Ng"
  },
  {
    "id": "part74-abbr-Nom",
    "zh": "Nom 标称，标准化",
    "en": "Nominal, Normalising",
    "aliases": [
      "Nom",
      "Nominal, Normalising",
      "标称，标准化"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：NomA。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Nom"
  },
  {
    "id": "part74-abbr-Num",
    "zh": "Num 编号",
    "en": "Number",
    "aliases": [
      "Num",
      "Number",
      "编号"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：ChNum、FltNum、GriFltNum。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Num"
  },
  {
    "id": "part74-abbr-Ofs",
    "zh": "Ofs 偏差、偏移",
    "en": "Offset",
    "aliases": [
      "Ofs",
      "Offset",
      "偏差、偏移"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：Ofs、PctOfs。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Ofs"
  },
  {
    "id": "part74-abbr-Op",
    "zh": "Op 动作，运行",
    "en": "Operate, Operating",
    "aliases": [
      "Op",
      "Operate, Operating",
      "动作，运行"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：BlkOpn、CBOpCap、EnaOpn。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Op"
  },
  {
    "id": "part74-abbr-Opn",
    "zh": "Opn 开放、分闸",
    "en": "Open",
    "aliases": [
      "Opn",
      "Open",
      "开放、分闸"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：BlkOpn、EnaOpn、OpOpn。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Opn"
  },
  {
    "id": "part74-abbr-Out",
    "zh": "Out 输出",
    "en": "Output",
    "aliases": [
      "Out",
      "Output",
      "输出"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：OilTmpOut、OutOv。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Out"
  },
  {
    "id": "part74-abbr-Ov",
    "zh": "Ov 越过，强制、溢出",
    "en": "Over, Override, Overflow",
    "aliases": [
      "Ov",
      "Over, Override, Overflow",
      "越过，强制、溢出"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：AlmLstOv、BlkAOv、BlkVOv。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Ov"
  },
  {
    "id": "part74-abbr-Pa",
    "zh": "Pa 局部、部分",
    "en": "Partial",
    "aliases": [
      "Pa",
      "Partial",
      "局部、部分"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：AcuPaDsch、PaDschAlm、ParOp。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Pa"
  },
  {
    "id": "part74-abbr-Par",
    "zh": "Par 并行",
    "en": "Parallel",
    "aliases": [
      "Par",
      "Parallel",
      "并行"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：ParOp。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Par"
  },
  {
    "id": "part74-abbr-Pct",
    "zh": "Pct 百分数",
    "en": "Percent",
    "aliases": [
      "Pct",
      "Percent",
      "百分数"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：PctOfs、PctRch。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Pct"
  },
  {
    "id": "part74-abbr-Per",
    "zh": "Per 周期的",
    "en": "Periodic",
    "aliases": [
      "Per",
      "Periodic",
      "周期的"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：PerTrgTms。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Per"
  },
  {
    "id": "part74-abbr-PF",
    "zh": "PF 功率因数",
    "en": "Power factor",
    "aliases": [
      "PF",
      "Power factor",
      "功率因数"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：PF、RefPF、TotPF。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-PF"
  },
  {
    "id": "part74-abbr-Ph",
    "zh": "Ph 相、相别",
    "en": "Phase",
    "aliases": [
      "Ph",
      "Phase",
      "相、相别"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：HCfPhV、HPhV、HRmsPhV。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Ph"
  },
  {
    "id": "part74-abbr-Phy",
    "zh": "Phy 物理",
    "en": "Physical",
    "aliases": [
      "Phy",
      "Physical",
      "物理"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：PhyHealth、PhyNam。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Phy"
  },
  {
    "id": "part74-abbr-Pls",
    "zh": "Pls 脉冲",
    "en": "Pulse",
    "aliases": [
      "Pls",
      "Pulse",
      "脉冲"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：PlsTmms、TrPlsTmms。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Pls"
  },
  {
    "id": "part74-abbr-Plt",
    "zh": "Plt 板、铭牌组成词",
    "en": "Plate",
    "aliases": [
      "Plt",
      "Plate",
      "板、铭牌组成词"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：NamPlt。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Plt"
  },
  {
    "id": "part74-abbr-Pmp",
    "zh": "Pmp 水泵",
    "en": "Pump",
    "aliases": [
      "Pmp",
      "Pump",
      "水泵"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：PmpAlm、PmpCtlGen、PmpCtl。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Pmp"
  },
  {
    "id": "part74-abbr-Po",
    "zh": "Po 极、极性",
    "en": "Polar",
    "aliases": [
      "Po",
      "Polar",
      "极、极性"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：ColPos、ColTapPos、EndPosL。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Po"
  },
  {
    "id": "part74-abbr-Pol",
    "zh": "Pol 极化",
    "en": "Polarizing",
    "aliases": [
      "Pol",
      "Polarizing",
      "极化"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：PolQty。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Pol"
  },
  {
    "id": "part74-abbr-Pos",
    "zh": "Pos 位置",
    "en": "Position",
    "aliases": [
      "Pos",
      "Position",
      "位置"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：ColPos、ColTapPos、EndPosL。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Pos"
  },
  {
    "id": "part74-abbr-POW",
    "zh": "POW 定点分合",
    "en": "Point on wave switching",
    "aliases": [
      "POW",
      "Point on wave switching",
      "定点分合"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：POWCap、StrPOW。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-POW"
  },
  {
    "id": "part74-abbr-PP",
    "zh": "PP 相间",
    "en": "Phase to phase",
    "aliases": [
      "PP",
      "Phase to phase",
      "相间"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：HCfPPV、HPPV、HRmsPPV。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-PP"
  },
  {
    "id": "part74-abbr-PPV",
    "zh": "PPV 线电压、相间电压",
    "en": "Phase to phase voltage",
    "aliases": [
      "PPV",
      "Phase to phase voltage",
      "线电压、相间电压"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：HCfPPV、HPPV、HRmsPPV。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-PPV"
  },
  {
    "id": "part74-abbr-Pres",
    "zh": "Pres 压力",
    "en": "Pressure",
    "aliases": [
      "Pres",
      "Pressure",
      "压力"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：Pres、PresAlm、PresTr。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Pres"
  },
  {
    "id": "part74-abbr-Prg",
    "zh": "Prg 进展、进行中",
    "en": "Progress, In Progress",
    "aliases": [
      "Prg",
      "Progress, In Progress",
      "进展、进行中"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：SynPrg。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Prg"
  },
  {
    "id": "part74-abbr-Pri",
    "zh": "Pri 主要的，一次的",
    "en": "Primary",
    "aliases": [
      "Pri",
      "Primary",
      "主要的，一次的"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；按父节点功能和数据上下文理解，不单独定义业务。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Pri"
  },
  {
    "id": "part74-abbr-Pro",
    "zh": "Pro 保护",
    "en": "Protection",
    "aliases": [
      "Pro",
      "Protection",
      "保护"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：ProRx、ProTx、Proxy。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Pro"
  },
  {
    "id": "part74-abbr-Ps",
    "zh": "Ps 正极性、正序、肯定",
    "en": "Positive",
    "aliases": [
      "Ps",
      "Positive",
      "正极性、正序、肯定"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：PstTmms。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Ps"
  },
  {
    "id": "part74-abbr-Pst",
    "zh": "Pst 过去",
    "en": "Post",
    "aliases": [
      "Pst",
      "Post",
      "过去"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：PstTmms。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Pst"
  },
  {
    "id": "part74-abbr-Pwr",
    "zh": "Pwr 动力、功率",
    "en": "Power",
    "aliases": [
      "Pwr",
      "Power",
      "动力、功率"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：DmdPwr、NumPwrUp、PwrDn。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Pwr"
  },
  {
    "id": "part74-abbr-Qty",
    "zh": "Qty 数量",
    "en": "Quantity",
    "aliases": [
      "Qty",
      "Quantity",
      "数量"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：PolQty。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Qty"
  },
  {
    "id": "part74-abbr-R",
    "zh": "R 上升",
    "en": "Raise",
    "aliases": [
      "R",
      "Raise",
      "上升"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；按父节点功能和数据上下文理解，不单独定义业务。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-R"
  },
  {
    "id": "part74-abbr-R0",
    "zh": "R0 零序电阻",
    "en": "Zero sequence resistance",
    "aliases": [
      "R0",
      "Zero sequence resistance",
      "零序电阻"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：R0。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-R0"
  },
  {
    "id": "part74-abbr-R1",
    "zh": "R1 线路正序电阻",
    "en": "Positive sequence resistance",
    "aliases": [
      "R1",
      "Positive sequence resistance",
      "线路正序电阻"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：R1。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-R1"
  },
  {
    "id": "part74-abbr-Rat",
    "zh": "Rat 绕组比",
    "en": "Winding ratio",
    "aliases": [
      "Rat",
      "Winding ratio",
      "绕组比"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：AgeRat、Rat。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Rat"
  },
  {
    "id": "part74-abbr-Rcd",
    "zh": "Rcd 记录",
    "en": "Record, recording",
    "aliases": [
      "Rcd",
      "Record, recording",
      "记录"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：DltRcd、MaxNumRcd、NumRcd。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Rcd"
  },
  {
    "id": "part74-abbr-Rch",
    "zh": "Rch 范围",
    "en": "Reach",
    "aliases": [
      "Rch",
      "Reach",
      "范围"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：PctRch、PoRch、RisGndRch。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Rch"
  },
  {
    "id": "part74-abbr-Rcl",
    "zh": "Rcl 复归",
    "en": "Reclaim",
    "aliases": [
      "Rcl",
      "Reclaim",
      "复归"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：RclTmms。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Rcl"
  },
  {
    "id": "part74-abbr-Re",
    "zh": "Re 重试",
    "en": "Retry",
    "aliases": [
      "Re",
      "Retry",
      "重试"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：AutoRecSt、BlkRec、ChkRec。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Re"
  },
  {
    "id": "part74-abbr-React",
    "zh": "React 电抗、无功",
    "en": "Reactance, Reactive",
    "aliases": [
      "React",
      "Reactance, Reactive",
      "电抗、无功"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：ReactPwrL、ReactPwrR、RefReact。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-React"
  },
  {
    "id": "part74-abbr-Rec",
    "zh": "Rec 重合闸",
    "en": "Reclose",
    "aliases": [
      "Rec",
      "Reclose",
      "重合闸"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：AutoRecSt、BlkRec、ChkRec。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Rec"
  },
  {
    "id": "part74-abbr-Red",
    "zh": "Red 降低",
    "en": "Reduction",
    "aliases": [
      "Red",
      "Reduction",
      "降低"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：VRed、VRedVal。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Red"
  },
  {
    "id": "part74-abbr-Rel",
    "zh": "Rel 释放",
    "en": "Release",
    "aliases": [
      "Rel",
      "Release",
      "释放"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：Rel。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Rel"
  },
  {
    "id": "part74-abbr-Rem",
    "zh": "Rem 远方",
    "en": "Remote",
    "aliases": [
      "Rem",
      "Remote",
      "远方"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：OpARem。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Rem"
  },
  {
    "id": "part74-abbr-Res",
    "zh": "Res 残差",
    "en": "Residual",
    "aliases": [
      "Res",
      "Residual",
      "残差"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；按父节点功能和数据上下文理解，不单独定义业务。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Res"
  },
  {
    "id": "part74-abbr-Ris",
    "zh": "Ris 电阻",
    "en": "Resistance",
    "aliases": [
      "Ris",
      "Resistance",
      "电阻"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：RisGndRch、RisLod、RisPhRch。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Ris"
  },
  {
    "id": "part74-abbr-Rl",
    "zh": "Rl 关系",
    "en": "Relation",
    "aliases": [
      "Rl",
      "Relation",
      "关系"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：TmpRl。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Rl"
  },
  {
    "id": "part74-abbr-Rms",
    "zh": "Rms 均方根",
    "en": "Root mean square",
    "aliases": [
      "Rms",
      "Root mean square",
      "均方根"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：HaRmsAmp、HaRmsVol、HRmsA。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Rms"
  },
  {
    "id": "part74-abbr-Rot",
    "zh": "Rot 旋转，转子",
    "en": "Rotation, Rotor",
    "aliases": [
      "Rot",
      "Rotation, Rotor",
      "旋转，转子"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：ClkRot、CntClkRot、LokRotTms。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Rot"
  },
  {
    "id": "part74-abbr-Rs",
    "zh": "Rs 复位，可复位",
    "en": "Reset, Resetable",
    "aliases": [
      "Rs",
      "Reset, Resetable",
      "复位，可复位"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：ArcCntRs、FACntRs、HaRst。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Rs"
  },
  {
    "id": "part74-abbr-Rsl",
    "zh": "Rsl 结果",
    "en": "Result",
    "aliases": [
      "Rsl",
      "Result",
      "结果"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：TestRsl。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Rsl"
  },
  {
    "id": "part74-abbr-Rst",
    "zh": "Rst 约束、制动",
    "en": "Restraint",
    "aliases": [
      "Rst",
      "Restraint",
      "约束、制动"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：HaRst、RstA、RstMod。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Rst"
  },
  {
    "id": "part74-abbr-Rsv",
    "zh": "Rsv 保留",
    "en": "Reserve",
    "aliases": [
      "Rsv",
      "Reserve",
      "保留"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：LodRsvAlm、LodRsvTr。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Rsv"
  },
  {
    "id": "part74-abbr-Rte",
    "zh": "Rte 速率",
    "en": "Rate",
    "aliases": [
      "Rte",
      "Rate",
      "速率"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：VolChgRte。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Rte"
  },
  {
    "id": "part74-abbr-Rtg",
    "zh": "Rtg 额定",
    "en": "Rating",
    "aliases": [
      "Rtg",
      "Rating",
      "额定"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：ARtg、HiVRtg、HzRtg。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Rtg"
  },
  {
    "id": "part74-abbr-Rv",
    "zh": "Rv 反向",
    "en": "Reverse",
    "aliases": [
      "Rv",
      "Reverse",
      "反向"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：MaxRvAng、MinRvAng、RvABlk。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Rv"
  },
  {
    "id": "part74-abbr-Rx",
    "zh": "Rx 接收",
    "en": "Receive, received",
    "aliases": [
      "Rx",
      "Receive, received",
      "接收"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：CarRx、GrdRx、ProRx。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Rx"
  },
  {
    "id": "part74-abbr-S1",
    "zh": "S1 步骤1",
    "en": "Step one",
    "aliases": [
      "S1",
      "Step one",
      "步骤1"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；按父节点功能和数据上下文理解，不单独定义业务。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-S1"
  },
  {
    "id": "part74-abbr-S2",
    "zh": "S2 步骤2",
    "en": "Step two",
    "aliases": [
      "S2",
      "Step two",
      "步骤2"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；按父节点功能和数据上下文理解，不单独定义业务。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-S2"
  },
  {
    "id": "part74-abbr-Sch",
    "zh": "Sch 回路",
    "en": "Scheme",
    "aliases": [
      "Sch",
      "Scheme",
      "回路"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：SchTyp。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Sch"
  },
  {
    "id": "part74-abbr-SCO",
    "zh": "SCO 电源切换",
    "en": "Supply change over",
    "aliases": [
      "SCO",
      "Supply change over",
      "电源切换"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：AuxSCO。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-SCO"
  },
  {
    "id": "part74-abbr-SCSM",
    "zh": "SCSM 特殊通信服务映射",
    "en": "Specific Communication Service Mapping",
    "aliases": [
      "SCSM",
      "Specific Communication Service Mapping",
      "特殊通信服务映射"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；按父节点功能和数据上下文理解，不单独定义业务。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-SCSM"
  },
  {
    "id": "part74-abbr-Sec",
    "zh": "Sec 安全",
    "en": "Security",
    "aliases": [
      "Sec",
      "Security",
      "安全"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "本表为 Security；秒的单位用 s，时间名称按 Tms/Tmms 区分。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Sec"
  },
  {
    "id": "part74-abbr-Seq",
    "zh": "Seq 顺序、相序",
    "en": "Sequence",
    "aliases": [
      "Seq",
      "Sequence",
      "顺序、相序"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：DQ0Seq、SeqA、SeqV。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Seq"
  },
  {
    "id": "part74-abbr-Set",
    "zh": "Set 设定、定值",
    "en": "Setting",
    "aliases": [
      "Set",
      "Setting",
      "设定、定值"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：HiSet、HzSet、LoSet。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Set"
  },
  {
    "id": "part74-abbr-Sh",
    "zh": "Sh 并联、分流",
    "en": "Shunt",
    "aliases": [
      "Sh",
      "Shunt",
      "并联、分流"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：ShOpCap。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Sh"
  },
  {
    "id": "part74-abbr-Spd",
    "zh": "Spd 速度",
    "en": "Speed",
    "aliases": [
      "Spd",
      "Speed",
      "速度"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；按父节点功能和数据上下文理解，不单独定义业务。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Spd"
  },
  {
    "id": "part74-abbr-SPl",
    "zh": "SPl 单极、单相",
    "en": "Single Pole",
    "aliases": [
      "SPl",
      "Single Pole",
      "单极、单相"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：SPlTrTmms。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-SPl"
  },
  {
    "id": "part74-abbr-SPCSO",
    "zh": "SPCSO 单点可控状态输出",
    "en": "Single point controllable status output",
    "aliases": [
      "SPCSO",
      "Single point controllable status output",
      "单点可控状态输出"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：SPCSO。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-SPCSO"
  },
  {
    "id": "part74-abbr-Src",
    "zh": "Src 源",
    "en": "Source",
    "aliases": [
      "Src",
      "Source",
      "源"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；按父节点功能和数据上下文理解，不单独定义业务。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Src"
  },
  {
    "id": "part74-abbr-St",
    "zh": "St 状态",
    "en": "Status",
    "aliases": [
      "St",
      "Status",
      "状态"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：AStr、AutoRecSt、AVSt。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-St"
  },
  {
    "id": "part74-abbr-Stat",
    "zh": "Stat 统计",
    "en": "Statistics",
    "aliases": [
      "Stat",
      "Statistics",
      "统计"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：RsStat。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Stat"
  },
  {
    "id": "part74-abbr-Stop",
    "zh": "Stop 停止",
    "en": "Stop",
    "aliases": [
      "Stop",
      "Stop",
      "停止"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：PhStop、StopVlv。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Stop"
  },
  {
    "id": "part74-abbr-Std",
    "zh": "Std 标准",
    "en": "Standard",
    "aliases": [
      "Std",
      "Standard",
      "标准"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；按父节点功能和数据上下文理解，不单独定义业务。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Std"
  },
  {
    "id": "part74-abbr-Str",
    "zh": "Str 开始、启动",
    "en": "Start",
    "aliases": [
      "Str",
      "Start",
      "开始、启动"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：AStr、GndStr、HVStr。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Str"
  },
  {
    "id": "part74-abbr-Sts",
    "zh": "Sts 应力",
    "en": "Stress",
    "aliases": [
      "Sts",
      "Stress",
      "应力"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；按父节点功能和数据上下文理解，不单独定义业务。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Sts"
  },
  {
    "id": "part74-abbr-Sup",
    "zh": "Sup 电源",
    "en": "Supply",
    "aliases": [
      "Sup",
      "Supply",
      "电源"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：PwrSupAlm、SupVArh、SupWh。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Sup"
  },
  {
    "id": "part74-abbr-Svc",
    "zh": "Svc 服务",
    "en": "Service",
    "aliases": [
      "Svc",
      "Service",
      "服务"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：SvcViol。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Svc"
  },
  {
    "id": "part74-abbr-Sw",
    "zh": "Sw 开关",
    "en": "Switch",
    "aliases": [
      "Sw",
      "Switch",
      "开关"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：SumSwARs、SwArcDet、SwgReact。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Sw"
  },
  {
    "id": "part74-abbr-Swg",
    "zh": "Swg 摆动、振荡",
    "en": "Swing",
    "aliases": [
      "Swg",
      "Swing",
      "摆动、振荡"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：SwgReact、SwgRis、SwgTmms。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Swg"
  },
  {
    "id": "part74-abbr-Syn",
    "zh": "Syn 同步",
    "en": "Synchronisation",
    "aliases": [
      "Syn",
      "Synchronisation",
      "同步"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：SynPrg。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Syn"
  },
  {
    "id": "part74-abbr-Tap",
    "zh": "Tap 分接头",
    "en": "Tap",
    "aliases": [
      "Tap",
      "Tap",
      "分接头"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：ColTapPos、HiTapPos、LoTapPos。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Tap"
  },
  {
    "id": "part74-abbr-Td",
    "zh": "Td 总失真",
    "en": "Total distortion",
    "aliases": [
      "Td",
      "Total distortion",
      "总失真"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：HaTdFact、HTdf、TddA。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Td"
  },
  {
    "id": "part74-abbr-Tdf",
    "zh": "Tdf 变压器额定值下降系数",
    "en": "Transformer derating factor",
    "aliases": [
      "Tdf",
      "Transformer derating factor",
      "变压器额定值下降系数"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：HTdf。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Tdf"
  },
  {
    "id": "part74-abbr-Test",
    "zh": "Test 测试",
    "en": "Test",
    "aliases": [
      "Test",
      "Test",
      "测试"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：BatTest、TestRsl。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Test"
  },
  {
    "id": "part74-abbr-Thd",
    "zh": "Thd 总谐波失真",
    "en": "Total harmonics distortion",
    "aliases": [
      "Thd",
      "Total harmonics distortion",
      "总谐波失真"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：ThdA、ThdAmp、ThdATmms。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Thd"
  },
  {
    "id": "part74-abbr-Thm",
    "zh": "Thm 热",
    "en": "Thermal",
    "aliases": [
      "Thm",
      "Thermal",
      "热"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：AlmThm。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Thm"
  },
  {
    "id": "part74-abbr-TiF",
    "zh": "TiF 电话影响因子",
    "en": "Telephone influence factor",
    "aliases": [
      "TiF",
      "Telephone influence factor",
      "电话影响因子"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：HaTiFact。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-TiF"
  },
  {
    "id": "part74-abbr-Tm",
    "zh": "Tm 时间",
    "en": "Time",
    "aliases": [
      "Tm",
      "Time",
      "时间"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：BkrTmms、ConsTms、CrdTmms。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Tm"
  },
  {
    "id": "part74-abbr-Tmh",
    "zh": "Tmh 小时单位时间",
    "en": "Time in hours",
    "aliases": [
      "Tmh",
      "Time in hours",
      "小时单位时间"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：OpTmh。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Tmh"
  },
  {
    "id": "part74-abbr-Tmm",
    "zh": "Tmm 分钟单位时间",
    "en": "Time in minutes",
    "aliases": [
      "Tmm",
      "Time in minutes",
      "分钟单位时间"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：BkrTmms、CrdTmms、CtlDlTmms。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Tmm"
  },
  {
    "id": "part74-abbr-Tms",
    "zh": "Tms 秒单位时间",
    "en": "Time in seconds",
    "aliases": [
      "Tms",
      "Time in seconds",
      "秒单位时间"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：ConsTms、LokRotTms、PerTrgTms。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Tms"
  },
  {
    "id": "part74-abbr-Tmms",
    "zh": "Tmms 毫秒单位时间",
    "en": "Time in milliseconds",
    "aliases": [
      "Tmms",
      "Time in milliseconds",
      "毫秒单位时间"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "后缀提示毫秒时间，具体值的类型和范围仍查 CDC。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Tmms"
  },
  {
    "id": "part74-abbr-Tmp",
    "zh": "Tmp 温度，℃",
    "en": "Temperature (degrees Celsius)",
    "aliases": [
      "Tmp",
      "Temperature (degrees Celsius)",
      "温度，℃"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：EnvTmp、H2OTmp、HPTmp。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Tmp"
  },
  {
    "id": "part74-abbr-To",
    "zh": "To 顶部",
    "en": "Top",
    "aliases": [
      "To",
      "Top",
      "顶部"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：Torq、TotPF、TotVA。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-To"
  },
  {
    "id": "part74-abbr-Tot",
    "zh": "Tot 总的",
    "en": "Total",
    "aliases": [
      "Tot",
      "Total",
      "总的"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：TotPF、TotVA、TotVAh。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Tot"
  },
  {
    "id": "part74-abbr-TP",
    "zh": "TP 三极、三相",
    "en": "Three pole",
    "aliases": [
      "TP",
      "Three pole",
      "三极、三相"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：TPTrTmms。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-TP"
  },
  {
    "id": "part74-abbr-Tr",
    "zh": "Tr 跳闸",
    "en": "Trip",
    "aliases": [
      "Tr",
      "Trip",
      "跳闸"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：GasFlwTr、GasInsTr、HiTrgLev。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Tr"
  },
  {
    "id": "part74-abbr-Trg",
    "zh": "Trg 触发",
    "en": "Trigger",
    "aliases": [
      "Trg",
      "Trigger",
      "触发"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：HiTrgLev、LoTrgLev、PerTrgTms。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Trg"
  },
  {
    "id": "part74-abbr-Ts",
    "zh": "Ts 有符号数总和",
    "en": "Total signed",
    "aliases": [
      "Ts",
      "Total signed",
      "有符号数总和"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "带符号代数和；相反方向谐波功率可抵消。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Ts"
  },
  {
    "id": "part74-abbr-Tu",
    "zh": "Tu 无符号数总和",
    "en": "Total unsigned",
    "aliases": [
      "Tu",
      "Total unsigned",
      "无符号数总和"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "绝对值累加；用于反映谐波负担而非净输送功率。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Tu"
  },
  {
    "id": "part74-abbr-Tx",
    "zh": "Tx 发送、传输、被发送",
    "en": "Transmit, transmitted",
    "aliases": [
      "Tx",
      "Transmit, transmitted",
      "发送、传输、被发送"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：ProTx。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Tx"
  },
  {
    "id": "part74-abbr-Typ",
    "zh": "Typ 类型",
    "en": "Type",
    "aliases": [
      "Typ",
      "Type",
      "类型"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：SchTyp、SwTyp、TypRsCrv。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Typ"
  },
  {
    "id": "part74-abbr-Un",
    "zh": "Un 低于、欠量",
    "en": "Under",
    "aliases": [
      "Un",
      "Under",
      "低于、欠量"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：OpUnExt、OpUnV、UnBlkMod。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Un"
  },
  {
    "id": "part74-abbr-V",
    "zh": "V 电压",
    "en": "Voltage",
    "aliases": [
      "V",
      "Voltage",
      "电压"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；按父节点功能和数据上下文理解，不单独定义业务。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-V"
  },
  {
    "id": "part74-abbr-VA",
    "zh": "VA 伏安",
    "en": "Volt Amperes",
    "aliases": [
      "VA",
      "Volt Amperes",
      "伏安"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：AvVA、AvVAr、DmdVArh。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-VA"
  },
  {
    "id": "part74-abbr-Vac",
    "zh": "Vac 真空",
    "en": "Vacuum",
    "aliases": [
      "Vac",
      "Vacuum",
      "真空"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：LosVac。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Vac"
  },
  {
    "id": "part74-abbr-Val",
    "zh": "Val 值",
    "en": "Value",
    "aliases": [
      "Val",
      "Value",
      "值"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：AlmVal、BlkVal、BlkValA。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Val"
  },
  {
    "id": "part74-abbr-Var",
    "zh": "Var 乏",
    "en": "Volt amperes reactive",
    "aliases": [
      "Var",
      "Volt amperes reactive",
      "乏"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；按父节点功能和数据上下文理解，不单独定义业务。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Var"
  },
  {
    "id": "part74-abbr-Vlv",
    "zh": "Vlv 阀门",
    "en": "Valve",
    "aliases": [
      "Vlv",
      "Valve",
      "阀门"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：StopVlv。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Vlv"
  },
  {
    "id": "part74-abbr-Vol",
    "zh": "Vol 与相别无关的电压",
    "en": "Voltage non phase related",
    "aliases": [
      "Vol",
      "Voltage non phase related",
      "与相别无关的电压"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：AvVolts、HaCfVol、HaRmsVol。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Vol"
  },
  {
    "id": "part74-abbr-VT",
    "zh": "VT 电压互感器、电压传感器",
    "en": "Voltage Transducer",
    "aliases": [
      "VT",
      "Voltage Transducer",
      "电压互感器、电压传感器"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "本表为 Voltage Transducer；一次设备语境也常指 Voltage Transformer。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-VT"
  },
  {
    "id": "part74-abbr-W",
    "zh": "W 有功功率",
    "en": "Active Power",
    "aliases": [
      "W",
      "Active Power",
      "有功功率"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；按父节点功能和数据上下文理解，不单独定义业务。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-W"
  },
  {
    "id": "part74-abbr-Wac",
    "zh": "Wac 定时监视器",
    "en": "Watchdog",
    "aliases": [
      "Wac",
      "Watchdog",
      "定时监视器"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：WacTrg。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Wac"
  },
  {
    "id": "part74-abbr-Watt",
    "zh": "Watt 与相别无关的有功功率",
    "en": "Active Power non phase related",
    "aliases": [
      "Watt",
      "Active Power non phase related",
      "与相别无关的有功功率"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：HaTsWatt、HaTuWatt、HaWatt。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Watt"
  },
  {
    "id": "part74-abbr-Wei",
    "zh": "Wei 弱馈",
    "en": "Weak end infeed",
    "aliases": [
      "Wei",
      "Weak end infeed",
      "弱馈"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：WeiMod、WeiOp、WeiTmms。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Wei"
  },
  {
    "id": "part74-abbr-Wh",
    "zh": "Wh 瓦时",
    "en": "Watt hours",
    "aliases": [
      "Wh",
      "Watt hours",
      "瓦时"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：DmdWh、SupWh、TotWh。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Wh"
  },
  {
    "id": "part74-abbr-Wid",
    "zh": "Wid 宽度",
    "en": "Width",
    "aliases": [
      "Wid",
      "Width",
      "宽度"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：BndWid。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Wid"
  },
  {
    "id": "part74-abbr-Win",
    "zh": "Win 窗口",
    "en": "Windows",
    "aliases": [
      "Win",
      "Windows",
      "窗口"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；按父节点功能和数据上下文理解，不单独定义业务。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Win"
  },
  {
    "id": "part74-abbr-Wrm",
    "zh": "Wrm 升温、发热",
    "en": "Warm",
    "aliases": [
      "Wrm",
      "Warm",
      "升温、发热"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：MaxWrmStr、WrmStr。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Wrm"
  },
  {
    "id": "part74-abbr-X0",
    "zh": "X0 零序电抗",
    "en": "Zero sequence reactance",
    "aliases": [
      "X0",
      "Zero sequence reactance",
      "零序电抗"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：X0。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-X0"
  },
  {
    "id": "part74-abbr-X1",
    "zh": "X1 正序电抗",
    "en": "Positive sequence reactance",
    "aliases": [
      "X1",
      "Positive sequence reactance",
      "正序电抗"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：X1。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-X1"
  },
  {
    "id": "part74-abbr-Z",
    "zh": "Z 阻抗",
    "en": "Impedance",
    "aliases": [
      "Z",
      "Impedance",
      "阻抗"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；按父节点功能和数据上下文理解，不单独定义业务。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Z"
  },
  {
    "id": "part74-abbr-Z0",
    "zh": "Z0 零序阻抗",
    "en": "Zero sequence impedance",
    "aliases": [
      "Z0",
      "Zero sequence impedance",
      "零序阻抗"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：Z0Ang、Z0Mod。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Z0"
  },
  {
    "id": "part74-abbr-Z1",
    "zh": "Z1 正序阻抗",
    "en": "Positive sequence impedance",
    "aliases": [
      "Z1",
      "Positive sequence impedance",
      "正序阻抗"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：Z1Ang、Z1Mod。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Z1"
  },
  {
    "id": "part74-abbr-Zer",
    "zh": "Zer 零",
    "en": "Zero",
    "aliases": [
      "Zer",
      "Zero",
      "零"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：ZeroEna。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Zer"
  },
  {
    "id": "part74-abbr-Zn",
    "zh": "Zn 段、区间",
    "en": "Zone",
    "aliases": [
      "Zn",
      "Zone",
      "段、区间"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：BlkZn。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Zn"
  },
  {
    "id": "part74-abbr-Zro",
    "zh": "Zro 零序方法",
    "en": "Zero sequence method",
    "aliases": [
      "Zro",
      "Zero sequence method",
      "零序方法"
    ],
    "category": "7-4 缩略语",
    "level": "第 4 章组词",
    "summary": "用作数据名组成词；例：ImbZroA、ImbZroV。",
    "related": [
      "ln",
      "do"
    ],
    "href": "chapters/ln-abbreviations.html#abbr-Zro"
  },
  {
    "id": "part74-page-standard-part-7-4",
    "zh": "第 7-4 部分：兼容逻辑节点类和数据类",
    "en": "第 7-4 部分：兼容逻辑节点类和数据类",
    "aliases": [
      "第 7-4 部分：兼容逻辑节点类和数据类",
      "7-4"
    ],
    "category": "标准文库",
    "level": "第 7-4 部分",
    "summary": "功能、语义、取值和原文定位完整关联阅读。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/standard-part-7-4.html"
  },
  {
    "id": "part74-page-ln-system",
    "zh": "公用逻辑节点信息：组成、继承与状态",
    "en": "公用逻辑节点信息：组成、继承与状态",
    "aliases": [
      "公用逻辑节点信息：组成、继承与状态",
      "7-4"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分",
    "summary": "功能、语义、取值和原文定位完整关联阅读。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-system.html"
  },
  {
    "id": "part74-page-ln-protection",
    "zh": "保护功能逻辑节点：P 组全表",
    "en": "保护功能逻辑节点：P 组全表",
    "aliases": [
      "保护功能逻辑节点：P 组全表",
      "7-4"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分",
    "summary": "功能、语义、取值和原文定位完整关联阅读。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-protection.html"
  },
  {
    "id": "part74-page-ln-protection-related",
    "zh": "保护相关逻辑节点：R 组全表",
    "en": "保护相关逻辑节点：R 组全表",
    "aliases": [
      "保护相关逻辑节点：R 组全表",
      "7-4"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分",
    "summary": "功能、语义、取值和原文定位完整关联阅读。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-protection-related.html"
  },
  {
    "id": "part74-page-ln-control-generic",
    "zh": "控制、通用功能与接口：C / G / I 组",
    "en": "控制、通用功能与接口：C / G / I 组",
    "aliases": [
      "控制、通用功能与接口：C / G / I 组",
      "7-4"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分",
    "summary": "功能、语义、取值和原文定位完整关联阅读。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-control-generic.html"
  },
  {
    "id": "part74-page-ln-automatic",
    "zh": "自动控制逻辑节点：A 组",
    "en": "自动控制逻辑节点：A 组",
    "aliases": [
      "自动控制逻辑节点：A 组",
      "7-4"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分",
    "summary": "功能、语义、取值和原文定位完整关联阅读。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-automatic.html"
  },
  {
    "id": "part74-page-ln-measurement",
    "zh": "测量、计量与电气基础：M 组",
    "en": "测量、计量与电气基础：M 组",
    "aliases": [
      "测量、计量与电气基础：M 组",
      "7-4"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分",
    "summary": "功能、语义、取值和原文定位完整关联阅读。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-measurement.html"
  },
  {
    "id": "part74-page-ln-switch-transformer",
    "zh": "开关、互感器与变压器：X / T / Y 组",
    "en": "开关、互感器与变压器：X / T / Y 组",
    "aliases": [
      "开关、互感器与变压器：X / T / Y 组",
      "7-4"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分",
    "summary": "功能、语义、取值和原文定位完整关联阅读。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-switch-transformer.html"
  },
  {
    "id": "part74-page-ln-monitoring-equipment",
    "zh": "传感器监视与其他电力设备：S / Z 组",
    "en": "传感器监视与其他电力设备：S / Z 组",
    "aliases": [
      "传感器监视与其他电力设备：S / Z 组",
      "7-4"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分",
    "summary": "功能、语义、取值和原文定位完整关联阅读。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-monitoring-equipment.html"
  },
  {
    "id": "part74-page-ln-values-reference",
    "zh": "7-4 数据取值：枚举、模式组合与量纲",
    "en": "7-4 数据取值：枚举、模式组合与量纲",
    "aliases": [
      "7-4 数据取值：枚举、模式组合与量纲",
      "7-4"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分",
    "summary": "功能、语义、取值和原文定位完整关联阅读。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-values-reference.html"
  },
  {
    "id": "part74-page-ln-data-dictionary",
    "zh": "第 6 章：519 个数据名称与反向索引",
    "en": "第 6 章：519 个数据名称与反向索引",
    "aliases": [
      "第 6 章：519 个数据名称与反向索引",
      "7-4"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分",
    "summary": "功能、语义、取值和原文定位完整关联阅读。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-data-dictionary.html"
  },
  {
    "id": "part74-page-ln-abbreviations",
    "zh": "第 4 章：缩写、英文、中文与用法",
    "en": "第 4 章：缩写、英文、中文与用法",
    "aliases": [
      "第 4 章：缩写、英文、中文与用法",
      "7-4"
    ],
    "category": "标准文库",
    "level": "第 7-4 部分",
    "summary": "功能、语义、取值和原文定位完整关联阅读。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-abbreviations.html"
  },
  {
    "id": "part74-page-ln-extension-modeling",
    "zh": "附录 A/B/C：扩展规则与功能建模",
    "en": "附录 A/B/C：扩展规则与功能建模",
    "aliases": [
      "附录 A/B/C：扩展规则与功能建模",
      "7-4"
    ],
    "category": "数据模型",
    "level": "第 7-4 部分",
    "summary": "功能、语义、取值和原文定位完整关联阅读。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-extension-modeling.html"
  },
  {
    "id": "part74-page-ln-scd-evidence",
    "zh": "参考 SCD：逻辑节点实例、类型链与枚举",
    "en": "参考 SCD：逻辑节点实例、类型链与枚举",
    "aliases": [
      "参考 SCD：逻辑节点实例、类型链与枚举",
      "7-4"
    ],
    "category": "SCL 配置",
    "level": "第 7-4 部分",
    "summary": "功能、语义、取值和原文定位完整关联阅读。",
    "related": [
      "ln",
      "do",
      "cdc"
    ],
    "href": "chapters/ln-scd-evidence.html"
  }
];const terms=window.IEC61850_TERMS;for(const entry of additions){const old=terms.find(t=>t.id===entry.id);if(old){entry.aliases=[...new Set([...(old.aliases||[]),old.zh,...entry.aliases])];entry.related=[...new Set([...(old.related||[]),...entry.related])].filter(id=>id!==entry.id);Object.assign(old,entry);}else terms.push(entry);}}());
