(function () {
  'use strict';

  const groups = [
    { id: 'library', label: '标准文库', entry: 'standard-library-overview.html', items: [['standard-library-overview.html', '概论：体系与模型'], ['standard-terms.html', '第 2 部分：术语导读'], ['standard-part-6-scl.html', '第 6 部分：SCL 与 IED 通信配置'], ['abbreviation-index.html', '缩写、全拼、中文名与功能'], ['standard-model-index.html', 'IEC 61850 标准模型'], ['engineering-files.html', 'SCL 与工程交换文件']] },
    { id: 'knowledge', label: '技术知识', entry: 'bay-and-automation-levels.html', items: [['bay-and-automation-levels.html', '间隔、设备缩写与自动化层级'], ['protection-ied-guide.html', '保护 IED 类型、部署与命名'], ['core-concept-comparisons.html', '易混概念速查'], ['primary-and-roles.html', '一次系统与设备角色'], ['safety-and-test-boundaries.html', '安全与测试边界']] },
    { id: 'model', label: '数据模型', entry: 'ied-data-model.html', items: [['ied-data-model.html', 'IED 与数据模型'], ['ln-cdc-deep-index.html', 'LN / CDC 深度索引']] },
    { id: 'scl', label: 'SCL 配置', entry: 'scd-in-ten-minutes.html', items: [['scd-in-ten-minutes.html', '十分钟读懂 SCD'], ['scd-reading-toolbox.html', 'SCD 阅读工具箱'], ['annotated-xml-examples.html', '注释式 XML 示例库']] },
    { id: 'protocol', label: '通信协议', entry: 'communication-process.html', items: [['communication-process.html', '通信与过程层'], ['packet-analysis.html', '协议字段阅读']] },
    { id: 'practice', label: '工程应用', entry: 'engineering-practice.html', items: [['engineering-practice.html', '工程实践与排障'], ['symptom-troubleshooting.html', '现象到排障路径库']] }
  ];

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
      <a href="../index.html#terms">术语索引</a>
    </div>
  </div>`;
  document.body.prepend(nav);

  const standardTree = '<details open><summary>DL/T 860</summary><ul><li><a class="' + (current === 'standard-library-overview.html' ? 'current' : '') + '" href="standard-library-overview.html">概论：体系与模型</a></li><li><details open><summary>DL/Z 860.1</summary><ul><li><span>2004（版本资料待整理）</span></li><li><span>2018（版本资料待整理）</span></li></ul></details></li><li><a class="' + (current === 'standard-terms.html' ? 'current' : '') + '" href="standard-terms.html">第 2 部分：术语导读</a></li><li><a class="' + (current === 'standard-part-6-scl.html' ? 'current' : '') + '" href="standard-part-6-scl.html">第 6 部分：SCL 与 IED 通信配置</a></li><li><a class="' + (current === 'abbreviation-index.html' ? 'current' : '') + '" href="abbreviation-index.html">缩写、全拼、中文名与功能</a></li><li><a class="' + (current === 'standard-model-index.html' ? 'current' : '') + '" href="standard-model-index.html">类型与标准模型索引</a></li><li><a class="' + (current === 'engineering-files.html' ? 'current' : '') + '" href="engineering-files.html">SCL 与工程交换文件</a></li><li>DL/T 860.3 ～ 860.5（待整理）</li><li>DL/T 860.71 ～ 860.74（待整理）</li><li>DL/T 860.81（待整理）</li></ul></details><details><summary>IEC 61850（待整理）</summary></details><details><summary>相关国家 / 行业标准（待整理）</summary></details>';
  const topicTree = groups
    .filter(item => item.id !== group.id)
    .map(item => `<details><summary>${item.label}</summary><ul>${item.items.map(([file, label]) => `<li><a href="${file}">${label}</a></li>`).join('')}</ul></details>`)
    .join('');
  const activeTree = group.id === 'library'
    ? standardTree
    : `<details open><summary>${group.label}</summary><ul>${group.items.map(([file, label]) => `<li><a class="${file === current ? 'current' : ''}" href="${file}">${label}</a></li>`).join('')}</ul></details>`;

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
      ${headings.length ? `<ol>${headings.map(heading => `<li><a href="#${heading.id}">${heading.textContent}</a></li>`).join('')}</ol>` : '<p class="meta">本页暂无分节目录。</p>'}
    </aside>`;
  chapter.before(layout);
  layout.querySelector('.reading-content').append(chapter);

  const toggle = nav.querySelector('.nav-toggle');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}());
