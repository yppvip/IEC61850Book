"""Geometric OCR preparation and private review tables. Published data is curated separately."""
from pathlib import Path
import json
import numpy as np
from PIL import Image
ROOT=Path(__file__).resolve().parents[1];DIR=ROOT/'tmp/part74-ocr'
def bounds(n):
    im=Image.open(DIR/f'page-{n:03}.png').convert('RGB');im=im.resize((1205,1760))
    a=np.asarray(im).min(2)<115
    band=a.copy()
    for d in range(1,5):band|=np.roll(a,d,0)|np.roll(a,-d,0)
    ys=np.where((band[:,60:1160].sum(1)>820)&(np.arange(1760)>180)&(np.arange(1760)<1630))[0]
    groups=[]
    for y in ys:
        if not groups or y-groups[-1][-1]>4:groups.append([int(y)])
        else:groups[-1].append(int(y))
    result=[]
    for g in groups:
        xs=np.where(a[max(0,g[0]-1):g[-1]+2].any(0))[0];xs=xs[(xs>65)&(xs<1170)]
        result.append((round(sum(g)/len(g)),int(xs.min()),int(xs.max())))
    return result
def words(n,kind):
    suffix='.clean.eng.json' if kind=='eng' else '.json'
    p=DIR/f'page-{n:03}{suffix}'
    if not p.exists():return []
    r=json.loads(p.read_text(encoding='utf-8-sig'));scale=1205/Image.open(DIR/f'page-{n:03}.png').width
    result=[]
    if kind=='eng':
        for b in r['blocks']:
            for pa in b['paragraphs']:
                for l in pa['lines']:
                    for w in l['words']:
                        box=w['bbox'];result.append((w['text'],(box['x0']+box['x1'])/2*scale,(box['y0']+box['y1'])/2*scale))
    else:
        for l in r['lines']:
            for w in l['words']:result.append((w['text'],(w['x']+w['width']/2)*scale,(w['y']+w['height']/2)*scale))
    return result
def cell(ws,x0,x1,y0,y1,zh=False):
    v=[w for w in ws if x0<w[1]<x1 and y0<w[2]<y1]
    v.sort(key=lambda w:w[2]);lines=[]
    for w in v:
        if not lines or abs(w[2]-sum(vv[2] for vv in lines[-1])/len(lines[-1]))>12:lines.append([w])
        else:lines[-1].append(w)
    return ('' if zh else ' ').join(w[0] for line in lines for w in sorted(line,key=lambda v:v[1]))
rows=[]
for n in range(15,103):
    if n==72:continue # duplicate print page 58; missing print page 68
    b=bounds(n);im=Image.open(DIR/f'page-{n:03}.clean.png').resize((1205,1760)).convert('RGB')
    if n<79:
        # Restrict to technical columns: names, CDC, T and M/O.
        left=round(np.median([v[1] for v in b])) if b else 100
        right=round(np.median([v[2] for v in b])) if b else 1100
        width=right-left
        strip=Image.new('RGB',(780,1760),'white')
        cols=[(60,360,10),(360,510,340),(970,1150,550)]
        for x0,x1,dest in cols:
            strip.paste(im.crop((int(x0),185,int(x1),1615)),(dest,185))
        strip.save(DIR/f'page-{n:03}.columns.png')
    else:
        im.crop((60,0,320,1760)).save(DIR/f'page-{n:03}.columns.png')
    ws=words(n,'eng');zs=words(n,'zh')
    for (y0,left,right),(y1,_,_) in zip(b,b[1:]):
        if y1-y0>800:continue
        width=right-left
        if n<79:
            edges=[left,left+.25*width,left+.4*width,left+.89*width,left+.93*width,right+5]
            cs=[cell(ws,edges[k]+2,edges[k+1]-2,y0+2,y1-2) for k in range(5)]
            zhcs=[cell(zs,edges[k]+2,edges[k+1]-2,y0+2,y1-2,True) for k in range(5)]
            rows.append(dict(page=n,y0=y0,y1=y1,cells=cs,zh=zhcs))
        else:
            edge=left+.225*width
            rows.append(dict(page=n,y0=y0,y1=y1,cells=[cell(ws,left+2,edge-2,y0+2,y1-2),cell(zs,edge+2,right-3,y0+2,y1-2,True)]))
(DIR/'review-rows.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf-8')
print('Review rows',len(rows))
