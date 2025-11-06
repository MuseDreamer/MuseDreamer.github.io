// =============================
// PIXEL RAIN + THUNDERSTORM SCRIPT
// =============================

// Cache clearing handled in HTML heads

const canvas = document.getElementById("rain-canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// Raindrop array
let raindrops = [];
for (let i = 0; i < 400; i++) {
  raindrops.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    l: Math.random() * 1.5 + 0.5,
    xs: -1 + Math.random() * 2,
    ys: Math.random() * 15 + 10
  });
}

// Draw Rain
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(208, 89, 93, 0.6)";
  ctx.lineWidth = 1;
  ctx.lineCap = "round";
  for (let i = 0; i < raindrops.length; i++) {
    let r = raindrops[i];
    ctx.beginPath();
    ctx.moveTo(r.x, r.y);
    ctx.lineTo(r.x + r.l * r.xs, r.y + r.l * r.ys);
    ctx.stroke();
  }
  move();
}

// Move Raindrops
function move() {
  for (let i = 0; i < raindrops.length; i++) {
    let r = raindrops[i];
    r.x += r.xs;
    r.y += r.ys;
    if (r.x > canvas.width || r.y > canvas.height) {
      r.x = Math.random() * canvas.width;
      r.y = -20;
    }
  }
}

// Thunder flashes
function thunder() {
  const flash = document.createElement("div");
  flash.style.position = "fixed";
  flash.style.top = "0";
  flash.style.left = "0";
  flash.style.width = "100%";
  flash.style.height = "100%";
  flash.style.background = "rgba(255,255,255,0.8)";
  flash.style.zIndex = "2";
  flash.style.pointerEvents = "none";
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 80);
}

// Random thunder
setInterval(() => {
  if (Math.random() > 0.95) thunder();
}, 2000);

function animate() {
  draw();
  requestAnimationFrame(animate);
}
animate();
