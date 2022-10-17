import React from 'react'
import "./sidePanel.scss"

export const SidePanel=()=>{
    return(
        <div id="sidePanel">
            {
                [...Array(100)].map((x,i)=><div className='pokemon-icon'>{i+1}</div>)
            }
        </div>
    )
}