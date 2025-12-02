// Generate floating Frutiger bubbles
function spawnBubbles() {
  for (let i = 0; i < 14; i++) {
    let b = document.createElement("div");
    b.className = "bubble";
    b.style.width = Math.random() * 120 + 40 + "px";
    b.style.height = b.style.width;
    b.style.left = Math.random() * 100 + "vw";
    b.style.bottom = "-200px";
    b.style.animationDelay = Math.random() * 8 + "s";
    document.body.appendChild(b);
  }
}

window.onload = spawnBubbles;
