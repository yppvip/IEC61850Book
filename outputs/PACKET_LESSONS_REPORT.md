# 报文解析模块开发报告

日期：2026-10-19。入口：[首页](index.html) → 顶部“报文解析”，或直接打开[模块总览](chapters/packet-analysis.html)。

## 前置问题的最终结论

1. 可以把 MMS、GOOSE、SV 作为常见变电站工程的三类核心业务通信主线。MMS承担客户端/服务器访问、报告与控制等服务映射；传统GOOSE承担二层事件状态发布；传统SV承担连续瞬时采样发布。IEC 61850还包括模型、服务、SCL、同步、其他映射及工程一致性内容，不能等同于三类报文。初学者还应掌握Ethernet/VLAN、ARP、TCP重组、关联/表示上下文、BER、时间品质和冗余等基础。
2. 原教程已提供模型、对象引用、CDC/FC、DataSet、控制块、SCL实例/类型追踪、ACSI和服务映射，可以进入报文学习；原有字节案例不足以独立还原工程信号。新模块补充完整数据帧、偏移/长度/类型、请求响应配对、DataSet顺序、SV布局、状态变化和反向映射练习。前置页及缺口矩阵见[总览](chapters/packet-analysis.html#prerequisites)。理解固定案例并不证明已能独立完成现场分析。

## 结构与文件清单

采用现有HTML/CSS/普通JS结构，复用共享导航、左树、面包屑、右目录、搜索及窄屏菜单。原 `packet-analysis.html` 原地升级、保留全部原文件名入口；从“通信协议”移入新一级栏目“报文解析”，不重复挂树。不新增框架、在线依赖或部署方式。

新增17个文件：

| 类别 | 文件 |
| --- | --- |
| 六个新页面 | `chapters/packet-mms.html`、`packet-goose.html`、`packet-sv.html`、`packet-scd-mapping.html`、`packet-cases.html`、`packet-capacity.html` |
| 专题资源 | `assets/packet-lessons.css`、`assets/packet-lessons.js` |
| 数据与模型 | `data/packet-examples.js`、`packet-terms.js`、`packet-demo.scd`、`packet-demo-two-asdu.scd` |
| 构建与验证 | `../scripts/build_packet_lessons.py`、`packet_examples.py`、`check_packet_lessons.py`、`preview_packet_lessons.cjs` |
| 开发报告 | `PACKET_LESSONS_REPORT.md` |

修改14个文件：

- `index.html`：直接入口、术语脚本加载、原协议阅读文字更新。
- `assets/navigation.js`、`assets/home.js`：新栏目、七页知识树、学习顺序及首页目录。
- `chapters/packet-analysis.html`：总览、前置知识、分析方法、编码入门及学习入口；移除旧不一致SV/BER示例与解析器实现段落。
- `chapters/communication-process.html`、`service-mapping.html`、`control-blocks-reference.html`、`object-reference.html`、`scd-reading-toolbox.html`、`abbreviation-index.html`、`learning-path.html`：关联阅读入口。
- `README.md`、`data/README.md`：运行边界、数据格式、构建顺序和维护方法。
- `../scripts/check_offline.py`：把新页面、术语及JS语法加入全库检查。

## 教学覆盖与完整案例

| 主线 | 已覆盖 | 完整字节案例 |
| --- | --- | --- |
| MMS | 用途、模型到domain/item映射、TCP/ISO栈、ASN.1/BER、Service概念、Initiate、Confirmed Request/Response、Read、Write、Report、Control、GetNameList、invokeID、VariableAccessSpecification、AccessResult及ACSI关系 | XCBR1.Pos.stVal [ST]/Dbpos → Read Request → 同关联invokeID=1的Read Response → 合位值 |
| GOOSE | Ethernet/APPID/Length/Reserved/APDU、DataSet/GoCB、全部主要字段、状态变化与重传、SCL GSEControl/GSE/ConnectedAP对应 | 分位稳定帧、合位新事件首帧、合位相同状态重传 |
| SV | Ethernet/APPID/APDU/ASDU、svID/smpCnt/confRev/smpSynch、seqData、INT32补码、品质容器/位编号、八通道值/q、多个ASDU、SampledValueControl/SMV/ConnectedAP对应 | IA/IB/IC/IN/UA/UB/UC/UN，单ASDU与双ASDU变体 |
| SCD双向映射 | 实例/类型→FCDA→DataSet→Control Block→Communication；由APPID/引用/流标识组合反查；MMS单变量Read分支；报告与GOOSE分支 | 原创部分SCL模型有2个DataSet、18个标量FCDA；GOOSE、SV与MMS映射共用Demo实例 |
| 信号数量 | 理论、协议、网络和设备约束；成员/叶子/业务通道/ASDU数量区别；MTU、BER和PDU协商；可复算预算 | 100个Dbpos标量的条件GOOSE客户数据501字节；单SV帧119字节、双ASDU211字节（均不含FCS） |

固定数据帧大小：MMS请求120字节、响应87字节；GOOSE分位120字节、合位首帧/重传各119字节；SV单ASDU119字节、双ASDU211字节。GOOSE少1字节来自本例允许等待时间1000→20/40的BER整数长度变化，因此后续偏移也会变化。

“完整帧”指目的MAC到APDU末尾，未包含前导码/SFD/FCS。MMS假定关联已经建立，包含完整请求/响应的全部封装及校验和，但不是含完整握手的抓包文件。所有数值、IP、MAC与名称为原创；没有读取或修改真实工程SCD。

## 交互功能

- 分层筛选Ethernet、Header/Transport、APDU和Data，选择字段显示类型、偏移、头长度、值、解释、SCD指向和Wireshark字段提示。
- 字段→Hex范围高亮，自动滚动到对应字节；Hex→最小包含字段反查。
- GOOSE选择分位/合位首帧/重传，同时显示allData、stNum、sqNum、t及相关长度变化；橙色标记绝对偏移字节差异，文字列出同名字段值变化。
- SV切换1/2个ASDU，展开每通道值/q；nofASDU=2使用单独SCD变体。
- SCD六步映射切换和综合练习答案展开。
- 无脚本时仍可读正文、初始完整Hex、全部初始字段表和映射说明；没有提供用户报文输入/解析或网络通信。

## 技术准确性核对

逐项区分模型、服务、映射、运行时状态和工程证据。主要修正/边界如下：

- XCBR.Pos.stVal为Dbpos，示例1/off→2/on；不是BOOLEAN FALSE→TRUE。位串Value的首字节是未用位数，不能当业务值。
- GOOSE顶层t与成员Pos.t/Pos.q分别解释；重传不产生新的事件时间，confRev不随每次值变化增加。
- GSEControl@appID字符串对应发布标识，与网络Address/APPID数值区分；APPID/IED名/MAC不能独立确定业务。
- MMS单变量Read不要求DataSet或RCB；报告另按InformationReport、OptFlds、inclusion和触发处理；Control是ACSI语义的读写映射，状态反馈不能作为普通Write控制接口。
- SV样本序列不是任意自描述TLV；本例16个FCDA是八个值/q通道，聚合ASDU不增加新通道。比例和相别是明示教学契约，不从标识猜测。
- 本地8-1可提取资料核对服务/质量映射与GOOSE参数；本地9-2扫描资料为DL/T 860.92—2006，本次视觉复核PDF16～17页表13/14。早期smpSynch为BOOLEAN，新公开解码定义为同步范围枚举；本例明确按较新枚举解释。早期test标签与新解码器simulation命名、q.test和扩展头S位分别说明。
- 公开Wireshark ASN.1、显示字段参考和ITU-T X.690作为交叉核对来源，页面提供可选来源链接；未把解码器当成标准原文。主要来源：[IEC目录](https://webstore.iec.ch/en/publication/6028)、[X.690](https://www.itu.int/rec/T-REC-X.690-202102-I/en)、[Wireshark MMS ASN.1](https://raw.githubusercontent.com/wireshark/wireshark/master/epan/dissectors/asn1/mms/mms.asn)、[SV参考](https://www.wireshark.org/docs/dfref/s/sv.html)。

## 验证结果

- `python scripts/check_packet_lessons.py`：7帧逐层长度、BER父子边界、GOOSE成员/计数、SV通道值/品质与ASDU数、MMS变量名/服务嵌套/结果、IPv4/TCP校验和、响应ACK、18个FCDA类型/FC及网络绑定均通过。截断/非法长度负例被拒绝。4段页面XML及两份SCL变体可读取；这不等于完整XSD验证。
- `python scripts/check_offline.py`：79个HTML页面、1436条术语、资源/本地链接/锚点/重复ID/术语目标及脚本语法检查通过。
- `node scripts/preview_packet_lessons.cjs`：Edge断网直接访问file://，七页×1440/960/390px共21次布局检查；确认新栏目、知识树、目录、搜索/深链接、字段高亮与反向定位、GOOSE差异、SV两ASDU、映射步骤、答案、移动菜单及无JS阅读。未发现整页横向溢出、脚本异常或远程请求。已视觉复核桌面/手机截图。
- 页面不加载CDN、在线字体、API、服务器或远程核心资源。来源网址只作主动点击的追溯链接。
- 构建可重复恢复导航/首页/关联入口；本次重复构建后的发布文件内容一致。已有历史抓包工具不进入正式导航，未启用或纳入功能验证。
- 运行既有 `preview_protection_guides.cjs` 回归：九统一/常用LD与DataSet的三种宽度布局、旧术语搜索、菜单及8个关联入口通过，无远程请求和错误。`git diff --check`通过。

原始检查报告、截图在 `../tmp/packet-teaching/browser/`，作为开发证据而非发布依赖。

## 尚未覆盖与不确定性

- 没有完整字节级展示MMS Initiate、Write、GetNameList、InformationReport和各类Control交互；已覆盖其职责/结构/配置关系与分析入口，后续可扩展固定原创样例。
- 没有实际抓包、Wireshark/tshark引擎解码验证、完整TCP建链/关联状态机、完整SCL XSD验证或设备联调。当前核对不能替代适用标准条文、设备文档或现场验收。
- 不覆盖所有SCL/61850版次、厂家私有字段、数组/整个FCD的全套字节案例、IEC 61869-9完整配置文件、R-GOOSE/R-SV、8-2或IEC62351安全扩展。
- SV比例、通道顺序、同步/回绕、网络预算及设备上限需要实际项目资料；本例SCD未完整保存比例/授时/接收方证据。没有给出缺乏依据的通用合理数量或最大值。
- 没有接收方Inputs/ExtRef及内部逻辑，所以本例只建立声明的发布链，不能说明实际订阅、保护出口或开关动作。

后续建议：优先为MMS报告的inclusion/ReasonForInclusion与控制选择/操作/结果增加同结构固定案例；再按已明确授权、脱敏且版次清楚的样本增加VLAN、品质异常和长度边界练习。保留每个例子的完整配置契约与可独立核验的字节证据。
