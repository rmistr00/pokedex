import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import "./game.scss";

import pokeballDark from "../../pokeball-dark.png";
import Loading from "../loading";

function Game({ setLayer }) {
  const [loading, setLoading] = useState(true);
  let canvas;
  let ctx;
  let frame = 0;

  let position = {};

  let buttons = {
    left: false,
    right: false,
    up: false,
    down: false,
  };

  let pokeball = {};

  let player = {
    width: 50,
    frame: 0,
    direction: 0,
    moving: false,
    position: { x: 0, y: 0 },
  };

  let map = {};

  let move = () => {
    let distance = 2;

    if (buttons.right) {
      position.x -= distance;
      player.direction = 128;
      player.position.x += 2;
    }
    if (buttons.left) {
      position.x += distance;
      player.direction = 64;
      player.position.x -= 2;
    }
    if (buttons.up) {
      position.y += distance;
      player.direction = 192;
      player.position.y -= 2;
    }
    if (buttons.down) {
      position.y -= distance;
      player.direction = 0;
      player.position.y += 2;
    }
  };

  let clear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  let drawPlayer = () => {
    if (frame % 10 == 0) {
      player.frame += 1;
      if (player.frame > 3) {
        player.frame = 0;
      }
    }

    let playerMoving = () => {
      if (player.moving) {
        return 0 + 64 * player.frame;
      } else {
        return 0;
      }
    };

    ctx.drawImage(
      player.img,
      playerMoving(),
      player.direction,
      64,
      64,
      canvas.width / 2 - player.width / 2,
      canvas.height / 2 - player.width / 2,
      50,
      50
    );
    move();
  };

  let drawPokemon = (pokemon) => {
    ctx.drawImage(
      pokeball.img,
      position.x + pokemon.position.x,
      position.y + pokemon.position.y,
      30,
      30
    );
  };

  let collision = () => {
    let pokePosition = pokemons[0]?.position;

    if (
      Math.abs(pokePosition?.x - player.position.x) < 30 &&
      Math.abs(pokePosition?.y - player.position.y - 20) < 30
    ) {
      return true;
    } else {
      return false;
    }
  };

  let animate = () => {
    window.requestAnimationFrame(animate);
    clear();

    if (collision()) {
      console.log(pokemons[0]);
      pokemons.shift();
      spawnPokemons();
      maps = [];
      spawnMap();
    }

    maps.forEach((m) => {
      drawMap(m);
    });
    pokemons.forEach((x) => {
      drawPokemon(x);
    });
    drawPlayer();

    frame += 1;
  };

  let moveButtons = (button) => {
    buttons[button] = true;
    player.moving = true;
  };

  let clearButtons = () => {
    ["left", "right", "up", "down"].forEach((x) => {
      buttons[x] = false;
      player.moving = false;
    });
  };

  let randomPokemon = () => {
    let min = 1;
    let max = 150;
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  let randomPosition = () => {
    let min = -300;
    let max = 300;
    min = Math.ceil(min);
    max = Math.floor(max);
    let x = Math.floor(Math.random() * (max - min + 1) + min);
    let y = Math.floor(Math.random() * (max - min + 1) + min);
    return { x, y };
  };

  let pokemons = [];

  let spawnPokemon = () => {
    let pokemon = {};
    pokemon.position = randomPosition();
    pokemon.id = randomPokemon();
    return pokemon;
  };

  let spawnPokemons = () => {
    [1].forEach((x) => {
      pokemons.push(spawnPokemon());
    });
  };

  let maps = [];

  let spawnMap = () => {
    [...Array(20)].forEach((x) => {
      maps.push(randomPosition());
    });
  };

  let drawMap = (n) => {
    ctx.drawImage(
      map.img,
      16 * 4,
      16,
      16,
      16,
      n.x + position.x,
      n.y + position.y,
      25,
      25
    );
  };

  useEffect(() => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    let screen = document.getElementById("canvas").getBoundingClientRect();
    canvas.height = screen.height;
    canvas.width = screen.width;

    position = { x: canvas.width / 2 - 20, y: canvas.height / 2 - 20 };

    let playerImg = new Image();
    playerImg.src = "https://reliccastle.com/attachments/1716/";
    player.img = playerImg;

    let pokeballImg = new Image();
    pokeballImg.src =
      "https://github.com/PokeAPI/sprites/blob/master/sprites/items/poke-ball.png?raw=true";

    pokeball.img = pokeballImg;

    spawnPokemons();
    spawnMap();

    let mapImg = new Image();
    mapImg.src =
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8d40d391-a693-4951-9c5e-98fdc7d2600a/d9leui9-2433ac69-5fa3-4926-9e19-a8a65212f1ac.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzhkNDBkMzkxLWE2OTMtNDk1MS05YzVlLTk4ZmRjN2QyNjAwYVwvZDlsZXVpOS0yNDMzYWM2OS01ZmEzLTQ5MjYtOWUxOS1hOGE2NTIxMmYxYWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.cGvguC242bkdDWvpRp-8H0wY_jdjrrHwwCaEmaE5x0g";

    mapImg.onload = () => {
      map.img = mapImg;
      animate();

      setLoading(false);
    };
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} id="game">
      <canvas id="canvas"></canvas>
      <div id="buttons">
        <div id="buttons-center"></div>
        {["down", "up", "left", "right"].map((x) => (
          <button
            key={x}
            id={`button-${x}`}
            onPointerDown={() => {
              moveButtons(x);
            }}
            onPointerLeave={() => {
              clearButtons();
            }}
          >
            <i className="material-symbols-outlined">{`keyboard_arrow_${x}`}</i>
          </button>
        ))}
      </div>

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

      {loading && (
        <motion.img
          animate={{
            rotate: 360,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          src={pokeballDark}
          id="loading-pokeball"
        />
      )}
    </motion.div>
  );
}

export default Game;
