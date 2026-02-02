const playground = document.getElementById("playground");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

const MOVE_DISTANCE = 90;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getBounds = () => {
  const area = playground.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();
  return {
    width: area.width,
    height: area.height,
    maxX: area.width - btn.width,
    maxY: area.height - btn.height,
    btnWidth: btn.width,
    btnHeight: btn.height,
  };
};

const placeNoButton = (x, y) => {
  const bounds = getBounds();
  const nextX = clamp(x, 0, bounds.maxX);
  const nextY = clamp(y, 0, bounds.maxY);
  noBtn.style.left = `${nextX}px`;
  noBtn.style.top = `${nextY}px`;
};

const randomPosition = () => {
  const bounds = getBounds();
  return {
    x: Math.random() * bounds.maxX,
    y: Math.random() * bounds.maxY,
  };
};

const moveNoButtonAway = (cursorX, cursorY) => {
  let best = null;
  let bestDistance = -1;

  for (let i = 0; i < 10; i += 1) {
    const candidate = randomPosition();
    const dx = candidate.x - cursorX;
    const dy = candidate.y - cursorY;
    const distance = Math.hypot(dx, dy);
    if (distance > bestDistance) {
      best = candidate;
      bestDistance = distance;
    }
  }

  if (best) {
    placeNoButton(best.x, best.y);
  }
};

const positionNoButtonInitially = () => {
  const bounds = getBounds();
  placeNoButton(bounds.width * 0.65, bounds.height * 0.5);
};

positionNoButtonInitially();

playground.addEventListener("mousemove", (event) => {
  const rect = playground.getBoundingClientRect();
  const cursorX = event.clientX - rect.left;
  const cursorY = event.clientY - rect.top;

  const btnX = noBtn.offsetLeft + noBtn.offsetWidth / 2;
  const btnY = noBtn.offsetTop + noBtn.offsetHeight / 2;
  const distance = Math.hypot(cursorX - btnX, cursorY - btnY);

  if (distance < MOVE_DISTANCE) {
    moveNoButtonAway(cursorX, cursorY);
  }
});

noBtn.addEventListener("touchstart", (event) => {
  event.preventDefault();
  const rect = playground.getBoundingClientRect();
  const touch = event.touches[0];
  const cursorX = touch.clientX - rect.left;
  const cursorY = touch.clientY - rect.top;
  moveNoButtonAway(cursorX, cursorY);
});

window.addEventListener("resize", () => {
  const bounds = getBounds();
  const currentX = clamp(noBtn.offsetLeft, 0, bounds.maxX);
  const currentY = clamp(noBtn.offsetTop, 0, bounds.maxY);
  placeNoButton(currentX, currentY);
});

yesBtn.addEventListener("click", () => {
  window.location.href = "celebrate.html";
});
