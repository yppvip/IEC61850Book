"""Build the static setting-group guide and restore its local entry points.
Run after older chapter/home builders when those pages are regenerated.
"""
from pathlib import Path
from html import escape
import json,re
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'outputs'; PAGE='setting-group-development.html'
TITLE='修改定值与切换定值组：通信流程与开发实现'

def svg_start(key,height,title):
 return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 {height}" role="img" aria-labelledby="{key}-title {key}-desc"><title id="{key}-title">{escape(title)}</title><desc id="{key}-desc">{escape(title)}；具体步骤和异常分支详见相邻正文。</desc><defs><marker id="{key}-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#477b9e"/></marker></defs>'
def arrow(key,x,y,x2,y2):
 return f'<path d="M{x} {y} L{x2} {y2}" class="svg-link" marker-end="url(#{key}-arrow)"/>'
def box(x,y,w,h,title,note):
 return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="9" class="svg-node"/><text x="{x+18}" y="{y+30}" class="svg-text">{escape(title)}</text><text x="{x+18}" y="{y+57}" class="svg-note">{escape(note)}</text>'
def sequence(key,title,steps):
 height=120+len(steps)*66
 s=svg_start(key,height,title)+'<text x="85" y="32" class="svg-title">客户端 Client</text><text x="682" y="32" class="svg-title">IED / Server</text>'
 s+=f'<path d="M155 55 V{height-35} M765 55 V{height-35}" class="svg-dash"/>'
 for i,(label,direction) in enumerate(steps):
  y=92+i*66
  s+=f'<text x="460" y="{y}" text-anchor="middle" class="svg-text">{escape(label)}</text>'
  s+=arrow(key,155 if direction=='right' else 765,y+14,765 if direction=='right' else 155,y+14)
 return s+'</svg>'
def buffers():
 key='setting-buffers';s=svg_start(key,430,'定值存储、编辑副本与运行视图')
 s+=box(230,25,460,82,'组存储：SG1 … SGn','保留每组已提交的参数')
 s+=arrow(key,330,107,220,190)+arrow(key,590,107,700,190)
 s+='<text x="75" y="148" class="svg-note">SelectEditSG(k)</text><text x="625" y="148" class="svg-note">SelectActiveSG(k)</text>'
 s+=box(25,190,405,88,'编辑缓冲 · FC=SE','读 / 写；未确认不提交')+box(490,190,405,88,'激活缓冲 · FC=SG','读取运行组；应用按此组工作')
 s+='<path d="M50 190 V75 H230" class="svg-link" marker-end="url(#setting-buffers-arrow)"/><text x="65" y="178" class="svg-note">CnfEdit → 写回所选组</text>'
 s+=box(25,325,870,76,'确认当前激活组时，按 Ed2 语义重新激活更新值','确认非激活组不自动切到该组；保存与激活分别核验')
 return s+'</svg>'
def staging():
 key='setting-staging';s=svg_start(key,440,'有明确规约时的暂存区适配流程')
 for i,(title,note) in enumerate([
  ('核对适用条款、设备与版本','明确暂存号、普通组范围、目标区与完整参数集'),
  ('按已核实规约编辑暂存区并校核','若采用 SGCB 则遵循其预约和确认语义'),
  ('执行规约定义的复制 / 确认生效','不是默认 SelectActiveSG(暂存号)；不虚构命令'),
  ('核对目标区、运行值、反馈与记录','目标区号是否变化、掉电保存均按设备约定')]):
  y=20+i*106;s+=box(35,y,850,78,title,note)
  if i<3:s+=arrow(key,460,y+78,460,y+106)
 return s+'</svg>'

def integrate():
 nav=OUT/'assets/navigation.js';s=nav.read_text(encoding='utf-8')
 m=re.search(r'const groups = (\[.*?\]);',s,re.S);groups=json.loads(m[1])
 g=next(g for g in groups if g['id']=='practice')
 if not any(x[0]==PAGE for x in g['items']):g['items'].insert(1,[PAGE,TITLE,'开发与综合练习'])
 s=s[:m.start(1)]+json.dumps(groups,ensure_ascii=False,indent=2)+s[m.end(1):]
 if "'setting-group-development'" not in s:s=s.replace("'developer-data-contracts','feeder-learning-case'","'developer-data-contracts','setting-group-development','feeder-learning-case'")
 nav.write_text(s,encoding='utf-8')
 p=OUT/'index.html';s=p.read_text(encoding='utf-8')
 if 'id="setting-group-entry"' not in s:
  card=f'<section class="card" id="setting-group-entry"><p class="section-kicker">开发专栏 · 工程应用</p><h2>如何修改定值、切换定值组？</h2><p><a href="chapters/{PAGE}"><b>{TITLE} →</b></a></p><p>4 张原创流程图、MMS 读写映射、客户端状态机、服务端职责及异常恢复；国网/南网按资料版本区分已知与待核验项。</p></section>\n'
  s=s.replace('<section class="card" id="reference">',card+'<section class="card" id="reference">',1)
 if 'data/setting-group-terms.js' not in s:s=s.replace('<script src="assets/app.js">','<script src="data/setting-group-terms.js"></script><script src="assets/app.js">',1)
 p.write_text(s,encoding='utf-8')
 p=OUT/'assets/home.js';s=p.read_text(encoding='utf-8')
 if 'href="#setting-group-entry"' not in s:s=s.replace('<li><a href="#reference">','<li><a href="#setting-group-entry">定值开发专栏</a></li><li><a href="#reference">',1)
 p.write_text(s,encoding='utf-8')
 for stem in ['acsi-runtime-models','cdc-setting','acsi-services','control-blocks-reference','developer-data-contracts','engineering-practice','service-mapping','abbreviation-index']:
  p=OUT/'chapters'/(stem+'.html');s=p.read_text(encoding='utf-8')
  if 'id="setting-group-guide"' not in s:
   s=s.replace('</main>',f'<section><h2 id="setting-group-guide">定值与定值组开发专栏</h2><p><a href="{PAGE}">{TITLE}</a>：从选编辑组、写 SE、确认到切组与读回；含 MMS 映射、异常恢复及两网差异核验边界。</p></section></main>',1)
  p.write_text(s,encoding='utf-8')
 rows=[
 ('edit','修改定值通信流程','Setting group editing',['修改定值','定值修改','定值下装','SelectEditSG','SetSGValues','SetEditSGValue'],'选编辑组、写 SE、逐项检查、读回再确认；确认前失败不提交。','edit-flow'),
 ('activate','切换定值组通信流程','SelectActiveSG',['切换定值组','切换定值区','定值组','定值区','ActSG'],'切组与编辑分开，读回 ActSG、SG 和辅助 LActTm。','activate-flow'),
 ('mapping','SGCB 的 MMS 映射','SGCB MMS mapping',['SGCB','EditSG','CnfEdit','SG','SE','SP','MMS定值'],'SGCB 在 SP 下，编辑参数在 SE，激活视图在 SG。','mapping'),
 ('grid','国网与南网定值流程差异','Utility setting profiles',['国家电网','南方电网','国网','南网','虚拟31区','31区'],'共用 IEC 核心，企业规范和设备扩展按版本核验；不硬编码 31 区。','grid-differences'),
 ('client','定值客户端状态机','Setting client state machine',['定值开发','开发人员','状态机'],'拆分编辑、提交、保存核验、激活、运行核验及结果未知状态。','client'),
 ('server','定值组服务端实现','Setting group server',['定值服务端','服务端回调','非易失保存'],'协议栈之外管理组数据、SE 装载、SG 同步和可靠存储。','server'),
 ('failures','定值确认超时与断链恢复','Setting operation recovery',['ResvTms','预约','定值超时','取消定值修改','结果未知'],'关联丢失需重选取基线；确认或激活超时不盲目重放。','failures'),
 ('tests','定值组开发联调用例','Setting group integration cases',['定值联调','sSg','部分写失败'],'覆盖激活/非激活组、并发、断链、响应丢失及持久化。','tests')]
 terms=[dict(id='setting-dev-'+i,zh=zh,en=en,aliases=aliases,category='定值与定值组开发',level='工程应用 → 开发与综合练习 → 定值组',summary=summary,related=['setting-dev-edit'] if i!='edit' else ['setting-dev-activate','setting-dev-failures'],href='chapters/'+PAGE+'#'+anchor) for i,zh,en,aliases,summary,anchor in rows]
 js='/* Generated by scripts/build_setting_groups.py. */\n(function(){const terms=window.IEC61850_TERMS;for(const entry of '+json.dumps(terms,ensure_ascii=False,indent=2)+'){const i=terms.findIndex(t=>t.id===entry.id);if(i<0)terms.push(entry);else terms[i]=entry;}}());\n'
 (OUT/'data/setting-group-terms.js').write_text(js,encoding='utf-8')
 # Remove an overbroad activation statement in both the published page and its source.
 for p in [OUT/'chapters/cdc-setting.html',ROOT/'scripts/build_part73.py']:
  s=p.read_text(encoding='utf-8').replace('确认编辑不等于立即激活，激活还要核对对象与实现','确认非激活组不切组；当前组生效按版次核对');p.write_text(s,encoding='utf-8')
 p=OUT/'chapters/acsi-services.html';s=p.read_text(encoding='utf-8').replace('不自动等于将该组激活','非激活组确认不切组；当前激活组确认后的生效须按版次核对');p.write_text(s,encoding='utf-8')

def build():
 text=(ROOT/'scripts/templates'/PAGE).read_text(encoding='utf-8')
 diagrams={'BUFFERS':buffers(),'EDIT':sequence('setting-edit','修改第 2 组的成功通信路径',[
 ('Read SGCB：ActSG=1，确认能力与条件','right'),('SelectEditSG(2) → Write EditSG=2','right'),('成功；本关联持有编辑预约','left'),('Read SE：取第 2 组旧值与计划比对','right'),('Write SE：逐项写入新值','right'),('每项结果；失败则不确认','left'),('Read SE：校核变更项及关联项','right'),('CnfEdit=true：确认保存第 2 组','right'),('确认结果；随后核对保存内容与 ActSG','left')]),
 'ACTIVATE':sequence('setting-activate','切换激活组的成功通信路径',[
 ('核对目标组快照、许可与并发状态','right'),('SelectActiveSG(2) → Write ActSG=2','right'),('响应成功；超时则转结果未知','left'),('Read SGCB：检查 ActSG、LActTm','right'),('Read SG：核对运行参数，再查组号','right'),('组号与运行值一致 → 记录运行值已核验','left')]),'STAGING':staging()}
 for key,value in diagrams.items():text=text.replace('{{'+key+'}}',value)
 assert not re.search(r'\{\{[A-Z]+\}\}',text)
 (OUT/'chapters'/PAGE).write_text(text,encoding='utf-8')
 integrate();print(json.dumps({'page':PAGE,'diagrams':len(diagrams),'terms':8},ensure_ascii=False))
if __name__=='__main__':build()
