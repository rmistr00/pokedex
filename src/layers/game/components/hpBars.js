import "./hpBars.scss";

import { motion } from "framer-motion";

import { hpColor } from "../functions";

export const HpBars = ({
  hp,
  userHP,
  pokemonData,
  userPokemonData,
  loaded,
}) => {
  return (
    <>
      {pokemonData && loaded && (
        <motion.div
          id="pokemon-bar"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.9, x: 0 }}
          transition={{ type: "ease" }}
        >
          <div id="name">{pokemonData?.name}</div>

          <div id="health" style={{ width: 180 }}>
            <div style={{ width: hp * 1.8, background: hpColor(hp) }}></div>
          </div>
        </motion.div>
      )}

      {userPokemonData && loaded && (
        <motion.div
          id="user-pokemon-bar"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.9, x: 0 }}
          transition={{ type: "ease" }}
        >
          <div id="name">{userPokemonData?.name}</div>

          <div id="health" style={{ width: 180 }}>
            <div
              style={{ width: userHP * 1.8, background: hpColor(userHP) }}
            ></div>
          </div>
        </motion.div>
      )}
    </>
  );
};
