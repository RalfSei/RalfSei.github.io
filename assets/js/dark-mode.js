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

  // 2) Theme setzen (mit Transition-Klasse)
  function setTheme(next) {
    document.documentElement.classList.add("theme-switching");

    root.setAttribute("data-theme", next);
    localStorage.setItem(KEY, next);

    const btn = document.getElementById("theme-toggle");
    if (btn) btn.setAttribute("aria-pressed", String(next === "dark"));

    setTimeout(() => {
      document.documentElement.classList.remove("theme-switching");
    }, 400);
  }

  // 3) Umschalten
  window.toggleTheme = function () {
    const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    setTheme(current === "dark" ? "light" : "dark");
  };

  // 4) Systemwechsel berücksichtigen
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
      const saved = localStorage.getItem(KEY);
      if (!saved) setTheme(e.matches ? "dark" : "light");
    });
  }

  // 5) 🌓 Button-Label & Animation
  document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;

    const update = () => {
      const dark = document.documentElement.getAttribute("data-theme") === "dark";
      btn.textContent = dark ? "☀️ Light Mode" : "🌙 Dark Mode";
    };

    update();

    btn.addEventListener("click", () => {
      btn.classList.add("spin");
      setTimeout(() => btn.classList.remove("spin"), 400);
      setTimeout(update, 150);
    });
  });
})();
