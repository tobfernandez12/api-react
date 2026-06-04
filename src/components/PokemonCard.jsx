function PokemonCard({ pokemon, image }) {

  const reproducirSonido = () => {
    const audio = new Audio("/sonidos/click.mp3");
    audio.play();
  };

  return (
    <div
      className="card"
      onClick={reproducirSonido}
    >
      <img src={image} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
    </div>
  );
}
export default PokemonCard;