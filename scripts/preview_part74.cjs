/* Render actual file:// documents offline with bundled Playwright / installed Edge. */
const fs=require('node:fs');const path=require('node:path');const {pathToFileURL}=require('node:url');
const {chromium}=require(path.join(process.env.USERPROFILE,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
const root=path.resolve(__dirname,'..'),out=path.join(root,'outputs'),dir=path.join(root,'tmp','part74-preview');
const names=JSON.parse(fs.readFileSync(path.join(out,'data','part74-pages.json'),'utf8')).map(p=>p[0]);
(async()=>{
 fs.mkdirSync(dir,{recursive:true});const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
 const context=await browser.newContext();await context.setOffline(true);const page=await context.newPage();const errors=[],requests=[],checks=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(!/^(file:|data:)/.test(r.url()))requests.push(r.url());});
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:960});
  for(const name of names){
   await page.goto(pathToFileURL(path.join(out,'chapters',name+'.html')).href);
   const r=await page.evaluate(()=>({title:document.querySelector('h1').textContent,nav:!!document.querySelector('.site-nav'),breadcrumb:!!document.querySelector('.breadcrumb'),toc:document.querySelectorAll('.page-outline a').length,sections:document.querySelectorAll('main section>h2').length,docWidth:document.documentElement.scrollWidth,svgClips:[...document.querySelectorAll('svg text')].filter(t=>{const b=t.getBBox(),v=t.ownerSVGElement.viewBox.baseVal;return b.x<0||b.y<0||b.x+b.width>v.width||b.y+b.height>v.height;}).map(t=>t.textContent)}));
   if(!r.nav||!r.breadcrumb||r.toc!==r.sections||r.docWidth>width||r.svgClips.length)errors.push({name,width,...r});
   checks.push({name,width,...r});
   if(['standard-part-7-4','ln-system','ln-data-dictionary','ln-measurement','ln-scd-evidence'].includes(name))await page.screenshot({path:path.join(dir,name+'-'+width+'.png')});
   if(width===1440){
    const diagramIds={'ln-system':'inherit','ln-measurement':'phasor','ln-values-reference':'rx','ln-protection':'trip74'};
    const id=diagramIds[name];
    if(id)await page.locator('svg[aria-labelledby="'+id+'-title '+id+'-desc"]').locator('..').screenshot({path:path.join(dir,id+'-diagram.png')});
   }
   if(width===390&&name==='standard-part-7-4'){
    await page.locator('.nav-toggle').click();if(await page.locator('.nav-toggle').getAttribute('aria-expanded')!=='true')errors.push('narrow menu failed');await page.locator('.nav-toggle').click();
   }
  }
 }
 await page.goto(pathToFileURL(path.join(out,'chapters/ln-data-dictionary.html')).href);
 const input=page.locator('[data-filter="dictionary"]');await input.fill('Pos');
 if(await page.locator('[data-filter-item="dictionary"]:visible').count()<4)errors.push('dictionary Pos search');
 await input.fill('unlikely-not-present');if(await page.locator('[data-filter-item="dictionary"]:visible').count()!==0)errors.push('dictionary empty search');
 await input.fill('');if(await page.locator('[data-filter-item="dictionary"]:visible').count()!==519)errors.push('dictionary restore');
 await input.fill('DiffAClc');if(await page.locator('#data-DifAClc').isHidden())errors.push('dictionary printed alias');
 await page.goto(pathToFileURL(path.join(out,'chapters/ln-abbreviations.html')).href);await page.locator('[data-filter="abbreviations"]').fill('Security');
 if(await page.locator('[data-filter-item="abbreviations"]:visible').count()<1)errors.push('abbreviation search');
 await page.goto(pathToFileURL(path.join(out,'chapters/ln-scd-evidence.html')).href+'#scd-PDIF');
 const detail=page.locator('#scd-PDIF').locator('..').locator('details').first();await detail.locator('summary').click();if(!await detail.evaluate(e=>e.open))errors.push('XML details');
 await page.goto(pathToFileURL(path.join(out,'index.html')).href);
 for(const query of ['PDIS','MMTR','ChNum','BlkCls','ISI','PhyNam','LivDeaMod','PmpCtl','SPl']){
  await page.locator('#term-search').fill(query);if(!await page.locator('.term').count())errors.push('term search '+query);
 }
 await page.locator('#term-search').fill('LivDeaMod');await page.locator('.term-reading[href="chapters/ln-data-dictionary.html#data-LivDeaMod"]').first().click();
 if(!page.url().endsWith('#data-LivDeaMod'))errors.push('term dictionary link');
 const report={offline:true,pageChecks:checks.length,viewports:[1440,390],requests,errors,checks};fs.writeFileSync(path.join(dir,'browser-report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({...report,checks:undefined},null,2));await browser.close();if(errors.length||requests.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
