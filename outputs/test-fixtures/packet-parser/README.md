# 抓包解析器追加功能夹具

这些文件是原创、脱敏的最小 SCL/SCD 片段，只用于验证离线抓包解析器的描述解析、映射冲突和 SV 绘图资格判定。它们不代表完整可下装工程，也不包含现场报文、网络地址或控制策略。

| 夹具 | 导入/报文前提 | 预期描述与映射 | 预期绘图资格 |
| --- | --- | --- | --- |
| `goose-description-enum.scd` | GOOSE：APPID `0x1000`、`gocbRef=IED_DEMO/LD0$GO$gcbStatus`、DataSet `dsStatus` | 第 1 项为 `LD0/XCBR1.Pos.stVal [ST]`；显示 FCDA 的“断路器合分位置”，并可追溯到 DA “断路器位置状态”。第 2 项可由 `EnumType` 将确认的编码解释为 `on`/`off`。 | 第 1 项为已确认的状态/枚举值，可绘制为阶梯图；第二项同样仅在已按该枚举安全解码时可绘制。 |
| `goose-no-description.scd` | GOOSE：APPID `0x1001`、`gocbRef=IED_BLANK/LD0$GO$gcbStatus`、DataSet `dsStatus` | 地址正常显示；描述单元格必须为空，不以 LN/DO 名、APPID 或其他名称补造描述。 | 已可靠解码的 ST 值仍可绘制；描述为空不影响数据类型判定。 |
| `goose-mapping-conflict.scd` | GOOSE：APPID `0x1002`、`gocbRef` 以 `$GO$gcbShared` 结尾 | 两个 GOOSE 发布控制块均匹配，必须列为候选/冲突，不自动选择任一 FCDA 或描述。 | 全部关联项禁用绘图，原因是 SCL 映射不唯一。 |
| `sv-layout-unknown.scd` | SV：APPID `0x4000`、`svID=MU_DEMO/LD0$SV$svcbRaw`、DataSet `dsSamples` | 可显示两个 FCDA 地址；描述分别来自 FCDA/类型模板。该夹具刻意不声明 sample 的字节布局、通道宽度、质量位置、比例或单位。 | SV 信号必须禁用绘图，且不得把 sample 原始字节猜作测量值。 |

## 最小报文数据约定

后续二进制夹具应使用上表中给出的 APPID、`gocbRef` 与 `svID`，并同时覆盖以下值：

- GOOSE Boolean/Enum：`allData` 中的 Boolean 或可由 `EnumType` 唯一解释的整数；验证状态阶梯图、帧时间戳与来源帧回跳。
- GOOSE 文本或时间：验证时间线显示但复选框禁用。
- SV 原始 sample：使用任意原创字节串；在没有新增布局证据前，验证其复选框禁用。
- 截断 TLV 或 APPID Length：验证诊断出现，且不会影响其他帧或已选图表。

验证时描述列只显示 XML 中有明确来源的文本；缺少描述时留空。所有图点必须使用 PCAP/PCAPNG 的帧时间戳，而不是协议内时间字段。
