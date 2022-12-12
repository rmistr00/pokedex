import React, { useEffect, useState } from "react";
import "./sidePanel.scss";
import { motion } from "framer-motion";

import { Data } from "../data";

import { LS } from "../functions/local-storage";

LS.init();

export const SidePanel = ({ setPokemon, pokemon }) => {
  const [battled, setBattled] = useState({});

  useEffect(() => {
    setBattled(LS.data.battled);
  }, []);

  return (
    <div id="sidePanel" className="border">
      {Data?.map((x, i) => (
        <motion.img
          onClick={() => {
            var img = new Image();
            img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
              i + 1
            }.png`;
            img.onload = () => {
              setPokemon(x);
            };
          }}
          initial={{ opacity: 0, scale: 0.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className={`pokemon-icon ${
            pokemon.name == x.name ? "selected-pokemon" : ""
          }`}
          key={x.name}
          loading="lazy"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${x.id}.png`}
        />
      ))}
    </div>
  );
};
