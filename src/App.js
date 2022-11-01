import "./app.scss";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import Home from "./layers/home";
import Loading from "./layers/loading";
import Search from "./layers/search";
import Team from "./layers/team";

function App() {
  const [layer, setLayer] = useState();

  let layers = {
    loading: <Loading setLayer={setLayer} />,
    home: <Home setLayer={setLayer} />,
    search: <Search setLayer={setLayer} />,
    team: <Team setLayer={setLayer} />,
  };

  useEffect(() => {
    setLayer("loading");
  }, []);

  return <div className="App">{layers[layer]}</div>;
}

export default App;
