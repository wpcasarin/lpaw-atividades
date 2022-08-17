import { handleKeypress, keys } from './inputs';
import { ctx, canvas } from './context';
import { Player } from './objects/Player';
import { BulletController } from './controller/BulletController';
import { Asteroid } from './objects/Asteroid';

const bulletController = new BulletController(canvas);
const player = new Player(
  canvas.width / 2,
  canvas.height / 1.3,
  bulletController,
);
const asteroid = new Asteroid(canvas.width / 2, 75, 4, 10, 1);

let playing = true;

export const init = () => {
  handleKeypress();
  requestAnimationFrame(loop);
};

const draw = () => {
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    player.draw(ctx, keys);
    asteroid.draw(ctx);
  }
};
let lastTime = 0;
const getFPS = () => {
  let now = performance.now();
  let frameTime = (now - lastTime).toFixed(2);
  lastTime = now;
  const span = document.getElementById('score');
  if (span) span.innerText = 'FPS: ' + Math.round(1000 / Number(frameTime));
};

const update = () => {
  getFPS();
  player.bulletController.update(ctx as CanvasRenderingContext2D);
  player.move(keys);
  player.shoot(keys);
  asteroid.move();
  if (asteroid.collision(player.x, player.y, player.size)) {
    console.log('collide');
    playing = false;
  }
};

const loop = () => {
  playing &&
    setTimeout(() => {
      draw();
      update();
      requestAnimationFrame(loop);
    }, 1000 / 30);
};
