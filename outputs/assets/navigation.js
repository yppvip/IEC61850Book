(function () {
  'use strict';
  const sections = [
    { label: '标准文库', items: [['standard-model-index.html', 'IEC 61850 标准模型'], ['engineering-files.html', 'SCL 与工程交换文件']] },
    { label: '技术知识', items: [['core-concept-comparisons.html', '易混概念速查'], ['primary-and-roles.html', '一次系统与设备角色'], ['safety-and-test-boundaries.html', '安全与测试边界']] },
    { label: '数据模型', items: [['ied-data-model.html', 'IED 与数据模型'], ['ln-cdc-deep-index.html', 'LN / CDC 深度索引']] },
    { label: 'SCL 配置', items: [['scd-in-ten-minutes.html', '十分钟读懂 SCD'], ['scd-reading-toolbox.html', 'SCD 阅读工具箱'], ['annotated-xml-examples.html', '注释式 XML 示例库']] },
    { label: '通信协议', items: [['communication-process.html', '通信与过程层'], ['packet-analysis.html', '协议字段阅读']] },
    { label: '工程应用', items: [['engineering-practice.html', '工程实践与排障'], ['symptom-troubleshooting.html', '现象到排障路径库']] }
  ];
  const chapter = document.querySelector('main.chapter');
  if (!chapter) return;
  const current = location.pathname.split('/').pop();
  const group = sections.find(section => section.items.some(item => item[0] === current));
  const title = document.querySelector('h1')?.textContent.trim() || '专题阅读';
  const headings = [...chapter.querySelectorAll('section > h2')];
  headings.forEach((heading, index) => { if (!heading.id) heading.id = `section-${index + 1}`; });
  const nav = document.createElement('nav');
  nav.className = 'site-nav'; nav.setAttribute('aria-label', '一级导航');
  nav.innerHTML = `<div class="site-nav-inner"><a class="brand" href="../index.html">IEC 61850 离线知识库</a><button class="nav-toggle" type="button" aria-expanded="false">导航</button><div class="site-nav-links"><a href="../index.html">首页</a>${sections.map(section => `<span>${section.label}</span>`).join('')}</div></div>`;
  document.body.prepend(nav);
  const layout = document.createElement('div'); layout.className = 'reading-layout';
  const tree = sections.map(section => `<details ${section === group ? 'open' : ''}><summary>${section.label}</summary><ul>${section.items.map(([file, label]) => `<li><a class="${file === current ? 'current' : ''}" href="${file}">${label}</a></li>`).join('')}</ul></details>`).join('');
  const outline = headings.length ? `<ol>${headings.map(heading => `<li><a href="#${heading.id}">${heading.textContent}</a></li>`).join('')}</ol>` : '<p class="meta">本页暂无分节目录。</p>';
  layout.innerHTML = `<aside class="side-tree" aria-label="知识树"><p class="side-title">知识导航</p>${tree}</aside><div class="reading-content"><nav class="breadcrumb" aria-label="面包屑"><a href="../index.html">首页</a><span>${group ? `${group.label} › ${title}` : title}</span></nav></div><aside class="page-outline" aria-label="本页目录"><p class="side-title">本页目录</p>${outline}</aside>`;
  chapter.before(layout); layout.querySelector('.reading-content').append(chapter);
  const toggle = nav.querySelector('.nav-toggle');
  toggle.addEventListener('click', () => { const open = nav.classList.toggle('nav-open'); toggle.setAttribute('aria-expanded', String(open)); });
}());
