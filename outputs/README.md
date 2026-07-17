# IEC 61850 / SCL 离线百科

直接用任意现代浏览器打开 `index.html`，无需启动服务或联网。

## 已发布专题

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
