import { BulletController } from './../controller/BulletController';
import { canvas } from '../context';

export class Player {
  x: number;
  y: number;
  size: number;
  speed: number;
  bulletController: BulletController;

  constructor(
    x: number = 0,
    y: number = 0,
    bulletController: BulletController,
  ) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.speed = 2;
    this.bulletController = bulletController;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  move(keys: Set<string>) {
    if (keys.has('ArrowUp') && this.y >= this.size) this.y -= this.speed;
    if (keys.has('ArrowDown') && this.y <= canvas.height - this.size)
      this.y += this.speed;
    if (keys.has('ArrowLeft') && this.x >= this.size) this.x -= this.speed;
    if (keys.has('ArrowRight') && this.x <= canvas.width - this.size)
      this.x += this.speed;
  }

  shoot(keys: Set<string>) {
    if (keys.has(' ')) {
      const bulletX = this.x;
      const bulletY = this.y - this.size;
      const bulletDamage = 1;
      const bulletDelay = 10;
      const bulletSpeed = 4;
      this.bulletController.shoot(
        bulletX,
        bulletY,
        bulletDamage,
        bulletDelay,
        bulletSpeed,
      );
    }
  }
}
