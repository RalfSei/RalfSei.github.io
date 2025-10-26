document.addEventListener("DOMContentLoaded", function () {
  const iconMap = {
    "KI-Regeln": "📜",
    "KI & Recht": "⚖️",
    "Systemanalyse": "🛠️",
    "Zukunft & Trends": "🔮"
  };

  document.querySelectorAll("h2.section-head").forEach(h2 => {
    const text = h2.textContent.trim();
    const icon = iconMap[text];
    if (icon && !h2.textContent.includes(icon)) {
      h2.insertAdjacentText("afterbegin", icon + " ");
    }
  });
});
