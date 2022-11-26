import { randomPosition } from "./functions";
import { motion } from "framer-motion";

import "./battle.scss";

import { useEffect, useState } from "react";

export const Battle = ({ pokemon, setBattle, hp, setHP }) => {
  const [pokemonData, setPokemonData] = useState();

  const [attack, setAttack] = useState(false);

  useEffect(() => {
    if (pokemon) {
      let url = `https://pokeapi.co/api/v2/pokemon/${pokemon?.id}`;

      fetch(url)
        .then((res) => res.json())
        .then((result) => {
          setPokemonData(result);
        });
    }
  }, [pokemon]);

  useEffect(() => {
    if (hp < 0) {
      setHP(100);
      setBattle(false);
    }

    setAttack(true);
    setTimeout(() => {
      setAttack(false);
    }, 300);
  }, [hp]);

  return (
    <motion.div
      id="battle"
      initial={{ opacity: 0, filter: "blur(20px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
    >
      {pokemon && (
        <div id="pokemon">
          <motion.img
            className={`${attack ? "attacked" : ""}`}
            initial={{ opacity: 0, x: 50, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            src={`https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon?.id}.gif?raw=true`}
          />
        </div>
      )}

      <motion.img
        initial={{ opacity: 0, x: -50, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        className={`${attack ? "attacked" : ""}`}
        id="trainer-pokemon"
        src={`https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/versions/generation-v/black-white/animated/back/${25}.gif?raw=true`}
      />

      <div id="pokemon-bar">
        <div id="name">{pokemonData?.name}</div>

        <div id="health" style={{ width: 180 }}>
          <div style={{ width: hp * 1.8 }}></div>
        </div>
      </div>
    </motion.div>
  );
};
