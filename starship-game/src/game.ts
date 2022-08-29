import { Fuel } from "./objects/Fuel";
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
const fuel = new Fuel(0, 0, player);
const ambientSound = new Audio("../sound/ambient.ogg");

let countdown = 10; // countdown for player explosion sprite

export const init = () => {
  ambientSound.loop = true;
  ambientSound.volume = 0.5;
  ambientSound?.play();
  countdown = 10;
  fuel.resetPosition();
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
    player.asteroidController.explosions.forEach((exp) => {
      if (exp.countdown <= 0) {
        const index = player.asteroidController.explosions.indexOf(exp);
        player.asteroidController.explosions.splice(index, 1);
      }
      exp.draw(ctx as CanvasRenderingContext2D);
    });
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
  fuel.update(ctx as CanvasRenderingContext2D);
  player.bulletController.update(ctx as CanvasRenderingContext2D);
  player.asteroidController.update(ctx as CanvasRenderingContext2D, player);
  player.move(keys);
  player.shoot(keys);
  player.asteroidController.collision && countdown--;
  if (countdown <= 0) player.playing = false;
};

const loop = () => {
  player.playing &&
    setTimeout(() => {
      draw();
      update();
      requestAnimationFrame(loop);
    }, 1000 / 30);
};
