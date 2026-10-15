/* Offline file:// verification of the ObjectReference guide and shared entry points. */
const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const {chromium} = require(path.join(process.env.USERPROFILE, '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
const root = path.resolve(__dirname, '..'), out = path.join(root, 'outputs');
const dir = path.join(root, 'tmp/object-reference-preview');
const errors = [], remoteRequests = [], checks = [];
function assert(ok, message) { if (!ok) errors.push(message); }
(async () => {
  fs.mkdirSync(dir, {recursive: true});
  const browser = await chromium.launch({executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true});
  const context = await browser.newContext();
  await context.setOffline(true);
  const page = await context.newPage();
  page.on('pageerror', e => errors.push(e.message));
  page.on('request', r => { if (!/^(file:|data:)/.test(r.url())) remoteRequests.push(r.url()); });
  const goto = f => page.goto(pathToFileURL(path.join(out, f)).href);
  for (const width of [1440, 960, 390]) {
    await page.setViewportSize({width, height: 960});
    await goto('chapters/object-reference.html');
    const layout = await page.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      nav: document.querySelector('.site-nav .active')?.textContent,
      breadcrumb: document.querySelector('.breadcrumb')?.textContent,
      toc: document.querySelectorAll('.page-outline a').length,
      sections: document.querySelectorAll('main.chapter section>h2').length,
      current: document.querySelectorAll('.side-tree a.current').length,
      placeholders: /\{\{[A-Z]+\}\}/.test(document.body.textContent),
    }));
    assert(layout.width <= width, `guide overflow at ${width}: ${layout.width}`);
    assert(layout.nav === '数据模型' && layout.breadcrumb.includes('对象引用'), 'guide navigation classification');
    assert(layout.current === 1 && layout.toc === layout.sections, 'guide tree / table of contents');
    assert(!layout.placeholders, 'unfilled template token');
    const tocLink = page.locator('.page-outline a[href="#dataset"]');
    if (await tocLink.isVisible()) await tocLink.click();
    else await page.locator('.object-reference-shortcuts a[href="#dataset"]').click();
    assert(page.url().endsWith('#dataset'), 'table of contents anchor');
    const self = page.locator('.self-check').first();
    await self.locator('summary').click();
    assert(await self.evaluate(e => e.open), 'self-check answer expansion');
    await page.locator('.diagram-open').click();
    assert(await page.locator('dialog').isVisible(), 'diagram enlargement');
    await page.keyboard.press('Escape');
    await page.locator('dialog').waitFor({state: 'detached'});
    assert(await page.locator('dialog').count() === 0, 'diagram closes on Escape');
    await goto('chapters/object-reference.html');
    await page.screenshot({path: path.join(dir, `guide-${width}.png`), fullPage: true});
    await page.screenshot({path: path.join(dir, `guide-top-${width}.png`)});
    if (width === 390) {
      await page.locator('.nav-toggle').click();
      assert(await page.locator('.nav-toggle').getAttribute('aria-expanded') === 'true', 'mobile menu');
    }
    await goto('index.html');
    assert(await page.locator('#object-reference-entry a').count() === 1, 'homepage direct entry');
    assert(await page.locator('.side-tree a[href="chapters/object-reference.html"]').count() === 1, 'home knowledge tree');
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'homepage overflow');
    for (const query of ['对象引用', 'ObjectReference', 'PROT/PDIS1.Str.general', 'LDName', 'FCDA', 'MMS对象名', 'ExtRef']) {
      await page.locator('#term-search').fill(query);
      assert(await page.locator('.term-reading[href^="chapters/object-reference.html"]').count() > 0, `search ${query}`);
    }
    await page.locator('#term-search').fill('PROT/PDIS1.Str.general');
    await page.locator('.term-reading[href="chapters/object-reference.html#overview"]').click();
    assert(page.url().endsWith('object-reference.html#overview'), 'search deep link');
    await page.locator('.learning-pager [rel=prev]').click();
    assert(page.url().endsWith('ied-data-model.html'), 'learning previous');
    await page.locator('.learning-pager [rel=next]').click();
    assert(page.url().endsWith('object-reference.html'), 'learning next into guide');
    checks.push({width, ...layout});
  }
  for (const stem of ['ied-data-model', 'acsi-common-types', 'scd-reading-toolbox', 'scd-in-ten-minutes', 'developer-data-contracts', 'engineering-model-reading', 'control-blocks-reference', 'ln-protection']) {
    await goto('chapters/' + stem + '.html');
    assert(await page.locator('#object-reference-guide + p a').count() === 1, `cross link ${stem}`);
  }
  const report = {offline: true, checks, relatedChapters: 8, remoteRequests, errors};
  fs.writeFileSync(path.join(dir, 'browser-report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
  if (errors.length || remoteRequests.length) process.exitCode = 1;
})().catch(e => {console.error(e); process.exit(1);});
