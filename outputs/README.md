# IEC 61850 离线知识库

直接用任意现代浏览器打开 [index.html](index.html)，无需启动服务或联网。

## 导航结构

- 顶部一级导航：标准文库、技术知识、数据模型、SCL 配置、通信协议、工程应用、术语索引。
- 左侧知识树：按主题展开二、三级专题，帮助从上位概念进入具体对象。
- 面包屑：说明当前专题在知识体系中的位置。
- 右侧页内目录：跳转当前页面的章节。

## 内容阅读路径

面向有编程经验、无电气基础的读者，首页现按 8 阶段排序：电气量与三相电 → 一次接线与设备 → 测量与保护 → 自动化架构 → 信息模型 → SCL 引用 → 通信与应用语义 → 综合练习与工程查证。完整清单及每一步的完成标志见[零基础学习路线](chapters/learning-path.html)。

标准文库和 LN / CDC 全表作为进阶查阅材料，知识树按“基础 → 专题 → 字典 / 参考工程”分组。七个一级栏目保留；“SCL 与工程交换文件”归入 SCL 配置，缩写表归入术语索引。首页与章节共享 `assets/navigation.js` 中的栏目数据；学习主线页面有上一步、继续阅读和返回路线入口。

## 开发人员电气入门补充（2026-10-14）

新增 7 页，正文、原创图表、自检题与答案均静态写入 HTML，无网络依赖：

- [学习路线](chapters/learning-path.html)：前置知识、8 阶段路径、已有知识缺口、标准回查与后续进阶方向。
- [电气基础](chapters/electrical-fundamentals.html)：回路、阻抗、额定/实测/定值、RMS/相量、三相、线/相量、功率、电能与故障类型。
- [一次接线](chapters/primary-diagrams.html)：单线图、断路器/隔离/接地开关、CT/VT、母线、拓扑、二次回路与站用直流。
- [测量链](chapters/measurement-chain.html)：变比、极性、负载与饱和、采样与窗口、品质、时标、单位、SOE 和同步。
- [保护与控制](chapters/protection-control-fundamentals.html)：保护区、选择性、过流/差动/距离原理、起动/动作/出口、执行与反馈、失灵及控制条件。
- [开发数据契约](chapters/developer-data-contracts.html)：软件概念类比的边界、完整测点语境、新鲜度、重传/补传、控制结果未知、验证层级、权限与变更。
- [馈线综合练习](chapters/feeder-learning-case.html)：原创算例、模型/服务候选、证据记录和分层排障，附可展开的参考答案。

新增 21 个可检索的基础词条，术语总数为 1403；所有新词条直接链接到章节锚点。新页引用 IEC 官方技术原理、Schneider Electric 功率/CT 说明及 SEL 保护/数字二次系统资料作原理核对，各页标明来源和范围。公式附适用条件；数值、名称和应用记录为原创教学示例，未读取或修改源 SCD，也不声称完成保护整定或现场验收。

图表修复：消除 SVG 文字继承形状描边导致的发虚/重影；重绘概论中的 Bay/LNode 分层图与 IF1～IF10 接口图，明确一次设备和 LN 的区别，修正接口端点与用途。正文图保留横向滚动，可通过“放大图表”进入可缩放的大图弹窗，支持 Esc 关闭与焦点返回。长对象路径允许换行，修复旧协议页的窄屏溢出。

维护命令（项目根目录）：

```text
python scripts/build_learning_home.py
python scripts/integrate_learning.py
python scripts/redraw_intro_figures.py
python scripts/check_offline.py
```

第一条同时重建 7 个学习页、术语增补、页面清单与首页；`build_learning.py` 为内容源。整合脚本幂等更新导航排序与旧页前置入口。共享图表样式和弹窗在 `assets/style.css` / `assets/navigation.js` 中维护。重建旧标准章节后可重新运行整合与重绘命令恢复入门关联和图表修正。浏览器验证脚本为 `scripts/preview_learning.cjs`，使用 bundled Playwright / 本机 Edge，报告和截图位于 `tmp/learning-preview`，不作为发布依赖。

验证记录：69 个 HTML 页的本地链接、锚点、资源依赖，新增页 SVG 结构和全部术语链接均通过静态检查。Edge 在离线模式下直接打开 `file://`，对首页与 67 个正式章节进行 1440 / 960 / 390 px 共 204 次布局检查，无整页横向溢出、SVG 文字描边/越界、脚本异常或远程请求；检查搜索与深链接、学习前后页、答案展开、手机导航、图表缩放、Esc 关闭及焦点恢复，并视觉复核首页、新章节和接口图。静态检查包含旧 `packet-parser.html` 的本地链接，但该历史文件不进入正式导航和浏览器功能验收；没有启用或测试抓包解析功能。本次验证不涉及源 SCD 的完整 XSD 或设备/现场功能。

## 已发布内容

- 标准文库：概论（体系、Bay、ACSI、IF1～IF10 与建模方法）、第 2 部分术语导读、第 7-1～7-4 部分、第 6 部分 SCL 与 IED 通信配置描述、标准模型索引。
- 技术知识：零基础学习路线、电气基础、一次接线、测量链、保护与控制，以及间隔、自动化层级、IED 角色、概念对照和安全边界。
- 数据模型：IED 与数据模型、LN / CDC 深度索引，以及第 7-3 部分的公用属性类型、五组 CDC、完整属性字典和单位/FC 查表页。
- SCL 配置：SCL 与工程交换文件、SCD 十分钟导览、阅读工具箱、注释式 XML 示例、数据集与控制块、参考工程证据。
- 通信协议：通信与过程层、协议字段阅读（仅提供静态知识材料）。
- 工程应用：开发数据契约、馈线综合练习、工程模型阅读、工程实践与排障、时间与服务核查。
- 术语索引：缩写、全拼、中文名与功能，第 7-4 部分缩写查表，以及首页全局术语检索。

## 离线与内容边界

- 所有页面、样式、脚本和术语数据均使用本地相对路径；没有 CDN、在线字体或在线 API。
- 本项目不提供抓包导入、报文解析、实时网卡操作、上传、发送、重放或注入功能。
- 教学片段为原创且脱敏的结构示例，不是完整可投产配置；内容不替代项目规范、设备手册、标准原文、工程校验或现场试验。
- `scl-scd-help.html` 保留为早期单页帮助文档兼容页，不纳入正式页面的统一样式维护；百科主入口为 `index.html`。
- 抓包解析工具不纳入知识库入口和产品范围；正式导航仅保留静态的协议字段阅读页面。

## 第 7-1 部分补充（2026-09-30）

新增 9 页，按主章与关联栏目组织：首页和知识树均可进入，术语检索支持跳转专题。

- 标准文库：[第 7-1 部分：原理与模型](chapters/standard-part-7-1.html)。
- 数据模型：[数据、数据属性与 CDC 取值参考](chapters/data-attributes-reference.html)。
- 技术知识：[三层两网、设备角色与英文缩写](chapters/three-level-two-network.html)。
- 通信协议：[ACSI 服务分类与功能全表](chapters/acsi-services.html)。
- SCL 配置：[数据集、属性集与控制块参考](chapters/control-blocks-reference.html)。
- 数据模型：[公共 LN 信息、控制模型与输入模型](chapters/control-input-models.html)。
- 通信协议：[特定通信服务映射与报文格式](chapters/service-mapping.html)。
- SCL 配置：[参考 SCD：脱敏证据与类型追踪](chapters/scd-model-evidence.html)。
- 工程应用：[工程阅读：从功能到配置的证据检查](chapters/engineering-model-reading.html)。

覆盖正文 1～15 章与现有附录 A～C 的原理主线，并补充 29 种早期 CDC、18 个 FC 表项（含 XX 通配语义）、20 个存在条件代码、5 类触发条件、控制与输入、ACSI 服务、日志及采样发布属性、映射、单位和工程阅读。参考 SCD 的 87 个 DA 名称及全部 BDA 名称按实际类型组合列出。图表为原创；工程例子重新命名和脱敏。

来源：`E:/IEC61850标准[中文.完整版]` 下第 7-1、7-2、7-3、7-4、6、8-1、9-2 部分，以及 `../source/南雷变2026041614.scd`。本地 7-1 是 IEC 2003 对应送审稿，文件实际止于附录 C；目录列出的 D/E/F/H 未提供，不声称完成缺失正文。关联模式字段核对 SCL 2007 B4 代码组件，详见页内来源链接。

完整性边界：“全部”分别限定为明示早期标准基线、B4 模式字段或参考工程观测集合，不混为跨版次全集。观察到 ENS/ENC/STG、BCR 数值类型、SmvOpts.dataRef、单位枚举等差异，保留说明，不自动修改源文件。完成 XML 结构读取和统计，不声称源 SCD 通过完整 XSD 或现场功能校验。外部链接仅作来源追溯，离线阅读不依赖它们。

参考 SCD 的 115 个枚举模板还按完整编码/标签序列归并为 27 组，保留所有编码与 DA/BDA 使用点；可点击展开，类型模板 ID 已脱敏，以同类元素在文件中的顺序定位。

验证记录：2026-09-30 检查 31 个正式 HTML 页的本地链接、锚点、重复 ID 和资源依赖；9 个新页含 70 张表、11 幅 SVG，6 个 XML 教学片段通过语法解析。使用 Edge 在 `file://` 下检查新页目录/导航、术语搜索与跳转，以及 390 px 窄屏菜单和页面横向溢出；索引共 396 个词条。验证不包含源 SCD 的完整模式校验、设备连接或现场试验。

## 第 7-2 部分补充（2026-10-03）

新增 7 页，共 65 张表、15 幅原创 SVG 和 11 个 XML 结构示例。首页、知识树、相关旧专题和术语检索均已接入。

- 标准文库：[第 7-2 部分：抽象通信服务接口 ACSI](chapters/standard-part-7-2.html)，包含模型层级、类总表、缩略语及原文章节覆盖清单。
- 技术知识：[抽象接口与两层抽象](chapters/acsi-abstraction.html)。
- 数据模型：[基本类型与公共 ACSI 类型](chapters/acsi-common-types.html)、[数据、数据集与运行模型](chapters/acsi-runtime-models.html)。
- 通信协议：[服务器、应用关联与访问视窗](chapters/acsi-server-associations.html)。
- SCL 配置：[参考 SCD 的 ACSI 证据](chapters/scd-acsi-evidence.html)。
- 工程应用：[时间、文件与服务一致性核查](chapters/acsi-engineering-workflows.html)。

按所给标准引言、1～20 章和规范性附录 A 总结对象类、公共类型、属性、值域、服务、流程与使用场景；附录 A 的 60 个服务编号单独列出。补齐数据集、取代、定值、报告、日志、GOOSE/GSSE、采样、控制、时间同步和文件知识。21 项指定缩略语及补充术语进入索引，现有 396 个词条经修订和追加后为 418 个。

来源与版次：`D:/IEC61850/IEC61850标准[中文.完整版]/860[1].7-2.pdf` 为 123 页扫描文件，封面标明 DL/T 860.72—2004 / IEC 61850-7-2:2003。本次以该版作为属性与服务清单基线；参考工程文件仍为 `../source/南雷变2026041614.scd`，其根版本为 SCL 2007 B4。扫描识别结果经关键表格核对，不把 OCR 文本直接作为规范原文发布。

按本次用户要求，SCD 摘录保留真实对象名称与技术关键字；新增摘录与既有脱敏教学示例分别标明。统计和实例定位保存在 [part72-evidence.json](data/part72-evidence.json)，包含源文件 SHA-256；从实际元素读取报告、日志、定值、GOOSE、SV 和类型链，不根据 IED 名或通信地址推断业务。源 SCD 未修改。

维护入口：从项目根目录执行 `python scripts/build_part72.py` 可重建新增 7 页、工程证据及术语增补文件；首页、导航、旧专题接入与 README 单独维护。`python scripts/check_offline.py` 检查正式 HTML 的本地文件/锚点、重复 ID、外部资源依赖，新增 SVG/XML 的语法结构、术语链接及 21 项缩略语；JavaScript 语法检查需要脚本内指定的本地 Node 路径。

验证记录：2026-10-03 上述静态检查通过，共 38 个正式 HTML 页。自动化浏览器的安全策略拒绝打开 `file://`，因此本轮没有浏览器显示、窄屏交互或真实离线打开验证。XML 片段通过语法解析，不表示参考 SCD 通过完整 XSD、设备功能或现场试验。内容是原创知识总结，不替代标准全文；各类“全部”限定于明示版本与观测集合。

## 第 7-3 部分补充（2026-10-13）

新增 10 页，136 张表、10 幅原创 SVG，以及 110 个可解析 XML 摘录。主入口、知识树、章节关联、缩略语页与首页搜索已同步。

- 标准文库：[第 7-3 部分：公用数据类 CDC](chapters/standard-part-7-3.html)。说明标准分工、类型层级、命名空间、20 个存在条件代码与覆盖清单。
- 数据模型：[公用数据属性类型](chapters/cdc-common-types.html)。覆盖 Quality 全部字段及有效性关系、模拟值/换算、范围、步位置、脉冲、原发者、单位、Vector/Point、五种控制模式与两种 SBO 类别。
- 数据模型：[状态信息](chapters/cdc-status.html)、[测量信息](chapters/cdc-measurement.html)、[可控信息](chapters/cdc-control.html)、[定值信息](chapters/cdc-setting.html)、[描述信息](chapters/cdc-description.html)。覆盖所给版次 29 种 CDC 的属性类型、FC、触发、值域、存在条件、模板继承服务与使用边界；另有死区、冻结、谱窗口、定值组和曲线示例。
- 数据模型：[表 49 完整属性字典](chapters/cdc-attribute-dictionary.html)。116 个不同属性名各有稳定锚点，同名多语境分别解释，并提供 CDC/类型/FC 反向链接及品质、时间、单位和取代作用对象表。
- 数据模型：[附录 A/B](chapters/cdc-units-fc.html)。A 的 58 个单位表行和 20 个倍率前缀，B 的 18 个 FC 表项（含 XX 服务通配）。需求中附录 B 描述重复写成 A，按两份实际附录分别总结。
- SCL 配置：[参考 SCD 的 CDC 证据](chapters/cdc-scd-evidence.html)。保留指定工程的真实名称，列源行、DO/SDO 引用、DA/DAType/EnumType 链与原始片段。735 个 DOType 包含 25 种 CDC 字符串，其中 22 种属于该早期版，另外有 ENS/ENC/STG；缺失的 7 类明确列出，不借其他类同名字段充当证据。

来源：`D:/IEC61850资料/IEC61850标准[中文.完整版]/860[1].7-3.pdf`，共 57 页，封面为 DL/T 860.73—2004 / IEC 61850-7-3:2003。PDF 页从 1 起，印刷正文页=PDF 页−4。扫描内容经关键表格视觉核对，发布内容是原创解读与结构化总结。原版 APC 与 TISSUE 28 修订、CMV.subCVal 类型、控制类 subVal FC、LPL 命名空间条件、CSD 表格空格/误字、谱公式和大小写差异均分别说明；不静默改写为新版规范。附录表序号不是单位全局枚举编码，参考工程的枚举 ord/文本另沿 EnumType 查询。

参考 SCD 未修改；[part73-evidence.json](data/part73-evidence.json) 保存 SHA-256、根版本、完整 CDC 统计、逐类模板位置与引用实例。工程配置声明不证明设备运行值、服务支持或现场功能。旧章节中的泛化命名空间 FC 与条件代码解释同步修订；既有术语 ID 保留并更新，新旧重复入口合并后全库为 485 个词条，M/O/C、FC、控制枚举、属性名均可搜索。

维护：`python scripts/build_part73.py` 重建 10 页、工程证据与术语增补；`python scripts/integrate_part73.py` 幂等接入导航、首页、旧章节和缩略语页。`scripts/part73_data.py` 保存经核对的 CDC/属性字典。README 单独维护。`python scripts/check_offline.py` 检查正式 HTML 的链接/锚点/重复 ID、资源依赖、SVG/XML 语法、JavaScript 语法、术语链接与覆盖计数；Node 路径按当前用户的 bundled runtime 解析。

验证记录：2026-10-13，全库 48 个正式 HTML 页静态检查通过；新增页的 29 CDC、116 属性、58 单位、20 前缀、18 FC 覆盖检查通过。使用本机 Edge 的 Playwright 在离线模式下直接读取 `file://`，检查全部新增页的 1440 px / 390 px 布局、面包屑与目录、窄屏导航及 7 项术语搜索/属性锚点跳转；20 次页面检查没有脚本错误、整页横向溢出或远程资源请求，并视觉检查桌面/窄屏截图。复现脚本为 `scripts/preview_part73.cjs`，使用 bundled Playwright 与已安装的 Edge；输出暂存在项目 `tmp/part73`，不作为发布资源。XML 语法检查不代表完整 XSD 或设备校验。

## 第 7-4 部分补充（2026-10-14）

新增 14 页、293 张表、19 幅原创 SVG、180 个可解析 XML 片段。标准文库首页、知识树、旧专题、共用缩略语页和术语搜索已接入。

- 标准文库：[第 7-4 部分：兼容逻辑节点类和数据类](chapters/standard-part-7-4.html)、[第 4 章缩写全表](chapters/ln-abbreviations.html)。
- 数据模型：[公用信息与继承](chapters/ln-system.html)、[保护 P 组](chapters/ln-protection.html)、[保护相关 R 组](chapters/ln-protection-related.html)。
- 数据模型：[控制、通用功能与接口 C/G/I 组](chapters/ln-control-generic.html)、[自动控制 A 组](chapters/ln-automatic.html)、[测量与计量 M 组](chapters/ln-measurement.html)。
- 数据模型：[开关、互感器与变压器 X/T/Y 组](chapters/ln-switch-transformer.html)、[监视与其他电力设备 S/Z 组](chapters/ln-monitoring-equipment.html)。
- 数据模型：[第 6 章数据名称字典](chapters/ln-data-dictionary.html)、[取值、模式组合与量纲](chapters/ln-values-reference.html)、[附录 A/B/C：扩展与建模](chapters/ln-extension-modeling.html)。
- SCL 配置：[参考 SCD：实例、类型链与工程枚举](chapters/ln-scd-evidence.html)。

覆盖本版 13 个 LN 组的 91 个具体类，公用信息模板另列，不能当作 `lnClass=COMMON`。节点表整理 909 行（含两行 COMTRADE 格式访问说明，后者不是 DO），公共必备继承集中表达；区分公用信息、状态、定值、测量、控制、计量及 M/O/C/T。表 3 的 40 项历史保护功能对照和表 4～8 的功能拆分均有摘要。第 6 章表 9 的 519 个数据名称有稳定锚点、语义、节点反向引用、取值/CDC 关联；第 4 章的 273 个缩写入口包含 Tm 下四种时间后缀。另列 26 组明示编码表、五种 Mod 行为、25 种 Mod/Beh 组合、布尔真值关系及单位/数值边界。附录 A.1～A.8、B.1～B.8 和 C 均有解读，功能链、相量与阻抗图为原创。

来源：`E:/IEC61850标准[中文.完整版]/860[1].7-4.pdf`，113 页扫描件，封面 DL/T 860.74—2006 / IEC 61850-7-4:2003。本地识别后按列检查技术名称、CDC、存在标记、重要取值及图表；不直接发布 OCR 原始文本。英文功能名为助读译释，缩写表中明显的英文拼写识别/印刷问题用通行拼写说明，不声称所有 LN 类代码都有逐字符英文全拼。

**扫描完整性边界：PDF 第 72 页重复了印刷第 58 页，印刷第 68 页缺失。ZBAT 的专用表和 ZBSH 的首表不能核对，不声称完整覆盖；ZBSH 续表仍在 PDF 73。** 两类均保留入口、可核对的续表及第 6 章相关定义，不据字典猜补 CDC、M/O 或 T。通常印刷正文页=PDF 页−4，该重复页例外。原表 ISI/INS、PhyName/PhyNam、ChTrg/Chtrg、MmeRs/MemRs、SvcVoil/SvcViol、Pump*/Pmp*、GnSpd/GnSp、Even/Evn、NormA/NomA，以及窗口公式/时间单位和 PresTr 解释差异，均分别说明，不静默替换成新版。

参考工程仍为 `../source/南雷变2026041614.scd`，按本次授权保留真实对象、类型 ID、desc 和源行。读取 82 个 IED、7229 个 LN/LN0 实例、32 个 `lnClass` 字符串；987 个 LNodeType、735 个 DOType、107 个 DAType、115 个 EnumType。观察到本版 26 类，其余 65 类未出现；PDIS、MMTR 不借其他节点充当工程证据。6 个超出本版的工程类仅列实际声明。每个实际类选择实例和完整 LNodeType，代表性 DO 沿 SDO/DAType/EnumType 追踪；115 个工程枚举按全部编码/标签序列归并为 27 组，保留全部编码与 DA/BDA 使用点。统计、源文件 SHA-256 和摘录保存于 [part74-evidence.json](data/part74-evidence.json)，源 SCD 未修改。声明不证明实际业务绑定、设备运行值、XSD 完整符合或现场功能。

维护：`python scripts/build_part74.py` 从已核对的 `scripts/part74_data.json` 与源 SCD 重建 14 页、术语和工程证据；`python scripts/integrate_part74.py` 幂等接入导航、首页、旧专题及共用缩写页。目录、字段、名称、取值、历史对照和复核简述分别由 `part74_catalog.py`、`part74_fields.py`、`part74_dictionary_names.py`、`part74_values.py`、`part74_mappings.py`、`part74_summaries.py` 维护。扫描识别辅助脚本保留供核对，正常网页重建不运行 OCR；识别结果与训练模型在 `tmp/part74-ocr`，不作为发布资源。README 单独维护。

验证记录：2026-10-14，`scripts/check_offline.py` 检查全库 62 个正式 HTML 页的本地资源、链接、锚点、重复 ID、SVG/XML 和 JavaScript，并检查 91 类、519 个名称、273 个缩写入口；均通过。全库术语共 1382 项，原稳定 ID 保留。`scripts/preview_part74.cjs` 使用 bundled Playwright / 本机 Edge，在离线模式下直接打开 `file://`，检查全部新页的 1440 px / 390 px 布局，共 28 次页面检查；没有脚本错误、整页横向溢出、SVG 文字越界或远程资源请求。字典/缩写筛选、窄屏导航、XML 展开及 9 项术语搜索/字典跳转均通过，并视觉检查桌面/窄屏与关键图表。浏览器检查记录位于项目临时目录 `tmp/part74-preview`，不作为网页依赖。
