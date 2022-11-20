export const LS = {
  init() {
    this.name = "pokedex-alpha";
    let data = JSON.parse(localStorage.getItem(this.name));
    if (data !== null) {
      this.data = data;
    } else {
      this.data = {
        caught: {
          Bulbasaur: true,
          Charmander: true,
          Squirtle: true,
        },
      };
      this.save(this.data);
    }
  },
  save(data) {
    localStorage.setItem(this.name, JSON.stringify(data));
  },
};
