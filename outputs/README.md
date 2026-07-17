# IEC 61850 / SCL 离线百科

直接用任意现代浏览器打开 `index.html`，无需启动服务或联网。

## 已发布专题

- `chapters/scd-in-ten-minutes.html`：面向新手的 SCD 十分钟导览，以原创小型片段串起 SCL、IED、LD、LN、DataSet、GOOSE 与网络侧 GSE。
- `chapters/core-concept-comparisons.html`：一次设备/LN、IED/MU/智能终端、DO/DA/FC、GOOSE/SV/Report、ICD/CID/SCD 与值语义的易混概念速查。
- `chapters/annotated-xml-examples.html`：原创最小 XML 片段库，涵盖 IED/LN、DataSet/FCDA、GOOSE、SV、ReportControl 和 ctlModel。
- `chapters/ln-cdc-deep-index.html`：保护、测量/计量、开关控制和自动化高频 LN，以及 CDC 的工程阅读要点。
- `chapters/symptom-troubleshooting.html`：GOOSE、SV、报告、遥控、SCD 导入和枚举值问题的排障路径库。
- `chapters/engineering-files.html`：SCL、SCD、ICD、CID、SSD、SED、IID 与文件头。
- `chapters/primary-and-roles.html`：一次系统层级、LNode 映射和 IED 设备角色。
- `chapters/ied-data-model.html`：IED/LD/LN、DO/DA、功能约束、控制、设置、质量和时标。
- `chapters/communication-process.html`：MMS、报告、GOOSE、SV/SMV、网络地址、VLAN 与授时。
- `chapters/standard-model-index.html`：LN 功能组、CDC、类型模板和 Edition 提示。
- `chapters/engineering-practice.html`：引用链、校验、排障、实例统计与变更管理。

## 离线约束

- 所有页面、样式、脚本和术语数据均使用相对本地路径；没有 CDN、在线字体或在线 API。
- `data/terms.js` 使用本地脚本载入而非 `fetch` JSON，因此可在双击打开的 `file://` 页面中工作。
- 术语数据格式见 `data/README.md`。扩充词条后应检查 `related` 中的每一个标识均存在。

`scl-scd-help.html` 保留为早期单页帮助文档兼容入口；百科主入口为 `index.html`。

## 新手阅读路径

首次阅读 SCD 时，建议先打开 `chapters/scd-in-ten-minutes.html` 建立对象关系，再打开 `chapters/core-concept-comparisons.html` 排除常见概念混淆；需要对照 XML 时使用 `chapters/annotated-xml-examples.html`，需要识别高频 LN/CDC 时使用 `chapters/ln-cdc-deep-index.html`，出现具体故障症状时使用 `chapters/symptom-troubleshooting.html`。教学片段是原创且脱敏的结构示例，不是完整可投产配置；SCD 的结构或引用正确也不能替代装置、网络和现场功能验证。
