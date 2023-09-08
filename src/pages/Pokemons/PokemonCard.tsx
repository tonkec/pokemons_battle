import { useEffect, useState } from 'react';
import { Pokemon } from '../../services/types';

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  const [pokemonImage, setPokemonImage] = useState<string>('');

  useEffect(() => {
    const getPokemonData = async () => {
      const pokemonData = await fetch(pokemon.url);
      const pokemonDataJson = await pokemonData.json();
      setPokemonImage(pokemonDataJson.sprites.front_default);
    };
    getPokemonData();
  }, [pokemon.url]);
  return (
    <div className="pokemon-card">
      <div className="pokemon-card__img">
        <img src={pokemonImage} alt={pokemon.name} />
      </div>
      <div className="pokemon-card__name">{pokemon.name}</div>
      <div className="pokemon-card__types"></div>
    </div>
  );
};

export default PokemonCard;
