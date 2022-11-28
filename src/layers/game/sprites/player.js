export function playerSprite(
  ctx,
  player,
  frame,
  mapPosition,
  relativePosition
) {
  let p = new Player(player);
  p.draw(ctx, frame, mapPosition, relativePosition);
}

class Player {
  constructor(player) {
    this.player = player;
  }
  draw(ctx, frame, mapPosition, relativePosition) {
    animate(this.player, frame);
    if (this.player.moving) {
      move(this.player, mapPosition, relativePosition);
    }
    ctx.drawImage(
      this.player.img,
      animate(this.player),
      this.player.direction,
      64,
      64,
      this.player.x,
      this.player.y,
      50,
      50
    );
  }
}

let animate = (player, frame) => {
  if (frame % 10 == 0) {
    player.frame += 1;
    if (player.frame > 3) {
      player.frame = 0;
    }
  }
  if (player.moving) {
    return 0 + 64 * player.frame;
  } else {
    return 0;
  }
};

let move = (player, mapPosition, relativePosition) => {
  let distance = 3;

  let limit = 300;
  if (mapPosition.x > limit) {
    mapPosition.x = limit;
  }
  if (mapPosition.x < -limit) {
    mapPosition.x = -limit;
  }
  if (mapPosition.y > limit) {
    mapPosition.y = limit;
  }
  if (mapPosition.y < -limit) {
    mapPosition.y = -limit;
  }

  if (player.button == "right") {
    mapPosition.x -= distance;
    relativePosition.x += distance;
    player.direction = 128;
  }
  if (player.button == "left") {
    mapPosition.x += distance;
    relativePosition.x -= distance;
    player.direction = 64;
  }
  if (player.button == "down") {
    mapPosition.y -= distance;
    relativePosition.y += distance;
    player.direction = 0;
  }
  if (player.button == "up") {
    mapPosition.y += distance;
    relativePosition.y -= distance;
    player.direction = 192;
  }
};
