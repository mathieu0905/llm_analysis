---
layout: default
title: 结果说明
permalink: /results
---

{% capture md %}
{% include_relative pages/results-source.md %}
{% endcapture %}
{{ md | markdownify }}
