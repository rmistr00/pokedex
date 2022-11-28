import { randomPosition } from "./functions";
import { motion } from "framer-motion";

import "./battle.scss";

import { useEffect, useState } from "react";

import { battleMove } from "./functions";

export const Battle = ({
  pokemon,
  setBattle,
  hp,
  setHP,
  userHP,
  setUserHP,
  userMove,
}) => {
  const [pokemonData, setPokemonData] = useState();
  const [userPokemonData, setUserPokemonData] = useState();
  const [move, setMove] = useState();

  //pokemon AI
  useEffect(() => {
    let seconds = Math.round(Math.random() * 3000);

    let pokemonAI;

    if (hp <= 0 || userHP <= 0) {
      clearInterval(pokemonAI);
    } else {
      pokemonAI = setInterval(() => {
        let x = battleMove({ name: "attack", accuracy: 70 });

        if (x.hit) {
          setMove("attack");
          setUserHP((userHP) => userHP - x.damage);
          setHP((hp) => hp + x.hp);
        } else {
          setMove("missed");
        }
        setTimeout(() => {
          setMove("");
        }, 100);

        seconds = Math.round(Math.random() * 3000);
      }, seconds);
    }

    return () => {
      clearInterval(pokemonAI);
    };
  }, [hp, userHP]);

  //endbattle
  useEffect(() => {
    let endBattle = () => {
      setTimeout(() => {
        setHP(100);
        setUserHP(100);
        setBattle(false);
      }, 3000);
    };
    if (hp <= 0) {
      endBattle();
    }
    if (userHP <= 0) {
      endBattle();
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
      {pokemonData && (
        <div id="pokemon-bar">
          <div id="name">{pokemonData?.name}</div>

          <div id="health" style={{ width: 180 }}>
            <div style={{ width: hp * 1.8 }}></div>
          </div>
        </div>
      )}
      {userPokemonData && (
        <div id="user-pokemon-bar">
          <div id="name">{userPokemonData?.name}</div>

          <div id="health" style={{ width: 180 }}>
            <div style={{ width: userHP * 1.8 }}></div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
