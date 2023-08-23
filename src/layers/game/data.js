export default {
  search: {
    url: "https://github.com/rmistr00/pokedex/blob/beta/src/layers/game/assets/background.jpeg?raw=true",
  },
  player: {
    x: 0,
    y: 0,
    url: "https://github.com/rmistr00/pokedex/blob/beta/src/layers/game/assets/player.png?raw=true",
    moving: false,
    direction: 0,
    frame: 0,
    button: "",
  },
  pokemons: [],
  frame: 0,
  mapPosition: {
    x: 0,
    y: 0,
  },
  relativePosition: {
    x: 0,
    y: 0,
  },
  map: {
    url: "https://github.com/rmistr00/pokedex/blob/beta/src/layers/game/assets/map.png?raw=true",
  },
  battleMoves: [
    {
      name: "attack",
      accuracy: 70,
      timer: 600,
      damage: 15,
      info: "",
    },
    {
      name: "counter",
      accuracy: 30,
      timer: 900,
      damage: 40,
      info: "stronger but slower",
    },
    {
      name: "quick-attack",
      accuracy: 90,
      timer: 300,
      damage: 3,
      info: "faster but weaker",
    },
  ],
};
