// ---- Footer year ----
document.getElementById('year').textContent = new Date().getFullYear();

// ---- Masthead row background on scroll ----
const nav = document.getElementById('nav');
const backToTop = document.getElementById('backToTop');
const solidZone = document.querySelector('.solid-zone');
const onScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
  // Homepage: name bar switches from white-on-video to normal once the solid zone reaches it
  if (solidZone) {
    nav.classList.toggle('on-solid', solidZone.getBoundingClientRect().top <= nav.offsetHeight);
  }
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

// ---- Background video: keep it playing ----
// Muted + playsinline autoplays almost everywhere. Where autoplay is blocked
// (iOS Low Power Mode, data saver), start on the first touch/scroll/click,
// and resume whenever the tab becomes visible again.
const bgVideo = document.querySelector('.bg-video video');
if (bgVideo) {
  bgVideo.muted = true;
  const tryPlay = () => { if (bgVideo.paused) bgVideo.play().catch(() => {}); };
  tryPlay();
  bgVideo.addEventListener('canplay', tryPlay);
  ['touchstart', 'pointerdown', 'scroll', 'keydown'].forEach(evt =>
    window.addEventListener(evt, tryPlay, { passive: true }));
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) tryPlay();
  });
}
