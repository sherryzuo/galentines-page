const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

const colors = [
  "#ff5a8a",
  "#ffb347",
  "#ffd166",
  "#9bf6ff",
  "#bdb2ff",
  "#ffafcc",
  "#caffbf",
];

let width = 0;
let height = 0;
let confetti = [];

const resizeCanvas = () => {
  const dpr = window.devicePixelRatio || 1;
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
};

const createPiece = () => {
  const size = 6 + Math.random() * 6;
  return {
    x: Math.random() * width,
    y: Math.random() * height - height,
    size,
    speed: 1 + Math.random() * 2.5,
    drift: -0.6 + Math.random() * 1.2,
    rotation: Math.random() * Math.PI,
    spin: -0.05 + Math.random() * 0.1,
    color: colors[Math.floor(Math.random() * colors.length)],
    sway: Math.random() * 2,
  };
};

const initConfetti = () => {
  confetti = Array.from({ length: 140 }, createPiece);
};

const update = () => {
  ctx.clearRect(0, 0, width, height);

  confetti.forEach((piece) => {
    piece.y += piece.speed;
    piece.x += piece.drift + Math.sin((piece.y + piece.sway * 100) / 50) * 0.3;
    piece.rotation += piece.spin;

    if (piece.y > height + 20) {
      Object.assign(piece, createPiece(), { y: -20 });
    }

    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate(piece.rotation);
    ctx.fillStyle = piece.color;
    ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 1.4);
    ctx.restore();
  });

  requestAnimationFrame(update);
};

resizeCanvas();
initConfetti();
update();

window.addEventListener("resize", () => {
  resizeCanvas();
  initConfetti();
});
