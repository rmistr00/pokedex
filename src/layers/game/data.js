export default {
  player: {
    x: 0,
    y: 0,
    url: "https://reliccastle.com/attachments/1716/",
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
    url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8d40d391-a693-4951-9c5e-98fdc7d2600a/d9leui9-2433ac69-5fa3-4926-9e19-a8a65212f1ac.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzhkNDBkMzkxLWE2OTMtNDk1MS05YzVlLTk4ZmRjN2QyNjAwYVwvZDlsZXVpOS0yNDMzYWM2OS01ZmEzLTQ5MjYtOWUxOS1hOGE2NTIxMmYxYWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.cGvguC242bkdDWvpRp-8H0wY_jdjrrHwwCaEmaE5x0g",
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
