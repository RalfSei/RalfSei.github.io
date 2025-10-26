---
layout: default
title: "Hauptseite"
permalink: /
---

# Inhaltsverzeichnis

{% comment %}
Alle Seiten aus _pages/ anzeigen (Standard: show_on_home = true via defaults).
Sortierung: nav_order, dann title.
{% endcomment %}

{% assign all_pages = site.pages | where_exp: "p", "p.path contains '_pages/'" %}
{% assign visible = all_pages | where_exp: "p", "p.nav != false and p.show_on_home != false" %}
{% assign sorted = visible | sort: "title" | sort: "nav_order" %}

<div class="grid">
  {% for p in sorted %}
    {% assign teaser = p.summary | default: p.excerpt | default: p.content | strip_html | truncate: 160 %}
    <a class="card" href="{{ p.url }}">
      <h3>{{ p.title }}</h3>
      <p>{{ teaser }}</p>
    </a>
  {% endfor %}
</div>