export const circ = (ctx, x, y, r, l, color, fill = false) => {
  ctx.save();
  ctx.lineWidth = l;
  ctx.strokeStyle = color;
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, (Math.PI / 180) * 360);
  ctx.stroke();
  fill && ctx.fill();
  ctx.restore();
};
