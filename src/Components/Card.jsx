import React, { useState } from "react";
import CapitalizeWord from "../Functions/CapitalizeWord";

export default function Card({ pokemon, loading, infoPokemon }) {
   const [modal, setModal] = useState(false);

   function openModal(poke) {
      // console.log(modal, poke);
      setModal(!modal);
      infoPokemon(poke);
   }

   return (
      <>
         {
            loading ? <h1>Loading...</h1> :
               pokemon.map((poke) => {
                  return (
                     // <div className={"card " + poke.types[0].type.name} key={poke.id} onClick={() => infoPokemon(poke)}>
                     <div className={"card " + poke.types[0].type.name} key={poke.id} onClick={() => openModal(poke)}>
                        <span className="card-top">
                           <h2>{CapitalizeWord(poke.name)}</h2>
                           <h2>#{poke.id}</h2>
                        </span>

                        <span className="card-botton">
                           <ol className="types">
                              {
                                 poke.types.map((type) => {
                                    return <li key={type.slot} className={"type " + type.type.name}>{type.type.name}</li>
                                 })
                              }
                           </ol>
                           <img src={poke.sprites.other.dream_world.front_default} alt={poke.name} />
                        </span>
                     </div>
                  )
               })
         }
      </>
   );
}