import logo from './logo.svg';
import './app.scss';

import {Sample} from "./data"
import {SidePanel} from "./components/sidePanel"
import {PokeCard} from "./components/pokeCard"

function App() {


// let sprites=[...Array(3)].map((x,i)=>`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i+1}.png`).map(x => 
// <img src={x}></img>
// )

// console.log(sprites)

  return (
    <div className="App">

  <PokeCard/>
  <SidePanel/>
     
         </div>
  );
}

export default App;
