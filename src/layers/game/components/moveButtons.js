import { motion } from "framer-motion";
import { useEffect } from "react";

export const MoveButtons = ({ player }) => {
  useEffect(() => {
    document.onkeydown = checkKey;
    document.onkeyup = () => {
      player.moving = false;
      player.button = "";
    };

    let keys = [
      { code: 37, key: "left" },
      { code: 38, key: "up" },
      { code: 39, key: "right" },
      { code: 40, key: "down" },
    ];

    function checkKey(e) {
      e = e || window.event;

      keys.forEach((x) => {
        if (e.keyCode == x.code) {
          player.moving = true;
          player.button = x.key;
        }
      });
    }
  }, []);

  return (
    <div id="buttons">
      <div id="buttons-center"></div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
  );
};
