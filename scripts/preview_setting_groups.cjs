/* Verify the static guide, shared navigation, search, and offline rendering. */
const fs=require('node:fs'),path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(path.join(process.env.USERPROFILE,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
const root=path.resolve(__dirname,'..'),out=path.join(root,'outputs'),dir=path.join(root,'tmp/setting-group-preview');
const errors=[],remoteRequests=[],checks=[];
const assert=(ok,msg)=>{if(!ok)errors.push(msg);};
(async()=>{
 fs.mkdirSync(dir,{recursive:true});
 const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
 const context=await browser.newContext();await context.setOffline(true);
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 page.on('request',r=>{if(!/^(file:|data:)/.test(r.url()))remoteRequests.push(r.url());});
 const goto=f=>page.goto(pathToFileURL(path.join(out,f)).href);
 for(const width of [1440,960,390]){
  await page.setViewportSize({width,height:960});await goto('chapters/setting-group-development.html');
  const layout=await page.evaluate(()=>({width:document.documentElement.scrollWidth,nav:document.querySelector('.site-nav .active')?.textContent,breadcrumb:document.querySelector('.breadcrumb')?.textContent,toc:document.querySelectorAll('.page-outline a').length,sections:document.querySelectorAll('main.chapter section>h2').length,current:document.querySelectorAll('.side-tree a.current').length,figures:document.querySelectorAll('main figure svg').length,placeholders:/\{\{[A-Z]+\}\}/.test(document.body.textContent)}));
  assert(layout.width<=width,`guide overflow ${width}: ${layout.width}`);
  assert(layout.nav==='工程应用'&&layout.breadcrumb.includes('修改定值'),`guide classification ${width}`);
  assert(layout.current===1&&layout.toc===13&&layout.sections===13,`tree/toc ${width}`);
  assert(layout.figures===4&&!layout.placeholders,`figures/template ${width}`);
  await page.locator('.setting-shortcuts a[href="#grid-differences"]').click();assert(page.url().endsWith('#grid-differences'),'guide shortcut');
  await page.locator('.self-check summary').first().click();assert(await page.locator('.self-check').first().evaluate(e=>e.open),'answer expands');
  await page.locator('.diagram-open').first().click();assert(await page.locator('dialog').isVisible(),'diagram opens');
  await page.keyboard.press('Escape');await page.locator('dialog').waitFor({state:'detached'});
  if(width===390){await page.locator('.nav-toggle').click();assert(await page.locator('.nav-toggle').getAttribute('aria-expanded')==='true','mobile nav');await page.locator('.nav-toggle').click();}
  await goto('chapters/setting-group-development.html');await page.screenshot({path:path.join(dir,`guide-top-${width}.png`)});
  for(const section of ['objects','edit-flow','grid-differences']){
   await page.locator('#'+section).scrollIntoViewIfNeeded();await page.screenshot({path:path.join(dir,`${section}-${width}.png`)});
  }
  await goto('index.html');assert(await page.locator('#setting-group-entry a').count()===1,'home direct link');
  assert(await page.locator('.side-tree a[href="chapters/setting-group-development.html"]').count()===1,'home tree');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`home overflow ${width}`);
  for(const query of ['修改定值','切换定值组','SGCB','SelectEditSG','CnfEdit','国家电网','南方电网','31区','定值超时']){
   await page.locator('#term-search').fill(query);
   assert(await page.locator('.term-reading[href^="chapters/setting-group-development.html"]').count()>0,`search ${query}`);
  }
  await page.locator('#term-search').fill('修改定值');await page.locator('.term-reading[href="chapters/setting-group-development.html#edit-flow"]').click();assert(page.url().endsWith('#edit-flow'),'search anchor');
  await page.locator('.learning-pager [rel=prev]').click();assert(page.url().endsWith('developer-data-contracts.html'),'learning previous');
  await page.locator('.learning-pager [rel=next]').click();assert(page.url().endsWith('setting-group-development.html'),'learning next');
  checks.push({width,...layout});
 }
 for(const stem of ['acsi-runtime-models','cdc-setting','acsi-services','control-blocks-reference','developer-data-contracts','engineering-practice','service-mapping','abbreviation-index']){
  await goto('chapters/'+stem+'.html');assert(await page.locator('#setting-group-guide + p a').count()===1,`cross link ${stem}`);
 }
 // Core content and diagrams remain available with scripts disabled.
 const nojs=await browser.newContext({javaScriptEnabled:false});await nojs.setOffline(true);const fallback=await nojs.newPage();
 await fallback.goto(pathToFileURL(path.join(out,'chapters/setting-group-development.html')).href);
 assert(await fallback.locator('main section>h2').count()===13&&await fallback.locator('figure svg').count()===4,'static no-JS content');
 const report={offline:true,checks,relatedChapters:8,remoteRequests,errors};fs.writeFileSync(path.join(dir,'browser-report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));await browser.close();if(errors.length||remoteRequests.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1);});
