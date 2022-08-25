import { AsteroidController } from "./controller/AsteroidController";
import { handleKeypress, keys } from "./inputs";
import { ctx, canvas } from "./context";
import { Player } from "./objects/Player";
import { BulletController } from "./controller/BulletController";
import { Asteroid } from "./objects/Asteroid";

const bulletController = new BulletController(canvas);
const asteroidController = new AsteroidController(canvas);
const player = new Player(
  canvas.width / 2,
  canvas.height / 1.3,
  bulletController,
  asteroidController
);

let playing = true;

export const init = () => {
  Array.from({ length: 20 }).forEach(() =>
    player.asteroidController.asteroids.push(new Asteroid(4, 1))
  );
  handleKeypress();
  requestAnimationFrame(loop);
};

const draw = () => {
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    player.draw(ctx, keys);
  }
};
let lastTime = 0;
const getFPS = () => {
  let now = performance.now();
  let frameTime = (now - lastTime).toFixed(2);
  lastTime = now;
  const span = document.getElementById("score");
  if (span) span.innerText = "FPS: " + Math.round(1000 / Number(frameTime));
};

const update = () => {
  getFPS();
  player.bulletController.update(ctx as CanvasRenderingContext2D);
  player.asteroidController.update(ctx as CanvasRenderingContext2D, player);
  player.move(keys);
  player.shoot(keys);
  playing = !player.asteroidController.collision;
};

const loop = () => {
  playing &&
    setTimeout(() => {
      draw();
      update();
      requestAnimationFrame(loop);
    }, 1000 / 30);
};
