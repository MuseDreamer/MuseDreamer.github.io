// === Terminal Effects ===
document.addEventListener("DOMContentLoaded", () => {
  const flicker = () => {
    document.body.classList.add("flicker");
    setTimeout(() => document.body.classList.remove("flicker"), 100);
  };

  setInterval(() => {
    if (Math.random() < 0.1) flicker();
  }, 2000);

  const typed = document.querySelector(".typed");
  if (typed && typed.textContent.startsWith(">")) {
    const fullText = typed.textContent;
    typed.textContent = "";
    let i = 0;
    const typeInterval = setInterval(() => {
      typed.textContent += fullText[i];
      i++;
      if (i >= fullText.length) clearInterval(typeInterval);
    }, 60);
  }

  const main = document.querySelector("main");
  if (main) {
    const commandInput = document.createElement("input");
    commandInput.className = "terminal-input";
    commandInput.placeholder = "> type command here";
    main.appendChild(commandInput);

    commandInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const cmd = commandInput.value.trim().toLowerCase();
        const output = document.createElement("p");
        if (cmd.startsWith("open ")) {
          const site = cmd.split(" ")[1];
          output.innerHTML = `> Opening ${site}...`;
          main.appendChild(output);
          setTimeout(() => {
            window.open(`https://${site}.com`, "_blank");
          }, 800);
        } else {
          output.textContent = `> Unknown command: ${cmd}`;
          main.appendChild(output);
        }
        commandInput.value = "";
        main.scrollTop = main.scrollHeight;
      }
    });
  }

  // === Neon Dust Particle Overlay ===
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

    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 2 + 0.5,
        color: Math.random() > 0.5 ? "#00f6ff" : "#ff1cff",
        velocityX: (Math.random() - 0.5) * 0.3,
        velocityY: (Math.random() - 0.5) * 0.3
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fill();

        p.x += p.velocityX;
        p.y += p.velocityY;
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
