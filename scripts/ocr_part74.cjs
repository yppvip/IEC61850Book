/* Local OCR; downloads only the public English recognition model into tmp. */
const fs=require('node:fs');const path=require('node:path');
const {createWorker,PSM}=require(path.join(process.env.USERPROFILE,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/tesseract.js'));
const root=path.resolve(__dirname,'..');const dir=path.join(root,'tmp','part74-ocr');
(async()=>{
 const worker=await createWorker('eng',1,{cachePath:dir});
 await worker.setParameters({tessedit_pageseg_mode:(process.argv[4]||'').startsWith('columns')?PSM.SINGLE_BLOCK:PSM.SPARSE_TEXT,preserve_interword_spaces:'1'});
 const start=Number(process.argv[2]||6),end=Number(process.argv[3]||113);
 for(let n=start;n<=end;n++){
  const stem='page-'+String(n).padStart(3,'0');const variant=process.argv[4]?'.'+process.argv[4]:'';const out=path.join(dir,stem+variant+'.eng.json');
  if(fs.existsSync(out))continue;
  const imageVariant=variant.startsWith('.columns')?'.columns':variant;
  if(!fs.existsSync(path.join(dir,stem+imageVariant+'.png')))continue;
  const {data}=await worker.recognize(path.join(dir,stem+imageVariant+'.png'),{}, {text:true,blocks:true});
  fs.writeFileSync(out,JSON.stringify(data));console.log('English OCR',n);
 }
 await worker.terminate();
})().catch(e=>{console.error(e);process.exitCode=1});
