import { motion } from "framer-motion";

import qr from "../qr.png";

import "./loading.scss";
import { CornerButton } from "./components/cornerButton";

function Loading({ setLayer }) {
  let version = () => {
    let x = new Date();
    let d = x.getDay();
    let m = x.getMonth();
    let y = x.getFullYear();

    let v = d / 4 + m / 2 + y;
    v -= 2000;
    v /= 10;
    v = v.toFixed(2);

    return v;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} id="loading">
      <div id="about-line" />
      <div id="name-line" />

      <img src={qr} id="poke-qr" />
      <CornerButton setLayer={setLayer} layer={"home"} />

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
