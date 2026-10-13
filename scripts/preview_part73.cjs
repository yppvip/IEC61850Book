/* Local file:// rendering check with bundled Playwright and installed Edge. */
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require(path.join(process.env.USERPROFILE, '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
const root = path.resolve(__dirname, '..');
const dir = path.join(root, 'tmp', 'part73');
const names = ['standard-part-7-3', 'cdc-common-types', 'cdc-status', 'cdc-measurement', 'cdc-control', 'cdc-setting', 'cdc-description', 'cdc-attribute-dictionary', 'cdc-units-fc', 'cdc-scd-evidence'];
(async () => {
  fs.mkdirSync(dir, { recursive: true });
  const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
  const context = await browser.newContext();
  await context.setOffline(true);
  const page = await context.newPage();
  const errors = [], rows = [], requests = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('request', r => { if (!r.url().startsWith('file:') && !r.url().startsWith('data:')) requests.push(r.url()); });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 960 });
    for (const name of names) {
      await page.goto(pathToFileURL(path.join(root, 'outputs', 'chapters', name + '.html')).href);
      const data = await page.evaluate(() => ({ title: document.querySelector('h1').textContent, nav: !!document.querySelector('.site-nav'), breadcrumb: !!document.querySelector('.breadcrumb'), toc: document.querySelectorAll('.page-outline a').length, sections: document.querySelectorAll('main section > h2').length, docWidth: document.documentElement.scrollWidth, viewport: innerWidth }));
      if (!data.nav || !data.breadcrumb || data.toc !== data.sections || data.docWidth > width) errors.push(`${name} ${width}: navigation, outline or overflow ${JSON.stringify(data)}`);
      rows.push({ name, width, ...data });
      if (name === 'standard-part-7-3' || (width === 1440 && name === 'cdc-common-types')) await page.screenshot({ path: path.join(dir, name + '-' + width + '.png') });
      if (width === 390 && name === 'standard-part-7-3') {
        await page.locator('.nav-toggle').click();
        if (await page.locator('.nav-toggle').getAttribute('aria-expanded') !== 'true') errors.push('narrow menu failed');
        await page.locator('.nav-toggle').click();
      }
    }
  }
  await page.goto(pathToFileURL(path.join(root, 'outputs', 'index.html')).href);
  for (const query of ['M', 'O', 'setMag', 'SBO', 'operatorBlocked', 'SEC', 'zeroDb']) {
    await page.locator('#term-search').fill(query);
    if (!await page.locator('.term').count()) errors.push('empty term search ' + query);
    if (query === 'setMag' && !await page.locator('.term-reading[href="chapters/cdc-attribute-dictionary.html#da-setMag"]').count()) errors.push('setMag does not link to dictionary');
  }
  await page.locator('#term-search').fill('setMag');
  await page.locator('.term-reading[href="chapters/cdc-attribute-dictionary.html#da-setMag"]').click();
  if (!page.url().endsWith('#da-setMag')) errors.push('dictionary jump failed');
  const report = { offline: true, viewportWidths: [1440, 390], pageChecks: rows.length, searchChecks: 7, requests, errors, pages: rows };
  fs.writeFileSync(path.join(dir, 'browser-report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ ...report, pages: undefined }, null, 2));
  await browser.close();
  process.exitCode = errors.length || requests.length ? 1 : 0;
})().catch(error => { console.error(error); process.exitCode = 1; });
