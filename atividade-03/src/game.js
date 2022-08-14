import { handleKeypress, keys } from './inputs';
import { player } from './player';
import { Enemy } from './enemy';
import { randomNumber } from './helper';
import { Fruit } from './fruit';

const FRAMERATE = 120;

export const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const enemySize = 10;
const fruitSize = 10;
const enemiesAmount = 5;
const enemies = [];
const fruit = new Fruit(
  randomNumber(canvas.width - fruitSize, fruitSize),
  randomNumber(canvas.height - fruitSize, fruitSize),
  fruitSize,
);
let gameState = false;
let gameScore = 0;
let scoreComponent = document.getElementById('score');

const init = () => {
  player.x = canvas.width / 2;
  player.y = canvas.height - player.size;
  for (let i = 0; i < enemiesAmount; i++) {
    enemies.push(
      new Enemy(
        randomNumber(canvas.width - enemySize, enemySize),
        randomNumber(canvas.height / 2, enemySize),
        enemySize,
      ),
    );
  }
  handleKeypress();
  gameState = true;
};

const loop = () => {
  if (gameState) {
    setTimeout(() => {
      update();
      render();
      requestAnimationFrame(loop);
    }, 1000 / FRAMERATE);
  }
};
const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw(ctx);
  fruit.draw(ctx);
  enemies.forEach((enemy) => enemy.draw(ctx));
};
const update = () => {
  player.move(keys);
  if (fruit.collision(player.x, player.y, player.size)) {
    fruit.x = randomNumber(canvas.width - fruitSize, fruitSize);
    fruit.y = randomNumber(canvas.height - fruitSize, fruitSize);
    gameScore++;
    scoreComponent.innerText = gameScore;
  }
  enemies.forEach((enemy) => {
    enemy.move();
    if (enemy.collision(player.x, player.y, player.size)) gameState = false;
  });
};

init();
document.addEventListener('DOMContentLoaded', loop);
