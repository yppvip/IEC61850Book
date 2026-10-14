(function () {
  'use strict';

  const groups = [
  {
    "id": "library",
    "label": "标准文库",
    "entry": "standard-library-overview.html",
    "items": [
      [
        "standard-library-overview.html",
        "概论：体系与模型",
        "体系与阅读基线"
      ],
      [
        "standard-terms.html",
        "第 2 部分：术语导读",
        "体系与阅读基线"
      ],
      [
        "standard-part-7-1.html",
        "第 7-1 部分：原理与模型",
        "体系与阅读基线"
      ],
      [
        "standard-part-7-2.html",
        "第 7-2 部分：抽象通信服务接口 ACSI",
        "服务、类型、语义与配置"
      ],
      [
        "standard-part-7-3.html",
        "第 7-3 部分：公用数据类 CDC",
        "服务、类型、语义与配置"
      ],
      [
        "standard-part-7-4.html",
        "第 7-4 部分：兼容逻辑节点类和数据类",
        "服务、类型、语义与配置"
      ],
      [
        "standard-part-6-scl.html",
        "第 6 部分：SCL 与 IED 通信配置",
        "服务、类型、语义与配置"
      ],
      [
        "standard-model-index.html",
        "IEC 61850 标准模型",
        "服务、类型、语义与配置"
      ]
    ]
  },
  {
    "id": "knowledge",
    "label": "技术知识",
    "entry": "learning-path.html",
    "items": [
      [
        "learning-path.html",
        "从编程到电气：零基础学习路线",
        "从零起步"
      ],
      [
        "electrical-fundamentals.html",
        "电气基础：从电路到三相功率",
        "从零起步"
      ],
      [
        "primary-diagrams.html",
        "一次接线：从单线图认识设备与拓扑",
        "从零起步"
      ],
      [
        "primary-and-roles.html",
        "一次系统与设备角色",
        "从零起步"
      ],
      [
        "measurement-chain.html",
        "测量链：互感器、采样、品质与时间",
        "信号与保护"
      ],
      [
        "protection-control-fundamentals.html",
        "保护与控制：从故障到跳闸闭环",
        "信号与保护"
      ],
      [
        "protection-ied-guide.html",
        "保护 IED 类型、部署与命名",
        "信号与保护"
      ],
      [
        "bay-and-automation-levels.html",
        "间隔、设备缩写与自动化层级",
        "架构与概念"
      ],
      [
        "three-level-two-network.html",
        "三层两网、设备角色与英文缩写",
        "架构与概念"
      ],
      [
        "core-concept-comparisons.html",
        "易混概念速查",
        "架构与概念"
      ],
      [
        "acsi-abstraction.html",
        "抽象接口：信息模型与通信协作",
        "架构与概念"
      ],
      [
        "safety-and-test-boundaries.html",
        "安全与测试边界",
        "架构与概念"
      ]
    ]
  },
  {
    "id": "model",
    "label": "数据模型",
    "entry": "ied-data-model.html",
    "items": [
      [
        "ied-data-model.html",
        "IED 与数据模型",
        "模型入门"
      ],
      [
        "data-attributes-reference.html",
        "数据、数据属性与 CDC 取值参考",
        "模型入门"
      ],
      [
        "acsi-common-types.html",
        "ACSI 基本类型、公共类型与对象引用",
        "模型入门"
      ],
      [
        "cdc-common-types.html",
        "公用数据属性类型：品质与控制",
        "模型入门"
      ],
      [
        "control-input-models.html",
        "公共 LN 信息、控制模型与输入模型",
        "模型入门"
      ],
      [
        "acsi-runtime-models.html",
        "第 8～17 章：数据、交换与控制模型",
        "模型入门"
      ],
      [
        "ln-cdc-deep-index.html",
        "LN / CDC 深度索引",
        "模型入门"
      ],
      [
        "cdc-status.html",
        "状态 CDC：SPS 至 BCR",
        "CDC 按语义查阅"
      ],
      [
        "cdc-measurement.html",
        "测量 CDC：幅值、相量与谐波",
        "CDC 按语义查阅"
      ],
      [
        "cdc-control.html",
        "可控 CDC：命令与反馈",
        "CDC 按语义查阅"
      ],
      [
        "cdc-setting.html",
        "定值 CDC：参数与曲线",
        "CDC 按语义查阅"
      ],
      [
        "cdc-description.html",
        "描述 CDC：铭牌与曲线",
        "CDC 按语义查阅"
      ],
      [
        "cdc-units-fc.html",
        "附录 A/B：单位、倍率与 FC",
        "CDC 按语义查阅"
      ],
      [
        "cdc-attribute-dictionary.html",
        "表 49：完整属性字典",
        "CDC 按语义查阅"
      ],
      [
        "ln-system.html",
        "公用逻辑节点信息：组成、继承与状态",
        "LN 按功能查阅"
      ],
      [
        "ln-switch-transformer.html",
        "开关、互感器与变压器：X / T / Y 组",
        "LN 按功能查阅"
      ],
      [
        "ln-measurement.html",
        "测量、计量与电气基础：M 组",
        "LN 按功能查阅"
      ],
      [
        "ln-protection.html",
        "保护功能逻辑节点：P 组全表",
        "LN 按功能查阅"
      ],
      [
        "ln-protection-related.html",
        "保护相关逻辑节点：R 组全表",
        "LN 按功能查阅"
      ],
      [
        "ln-control-generic.html",
        "控制、通用功能与接口：C / G / I 组",
        "LN 按功能查阅"
      ],
      [
        "ln-automatic.html",
        "自动控制逻辑节点：A 组",
        "LN 按功能查阅"
      ],
      [
        "ln-monitoring-equipment.html",
        "传感器监视与其他电力设备：S / Z 组",
        "LN 按功能查阅"
      ],
      [
        "ln-values-reference.html",
        "7-4 数据取值：枚举、模式组合与量纲",
        "数据与建模参考"
      ],
      [
        "ln-data-dictionary.html",
        "第 6 章：519 个数据名称与反向索引",
        "数据与建模参考"
      ],
      [
        "ln-extension-modeling.html",
        "附录 A/B/C：扩展规则与功能建模",
        "数据与建模参考"
      ]
    ]
  },
  {
    "id": "scl",
    "label": "SCL 配置",
    "entry": "engineering-files.html",
    "items": [
      [
        "engineering-files.html",
        "SCL 与工程交换文件",
        "文件与引用入门"
      ],
      [
        "scd-in-ten-minutes.html",
        "十分钟读懂 SCD",
        "文件与引用入门"
      ],
      [
        "scd-reading-toolbox.html",
        "SCD 阅读工具箱",
        "文件与引用入门"
      ],
      [
        "annotated-xml-examples.html",
        "注释式 XML 示例库",
        "文件与引用入门"
      ],
      [
        "control-blocks-reference.html",
        "数据集、属性集与控制块参考",
        "文件与引用入门"
      ],
      [
        "scd-model-evidence.html",
        "参考 SCD：脱敏证据与类型追踪",
        "参考工程进阶"
      ],
      [
        "scd-acsi-evidence.html",
        "参考 SCD：ACSI 配置位置与真实引用链",
        "参考工程进阶"
      ],
      [
        "cdc-scd-evidence.html",
        "参考 SCD：CDC 与属性类型证据",
        "参考工程进阶"
      ],
      [
        "ln-scd-evidence.html",
        "参考 SCD：逻辑节点实例、类型链与枚举",
        "参考工程进阶"
      ]
    ]
  },
  {
    "id": "protocol",
    "label": "通信协议",
    "entry": "communication-process.html",
    "items": [
      [
        "communication-process.html",
        "通信与过程层",
        "先服务后字段"
      ],
      [
        "acsi-services.html",
        "ACSI 服务分类与功能全表",
        "先服务后字段"
      ],
      [
        "acsi-server-associations.html",
        "服务器、应用关联与访问视窗",
        "先服务后字段"
      ],
      [
        "service-mapping.html",
        "特定通信服务映射与报文格式",
        "先服务后字段"
      ],
      [
        "packet-analysis.html",
        "协议字段阅读",
        "先服务后字段"
      ]
    ]
  },
  {
    "id": "practice",
    "label": "工程应用",
    "entry": "developer-data-contracts.html",
    "items": [
      [
        "developer-data-contracts.html",
        "给开发人员的数据契约与工程边界",
        "开发与综合练习"
      ],
      [
        "feeder-learning-case.html",
        "综合练习：从一条馈线读到工程证据",
        "开发与综合练习"
      ],
      [
        "engineering-model-reading.html",
        "工程阅读：从功能到配置的证据检查",
        "工程查证与排障"
      ],
      [
        "engineering-practice.html",
        "工程实践与排障",
        "工程查证与排障"
      ],
      [
        "acsi-engineering-workflows.html",
        "时间、文件与 ACSI 工程核查",
        "工程查证与排障"
      ],
      [
        "symptom-troubleshooting.html",
        "现象到排障路径库",
        "工程查证与排障"
      ]
    ]
  },
  {
    "id": "terms",
    "label": "术语索引",
    "entry": "abbreviation-index.html",
    "items": [
      [
        "abbreviation-index.html",
        "缩写、全拼、中文名与功能",
        "缩写与标准术语"
      ],
      [
        "ln-abbreviations.html",
        "第 4 章：缩写、英文、中文与用法",
        "缩写与标准术语"
      ]
    ]
  }
];


  // One catalog is shared by the home page and every chapter.
  function tree(group, current = '', prefix = '') {
    const blocks = [...new Set(group.items.map(item => item[2]))];
    return `<details ${group.items.some(([file]) => file === current) ? 'open' : ''}><summary>${group.label}</summary>${blocks.map(block => {
      const items = group.items.filter(item => item[2] === block);
      return `<details class="tree-block" ${!current || items.some(([file]) => file === current) ? 'open' : ''}><summary>${block}</summary><ul>${items.map(([file,label]) => `<li><a class="${file === current ? 'current' : ''}" href="${prefix}${file}" ${file === current ? 'aria-current="page"' : ''}>${label}</a></li>`).join('')}</ul></details>`;
    }).join('')}</details>`;
  }
  const learningOrder = ['learning-path','electrical-fundamentals','primary-diagrams','primary-and-roles','measurement-chain','protection-control-fundamentals','protection-ied-guide','bay-and-automation-levels','three-level-two-network','core-concept-comparisons','acsi-abstraction','ied-data-model','data-attributes-reference','cdc-common-types','control-input-models','engineering-files','scd-in-ten-minutes','scd-reading-toolbox','annotated-xml-examples','control-blocks-reference','communication-process','acsi-services','service-mapping','packet-analysis','developer-data-contracts','feeder-learning-case','engineering-model-reading','engineering-practice','symptom-troubleshooting','safety-and-test-boundaries'];
  window.IEC61850_NAV = { groups, tree, learningOrder };

  const chapter = document.querySelector('main.chapter');
  if (!chapter) return;

  document.body.classList.add('has-site-nav');
  document.querySelector('.chapter-nav')?.remove();

  const current = location.pathname.split('/').pop();
  const group = groups.find(item => item.items.some(([file]) => file === current)) || groups[1];
  const title = document.querySelector('h1')?.textContent.trim() || '专题阅读';
  const headings = [...chapter.querySelectorAll('section > h2')];
  headings.forEach((heading, index) => {
    if (!heading.id) heading.id = `section-${index + 1}`;
  });

  const nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.setAttribute('aria-label', '全站导航');
  nav.innerHTML = `<div class="site-nav-utility">
    <a class="brand" href="../index.html">IEC 61850 离线知识库</a>
    <div class="site-nav-actions">
      <a href="../index.html#term-search">全局搜索</a>
      <a href="../index.html">首页</a>
    </div>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav-modules">导航</button>
  </div>
  <div class="site-nav-modules" id="site-nav-modules">
    <div class="site-nav-links">
      <a href="../index.html">首页</a>
      ${groups.map(item => `<a class="${item.id === group.id ? 'active' : ''}" href="${item.entry}">${item.label}</a>`).join('')}
    </div>
  </div>`;
  document.body.prepend(nav);

  const activeTree = tree(group, current);
  const topicTree = groups.filter(item => item !== group).map(item => tree(item, current)).join('');

  const layout = document.createElement('div');
  layout.className = 'reading-layout';
  layout.innerHTML = `<aside class="side-tree" aria-label="知识树">
      <p class="side-title">${group.label}</p>${activeTree}${topicTree}
    </aside>
    <div class="reading-content">
      <nav class="breadcrumb" aria-label="面包屑"><a href="../index.html">首页</a><a href="${group.entry}">${group.label}</a><span>${title}</span></nav>
    </div>
    <aside class="page-outline" aria-label="本页目录">
      <p class="side-title">本页目录</p>
      ${headings.length ? `<ol>${headings.map(heading => `<li><a href="#${heading.id}">${heading.textContent.replace(/^\d+\.\s*/, '')}</a></li>`).join('')}</ol>` : '<p class="meta">本页暂无分节目录。</p>'}
    </aside>`;
  chapter.before(layout);
  layout.querySelector('.reading-content').append(chapter);

  const position = learningOrder.indexOf(current.replace(/\.html$/, ''));
  if (position >= 0) {
    const labelFor = file => groups.flatMap(g => g.items).find(item => item[0] === file + '.html')?.[1] || file;
    const pager = document.createElement('nav');
    pager.className = 'learning-pager';
    pager.setAttribute('aria-label', '学习顺序');
    pager.innerHTML = `<a href="learning-path.html">学习路线 · ${position + 1}/${learningOrder.length}</a>${position > 0 ? `<a rel="prev" href="${learningOrder[position-1]}.html">← 上一步：${labelFor(learningOrder[position-1])}</a>` : ''}${position < learningOrder.length-1 ? `<a rel="next" href="${learningOrder[position+1]}.html">继续阅读：${labelFor(learningOrder[position+1])} →</a>` : '<a href="learning-path.html">返回路线，进入标准全表查阅 →</a>'}`;
    chapter.append(pager);
  }

  // Text must never inherit shape strokes; see the shared CSS rule as well.
  document.querySelectorAll('figure:has(svg)').forEach((figure, index) => {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'diagram-open'; button.textContent = '放大图表';
    button.setAttribute('aria-label', '放大图表 ' + (index + 1));
    figure.prepend(button);
    button.addEventListener('click', () => {
      const dialog = document.createElement('dialog'); dialog.className = 'diagram-dialog';
      dialog.classList.toggle('interface-dialog', figure.classList.contains('interface-figure'));
      dialog.setAttribute('aria-label', '图表放大阅读');
      const bar = document.createElement('div'); bar.className = 'diagram-toolbar';
      const close = document.createElement('button'); close.type = 'button'; close.textContent = '关闭';
      const minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '缩小';
      const plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '放大';
      const hint = document.createElement('span'); hint.textContent = '可横向滚动 · Esc 关闭';
      bar.append(close, minus, plus, hint);
      const canvas = document.createElement('div'); canvas.className = 'diagram-canvas';
      const svg = figure.querySelector('svg').cloneNode(true);
      // Avoid duplicate SVG definition IDs while the original remains on the page.
      const idMap = new Map([...svg.querySelectorAll('[id]')].map(e => [e.id, 'enlarged-' + index + '-' + e.id]));
      [svg, ...svg.querySelectorAll('*')].forEach(e => {
        for (const attr of [...e.attributes]) {
          let value = attr.value;
          for (const [oldId,newId] of idMap) {
            if (attr.name === 'id' && value === oldId) value = newId;
            else if (attr.name === 'aria-labelledby' || attr.name === 'aria-describedby') value = value.split(' ').map(v => v === oldId ? newId : v).join(' ');
            else value = value.replaceAll('url(#' + oldId + ')','url(#' + newId + ')');
          }
          e.setAttribute(attr.name,value);
        }
      });
      let size = Math.max(850, svg.viewBox.baseVal.width || 980);
      const resize = () => { svg.style.width = size + 'px'; };
      resize(); plus.onclick = () => { size = Math.min(2600,size + 200); resize(); };
      minus.onclick = () => { size = Math.max(600,size - 200); resize(); };
      canvas.append(svg); dialog.append(bar,canvas);
      const caption = figure.querySelector('figcaption');
      if (caption) { const p = document.createElement('p'); p.textContent = caption.textContent; dialog.append(p); }
      document.body.append(dialog);
      close.onclick = () => dialog.close();
      dialog.addEventListener('close', () => { dialog.remove(); button.focus(); }, {once:true});
      dialog.showModal(); close.focus();
    });
  });

  const toggle = nav.querySelector('.nav-toggle');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}());
