"""Repair introductory conceptual figures; preserve original page/anchor names."""
from pathlib import Path
import re

OUT = Path(__file__).resolve().parents[1] / 'outputs'
bay = '''<figure class="concept-figure"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 420" role="img" aria-labelledby="bay-intro-title bay-intro-desc"><title id="bay-intro-title">一次设备与逻辑节点引用分层示意</title><desc id="bay-intro-desc">上方为一次组织中的设备，下方为 IED 内逻辑节点。虚线仅表达引用示意，不表示电气接线。</desc>
<rect class="svg-frame" x="20" y="20" width="620" height="370" rx="14"/><text class="svg-title" x="44" y="55">VoltageLevel → Bay：线路间隔 Learn-F01（教学）</text>
<rect class="svg-bay" x="44" y="82" width="570" height="115" rx="10"/><text class="svg-text" x="62" y="110">一次设备对象（此处是清单，不画电气连接）</text>
<g class="svg-equip"><rect x="62" y="133" width="158" height="42" rx="6"/><rect x="249" y="133" width="158" height="42" rx="6"/><rect x="435" y="133" width="158" height="42" rx="6"/></g>
<text class="svg-text" x="77" y="160">CT / VT 互感器</text><text class="svg-text" x="280" y="160">断路器</text><text class="svg-text" x="458" y="160">隔离开关</text>
<path class="svg-dash" d="M141 175V285M328 175V285M514 175V285"/><rect fill="#fbfdff" x="154" y="220" width="430" height="28"/><text class="svg-text" x="166" y="240">LNode：引用 IED、LD 与指定 LN 实例</text>
<g class="svg-ln"><rect x="62" y="285" width="158" height="58" rx="6"/><rect x="249" y="285" width="158" height="58" rx="6"/><rect x="435" y="285" width="158" height="58" rx="6"/></g>
<text class="svg-text" x="77" y="310">TCTR / TVTR</text><text class="svg-note" x="77" y="331">互感器相关信息</text><text class="svg-text" x="300" y="310">XCBR</text><text class="svg-note" x="272" y="331">断路器相关信息</text><text class="svg-text" x="486" y="310">XSWI</text><text class="svg-note" x="457" y="331">开关相关信息</text>
<text class="svg-note" x="62" y="369">LN 是逻辑信息与服务单元；图不规定物理设备分配。</text>
<rect class="svg-virtual" x="670" y="82" width="285" height="261" rx="12"/><text class="svg-title" x="690" y="116">跨间隔的功能组织</text><text class="svg-text" x="690" y="153">例：母线相关联锁</text><g class="svg-ln"><rect x="695" y="182" width="105" height="42" rx="6"/><rect x="820" y="182" width="105" height="42" rx="6"/></g><text class="svg-text" x="723" y="209">CILO</text><text class="svg-text" x="847" y="209">CSWI</text><text class="svg-note" x="690" y="266">可按项目约定采用虚拟间隔；</text><text class="svg-note" x="690" y="289">不表示新增一次回路，</text><text class="svg-note" x="690" y="312">也不证明现场联锁已验证。</text>
</svg><figcaption>图 1　原创分层图：一次设备与 LN 分开标注，LNode 建立引用。电气接线应另查<a href="primary-diagrams.html">一次单线图</a>；保护、测量与控制的其他功能不由这三条示意引用穷尽。</figcaption></figure>'''
interfaces = '''<figure class="concept-figure interface-figure"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1040 620" role="img" aria-labelledby="interfaces-title interfaces-desc"><title id="interfaces-title">站控、间隔、过程层的 IF1 到 IF10 逻辑接口</title><desc id="interfaces-desc">IF1 连接保护和站控，IF6 连接控制和站控；IF4 是互感器采样信息，IF5 是过程控制。IF2 由保护连接远方保护，IF7 连接站控与远方工程站。IF3、IF8、IF9 为层内交换，IF10 连接控制中心。线条不是物理电缆或固定协议。</desc>
<rect class="svg-level station" x="210" y="100" width="600" height="100" rx="12"/><text class="svg-level-label" x="64" y="158">站控层</text>
<rect class="svg-level baylevel" x="210" y="270" width="600" height="125" rx="12"/><text class="svg-level-label" x="64" y="294">间隔层</text>
<rect class="svg-level process" x="210" y="470" width="600" height="105" rx="12"/><text class="svg-level-label" x="64" y="530">过程层</text>
<path class="svg-link" d="M415 154H590M415 330H480M625 330H650M330 176V306M550 306V225H680V176M330 354V502M550 354V444H652V502M180 330H245M190 42H300V100M920 64V84H720V132"/>
<g class="svg-node"><rect x="245" y="132" width="170" height="44" rx="7"/><rect x="590" y="132" width="180" height="44" rx="7"/><rect x="245" y="306" width="170" height="48" rx="7"/><rect x="480" y="306" width="145" height="48" rx="7"/><rect x="650" y="306" width="145" height="48" rx="7"/><rect x="245" y="502" width="170" height="44" rx="7"/><rect x="535" y="502" width="235" height="44" rx="7"/></g>
<text class="svg-text" x="272" y="160">站控 / HMI</text><text class="svg-text" x="620" y="160">站控 / 网关</text><text class="svg-text" x="283" y="336">保护 IED</text><text class="svg-text" x="506" y="336">控制 IED</text><text class="svg-text" x="667" y="336">另一间隔 IED</text><text class="svg-text" x="264" y="530">CT / VT / MU</text><text class="svg-text" x="561" y="530">过程接口 / 执行器</text>
<g class="svg-external"><rect x="20" y="20" width="170" height="44" rx="7"/><rect x="825" y="20" width="195" height="44" rx="7"/><rect x="20" y="308" width="160" height="44" rx="7"/></g>
<text class="svg-text" x="44" y="48">远方控制中心</text><text class="svg-text" x="842" y="48">远方工程工作站</text><text class="svg-text" x="51" y="336">远方保护</text>
<text class="svg-badge" x="230" y="32">IF10</text><text class="svg-badge" x="825" y="78">IF7</text><text class="svg-badge" x="487" y="143">IF9</text><text class="svg-badge" x="343" y="238">IF1 · 保护</text><text class="svg-badge" x="563" y="238">IF6 · 控制</text><text class="svg-badge" x="193" y="319">IF2</text><text class="svg-badge" x="430" y="319">IF3</text><text class="svg-badge" x="630" y="294">IF8</text><path class="svg-dash" d="M644 299V324"/><text class="svg-badge" x="343" y="435">IF4 · 采样</text><text class="svg-badge" x="666" y="435">IF5 · 控制</text><text class="svg-note" x="210" y="603">连接线只表达逻辑信息交换；设备角色、网络和协议由具体工程映射确定。</text>
</svg><figcaption>图 2　原创重绘：IF1 与 IF6 分开显示；IF2 接到保护，IF4/IF5 接到对应过程接口，IF7 接入站控。IF8 旁的短虚线仅为编号引线。IF 编号不是端口、网段或协议编号，完整含义见下表。</figcaption></figure>'''
p = OUT / 'chapters/standard-library-overview.html'
text = p.read_text(encoding='utf-8')
figs = iter([bay, interfaces])
count = [0]
def replace(m):
    count[0] += 1
    return next(figs) if count[0] <= 2 else m[0]
text = re.sub(r'<figure\b.*?</figure>', replace, text, flags=re.S)
# Correct the pre-existing backwards continuation while preserving all topic files.
text = text.replace('<a href="ied-data-model.html">IED 与数据模型</a> → <a href="primary-and-roles.html">一次系统与设备角色</a>', '<a href="primary-and-roles.html">一次系统与设备角色</a> → <a href="ied-data-model.html">IED 与数据模型</a>')
p.write_text(text, encoding='utf-8')
print('Redrew Bay/LNode and IF1–IF10 figures')
