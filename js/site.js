document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menus = document.querySelectorAll('[data-menu]');
  if (toggle && menus.length) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      menus.forEach((menu) => menu.classList.toggle('is-open', !open));
    });
  }
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) {
    document.body.classList.add('motion-ready');
    const revealTargets = document.querySelectorAll('.hero .container > *, .page-intro .container > *, .section .container > h2, .section .container > .lede, .section .container > .grid-3, .section .container > .grid-2, .service-detail, .contact-panel, .book-cover');
    revealTargets.forEach((element, index) => {
      element.classList.add('reveal');
      element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    });
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealTargets.forEach((element) => observer.observe(element));
  }
  document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
});
