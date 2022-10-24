import React, { useEffect, useState } from "react";
import "./sidePanel.scss";
import { motion } from "framer-motion";

export const SidePanel = ({ pokemon, setPokemon }) => {
  const [pokemons, setPokemons] = useState();

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=151`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setPokemons(json.results);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="sidePanel" className="border">
      {pokemons?.map((x, i) => (
        <motion.div
          onClick={() => setPokemon(x.name)}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className={`pokemon-icon ${
            pokemon == x.name ? "selected-pokemon" : ""
          }`}
          key={x.name}
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              i + 1
            }.png`}
          />
        </motion.div>
      ))}
    </div>
  );
};
