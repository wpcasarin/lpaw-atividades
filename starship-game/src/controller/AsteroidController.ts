import { Player } from "./../objects/Player";
import { Asteroid } from "./../objects/Asteroid";
export class AsteroidController {
  canvas: HTMLCanvasElement;
  asteroids: Array<Asteroid> = [];
  collision: boolean;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.collision = false;
  }

  update(ctx: CanvasRenderingContext2D, player: Player) {
    this.asteroids.forEach((asteroid) => {
      if (asteroid.collision(player.x, player.y, player.size))
        this.collision = true;
      player.bulletController.bullets.forEach((bullet) => {
        if (asteroid.collision(bullet.x, bullet.y, bullet.size)) {
          asteroid.resetPosition();
          player.bulletController.destroyBullet(bullet);
        }
      });
      asteroid.y >= this.canvas.height + asteroid.size &&
        asteroid.resetPosition();
      asteroid.draw(ctx);
      asteroid.move();
    });
  }
}
