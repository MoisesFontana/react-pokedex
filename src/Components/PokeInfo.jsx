import React from "react"
import CapitalizeWord from "../Functions/CapitalizeWord";

export default function PokeInfo({ data }) {
   return (
      <>
         {
            (!data) ? '' : (
               <div className={"poke-info " + data.types[0].type.name}>
                  <div className="poke-info-top">
                     <div className="card-top">
                        <h1>{CapitalizeWord(data.name)}</h1>
                        <h2>#{data.id}</h2>
                     </div>
                     <div className="poke-info-types">
                        {
                           data.types.map((type) => {
                              return <span className={"type " + type.type.name} key={type.slot}>{type.type.name}</span>
                           })
                        }
                     </div>
                  </div>
                  <div className="poke-info-botton">
                     <img src={data.sprites.other.dream_world.front_default} alt="" />
                     <div className="abilities">
                        {
                           data.abilities.map((poke) => {
                              return (
                                 <div className="group" key={poke.ability.name}>
                                    <h4>{CapitalizeWord(poke.ability.name)}</h4>
                                 </div>
                              )
                           })
                        }
                     </div>
                     <div className="base-stat">
                        {
                           data.stats.map((poke) => {
                              return (
                                 <div key={poke.stat.name}>
                                    <h4>{CapitalizeWord(poke.stat.name)}: {poke.base_stat}</h4>
                                 </div>
                              )
                           })
                        }
                     </div>
                  </div>
               </div>
            )
         }
      </>
   )
}