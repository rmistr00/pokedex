import React, { useEffect, useState } from "react";
import "./sidePanel.scss";
import { motion } from "framer-motion";

import { Data } from "../data";

export const SidePanel = ({ setPokemon, pokemon }) => {
  return (
    <div id="sidePanel" className="border">
      {Data?.map((x, i) => (
        <motion.div
          onClick={() => {
            var img = new Image();
            img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
              i + 1
            }.png`;
            img.onload = () => {
              setPokemon(x);
            };
          }}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className={`pokemon-icon ${
            pokemon.name == x.name ? "selected-pokemon" : ""
          }`}
          key={x.name}
        >
          <img
            loading="lazy"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              i + 1
            }.png`}
          />
        </motion.div>
      ))}
    </div>
  );
};
