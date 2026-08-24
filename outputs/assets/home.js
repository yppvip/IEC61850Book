(function () {
  'use strict';
  const oldHeader = document.querySelector('.top');
  if (!oldHeader) return;
  oldHeader.className = 'home-hero';
  oldHeader.innerHTML = '<div class="home-hero-inner"><h1>IEC 61850 离线知识库</h1><p>从一次系统、设备角色和数据模型开始，沿 SCL 配置与通信协议逐层建立工程知识脉络。</p></div>';
  const nav = document.createElement('nav'); nav.className = 'home-nav'; nav.setAttribute('aria-label', '一级导航');
  nav.innerHTML = '<div class="home-nav-inner"><a class="active" href="#start">首页</a><a href="#library">标准文库</a><a href="#knowledge">技术知识</a><a href="#model">数据模型</a><a href="#scl">SCL 配置</a><a href="#protocol">通信协议</a><a href="#practice">工程应用</a><a href="#terms">术语</a></div>';
  oldHeader.after(nav);
  const shell = document.querySelector('.shell'); shell.id = 'start';
  const cards = [...shell.querySelectorAll(':scope > .card')];
  const published = cards.find(card => card.querySelector('h2')?.textContent.includes('已发布专题'));
  const parser = cards.find(card => card.querySelector('h2')?.textContent.includes('离线抓包')); if (parser) parser.remove();
  const map = shell.querySelector('.map');
  if (map) map.textContent = '一次系统：Substation → VoltageLevel → Bay → LNode\nIED 模型：IED → AccessPoint → Server → LDevice → LN0 / LN\n数据模型：LN → DO → DA → FC；DataSet → FCDA\nSCL 工程：SCL → SCD / ICD / CID / SSD / SED / IID\n通信配置：Communication → SubNetwork → ConnectedAP → GSE / SMV\n类型库：DataTypeTemplates → LNodeType / DOType / DAType / EnumType\n\n阅读主线：一次系统 → IED 数据模型 → 数据集 → SCL 配置 → 通信服务 → 工程校验';
  if (published) {
    published.querySelector('h2').textContent = '按知识层级阅读';
    const categories = [['library','标准文库',['standard-model-index.html','engineering-files.html']],['knowledge','技术知识',['core-concept-comparisons.html','primary-and-roles.html','safety-and-test-boundaries.html']],['model','数据模型',['ied-data-model.html','ln-cdc-deep-index.html']],['scl','SCL 配置',['scd-in-ten-minutes.html','scd-reading-toolbox.html','annotated-xml-examples.html']],['protocol','通信协议',['communication-process.html','packet-analysis.html']],['practice','工程应用',['engineering-practice.html','symptom-troubleshooting.html']]];
    const links = new Map([...published.querySelectorAll('a')].map(link => [link.getAttribute('href').split('/').pop(), link])); published.innerHTML = '';
    categories.forEach(([id,title,files]) => { const section = document.createElement('section'); section.id=id; section.className='knowledge-group'; section.innerHTML=`<h3>${title}</h3>`; files.forEach(file => { const p=links.get(file)?.closest('p'); if(p) section.append(p); }); published.append(section); });
  }
  const results = document.querySelector('.results'); if (results) results.id = 'terms';
  const layout = document.createElement('div'); layout.className = 'home-layout';
  const left = document.createElement('aside'); left.className='side-tree'; left.setAttribute('aria-label','知识树'); left.innerHTML='<p class="side-title">知识导航</p><details open><summary>从哪里开始</summary><ul><li><a href="chapters/core-concept-comparisons.html">易混概念速查</a></li><li><a href="chapters/primary-and-roles.html">一次系统与设备角色</a></li></ul></details><details><summary>工程结构</summary><ul><li><a href="chapters/ied-data-model.html">IED 与数据模型</a></li><li><a href="chapters/scd-in-ten-minutes.html">十分钟读懂 SCD</a></li></ul></details><details><summary>通信与应用</summary><ul><li><a href="chapters/communication-process.html">通信与过程层</a></li><li><a href="chapters/engineering-practice.html">工程实践与排障</a></li></ul></details>';
  const right = document.createElement('aside'); right.className='page-outline'; right.setAttribute('aria-label','首页目录'); right.innerHTML='<p class="side-title">本页目录</p><ol><li><a href="#start">阅读路径</a></li><li><a href="#library">标准文库</a></li><li><a href="#knowledge">技术知识</a></li><li><a href="#model">数据模型</a></li><li><a href="#scl">SCL 配置</a></li><li><a href="#protocol">通信协议</a></li><li><a href="#practice">工程应用</a></li><li><a href="#terms">术语索引</a></li></ol>';
  shell.before(layout); layout.append(left,shell,right);
}());
