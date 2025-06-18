---

## title: dumpstack.log.tmp auslesen description: Wie man die Datei dumpstack.log.tmp unter Windows sichtbar macht und analysiert.

# 🛠️ `dumpstack.log.tmp` auslesen

Windows erstellt beim Start oder bei Fehlern manchmal die Datei `C:\dumpstack.log.tmp`. Sie enthält **binäre Debug-Informationen** – für Menschen kaum lesbar. Hier zeige ich, wie man sie **kopiert** und mit passenden Tools untersucht.

---

## 🔍 Was ist `dumpstack.log.tmp`?

- Temporäre Debug-Datei von Windows
- Meist im Systemlaufwerk (C:)
- Wird durch Kernel-Dumps oder Fast Startup erzeugt
- **Nicht im Klartext** lesbar – enthält Binärdaten

---

## 📺 Tools zur Analyse

### ✅ Option 1: Hex-Editor (einfach)

- **Tool:** [HxD](https://mh-nexus.de/en/hxd/)
- Öffne die Datei – du siehst Hex-Werte und Klartextfragmente
- Nützlich, um zu erkennen, *ob* lesbare Daten enthalten sind

### ✅ Option 2: WinDbg (gründlich)

- **Tool:** [WinDbg Preview](https://apps.microsoft.com/store/detail/windbg-preview/9PGJGD53TN86)
- Microsoft-Debugger zum Analysieren von Dump-Dateien
- Öffne `dumpstack.log.tmp` mit `File > Open Dump File`
- Gib `!analyze -v` ein für eine erste Analyse
- Optional: Symbolpfad setzen:
  ```
  .sympath srv*
  .reload
  ```

---

## 📁 Datei kopieren mit PowerShell

Die Datei ist oft vom System blockiert. Dieses Skript kopiert sie in einen zugänglichen Ordner:

```powershell
# Zielpfad
$zielPfad = "C:\Temp\dumpstack_copy.tmp"
$quelle = "C:\dumpstack.log.tmp"

# Ordner anlegen
if (-not (Test-Path "C:\Temp")) {
    New-Item -Path "C:\Temp" -ItemType Directory | Out-Null
}

# Adminrechte prüfen
if (-not ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltinRole]::Administrator)) {
    Write-Host "Dieses Skript muss als Administrator ausgeführt werden!" -ForegroundColor Red
    break
}

# Datei kopieren
try {
    Copy-Item -Path $quelle -Destination $zielPfad -Force
    Write-Host "Datei erfolgreich kopiert nach: $zielPfad" -ForegroundColor Green
} catch {
    Write-Host "Fehler beim Kopieren: $($_.Exception.Message)" -ForegroundColor Red
}
```

**Wichtig:** PowerShell als Administrator starten!

---

## 🧽 Datei löschen (optional)

```powershell
Remove-Item "C:\Temp\dumpstack_copy.tmp" -Force
```

---

## ⚠️ Hinweis

Diese Datei dient nur zur Analyse – **nicht verändern**, nicht zurückschreiben. Unsachgemäße Änderungen können das Systemverhalten beeinflussen.

---

**Verfasser:** Ralf Seidenschwang\
**Letzte Aktualisierung:** {{ site.time | date: "%d.%m.%Y" }}

