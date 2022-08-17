export class Bullet {
  x: number;
  y: number;
  size: number;
  speed: number;
  damage: number;

  constructor(x: number, y: number, speed: number, damage: number) {
    this.x = x;
    this.y = y;
    this.size = 2;
    this.damage = damage;
    this.speed = speed;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.shadowColor = 'red';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 2;
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  move() {
    this.y -= this.speed;
  }
}
