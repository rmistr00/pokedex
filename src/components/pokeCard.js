import React from 'react'
import "./pokeCard.scss"
import { motion } from "framer-motion";


export const PokeCard=()=>{

let pokeStats=[...Array(6)].map((x,i)=><div className='poke-stat' key={i}>{i}</div>)
console.log(pokeStats)
    return(
        <div id="pokeCard">
            <div id="poke-name">name</div>
            <div id="poke-img">img</div>
            <div id="poke-stats">
                stats
                {pokeStats}
            </div>
        </div>
    )
}