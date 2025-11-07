(function(){
  function computeBase() {
    const segs = location.pathname.split('/').filter(Boolean);
    const first = segs.length ? '/' + segs[0] : '';
    return first; // e.g., '/llm_analysis' for project pages
  }
  const BASE = computeBase();
  const DATA_URL = `${BASE}/results/models_table.json`;

  const state = { key: null, asc: true };

  function fmtFrac(passes, cases){
    if (typeof passes !== 'number' || typeof cases !== 'number') return '—';
    return `${passes}/${cases}`;
  }
  function ratio(passes, cases){
    return (typeof passes==='number' && typeof cases==='number' && cases>0) ? passes / cases : null;
  }
  function pct(x, d=3){ return (typeof x === 'number' && isFinite(x)) ? (x*100).toFixed(d)+'%' : '—'; }
  function num(x, d=3){ return (typeof x === 'number' && isFinite(x)) ? x.toFixed(d) : '—'; }

  function makeSortTh(text, key){
    const th = document.createElement('th');
    th.textContent = text;
    th.style.cursor = 'pointer';
    th.addEventListener('click', () => {
      if (state.key === key) {
        state.asc = !state.asc; // toggle
      } else {
        state.key = key;
        state.asc = false; // default to descending on first click
      }
      render(window.__DATA);
    });
    return th;
  }

  function buildTable(data){
    const wrap = document.getElementById('results-table');
    if (!wrap) return;
    const table = document.createElement('table');
    table.className = 'table table-hover table-sm';

    const thead = document.createElement('thead');
    // Group header row
    const trg = document.createElement('tr');
    const thModel = document.createElement('th'); thModel.textContent = 'Model'; thModel.rowSpan = 2; trg.appendChild(thModel);
    const thSyntax = document.createElement('th'); thSyntax.textContent = 'Syntax'; thSyntax.colSpan = 5; trg.appendChild(thSyntax);
    const thStatic = document.createElement('th'); thStatic.textContent = 'Semantic/Static'; thStatic.colSpan = 5; trg.appendChild(thStatic);
    const thDynamic = document.createElement('th'); thDynamic.textContent = 'Dynamic'; thDynamic.colSpan = 4; trg.appendChild(thDynamic);
    thead.appendChild(trg);

    // Second header row with sortable cells
    const trh = document.createElement('tr');
    trh.appendChild(makeSortTh('AST','AST_ratio'));
    trh.appendChild(makeSortTh('Expr cases','Expr_cases'));
    trh.appendChild(makeSortTh('Expr@5','Expr_hit5_ratio'));
    trh.appendChild(makeSortTh('Expr@10','Expr_hit10_ratio'));
    trh.appendChild(makeSortTh('Expr@20','Expr_hit20_ratio'));

    trh.appendChild(makeSortTh('CFG','CFG_ratio'));
    trh.appendChild(makeSortTh('CG','CG_ratio'));
    trh.appendChild(makeSortTh('DP F1','DP_F1'));
    trh.appendChild(makeSortTh('Taint F1','Taint_F1'));
    trh.appendChild(makeSortTh('Pointer','Pointer'));

    trh.appendChild(makeSortTh('Mutant FS','Mutant_fewshot'));
    trh.appendChild(makeSortTh('Mutant ZS','Mutant_zeroshot'));
    trh.appendChild(makeSortTh('Flaky Sum','Flaky_summary'));
    trh.appendChild(makeSortTh('Flaky Cpt','Flaky_concept'));

    thead.appendChild(trh);
    table.appendChild(thead);

    const rows = data.map(d => Object.assign({}, d, {
      AST_ratio: ratio(d.AST_passes, d.AST_cases),
      CFG_ratio: ratio(d.CFG_passes, d.CFG_cases),
      CG_ratio: ratio(d.CG_passes, d.CG_cases),
      Expr_hit5_ratio: ratio(d.Expr_hit5, d.Expr_cases),
      Expr_hit10_ratio: ratio(d.Expr_hit10, d.Expr_cases),
      Expr_hit20_ratio: ratio(d.Expr_hit20, d.Expr_cases)
    }));
    if (state.key) {
      const k = state.key;
      rows.sort((a,b)=>{
        if (k==='Model') return state.asc ? String(a.Model).localeCompare(String(b.Model)) : String(b.Model).localeCompare(String(a.Model));
        const va = (a[k]==null? -Infinity : a[k]);
        const vb = (b[k]==null? -Infinity : b[k]);
        return state.asc ? (va - vb) : (vb - va);
      });
    }

    const tbody = document.createElement('tbody');
    for (const d of rows){
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${d.Model}</td>
        <td title="${(d.AST_ratio!=null)?pct(d.AST_ratio,1):'—'}">${fmtFrac(d.AST_passes,d.AST_cases)}</td>
        <td class="text-center">${d.Expr_cases ?? '—'}</td>
        <td class="text-center" title="${(d.Expr_hit5_ratio!=null)?pct(d.Expr_hit5_ratio,1):'—'}">${d.Expr_hit5 ?? '—'}/${d.Expr_cases ?? '—'}</td>
        <td class="text-center" title="${(d.Expr_hit10_ratio!=null)?pct(d.Expr_hit10_ratio,1):'—'}">${d.Expr_hit10 ?? '—'}/${d.Expr_cases ?? '—'}</td>
        <td class="text-center" title="${(d.Expr_hit20_ratio!=null)?pct(d.Expr_hit20_ratio,1):'—'}">${d.Expr_hit20 ?? '—'}/${d.Expr_cases ?? '—'}</td>

        <td title="${(d.CFG_ratio!=null)?pct(d.CFG_ratio,1):'—'}">${fmtFrac(d.CFG_passes,d.CFG_cases)}</td>
        <td title="${(d.CG_ratio!=null)?pct(d.CG_ratio,1):'—'}">${fmtFrac(d.CG_passes,d.CG_cases)}</td>
        <td class="text-center">${num(d.DP_F1,3)}</td>
        <td class="text-center">${num(d.Taint_F1,3)}</td>
        <td class="text-center">${num(d.Pointer,3)}</td>

        <td class="text-center">${pct(d.Mutant_fewshot,3)}</td>
        <td class="text-center">${pct(d.Mutant_zeroshot,3)}</td>
        <td class="text-center">${pct(d.Flaky_summary,3)}</td>
        <td class="text-center">${pct(d.Flaky_concept,3)}</td>
      `;
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    wrap.innerHTML = '';
    wrap.appendChild(table);
  }

  function render(arr){ buildTable(arr); }

  function init(){
    fetch(DATA_URL, { cache: 'no-store' })
      .then(r => { if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); })
      .then(arr => { window.__DATA = arr; render(arr); })
      .catch(err => {
        const el = document.getElementById('results-table');
        if (el) el.innerHTML = `<div class="text-muted">Failed to load results: ${String(err)}</div>`;
      });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
