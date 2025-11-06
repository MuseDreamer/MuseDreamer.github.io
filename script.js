document.addEventListener("DOMContentLoaded", () => {
  // === Sound Effects ===
  const sounds = {
    click: new Audio("sounds/click.wav"),
    boot: new Audio("sounds/boot.wav"),
    type: new Audio("sounds/type.wav")
  };
  sounds.click.volume = 0.3;
  sounds.boot.volume = 0.4;
  sounds.type.volume = 0.15;

  setTimeout(() => sounds.boot.play().catch(()=>{}), 500);

  document.body.addEventListener("click", () => {
    sounds.click.currentTime = 0;
    sounds.click.play().catch(()=>{});
  });

  // === Flicker ===
  const flicker = () => {
    document.body.classList.add("flicker");
    setTimeout(() => document.body.classList.remove("flicker"), 100);
  };
  setInterval(() => { if (Math.random() < 0.1) flicker(); }, 2000);

  // === Typing ===
  const typed = document.querySelector(".typed");
  if (typed && typed.textContent.startsWith(">")) {
    const fullText = typed.textContent;
    typed.textContent = "";
    let i = 0;
    const typeInterval = setInterval(() => {
      typed.textContent += fullText[i];
      i++;
      sounds.type.currentTime = 0;
      sounds.type.play().catch(()=>{});
      if (i >= fullText.length) clearInterval(typeInterval);
    }, 60);
  }

  // === Neon Dust ===
  const canvas = document.getElementById("neon-dust");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let w, h, particles = [];
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random()*w,
        y: Math.random()*h,
        size: Math.random()*2+0.5,
        color: Math.random() > 0.5 ? "#00f6ff" : "#ff1cff",
        vx: (Math.random()-0.5)*0.3,
        vy: (Math.random()-0.5)*0.3
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
      }
      requestAnimationFrame(draw);
    };
    draw();
  }
});
