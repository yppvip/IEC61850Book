# IEC 61850 / SCL 离线百科

## 当前目标

构建可离线打开的中文 IEC 61850 / SCL 百科知识库，帮助读者查询关键术语、理解标准对象和追踪工程组织关系。文档使用中文解释，保留 XML 英文标签、缩写、枚举名和引用路径。交付物允许由多个静态 HTML、CSS、JavaScript 和 JSON 数据文件组成，但不得依赖网络或 CDN。

目标是尽可能覆盖 IEC 61850 标准模型，采用可持续扩充的模块化组织；不得将“全部覆盖”误表述为逐字复述受版权保护标准文本。

## 参考口径与边界

- 参考口径：IEC 61850 Edition 2 / 2.1 的通用模型和 SCL 工程实践。标明 Edition 2.1 新增或变化处；实际互操作性仍以设备一致性声明、ICD/CID 和项目规范为准。
- 覆盖方向：工程交换文件（SCL/SCD/ICD/CID/SSD/SED/IID）、一次系统、IED/数据模型、通信服务、过程层、设备角色、类型模板、标准逻辑节点及常用数据对象、工程校验与排障。
- 工程实例（只读）：`E:\Document\项目\微机五防\全站SCD-工具版本14706\NB500SXS.scd`。可提供统计、脱敏结构摘录和关系示例。
- 暂不处理大型实例：`E:\Document\项目\微机五防\HB-BD-XiongAn-220kV-JuCun-Stat-210419.scd`。
- 私有命名空间、`Private` 和厂商扩展只说明扩展性质；没有厂商资料时不猜测其业务含义。

## 信息架构与交付物

- `outputs/index.html`：百科首页、全局检索、概念地图和分类入口。
- `outputs/assets/`：本地 CSS、JavaScript、索引数据和图示资产。
- `outputs/chapters/`：按主题拆分的百科章节；页面间使用相对链接。
- `outputs/data/`：词条、别名、关系、版本提示和实例统计的结构化数据。
- 现有 `outputs/scl-scd-help.html` 可作为阶段一兼容入口；后续可跳转到百科首页。

## 分步实施

1. **知识库骨架与检索**：创建首页、全局搜索、词条数据格式、标签/别名/关系模型和离线导航。
2. **SCL 与工程文件**：覆盖根元素、Header、文件类型、版本、命名空间、Private、工程交换流程。
3. **一次系统与设备角色**：覆盖 Substation 层级、一次设备映射、保护/测控/MU/智能终端/网关/网络设备角色。
4. **IED 与数据模型**：覆盖 IED、AP、Server、LD、LN、DO、DA、FC、控制、设置、质量和时标。
5. **通信与过程层**：覆盖 MMS、报告、GOOSE、SV/SMV、网络地址、VLAN、时间同步、发布订阅关系。
6. **类型与标准模型索引**：持续扩充 LN 类、公共数据类、DO/DA、CDC、EnumType 和 Edition 差异索引。
7. **工程实践**：加入引用链追踪、常见校验项、排障流程、实例统计和私有扩展边界。
8. **验证与发布**：离线链接、搜索、UTF-8、数据加载、跨章节链接和移动端可读性检查。

每一步均应交付可用的离线页面；后续阶段增加内容，不破坏已交付入口。

## 已完成基线（2026-07-17）

上述 8 个基础阶段与后续 7 项扩充均已实施。当前百科主入口为 `outputs/index.html`，已包含工程文件、一次系统与设备角色、IED 数据模型、通信与过程层、标准模型索引、工程实践与排障等专题，以及本地术语索引。

本轮新增专题如下：

- `chapters/scd-in-ten-minutes.html`：从原创、脱敏片段顺读 `SCL → IED → LD → LN → DataSet → GOOSE`。
- `chapters/core-concept-comparisons.html`：一次设备/LN、IED/MU/智能终端、DO/DA/FC、GOOSE/SV/Report、ICD/CID/SCD 与值语义对照。
- `chapters/annotated-xml-examples.html`：IED/LN、DataSet/FCDA、GOOSE、MU→保护 SV、ReportControl、`ctlModel` 的注释式原创片段。
- `chapters/ln-cdc-deep-index.html`：保护、测量/计量、开关控制与自动化的高频 LN/CDC 工程导读；不宣称穷尽全部标准 LN。
- `chapters/symptom-troubleshooting.html`：GOOSE、SV、报告、遥控、SCD 导入、枚举值问题的可检索排障路径。
- `chapters/safety-and-test-boundaries.html`：测试、质量、闭锁、权限、网络隔离与现场验收边界，明确 SCD 正确不等于现场功能正确。
- `chapters/scd-reading-toolbox.html`：陌生节点五问、引用追踪、值语义判别与可复用阅读记录卡。

本轮结束时已通过本地链接、专题内容/结构与术语 `related` 引用校验；术语索引含 113 个词条，输出目录含 15 个 HTML 页面。

新工作应在此基线上增量进行，不重建或删除现有离线入口。每次扩充后须保持术语 `related` 引用、首页专题入口和所有相对链接有效。

## 已完成扩充路线（2026-07-17）

下列 7 项均已完成，并已更新首页入口、全局术语索引和离线使用说明。

1. [x] **十分钟读懂 SCD**：原创、脱敏小型片段与详细词条链接已交付。
2. [x] **核心概念对照表**：六组易混概念对照已交付。
3. [x] **注释式 XML 示例库**：六类原创最小片段、标准语义、工程配置项和常见错误已交付。
4. [x] **LN/CDC 深度索引**：高频保护、测量/计量、开关控制、自动化 LN 与 CDC 导读已交付。
5. [x] **现象到排障路径库**：六类优先故障症状的可检索路径已交付。
6. [x] **安全与测试边界**：测试、质量、闭锁、权限、网络隔离及验收边界已交付。
7. [x] **SCD 阅读工具箱**：陌生节点五问和可复用阅读流程已交付。

后续新增工作应由用户确认具体优先级；仍须遵循“每次扩充同步首页、术语索引、离线使用说明，并校验相关链接和 `related` 引用”的交付要求。

## 当前新增任务：IEC 61850 报文解析（2026-07-17）

本轮新增任务明确：在现有离线百科基础上，增加面向开发人员的 IEC 61850 报文解析专题，覆盖 MMS、GOOSE、SV/SMV 报文如何组织、字段如何编码、抓包后如何逐层分析。目标读者应能通过文档理解报文中每个字节或字段的含义，并能据此实现解析器、排障工具或 Wireshark 抓包分析流程。

新增内容应保持工程化、可验证、可离线阅读：

- 新增专题页面建议放在 `outputs/chapters/packet-analysis.html`，必要时可拆分为 `mms-packet-analysis.html`、`goose-packet-analysis.html`、`sv-packet-analysis.html` 等子页。
- 首页 `outputs/index.html`、离线说明 `outputs/README.md`、术语索引 `outputs/data/terms.js` 必须同步更新。
- 继续保留中文解释与英文协议字段名、ASN.1 类型名、Wireshark 字段名、EtherType、APPID、TLV、PDU、APDU 等原文。
- 所有示例报文使用原创或脱敏样例；可以使用十六进制字节流、逐字节偏移表、字段树和解析伪代码，但不得逐字复刻受版权保护标准正文。
- 明确区分“链路层字段”“IEC 61850-8-1 MMS/报告相关字段”“IEC 61850-8-1 GOOSE 字段”“IEC 61850-9-2 SV/SMV 字段”“ASN.1/BER 编码规则”“Wireshark 展示字段”和“由 SCL 推导出的工程语义”。
- 对私有扩展、厂商特定数据集、非标准抓包现象只说明识别方法和排查边界，没有资料时不猜测业务含义。

建议执行步骤：

1. **报文总览与抓包入口**：说明 IEC 61850 报文在以太网、VLAN、TCP、MMS、GOOSE、SV 中的位置；给出 Wireshark 过滤表达式、常见端口/EtherType、抓包前检查项。
2. **编码基础**：解释大端字节序、Ethernet/VLAN 头、TLV、ASN.1 BER 长度编码、布尔/整数/位串/八位串/可见字符串/UTC 时间等基础编码。
3. **GOOSE 逐字节解析**：覆盖 Ethernet Header、可选 VLAN Tag、EtherType `0x88B8`、APPID、Length、Reserved、GOOSE PDU、`gocbRef`、`timeAllowedToLive`、`datSet`、`goID`、`t`、`stNum`、`sqNum`、`test`、`confRev`、`ndsCom`、`numDatSetEntries`、`allData`，并结合 SCL 中 `GSEControl`、`DataSet`、`FCDA` 建立字段含义。
4. **SV/SMV 逐字节解析**：覆盖 EtherType `0x88BA`、APPID、Length、Reserved、ASDU 数量、`svID`、`smpCnt`、`confRev`、`smpSynch`、采样值序列、质量位，说明 80 点/周波、256 点/周波等工程配置只作为常见实践，不替代项目规范。
5. **MMS/报告逐层解析**：从 Ethernet/IP/TCP 到 ISO COTP、Session、Presentation、ACSE、MMS PDU，说明 Initiate、Read、Write、GetNameList、InformationReport、Report、控制相关服务的抓包识别路径；重点解释 BER TLV 如何从字节映射到 MMS 字段树。
6. **Wireshark 分析流程**：提供过滤器、Follow TCP Stream、协议首选项、字段复制、十六进制窗格与字段树联动、重组 TCP 分段、导出 PDU、定位 malformed packet 的步骤。
7. **开发实现指导**：给出解析器分层设计、偏移推进、长度校验、BER 长度解析、字段白名单/未知字段保留、SCL 反查、错误处理和测试用例组织方式。
8. **排障矩阵**：补充抓不到包、GOOSE/SV APPID 不匹配、VLAN/优先级错误、`confRev` 不一致、`stNum/sqNum` 异常、SV 丢帧、MMS 报告无数据、TCP 重组失败、时间戳/质量异常等现象到字段的定位路径。
9. **验证**：新增页面后必须校验所有相对链接、术语 `related` 引用、搜索索引命中、UTF-8 显示和离线打开行为。

可选澄清项：若后续需要做到“真实抓包逐字节复盘”，应由用户提供可公开或已脱敏的 `.pcap/.pcapng` 样例；若没有样例，则先使用原创最小报文字节流和 Wireshark 字段树截图式文字说明构建教程。

## 当前暂缓内容

- 不单独建设完整的“工程流程教程”（如新建间隔保护配置端到端教学），除非用户后续明确要求。
- 不单独建设面向非网络背景的网络基础补课章节；现有通信与过程层内容继续维护即可。

## 写作与数据约束

- 每个词条尽可能标明：中文名、英文名/缩写、标准语义、所在层级、关联对象、关键属性、工程注意事项、版本提示和相关词条。
- 明确区分“标准语义”“工程/厂商扩展”“示例观察”。
- 约定值必须说明出现的属性或数据属性；不得混淆 XML 属性枚举、枚举数据类型编码与运行数据值。
- 使用解释、关系图、原创示例和有限摘录，不逐条复述受版权保护标准内容。
- 所有资源本地引用；不得使用外链字体、脚本、图片或在线 API。
