---
layout: "default"
title: "Hauptseite"
permalink: "/"
---

# Inhaltsverzeichnis

{% assign all_pages = site.pages | where_exp:'p','p.path contains "_pages/"' %}
{% assign visible = all_pages | where_exp:'p','p.nav != false and p.show_on_home != false' %}
{% assign sorted = visible | sort: 'nav_order' | sort: 'title' %}

<div class="grid">
  {% for p in sorted %}
    {% assign teaser = p.summary | default:p.excerpt | default:p.content | strip_html | truncate:160 %}
    <a class="card" href="{{ p.url }}">
      <h3>{{ p.title }}</h3>
      <p>{{ teaser }}</p>
    </a>
  {% endfor %}
</div>