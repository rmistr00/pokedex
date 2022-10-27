export const Color = (c) => {
  switch (c) {
    case "psychic":
      c = "311b92";
      break;
    case "rock":
      c = "263238";
      break;
    case "ghost":
      c = "212121";
      break;
    case "bug":
      c = "f57f17";
      break;
    case "water":
      c = "0d47a1";
      break;
    case "normal":
      c = "880e4f";
      break;
    case "grass":
      c = "1b5e20";
      break;
    case "fire":
      c = "b71c1c";
      break;
    case "flying":
      c = "01579b";
      break;
    case "electric":
      c = "827717";
      break;
    case "ice":
      c = "006064";
      break;
    case "poison":
      c = "4a148c";
      break;
    case "dragon":
      c = "bf360c";
      break;
    case "ground":
      c = "3e2723";
      break;
    case "fighting":
      c = "ff6f00";
      break;
    default:
      c = "black";
  }
  return c;
};
