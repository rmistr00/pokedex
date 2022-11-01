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
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <motion.img
                height={`${height(x.height)}px`}
                loading="lazy"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${x.id}.png`}
              />
            </motion.div>
          ))}
      </motion.div>

      <div id="filters">
        <div id="stats">
          <div className="name">STATS</div>
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

        <div id="types">
          <div className="name">TYPES</div>
          {[...new Set(Data.map((x) => x.type))].map((t) => (
            <div
              key={t}
              className={`type ${type == t ? "selected-type" : ""}`}
              onClick={() => {
                type == t ? setType("") : setType(t);
              }}
            >
              <img
                src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/${t}.png`}
              />
              {t}
            </div>
          ))}
        </div>
      </div>

      <div id="bottom-bar">
        <i
          id="home"
          onClick={() => {
            setLayer("home");
          }}
          className="material-icons-round"
        >
          undo
        </i>

        <i
          id="order-pokemon"
          style={{ transform: order ? "rotate(0deg)" : "rotate(180deg)" }}
          onClick={() => {
            setOrder(!order);
          }}
          className="material-icons-round"
        >
          arrow_circle_up
        </i>
      </div>
    </motion.div>
  );
}

export default Search;
