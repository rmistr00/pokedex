export const LS = {
  init() {
    this.name = "pokedex-alpha-beta";
    let data = JSON.parse(localStorage.getItem(this.name));
    if (data !== null) {
      this.data = data;
    } else {
      this.data = {
        battled: {
          1: true,
          4: true,
          7: true,
        },
      };
      this.save(this.data);
    }
  },
  save(data) {
    localStorage.setItem(this.name, JSON.stringify(data));
  },
};
