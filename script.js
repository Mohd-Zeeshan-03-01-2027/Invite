(() => {
  const pages = [...document.querySelectorAll('.invitation-page')];
  const dots = [...document.querySelectorAll('.nav-dot')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.querySelector('.page-inner')?.classList.add('is-visible');
    });
  }, { threshold: 0.22 });
  pages.forEach(page => revealObserver.observe(page));
  const activeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const index = pages.indexOf(entry.target);
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    });
  }, { threshold: 0.55 });
  pages.forEach(page => activeObserver.observe(page));

  const layer = document.querySelector('.petal-layer');
  let lastSpawn = 0;
  function makePetal() {
    if (reducedMotion || document.body.classList.contains('pause-petals') || document.hidden) return;
    const petal = document.createElement('i');
    petal.className = 'petal';
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.setProperty('--drift', `${Math.round(Math.random() * 100 - 50)}px`);
    const duration = 8 + Math.random() * 8;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${Math.random() * 1.5}s`;
    petal.style.opacity = `${.35 + Math.random() * .5}`;
    const size = 7 + Math.random() * 8;
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.4}px`;
    layer.appendChild(petal);
    window.setTimeout(() => petal.remove(), (duration + 2) * 1000);
  }
  function onScroll() {
    const now = Date.now();
    if (now - lastSpawn > 260) { makePetal(); lastSpawn = now; }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  for (let i = 0; i < 8; i++) window.setTimeout(makePetal, i * 500);
  document.getElementById('motionToggle').addEventListener('click', event => {
    const paused = document.body.classList.toggle('pause-petals');
    event.currentTarget.setAttribute('aria-pressed', String(paused));
    event.currentTarget.querySelector('span').textContent = paused ? 'Resume petals' : 'Pause petals';
  });
})();
