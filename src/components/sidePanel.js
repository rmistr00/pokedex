import React from "react";
import "./sidePanel.scss";
import { motion } from "framer-motion";

export const SidePanel = () => {
  return (
    <div id="sidePanel" className="border">
      {[...Array(30)].map((x, i) => (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="pokemon-icon"
          key={i}
        >
          {i + 1}
        </motion.div>
      ))}
    </div>
  );
};
