import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import "./game.scss";

function Game({ setLayer }) {
  let canvas;
  let ctx;
  let frame = 0;

  let position = { x: 50, y: 50 };

  let buttons = {
    left: false,
    right: false,
    up: false,
    down: false,
  };

  let player = {
    width: 50,
    frame: 0,
    direction: 0,
    moving: false,
  };

  let move = () => {
    let distance = 1;

    if (buttons.right && position.x < canvas.width - player.width) {
      position.x += distance;
      player.direction = 128;
    }
    if (buttons.left && position.x > 0) {
      position.x -= distance;
      player.direction = 64;
    }
    if (buttons.up && position.y > 0) {
      position.y -= distance;
      player.direction = 192;
    }
    if (buttons.down && position.y < canvas.height - player.width) {
      position.y += distance;
      player.direction = 0;
    }
  };

  let clear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  let drawPlayer = () => {
    if (frame % 20 == 0) {
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
      position.x,
      position.y,
      50,
      50
    );
    move();
  };

  let animate = () => {
    window.requestAnimationFrame(animate);
    clear();
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

  useEffect(() => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    let screen = document.getElementById("canvas").getBoundingClientRect();
    canvas.height = screen.height;
    canvas.width = screen.width;

    let playerImg = new Image();
    playerImg.src = "https://reliccastle.com/attachments/1716/";
    player.img = playerImg;

    animate();
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
      <button
        id="home-button"
        onClick={() => {
          setLayer("home");
        }}
      >
        home
      </button>
    </motion.div>
  );
}

export default Game;
