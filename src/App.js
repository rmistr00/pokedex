import "./app.scss";

import { useEffect, useState } from "react";

import Home from "./layers/home";
import Loading from "./layers/loading";
import Search from "./layers/search";
import Game from "./layers/game/game";

function App() {
  const [layer, setLayer] = useState();

  let layers = {
    loading: <Loading setLayer={setLayer} />,
    home: <Home setLayer={setLayer} />,
    search: <Search setLayer={setLayer} />,
    game: <Game setLayer={setLayer} />,
  };

  useEffect(() => {
    setLayer("loading");
  }, []);

  return (
    <div id="App">
      {layers[layer]}
      <div id="app-info">
        <span>FEATURES</span>
        <ul>
          Pokedex<ul>stats</ul>
          Search<ul>filter by stat and type</ul>
          Game<ul>battle wild pokemon</ul>
        </ul>

        <span>TECH</span>
        {[
          "React JS",
          "Sass",
          "Canvas API",
          "Github",
          "Netlify",
          "PokéAPI v2",
        ].map((x) => (
          <div className="tech" key={x}>
            {x}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
