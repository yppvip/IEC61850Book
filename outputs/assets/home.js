(function () {
  'use strict';

  const header = document.querySelector('.top');
  const shell = document.querySelector('.shell');
  if (!header || !shell) return;

  document.body.classList.add('has-site-nav', 'home-page');
  header.className = 'home-hero';
  header.innerHTML = '<div class="home-hero-inner"><p class="eyebrow">IEC 61850 · OFFLINE KNOWLEDGE BASE</p><h1>IEC 61850 离线知识库</h1><p>以一次系统、IED 数据模型、SCL 工程和通信服务为主线，建立可回溯的技术知识脉络。</p></div>';

  const nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.setAttribute('aria-label', '全站导航');
  nav.innerHTML = `<div class="site-nav-utility">
      <a class="brand" href="#start">IEC 61850 离线知识库</a>
      <div class="site-nav-actions"><a href="#term-search">全局搜索</a></div>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav-modules">导航</button>
    </div>
    <div class="site-nav-modules" id="site-nav-modules">
      <div class="site-nav-links">
        <a class="active" href="#start">首页</a>
        <a href="chapters/standard-library-overview.html">标准文库</a>
        <a href="chapters/core-concept-comparisons.html">技术知识</a>
        <a href="chapters/ied-data-model.html">数据模型</a>
        <a href="chapters/scd-in-ten-minutes.html">SCL 配置</a>
        <a href="chapters/communication-process.html">通信协议</a>
        <a href="chapters/engineering-practice.html">工程应用</a>
        <a href="#terms">术语索引</a>
      </div>
    </div>`;
  document.body.prepend(nav);
  shell.id = 'start';

  const grid = shell.querySelector('.grid');
  const topics = [...shell.querySelectorAll(':scope > .card')].find(card => card.querySelector('h2')?.textContent.includes('已发布专题'));
  const results = shell.querySelector('.results');
  const search = shell.querySelector('.search-panel');
  grid?.remove();
  topics?.remove();
  if (results) {
    results.id = 'terms';
    results.classList.add('home-term-results');
  }

  const overview = document.createElement('section');
  overview.className = 'home-overview';
  overview.innerHTML = '<section class="card home-roadmap"><p class="section-kicker">知识地图</p><h2>先看懂四个关键组成</h2><p class="meta">IEC 61850 不是单一报文或单一配置文件；下面四层共同构成工程语境。</p><div class="component-grid"><a href="chapters/primary-and-roles.html"><b>1. 一次系统</b><span>Substation → VoltageLevel → Bay → LNode</span><small>设备和功能落在什么一次对象上。</small></a><a href="chapters/ied-data-model.html"><b>2. IED 数据模型</b><span>IED → LD → LN → DO → DA</span><small>装置以什么逻辑对象表达数据与控制。</small></a><a href="chapters/scd-in-ten-minutes.html"><b>3. SCL 工程配置</b><span>SCD / ICD / CID · DataSet · FCDA</span><small>模型、引用和工程交付如何组织。</small></a><a href="chapters/communication-process.html"><b>4. 通信服务</b><span>MMS / Report · GOOSE · SV/SMV</span><small>配置的数据如何在系统中交换。</small></a></div></section><section class="card home-connection"><p class="section-kicker">工程主线</p><h2>用一条线串起工程</h2><pre class="map">一次设备 / 功能需求 → IED 内的 LN、DO、DA 数据模型 → DataSet / FCDA → SCL 的控制块、订阅与 Communication → MMS、GOOSE、SV/SMV → 工程校验、变更管理与受控测试</pre></section><section class="card home-start"><p class="section-kicker">推荐路径</p><h2>从这里开始</h2><div class="start-links"><a href="chapters/core-concept-comparisons.html"><b>没有基础</b><span>先区分一次设备、IED、LN、DO/DA、GOOSE 与 SV。</span></a><a href="chapters/scd-in-ten-minutes.html"><b>正在阅读 SCD</b><span>沿 IED、DataSet、GSEControl 和 Communication 建立引用链。</span></a><a href="chapters/engineering-practice.html"><b>面对工程问题</b><span>从工程引用、配置校验、排障与安全边界开始。</span></a></div></section>';
  if (search) search.after(overview);
  else shell.prepend(overview);

  const roadmap = overview.querySelector('.home-roadmap');
  if (roadmap) {
    const standardStart = document.createElement('p');
    standardStart.className = 'notice';
    standardStart.innerHTML = '<b>标准文库起点：</b><a href="chapters/standard-library-overview.html">概论：IEC 61850 / DL/T 860 体系与模型</a>，先理解 Bay、ACSI、IF1～IF10 与标准建模方法。';
    roadmap.querySelector('.component-grid')?.before(standardStart);
  }

  const input = document.querySelector('#term-search');
  const refresh = () => {
    if (results) results.hidden = !input?.value.trim();
  };
  refresh();
  input?.addEventListener('input', refresh);

  const layout = document.createElement('div');
  layout.className = 'home-layout';
  const left = document.createElement('aside');
  left.className = 'side-tree';
  left.setAttribute('aria-label', '知识树');
  left.innerHTML = '<p class="side-title">知识导航</p><details open><summary>起步</summary><ul><li><a href="chapters/core-concept-comparisons.html">易混概念速查</a></li><li><a href="chapters/primary-and-roles.html">一次系统与设备角色</a></li></ul></details><details><summary>模型与配置</summary><ul><li><a href="chapters/ied-data-model.html">IED 与数据模型</a></li><li><a href="chapters/scd-in-ten-minutes.html">十分钟读懂 SCD</a></li></ul></details><details><summary>通信与工程</summary><ul><li><a href="chapters/communication-process.html">通信与过程层</a></li><li><a href="chapters/engineering-practice.html">工程实践与排障</a></li></ul></details>';
  const right = document.createElement('aside');
  right.className = 'page-outline';
  right.setAttribute('aria-label', '首页目录');
  right.innerHTML = '<p class="side-title">本页目录</p><ol><li><a href="#start">知识地图</a></li><li><a href="#terms">术语检索</a></li></ol>';
  shell.before(layout);
  layout.append(left, shell, right);

  const toggle = nav.querySelector('.nav-toggle');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}());
