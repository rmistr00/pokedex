import { motion } from "framer-motion";

import "./search.scss";

import { Data } from "../data";
import { useState, useEffect } from "react";
import trainer from "../trainer.png";

function Search({ setLayer }) {
  const [type, setType] = useState("fire");
  const [stat, setStat] = useState("hp");
  const [order, setOrder] = useState(true);
  const [pokemons, setPokemons] = useState();

  useEffect(() => {
    setPokemons(Data);
  }, []);

  let height = (h) => {
    if (h <= 15) {
      return 100;
    } else {
      return h * 10;
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
      <button
        onClick={() => {
          setLayer("home");
        }}
      >
        home
      </button>

      <button
        onClick={() => {
          setOrder(!order);
        }}
      >
        order
      </button>

      <div id="types">
        {[...new Set(Data.map((x) => x.type))].map((t) => (
          <button
            className={type == t ? "selected-type" : ""}
            onClick={() => {
              type == t ? setType("") : setType(t);
            }}
            key={t}
          >
            {t}
          </button>
        ))}
      </div>

      <div id="types">
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

        <div id="pokemons">
          {pokemons
            ?.sort((a, b) => {
              if (order) {
                return b[stat] - a[stat];
              } else {
                return a[stat] - b[stat];
              }
            })
            .map((x, i) => (
              <img
                height={`${height(x.height)}px`}
                style={{ margin: `${i + i * 40}px`, zIndex: `${-i}` }}
                key={x.name}
                loading="lazy"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${x.id}.png`}
              />
            ))}
        </div>
        <img src={trainer} id="poke-trainer" className="img-shadow" />
      </div>
    </motion.div>
  );
}

export default Search;
