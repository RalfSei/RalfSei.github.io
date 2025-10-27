---
layout: default
title: LegalTech-Codebeispiel – KI-Podcast
description: KI-generierter Podcast (EN/DE) mit Covern, Kapiteln & modernen Share-Features
tracks:
  - title: "EU Competitiveness (EN)"
    lang: "EN"
    file: "eu-competitiveness-en.mp3"
    image: "cover-en.jpg"
    chapters: "eu-competitiveness-en.vtt"
  - title: "EU-Wettbewerbsfähigkeit (DE)"
    lang: "DE"
    file: "eu-competitiveness-de.mp3"
    image: "cover-de.jpg"
    chapters: "eu-competitiveness-de.vtt"
pdf: "eu-competitiveness-report.pdf"
---

# LegalTech-Codebeispiel (KI-Podcast)

Dieses Beispiel zeigt, wie aus einem PDF automatisch ein **Podcast-Dialog** generiert wird (synthetische Stimmen – keine echten Personen).  
> EN erstellt mit *NotebookLM (Google)*, DE mit *Podcastgen (Hugging Face)*.

<style>
.podcast-grid {display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;}
.podcast-card {border:1px solid #e5e7eb;border-radius:14px;padding:16px;background:#fff;
  box-shadow:0 1px 2px rgba(0,0,0,.05);transition:transform .12s ease,box-shadow .12s ease;}
.podcast-card:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.06);}
.podcast-cover{width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:10px;background:#f3f4f6;}
.podcast-title{margin:10px 0 4px;font-size:1.1rem;font-weight:700;}
.podcast-meta{margin:0 0 10px;color:#6b7280;font-size:.9rem;}
audio{width:100%;margin-top:8px;}
.podcast-actions a,.podcast-actions button{
 display:inline-block;margin:10px 12px 0 0;font-weight:600;text-decoration:none;
 color:#0f766e;background:#ecfeff;border:1px solid #99f6e4;border-radius:10px;padding:6px 10px;cursor:pointer;}
.podcast-actions a:hover,.podcast-actions button:hover{background:#cffafe;}
.pdf-box{margin-top:20px;padding:12px 14px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:10px;}
@media(max-width:820px){.podcast-grid{grid-template-columns:1fr;}}
</style>

## 🎧 Podcast-Folgen

<div class="podcast-grid">
{% for t in page.tracks %}
  {% assign base = '/assets/podcast/' %}
  {% assign url = base | append: t.file | absolute_url %}
  <div class="podcast-card">
    {% if t.image %}<img class="podcast-cover" src="{{ base | append: t.image }}" alt="Cover zu {{ t.title }}">{% endif %}
    <h3 class="podcast-title">{{ t.title }}</h3>
    <p class="podcast-meta">Sprache: {{ t.lang }}</p>
    <audio controls preload="none">
      <source src="{{ base | append: t.file }}" type="audio/mpeg">
      {% if t.chapters %}<track kind="chapters" src="{{ base | append: t.chapters }}" srclang="en" label="Kapitel">{% endif %}
      Dein Browser unterstützt das Abspielen der Audio-Datei nicht.
    </audio>
    <div class="podcast-actions">
      <a href="{{ base | append: t.file }}" download>⬇️ Download</a>
      <a href="{{ base | append: t.file }}">▶️ Abspielen</a>
      <a href="https://wa.me/?text={{ 'Podcast-Tipp: ' | url_encode }}{{ url | url_encode }}" target="_blank">🟢 WhatsApp</a>
      <a href="https://www.linkedin.com/sharing/share-offsite/?url={{ url | url_encode }}" target="_blank">🔗 LinkedIn</a>
      <a href="https://www.facebook.com/sharer/sharer.php?u={{ url | url_encode }}" target="_blank">📘 Facebook</a>
      <a href="https://twitter.com/intent/tweet?text={{ 'Podcast-Tipp: ' | url_encode }}&url={{ url | url_encode }}" target="_blank">✖️ X</a>
      <button id="copybtn-{{ forloop.index }}" onclick="copyLink('{{ url }}','copybtn-{{ forloop.index }}')">📋 Link kopieren</button>
    </div>
  </div>
{% endfor %}
</div>

{% if page.pdf %}
<div class="pdf-box">
  📘 Quelle/Material: <a href="/assets/podcast/{{ page.pdf }}">Draghi-Report (PDF)</a>
</div>
{% endif %}

---

## 💻 Beispielcode – Transkription mit Whisper

```bash
python -m venv .venv && source .venv/bin/activate
pip install openai-whisper
whisper eu-competitiveness-en.mp3 --model small --language en --task transcribe --output_format txt
