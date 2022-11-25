import { randomPosition } from "./functions";
import { motion } from "framer-motion";

import "./battle.scss";

export const Battle = ({ pokemon, setBattle }) => {
  return (
    <motion.div
      id="battle"
      initial={{ opacity: 0, scale: 0.1 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <button
        onClick={() => {
          setBattle(false);
        }}
      >
        run
      </button>
    </motion.div>
  );
};
