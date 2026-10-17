/* Offline browser checks for the LD/DataSet and protection design guides. */
const fs=require('node:fs'),path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require(path.join(process.env.USERPROFILE,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
const root=path.resolve(__dirname,'..'),out=path.join(root,'outputs'),dir=path.join(root,'tmp/protection-guides-preview');
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
  await page.setViewportSize({width,height:960});
  for(const [file,group,anchor] of [['nine-unifications.html','继电保护九统一','nine-items'],['common-ld-datasets.html','数据模型','trip-case']]){
   await goto('chapters/'+file);
   const layout=await page.evaluate(()=>({width:document.documentElement.scrollWidth,nav:document.querySelector('.site-nav .active')?.textContent,toc:document.querySelectorAll('.page-outline a').length,sections:document.querySelectorAll('main.chapter section>h2').length,current:document.querySelectorAll('.side-tree a.current').length,placeholders:/\{\{[A-Z_]+\}\}/.test(document.body.textContent)}));
   assert(layout.width<=width,`${file} overflow ${width}: ${layout.width}`);
   assert(layout.nav===group&&layout.current===1,`${file} navigation ${width}`);
   assert(layout.toc===layout.sections&&layout.toc>=8&&!layout.placeholders,`${file} outline/template ${width}`);
   await page.locator((width>1100?'.page-outline':'main')+' a[href="#'+anchor+'"]').first().click();assert(page.url().endsWith('#'+anchor),`${file} outline link`);
   await page.locator('.self-check summary').first().click();assert(await page.locator('.self-check').first().evaluate(e=>e.open),'answer expands');
   if(width===390){await page.locator('.nav-toggle').click();assert(await page.locator('.nav-toggle').getAttribute('aria-expanded')==='true','mobile navigation');await page.locator('.nav-toggle').click();}
   await goto('chapters/'+file);await page.screenshot({path:path.join(dir,`${file}-${width}.png`)});
   await page.locator('#'+anchor).scrollIntoViewIfNeeded();await page.screenshot({path:path.join(dir,`${anchor}-${width}.png`)});
   checks.push({file,width,...layout});
  }
  await goto('index.html');
  assert(await page.locator('.site-nav-links a[href="chapters/nine-unifications.html"]').count()===1,'home top navigation');
  assert(await page.locator('#practical-model-entry a').count()===2,'home direct links');
  assert(await page.locator('.side-tree a[href="chapters/common-ld-datasets.html"]').count()===1,'home model tree');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`home overflow ${width}`);
  for(const [query,target] of [['九统一','nine-unifications.html'],['国网九统一','nine-unifications.html'],['南网九统一','nine-unifications.html'],['虚端子','nine-unifications.html'],['dsTripInfo','common-ld-datasets.html'],['PROT','common-ld-datasets.html'],['dsAlarm','common-ld-datasets.html'],['dsSetting','common-ld-datasets.html']]){
   await page.locator('#term-search').fill(query);
   assert(await page.locator('.term-reading[href^="chapters/'+target+'#"]').count()>0,`search ${query}`);
  }
  await page.locator('#term-search').fill('dsTripInfo');
  await page.locator('.term-reading[href="chapters/common-ld-datasets.html#trip-case"]').first().click();assert(page.url().endsWith('#trip-case'),'search deep link');
  await goto('index.html');
  if(width===390)await page.locator('.nav-toggle').click();
  await page.locator('.site-nav-links a[href="chapters/nine-unifications.html"]').click();assert(page.url().endsWith('/nine-unifications.html'),'top navigation works');
 }
 for(const stem of ['ied-data-model','control-blocks-reference','object-reference','protection-ied-guide','engineering-model-reading','engineering-practice','abbreviation-index','setting-group-development']){
  await goto('chapters/'+stem+'.html');assert(await page.locator('#protection-guides a').count()===2,`related links ${stem}`);
 }
 const nojs=await browser.newContext({javaScriptEnabled:false});await nojs.setOffline(true);const fallback=await nojs.newPage();
 for(const file of ['nine-unifications.html','common-ld-datasets.html']){
  await fallback.goto(pathToFileURL(path.join(out,'chapters',file)).href);
  assert(await fallback.locator('main section>h2').count()>=8,`${file} static content`);
 }
 const report={offline:true,checks,relatedChapters:8,remoteRequests,errors};
 fs.writeFileSync(path.join(dir,'browser-report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
 await browser.close();if(errors.length||remoteRequests.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1);});
