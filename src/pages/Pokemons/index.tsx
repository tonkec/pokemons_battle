import { useEffect, useState } from 'react';
import PokemonService from '../../services/PokemonService';
import { Pokemon } from '../../services/types';
import PokemonCard from './PokemonCard';

const Pokemons = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>();
  const [offset, setOffset] = useState<number>(0);
  const limit = 10;

  const getPokemons = async (limit: number, offset: number) => {
    const pokemons = await PokemonService.getAllPokemonPages(limit, offset);
    setPokemons(pokemons);
  };

  useEffect(() => {
    getPokemons(limit, offset);
  }, [limit, offset]);
  return (
    <>
      <h1>Select your pokemons</h1>
      {pokemons && pokemons.length > 0 && (
        <div
          className="pokemon-list"
          style={{ display: 'flex', flexWrap: 'wrap' }}
        >
          {pokemons.map((pokemon: Pokemon) => (
            <PokemonCard pokemon={pokemon} />
          ))}
        </div>
      )}

      <button
        onClick={() => {
          if (offset > 0) {
            setOffset((prev) => prev - 10);
            getPokemons(limit, offset);
          }
        }}
      >
        Prev
      </button>

      <button
        onClick={() => {
          setOffset((prev) => prev + 10);
          getPokemons(limit, offset);
        }}
      >
        Next
      </button>
    </>
  );
};

export default Pokemons;
