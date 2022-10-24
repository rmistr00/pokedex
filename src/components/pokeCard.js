import React, { useState, useEffect } from "react";
import "./pokeCard.scss";
import { motion, AnimatePresence } from "framer-motion";

import trainer from "../trainer.png";

export const PokeCard = ({ pokemon }) => {
  const [pokeData, setPokeData] = useState();
  console.log(pokeData);

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setPokeData(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [pokemon]);

  let height = (h) => {
    if (h > 10) {
      return (10 / h) * 100;
    } else {
      return 100;
    }
  };

  let stats = {
    hp: "hp",
    attack: "atk",
    defense: "def",
    "special-attack": "s-atk",
    "special-defense": "s-def",
    speed: "spd",
  };

  return (
    <div id="pokeCard" className="border">
      <div id="poke-name">{pokeData?.name}</div>
      <AnimatePresence>
        <motion.img
          className="img-shadow"
          key={pokemon}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeData?.id}.png`}
          id="poke-art"
        />
      </AnimatePresence>
      <div id="poke-stats">
        {pokeData?.stats.map((x, i) => (
          <div className="poke-max-stat" key={x.stat.name}>
            <div className="stat-name"> {stats[x.stat.name]}</div>
            <div
              className="poke-stat"
              style={{ width: `${(x.base_stat / 255) * 255}px` }}
            ></div>
          </div>
        ))}
      </div>
      <img
        src={trainer}
        id="poke-trainer"
        className="img-shadow"
        style={{ height: `${height(pokeData?.height)}px` }}
      />
      <img
        src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${pokeData?.name}.gif`}
        id="poke-size"
      />
    </div>
  );
};
