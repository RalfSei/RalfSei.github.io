document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("toggle-dark-mode");
  if (!btn) return; // Falls Button nicht vorhanden

  // Zustand beim Laden prüfen
  if (localStorage.getItem("dark-mode") === "enabled") {
    document.body.classList.add("dark-mode");
    btn.textContent = "☀️ Hell Mode";
  }

  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("dark-mode", "enabled");
      btn.textContent = "☀️ Hell Mode";
    } else {
      localStorage.setItem("dark-mode", "disabled");
      btn.textContent = "🌙 Dark Mode";
    }
  });
});
