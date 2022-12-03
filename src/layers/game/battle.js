import { randomPosition } from "./functions";
import { motion } from "framer-motion";

import "./battle.scss";

import { useEffect, useState } from "react";

import { battleMove, hpColor } from "./functions";

import pokeball from "../../pokeball-dark.png";

import data from "./data.js";

import { LS } from "../../functions/local-storage";

export const Battle = ({
  pokemon,
  setBattle,
  hp,
  setHP,
  userHP,
  setUserHP,
  userMove,
  loaded,
  setLoaded,
}) => {
  const [pokemonData, setPokemonData] = useState();
  const [userPokemonData, setUserPokemonData] = useState();
  const [move, setMove] = useState();

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  //pokemon AI
  useEffect(() => {
    let pokemonAI;

    if (loaded) {
      if (hp <= 0 || userHP <= 0) {
        clearInterval(pokemonAI);
      } else {
        let timer = Math.floor(Math.random() * 2000);
        pokemonAI = setInterval(() => {
          let pokeMoves = data.battleMoves;
          let m = Math.floor(Math.random() * pokeMoves.length);
          let x = battleMove(pokeMoves[m]);

          if (x.success) {
            setMove(x.type);
            setUserHP((userHP) => userHP - x.damage);
            setHP((hp) => hp + x.hp);
          } else {
            setMove("missed");
          }
          setTimeout(() => {
            setMove("");
          }, 200);

          timer = Math.floor(Math.random() * 2000);
        }, timer);
      }
    }
    return () => {
      clearInterval(pokemonAI);
    };
  }, [hp, userHP, loaded]);

  //endbattle
  useEffect(() => {
    let endBattle = () => {
      setTimeout(() => {
        setHP(100);
        setUserHP(100);
        setBattle(false);
        setLoaded(false);
      }, 2000);
    };
    if (hp <= 0) {
      setHP(0);

      let n = {};
      n[pokemon.id] = true;
      LS.data.battled = { ...LS.data.battled, ...n };
      LS.save(LS.data);

      endBattle();
    }
    if (userHP <= 0) {
      setUserHP(0);
      endBattle();
    }
    if (hp > 100) {
      setHP(100);
    }
    if (userHP > 100) {
      setUserHP(100);
    }
  }, [hp, userHP]);

  //get data
  useEffect(() => {
    if (pokemon) {
      let url = `https://pokeapi.co/api/v2/pokemon/${pokemon?.id}`;

      fetch(url)
        .then((res) => res.json())
        .then((result) => {
          setPokemonData(result);
        });
    }

    let url = `https://pokeapi.co/api/v2/pokemon/${25}`;

    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setUserPokemonData(result);
      });
  }, [pokemon]);

  return (
    <motion.div
      id="battle"
      initial={{ opacity: 0, filter: "blur(20px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
    >
      {!loaded && (
        <motion.img
          id="loading-pokeball"
          src={pokeball}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        />
      )}

      {pokemon && pokemonData && (
        <div id="pokemon">
          <motion.img
            className={`
            ${hp <= 0 ? "fainted" : ""}
            ${move == "attack" ? "attack" : ""}
            ${move == "missed" ? "attack" : ""}
            ${userMove == "attack" ? "attacked" : ""}
            ${userMove == "missed" ? "missed" : ""}
            `}
            initial={{ opacity: 0, x: 50, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            src={`https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon?.id}.gif?raw=true`}
          />
        </div>
      )}

      <motion.img
        initial={{ opacity: 0, x: -50, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        className={`
            ${userHP <= 0 ? "fainted" : ""}
            ${move == "missed" ? "missed" : ""}
            ${move == "attack" ? "attacked" : ""}
            ${userMove == "attack" ? "attack" : ""}
            ${userMove == "missed" ? "attack" : ""}

            `}
        id="trainer-pokemon"
        src={`https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/versions/generation-v/black-white/animated/back/${25}.gif?raw=true`}
      />
      {pokemonData && loaded && (
        <motion.div
          id="pokemon-bar"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
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
          animate={{ opacity: 1, x: 0 }}
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
    </motion.div>
  );
};
