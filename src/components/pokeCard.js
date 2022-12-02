import React, { useState, useEffect } from "react";
import "./pokeCard.scss";
import { motion, AnimatePresence } from "framer-motion";

import trainer from "../trainer.png";

export const PokeCard = ({ pokemon }) => {
  let height = (h) => {
    if (h < 15) {
      return 90;
    }
    if (h > 15) {
      return 90 - (h - 15) * 7;
    }
  };

  let stats = {
    hp: "hp",
    attack: "atk",
    defense: "def",
    "s-attack": "s-atk",
    "s-defense": "s-def",
    speed: "spd",
  };

  return (
    <div id="pokeCard" className="border">
      <div id="poke-type" key={`${pokemon?.name}-key`}>
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/${pokemon?.type}.png`}
        />
      </div>
      <div id="poke-name">{pokemon?.name}</div>
      <motion.img
        key={pokemon?.name}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`}
        id="poke-art"
      />
      <div id="poke-stats">
        {Object.keys(stats).map((s, i) => (
          <div className="poke-max-stat" key={s}>
            <div className="stat-name"> {stats[s]}</div>
            <div
              className="poke-stat"
              style={{
                width: `${(pokemon[s] / 200) * 300}px`,
                transition: `${0.3 + i * 0.3}s`,
              }}
            ></div>
          </div>
        ))}
      </div>
      <img
        src={trainer}
        id="poke-trainer"
        style={{ height: `${height(pokemon?.height)}px` }}
      />
      <img
        src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon?.name.toLowerCase()}.gif`}
        id="poke-size"
      />
    </div>
  );
};
