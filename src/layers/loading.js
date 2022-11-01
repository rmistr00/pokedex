import { motion } from "framer-motion";

import qr from "../qr.png";

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
      <div id="bottom-left-line" />
      <div id="bottom-right-line" />
      <div id="top-left-line" />

      <img src={qr} id="poke-qr" />

      <div id="circle" className="border" onClick={() => setLayer("home")}>
        <motion.div
          animate={{
            scale: 2.5,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>

      <div id="app-name">
        Pokédex<sub>ALPHA</sub>
      </div>

      <div id="about-app">
        <div id="about">
          Designed & developed by <br />
          Ronak Mistry
        </div>
        <div id="app-version">v {version()}</div>
      </div>
    </motion.div>
  );
}

export default Loading;
