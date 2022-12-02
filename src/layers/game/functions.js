export const init = (relativePosition, player, canvas) => {
  player.x = canvas.width / 2 - 25;
  player.y = canvas.height / 2 - 25;
  relativePosition.x = canvas.width / 2;
  relativePosition.y = canvas.height / 2;

  preloadAssets();
};

let preloadAssets = () => {
  let url =
    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/0032398f86ea753194c5eeba97eccda2-1627249600/ExportBackgroundnomoveclound/draw-a-pixel-pokemon-battle-background.gif";

  let x = new Image();
  x.src = url;
};

export const resize = (canvas) => {
  let screen = document.getElementById("canvas").getBoundingClientRect();
  canvas.height = screen.height;
  canvas.width = screen.width;
};

export const loadSprite = (obj) => {
  let x = new Image();
  x.src = obj.url;
  obj.img = x;
};

export const collison = (relativePosition, target, player) => {
  if (
    Math.abs(target.x - relativePosition.x + player.x) < 30 &&
    Math.abs(target.y - relativePosition.y + player.y) < 30
  ) {
    return true;
  } else {
    return false;
  }
};

export const spawnPokemon = () => {
  let pokemon = {};
  pokemon.id = randomPokemon();
  let img = new Image();
  img.src = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif?raw=true`;
  return pokemon;
};

export const randomPosition = (canvas) => {
  let zx = Math.round(Math.random());
  let zy = Math.round(Math.random());

  let x = Math.floor(Math.random() * canvas.width);
  let y = Math.floor(Math.random() * canvas.height);

  if (zx == 0) {
    x *= -1;
  }
  if (zy == 0) {
    y *= -1;
  }
  return { x, y };
};

const randomPokemon = () => {
  let min = 1;
  let max = 150;
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const battleMove = (move) => {
  let hit = Math.random() < move.accuracy / 100;
  let damage = (f) => {
    return Math.round(Math.random() * (20 * f));
  };
  let recover = (f) => {
    return Math.round(Math.random() * (5 * f));
  };
  let x = {
    damage: 0,
    hp: 0,
    success: false,
    type: "",
  };

  if (hit) {
    if (move.name == "attack") {
      x.damage = 15;
      x.success = true;
      x.type = "attack";
    }
    if (move.name == "counter") {
      x.damage = 30;
      x.success = true;
      x.type = "attack";
    }
    if (move.name == "quick-attack") {
      x.damage = 3;
      x.success = true;
      x.type = "attack";
    }
    if (move.name == "recover") {
      x.hp = 20;
      x.success = true;
      x.type = "heal";
    }
  }
  return x;
};

export const hpColor = (hp) => {
  let color;
  if (hp > 60) {
    color = "var(--green)";
  } else if (hp > 30) {
    color = "var(--yellow)";
  } else {
    color = "var(--red)";
  }

  return color;
};
