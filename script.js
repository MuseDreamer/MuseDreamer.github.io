// Windows95-inspired UI script
// features: rain canvas, page transitions, link sounds, nav fade
document.addEventListener('DOMContentLoaded', () => {
  /* -------------------------
     sound setup (optional)
     -------------------------*/
  const snd = {
    click: new Audio('sounds/click.wav'),
    boot:  new Audio('sounds/boot.wav'),
    type:  new Audio('sounds/type.wav')
  };
  // Set volumes
  snd.click.volume = 0.25;
  snd.boot.volume = 0.35;
  snd.type.volume = 0.12;
  // try to play boot (may be blocked by browser)
  setTimeout(()=> snd.boot.play().catch(()=>{}), 400);

  // play click on hover for nav (pleasant feedback)
  document.querySelectorAll('.navlink, .menu.start, .win-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
      snd.click.currentTime = 0;
      snd.click.play().catch(()=>{});
    });
  });

  /* -------------------------
     page transition (smooth)
     - intercept internal links and fade-out before navigate
     -------------------------*/
  function attachNavFade() {
    document.querySelectorAll('a.navlink').forEach(a => {
      // only intercept same-origin navigation
      a.addEventListener('click', e => {
        const href = a.getAttribute('href');
        if (!href || href.startsWith('http')) return; // allow external links
        e.preventDefault();
        document.documentElement.classList.add('page-fade-out');
        // small delay to let animation play
        setTimeout(() => {
          window.location.href = href;
        }, 360);
      });
    });
  }
  attachNavFade();

  // fade-in on load
  document.documentElement.classList.add('page-fade-in');

  /* -------------------------
     rain animation (canvas)
     -------------------------*/
  const canvas = document.getElementById('rain-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W = innerWidth, H = innerHeight, drops = [];

    function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
    addEventListener('resize', resize);
    resize();

    // create drops
    const COUNT = Math.floor((W*H)/10000); // density relative to screen area
    for (let i=0;i<COUNT;i++){
      drops.push({
        x: Math.random()*W,
        y: Math.random()*H,
        l: 8 + Math.random()*12,
        xs: -0.5 + Math.random()*1.2,
        ys: 6 + Math.random()*10,
        a: 0.05 + Math.random()*0.15
      });
    }

    function draw() {
      ctx.clearRect(0,0,W,H);
      // slight tint
      ctx.fillStyle = 'rgba(0,0,0,0.12)';
      ctx.fillRect(0,0,W,H);

      for (let i=0;i<drops.length;i++){
        const d = drops[i];
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + d.l*d.xs*0.08, d.y + d.l);
        ctx.strokeStyle = `rgba(130,226,255,${d.a})`; // use accent color as raindrop tint
        ctx.lineWidth = 1;
        ctx.stroke();

        d.x += d.xs;
        d.y += d.ys;

        // wrap around
        if (d.x > W + 20 || d.x < -20 || d.y > H + 20) {
          d.x = Math.random()*W;
          d.y = -20;
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* -------------------------
     optional: keyboard shortcuts
     -------------------------*/
  document.addEventListener('keydown', (e) => {
    if (e.key === '1') window.location.href = 'index.html';
    if (e.key === '2') window.location.href = 'portfolio.html';
    if (e.key === '3') window.location.href = 'music.html';
    if (e.key === '4') window.location.href = 'links.html';
  });

});


