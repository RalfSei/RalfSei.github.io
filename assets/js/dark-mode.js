(function () {
  const KEY = "theme";
  const root = document.documentElement;

  // 1) Startzustand: gespeicherter Wert > Systempräferenz > Light
  const saved = localStorage.getItem(KEY);
  if (saved === "dark" || saved === "light") {
    root.setAttribute("data-theme", saved);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.setAttribute("data-theme", "dark");
  } else {
    root.setAttribute("data-theme", "light");
  }

  // 2) Button-Logik
  function setTheme(next) {
    root.setAttribute("data-theme", next);
    localStorage.setItem(KEY, next);
    const btn = document.getElementById("theme-toggle");
    if (btn) btn.setAttribute("aria-pressed", String(next === "dark"));
  }

  window.toggleTheme = function () {
    const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    setTheme(current === "dark" ? "light" : "dark");
  };

  // 3) Systemwechsel live mitnehmen (optional)
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
      const saved = localStorage.getItem(KEY);
      if (!saved) setTheme(e.matches ? "dark" : "light");
    });
  }
})();