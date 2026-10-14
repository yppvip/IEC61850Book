"""Render supplied scan locally for OCR/visual verification (not published assets)."""
from pathlib import Path
import pypdfium2 as pdfium
ROOT=Path(__file__).resolve().parents[1]
out=ROOT/'tmp/part74-ocr';out.mkdir(parents=True,exist_ok=True)
doc=pdfium.PdfDocument(r'E:/IEC61850标准[中文.完整版]/860[1].7-4.pdf')
for i in range(len(doc)):
    target=out/f'page-{i+1:03}.png'
    if not target.exists():
        doc[i].render(scale=2.4).to_pil().save(target)
print('Rendered',len(doc),'pages')
