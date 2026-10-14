"""Integrate the learning track without rebuilding historical source evidence."""
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'outputs'
nav_path = OUT / 'assets/navigation.js'
nav = nav_path.read_text(encoding='utf-8')
match = re.search(r'  const groups = \[.*?\];', nav, re.S)
start, end = match.span()
old = nav[start:end]
if 'window.IEC61850_NAV' not in nav:
    all_items = dict(re.findall(r"\['([^']+\.html)', '([^']+)'\]", old))
else:
    all_items = {f: t for g in json.loads(old.split(' = ', 1)[1].strip().rstrip(';')) for f,t,*_ in g['items']}
for f,t,g in json.loads((OUT / 'data/learning-pages.json').read_text(encoding='utf-8')):
    all_items[f+'.html'] = t

spec = [
    ('library','标准文库',[
        ('体系与阅读基线','standard-library-overview standard-terms standard-part-7-1'),
        ('服务、类型、语义与配置','standard-part-7-2 standard-part-7-3 standard-part-7-4 standard-part-6-scl standard-model-index')]),
    ('knowledge','技术知识',[
        ('从零起步','learning-path electrical-fundamentals primary-diagrams primary-and-roles'),
        ('信号与保护','measurement-chain protection-control-fundamentals protection-ied-guide'),
        ('架构与概念','bay-and-automation-levels three-level-two-network core-concept-comparisons acsi-abstraction safety-and-test-boundaries')]),
    ('model','数据模型',[
        ('模型入门','ied-data-model data-attributes-reference acsi-common-types cdc-common-types control-input-models acsi-runtime-models ln-cdc-deep-index'),
        ('CDC 按语义查阅','cdc-status cdc-measurement cdc-control cdc-setting cdc-description cdc-units-fc cdc-attribute-dictionary'),
        ('LN 按功能查阅','ln-system ln-switch-transformer ln-measurement ln-protection ln-protection-related ln-control-generic ln-automatic ln-monitoring-equipment'),
        ('数据与建模参考','ln-values-reference ln-data-dictionary ln-extension-modeling')]),
    ('scl','SCL 配置',[
        ('文件与引用入门','engineering-files scd-in-ten-minutes scd-reading-toolbox annotated-xml-examples control-blocks-reference'),
        ('参考工程进阶','scd-model-evidence scd-acsi-evidence cdc-scd-evidence ln-scd-evidence')]),
    ('protocol','通信协议',[
        ('先服务后字段','communication-process acsi-services acsi-server-associations service-mapping packet-analysis')]),
    ('practice','工程应用',[
        ('开发与综合练习','developer-data-contracts feeder-learning-case'),
        ('工程查证与排障','engineering-model-reading engineering-practice acsi-engineering-workflows symptom-troubleshooting')]),
    ('terms','术语索引',[
        ('缩写与标准术语','abbreviation-index ln-abbreviations')]),
]
groups = []
for id,label,blocks in spec:
    items = [[f+'.html',all_items[f+'.html'],block] for block,files in blocks for f in files.split()]
    groups.append(dict(id=id,label=label,entry=items[0][0],items=items))
catalog = json.dumps(groups, ensure_ascii=False, indent=2)
nav = nav[:start] + '  const groups = ' + catalog + ';' + nav[end:]
if 'window.IEC61850_NAV' not in nav:
    insertion = '''

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
'''
    marker = "\n  const chapter = document.querySelector('main.chapter');"
    nav = nav.replace(marker, insertion+marker)
    a = nav.index('  const standardTree = ')
    b = nav.index("  const layout = document.createElement('div');",a)
    nav = nav[:a] + "  const activeTree = tree(group, current);\n  const topicTree = groups.filter(item => item !== group).map(item => tree(item, current)).join('');\n\n" + nav[b:]
    nav = nav.replace('      <a href="../index.html#terms">术语索引</a>\n','')
    # Preserve clear prerequisites when arriving from a search or deep link.
    before = "  const toggle = nav.querySelector('.nav-toggle');"
    additions = '''  const position = learningOrder.indexOf(current.replace(/\\.html$/, ''));
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

'''
    nav = nav.replace(before,additions+before)
nav_path.write_text(nav, encoding='utf-8')

# Link old conceptual pages to their prerequisites; stable IDs make this idempotent.
crosslinks = {
    'primary-and-roles': [('primary-diagrams','先看一次接线与设备功能'),('measurement-chain','再理解信号来源')],
    'bay-and-automation-levels': [('primary-diagrams','单线图入门'),('protection-control-fundamentals','保护与控制闭环')],
    'protection-ied-guide': [('protection-control-fundamentals','保护原理与动作链')],
    'ln-measurement': [('electrical-fundamentals','电气量、三相与功率入门'),('measurement-chain','采样与测量链')],
    'ied-data-model': [('learning-path','先修知识与完整路线'),('measurement-chain','数值、品质、时间的物理来源')],
    'communication-process': [('developer-data-contracts','开发人员的数据契约')],
    'engineering-practice': [('feeder-learning-case','先完成馈线静态练习'),('developer-data-contracts','数据语义与验证层次')],
    'abbreviation-index': [('learning-path','零基础学习路线'),('electrical-fundamentals','电气量与单位'),('measurement-chain','CT/VT、采样与 SOE')],
}
for file,links in crosslinks.items():
    p = OUT / 'chapters' / (file+'.html'); text = p.read_text(encoding='utf-8')
    snippet = '<section><h2 id="learning-prerequisites">入门前置与关联学习</h2><p>' + ' · '.join(f'<a href="{f}.html">{t}</a>' for f,t in links) + '</p></section>'
    text = re.sub(r'<section><h2 id="learning-prerequisites">.*?</section>', '', text, flags=re.S)
    text = text.replace('<main class="chapter">','<main class="chapter">'+snippet,1)
    p.write_text(text,encoding='utf-8')
print('Integrated shared catalog, learning pager, figure viewer and prerequisite links')

# These are foundational electrical terms, not a claim about the Part 2 glossary.
abbreviations = [
    ('CB','Circuit Breaker','断路器','primary-diagrams#devices','按额定能力开断正常与故障电流；设备位置另查反馈。'),
    ('DS','Disconnector','隔离开关','primary-diagrams#devices','提供隔离功能；开断能力须查设备额定条件。'),
    ('ES','Earthing Switch','接地开关','primary-diagrams#devices','将指定导体接地；操作受联锁和现场规程约束。'),
    ('PF','Power Factor','功率因数','electrical-fundamentals#power','通常为 P/S；非正弦时不能总等同于基波 cosφ。'),
    ('SOE','Sequence of Events','事件顺序记录','measurement-chain#time','按源事件时间与时间质量分析变化；到达顺序不是因果证明。'),
    ('CT / VT','Current Transformer / Voltage Transformer','电流 / 电压互感器','measurement-chain#transformer','核对变比、相别、极性和缩放；不与电力变压器混淆。'),
]
snippet = '<section><h2 id="electrical-abbreviations">电气基础常用缩写补充</h2><p>下列为入门助读，不声称是第 2 部分的完整标准词表。CT/VT 和 RMS 等已有条目可与这里的电气原理入口关联阅读；QF、QS 等图纸代号以项目图例为准。</p><div class="reference-table"><table><thead><tr><th>缩写</th><th>英文</th><th>中文与关联阅读</th><th>功能与边界</th></tr></thead><tbody>' + ''.join(f'<tr><td>{a}</td><td>{en}</td><td><a href="{target.split("#")[0]}.html#{target.split("#")[1]}">{zh}</a></td><td>{desc}</td></tr>' for a,en,zh,target,desc in abbreviations) + '</tbody></table></div></section>'
p = OUT/'chapters/abbreviation-index.html'; text = p.read_text(encoding='utf-8')
text = re.sub(r'<section><h2 id="electrical-abbreviations">.*?</section>', '', text, flags=re.S)
text = text.replace('</main>',snippet+'</main>')
text = text.replace('标准文库 · IEC 61850-2 第 3 章缩写导读','术语索引 · 标准缩写与电气基础助读')
p.write_text(text,encoding='utf-8')
