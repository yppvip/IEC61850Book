# IEC 61850 离线抓包解析器

## 当前任务

在现有 `outputs/` 离线百科中实现一个纯前端 IEC 61850 抓包数据解析工具。用户通过页面从本地选择并导入抓包文件与工程文件；程序只在浏览器本地解析，不负责网卡抓包、报文注入、上传或网络通信。

核心结果是：

- 判断帧是否属于 IEC 61850 相关通信；
- 识别 GOOSE、SV/SMV、MMS/Report 等协议或候选流；
- 基于抓包文件中的时间戳，展示每一帧的时间；
- 在导入匹配的 SCD/ICD 后，把 GOOSE/SV 的数据集顺序映射为信号名，并展示信号在何时取得何值；
- 对不完整、未知、私有或无法安全解释的数据保留原始字节和诊断信息，而非猜测业务含义。

## 范围与非目标

### 输入

- `.pcap`、`.pcapng`：外部导入的已有抓包数据；第一阶段优先支持 Ethernet 链路类型。
- `.scd`、`.icd`（可选）：外部导入，用于建立工程语义映射；不得假定抓包文件必然有匹配的 SCL。
- 可选的十六进制报文粘贴输入，可用于最小样例、调试和测试。

### 非目标

- 不实现实时网卡抓包、镜像口控制、报文发送/重放/注入或任何会改变现场状态的操作。
- 不依赖网络、CDN、在线 API 或服务器端解析；双击 `file://` 打开页面时也必须能工作。
- 不将 APPID、MAC、`svID`、`gocbRef` 或厂商名称单独视为业务信号名的充分证据。
- 不承诺兼容全部厂商私有扩展、所有 `pcapng` 链路类型或完整 MMS 协议栈；未知数据须明确标注边界。

## 协议识别与语义边界

| 类型 | 初步识别 | 可直接解析的关键字段 | 信号名来源 |
|---|---|---|---|
| GOOSE | Ethernet EtherType `0x88B8`，允许存在 802.1Q VLAN | MAC、VLAN、APPID、Length、GOOSE APDU、`stNum`、`sqNum`、`allData` | SCD/ICD：`GSEControl → DataSet → FCDA` 的顺序 |
| SV/SMV | Ethernet EtherType `0x88BA`，允许存在 802.1Q VLAN | MAC、VLAN、APPID、ASDU、`svID`、`smpCnt`、`confRev`、`sample` | SCD/ICD：`SampledValueControl → DataSet → FCDA`，以及类型、比例和工程约定 |
| MMS / Report | TCP/102 加 TPKT/COTP/MMS 的结构性校验；仅端口不是充分证据 | 会话、PDU 类别、BER TLV、常用服务或报告候选字段 | MMS 对象引用、报告数据集和导入的 SCD/ICD；需要 TCP 流重组 |

- 展示的“时间”统一使用抓包文件记录的帧时间戳；GOOSE `t` 或数据属性时标仅作为协议内附加字段，不能替代抓包时间。
- `allData` 与 SV `sample` 只包含按数据集排列的值；没有匹配 SCD/ICD 时，应显示“第 N 项/第 N 通道”和原始解码值，不能伪造信号名。
- 值的可读性依赖数据类型、FCDA、质量位、比例、采样格式及项目配置；要区分原始数值、工程换算值、质量和时间。

## 前端实现方法

### 页面与文件组织

- 保留 `outputs/index.html` 作为百科入口；新增或扩展抓包解析工具页面，建议为 `outputs/chapters/packet-parser.html`。
- 解析逻辑置于 `outputs/assets/` 下的本地 JavaScript 文件；样式沿用并增量扩充 `outputs/assets/style.css`。
- 继续保留 `outputs/chapters/packet-analysis.html` 作为协议教程，并从教程链接到实际工具页面。
- 如果首页、README、术语或专题入口因新增页面改变，必须同步更新相对链接与本地说明。

### 分层解析架构

```text
File reader
  ├─ PCAP reader / PCAPNG reader → { frameTimestamp, linkType, frameBytes }
  ├─ Ethernet reader → MAC, optional VLAN tags, EtherType, payload
  ├─ Goose reader → APPID header + BER/TLV GOOSE APDU
  ├─ SV reader → APPID header + BER/TLV SV APDU/ASDU
  ├─ TCP flow reassembler → TPKT/COTP/Session/Presentation/ACSE/MMS candidates
  ├─ BER reader → tag, length, value range, nested structure
  ├─ SCL reader/resolver → Communication, ControlBlock, DataSet, FCDA mapping
  └─ Diagnostics → truncation, bounds, malformed length, unknown tag, mapping conflict
```

- 使用 `File.arrayBuffer()`、`Uint8Array`、`DataView` 与 `DOMParser`，避免依赖 Node.js 或外部库。
- 所有多字节网络整数按大端读取；解析函数须返回偏移、长度和剩余边界，禁止依赖固定报文偏移解析 BER/MMS。
- 每一层必须先校验长度和父容器边界。解析失败时保留帧号、偏移、十六进制片段与错误原因，并继续处理下一帧。
- 大文件处理应分批渲染；必要时使用 `Web Worker` 防止页面失去响应。默认不将完整抓包内容写入持久化存储。

### SCL 映射

- 解析 `Communication/ConnectedAP/GSE|SMV/Address` 的 MAC、APPID、VLAN 等网络线索。
- GOOSE 映射必须同时综合 APPID/地址线索、`gocbRef`、`datSet` 和 `GSEControl@DataSet`，最后按 `FCDA` 顺序映射 `allData`。
- SV 映射必须综合 APPID/地址线索、`svID`、`SampledValueControl@DataSet` 与 `FCDA` 顺序；采样通道语义、比例和质量解释缺少证据时须标为待确认。
- 发现多个候选或 SCD 与报文矛盾时，显示候选与冲突原因，不自动任选其一。

## 交互与输出

- 文件选择区：抓包文件必填、SCD/ICD 可选；清楚提示文件只在本机浏览器内存中解析。
- 概览区：总帧数、时间范围、GOOSE/SV/MMS 候选数、未知帧数、诊断数。
- 帧列表：帧号、抓包时间、协议、源/目的 MAC 或 IP/端口、VLAN、APPID、解析状态。
- 帧详情：协议字段树、字段偏移、十六进制字节、原始/解释后的值及映射证据。
- 信号时间线：信号名（或第 N 项）、抓包时间、值、质量、来源帧号、映射状态；支持按协议、APPID、信号和时间筛选。
- 异常区：APPID/VLAN 不匹配、`confRev` 冲突、GOOSE `stNum/sqNum` 异常、SV `smpCnt` 跳变、长度截断、TCP 重组不足等。

## 执行步骤

1. 检查现有页面、样式与术语入口，创建解析工具入口而不破坏现有百科页面。
2. 实现 PCAP 读取、Ethernet/VLAN 解码和帧时间戳归一化；以原创最小二进制夹具验证。
3. 增加 PCAPNG 基本块解析，明确支持的接口/链路类型与不支持时的错误提示。
4. 实现 GOOSE 和 SV 的 APPID 头、BER TLV、字段树与逐帧详情。
5. 实现 SCD/ICD 导入及 GOOSE/SV 数据集映射，生成“信号—时间—值”列表。
6. 实现 MMS 的 TCP 流重组、TPKT/COTP/BER 基础解析与常见 PDU 识别；完整 MMS 服务覆盖按可验证样例逐步扩展。
7. 补充筛选、异常诊断、性能处理、可读错误提示和离线使用说明。
8. 校验所有链接、UTF-8、`file://` 离线打开、SCL 缺失/不匹配、截断帧和未知字段等情形。

## 验收标准

- 不联网即可打开工具、导入文件、得到结果；没有服务器端依赖。
- 对导入的 Ethernet PCAP/PCAPNG，能保留并展示每帧抓包时间戳。
- 能可靠识别并解析有效的 GOOSE、SV 最小样例；VLAN 存在与否均不会导致偏移错误。
- 导入匹配 SCD/ICD 后，至少能将示例 GOOSE/SV 的数据集值按 FCDA 顺序关联到信号；没有 SCL 时准确降级显示为序号值。
- 任意非法长度、截断、未知 TLV、映射冲突或不支持格式不会导致整个页面崩溃。
- 现有百科入口、术语索引、相对链接和 `outputs/README.md` 的离线说明保持有效。

## 内容与安全约束

- 中文解释保留 XML 标签、协议字段名、ASN.1 类型、Wireshark 字段名、EtherType、APPID、TLV、PDU 等英文原文。
- 示例抓包与十六进制字节流须为原创或已脱敏样例；不逐字复刻受版权保护标准正文。
- 私有命名空间、`Private`、厂商特定数据集与未知字段只记录证据、上下文和解析边界；没有资料不得推断业务含义。
- 工具用于离线分析已有数据，不应被描述为现场保护、控制或网络验收的替代品。
