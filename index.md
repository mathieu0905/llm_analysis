---
layout: default
title: 首页
---

<div class="home-header" style="margin:0 0 16px; display:flex; gap:10px; flex-wrap:wrap">
  <a class="btn" href="https://arxiv.org/abs/2305.12138" target="_blank" rel="noopener">📄 arXiv</a>
  <a class="btn" href="{{ site.baseurl }}/results" rel="noopener">📊 结果说明</a>
  <a class="btn" href="{{ site.baseurl }}/results/aggregated_summary.json" target="_blank" rel="noopener">🧾 JSON</a>
</div>

## 最新评测快照

<p class="meta">从 <code>results/aggregated_summary.json</code> 自动读取并渲染。</p>
<div id="results-wrap" class="card"><span class="muted">正在加载数据…</span></div>

<script src="{{ site.baseurl }}/assets/js/results-table.js"></script>

