import initScrollReveal from "./scripts/scrollReveal";
import initTiltEffect from "./scripts/tiltAnimation";
import { targetElements, defaultProps } from "./data/scrollRevealConfig";

// Initialize Animations
initScrollReveal(targetElements, defaultProps);
initTiltEffect();

// Typewriter Effect
const typedTextSpan = document.querySelector("#typewriter");
const textArray = ["Web Developer", "Cloud Enthusiast", "Creative Coder"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (typedTextSpan && charIndex < textArray[textArrayIndex].length) {
    if (!typedTextSpan.classList.contains("typing")) typedTextSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else if (typedTextSpan) {
    typedTextSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (typedTextSpan && charIndex > 0) {
    if (!typedTextSpan.classList.contains("typing")) typedTextSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else if (typedTextSpan) {
    typedTextSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (typedTextSpan && textArray.length) setTimeout(type, newTextDelay + 250);
});

// Sticky Navbar + Active Link Highlighting
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  // Sticky Logic
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar--scrolled");
    } else {
      navbar.classList.remove("navbar--scrolled");
    }
  }

  // Active Link Highlighting using Intersection Logic (simplified scroll check here)
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href") === `#${current}`) {
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    } else {
      a.removeAttribute("aria-current");
    }
  });
});

// Mobile Menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navbar__nav");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");

    // Prevent background scrolling when menu is open
    document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "auto";
  });

  document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  }));
}

// Year in footer
const yEl = document.querySelector("[data-year]");
if (yEl) yEl.textContent = String(new Date().getFullYear());

// Lazy-load images
document.querySelectorAll("img:not([loading])").forEach(img => img.loading = "lazy");
