const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');

// Repair legacy mojibake without putting non-ASCII bytes in this source file.
const mojibakeMap = {
  '\u00e2\u20ac\u201d': '\u2014', '\u00e2\u20ac\u201c': '\u2013',
  '\u00e2\u2020\u2014': '\u2197', '\u00e2\u2020\u2019': '\u2192',
  '\u00e2\u02dc\u00b0': '\u2630', '\u00c3\u2014': '\u00d7',
  '\u00e2\u02dc\u00be': '\u263e', '\u00e2\u02dc\u20ac': '\u2600',
  '\u00e2\u20ac\u0153': '\u201c', '\u00e2\u20ac\u009d': '\u201d',
  '\u00e2\u20ac\u00a2': '\u2022', '\u00e2\u0153\u00a6': '\u2726',
  '\u00e2\u0153\u00a7': '\u2727', '\u00e2\u201e\u00a1': '\u2661',
  '\u00e2\u201e\u00a5': '\u2665', '\u00e2\u02c6\u017e': '\u221e',
  '\u00e2\u20ac\u00b9': '\u20b9', '\u00e2\u2014\u0161': '\u25ce',
  '\u00c2\u00b7': '\u00b7', '\u00c2\u00a9': '\u00a9'
};
function repairText(value) {
  return Object.entries(mojibakeMap).reduce((text, [bad, good]) => text.replaceAll(bad, good), value);
}

document.title = repairText(document.title);
const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
const textNodes = [];
while (textWalker.nextNode()) textNodes.push(textWalker.currentNode);
textNodes.forEach(node => { node.nodeValue = repairText(node.nodeValue); });
document.querySelectorAll('[aria-label], [alt]').forEach(element => {
  ['aria-label', 'alt'].forEach(attribute => {
    if (element.hasAttribute(attribute)) element.setAttribute(attribute, repairText(element.getAttribute(attribute)));
  });
});

const cloudField = document.createElement('div');
cloudField.className = 'cloud-field';
cloudField.setAttribute('aria-hidden', 'true');
cloudField.innerHTML = '<span class="cloud cloud-one"></span><span class="cloud cloud-two"></span><span class="cloud cloud-three"></span><span class="cloud-sparkle sparkle-one">&#x2726;</span><span class="cloud-sparkle sparkle-two">&#x2727;</span><span class="cloud-sparkle sparkle-three">&#x2661;</span>';
document.body.appendChild(cloudField);

function setMenu(open) {
  nav?.classList.toggle('open', open);
  menuButton?.setAttribute('aria-expanded', String(open));
  if (menuButton) {
    menuButton.textContent = open ? '\u00d7' : '\u2630';
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
}

const portraitStyle = document.createElement('style');
portraitStyle.textContent = `.photo-portrait{background:url("WhatsApp Image 2026-07-26 at 10.05.49 PM.jpeg") center 20%/cover no-repeat!important}.photo-portrait:before,.photo-portrait:after{display:none}.photo-portrait .portrait-letter,.photo-portrait .portrait-doodle{display:none}.author-email{display:inline-block;margin:18px 0 0;padding:10px 18px;border:1px solid rgba(255,255,255,.7);border-radius:999px;background:#fff;color:#4b315f!important;font-size:13px;font-weight:600;letter-spacing:.02em;box-shadow:0 8px 24px rgba(38,22,50,.18)}.night-mode .button-white{color:#2e2634!important;background:#fff!important}.hero-actions .button-dark{background:#2e2634!important;color:#fff!important;box-shadow:0 8px 22px rgba(46,38,52,.28)}.hero-actions .button-dark span{color:#f2d8b1!important}@media(max-width:800px){.hero-art,.book-cover,.published-cover,.contact-card{touch-action:pan-y}}`;
document.head.appendChild(portraitStyle);

document.querySelectorAll('.portrait').forEach(portrait => portrait.classList.add('photo-portrait'));
document.querySelectorAll('a[href^="mailto:"]').forEach(link => { link.href = 'mailto:shravaniveldurthi778@gmail.com'; });
document.querySelectorAll('.contact-inner, .contact-card').forEach(section => {
  if (!section.querySelector('.author-email')) {
    const email = document.createElement('p');
    email.className = 'author-email';
    email.textContent = 'shravaniveldurthi778@gmail.com';
    section.appendChild(email);
  }
});

menuButton?.addEventListener('click', () => setMenu(!nav?.classList.contains('open')));
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => setMenu(false)));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
} else document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));

const progress = document.querySelector('.reading-progress span');
function updateProgress() {
  if (!progress) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const quotes = ['Some stories arrive softly \u2014 then stay forever.', 'A quiet heart can still hold an entire universe.', 'The best chapters make us feel a little less alone.'];
const quote = document.querySelector('[data-quote]');
let quoteIndex = 0;
if (quote) setInterval(() => {
  quote.style.opacity = '0';
  setTimeout(() => { quoteIndex = (quoteIndex + 1) % quotes.length; quote.textContent = quotes[quoteIndex]; quote.style.opacity = '1'; }, 250);
}, 5000);

const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
cursorGlow.setAttribute('aria-hidden', 'true');
document.body.appendChild(cursorGlow);
const starCursor = document.createElement('div');
starCursor.className = 'star-cursor';
starCursor.textContent = '\u2726';
starCursor.setAttribute('aria-hidden', 'true');
document.body.appendChild(starCursor);

if (window.matchMedia?.('(pointer: fine)').matches) {
  const homeHero = document.querySelector('.home-only .hero');
  const heroCopy = document.querySelector('.home-only .hero-copy');
  const heroArt = document.querySelector('.home-only .hero-art');
  document.addEventListener('mousemove', event => {
    cursorGlow.style.left = `${event.clientX}px`; cursorGlow.style.top = `${event.clientY}px`;
    starCursor.style.left = `${event.clientX}px`; starCursor.style.top = `${event.clientY}px`;
    cloudField.style.setProperty('--cloud-x', `${(event.clientX / window.innerWidth - 0.5) * 12}px`);
    cloudField.style.setProperty('--cloud-y', `${(event.clientY / window.innerHeight - 0.5) * 8}px`);
    if (!homeHero) return;
    const x = event.clientX / window.innerWidth - 0.5; const y = event.clientY / window.innerHeight - 0.5;
    if (heroCopy) heroCopy.style.transform = `translate3d(${x * -8}px,${y * -8}px,35px)`;
    if (heroArt) heroArt.style.transform = `perspective(1100px) rotateY(${x * -7 - 4}deg) rotateX(${y * 5 + 2}deg) translateZ(30px)`;
  });
  document.querySelectorAll('a,button').forEach(item => {
    item.addEventListener('mouseenter', () => starCursor.classList.add('is-hovering'));
    item.addEventListener('mouseleave', () => { starCursor.classList.remove('is-hovering'); item.style.transform = ''; });
  });
}

const titleReplacements = [['Love Under the Balcony Eclipse', 'Love Under The Balcony Eclipse'], ['The Storm Was Never the Sea', 'The Storm Was Never In The Sea']];
document.querySelectorAll('.book-copy h2,.shelf-copy h2,.new-book-feature h3').forEach(heading => titleReplacements.forEach(([oldTitle, newTitle]) => { heading.textContent = heading.textContent.replaceAll(oldTitle, newTitle); }));

// Shared studio interactions: compact the header and gently stagger visual reveals.
const header = document.querySelector('.site-header');
function syncHeader() { header?.classList.toggle('is-scrolled', window.scrollY > 24); }
window.addEventListener('scroll', syncHeader, { passive: true });
syncHeader();

const footer = document.querySelector('.footer');
if (footer && !footer.querySelector('.footer-nav')) {
  const footerNav = document.createElement('nav');
  footerNav.className = 'footer-nav';
  footerNav.setAttribute('aria-label', 'Footer navigation');
  footerNav.innerHTML = '<a href="about.html">About</a><a href="books.html">Books</a><a href="journey.html">Journey</a><a href="contact.html">Say hello</a>';
  footer.insertBefore(footerNav, footer.querySelector('p'));
}

document.querySelectorAll('.journey-card,.shelf-book,.book-layout').forEach((element, index) => {
  element.classList.add('reveal');
  element.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
  requestAnimationFrame(() => element.classList.add('visible'));
});

if (window.matchMedia?.('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.book-cover,.published-cover').forEach(cover => {
    cover.addEventListener('pointermove', event => {
      const box = cover.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - .5;
      const y = (event.clientY - box.top) / box.height - .5;
      cover.style.transform = `perspective(900px) rotateY(${x * -7}deg) rotateX(${y * 5}deg) translateY(-8px)`;
    });
    cover.addEventListener('pointerleave', () => { cover.style.transform = ''; });
  });
}
