export const init = (relativePosition, player, canvas) => {
  player.x = canvas.width / 2 - 25;
  player.y = canvas.height / 2 - 25;
  relativePosition.x = canvas.width / 2;
  relativePosition.y = canvas.height / 2;
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
  let damage = () => {
    return Math.round(Math.random() * 20);
  };
  let recover = () => {
    return Math.round(Math.random() * 5);
  };
  let x = {
    damage: 0,
    hp: 0,
    hit: false,
  };

  if (hit) {
    if (move.name == "attack") {
      x.damage = damage();
      x.hp = recover();
      x.hit = true;
    }
  }
  return x;
};
