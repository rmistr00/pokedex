export function pokemonSprite(ctx, pokemon, mapPosition, player, frame) {
  let p = new Pokemon(pokemon);
  p.draw(ctx, mapPosition, player, frame);
}

let randomPos = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

class Pokemon {
  constructor(pokemon) {
    this.pokemon = pokemon;
  }
  draw(ctx, mapPosition, player, frame) {
    if (frame % 30 == 0) {
      this.pokemon.x += randomPos(-20, 20) / 5;
      this.pokemon.y += randomPos(-20, 20) / 5;
    }

    ctx.drawImage(
      this.pokemon.img,
      mapPosition.x + this.pokemon.x + player.x,
      mapPosition.y + this.pokemon.y + player.y,
      70,
      70
    );
  }
}
