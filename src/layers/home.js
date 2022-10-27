import { useState } from "react";

import { SidePanel } from "../components/sidePanel";
import { PokeCard } from "../components/pokeCard";

import { motion } from "framer-motion";
import "./home.scss";

function Home({ setLayer }) {
  const [pokemon, setPokemon] = useState({
    attack: 49,
    defense: 49,
    height: 7,
    hp: 45,
    id: 1,
    name: "Bulbasaur",
    "s-attack": 65,
    "s-defense": 65,
    speed: 45,
    type: "grass",
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} id="Home">
      <PokeCard pokemon={pokemon} />
      <SidePanel setPokemon={setPokemon} pokemon={pokemon} />

      <svg
        id="triangle"
        width="58"
        height="58"
        onClick={() => {
          setLayer("loading");
        }}
      >
        <path
          stroke="none"
          fill="#ffeb3b"
          d="M20.339745962156 8.6891108675447a10 10 0 0 1 17.320508075689 0l17.679491924311 30.621778264911a10 10 0 0 1 -8.6602540378444 15l-35.358983848622 0a10 10 0 0 1 -8.6602540378444 -15"
        ></path>
      </svg>

      <div
        id="poke-search"
        className="border"
        // onClick={() => {
        //   setLayer("search");
        // }}
      >
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
