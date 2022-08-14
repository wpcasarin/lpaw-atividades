import { circ } from './draw';
import { canvas } from './game';
import { randomNumber } from './helper';

export class Fruit {
  constructor(x, y, size, color = 'orange') {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }
  draw(ctx) {
    circ(ctx, this.x, this.y, this.size, 0, this.color, this.color);
  }
  collision(playerX, playerY, playerSize) {
    let a = playerSize + this.size;
    let x = playerX - this.x;
    let y = playerY - this.y;
    return a > Math.sqrt(x * x + y * y) ? true : false;
  }
}
