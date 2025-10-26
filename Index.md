---
layout: default
title: "Hauptseite"
permalink: /
---

# Inhaltsverzeichnis

<div class="grid">
{% for p in site.pages %}
  {% if p.path contains '_pages/' and p.nav != false and p.show_on_home != false %}
    <a class="card" href="{{ p.url }}">
      <h3>{{ p.title }}</h3>
      <p>{{ p.summary | default: p.excerpt | default: p.content | strip_html | truncate: 160 }}</p>
    </a>
  {% endif %}
{% endfor %}
</div>
