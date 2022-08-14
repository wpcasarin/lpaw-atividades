import { circ } from './draw';
import { canvas } from './game';

export const player = {
  x: 0,
  y: 0,
  size: 15,
  move: function (keys) {
    keys.has('ArrowUp') && this.y >= this.size && this.y--;
    keys.has('ArrowDown') && this.y <= canvas.height - this.size && this.y++;
    keys.has('ArrowLeft') && this.x >= this.size && this.x--;
    keys.has('ArrowRight') && this.x <= canvas.width - this.size && this.x++;
  },
  draw: function (ctx) {
    ctx.save();
    circ(ctx, this.x, this.y, this.size, 3, 'black', 'yellow');
    circ(
      ctx,
      this.x - this.size / 3,
      this.y - this.size / 4,
      this.size * 0.1,
      1,
      'black',
      'black',
    );
    circ(
      ctx,
      this.x + this.size / 3,
      this.y - this.size / 4,
      this.size * 0.1,
      1,
      'black',
      'black',
    );
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(this.x, this.y + this.size / 5, this.size / 2, 0, Math.PI, false);
    ctx.stroke();
    ctx.restore();
  },
};
