import { randomPosition } from "../functions";

let grassPositions = [];
[...Array(30)].forEach(() => {
  grassPositions.push(randomPosition({ width: 400, height: 400 }));
});

let flowerPositions = [];
for (let i = 0; i < 15; i++) {
  flowerPositions.push(randomPosition({ width: 400, height: 400 }));
}

let rockPositions = [];
for (let i = 0; i < 10; i++) {
  rockPositions.push(randomPosition({ width: 400, height: 400 }));
}

export function mapSprite(ctx, map, mapPosition, player, canvas) {
  let x = new X(map);
  x.draw(ctx, mapPosition, player, canvas);
}

class X {
  constructor(map) {
    this.map = map;
  }
  draw(ctx, mapPosition, player, canvas) {
    ground(this.map, ctx, mapPosition, player, canvas);
    grass(this.map, ctx, mapPosition);
    rocks(this.map, ctx, mapPosition);
    flowers(this.map, ctx, mapPosition);
  }
}

let flowers = (map, ctx, mapPosition) => {
  let counter = 0;

  for (let i = 0; i < flowerPositions.length; i++) {
    counter += 1;
    if (counter > 5) {
      counter = 0;
    }

    let p = flowerPositions[i];

    ctx.drawImage(
      map.img,
      16 * (19 + counter),
      16 * 2,
      16,
      16,
      p.x + mapPosition.x + 100,
      p.y + mapPosition.y + 100,
      30,
      30
    );
  }
};

let grass = (map, ctx, mapPosition) => {
  let counter = 0;

  for (let i = 0; i < grassPositions.length; i++) {
    counter += 1;
    if (counter > 1) {
      counter = 0;
    }
    let p = grassPositions[i];
    ctx.drawImage(
      map.img,
      16 * 4,
      16,
      16,
      16,
      p.x + mapPosition.x + 100,
      p.y + mapPosition.y + 100,
      25,
      25
    );
  }
};

let rocks = (map, ctx, mapPosition) => {
  let counter = 0;

  for (let i = 0; i < rockPositions.length; i++) {
    counter += 1;
    if (counter > 4) {
      counter = 0;
    }

    let p = rockPositions[i];

    ctx.drawImage(
      map.img,
      16 * counter,
      16 * 28,
      16,
      16,
      p.x + mapPosition.x + 100,
      p.y + mapPosition.y + 100,
      16,
      16
    );
  }
};

let groundPositions = [];
let size = 40;
for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    groundPositions.push({ x: i, y: j });
  }
}

let ground = (map, ctx, mapPosition, canvas) => {
  for (let i = 0; i < groundPositions.length; i++) {
    let p = groundPositions[i];
    ctx.drawImage(
      map.img,
      16,
      0,
      16,
      16,
      p.x * 25 + mapPosition.x - canvas.width + 30,
      p.y * 25 + mapPosition.y - canvas.height - 60,
      26,
      26
    );
  }
};
