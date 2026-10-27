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
// Tabs: Personal Practice, then one Work tab per client (data-client).
const filterBar = document.getElementById('filterBar');
const cards = document.querySelectorAll('.card');
filterBar?.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const { filter, client } = btn.dataset;
  cards.forEach(card => {
    const match = card.dataset.category === filter && (!client || card.dataset.client === client);
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

// ---- Lightbox: click an image to view it large, arrows step through the project ----
// Project pages: every image in .project-media is one set.
// Homepage: each card without a project page (.card-static) is its own set. Videos are skipped.
const lightboxSets = [];
const projectMedia = document.querySelector('.project-media');
if (projectMedia) lightboxSets.push([...projectMedia.querySelectorAll('img')]);
document.querySelectorAll('.card-static').forEach(card => lightboxSets.push([...card.querySelectorAll('img')]));

if (lightboxSets.some(set => set.length)) {
  const box = document.createElement('div');
  box.className = 'lightbox';
  box.hidden = true;
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.innerHTML = `
    <img class="lightbox-img" alt="">
    <button class="lightbox-btn lightbox-close" aria-label="Close">×</button>
    <button class="lightbox-btn lightbox-prev" aria-label="Previous">←</button>
    <button class="lightbox-btn lightbox-next" aria-label="Next">→</button>
    <span class="lightbox-count"></span>`;
  document.body.appendChild(box);
  const boxImg = box.querySelector('.lightbox-img');
  const count = box.querySelector('.lightbox-count');
  let set = [], index = 0;

  const show = (i) => {
    index = (i + set.length) % set.length;
    const src = set[index];
    boxImg.src = src.currentSrc || src.src;
    boxImg.alt = src.alt;
    boxImg.classList.toggle('logo-ink', src.classList.contains('logo-ink'));
    count.textContent = set.length > 1 ? `${index + 1} / ${set.length}` : '';
    // Warm up the neighbours so stepping feels instant
    [index - 1, index + 1].forEach(n => { new Image().src = set[(n + set.length) % set.length].src; });
  };
  const open = (images, i) => {
    set = images;
    box.classList.toggle('single', set.length < 2);
    show(i);
    box.hidden = false;
    document.documentElement.classList.add('lightbox-open');
  };
  const close = () => {
    box.hidden = true;
    document.documentElement.classList.remove('lightbox-open');
  };

  lightboxSets.forEach(images => images.forEach((img, i) => {
    img.classList.add('zoomable');
    img.addEventListener('click', () => open(images, i));
  }));

  box.querySelector('.lightbox-prev').addEventListener('click', () => show(index - 1));
  box.querySelector('.lightbox-next').addEventListener('click', () => show(index + 1));
  box.querySelector('.lightbox-close').addEventListener('click', close);
  box.addEventListener('click', (e) => { if (e.target === box) close(); });
  document.addEventListener('keydown', (e) => {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(index - 1);
    else if (e.key === 'ArrowRight') show(index + 1);
  });

  // Swipe left/right on touch screens
  let touchX = null;
  box.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', (e) => {
    if (touchX === null || set.length < 2) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
    touchX = null;
  });
}
