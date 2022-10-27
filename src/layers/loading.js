import { motion } from "framer-motion";

import pokeball from "../pokeball.png";

import "./loading.scss";

function Loading({ setLayer }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} id="loading">
      <div id="about">
        Designed & Developed by <br />
        Ronak Mistry
      </div>
      <motion.img
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        id="pokeball"
        src={pokeball}
      />
      <div id="app-name">
        Pokédex<sub>BETA</sub>
      </div>
      <div id="app-version">v0.12</div>
      <button id="start" onClick={() => setLayer("home")}>
        start
      </button>
    </motion.div>
  );
}

export default Loading;
