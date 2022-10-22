import React, { useState, useEffect } from "react";
import "./pokeCard.scss";
import { motion } from "framer-motion";

import trainer from "../trainer.png";

export const PokeCard = ({ pokemon }) => {
  const [pokeData, setPokeData] = useState();

  console.log(pokemon);

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
  }, []);

  console.log(pokeData);

  let height = (h) => {
    if (h > 10) {
      return (15 / h) * 100;
    } else {
      return 100;
    }
  };

  return (
    <div id="pokeCard" className="border">
      <div id="poke-name">name</div>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeData?.id}.png`}
        id="poke-art"
      />
      <div id="poke-stats">
        stats
        {pokeData?.stats.map((x) => (
          <div className="poke-stat" key={x.stat.name}>
            {x.stat.name} {x.base_stat}
          </div>
        ))}
      </div>
      <img
        src={trainer}
        id="poke-trainer"
        style={{ height: `${height(pokeData?.height)}px` }}
      />
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeData?.id}.png`}
        id="poke-size"
      />
    </div>
  );
};
