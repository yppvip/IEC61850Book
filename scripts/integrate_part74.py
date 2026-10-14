"""Idempotently attach the 7-4 guide to the existing offline navigation."""
from pathlib import Path
import json,html
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'outputs'
pages=json.loads((OUT/'data/part74-pages.json').read_text(encoding='utf-8'))
def edit(path,fn):
 p=OUT/path;s=p.read_text(encoding='utf-8');n=fn(s)
 if n!=s:p.write_text(n,encoding='utf-8')
def once(s,marker,add,guard):return s if guard in s else s.replace(marker,add+marker,1)
def additems(s,anchor,items):
 for f,t in items:s=s.replace("['"+f+"', '"+t+"'], ",'')
 return s.replace(anchor,''.join("['"+f+"', '"+t+"'], " for f,t in items)+anchor,1)
def nav(s):
 s=additems(s,"['standard-part-7-3.html'",[(f+'.html',t) for f,t,g in pages if g=='标准文库'])
 s=additems(s,"['cdc-common-types.html'",[(f+'.html',t) for f,t,g in pages if g=='数据模型'])
 s=additems(s,"['cdc-scd-evidence.html'",[(f+'.html',t) for f,t,g in pages if g=='SCL 配置'])
 tree='<li><details open><summary><a href="standard-part-7-4.html">第 7-4 部分：逻辑节点与数据</a></summary><ul>'+''.join('<li><a href="'+f+'.html">'+html.escape(t)+'</a></li>' for f,t,g in pages if f!='standard-part-7-4')+'</ul></details></li>'
 return s.replace('<li>第 7-4 部分（已用于关联导读，独立主章待整理）</li>',tree)
edit(Path('assets/navigation.js'),nav)
edit(Path('assets/home.js'),lambda s:once(s,'<li><a href="chapters/standard-part-7-3.html">','<li><details open><summary><a href="chapters/standard-part-7-4.html">第 7-4 部分：逻辑节点与数据</a></summary><ul><li><a href="chapters/ln-system.html">公用信息与继承</a></li><li><a href="chapters/ln-data-dictionary.html">519 个数据名称</a></li><li><a href="chapters/ln-values-reference.html">枚举与模式组合</a></li><li><a href="chapters/ln-abbreviations.html">第 4 章缩写全表</a></li></ul></details></li>','chapters/standard-part-7-4.html'))
card='<section class="card" style="margin-top:22px"><h2>第 7-4 部分：逻辑节点与数据语义</h2><p>按所给 2003 基线整理 91 类节点、六类信息、519 个数据名称、273 个缩写入口、明示取值和附录建模；保留扫描缺页与版次差异。</p><p><a href="chapters/standard-part-7-4.html"><b>进入第 7-4 部分完整导读</b></a></p>'+''.join('<p><a href="chapters/'+f+'.html">'+html.escape(t)+'</a></p>' for f,t,g in pages if f!='standard-part-7-4')+'</section>'
edit(Path('index.html'),lambda s:once(s,'<section class="card" style="margin-top:22px"><h2>第 7-3',card,'<h2>第 7-4 部分'))
edit(Path('index.html'),lambda s:once(s,'<script src="assets/app.js">','<script src="data/part74-terms.js"></script>','data/part74-terms.js'))
cross='<section><h2 id="part74-reading">第 7-4 部分：从功能到数据语义</h2><p><a href="standard-part-7-4.html">91 类逻辑节点完整导读</a> · <a href="ln-system.html">公用信息与继承</a> · <a href="ln-data-dictionary.html">第 6 章数据字典</a> · <a href="ln-values-reference.html">取值、模式组合与单位</a> · <a href="ln-scd-evidence.html">实际 SCD 节点与类型链</a>。明确 LN/DO 功能、CDC 属性及工程观测的不同层级。</p></section>'
for f in ['standard-library-overview','standard-model-index','standard-part-7-1','standard-part-7-2','standard-part-7-3','ln-cdc-deep-index','ied-data-model','control-input-models','cdc-status','cdc-measurement','cdc-scd-evidence','protection-ied-guide']:
 edit(Path('chapters')/(f+'.html'),lambda s:once(s,'</main>',cross,'id="part74-reading"'))
# Embed the full verified abbreviation table in the shared four-column index as well.
d=json.loads((ROOT/'scripts/part74_data.json').read_text(encoding='utf-8'))
section='<section><h2 id="part74-abbreviations">第 7-4 部分：第 4 章全部缩写</h2><p><a href="ln-abbreviations.html">分组词典与本地筛选</a> · <a href="ln-data-dictionary.html">完整数据名的语义</a>。Tm 下四种时间后缀也分别列出。大小写、数据名组成词与完整业务定义分别核对。</p><div class="reference-table"><table><thead><tr><th scope="col">缩写</th><th scope="col">英文</th><th scope="col">中文</th><th scope="col">功能与用法</th></tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+html.escape(a[k])+'</td>' for k in ['name','en','zh','usage'])+'</tr>' for a in d['abbreviations'])+'</tbody></table></div></section>'
edit(Path('chapters/abbreviation-index.html'),lambda s:once(s,'</main>',section,'id="part74-abbreviations"'))
print('7-4 navigation, term loading, abbreviation index and cross-links integrated')
