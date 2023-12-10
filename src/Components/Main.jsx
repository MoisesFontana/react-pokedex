import React, { useEffect, useState } from "react";
import Card from "./Card";
import ModalPokeInfo from "./ModalPokeInfo";
import SearchBar from "./SearchBar";
import Header from "./Header";

export default function Main() {
   const [pokeSearch, setPokeSearch] = useState([]);
   const [pokeData, setPokeData] = useState([]);
   const [modal, setModal] = useState(false);
   const [loading, setLoading] = useState(true);
   const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
   const [nextUrl, setNextUrl] = useState();
   const [prevUrl, setPrevUrl] = useState();
   const [pokedex, setPokedex] = useState();

   const pokeFunction = async () => {
      setLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      setNextUrl(data.next);
      setPrevUrl(data.previous);
      getPokemon(data.results)
      setLoading(false);
   }

   const getPokemon = async (res) => {
      res.map(async (item) => {
         const result = await fetch(item.url);
         const data = await result.json();
         setPokeData((state) => {
            state = [...state, data];
            state.sort((a, b) => a.id - b.id);
            return state
         })
      })
   }

   useEffect(() => {
      if (pokeSearch.length > 0) {
         setPokeData(pokeSearch)
         setNextUrl()
         setPrevUrl()
         setPokedex(pokeSearch[0])

      } else {
         setPokeData([])
         pokeFunction()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [url, pokeSearch])

   return (
      <>
         <Header />
         <div className="container">
            <div className="left-content">
               <SearchBar className="search-bar" setPokeSearch={setPokeSearch} />

               <div className="left-content-grid">
                  <Card key={pokeData.id} pokemon={pokeData} loading={loading} infoPokemon={poke => setPokedex(poke)} isOpen={modal} setModal={setModal} />
                  {/* <Card key={pokeData.id} pokemon={pokeData} loading={loading} infoPokemon={poke => setPokedex(poke)} isOpen={modal => setModal(modal)} /> */}
               </div>
               <div className="btn-next-prev">
                  {
                     prevUrl &&
                     <button onClick={() => {
                        setPokeData([])
                        setUrl(prevUrl)
                     }}>Previous</button>
                  }
                  {
                     nextUrl &&
                     <button onClick={() => {
                        setPokeData([])
                        setUrl(nextUrl)
                     }}>Next</button>
                  }
               </div>
            </div>
            <div className="right-content">
               {/* <PokeInfo data={pokedex} /> */}
               {/* <ModalPokeInfo data={pokedex} setModal={setModal} /> */}
            </div>
            <ModalPokeInfo data={pokedex} isOpen={modal} setModal={setModal} />
         </div>
      </>
   )
}