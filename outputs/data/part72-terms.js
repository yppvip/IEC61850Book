/* 第 7-2 部分增补；更新既有 ID，保持旧词条引用有效。 */
(function () {
  const additions = [
  {
    "id": "acsi72-aa",
    "zh": "AA（应用关联）",
    "en": "Application Association",
    "aliases": [
      "AA",
      "应用关联",
      "Application Association"
    ],
    "category": "ACSI 类型与服务",
    "level": "关联模型",
    "summary": "通信双方及其访问上下文；包括 TPAA、MCAA。",
    "related": [
      "acsi",
      "fc",
      "fcda"
    ],
    "href": "chapters/acsi-server-associations.html#association"
  },
  {
    "id": "acsi",
    "zh": "ACSI（抽象通信服务接口）",
    "en": "Abstract Communication Service Interface",
    "aliases": [
      "ACSI",
      "抽象通信服务接口",
      "Abstract Communication Service Interface"
    ],
    "category": "ACSI 类型与服务",
    "level": "接口体系",
    "summary": "定义对象、服务及行为；描述功能用 ACSI，描述线上编码进入 SCSM。",
    "related": [
      "acsi",
      "fc",
      "fcda"
    ],
    "href": "chapters/acsi-abstraction.html#two-abstractions"
  },
  {
    "id": "part71-brcb",
    "zh": "BRCB（缓存报告控制块）",
    "en": "Buffered Report Control Block",
    "aliases": [
      "BRCB",
      "缓存报告控制块",
      "Buffered Report Control Block"
    ],
    "category": "ACSI 类型与服务",
    "level": "模型类",
    "summary": "按触发组织并缓存报告事件；恢复时核对 EntryID、溢出与保留范围。",
    "related": [
      "acsi",
      "fc",
      "fcda"
    ],
    "href": "chapters/acsi-runtime-models.html#report"
  },
  {
    "id": "cdc",
    "zh": "CDC（公用数据类）",
    "en": "Common Data Class",
    "aliases": [
      "CDC",
      "公用数据类",
      "Common Data Class"
    ],
    "category": "ACSI 类型与服务",
    "level": "数据类",
    "summary": "规定共用属性结构，如 DPC、SPS、MV；SCD DOType@cdc 表达类别。",
    "related": [
      "acsi",
      "fc",
      "fcda"
    ],
    "href": "chapters/acsi-runtime-models.html#data"
  },
  {
    "id": "datype",
    "zh": "DAType（数据属性类型）",
    "en": "Data Attribute Type",
    "aliases": [
      "DAType",
      "数据属性类型",
      "Data Attribute Type"
    ],
    "category": "ACSI 类型与服务",
    "level": "类型名",
    "summary": "ACSI 泛指属性类型；SCL DAType/BDA 描述结构属性，叶子用 bType。",
    "related": [
      "acsi",
      "fc",
      "fcda"
    ],
    "href": "chapters/acsi-common-types.html#basic"
  },
  {
    "id": "acsi72-dataref",
    "zh": "DataRef（数据引用）",
    "en": "Data Reference",
    "aliases": [
      "DataRef",
      "数据引用",
      "Data Reference"
    ],
    "category": "ACSI 类型与服务",
    "level": "属性名",
    "summary": "DATA 完整路径，如 C_G1101XLD0/LLN0.FunEna1；没有同名 SCL 标签。",
    "related": [
      "acsi",
      "fc",
      "fcda"
    ],
    "href": "chapters/acsi-common-types.html#references"
  },
  {
    "id": "trigger-dchg",
    "zh": "dchg（数据变化）",
    "en": "Data Change",
    "aliases": [
      "dchg",
      "数据变化",
      "Data Change"
    ],
    "category": "ACSI 类型与服务",
    "level": "触发选项",
    "summary": "值按 CDC 规则变化时触发，测量还需考虑死区；DA 特征和控制块采用选项分层。",
    "related": [
      "acsi",
      "fc",
      "fcda"
    ],
    "href": "chapters/acsi-common-types.html#triggers"
  },
  {
    "id": "trigger-dupd",
    "zh": "dupd（数据刷新）",
    "en": "Data Update",
    "aliases": [
      "dupd",
      "数据刷新",
      "Data Update"
    ],
    "category": "ACSI 类型与服务",
    "level": "触发选项",
    "summary": "属性刷新可触发，值不必不同；不等于周期完整性报告。",
    "related": [
      "acsi",
      "fc",
      "fcda"
    ],
    "href": "chapters/acsi-common-types.html#triggers"
  },
  {
    "id": "fc",
    "zh": "FC（功能约束）",
    "en": "Functional Constraint",
    "aliases": [
      "FC",
      "功能约束",
      "Functional Constraint"
    ],
    "category": "ACSI 类型与服务",
    "level": "访问分类",
    "summary": "按用途筛选 DA，如 ST、MX、CO、SV、SG、SE；不等于操作授权。",
    "related": [
      "acsi",
      "fc",
      "fcda"
    ],
    "href": "chapters/acsi-runtime-models.html#fc"
  },
  {
    "id": "fcd",
    "zh": "FCD（功能约束数据）",
    "en": "Functionally Constrained Data",
    "aliases": [
      "FCD",
      "功能约束数据",
      "Functionally Constrained Data"
    ],
    "category": "ACSI 类型与服务",
    "level": "引用形式",
    "summary": "DO 与 FC 的组合，选择此 DO 在该 FC 下的属性集合；FCDA 省略 daName 可表达 FCD。",
    "related": [
      "acsi",
      "fc",
      "fcda"
    ],
    "href": "chapters/acsi-runtime-models.html#dataset"
  },
  {
    "id": "fcda",
    "zh": "FCDA（功能约束数据属性）",
    "en": "Functionally Constrained Data Attribute",
    "aliases": [
      "FCDA",
      "功能约束数据属性",
      "Functionally Constrained Data Attribute"
    ],
    "category": "ACSI 类型与服务",
    "level": "引用形式 / XML 元素",
    "summary": "属性与 FC 的组合；SCL FCDA 也能表达 FCD，按 doName/daName/fc 区分。",
    "related": [
      "acsi",
      "fc",
      "fcda"
    ],
    "href": "chapters/scd-acsi-evidence.html#goose-evidence"
  },
  {
    "id": "acsi72-gi",
    "zh": "GI（总召唤）",
    "en": "General Interrogation",
    "aliases": [
      "GI",
      "总召唤",
      "General Interrogation"
    ],
    "category": "ACSI 类型与服务",
    "level": "运行命令",
    "summary": "客户请求当前数据集完整快照；TrgOps.gi 是选项，运行 GI=true 才是启动。",
    "related": [
      "acsi",
      "fc",
      "fcda"
    ],
    "href": "chapters/acsi-runtime-models.html#report"
  },
  {
    "id": "acsi72-intgpd",
    "zh": "intgPd（完整性周期）",
    "en": "Integrity Period",
    "aliases": [
      "intgPd",
      "完整性周期",
      "Integrity Period"
    ],
    "category": "ACSI 类型与服务",
    "level": "属性名",
    "summary": "单位 ms；ACSI 通常写 IntgPd，XML 写 intgPd；0 不产生周期完整性报告。",
    "related": [
      "acsi",
      "fc",
      "fcda"
    ],
    "href": "chapters/acsi-common-types.html#triggers"
  },
  {
    "id": "part71-lcb",
    "zh": "LCB（日志控制块）",
    "en": "Log Control Block",
    "aliases": [
      "LCB",
      "日志控制块",
      "Log Control Block"
    ],
    "category": "ACSI 类型与服务",
    "level": "模型类",
    "summary": "决定哪些数据按何种触发写入 LOG；LogControl 是配置，不包含历史条目。",
    "related": [
      "acsi",
      "fc",
      "fcda"
    ],
    "href": "chapters/acsi-runtime-models.html#log"
  },
  {
    "id": "trigger-qchg",
    "zh": "qchg（品质变化）",
    "en": "Quality Change",
    "aliases": [
      "qchg",
      "品质变化",
      "Quality Change"
    ],
    "category": "ACSI 类型与服务",
    "level": "触发选项",
    "summary": "品质变化可触发，即使数值不变；DA@qchg 与 TrgOps@qchg 分层。",
    "related": [
      "acsi",
      "fc",
      "fcda"
    ],
    "href": "chapters/acsi-common-types.html#triggers"
  },
  {
    "id": "acsi72-sbo",
    "zh": "SBO（操作前选择）",
    "en": "Select Before Operate",
    "aliases": [
      "SBO",
      "操作前选择",
      "Select Before Operate"
    ],
    "category": "ACSI 类型与服务",
    "level": "控制模型",
    "summary": "先选择再操作；普通安全用 Select，增强安全用 SelectWithValue，并受超时约束。",
    "related": [
      "acsi",
      "fc",
      "fcda"
    ],
    "href": "chapters/acsi-runtime-models.html#control"
  },
  {
    "id": "scl",
    "zh": "SCL（变电站配置语言）",
    "en": "Substation Configuration Language",
    "aliases": [
      "SCL",
      "变电站配置语言",
      "Substation Configuration Language"
    ],
    "category": "ACSI 类型与服务",
    "level": "工程语言",
    "summary": "XML 工程交换语言；SCD 是文件类型，服务请求和响应不写成 SCD 标签。",
    "related": [
      "acsi",
      "fc",
      "fcda"
    ],
    "href": "chapters/scd-acsi-evidence.html#positions"
  },
  {
    "id": "acsi72-sg",
    "zh": "SG（定值组）",
    "en": "Setting Group",
    "aliases": [
      "SG",
      "定值组",
      "Setting Group"
    ],
    "category": "ACSI 类型与服务",
    "level": "参数集合 / FC",
    "summary": "共同切换的一组参数；FC=SG 为激活视图，FC=SE 为编辑视图。",
    "related": [
      "acsi",
      "fc",
      "fcda"
    ],
    "href": "chapters/acsi-runtime-models.html#settings"
  },
  {
    "id": "acsi72-sgcb",
    "zh": "SGCB（定值组控制块）",
    "en": "Setting Group Control Block",
    "aliases": [
      "SGCB",
      "定值组控制块",
      "Setting Group Control Block"
    ],
    "category": "ACSI 类型与服务",
    "level": "模型类",
    "summary": "管理组数、激活、编辑和确认；LLN0/SettingControl 表达工程配置。",
    "related": [
      "acsi",
      "fc",
      "fcda"
    ],
    "href": "chapters/acsi-runtime-models.html#settings"
  },
  {
    "id": "acsi72-trgop",
    "zh": "TrgOp（触发选项）",
    "en": "Trigger Option",
    "aliases": [
      "TrgOp",
      "触发选项",
      "Trigger Option"
    ],
    "category": "ACSI 类型与服务",
    "level": "属性特征",
    "summary": "属性事件能力；控制块 TrgOps 选择采用哪些事件；DA 的 dchg 不证明报告已使能。",
    "related": [
      "acsi",
      "fc",
      "fcda"
    ],
    "href": "chapters/acsi-common-types.html#triggers"
  },
  {
    "id": "part71-urcb",
    "zh": "URCB（非缓存报告控制块）",
    "en": "Unbuffered Report Control Block",
    "aliases": [
      "URCB",
      "非缓存报告控制块",
      "Unbuffered Report Control Block"
    ],
    "category": "ACSI 类型与服务",
    "level": "模型类",
    "summary": "连接期间尽力报告；不按 BRCB 方式补送断线期间事件。",
    "related": [
      "acsi",
      "fc",
      "fcda"
    ],
    "href": "chapters/acsi-runtime-models.html#report"
  },
  {
    "id": "acsi72-tpaa",
    "zh": "TPAA（双边应用关联）",
    "en": "Two Party Application Association",
    "aliases": [
      "TPAA",
      "双边应用关联",
      "Two Party Application Association"
    ],
    "category": "ACSI 类型与服务",
    "level": "模型类",
    "summary": "双向、面向连接；Associate 建立，Release 正常释放，Abort 异常中止。",
    "related": [
      "acsi",
      "fc",
      "fcda"
    ],
    "href": "chapters/acsi-server-associations.html#tpaa"
  },
  {
    "id": "acsi72-mcaa",
    "zh": "MCAA（多路广播应用关联）",
    "en": "Multicast Application Association",
    "aliases": [
      "MCAA",
      "多路广播应用关联",
      "Multicast Application Association"
    ],
    "category": "ACSI 类型与服务",
    "level": "模型类",
    "summary": "发布者向一个或多个订户单向发送无确认信息；不逐个订户执行 Associate。",
    "related": [
      "acsi",
      "fc",
      "fcda"
    ],
    "href": "chapters/acsi-server-associations.html#mcaa"
  },
  {
    "id": "acsi72-scsm",
    "zh": "SCSM（特定通信服务映射）",
    "en": "Specific Communication Service Mapping",
    "aliases": [
      "SCSM",
      "特定通信服务映射",
      "Specific Communication Service Mapping"
    ],
    "category": "ACSI 类型与服务",
    "level": "映射规范",
    "summary": "将抽象类和服务映射到具体寻址、协议与编码，如 8-1、9-2。",
    "related": [
      "acsi",
      "fc",
      "fcda"
    ],
    "href": "chapters/acsi-abstraction.html#interfaces"
  },
  {
    "id": "acsi72-entryid",
    "zh": "EntryID（条目标识符）",
    "en": "Entry Identifier",
    "aliases": [
      "EntryID",
      "条目标识符",
      "Entry Identifier"
    ],
    "category": "ACSI 类型与服务",
    "level": "公共类型",
    "summary": "报告恢复和日志查询使用的不透明字节串；不是业务编号或时间。",
    "related": [
      "acsi",
      "fc",
      "fcda"
    ],
    "href": "chapters/acsi-common-types.html#entry"
  },
  {
    "id": "acsi72-entrytime",
    "zh": "EntryTime（条目时间）",
    "en": "Entry Time",
    "aliases": [
      "EntryTime",
      "条目时间",
      "Entry Time"
    ],
    "category": "ACSI 类型与服务",
    "level": "公共类型",
    "summary": "报告、日志与通信子系统的条目相关时间；表示由 SCSM 定义。",
    "related": [
      "acsi",
      "fc",
      "fcda"
    ],
    "href": "chapters/acsi-common-types.html#entry"
  },
  {
    "id": "acsi72-timestamp",
    "zh": "TimeStamp（时标）",
    "en": "Time Stamp",
    "aliases": [
      "TimeStamp",
      "时标",
      "Time Stamp"
    ],
    "category": "ACSI 类型与服务",
    "level": "公共类型",
    "summary": "由纪元秒、秒的小数、时间品质组成；可表示分辨率不证明设备准确度。",
    "related": [
      "acsi",
      "fc",
      "fcda"
    ],
    "href": "chapters/acsi-common-types.html#timestamp"
  },
  {
    "id": "acsi72-packed_list",
    "zh": "PACKED-LIST（压缩表）",
    "en": "Packed List",
    "aliases": [
      "PACKED-LIST",
      "压缩表",
      "Packed List"
    ],
    "category": "ACSI 类型与服务",
    "level": "公共类型",
    "summary": "有序分量的紧凑编码，不能通过该类型独立访问分量；不是文件压缩。",
    "related": [
      "acsi",
      "fc",
      "fcda"
    ],
    "href": "chapters/acsi-common-types.html#packed"
  },
  {
    "id": "chapter-standard-part-7-2",
    "zh": "第 7-2 部分：抽象通信服务接口 ACSI",
    "en": "IEC 61850-7-2 ACSI guide",
    "aliases": [
      "标准文库",
      "第7-2部分",
      "7-2",
      "ACSI"
    ],
    "category": "标准文库",
    "level": "第 7-2 部分关联专题",
    "summary": "早期标准基线、属性与服务、参考 SCD 和工程阅读边界。",
    "related": [
      "acsi",
      "scd"
    ],
    "href": "chapters/standard-part-7-2.html"
  },
  {
    "id": "chapter-acsi-abstraction",
    "zh": "抽象接口：信息模型与通信协作",
    "en": "IEC 61850-7-2 ACSI guide",
    "aliases": [
      "技术知识",
      "第7-2部分",
      "7-2",
      "ACSI"
    ],
    "category": "技术知识",
    "level": "第 7-2 部分关联专题",
    "summary": "早期标准基线、属性与服务、参考 SCD 和工程阅读边界。",
    "related": [
      "acsi",
      "scd"
    ],
    "href": "chapters/acsi-abstraction.html"
  },
  {
    "id": "chapter-acsi-common-types",
    "zh": "ACSI 基本类型、公共类型与对象引用",
    "en": "IEC 61850-7-2 ACSI guide",
    "aliases": [
      "数据模型",
      "第7-2部分",
      "7-2",
      "ACSI"
    ],
    "category": "数据模型",
    "level": "第 7-2 部分关联专题",
    "summary": "早期标准基线、属性与服务、参考 SCD 和工程阅读边界。",
    "related": [
      "acsi",
      "scd"
    ],
    "href": "chapters/acsi-common-types.html"
  },
  {
    "id": "chapter-acsi-server-associations",
    "zh": "服务器、应用关联与访问视窗",
    "en": "IEC 61850-7-2 ACSI guide",
    "aliases": [
      "通信协议",
      "第7-2部分",
      "7-2",
      "ACSI"
    ],
    "category": "通信协议",
    "level": "第 7-2 部分关联专题",
    "summary": "早期标准基线、属性与服务、参考 SCD 和工程阅读边界。",
    "related": [
      "acsi",
      "scd"
    ],
    "href": "chapters/acsi-server-associations.html"
  },
  {
    "id": "chapter-acsi-runtime-models",
    "zh": "第 8～17 章：数据、交换与控制模型",
    "en": "IEC 61850-7-2 ACSI guide",
    "aliases": [
      "数据模型",
      "第7-2部分",
      "7-2",
      "ACSI"
    ],
    "category": "数据模型",
    "level": "第 7-2 部分关联专题",
    "summary": "早期标准基线、属性与服务、参考 SCD 和工程阅读边界。",
    "related": [
      "acsi",
      "scd"
    ],
    "href": "chapters/acsi-runtime-models.html"
  },
  {
    "id": "chapter-scd-acsi-evidence",
    "zh": "参考 SCD：ACSI 配置位置与真实引用链",
    "en": "IEC 61850-7-2 ACSI guide",
    "aliases": [
      "SCL 配置",
      "第7-2部分",
      "7-2",
      "ACSI"
    ],
    "category": "SCL 配置",
    "level": "第 7-2 部分关联专题",
    "summary": "早期标准基线、属性与服务、参考 SCD 和工程阅读边界。",
    "related": [
      "acsi",
      "scd"
    ],
    "href": "chapters/scd-acsi-evidence.html"
  },
  {
    "id": "chapter-acsi-engineering-workflows",
    "zh": "时间、文件与 ACSI 工程核查",
    "en": "IEC 61850-7-2 ACSI guide",
    "aliases": [
      "工程应用",
      "第7-2部分",
      "7-2",
      "ACSI"
    ],
    "category": "工程应用",
    "level": "第 7-2 部分关联专题",
    "summary": "早期标准基线、属性与服务、参考 SCD 和工程阅读边界。",
    "related": [
      "acsi",
      "scd"
    ],
    "href": "chapters/acsi-engineering-workflows.html"
  }
];
  const terms = window.IEC61850_TERMS;
  for (const entry of additions) {
    const old = terms.find(term => term.id === entry.id);
    if (old) {
      entry.aliases = [...new Set([...old.aliases, old.zh, ...entry.aliases])];
      entry.related = [...new Set([...old.related, ...entry.related])].filter(id => id !== entry.id);
      Object.assign(old, entry);
    } else {
      entry.related = entry.related.filter(id => id !== entry.id);
      terms.push(entry);
    }
  }
}());
