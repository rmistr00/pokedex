import { randomPosition } from "../functions";
let positions = [];
[...Array(30)].forEach(() => {
  positions.push(randomPosition({ width: 400, height: 400 }));
});

export function mapSprite(ctx, map, mapPosition, player) {
  let x = new X(map);
  x.draw(ctx, mapPosition, player);
}

class X {
  constructor(map) {
    this.map = map;
  }
  draw(ctx, mapPosition, player) {
    positions.forEach((p) => {
      ctx.drawImage(
        this.map.img,
        16 * 4,
        16,
        16,
        16,
        p.x + mapPosition.x + player.x,
        p.y + mapPosition.y + player.x,
        25,
        25
      );
    });
  }
}
