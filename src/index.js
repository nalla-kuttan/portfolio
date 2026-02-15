import initScrollReveal from "./scripts/scrollReveal";
import initTiltAnimation from "./scripts/tiltAnimation";
import { targetElements, defaultProps } from "./data/scrollRevealConfig";

// Sticky header hide/show
const header = document.querySelector("header");
let lastY = 0;
window.addEventListener("scroll", () => {
  const y = window.scrollY || 0;
  header.classList.toggle("is-hidden", y > lastY && y > 80);
  lastY = y;
}, { passive: true });

// Active link highlighting
const navLinks = document.querySelectorAll("nav a[href^='#']");
const sections = Array.from(document.querySelectorAll("section[id]"));
function setActive(hash) {
  navLinks.forEach(a => a.setAttribute("aria-current", a.getAttribute("href") === hash ? "true" : "false"));
}
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      setActive(`#${e.target.id}`);
    }
  });
}, { rootMargin: "-40% 0px -50% 0px", threshold: [0.25, 0.6, 1] });
sections.forEach(s => io.observe(s));

// Projects grid + filters
const GRID = document.querySelector("#project-grid");
const filters = document.querySelectorAll(".filters [data-filter]");
const all = (window.__PROJECTS__ || []);

function render(list) {
  if (!GRID) return;
  GRID.innerHTML = list.map((p, i) => `
    <a class="card" href="${p.url}" target="_blank" rel="noreferrer" style="transition-delay:${i * 30}ms">
      <strong>${p.name}</strong>
      <p class="muted" style="margin-top:8px">${p.desc}</p>
      <div class="tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
    </a>
  `).join("");
}
render(all);

filters.forEach(btn => btn.addEventListener("click", () => {
  filters.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  const cat = btn.dataset.filter;
  const next = cat === "All" ? all : all.filter(p => p.tags.includes(cat));
  render(next);
}));

// Contact feedback
const form = document.querySelector('form[action^="https://formspree.io"]');
if (form) {
  form.addEventListener("submit", () => {
    const sent = document.getElementById("sent");
    if (sent) sent.hidden = false;
  });
}

// Lazy-load any non-lazy images
document.querySelectorAll("img:not([loading])").forEach(img => img.loading = "lazy");

// Year in footer
const yEl = document.querySelector("[data-year]");
if (yEl) yEl.textContent = String(new Date().getFullYear());

// Initialize Animations
initScrollReveal(targetElements, defaultProps);
initTiltAnimation();
