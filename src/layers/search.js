import { motion } from "framer-motion";

import "./search.scss";

import { Data } from "../data";
import { useState, useEffect } from "react";
import trainer from "../trainer.png";

function Search({ setLayer }) {
  const [type, setType] = useState("grass");
  const [stat, setStat] = useState("id");
  const [order, setOrder] = useState(false);
  const [pokemons, setPokemons] = useState();

  useEffect(() => {
    setPokemons(Data);
  }, []);

  let height = (h) => {
    if (h <= 14) {
      return 90;
    } else {
      return h * 9;
    }
  };

  useEffect(() => {
    if (type) {
      let filtered = Data.filter((x) => x.type == type);
      setPokemons(filtered);
    } else {
      setPokemons(Data);
      setType("");
    }
  }, [type]);

  let stats = [
    "attack",
    "defense",
    "hp",
    "s-attack",
    "s-defense",
    "speed",
    "height",
    "id",
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} id="search">
      <motion.div key={pokemons} id="pokemons">
        <img src={trainer} id="poke-trainer" />
        <div className="pokemon-imgs">
          {pokemons
            ?.sort((a, b) => {
              if (order) {
                return b[stat] - a[stat];
              } else {
                return a[stat] - b[stat];
              }
            })
            .map((x, i) => (
              <motion.div
                key={x.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
              >
                <motion.img
                  height={`${height(x.height)}px`}
                  loading="lazy"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${x.id}.png`}
                />
              </motion.div>
            ))}
        </div>
      </motion.div>

      <div id="filters">
        <div id="stats">
          <div className="name">STATS</div>
          <div className="container">
            {stats.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setStat(s);
                }}
                className={stat == s ? "selected-stat" : ""}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div id="types">
          <div className="name">TYPES</div>
          <div className="container">
            {[...new Set(Data.map((x) => x.type))].map((t) => (
              <div
                key={t}
                className={`type ${type == t ? "selected-type" : ""}`}
                onClick={() => {
                  type == t ? setType("") : setType(t);
                }}
              >
                <img
                  loading="lazy"
                  src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/${t}.png`}
                />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="circle" className="border" onClick={() => setLayer("home")}>
        <motion.div
          animate={{
            scale: 2.5,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>

      <div id="corner-line" />

      <div
        id="order-pokemon"
        onClick={() => {
          setOrder(!order);
        }}
        className="material-symbols-outlined"
      >
        {order ? <i>chevron_left</i> : <i>chevron_right</i>}
      </div>

      <div id="pokemons-line"></div>
      <div id="filters-line"></div>
    </motion.div>
  );
}

export default Search;
