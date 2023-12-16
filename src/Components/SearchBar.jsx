import React, { useState, useEffect } from "react";

export default function SearchBar({ setPokeSearch }) {

   const [search, setSearch] = useState("");
   const [notFound, setNotFound] = useState("");

   const fetchPokemon = () => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
         .then((res) => {
            if (!res.ok) {
               // pokeNotFound(`Pokemon '${search}' not found`);
               setNotFound(`Pokemon '${search}' not found`);
            } else {
               setNotFound("");
            }
            return res.json();
         })
         .then((poke) => {
            setPokeSearch([poke]);
         })
   }

   const handleChange = (value) => {
      setSearch(value);
      if (value === "") {
         setPokeSearch([]);
         setNotFound("");
      }
   }

   useEffect(() => {
      let timer = setTimeout(() => {
         if (search !== "") {
            fetchPokemon(search);
         }
      }, 500);

      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [search]);

   // console.log(notFound);
   return (
      <>
         <div className="input-wrapper">
            <input placeholder="Type to Search..." value={search} onChange={(e) => handleChange(e.target.value)} />
         </div>
         {notFound !== "" &&
            <div className="not-found">
               <h1>{notFound}</h1>
            </div>
         }
      </>
   )
}