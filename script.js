// ---- Footer year ----
document.getElementById('year').textContent = new Date().getFullYear();

// ---- Masthead row background on scroll ----
const nav = document.getElementById('nav');
const backToTop = document.getElementById('backToTop');
const onScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
  backToTop.hidden = window.scrollY < 400;
};
window.addEventListener('scroll', onScroll);
onScroll();
backToTop.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---- Bracket nav: highlight current section ----
const bracketLinks = document.querySelectorAll('.bracket-nav a');
const navSections = document.querySelectorAll('.section[id]');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    bracketLinks.forEach(link => {
      link.classList.toggle('current', link.dataset.section === entry.target.id);
    });
  });
}, { rootMargin: '-40% 0px -55% 0px' });
navSections.forEach(section => navObserver.observe(section));

// ---- Scroll reveal ----
const revealTargets = document.querySelectorAll('.section');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealTargets.forEach(el => revealObserver.observe(el));

// ---- Work filter ----
const filterBar = document.getElementById('filterBar');
const cards = document.querySelectorAll('.card');
filterBar?.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const filter = btn.dataset.filter;
  cards.forEach(card => {
    const match = filter === 'all' || card.dataset.category === filter;
    card.classList.toggle('hidden', !match);
  });
});
