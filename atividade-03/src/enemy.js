import { circ } from './draw';
import { canvas } from './game';
import { randomNumber } from './helper';

export class Enemy {
  constructor(x, y, size, speed = 2, color = 'red') {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.color = color;
  }
  draw(ctx) {
    circ(ctx, this.x, this.y, this.size, 0, 'red', 'red');
  }
  move() {
    if (this.y <= canvas.height) {
      this.y = this.y + this.speed;
    } else {
      this.y = 0;
      this.x = randomNumber(canvas.width - this.size, this.size);
    }
  }
  collision(playerX, playerY, playerSize) {
    let a = playerSize + this.size;
    let x = playerX - this.x;
    let y = playerY - this.y;
    return a > Math.sqrt(x * x + y * y) ? true : false;
  }
}
