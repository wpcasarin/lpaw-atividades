export class Explosion {
  x: number;
  y: number;
  size: number;
  totalSprites: number;
  currentSprite: number;
  countdown: number;
  img: HTMLImageElement;

  constructor(x: number, y: number, size: number = 32) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.totalSprites = 10;
    this.currentSprite = 1;
    this.img = new Image();
    this.img.src = "../../assets/explosion.png";
    this.countdown = 10;
  }
  draw(ctx: CanvasRenderingContext2D) {
    this.currentSprite =
      this.currentSprite < this.totalSprites - 1 ? this.currentSprite + 1 : 0;
    ctx.drawImage(
      this.img,
      this.currentSprite * this.size,
      0,
      this.size,
      this.size,
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size * 1.2,
      this.size * 1.2
    );
    this.countdown--;
  }
}
