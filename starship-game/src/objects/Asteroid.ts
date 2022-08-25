import { randomNumber } from "./../util";

export class Asteroid {
  x: number;
  y: number;
  size: number;
  speed: number;
  health: number;
  type: number;
  totalSprites: number = 23;
  currentSprite: number = 1;
  img: HTMLImageElement;

  constructor(speed: number, health: number) {
    this.size = 75;
    this.x = randomNumber(0, 21) * (this.size / 2);
    this.y = -1 * randomNumber(0, 16) * (this.size / 2);
    this.health = health;
    this.speed = speed;
    this.type = randomNumber(0, 8);
    this.img = new Image();
    this.img.src = "../../assets/asteroids.png";
  }

  draw(ctx: CanvasRenderingContext2D) {
    // ctx.fillStyle = 'orange';
    // ctx.beginPath();
    // ctx.arc(
    //   this.x - this.size / 4,
    //   this.y - this.size / 4,
    //   this.size / 4,
    //   0,
    //   Math.PI * 2,
    // );
    // ctx.fill();
    this.currentSprite =
      this.currentSprite < this.totalSprites - 1 ? this.currentSprite + 1 : 0;
    ctx.save();
    ctx.shadowBlur = 4;
    ctx.shadowColor = "#dfddffdd";
    ctx.drawImage(
      this.img,
      this.currentSprite * this.size,
      this.size * this.type,
      this.size,
      this.size,
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size / 2,
      this.size / 2
    );
    ctx.restore();
  }

  move() {
    this.y += this.speed;
  }

  collision(objectX: number, objectY: number, objectSize: number) {
    let a = objectSize / 4 + this.size / 4;
    let x = this.x - this.size / 4 - objectX;
    let y = this.y - this.size / 4 - objectY;
    return a > Math.sqrt(x * x + y * y) ? true : false;
  }

  resetPosition() {
    this.x = randomNumber(0, 21) * (this.size / 2);
    this.y = -1 * randomNumber(0, 16) * (this.size / 2);
  }
}
