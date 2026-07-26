const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
const themeButton = document.querySelector('.theme-button');

const cloudField = document.createElement('div');
cloudField.className = 'cloud-field';
cloudField.setAttribute('aria-hidden', 'true');
cloudField.innerHTML = '<span class="cloud cloud-one"></span><span class="cloud cloud-two"></span><span class="cloud cloud-three"></span><span class="cloud-sparkle sparkle-one">✦</span><span class="cloud-sparkle sparkle-two">✧</span><span class="cloud-sparkle sparkle-three">♡</span>';
document.body.appendChild(cloudField);

function setMenu(open) {
  nav?.classList.toggle('open', open);
  menuButton?.setAttribute('aria-expanded', String(open));
  if (menuButton) menuButton.textContent = open ? '×' : '☰';
}

// MoonStone is the author's pen name.
const portraitStyle = document.createElement('style');
portraitStyle.textContent = `
  .photo-portrait { background: url("WhatsApp Image 2026-07-26 at 10.05.49 PM.jpeg") center 20% / cover no-repeat !important; }
  .photo-portrait::before, .photo-portrait::after { display: none; }
  .photo-portrait .portrait-letter, .photo-portrait .portrait-doodle { display: none; }
`;
document.head.appendChild(portraitStyle);
document.querySelectorAll('.portrait').forEach(portrait => portrait.classList.add('photo-portrait'));
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
  link.href = 'mailto:shravaniveldurthi778@gmail.com';
});

document.title = document.title.replace(/Shravani Veldurthi|Shravani/gi, 'MoonStone');
document.querySelectorAll('.brand-name').forEach(brand => {
  brand.innerHTML = 'MoonStone';
});
document.querySelectorAll('.brand-mark').forEach(mark => {
  mark.innerHTML = 'M<span>S</span>';
});
document.querySelectorAll('[aria-label*="Shravani"], [aria-label*="Veldurthi"]').forEach(item => {
  item.setAttribute('aria-label', item.getAttribute('aria-label').replace(/Shravani Veldurthi|Shravani/gi, 'MoonStone'));
});
document.body.innerHTML = document.body.innerHTML.replace(/Shravani Veldurthi|Shravani/gi, 'MoonStone');
document.querySelectorAll('.portrait').forEach(portrait => portrait.classList.add('photo-portrait'));
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
  link.href = 'mailto:shravaniveldurthi778@gmail.com';
});

menuButton?.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => setMenu(false)));

const savedTheme = localStorage.getItem('sv-theme');
if (savedTheme !== 'light') document.body.classList.add('night-mode');
function updateThemeButton() {
  if (!themeButton) return;
  const night = document.body.classList.contains('night-mode');
  themeButton.textContent = night ? '☀' : '☾';
  themeButton.setAttribute('aria-pressed', String(night));
  themeButton.setAttribute('aria-label', night ? 'Switch to light mode' : 'Switch to night mode');
}
updateThemeButton();
themeButton?.addEventListener('click', () => {
  document.body.classList.toggle('night-mode');
  localStorage.setItem('sv-theme', document.body.classList.contains('night-mode') ? 'night' : 'light');
  updateThemeButton();
});

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add('visible');
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
cursorGlow.setAttribute('aria-hidden', 'true');
document.body.appendChild(cursorGlow);
const starCursor = document.createElement('div');
starCursor.className = 'star-cursor';
starCursor.textContent = '✦';
starCursor.setAttribute('aria-hidden', 'true');
document.body.appendChild(starCursor);

function updateProgress() {
  const progress = document.querySelector('.reading-progress span');
  if (!progress) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const quotes = [
  'Some stories arrive softly — then stay forever.',
  'A quiet heart can still hold an entire universe.',
  'The best chapters make us feel a little less alone.'
];
const quote = document.querySelector('[data-quote]');
let quoteIndex = 0;
if (quote) {
  setInterval(() => {
    quote.style.opacity = '0';
    setTimeout(() => {
      quoteIndex = (quoteIndex + 1) % quotes.length;
      quote.textContent = quotes[quoteIndex];
      quote.style.opacity = '1';
    }, 250);
  }, 5000);
}

if (window.matchMedia('(pointer: fine)').matches) {
  const homeHero = document.querySelector('.home-only .hero');
  const heroCopy = document.querySelector('.home-only .hero-copy');
  const heroArt = document.querySelector('.home-only .hero-art');
  const magneticItems = document.querySelectorAll('.home-only .hero-actions .button, .home-only .hero-actions .text-link');

  document.addEventListener('mousemove', event => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
    starCursor.style.left = `${event.clientX}px`;
    starCursor.style.top = `${event.clientY}px`;
    if (Math.random() > 0.82) {
      const spark = document.createElement('span');
      spark.className = 'cursor-spark';
      spark.textContent = Math.random() > 0.5 ? '✦' : '✧';
      spark.style.left = `${event.clientX + (Math.random() * 18 - 9)}px`;
      spark.style.top = `${event.clientY + (Math.random() * 18 - 9)}px`;
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 750);
    }
    cloudField.style.setProperty('--cloud-x', `${(event.clientX / window.innerWidth - 0.5) * 12}px`);
    cloudField.style.setProperty('--cloud-y', `${(event.clientY / window.innerHeight - 0.5) * 8}px`);
    if (!homeHero) return;
    const x = (event.clientX / window.innerWidth - 0.5);
    const y = (event.clientY / window.innerHeight - 0.5);
    if (heroCopy) heroCopy.style.transform = `translate3d(${x * -8}px, ${y * -8}px, 35px)`;
    if (heroArt) heroArt.style.transform = `perspective(1100px) rotateY(${x * -7 - 4}deg) rotateX(${y * 5 + 2}deg) translateZ(30px)`;
  });
  document.querySelectorAll('a, button').forEach(item => {
    item.addEventListener('mouseenter', () => starCursor.classList.add('is-hovering'));
    item.addEventListener('mouseleave', () => starCursor.classList.remove('is-hovering'));
    item.addEventListener('mousemove', event => {
      const box = item.getBoundingClientRect();
      const x = (event.clientX - box.left - box.width / 2) * 0.16;
      const y = (event.clientY - box.top - box.height / 2) * 0.16;
      item.style.transform = `translate(${x}px, ${y}px)`;
    });
    item.addEventListener('mouseleave', () => { item.style.transform = ''; });
  });
  document.querySelectorAll('.hero-art, .book-cover, .published-cover, .contact-card').forEach(card => {
    card.addEventListener('mousemove', event => {
      const box = card.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      const strength = card.classList.contains('contact-card') ? 3 : 6;
      card.style.transform = `perspective(900px) rotateX(${-y * strength}deg) rotateY(${x * strength}deg) translateZ(4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}
