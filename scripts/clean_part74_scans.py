"""Remove long rules from temporary OCR images; original PDF is never changed."""
from pathlib import Path
from PIL import Image
import numpy as np
ROOT=Path(__file__).resolve().parents[1]
def running(a,n,axis):
    z=np.zeros_like(a.take([0],axis=axis),dtype=np.int32)
    c=np.concatenate([z,np.cumsum(a,axis=axis,dtype=np.int32)],axis=axis)
    hi=[slice(None)]*2;lo=hi.copy();hi[axis]=slice(n,None);lo[axis]=slice(None,-n)
    return c[tuple(hi)]-c[tuple(lo)]
def opened(a,n,axis):
    pad=[(0,0),(0,0)];pad[axis]=(n//2,n-1-n//2)
    e=running(np.pad(a,pad),n,axis)==n
    return running(np.pad(e,pad),n,axis)>0
for p in sorted((ROOT/'tmp/part74-ocr').glob('page-???.png')):
    rgb=np.array(Image.open(p).convert('RGB'))
    rgb[(rgb[:,:,0]>150)&(rgb[:,:,1]<140)&(rgb[:,:,2]<140)]=255
    a=(rgb.min(axis=2)<120)
    rules=opened(a,70,1)|opened(a,50,0)
    mask=rules.copy()
    for axis in [0,1]:
        mask|=np.roll(rules,1,axis)|np.roll(rules,-1,axis)
    rgb[mask]=255
    Image.fromarray(rgb).save(p.with_name(p.stem+'.clean.png'))
print('Prepared clean temporary scans')
