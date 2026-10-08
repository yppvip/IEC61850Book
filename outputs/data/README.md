# 离线百科数据格式

`terms.js` 将词条赋给全局变量 `window.IEC61850_TERMS`，以便直接双击打开 `index.html` 时无需通过网络请求加载 JSON。

每项字段：

- `id`：稳定的英文标识，用于词条锚点和关系引用。
- `zh`、`en`：中文名与英文名/标准标签。
- `aliases`：可检索的缩写、中文别名或常见工程称呼。
- `category`：百科分类。
- `level`：在 SCL 或数据模型中的典型层级。
- `summary`：原创的简短中文解释。
- `related`：相关词条的 `id` 数组。

后续模块只追加或修订 `terms.js` 中的对象；新增 `related` 指向时应同时新增目标词条或在同一阶段补齐它。

## 第 7-2 部分术语与工程证据

首页依次加载 `terms.js`、`part72-terms.js` 和 `app.js`。增补脚本以稳定 `id` 更新已有条目或追加新条目，保留原别名与关联；不使用 fetch，支持本地文件阅读。新增 `href` 字段指向相对首页的专题路径与可选锚点。

`part72-evidence.json` 是静态核对记录，保存源 SCD 的 SHA-256、版本、元素统计及实例位置；页面中的表格和 XML 摘录已在生成时写入 HTML，浏览器不需要请求该 JSON。维护生成脚本为 `../../scripts/build_part72.py`。
