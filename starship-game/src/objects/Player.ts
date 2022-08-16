import { BulletController } from './../controller/BulletController';
import { canvas } from '../context';

export class Player {
  x: number;
  y: number;
  size: number;
  speed: number;
  totalSprites: number = 4;
  currentSprite: number = 1;
  bulletController: BulletController;
  img: HTMLImageElement;

  constructor(
    x: number = 0,
    y: number = 0,
    bulletController: BulletController,
  ) {
    this.x = x;
    this.y = y;
    this.size = 32;
    this.speed = 1;
    this.bulletController = bulletController;
    this.img = new Image();
  }

  draw(ctx: CanvasRenderingContext2D, keys: Set<string>) {
    // ctx.fillStyle = 'green';
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
    // ctx.fill();
    this.currentSprite =
      this.currentSprite < this.totalSprites - 1 ? this.currentSprite + 1 : 0;
    if (keys.has('ArrowLeft')) {
      this.totalSprites = 3;
      this.img.src = '../../assets/ship_left.png';
    } else if (keys.has('ArrowRight')) {
      this.totalSprites = 3;
      this.img.src = '../../assets/ship_right.png';
    } else {
      this.totalSprites = 4;
      this.img.src = '../../assets/ship_front.png';
    }
    ctx.drawImage(
      this.img,
      this.currentSprite * this.size,
      0,
      this.size,
      this.size,
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size,
    );
  }

  move(keys: Set<string>) {
    if (keys.has('ArrowUp') && this.y >= this.size / 2) this.y -= this.speed;
    if (keys.has('ArrowDown') && this.y <= canvas.height - this.size / 2)
      this.y += this.speed;
    if (keys.has('ArrowLeft') && this.x >= this.size / 2) this.x -= this.speed;
    if (keys.has('ArrowRight') && this.x <= canvas.width - this.size / 2)
      this.x += this.speed;
  }

  shoot(keys: Set<string>) {
    if (keys.has(' ')) {
      const bulletX = this.x;
      const bulletY = this.y;
      const bulletDamage = 1;
      const bulletDelay = 10;
      const bulletSpeed = 3;
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
