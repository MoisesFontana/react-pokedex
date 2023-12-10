import pokeball from '../imgs/pokeball.png'

export default function Header() {
   return (
      <header>
         <div className="logo-title">
            <a href="/">
               <img src={pokeball} alt="Pokeball Icon" />
               <h1>Pokedex</h1>
            </a>
         </div>
         <hr></hr>
      </header>
   );
}