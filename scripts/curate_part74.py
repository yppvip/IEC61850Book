"""Prepare structured review candidates from local scan recognition. Not used by web pages."""
from pathlib import Path
import json,re,difflib
from collections import defaultdict
from part74_catalog import ROSTER,ABBR_NAMES
from extract_part74_tables import bounds,words,cell
ROOT=Path(__file__).resolve().parents[1];DIR=ROOT/'tmp/part74-ocr'
def eng_words(n,variant):
 r=json.loads((DIR/f'page-{n:03}.{variant}.eng.json').read_text());v=[]
 for b in r['blocks']:
  for p in b['paragraphs']:
   for l in p['lines']:
    for w in l['words']:
     q=w['bbox'];v.append((w['text'],(q['x0']+q['x1'])/2,(q['y0']+q['y1'])/2))
 return v
def clean(t):return re.sub('[^A-Za-z0-9]','',t)
data=[]
for n in range(79,103):
 ws=eng_words(n,'columns7');zs=words(n,'zh');b=bounds(n)
 for (y0,x0,x1),(y1,_,_) in zip(b,b[1:]):
  name=clean(cell(ws,0,260,y0+2,y1-2));desc=cell(zs,325,1130,y0+2,y1-2,True)
  if name and desc and re.match('[A-Za-z]',name):data.append(dict(name=name,desc=desc,page=n,y0=y0,y1=y1))
fields=[]
for n in range(15,79):
 if n==72:continue
 ws=eng_words(n,'columns7');zs=words(n,'zh');b=bounds(n)
 for (y0,x0,x1),(y1,_,_) in zip(b,b[1:]):
  name=clean(cell(ws,0,330,y0+2,y1-2));cdc=clean(cell(ws,330,500,y0+2,y1-2));flags=cell(ws,545,760,y0+2,y1-2)
  desc=cell(zs,510,970,y0+2,y1-2,True)
  if not name or not cdc or len(name)>24 or len(cdc)>7 or cdc in ['R533','msas','W533','ms33','M533']:continue
  current=[r for r in ROSTER if (r['page'],r['y'])<=(n,y0)]
  if not current:continue
  owner=current[-1]['name']
  if n in [17,18] and y0>500:continue
  fields.append(dict(ln=owner,name=name,cdc=cdc,flags=flags,desc=desc,page=n,y0=y0,y1=y1))
abbr=[]
for n,names in ABBR_NAMES.items():
 names=names.split();start,end={6:(1427,1594),7:(192,1590),8:(191,1590),9:(198,1590),10:(193,1593),11:(200,1592),12:(188,1587),13:(196,463)}[n]
 ws=words(n,'eng');zs=words(n,'zh');step=(end-start)/(len(names)-1)
 for k,name in enumerate(names):
  y=start+k*step
  en=cell(ws,270,690 if n in [6,7,8] else 735,y-2,y+29)
  zh=cell(zs,680 if n in [6,7,8] else 735,1140,y-2,y+29,True)
  abbr.append(dict(name=name,en=en,zh=zh,page=n))
result={'fields':fields,'data':data,'abbreviations':abbr}
(DIR/'candidates.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
for ln in [r['name'] for r in ROSTER]:
 fs=[f for f in fields if f['ln']==ln]
 print(ln,':',' '.join(f"{f['name']}:{f['cdc']}[{f['flags']}]" for f in fs))
print('DATA',len(data),'ABBR',len(abbr),'FIELDS',len(fields))
