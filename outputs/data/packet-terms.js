(function(){const terms=window.IEC61850_TERMS;for(const t of [
  {
    "id": "packet-lesson-0",
    "zh": "报文解析总览",
    "en": "报文解析",
    "aliases": [
      "报文解析",
      "Hex",
      "Wireshark",
      "BER",
      "TLV"
    ],
    "category": "报文解析教学",
    "level": "报文解析 → 报文解析总览",
    "summary": "三类核心通信与标准体系、前置知识和Hex阅读法",
    "href": "chapters/packet-analysis.html#scope",
    "related": []
  },
  {
    "id": "packet-lesson-1",
    "zh": "MMS：从对象到请求与响应",
    "en": "MMS",
    "aliases": [
      "MMS",
      "Read Request",
      "Read Response",
      "InvokeID",
      "Service",
      "VariableAccessSpecification",
      "AccessResult",
      "GetNameList"
    ],
    "category": "报文解析教学",
    "level": "报文解析 → MMS：从对象到请求与响应",
    "summary": "完整MMS单变量Read请求/响应，解释服务选择与Dbpos",
    "href": "chapters/packet-mms.html#hex",
    "related": []
  },
  {
    "id": "packet-lesson-2",
    "zh": "GOOSE：从状态到二层事件帧",
    "en": "GOOSE",
    "aliases": [
      "GOOSE",
      "allData",
      "gocbRef",
      "stNum",
      "sqNum",
      "Dbpos",
      "GoCB"
    ],
    "category": "报文解析教学",
    "level": "报文解析 → GOOSE：从状态到二层事件帧",
    "summary": "数据集到二层GOOSE，事件首帧/重传的字段变化",
    "href": "chapters/packet-goose.html#hex",
    "related": []
  },
  {
    "id": "packet-lesson-3",
    "zh": "SV：从采样到 ASDU",
    "en": "SV",
    "aliases": [
      "SV",
      "SMV",
      "ASDU",
      "svID",
      "smpCnt",
      "smpSynch",
      "seqData"
    ],
    "category": "报文解析教学",
    "level": "报文解析 → SV：从采样到 ASDU",
    "summary": "八通道16个FCDA、样本与品质、单/多ASDU",
    "href": "chapters/packet-sv.html#hex",
    "related": []
  },
  {
    "id": "packet-lesson-4",
    "zh": "SCD 与报文的双向映射",
    "en": "SCD报文映射",
    "aliases": [
      "SCD报文映射",
      "APPID",
      "GSEControl",
      "SampledValueControl"
    ],
    "category": "报文解析教学",
    "level": "报文解析 → SCD 与报文的双向映射",
    "summary": "实例和类型、DataSet、控制块与网络字段双向核对",
    "href": "chapters/packet-scd-mapping.html#forward",
    "related": []
  },
  {
    "id": "packet-lesson-5",
    "zh": "完整案例与分析练习",
    "en": "实际报文案例",
    "aliases": [
      "实际报文案例",
      "状态变化",
      "断路器合位"
    ],
    "category": "报文解析教学",
    "level": "报文解析 → 完整案例与分析练习",
    "summary": "内置完整Hex与可展开答案，区分事实、配置和未知",
    "href": "chapters/packet-cases.html#cases",
    "related": []
  },
  {
    "id": "packet-lesson-6",
    "zh": "一个报文能装多少信号",
    "en": "信号数量",
    "aliases": [
      "信号数量",
      "MTU",
      "报文容量",
      "最多几个信号"
    ],
    "category": "报文解析教学",
    "level": "报文解析 → 一个报文能装多少信号",
    "summary": "分层约束与容量演算，不虚构固定最大信号数",
    "href": "chapters/packet-capacity.html#meaning",
    "related": []
  }
]){const i=terms.findIndex(x=>x.id===t.id);if(i<0)terms.push(t);else terms[i]=t;}}());
