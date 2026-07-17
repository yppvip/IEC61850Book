(function(){
  const terms=window.IEC61850_TERMS||[], input=document.querySelector('#term-search'), status=document.querySelector('#result-status'), results=document.querySelector('#results'), categories=document.querySelector('#categories');
  const normalize=value=>(value||'').toLocaleLowerCase();
  const escape=value=>String(value).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const byId=id=>terms.find(term=>term.id===id);
  function render(query=''){
    const q=normalize(query.trim()); const found=terms.filter(term=>!q||[term.zh,term.en,term.category,term.level,term.summary,...term.aliases].some(v=>normalize(v).includes(q)));
    status.textContent=q?`“${query}”命中 ${found.length} 个术语（共 ${terms.length} 个索引词条）`:`已加载 ${terms.length} 个术语索引；支持中文、英文标签和缩写。`;
    results.innerHTML=found.length?found.map(term=>`<article class="term" id="term-${escape(term.id)}"><h3>${escape(term.zh)} <span class="en">${escape(term.en)}</span></h3><div>${[term.category,term.level,...term.aliases].map(v=>`<span class="tag">${escape(v)}</span>`).join('')}</div><p>${escape(term.summary)}</p><div class="meta">所在层级：${escape(term.level)}</div><div class="related meta">相关词条：${term.related.map(id=>{const item=byId(id);return item?`<a href="#term-${escape(id)}" data-term="${escape(item.zh)}">${escape(item.zh)}</a>`:''}).join('')}</div></article>`).join(''):'<div class="empty">没有找到匹配术语。请尝试 XML 标签、中文名称、英文全称或缩写。</div>';
  }
  const groups=[...new Set(terms.map(t=>t.category))]; categories.innerHTML=groups.map(group=>`<a class="category" href="#results" data-category="${escape(group)}"><b>${escape(group)}</b><small>${terms.filter(t=>t.category===group).length} 个索引词条</small></a>`).join('');
  input.addEventListener('input',()=>render(input.value)); document.querySelector('#search-form').addEventListener('submit',event=>{event.preventDefault();render(input.value);document.querySelector('#results').scrollIntoView({behavior:'smooth'});});
  categories.addEventListener('click',event=>{const target=event.target.closest('[data-category]');if(!target)return;input.value=target.dataset.category;render(input.value);});
  results.addEventListener('click',event=>{const target=event.target.closest('[data-term]');if(target){input.value=target.dataset.term;render(input.value);}});
  render();
}());
