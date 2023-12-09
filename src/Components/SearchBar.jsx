import React, { useState, useEffect } from "react";

export default function SearchBar({ setPokeSearch }) {

   const [search, setSearch] = useState("");

   const fetchPokemon = () => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
         .then((res) => res.json())
         .then((poke) => {
            setPokeSearch([poke]);
         })
   }

   const handleChange = (value) => {
      setSearch(value);
      if (value === "") {
         setPokeSearch([]);
      }
   }

   useEffect(() => {
      let timer = setTimeout(() => {
         if (search !== "") {
            fetchPokemon(search);
         }
      }, 500);

      return () => clearTimeout(timer);
   }, [search]);


   return (
      <div className="input-wrapper">
         <input placeholder="Type to Search..." value={search} onChange={(e) => handleChange(e.target.value)} />
      </div>
   )
}