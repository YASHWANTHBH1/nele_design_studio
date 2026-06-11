const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setupMobileMenu() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-mobile-menu]");
  const close = document.querySelector("[data-menu-close]");

  if (!toggle || !menu || !close) return;

  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
  }

  toggle.addEventListener("click", () => setMenu(true));
  close.addEventListener("click", () => setMenu(false));
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });
}

function setupScrollReveal() {
  const elements = document.querySelectorAll("[data-animate]");
  if (!elements.length) return;

  if (prefersReducedMotion) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  elements.forEach((element) => observer.observe(element));
}

function setupCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const formatter = new Intl.NumberFormat("en-IN");

  function animateCounter(counter) {
    const target = Number(counter.dataset.count);
    const suffix = counter.dataset.suffix || "";
    const duration = 1100;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = `${formatter.format(Math.round(target * eased))}${suffix}`;

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  if (prefersReducedMotion) {
    counters.forEach((counter) => {
      counter.textContent = `${formatter.format(Number(counter.dataset.count))}${counter.dataset.suffix || ""}`;
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function markCurrentPage() {
  const current = document.body.dataset.page;
  if (!current) return;

  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.nav === current);
  });
}

setupMobileMenu();
setupScrollReveal();
setupCounters();
markCurrentPage();
