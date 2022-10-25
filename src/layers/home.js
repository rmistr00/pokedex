import { useState } from "react";

import { SidePanel } from "../components/sidePanel";
import { PokeCard } from "../components/pokeCard";

import { motion } from "framer-motion";

function Home() {
  const [pokemon, setPokemon] = useState("pikachu");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} id="Home">
      <PokeCard pokemon={pokemon} />
      <SidePanel setPokemon={setPokemon} pokemon={pokemon} />

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
    </motion.div>
  );
}

export default Home;
