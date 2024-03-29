import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import qr from "../qr.png";

import "./loading.scss";
import { CornerButton } from "./components/cornerButton";

import { loadSprite } from "../layers/game/functions";

import data from "../layers/game/data";

let { player, map, search, battle } = data;

function Loading({ setLayer }) {
  useEffect(() => {
    loadSprite(player);
    loadSprite(map);
    loadSprite(search);
    loadSprite(battle);
  });
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
        <div id="app-version">v 1.4</div>
      </div>
    </motion.div>
  );
}

export default Loading;
