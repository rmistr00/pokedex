import { useEffect, useState, useRef } from "react";

import { motion } from "framer-motion";

import "./game.scss";

import data from "./data";
import {
  resize,
  loadSprite,
  spawnPokemon,
  init,
  battleMove,
} from "./functions";
import { playerSprite } from "./sprites/player";
import { mapSprite } from "./sprites/map";

import { Battle } from "./battle";

let { player, mapPosition, frame, relativePosition, map } = data;

function Game({ setLayer }) {
  const [battle, setBattle] = useState(true);
  const [currentPokemon, setCurrentPokemon] = useState();
  const canvasRef = useRef(null);
  const [hp, setHP] = useState(100);
  const [userHP, setUserHP] = useState(100);
  const [userMove, setUserMove] = useState();
  const [chooseMove, setChooseMove] = useState(true);

  //canvas
  useEffect(() => {
    loadSprite(player);
    loadSprite(map);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrameId;

    resize(canvas);

    init(relativePosition, player, canvas);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      mapSprite(ctx, map, mapPosition, player);
      playerSprite(ctx, player, frame, mapPosition, relativePosition);
      frame += 1;

      animationFrameId = window.requestAnimationFrame(render);
    };
    render();
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // start battle
  useEffect(() => {
    let pokemon = spawnPokemon();
    setCurrentPokemon(pokemon);

    if (!battle) {
      let seconds = Math.round(Math.random() * 10) * 1000;
      if (seconds < 5000) {
        seconds = 5000;
      }
      setTimeout(() => {
        setBattle(true);
        player.moving = false;
      }, seconds);
    }
  }, [battle]);

  //limit user moves
  useEffect(() => {
    if (!chooseMove) {
      setTimeout(() => {
        setChooseMove(true);
      }, 300);
    }
  }, [chooseMove]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} id="game">
      <canvas id="canvas" ref={canvasRef}></canvas>

      {/* battle */}
      {battle && (
        <Battle
          setBattle={setBattle}
          hp={hp}
          setHP={setHP}
          userHP={userHP}
          setUserHP={setUserHP}
          pokemon={currentPokemon}
          userMove={userMove}
        />
      )}

      {/* battle buttons */}
      {battle && (
        <div id="battle-buttons">
          {chooseMove && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <button
                id="attack"
                onClick={() => {
                  let x = battleMove({ name: "attack", accuracy: 70 });
                  if (x.hit) {
                    setUserMove("attack");
                    setHP((hp) => hp - x.damage);
                    setUserHP((userHP) => userHP + x.hp);
                  } else {
                    setUserMove("missed");
                  }
                  setTimeout(() => {
                    setUserMove("");
                  }, 100);

                  setChooseMove(false);
                }}
              >
                ATK
              </button>
            </motion.div>
          )}
        </div>
      )}

      {battle && (
        <button
          id="run"
          onClick={() => {
            setHP(100);
            setUserHP(100);
            setBattle(false);
          }}
        >
          RUN
        </button>
      )}

      {/* move buttons */}
      {!battle && (
        <div id="buttons">
          <div id="buttons-center"></div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {["down", "up", "left", "right"].map((x) => (
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
            ))}
          </motion.div>
        </div>
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
