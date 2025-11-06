// === Terminal Sound + Boot Animation ===

window.addEventListener('DOMContentLoaded', () => {
  const boot = new Audio('sounds/boot.wav');
  const click = new Audio('sounds/click.wav');

  boot.volume = 0.2;
  click.volume = 0.3;

  boot.play();

  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('mouseenter', () => click.play());
  });
});
// === Terminal Sound + Boot Animation ===

window.addEventListener('DOMContentLoaded', () => {
  const boot = new Audio('sounds/boot.wav');
  const click = new Audio('sounds/click.wav');

  boot.volume = 0.2;
  click.volume = 0.3;

  boot.play();

  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('mouseenter', () => click.play());
  });
});

