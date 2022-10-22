import logo from "./logo.svg";
import "./app.scss";

import { useState } from "react";

import { Sample } from "./data";
import { SidePanel } from "./components/sidePanel";
import { PokeCard } from "./components/pokeCard";

import { motion } from "framer-motion";

function App() {
  // let sprites=[...Array(3)].map((x,i)=>`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i+1}.png`).map(x =>
  // <img src={x}></img>
  // )

  // console.log(sprites)

  const [pokemon, setPokemon] = useState("typhlosion");

  return (
    <div className="App">
      <PokeCard pokemon={pokemon} />
      <SidePanel setPokemon={setPokemon} />

      <div id="poke-search" className="border">
        <motion.div
          animate={{
            scale: 3.2,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>

      <div id="poke-search-line" className="border" />
      <div id="poke-card-line" className="border" />
      <div id="side-panel-line" className="border" />
    </div>
  );
}

export default App;
