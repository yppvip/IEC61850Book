/* Fixed teaching examples only: no input decoder, import, upload or network API. */
(function(){
  'use strict';
  const examples=window.IEC61850_PACKET_EXAMPLES;
  if(!examples)return;
  const element=(tag,text,cls)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e;};
  document.querySelectorAll('.packet-workbench').forEach(box=>{
    const ids=box.dataset.cases.split(' '), cases=ids.map(id=>examples.find(c=>c.id===id));
    let current=cases[0], previous=null, activeLayer='全部';
    const toolbar=element('div',undefined,'packet-toolbar'),label=element('label','选择教学帧 '),select=element('select');select.setAttribute('aria-label','选择教学帧');
    cases.forEach(c=>{const o=element('option',c.label);o.value=c.id;select.append(o);});label.append(select);toolbar.append(label);
    const layers=element('div',undefined,'packet-layers');layers.setAttribute('aria-label','报文层次');
    const columns=element('div',undefined,'packet-columns'),hex=element('div',undefined,'packet-hex'),detail=element('div',undefined,'packet-detail');
    hex.setAttribute('aria-label','原始Hex，点击字节反查字段');detail.setAttribute('aria-live','polite');columns.append(hex,detail);
    const list=element('div',undefined,'packet-field-list'),status=element('p',undefined,'packet-state-status');status.setAttribute('role','status');
    const ui=element('div');ui.append(toolbar,layers,status,columns,list);box.prepend(ui);
    const fallback=box.querySelector('.packet-static');if(fallback)fallback.hidden=true;
    function choose(index){
      const f=current.fields[index];
      [...hex.children].forEach((b,i)=>{const selected=i>=f.start&&i<f.start+f.length;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected));});
      const first=hex.children[f.start];
      if(first)hex.scrollTop=Math.max(0,first.offsetTop-hex.clientHeight/3);
      [...list.children].forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.field)===index)));
      detail.replaceChildren(element('h3',f.name));
      for(const [key,value] of [['位置',`${f.start}…${f.start+f.length-1}（十进制，首字节=0）；共${f.length}字节，标签/长度头${f.header}字节`],['类型',f.dtype],['值',f.value||'结构容器，展开子字段'],['工程含义',f.meaning||'按所属层与结构解释，不能独立推断业务'],['SCD对应',f.scd||'本字段无直接同名SCL属性；结合控制块、配置和运行状态'],['Wireshark',f.ws||'父协议节点 / BER结构（依解码器版本）']]){
        const p=element('p');p.append(element('b',key+'：'),document.createTextNode(value));detail.append(p);
      }
      detail.append(element('pre',current.hex.split(' ').slice(f.start,f.start+f.length).join(' ')));
    }
    function draw(){
      hex.replaceChildren();list.replaceChildren();layers.replaceChildren();
      const bytes=current.hex.split(' '), old=previous?.hex.split(' ');let differences=0;
      bytes.forEach((v,i)=>{const b=element('button',v);b.type='button';b.title='偏移 '+i+' (0x'+i.toString(16)+')';b.setAttribute('aria-label','偏移 '+i+'，Hex '+v);if(old&&old[i]!==v){b.classList.add('changed');differences++;}
        b.onclick=()=>{const hits=current.fields.map((f,j)=>[f,j]).filter(([f])=>i>=f.start&&i<f.start+f.length).sort((a,b)=>a[0].length-b[0].length);if(hits.length)choose(hits[0][1]);};hex.append(b);});
      for(const layer of ['全部',...new Set(current.fields.map(f=>f.layer))]){const b=element('button',layer);b.type='button';b.setAttribute('aria-pressed',String(layer===activeLayer));b.onclick=()=>{activeLayer=layer;draw();};layers.append(b);}
      current.fields.forEach((f,i)=>{if(activeLayer!=='全部'&&f.layer!==activeLayer)return;const b=element('button',f.name);b.type='button';b.dataset.field=i;b.onclick=()=>choose(i);list.append(b);});
      const changes=previous?current.fields.filter(f=>f.value&&previous.fields.some(p=>p.name===f.name&&p.value!==f.value)).map(f=>{const p=previous.fields.find(p=>p.name===f.name);return f.name+'：'+p.value+' → '+f.value;}).join('；'):'';
      status.textContent=current.label+' · '+current.size+'字节。'+(old?`与上一教学帧按绝对偏移比较，${differences}个当前字节不同；长度差${bytes.length-old.length}字节。橙线表示字节差异，长度变化会移动后续字段。字段值变化：${changes||'无'}。`:'选择字段查看蓝色范围；点击Hex字节反查最小字段。');
      const first=list.firstElementChild;if(first)choose(Number(first.dataset.field));
    }
    select.onchange=()=>{previous=current;current=cases.find(c=>c.id===select.value);activeLayer='全部';draw();};
    box.addEventListener('click',event=>{const b=event.target.closest('[data-case-target]');if(!b)return;select.value=b.dataset.caseTarget;select.dispatchEvent(new Event('change'));});
    box.querySelectorAll('[data-field-index]').forEach(b=>{b.onclick=()=>{if(current!==cases[0]){previous=current;current=cases[0];select.value=current.id;draw();}choose(Number(b.dataset.fieldIndex));};});
    draw();
  });
  document.querySelectorAll('[data-mapping]').forEach(box=>{
    const paragraphs=[...box.querySelectorAll('.mapping-detail')],bar=element('div',undefined,'mapping-steps');
    paragraphs.forEach((p,i)=>{const b=element('button',p.dataset.label);b.type='button';b.setAttribute('aria-pressed',String(i===0));b.onclick=()=>{paragraphs.forEach((q,j)=>q.hidden=j!==i);[...bar.children].forEach((q,j)=>q.setAttribute('aria-pressed',String(j===i)));};bar.append(b);p.hidden=i!==0;});box.prepend(bar);
  });
}());
