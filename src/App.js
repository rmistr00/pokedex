import logo from "./logo.svg";
import "./app.scss";

import { Sample } from "./data";
import { SidePanel } from "./components/sidePanel";
import { PokeCard } from "./components/pokeCard";

import { motion } from "framer-motion";

function App() {
  // let sprites=[...Array(3)].map((x,i)=>`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i+1}.png`).map(x =>
  // <img src={x}></img>
  // )

  // console.log(sprites)

  return (
    <div className="App">
      <PokeCard />
      <SidePanel />

      <div id="poke-search">
        <motion.div
          animate={{
            scale: 3,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>

      <div id="poke-search-line" />
      <div id="poke-card-line" />
      <div id="side-panel-line" />
    </div>
  );
}

export default App;
