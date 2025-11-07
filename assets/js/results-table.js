(function(){
  const wrap = document.getElementById('results-wrap');
  const fmt = (n, d=3) => (typeof n === 'number' && isFinite(n)) ? n.toFixed(d) : '—';
  const pct = (n, d=1) => (typeof n === 'number' && isFinite(n)) ? (n*100).toFixed(d)+'%' : '—';
  const passCell = (o) => (o && typeof o.passes === 'number' && typeof o.cases === 'number') ? `${o.passes}/${o.cases}` : '—';

  function buildTable(data) {
    if (!wrap) return;
    if (!data || !data.summary || !Object.keys(data.summary).length) {
      wrap.innerHTML = '<span class="muted">未找到可用数据。</span>';
      return;
    }

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th>Model</th>
        <th>AST</th>
        <th>CFG</th>
        <th>CG</th>
        <th>DP F1</th>
        <th>Taint F1</th>
        <th>Pointer</th>
        <th>Mutant FS</th>
        <th>Mutant ZS</th>
        <th>Flaky Sum</th>
        <th>Flaky Cpt</th>
        <th>Expr</th>
        <th>Expr@5</th>
        <th>Expr@10</th>
        <th>Expr@20</th>
      </tr>`;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    for (const m of Object.keys(data.summary)) {
      const s = data.summary[m] || {};
      const tr = document.createElement('tr');
      const dp = s.DP_TAINT || {};
      const ptr = s.POINTER || {};
      const fl = s.FLAKY || {}; const fls = fl.summary || {}; const flc = fl.concept || {};
      const mu = s.MUTANT || {}; const muf = (mu.fewshot||{}); const muz = (mu.zeroshot||{});
      const ex = s.EXPRESSION || {};
      tr.innerHTML = `
        <td class="num"><strong>${m}</strong></td>
        <td class="num">${passCell(s.AST)}</td>
        <td class="num">${passCell(s.CFG)}</td>
        <td class="num">${passCell(s.CG)}</td>
        <td class="num">${fmt(dp.avg_f1)}</td>
        <td class="num">${fmt(dp.taint_avg_f1)}</td>
        <td class="num">${fmt(ptr.avg_program_jaccard)}</td>
        <td class="num">${pct(muf.accuracy)}</td>
        <td class="num">${pct(muz.accuracy)}</td>
        <td class="num">${pct(fls.accuracy)}</td>
        <td class="num">${pct(flc.accuracy)}</td>
        <td class="num">${ex.cases ?? '—'}</td>
        <td class="num">${ex.hit5 ?? '—'}</td>
        <td class="num">${ex.hit10 ?? '—'}</td>
        <td class="num">${ex.hit20 ?? '—'}</td>
      `;
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    wrap.innerHTML = '';
    wrap.appendChild(table);
  }

  fetch(`${window.location.origin}${window.location.pathname.replace(/\/?$/, '/')}${'results/aggregated_summary.json'}`, { cache: 'no-store' })
    .then(r => { if (!r.ok) throw new Error('HTTP '+r.status); return r.json(); })
    .then(buildTable)
    .catch(err => {
      if (!wrap) return;
      wrap.innerHTML = `<span class="muted">加载失败：${String(err)}。请确认 <code>results/aggregated_summary.json</code> 已被推送。</span>`;
    });
})();

