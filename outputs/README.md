# IEC 61850 / SCL 离线百科

直接用任意现代浏览器打开 `index.html`，无需启动服务或联网。

## 已发布专题

- `chapters/packet-parser.html`：离线导入 `.pcap` / `.pcapng` 和可选 `.scd` / `.icd` 的抓包解析工具。只解析已有数据，时间使用抓包帧时间戳；不抓包、不上传、不发送或重放报文。
- `chapters/packet-analysis.html`：面向开发人员的 IEC 61850 报文解析，用原创最小字节流说明 MMS、GOOSE、SV/SMV 的报文组织、字段含义、Wireshark 分析和解析器实现。
- `chapters/scd-in-ten-minutes.html`：面向新手的 SCD 十分钟导览，以原创小型片段串起 SCL、IED、LD、LN、DataSet、GOOSE 与网络侧 GSE。
- `chapters/core-concept-comparisons.html`：一次设备/LN、IED/MU/智能终端、DO/DA/FC、GOOSE/SV/Report、ICD/CID/SCD 与值语义的易混概念速查。
- `chapters/annotated-xml-examples.html`：原创最小 XML 片段库，涵盖 IED/LN、DataSet/FCDA、GOOSE、SV、ReportControl 和 ctlModel。
- `chapters/ln-cdc-deep-index.html`：保护、测量/计量、开关控制和自动化高频 LN，以及 CDC 的工程阅读要点。
- `chapters/symptom-troubleshooting.html`：GOOSE、SV、报告、遥控、SCD 导入和枚举值问题的排障路径库。
- `chapters/safety-and-test-boundaries.html`：测试模式、质量位、闭锁、权限、网络隔离，以及 SCL 校验和现场验收的边界。
- `chapters/scd-reading-toolbox.html`：陌生节点五问、引用追踪、值语义判别和可复用的 SCD 阅读记录卡。
- `chapters/engineering-files.html`：SCL、SCD、ICD、CID、SSD、SED、IID 与文件头。
- `chapters/primary-and-roles.html`：一次系统层级、LNode 映射和 IED 设备角色。
- `chapters/ied-data-model.html`：IED/LD/LN、DO/DA、功能约束、控制、设置、质量和时标。
- `chapters/communication-process.html`：MMS、报告、GOOSE、SV/SMV、网络地址、VLAN 与授时。
- `chapters/standard-model-index.html`：LN 功能组、CDC、类型模板和 Edition 提示。
- `chapters/engineering-practice.html`：引用链、校验、排障、实例统计与变更管理。

## 离线约束

- 所有页面、样式、脚本和术语数据均使用相对本地路径；没有 CDN、在线字体或在线 API。
- `data/terms.js` 使用本地脚本载入而非 `fetch` JSON，因此可在双击打开的 `file://` 页面中工作。
- 抓包解析工具优先支持 Ethernet 链路类型、经典 PCAP 和包含 Enhanced Packet Block 的 PCAPNG；GOOSE/SV 可逐层解码，MMS 当前提供 TCP/102、TPKT/COTP 候选识别并会标注需要 TCP 流重组的情况。
- 导入匹配 SCD/ICD 后，GOOSE `allData` 可按 `GSEControl → DataSet → FCDA` 顺序关联信号，并在工程文件提供时显示可追溯描述、类型路径和枚举文本；未提供描述时对应单元格保持为空。时间线可筛选协议、APPID、信号和抓包时间，并可绘制已唯一映射且安全数值化的 ST/MX 信号；字符串、时间、未知值、冲突映射与证据不足的 SV sample 均禁用绘图。SV 的采样八位串只有在通道布局、类型、质量与比例可证明时才可拆分为通道值；否则保留原始 sample 与映射证据。
- 术语数据格式见 `data/README.md`。扩充词条后应检查 `related` 中的每一个标识均存在。

`scl-scd-help.html` 保留为早期单页帮助文档兼容入口；百科主入口为 `index.html`。

## 新手阅读路径

首次阅读 SCD 时，建议先打开 `chapters/scd-in-ten-minutes.html` 建立对象关系，再打开 `chapters/core-concept-comparisons.html` 排除常见概念混淆；陌生节点先用 `chapters/scd-reading-toolbox.html` 的五问记录上下文，需要对照 XML 时使用 `chapters/annotated-xml-examples.html`，需要识别高频 LN/CDC 时使用 `chapters/ln-cdc-deep-index.html`，出现具体故障症状时使用 `chapters/symptom-troubleshooting.html`，涉及测试、控制或变更时先阅读 `chapters/safety-and-test-boundaries.html`。需要从抓包分析 GOOSE、SV/SMV 或 MMS 时，打开 `chapters/packet-analysis.html`，先按 Ethernet/VLAN/TCP 与 BER TLV 分层确认字节，再回到 SCL 反查工程语义。教学片段是原创且脱敏的结构示例，不是完整可投产配置；SCD 的结构或引用正确也不能替代装置、网络和现场功能验证。
