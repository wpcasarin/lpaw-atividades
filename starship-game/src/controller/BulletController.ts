import { Bullet } from './../objects/Bullet';

export class BulletController {
  canvas: HTMLCanvasElement;
  bullets: Array<Bullet> = [];
  timerTillNextBullet: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  shoot(x: number, y: number, damage: number, delay: number, speed: number) {
    if (this.timerTillNextBullet <= 0) {
      this.bullets.push(new Bullet(x, y, speed, damage));
      this.timerTillNextBullet = delay;
    }
    this.timerTillNextBullet--;
  }

  update(ctx: CanvasRenderingContext2D) {
    this.bullets.forEach((bullet) => {
      // remove offscreen bullets
      if (bullet.y <= 0) {
        const index = this.bullets.indexOf(bullet);
        this.bullets.splice(index, 1);
      }
      bullet.draw(ctx);
      bullet.move();
    });
  }
}
