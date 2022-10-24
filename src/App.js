import "./app.scss";

import { useState } from "react";

import { motion } from "framer-motion";
import Home from "./layers/home";

function App() {
  // let sprites=[...Array(3)].map((x,i)=>`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i+1}.png`).map(x =>
  // <img src={x}></img>
  // )

  // console.log(sprites)

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
