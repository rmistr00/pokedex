import { motion } from "framer-motion";

export const MoveButtons = ({ player }) => {
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
