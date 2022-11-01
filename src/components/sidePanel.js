import React, { useEffect, useState } from "react";
import "./sidePanel.scss";
import { motion } from "framer-motion";

import { Data } from "../data";

import pokeballDark from "../pokeball-dark.png";

import { LS } from "../functions/local-storage";

LS.init();

export const SidePanel = ({ setPokemon, pokemon }) => {
  const [caught, setCaught] = useState({});

  useEffect(() => {
    setCaught(LS.data.caught);
  }, []);

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
              let n = {};
              n[x.name] = true;
              setCaught({ ...caught, ...n });
              LS.data.caught = { ...LS.data.caught, ...n };
              LS.save(LS.data);
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
            className={caught[x.name] ? "caught" : ""}
            loading="lazy"
            src={
              caught[x.name]
                ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${x.id}.png`
                : pokeballDark
            }
          />
        </motion.div>
      ))}
    </div>
  );
};
