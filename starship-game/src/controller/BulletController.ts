import { Bullet } from "./../objects/Bullet";

export class BulletController {
  canvas: HTMLCanvasElement;
  bullets: Array<Bullet> = [];
  timerTillNextBullet: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  shoot(
    x: number,
    y: number,
    damage: number,
    delay: number,
    speed: number,
    audio: HTMLAudioElement
  ) {
    if (this.timerTillNextBullet <= 0) {
      this.bullets.push(new Bullet(x, y, speed, damage));
      audio.play();
      this.timerTillNextBullet = delay;
    }
    this.timerTillNextBullet--;
  }

  update(ctx: CanvasRenderingContext2D) {
    this.bullets.forEach((bullet) => {
      // remove offscreen bullets
      bullet.y <= 0 && this.destroyBullet(bullet);
      bullet.draw(ctx);
      bullet.move();
    });
  }

  destroyBullet(bullet: Bullet) {
    const index = this.bullets.indexOf(bullet);
    this.bullets.splice(index, 1);
  }
}
