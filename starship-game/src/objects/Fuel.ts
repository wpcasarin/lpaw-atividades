import { Player } from "./Player";
import { canvas } from "../context";

export class Fuel {
  x: number;
  y: number;
  size: number;
  speed: number;
  player: Player;

  constructor(x: number, y: number, player: Player, speed: number = 4) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.speed = speed;
    this.player = player;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.shadowColor = "blue";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 2;
    ctx.fillStyle = "cyan";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  move() {
    this.y += this.speed;
  }

  resetPosition() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height * -1;
  }

  collision(objectX: number, objectY: number, objectSize: number) {
    let a = objectSize + this.size;
    let x = this.x - this.size - objectX;
    let y = this.y - this.size - objectY;
    return a > Math.sqrt(x * x + y * y) ? true : false;
  }

  update(ctx: CanvasRenderingContext2D) {
    this.draw(ctx);
    if (this.collision(this.player.x, this.player.y, this.player.size)) {
      this.resetPosition();
    }
    if (this.y >= canvas.height - this.size) {
      this.player.playing = false;
    }
    this.move();
  }
}
