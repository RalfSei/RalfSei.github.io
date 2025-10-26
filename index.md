---
layout: default
title: "Hauptseite"
permalink: /
---

# Inhaltsverzeichnis

{% assign candidates = site.pages | sort:'title' | sort:'nav_order' | group_by:'nav_section' %}

{% for group in candidates %}
  {%- assign section_title = group.name | default: 'Weitere Seiten' -%}

  {%- capture cards -%}
    <div class="grid">
    {%- for p in group.items -%}
      {%- if p.path contains '_pages/' and p.nav != false and p.show_on_home != false -%}
        <a class="card" href="{{ p.url }}">
          <h3>{{ p.title }}</h3>
          <p>{{ p.summary | default: p.excerpt | default: p.content | strip_html | truncate: 160 }}</p>
        </a>
      {%- endif -%}
    {%- endfor -%}
    </div>
  {%- endcapture -%}

  {%- if cards contains 'class="card"' -%}
    <h2 class="section-head">{{ section_title }}</h2>
    {{ cards }}
  {%- endif -%}
{% endfor %}