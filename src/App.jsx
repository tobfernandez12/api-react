import { useState, useEffect } from "react";
import "./App.css";

import pokewiki from "./assets/pokewiki.png"

// Importo los custom hook y los componentes
import useFetchData from "./hooks/useFetchData";
import PokemonCard from "./components/PokemonCard";
import Pagination from "./components/Pagination";

function App() {
  // Obtengo los kokemones desde la API
  const { data: pokemons, loading } = useFetchData(
    "https://pokeapi.co/api/v2/pokemon?limit=151"
  );
  // Acá declaro los estados

  // Estado para el buscador:
  const [search, setSearch] = useState("");
  // Estado para la página actual:
  const [currentPage, setCurrentPage] = useState(1);
  // Estados para controlar la música:
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Acá digo cuantos kokemones quiero por pagina
  const pokemonsPerPage = 20;

  // Reproducimos o pausamos la música
  const iniciarMusica = () => {
    if (!audio) {
      const nuevoAudio = new Audio("/sonidos/pokemon-theme.mp3");

      nuevoAudio.loop = true;
      nuevoAudio.volume = 0.2;

      nuevoAudio.play();

      setAudio(nuevoAudio);
      setIsPlaying(true);
    } else {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    }
  };

  // Filtra los pokemones segun lo que escribimos en el buscador
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const lastPokemon = currentPage * pokemonsPerPage;
  const firstPokemon = lastPokemon - pokemonsPerPage;

  const currentPokemons = filteredPokemons.slice(
    firstPokemon,
    lastPokemon
  );

  const totalPages = Math.ceil(
    filteredPokemons.length / pokemonsPerPage
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container">
      <img className="titulo" src={pokewiki} alt="" />

      <input
        className="search"
        type="text"
        placeholder="Buscar Pokémon..."
        value={search}
        onChange={handleSearch}
      />
      {/* Botón para reproducir o pausar la música */}
      <button onClick={iniciarMusica}>
        {isPlaying ? "▐▐ Pause" : "► Play"}
      </button>

      {loading ? (
        <h2>Cargando...</h2>
      ) : (
        <>
          <div className="cards">

            {/* Recorro los Pokémon de la página actual */}
            {currentPokemons.map((pokemon) => {
              // Obtengo el ID desde la URL de la API
              const pokemonId = pokemon.url
                .split("/")
                .filter(Boolean)
                .pop();

              return (
                <PokemonCard
                  //componente de pokemones
                  key={pokemon.name}
                  pokemon={pokemon}
                  image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                />
              );
            })}
          </div>
          
          
          <Pagination
            //componente de paginacion
            currentPage={currentPage}
            totalPages={totalPages}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        </>
      )}
    </div>
  );
}

export default App;