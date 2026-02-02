const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const searchInput = document.getElementById("searchInput");
const recipeGrid = document.getElementById("recipeGrid");
const chips = Array.from(document.querySelectorAll(".chip[data-tag]"));
const clearBtn = document.getElementById("clearFilters");

let activeTag = null;

function normalizeFa(text) {
  return (text || "")
    .toString()
    .trim()
    .replaceAll("ي", "ی")
    .replaceAll("ك", "ک")
    .replace(/\s+/g, " ");
}

function applyFilters() {
  const q = normalizeFa(searchInput?.value).toLowerCase();
  const cards = Array.from(recipeGrid.querySelectorAll(".card"));

  cards.forEach(card => {
    const title = normalizeFa(card.getAttribute("data-title")).toLowerCase();
    const tags = normalizeFa(card.getAttribute("data-tags")).toLowerCase();

    const matchesText = !q || title.includes(q) || tags.includes(q);
    const matchesTag = !activeTag || tags.includes(normalizeFa(activeTag).toLowerCase());

    card.style.display = (matchesText && matchesTag) ? "" : "none";
  });
}

chips.forEach(chip => {
  chip.addEventListener("click", () => {
    const tag = chip.getAttribute("data-tag");
    if (activeTag === tag) activeTag = null;
    else activeTag = tag;

    chips.forEach(c => c.classList.remove("active"));
    if (activeTag) chip.classList.add("active");

    applyFilters();
  });
});

clearBtn?.addEventListener("click", () => {
  activeTag = null;
  chips.forEach(c => c.classList.remove("active"));
  if (searchInput) searchInput.value = "";
  applyFilters();
});

searchInput?.addEventListener("input", applyFilters);
