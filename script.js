// script.js
// - Cache-busting on load
// - Intercept same-site nav links and run glassy transition
// - Small helper to set active nav links

// --- CACHE CLEARER ---
(function clearCaches(){
  try {
    if ('caches' in window) {
      caches.keys().then(keys => keys.forEach(k => caches.delete(k)));
    }
    localStorage.clear();
    sessionStorage.clear();
  } catch(e){}
  // add query param versioning to linked resources on load
  window.addEventListener('load', () => {
    document.querySelectorAll('link[rel="stylesheet"], script[src]').forEach(el => {
      const attr = el.tagName === 'LINK' ? 'href' : 'src';
      const base = el.getAttribute(attr)?.split('?')[0];
      if (base) el.setAttribute(attr, base + '?v=' + Date.now());
    });
  });
})();

// --- GLASSY TRANSITION HANDLER ---
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.createElement('div');
  overlay.id = 'glass-transition';
  overlay.innerHTML = '<div class="glow"></div>';
  document.body.appendChild(overlay);

  function showTransition(href) {
    overlay.classList.add('active');
    // fade & slight scale then navigate
    setTimeout(() => {
      // navigate after transition
      window.location.href = href;
    }, 420);
  }

  // attach to internal links
  document.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href');
    // skip external links and anchors
    if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) return;
    a.addEventListener('click', (e) => {
      // allow ctrl/cmd click to open in new tab
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      showTransition(href);
    });
  });

  // Add small keyboard shortcut: press "m" to go to music
  document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'm') {
      showTransition('music.html');
    }
  });

  // set active link styling by pathname
  const links = document.querySelectorAll('.nav-links a');
  const path = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === path || (href === 'index.html' && path === '')) {
      a.classList.add('active');
    }
  });
});
