"""Static checks for offline pages; no browser, XSD or device validation."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import re,xml.etree.ElementTree as ET,json,subprocess
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'outputs';errors=[]
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__(convert_charrefs=True);self.ids=set();self.links=[];self.tables=0;self.feed(text)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:
   if a['id'] in self.ids:errors.append('duplicate ID '+a['id'])
   self.ids.add(a['id'])
  if tag=='table':self.tables+=1
  for key in ('href','src'):
   if key in a:self.links.append((tag,key,a[key]))
texts={p:p.read_text(encoding='utf-8-sig') for p in [OUT/'index.html',*sorted((OUT/'chapters').glob('*.html'))]}
pages={p:Page(t) for p,t in texts.items()}
for path,page in pages.items():
 for tag,key,value in page.links:
  u=urlsplit(value)
  if u.scheme or u.netloc:
   if key=='src' or tag=='link':errors.append(f'{path.name}: remote resource {value}')
   continue
  target=(path.parent/unquote(u.path)).resolve() if u.path else path
  if not target.exists():errors.append(f'{path.name}: missing {value}');continue
  if u.fragment and target in pages and unquote(u.fragment) not in pages[target].ids:
   # Index terms and navigation headings are populated from local JS.
   if target!=OUT/'index.html':errors.append(f'{path.name}: missing anchor {value}')
new=['standard-part-7-2','acsi-abstraction','acsi-common-types','acsi-server-associations','acsi-runtime-models','scd-acsi-evidence','acsi-engineering-workflows']
part73=['standard-part-7-3','cdc-common-types','cdc-status','cdc-measurement','cdc-control','cdc-setting','cdc-description','cdc-attribute-dictionary','cdc-units-fc','cdc-scd-evidence']
new+=part73
part74=[p[0] for p in json.loads((OUT/'data/part74-pages.json').read_text(encoding='utf-8'))] if (OUT/'data/part74-pages.json').exists() else []
new+=part74
learning=[p[0] for p in json.loads((OUT/'data/learning-pages.json').read_text(encoding='utf-8'))]
new+=learning
svg_count=xml_count=table_count=0
for stem in new:
 path=OUT/'chapters'/f'{stem}.html';text=texts[path];table_count+=pages[path].tables
 for raw in re.findall(r'<svg\b.*?</svg>',text,re.S):
  try:
   svg=ET.fromstring(raw);svg_count+=1
   ids={e.get('id') for e in svg.iter() if e.get('id')}
   for e in svg.iter():
    for v in e.attrib.values():
     for anchor in re.findall(r'url\(#([^)]*)\)',v):
      if anchor not in ids:errors.append(f'{stem}: SVG reference {anchor}')
  except ET.ParseError as exc:errors.append(f'{stem}: SVG {exc}')
 for raw in re.findall(r'<pre data-language="xml"><code>(.*?)</code></pre>',text,re.S):
  import html
  try:ET.fromstring(html.unescape(raw));xml_count+=1
  except ET.ParseError as exc:errors.append(f'{stem}: XML example {exc}')
node=Path.home()/'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe'
js="global.window={};require('./outputs/data/terms.js');require('./outputs/data/part72-terms.js');require('./outputs/data/part73-terms.js');"+("require('./outputs/data/part74-terms.js');" if part74 else '')+"require('./outputs/data/learning-terms.js');process.stdout.write(JSON.stringify(window.IEC61850_TERMS));"
terms=json.loads(subprocess.check_output([str(node),'-e',js],cwd=ROOT))
ids=[t['id'] for t in terms]
if len(ids)!=len(set(ids)):errors.append('duplicate term IDs')
required='AA ACSI BRCB CDC DAType DataRef dchg dupd FC FCD FCDA GI intgPd LCB qchg SBO SCL SG SGCB TrgOp URCB M O C SP RMS SI BDA SDO'.split()
for word in required:
 matching=[t for t in terms if word in t.get('aliases',[]) or word==t.get('en')]
 if not matching:errors.append('missing term '+word)
 if not re.search(r'<td>'+re.escape(word)+r'</td>',texts[OUT/'chapters/abbreviation-index.html']):errors.append('missing abbreviation row '+word)
for t in terms:
 if t.get('href'):
  u=urlsplit(t['href']);target=(OUT/unquote(u.path)).resolve()
  if not target.exists() or (u.fragment and target in pages and unquote(u.fragment) not in pages[target].ids):errors.append('invalid term link '+t['id'])
 if t['id'].startswith(('acsi72-','part72-','part73-','cdc-','da-','fc-','presence-')):
  for rel in t.get('related',[]):
   if rel not in ids:errors.append(f"{t['id']}: missing related {rel}")
for f in [OUT/'assets/navigation.js',OUT/'assets/home.js',OUT/'assets/app.js',OUT/'data/learning-terms.js',OUT/'data/part72-terms.js',OUT/'data/part73-terms.js']+([OUT/'assets/part74.js',OUT/'data/part74-terms.js'] if part74 else []):
 subprocess.run([str(node),'--check',str(f)],check=True)
evidence=json.loads((OUT/'data/part72-evidence.json').read_text(encoding='utf-8'))
from part73_data import CDC,DICTIONARY,CONDITIONS
part73_data=json.loads((OUT/'data/part73-evidence.json').read_text(encoding='utf-8'))
expected={'baseline_cdc_count':29,'table49_unique_names':116,'unit_rows':58,'multiplier_prefixes':20,'fc_rows':18,'do_types':735}
for key,val in expected.items():
 if part73_data.get(key)!=val:errors.append('7-3 evidence coverage '+key)
if len(CONDITIONS)!=20:errors.append('7-3 conditions coverage')
dictionary=pages[OUT/'chapters/cdc-attribute-dictionary.html']
for n in DICTIONARY:
 if 'da-'+n not in dictionary.ids:errors.append('7-3 missing dictionary '+n)
for c in CDC:
 target=pages[OUT/'chapters'/('cdc-'+c['group']+'.html')]
 if c['code'].lower() not in target.ids:errors.append('7-3 missing CDC '+c['code'])
 if any(len(r)!=7 for r in c['fields']):errors.append('7-3 malformed fields '+c['code'])
for name in part73:
 t=texts[OUT/'chapters'/(name+'.html')]
 if re.search(r'\b(?:fetch|WebSocket|XMLHttpRequest)\s*\(',t):errors.append('7-3 network dependency '+name)
for f in ['assets/navigation.js','assets/home.js']:
 t=(OUT/f).read_text(encoding='utf-8')
 for filename in re.findall(r"(?:chapters/)?([a-z][a-z0-9-]+\.html)",t):
  if not (OUT/'chapters'/filename).exists() and not (OUT/filename).exists():errors.append('missing navigation '+filename)
part73_stats={'pages':len(part73),'tables':sum(pages[OUT/'chapters'/(n+'.html')].tables for n in part73),'svg':sum(len(re.findall(r'<svg\b',texts[OUT/'chapters'/(n+'.html')])) for n in part73),'xml_examples':sum(len(re.findall(r'<pre data-language="xml">',texts[OUT/'chapters'/(n+'.html')])) for n in part73)}
part74_stats={}
if part74:
 d=json.loads((ROOT/'scripts/part74_data.json').read_text(encoding='utf-8'));ev=json.loads((OUT/'data/part74-evidence.json').read_text(encoding='utf-8'))
 if len(part74)!=14 or len(set(part74))!=14:errors.append('7-4 page manifest must contain 14 unique pages')
 if len(d['dictionary'])!=519 or len(d['abbreviations'])!=273 or len(d['classes'])!=92:errors.append('7-4 reference coverage count')
 if any(not x['summary'] for x in d['dictionary']):errors.append('7-4 empty data summary')
 if any(not a['en'] or not a['zh'] for a in d['abbreviations']):errors.append('7-4 empty abbreviation definition')
 for c in d['classes']:
  if not any(c['name'] in pages[OUT/'chapters'/(f+'.html')].ids for f in part74):errors.append('7-4 missing class '+c['name'])
 for row in d['dictionary']:
  if 'data-'+row['name'] not in pages[OUT/'chapters/ln-data-dictionary.html'].ids:errors.append('7-4 missing data '+row['name'])
 for a in d['abbreviations']:
  if 'abbr-'+a['name'].replace('/','-') not in pages[OUT/'chapters/ln-abbreviations.html'].ids:errors.append('7-4 missing abbreviation '+a['name'])
 if 'PDIS' not in ev['baseline_absent'] or 'MMTR' not in ev['baseline_absent']:errors.append('7-4 SCD absence boundary')
 for t in terms:
  if t['id'].startswith('part74-'):
   for r in t.get('related',[]):
    if r not in ids:errors.append('7-4 missing related '+r)
 part74_stats={'pages':len(part74),'tables':sum(pages[OUT/'chapters'/(n+'.html')].tables for n in part74),'svg':sum(len(re.findall(r'<svg\b',texts[OUT/'chapters'/(n+'.html')])) for n in part74),'xml_examples':sum(len(re.findall(r'<pre data-language="xml">',texts[OUT/'chapters'/(n+'.html')])) for n in part74),'classes':91,'dictionary':519,'abbreviations':273}
for stem in learning:
 page=pages[OUT/'chapters'/(stem+'.html')]
 if 'sources' not in page.ids:errors.append('learning page without sources '+stem)
 if '../assets/navigation.js' not in texts[OUT/'chapters'/(stem+'.html')]:errors.append('learning page without navigation '+stem)
 if not re.search(r'<h1>[^<]+</h1>',texts[OUT/'chapters'/(stem+'.html')]):errors.append('learning page without title '+stem)
for word in ['线电压','CT 变比','SOE','选择性','跳闸闭环','数据契约']:
 if not any(word in str(t) for t in terms):errors.append('missing beginner term '+word)
print(json.dumps({'html_pages':len(pages),'checked_supplement_pages':len(new),'learning_pages':len(learning),'tables':table_count,'svg':svg_count,'parseable_xml_examples':xml_count,'part73':part73_stats,'part74':part74_stats,'terms':len(terms),'required_abbreviations':len(required),'errors':errors},ensure_ascii=False,indent=2))
raise SystemExit(bool(errors))
