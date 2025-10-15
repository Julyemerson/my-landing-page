// Mobile menu toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

// Intersection Observer for section fade-in animation
const sections = document.querySelectorAll(".section-fade-in");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  }
);
sections.forEach((section) => {
  observer.observe(section);
});

// Language switcher logic
const translatableElements = document.querySelectorAll("[data-lang-en]");
const langButtons = document.querySelectorAll(".lang-button");

function setLanguage(lang) {
  translatableElements.forEach((el) => {
    const text = el.getAttribute(`data-lang-${lang}`);
    if (text) {
      // Using innerHTML to correctly render styled spans if any
      if (el.children.length > 0 && el.querySelector("span")) {
        const span = el.querySelector("span").outerHTML;
        el.innerHTML = `${span} ${text}`;
      } else {
        el.textContent = text;
      }
    }
  });

  langButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });

  // Set HTML lang attribute for accessibility
  document.documentElement.lang = lang;

  try {
    localStorage.setItem("language", lang);
  } catch (e) {
    console.warn("Could not save language preference to localStorage.", e);
  }
}

langButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const lang = e.target.dataset.lang;
    if (lang) {
      setLanguage(lang);
      // If in mobile menu, close it after selection
      if (
        mobileMenu.contains(e.target) &&
        !mobileMenu.classList.contains("hidden")
      ) {
        mobileMenu.classList.add("hidden");
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  let initialLang = "en";
  try {
    const savedLang = localStorage.getItem("language");
    const browserLang = navigator.language.split("-")[0];
    initialLang = savedLang || (browserLang === "pt" ? "pt" : "en");
  } catch (e) {
    console.warn("Could not access localStorage. Defaulting to English.", e);
    const browserLang = navigator.language.split("-")[0];
    initialLang = browserLang === "pt" ? "pt" : "en";
  }
  setLanguage(initialLang);
});
