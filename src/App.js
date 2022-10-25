import "./app.scss";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import Home from "./layers/home";
import Loading from "./layers/loading";

function App() {
  const [layer, setLayer] = useState();

  let layers = {
    loading: <Loading setLayer={setLayer} />,
    home: <Home />,
  };

  useEffect(() => {
    setLayer("loading");
  }, []);

  return <div className="App">{layers[layer]}</div>;
}

export default App;
