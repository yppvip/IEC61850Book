(function () {
  'use strict';
  document.querySelectorAll('[data-filter]').forEach(input => {
    const name = input.dataset.filter;
    const rows = [...document.querySelectorAll('[data-filter-item="' + name + '"]')];
    const count = document.querySelector('[data-filter-count="' + name + '"]');
    const update = () => {
      const query = input.value.trim().toLocaleLowerCase();
      let shown = 0;
      rows.forEach(row => { row.hidden = !row.textContent.toLocaleLowerCase().includes(query); if (!row.hidden) shown++; });
      count.textContent = '显示 ' + shown + ' / ' + rows.length + ' 项';
    };
    input.addEventListener('input', update); update();
    window.addEventListener('hashchange', () => {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target?.dataset.filterItem === name && target.hidden) { input.value = ''; update(); target.scrollIntoView(); }
    });
  });
  const revealHash = () => {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (!target) return;
    for (let parent = target.parentElement; parent; parent = parent.parentElement) if (parent.tagName === 'DETAILS') parent.open = true;
  };
  revealHash(); window.addEventListener('hashchange', revealHash);
}());
