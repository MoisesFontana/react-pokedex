import pokeball from '../imgs/pokeball.png'

export default function Header() {
   return (
      <header>
         <div className="logo-title">
            <img src={pokeball} alt="Pokeball Icon" />
            <h1>Pokedex</h1>
         </div>
         <hr></hr>
      </header>
   );
}