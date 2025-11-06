// Neon Terminal FX
document.addEventListener("DOMContentLoaded", () => {
  const flicker = () => {
    document.body.classList.add("flicker");
    setTimeout(() => document.body.classList.remove("flicker"), 100);
  };

  // Simulate periodic flicker
  setInterval(() => {
    if (Math.random() < 0.1) flicker();
  }, 2000);

  // Terminal input simulation (on home and links page)
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

  // Optional: Command typing
  const commandInput = document.createElement("input");
  commandInput.className = "terminal-input";
  commandInput.placeholder = "> type command here";
  const main = document.querySelector("main");
  if (main) main.appendChild(commandInput);

  commandInput.addEventListener("keydown", e => {
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
});
