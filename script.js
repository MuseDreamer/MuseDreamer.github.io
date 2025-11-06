// Clear caches and storage every visit
if ('caches' in window) {
  caches.keys().then(keys => keys.forEach(k => caches.delete(k)));
}
localStorage.clear();
sessionStorage.clear();

// Optional safeguard reload
if (performance.navigation.type === 2) window.location.reload(true);

// Rain animation
const rainCanvas = document.getElementById('rain-canvas');
if (rainCanvas) {
  const ctx = rainCanvas.getContext('2d');
  let drops = Array.from({ length: 150 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    l: 5 + Math.random() * 10,
    xs: -2 + Math.random() * 4,
    ys: 10 + Math.random() * 10
  }));

  function draw() {
    ctx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
    ctx.strokeStyle = 'rgba(130,226,255,0.5)';
    ctx.lineWidth = 1;
    drops.forEach(d => {
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x + d.xs, d.y + d.l);
      ctx.stroke();
    });
    move();
  }

  function move() {
    drops.forEach(d => {
      d.y += d.ys;
      d.x += d.xs;
      if (d.y > window.innerHeight) {
        d.x = Math.random() * window.innerWidth;
        d.y = -20;
      }
    });
  }

  function loop() {
    draw();
    requestAnimationFrame(loop);
  }

  rainCanvas.width = window.innerWidth;
  rainCanvas.height = window.innerHeight;
  loop();
}

// Boot and click sounds
window.addEventListener('DOMContentLoaded', () => {
  const boot = new Audio('sounds/boot.wav');
  const click = new Audio('sounds/click.wav');
  boot.volume = 0.2;
  click.volume = 0.3;
  boot.play();
  document.querySelectorAll('a').forEach(a =>
    a.addEventListener('mouseenter', () => click.play())
  );
});
