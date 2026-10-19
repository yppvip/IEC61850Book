/* Direct file:// validation in offline Edge. No web server is needed. */
const fs=require('node:fs'),path=require('node:path'),{pathToFileURL}=require('node:url');
const {chromium}=require(path.join(process.env.USERPROFILE,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
const root=path.resolve(__dirname,'..'),out=path.join(root,'outputs'),dir=path.join(root,'tmp/packet-teaching/browser');
const errors=[],requests=[],checks=[];const assert=(ok,msg)=>{if(!ok)errors.push(msg);};
const stems=['packet-analysis','packet-mms','packet-goose','packet-sv','packet-scd-mapping','packet-cases','packet-capacity'];
(async()=>{
 fs.mkdirSync(dir,{recursive:true});const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
 const context=await browser.newContext();await context.setOffline(true);const page=await context.newPage();
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(!/^(file:|data:)/.test(r.url()))requests.push(r.url());});
 const goto=f=>page.goto(pathToFileURL(path.join(out,f)).href);
 for(const width of [1440,960,390]){
  await page.setViewportSize({width,height:960});
  for(const stem of stems){
   await goto('chapters/'+stem+'.html');
   const state=await page.evaluate(()=>({width:document.documentElement.scrollWidth,active:document.querySelector('.site-nav-links .active')?.textContent,current:document.querySelectorAll('.side-tree a.current').length,headings:document.querySelectorAll('main section>h2').length,toc:document.querySelectorAll('.page-outline a').length}));
   assert(state.width<=width,`${stem}: overflow ${width} / ${state.width}`);assert(state.active==='报文解析'&&state.current===1,`${stem}: navigation`);assert(state.headings===state.toc,`${stem}: toc`);checks.push({stem,width,...state});
   await page.locator('.page-outline a[href="#sources"]').evaluate(e=>e.click());assert(page.url().endsWith('#sources'),`${stem}: anchor`);
   if(stem==='packet-goose'){
    const box=page.locator('.packet-workbench').first();await box.scrollIntoViewIfNeeded();
    await box.locator('.packet-field-list button').filter({hasText:'成员1 · XCBR1.Pos.stVal'}).click();
    assert(await box.locator('.packet-hex .selected').count()===4,'Dbpos highlights 4 octets');
    assert(await box.locator('.packet-hex').evaluate(h=>{const b=h.querySelector('.selected');return b.offsetTop>=h.scrollTop&&b.offsetTop+b.offsetHeight<=h.scrollTop+h.clientHeight;}),'selected byte scrolls into Hex viewport');
    assert((await box.locator('.packet-detail').innerText()).includes('FCDA[1]'),'SCD field detail');
    await box.locator('select').selectOption('goose-close');assert((await box.locator('.packet-state-status').innerText()).includes('stNum：7 → 8'),'state counters diff');
    await box.locator('.packet-field-list button').filter({hasText:'成员1 · XCBR1.Pos.stVal'}).click();
    assert((await box.locator('.packet-detail pre').innerText())==='84 02 06 80','closed Dbpos byte change');
    await box.locator('.packet-hex button').nth(17).click();assert((await box.locator('.packet-detail h3').innerText())==='Length','hex reverse points to Length');
    await box.locator('select').selectOption('goose-retransmit');assert((await box.locator('.packet-state-status').innerText()).includes('sqNum：0 → 1'),'retransmit diff');
    await box.locator('.packet-layers button').filter({hasText:/^Data$/}).click();assert(await box.locator('.packet-field-list button').count()===3,'Data layer');
    await box.screenshot({path:path.join(dir,'goose-widget-'+width+'.png')});
   }
   if(stem==='packet-sv'){
    const box=page.locator('.packet-workbench');await box.locator('select').selectOption('sv-two');
    assert(await box.locator('.packet-field-list button').filter({hasText:/^ASDU [12]$/}).count()===2,'twoASDU field tree');
    await box.locator('.packet-field-list button').filter({hasText:'IA value'}).first().click();assert(await box.locator('.packet-hex .selected').count()===4,'SV int32 byte selection');
   }
   if(stem==='packet-scd-mapping'){
    await page.locator('.mapping-steps button').filter({hasText:'报文字段'}).click();assert(await page.locator('.mapping-detail:visible').count()===1,'mapping step');assert((await page.locator('.mapping-detail:visible').innerText()).includes('0x1001'),'mapping payload');
   }
   if(stem==='packet-cases'){await page.locator('.self-check summary').first().click();assert(await page.locator('.self-check').first().evaluate(e=>e.open),'answer expands');}
   if(width===390){await page.locator('.nav-toggle').click();assert(await page.locator('.nav-toggle').getAttribute('aria-expanded')==='true','mobile menu');await page.locator('.nav-toggle').click();}
   if(stem==='packet-analysis'||stem==='packet-scd-mapping'){await goto('chapters/'+stem+'.html');await page.screenshot({path:path.join(dir,stem+'-'+width+'.png')});}
  }
  await goto('index.html');assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'home overflow '+width);
  assert(await page.locator('.site-nav-links a[href="chapters/packet-analysis.html"]').count()===1,'home top entry');
  for(const [query,target] of [['报文解析','packet-analysis'],['InvokeID','packet-mms'],['stNum','packet-goose'],['seqData','packet-sv'],['SCD报文映射','packet-scd-mapping'],['报文容量','packet-capacity']]){
   await page.locator('#term-search').fill(query);assert(await page.locator('.term-reading[href^="chapters/'+target+'.html"]').count()>0,'term search '+query);
  }
  await page.locator('#term-search').fill('报文容量');await page.locator('.term-reading[href^="chapters/packet-capacity.html"]').first().click();assert(page.url().endsWith('#meaning'),'term deep link');
 }
 const nojs=await browser.newContext({javaScriptEnabled:false});await nojs.setOffline(true);const fallback=await nojs.newPage();
 for(const stem of stems){await fallback.goto(pathToFileURL(path.join(out,'chapters',stem+'.html')).href);assert(await fallback.locator('main section>h2').count()>=6,stem+' static正文');assert(await fallback.locator('.breadcrumb').count()>0,stem+' static breadcrumb');}
 await fallback.goto(pathToFileURL(path.join(out,'chapters/packet-mms.html')).href);assert(await fallback.locator('.packet-static pre').count()===2,'noJS full request response');
 const report={offline:true,fileProtocol:true,layoutChecks:checks.length,checks,remoteRequests:requests,errors};fs.writeFileSync(path.join(dir,'browser-report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({layoutChecks:checks.length,remoteRequests:requests,errors},null,2));
 await browser.close();if(errors.length||requests.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1);});
