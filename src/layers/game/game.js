import { useEffect, useState, useRef } from "react";

import { motion } from "framer-motion";

import "./game.scss";

import data from "./data";
import {
  resize,
  loadSprite,
  spawnPokemon,
  pokemonCollison,
  init,
} from "./functions";
import { playerSprite } from "./sprites/player";
import { pokemonSprite } from "./sprites/pokemon";
import { mapSprite } from "./sprites/map";

import { Battle } from "./battle";

let { player, mapPosition, frame, pokemon, relativePosition, map } = data;

function Game({ setLayer }) {
  const [battle, setBattle] = useState(false);
  const [currentPokemon, setCurrentPokemon] = useState();
  const canvasRef = useRef(null);
  const [hp, setHP] = useState(100);

  useEffect(() => {
    loadSprite(player);
    loadSprite(pokemon);
    loadSprite(map);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrameId;

    resize(canvas);

    init(relativePosition, player, canvas);
    pokemon = spawnPokemon(pokemon, { width: 150, height: 150 });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pokemonSprite(ctx, pokemon, mapPosition, player);
      mapSprite(ctx, map, mapPosition, player);
      playerSprite(ctx, player, frame, mapPosition, relativePosition);

      if (pokemonCollison(relativePosition, pokemon, player)) {
        player.moving = false;
        player.button = "";
        setBattle(true);
      }

      frame += 1;
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      mapPosition.x = 0;
      mapPosition.y = 0;
    };
  }, []);

  useEffect(() => {
    if (battle) {
      setCurrentPokemon(pokemon);
      setTimeout(() => {
        pokemon = spawnPokemon(pokemon, { width: 150, height: 150 });
      }, 500);
    }
  }, [battle]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} id="game">
      <canvas id="canvas" ref={canvasRef}></canvas>

      {battle && (
        <Battle
          setBattle={setBattle}
          hp={hp}
          setHP={setHP}
          pokemon={currentPokemon}
        />
      )}

      <div id="buttons">
        <div id="buttons-center"></div>
        {battle ? (
          <>
            <button
              id="button-up"
              onClick={() => {
                let x = Math.random(1) * 50;
                setHP(hp - x);
              }}
            >
              ATK
            </button>
            <button
              id="button-down"
              onClick={() => {
                setHP(100);
                setBattle(false);
              }}
            >
              RUN
            </button>
          </>
        ) : (
          ["down", "up", "left", "right"].map((x) => (
            <button
              key={x}
              id={`button-${x}`}
              onContextMenu={(e) => {
                e.preventDefault();
              }}
              onPointerDown={() => {
                player.moving = true;
                player.button = x;
              }}
              onPointerLeave={() => {
                player.moving = false;
                player.button = "";
              }}
            >
              <i className="material-symbols-outlined">{`keyboard_arrow_${x}`}</i>
            </button>
          ))
        )}
      </div>

      {!battle && (
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
      )}

      <div id="pokemons-line"></div>
    </motion.div>
  );
}

export default Game;
