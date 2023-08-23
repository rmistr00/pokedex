import { useEffect, useState, useRef } from "react";

import { motion } from "framer-motion";

import "./game.scss";

import data from "./data";
import {
  resize,
  loadSprite,
  spawnPokemon,
  spawnPokemons,
  init,
  collison,
} from "./functions";
import { playerSprite } from "./sprites/player";
import { mapSprite } from "./sprites/map";
import { pokemonSprite } from "./sprites/pokemon";

import { Battle } from "./battle";
import { MoveButtons } from "./components/moveButtons";
import { BattleButtons } from "./components/battleButtons";

let { pokemons, player, mapPosition, frame, relativePosition, map } = data;

function Game({ setLayer }) {
  const [battle, setBattle] = useState(false);
  const canvasRef = useRef(null);
  const [hp, setHP] = useState(100);
  const [userHP, setUserHP] = useState(100);
  const [userMove, setUserMove] = useState();
  const [chooseMove, setChooseMove] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [pokemon, setPokemon] = useState();

  //canvas
  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    resize(canvas);

    init(relativePosition, player, canvas);

    pokemons = spawnPokemons();

    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      mapSprite(ctx, map, mapPosition, canvas);

      pokemons.forEach((x) => {
        pokemonSprite(ctx, x, mapPosition, player, frame);
        if (collison(relativePosition, x, player)) {
          player.moving = false;
          setPokemon(x);
          setBattle(true);
        }
      });

      playerSprite(ctx, player, frame, mapPosition, relativePosition);

      frame += 1;

      animationFrameId = window.requestAnimationFrame(render);
    };
    render();
    return () => {
      mapPosition = { x: 0, y: 0 };
      frame = 0;
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    if (!battle) {
      pokemons = spawnPokemons();
    }
  }, [battle]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} id="game">
      <canvas id="canvas" ref={canvasRef}></canvas>
      <div id="canvas-line" />
      {/* battle */}
      {battle && (
        <Battle
          setBattle={setBattle}
          hp={hp}
          setHP={setHP}
          userHP={userHP}
          setUserHP={setUserHP}
          pokemon={pokemon}
          userMove={userMove}
          battle={battle}
          chooseMove={chooseMove}
          setChooseMove={setChooseMove}
          loaded={loaded}
          setLoaded={setLoaded}
        />
      )}

      {battle && userHP > 0 && hp > 0 && (
        <button
          id="run"
          onClick={() => {
            setHP(100);
            setUserHP(100);
            setBattle(false);
            setLoaded(false);
            pokemons = spawnPokemons();
          }}
        >
          RUN
        </button>
      )}

      {!battle && <MoveButtons player={player} />}

      {battle && userHP > 0 && hp > 0 && loaded && (
        <BattleButtons
          setChooseMove={setChooseMove}
          setHP={setHP}
          setUserHP={setUserHP}
          setUserMove={setUserMove}
          chooseMove={chooseMove}
        />
      )}

      <svg
        width="58"
        height="58"
        id="home-button"
        onClick={() => {
          setLayer("home");
        }}
      >
        <path
          stroke="none"
          fill="#ffeb3b"
          d="M20.339745962156 8.6891108675447a10 10 0 0 1 17.320508075689 0l17.679491924311 30.621778264911a10 10 0 0 1 -8.6602540378444 15l-35.358983848622 0a10 10 0 0 1 -8.6602540378444 -15"
        ></path>
      </svg>

      <div id="pokemons-line"></div>
    </motion.div>
  );
}

export default Game;
