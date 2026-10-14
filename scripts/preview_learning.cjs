/* Real file:// regression check using bundled Playwright and installed Edge. */
const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const {chromium} = require(path.join(process.env.USERPROFILE,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
const root = path.resolve(__dirname,'..'), out = path.join(root,'outputs'), dir = path.join(root,'tmp/learning-preview');
const learning = JSON.parse(fs.readFileSync(path.join(out,'data/learning-pages.json'),'utf8')).map(p => p[0]+'.html');
const chapters = fs.readdirSync(path.join(out,'chapters')).filter(f => f.endsWith('.html') && f !== 'packet-parser.html');
const errors = [], requests = [], checks = [], clips = [];
function assert(ok, message) { if (!ok) errors.push(message); }
(async () => {
  fs.mkdirSync(dir,{recursive:true});
  const browser = await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
  const context = await browser.newContext(); await context.setOffline(true);
  const page = await context.newPage();
  page.on('pageerror', e => errors.push(e.message));
  page.on('request', r => { if (!/^(file:|data:)/.test(r.url())) requests.push(r.url()); });
  const goto = async f => page.goto(pathToFileURL(path.join(out,f)).href);
  for (const width of [1440,960,390]) {
    await page.setViewportSize({width,height:960});
    for (const name of ['index.html',...chapters.map(f => 'chapters/'+f)]) {
      await goto(name);
      const result = await page.evaluate(() => {
        const t = [...document.querySelectorAll('svg text')];
        return {
          width:document.documentElement.scrollWidth,
          nav:!!document.querySelector('.site-nav'), breadcrumb:!!document.querySelector('.breadcrumb'),
          toc:document.querySelectorAll('.page-outline a').length, sections:document.querySelectorAll('main.chapter section>h2').length,
          stroked:t.filter(e => getComputedStyle(e).stroke !== 'none').map(e => e.textContent),
          clipped:t.filter(e => { const b=e.getBBox(),v=e.ownerSVGElement.viewBox.baseVal; return b.x < -1 || b.y < -1 || b.x+b.width > v.width+1 || b.y+b.height > v.height+1; }).map(e => e.textContent),
          missingLinks:[...document.querySelectorAll('.side-tree a,.learning-pager a,.site-nav a')].map(e => e.getAttribute('href')),
        };
      });
      assert(result.width <= width,`${name} ${width}: document overflow ${result.width}`);
      assert(result.nav && result.breadcrumb,`${name}: navigation/breadcrumb`);
      if (name !== 'index.html') assert(result.sections === result.toc,`${name}: table of contents`);
      assert(!result.stroked.length,`${name}: stroked SVG text ${result.stroked.join(',')}`);
      if (result.clipped.length) clips.push({name,width,labels:result.clipped});
      for (const href of result.missingLinks) {
        if (!href || href.startsWith('#')) continue;
        const target = path.resolve(path.dirname(path.join(out,name)),href.split('#')[0]);
        assert(fs.existsSync(target),`${name}: broken navigation ${href}`);
      }
      checks.push({name,width,documentWidth:result.width});
      if ((learning.includes(path.basename(name)) || name === 'index.html') && width !== 960)
        await page.screenshot({path:path.join(dir,path.basename(name,'.html')+'-'+width+'.png'),fullPage:true});
      if (name === 'chapters/standard-library-overview.html') {
        const fig = page.locator('.interface-figure');
        await fig.screenshot({path:path.join(dir,'interfaces-'+width+'.png')});
        const p = fig.locator('..');
        if (width === 390) {
          await fig.locator('.diagram-open').click();
          assert(await page.locator('dialog').isVisible(),'figure dialog missing');
          const svg = page.locator('dialog svg');
          const before = await svg.evaluate(e => e.getBoundingClientRect().width);
          await page.getByRole('button',{name:'放大',exact:true}).click();
          assert(await svg.evaluate(e => e.getBoundingClientRect().width) > before,'figure zoom failed');
          await page.screenshot({path:path.join(dir,'interfaces-dialog-390.png')});
          const duplicateIds = await page.evaluate(() => { const ids=[...document.querySelectorAll('[id]')].map(e=>e.id); return ids.filter((v,i)=>ids.indexOf(v)!==i); });
          assert(!duplicateIds.length,'duplicate IDs in enlarged diagram');
          await page.keyboard.press('Escape');
          assert(await page.locator('dialog').count() === 0,'dialog Escape close failed');
          assert(await fig.locator('.diagram-open').evaluate(e => e === document.activeElement),'dialog focus restore failed');
        }
      }
    }
    await goto('index.html');
    const catalog = await page.evaluate(() => ({ groups:window.IEC61850_NAV.groups, order:window.IEC61850_NAV.learningOrder }));
    const files = catalog.groups.flatMap(g => g.items.map(i=>i[0]));
    assert(files.length === new Set(files).size,'catalog duplicates');
    assert(chapters.every(f => files.includes(f)),'chapter missing from shared catalog');
    assert(catalog.order.every(f => files.includes(f+'.html')),'learning order references missing chapter');
    assert(await page.locator('.site-nav-links a').count() === 8,'top level navigation count');
    for (const query of ['线电压','CT 变比','SOE','跳闸闭环','数据契约','XCBR','FCDA','LivDeaMod']) {
      await page.locator('#term-search').fill(query);
      assert(await page.locator('.term').count() > 0,'search missing '+query);
      assert(await page.locator('#terms').isVisible(),'results hidden '+query);
    }
    await page.locator('#term-search').fill('CT 变比');
    await page.locator('a.term-reading[href="chapters/measurement-chain.html#transformer"]').click();
    assert(page.url().endsWith('#transformer'),'new term deep link');
    await page.locator('.learning-pager [rel=next]').click();
    assert(page.url().endsWith('protection-control-fundamentals.html'),'learning next link');
    const self = page.locator('.self-check').first(); await self.locator('summary').click();
    assert(await self.evaluate(e=>e.open),'self-check expansion failed');
    if (width === 390) {
      await page.locator('.nav-toggle').click();
      assert(await page.locator('.nav-toggle').getAttribute('aria-expanded') === 'true','mobile menu');
      await page.locator('.site-nav-links a').filter({hasText:'SCL 配置'}).click();
      assert(page.url().endsWith('engineering-files.html'),'SCL entry should begin with files');
    }
  }
  // All SVG labels should remain within their own viewBox.
  assert(!clips.length,'SVG label clipping: '+JSON.stringify(clips));
  const report = {offline:true,pageChecks:checks.length,viewports:[1440,960,390],remoteRequests:requests,errors,clips,checks};
  fs.writeFileSync(path.join(dir,'browser-report.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify({...report,checks:undefined},null,2));
  await browser.close();
  if (errors.length || requests.length) process.exitCode=1;
})().catch(e => { console.error(e); process.exitCode=1; });
