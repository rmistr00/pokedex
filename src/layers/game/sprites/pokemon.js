export function pokemonSprite(ctx, pokemon, mapPosition, player) {
  let p = new Pokemon(pokemon);
  p.draw(ctx, mapPosition, player);
}

class Pokemon {
  constructor(pokemon) {
    this.pokemon = pokemon;
  }
  draw(ctx, mapPosition, player) {
    ctx.drawImage(
      this.pokemon.img,
      mapPosition.x + this.pokemon.x - 15 + player.x,
      mapPosition.y + this.pokemon.y - 15 + player.y,
      50,
      50
    );
  }
}
