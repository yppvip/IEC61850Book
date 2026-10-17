# 离线百科数据格式

## 对象引用专题数据

`object-reference-terms.js` 在所有既有术语脚本之后、`app.js` 之前加载，按稳定 ID 增补 8 个专题入口。`object-reference-evidence.json` 保存指定 SCD 的 SHA-256、版本、统计和所选路径的源行；发布名称均为 Demo 别名，网页运行不请求该 JSON。由 `../../scripts/build_object_reference.py` 生成，正文模板在 `../../scripts/templates/object-reference.html`。只读源 SCD，不进行设备操作或完整模式校验。

`terms.js` 将词条赋给全局变量 `window.IEC61850_TERMS`，以便直接双击打开 `index.html` 时无需通过网络请求加载 JSON。

每项字段：

- `id`：稳定的英文标识，用于词条锚点和关系引用。
- `zh`、`en`：中文名与英文名/标准标签。
- `aliases`：可检索的缩写、中文别名或常见工程称呼。
- `category`：百科分类。
- `level`：在 SCL 或数据模型中的典型层级。
- `summary`：原创的简短中文解释。
- `related`：相关词条的 `id` 数组。

后续模块可修订 `terms.js`，也可使用下述增补脚本按稳定 ID 更新词条；新增 `related` 指向时应同时新增目标词条或在同一阶段补齐它。

## 第 7-2 部分术语与工程证据

首页依次加载 `terms.js`、`part72-terms.js` 和 `app.js`。增补脚本以稳定 `id` 更新已有条目或追加新条目，保留原别名与关联；不使用 fetch，支持本地文件阅读。新增 `href` 字段指向相对首页的专题路径与可选锚点。

`part72-evidence.json` 是静态核对记录，保存源 SCD 的 SHA-256、版本、元素统计及实例位置；页面中的表格和 XML 摘录已在生成时写入 HTML，浏览器不需要请求该 JSON。维护生成脚本为 `../../scripts/build_part72.py`。

## 第 7-4 部分术语与工程证据

首页依次加载 `terms.js`、`part72-terms.js`、`part73-terms.js`、`part74-terms.js`，再启动 `app.js`。增补脚本按稳定 ID 更新已有 LN 条目或新增数据名/缩写条目，保留旧别名和关联；包含 DO 层级、定义来源与页内锚点，不使用网络请求。

`part74-evidence.json` 保存 PDF/SCD 的 SHA-256、工程版本、节点/类型统计、32 类实际实例、类型引用和 115 个工程枚举的完整编码/标签及 DA/BDA 使用点。该文件用于离线复核，页面内容已经静态写入 HTML。

`part74-pages.json` 是 14 页维护清单，供导航整合与验证脚本读取；浏览器不加载它。结构化标准解读数据在项目 `scripts/part74_data.json`，具体维护方式和扫描缺印刷 68 的边界见 `../README.md`。数据字典有 519 个明示名称，缩写入口 273 项（含四个时间后缀）；这些计数限定于提供的 2003 基线。

## 开发人员学习路径与电气基础

首页在四份既有术语文件之后、`app.js` 之前加载 `learning-terms.js`。它用 `learn-` 前缀追加 21 个电气基础与学习入口词条，按稳定 ID 更新，`href` 指向可离线打开的专题与锚点。包含三相、功率、接线、CT、采样、SOE、保护与开发数据语义；这些是原创入门词条，不声称属于 IEC 61850-2 的完整术语清单。

`learning-pages.json` 是 7 页维护清单，仅供构建和验证脚本使用；网页不读取 JSON。`scripts/build_learning.py` 维护内容、教学例子、8 阶段路径和词条，`scripts/build_learning_home.py` 复用同一路径生成首页。术语加载后合计 1403 项，保留全部既有稳定 ID。

## 常用 LD 与继电保护九统一

`protection-guides-terms.js` 在 `app.js` 前追加 10 个稳定 ID 的专题词条。`common-datasets-evidence.json` 保存只读参考 SCD 的 SHA-256、源行、所选成员顺序及类型、控制块引用计数；IED 与非空 LN 前缀及报告标识使用 Demo 别名。网页运行不读取 JSON；正文在构建时写入 HTML。由 `../../scripts/build_protection_guides.py` 生成，不代表工程符合九统一或完整 SCL 校验通过。
