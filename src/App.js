import logo from './logo.svg';
import './App.css';

import {Sample} from "./data"
import {SidePanel} from "./components/sidePanel"

function App() {


// let sprites=[...Array(3)].map((x,i)=>`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i+1}.png`).map(x => 
// <img src={x}></img>
// )

// console.log(sprites)

  return (
    <div className="App">
     {
  // sprites
  <SidePanel/>
     }
    </div>
  );
}

export default App;
