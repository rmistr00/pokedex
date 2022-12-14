import "./results.scss";

import { motion } from "framer-motion";

export const Results = ({ hp, userHP }) => {
  return (
    <motion.div
      id="battle-results"
      initial={{ opacity: 0, y: 100, scale: 0.1 }}
      animate={{ y: 0, opacity: 0.9, scale: 1 }}
    >
      {userHP > hp ? <div>⭐️</div> : <div>🫣</div>}
    </motion.div>
  );
};
