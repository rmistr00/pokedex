import { motion } from "framer-motion";

import pokeball from "../pokeball.png";

import "./loading.scss";

function Loading({ setLayer }) {
  let version = () => {
    let x = new Date();
    let d = x.getDay();
    let m = x.getMonth();
    let y = x.getFullYear();

    let v = d / 100 + m / 10 + y;
    v -= 2000;
    v /= 100;
    v = v.toFixed(2);

    return v;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} id="loading">
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
        Pokédex<sub>ALPHA</sub>
      </div>
      <button id="start" onClick={() => setLayer("home")}>
        start
      </button>
      <div id="bottom-line">
        <div id="about">
          Designed & Developed by <br />
          Ronak Mistry
        </div>
        <div id="app-version">v {version()}</div>
      </div>
    </motion.div>
  );
}

export default Loading;
