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

  constructor(
    x: number,
    y: number,
    speed: number,
    health: number,
    type: number,
  ) {
    this.x = x;
    this.y = y;
    this.size = 75;
    this.health = health;
    this.speed = speed;
    this.type = type;
    this.img = new Image();
    this.img.src = '../../assets/asteroids.png';
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
    ctx.shadowColor = '#dfddffdd';
    ctx.drawImage(
      this.img,
      this.currentSprite * this.size,
      this.size * this.type,
      this.size,
      this.size,
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size / 2,
      this.size / 2,
    );
    ctx.restore();
  }

  move() {
    this.y += this.speed;
  }

  collision(playerX: number, playerY: number, playerSize: number) {
    let a = playerSize / 4 + this.size / 4;
    let x = this.x - this.size / 4 - playerX;
    let y = this.y - this.size / 4 - playerY;
    return a > Math.sqrt(x * x + y * y) ? true : false;
  }
}
