"""Idempotent navigation/legacy cross-links for the 7-3 guide."""
from pathlib import Path
import re, html
from part73_data import CDC, CONDITIONS
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'outputs'
def edit(path,fn):
 p=OUT/path;t=p.read_text(encoding='utf-8');n=fn(t)
 if n!=t:p.write_text(n,encoding='utf-8')
def before_marker(text,marker,addition,guard):
 return text if guard in text else text.replace(marker,addition+marker,1)
def items(t,anchor,entries):
 for file,title in entries:t=t.replace("['"+file+"', '"+title+"'], ",'')
 return t.replace(anchor,''.join("['"+file+"', '"+title+"'], " for file,title in entries)+anchor,1)
def nav(t):
 t=items(t,"['standard-part-7-2.html'",[('standard-part-7-3.html','第 7-3 部分：公用数据类 CDC')])
 t=items(t,"['acsi-runtime-models.html'",[(x+'.html',y) for x,y in [('cdc-common-types','公用数据属性类型：品质与控制'),('cdc-status','状态 CDC：SPS 至 BCR'),('cdc-measurement','测量 CDC：幅值、相量与谐波'),('cdc-control','可控 CDC：命令与反馈'),('cdc-setting','定值 CDC：参数与曲线'),('cdc-description','描述 CDC：铭牌与曲线'),('cdc-attribute-dictionary','表 49：完整属性字典'),('cdc-units-fc','附录 A/B：单位、倍率与 FC')]])
 t=items(t,"['scd-acsi-evidence.html'",[('cdc-scd-evidence.html','参考 SCD：CDC 与属性类型证据')])
 return t.replace('<li>第 7-3～7-4 部分（已用于关联导读，独立主章待整理）</li>','<li><a href="standard-part-7-3.html">第 7-3 部分：公用数据类 CDC</a></li><li>第 7-4 部分（已用于关联导读，独立主章待整理）</li>')
edit(Path('assets/navigation.js'),nav)
edit(Path('assets/home.js'),lambda t:before_marker(t,'<li><a href="chapters/standard-part-7-2.html">','<li><a href="chapters/standard-part-7-3.html">第 7-3 部分：公用数据类 CDC</a></li>','chapters/standard-part-7-3.html'))
card='<section class="card" style="margin-top:22px"><h2>第 7-3 部分：公用数据类 CDC</h2><p>按所给 2003 版覆盖 29 类结构、存在条件、品质与控制模式、表 49 全部属性、附录 A/B，以及实际 SCD 类型引用。</p><p><a href="chapters/standard-part-7-3.html"><b>进入第 7-3 部分完整导读</b></a></p><p><a href="chapters/cdc-common-types.html">品质、数值与控制模式</a> · <a href="chapters/cdc-attribute-dictionary.html">表 49 属性字典</a> · <a href="chapters/cdc-units-fc.html">单位、倍率与 FC</a> · <a href="chapters/cdc-scd-evidence.html">实际 SCD 证据</a></p></section>'
edit(Path('index.html'),lambda t:before_marker(t,'<section class="card" style="margin-top:22px"><h2>第 7-2',card,'<h2>第 7-3 部分') )
edit(Path('index.html'),lambda t:before_marker(t,'<script src="assets/app.js">','<script src="data/part73-terms.js"></script>','data/part73-terms.js'))
def tbl(headers,rows):
 return '<div class="reference-table"><table><thead><tr>'+''.join('<th scope="col">'+h+'</th>' for h in headers)+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+html.escape(str(v))+'</td>' for v in r)+'</tr>' for r in rows)+'</tbody></table></div>'
section='<section><h2 id="part73-abbreviations">第 7-3 部分：存在标记、CDC 与属性缩写</h2><p><a href="standard-part-7-3.html#conditions">存在条件完整说明</a> · <a href="cdc-units-fc.html#fc">全部 FC 的功能与用法</a> · <a href="cdc-attribute-dictionary.html">表 49 全部属性名</a>。M/O/C 是存在性，FC 是功能用途，bType 是值的类型，三者分别判断。</p>'+tbl(['标识','英文 / 角色','含义与用法'],CONDITIONS+[('C','Conditional','条件性标记，具体由条件代码判断；不是数值或权限'),('SBO','Select Before Operate','操作前选择；direct/sbo 是控制模型命名的一条轴'),('SP','Setpoint','设点/无组定值；结合父 CDC 读 setVal/setMag'),('SI','International System of Units','国际单位制，法语 Système international 的缩写'),('RMS','Root Mean Square','均方根/有效值；hvRef=rms 时核对 rmsCyc'),('SDO','Sub Data Object','子数据对象，例如 WYE.phsA，引用另一个 DOType'),('BDA','Basic Data Attribute','DAType 内结构分量，可继续嵌套')])+tbl(['CDC','英文','中文 / 功能'],[(c['code'],c['en'],c['zh']+'：'+c['meaning']) for c in CDC])+'<p>setMag=setting/setpoint magnitude（定值/设点幅值）；stVal=status value（状态值）；ctlVal=control value（控制值）；instMag=instantaneous magnitude（即时幅值）；subEna=substitution enable（取代使能）。这些名称用作助记，大小写和父结构要保留。其余 116 个属性名及所有公共结构分量均可从属性字典和首页术语搜索进入。</p></section>'
edit(Path('chapters/abbreviation-index.html'),lambda t:before_marker(t,'</main>',section,'id="part73-abbreviations"'))
cross='<section><h2 id="part73-reading">第 7-3 部分完整关联阅读</h2><p><a href="standard-part-7-3.html">公用数据类完整导读</a> · <a href="cdc-common-types.html">品质与公用类型</a> · <a href="cdc-attribute-dictionary.html">表 49 属性字典</a> · <a href="cdc-scd-evidence.html">参考 SCD 类型证据</a>。按 CDC 类别查每一表列属性、类型、FC、触发、值域和存在条件；早期原文与工程文件差异分别说明。</p></section>'
for f in ['standard-library-overview','standard-model-index','standard-part-6-scl','standard-part-7-1','standard-part-7-2','data-attributes-reference','control-input-models','ln-cdc-deep-index','ied-data-model','scd-model-evidence']:
 edit(Path('chapters')/(f+'.html'),lambda t:before_marker(t,'</main>',cross,'id="part73-reading"'))
# Correct an overgeneralised legacy namespace grouping and invented condition expansions.
def legacy(t):
 for a,b,c in CONDITIONS:
  t=re.sub(r'(<tr><td>'+re.escape(a)+r'</td><td>).*?(</td><td>).*?(</td></tr>)',lambda m:m[1]+html.escape(b)+m[2]+html.escape(c)+m[3],t)
 t=t.replace('语义来源、类名和扩展边界，EX','ldNs/lnNs 在 LPL 中为 DC；dataNs/cdcNs/cdcName 为 EX；分别标识定义来源和扩展类名')
 return t
edit(Path('chapters/data-attributes-reference.html'),legacy)
edit(Path('chapters/abbreviation-index.html'),legacy)
print('7-3 navigation and cross-links integrated')
