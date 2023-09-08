import { useEffect, useState } from 'react';
import PokemonService from '../../services/PokemonService';
import { Pokemon } from '../../services/types';
import PokemonCard from './PokemonCard';
import usePokemonSelection from '../../hooks/usePokemonSelection';

const Pokemons = () => {
  const { onPokemonSelection, pokemonSelection } = usePokemonSelection();

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

  useEffect(() => {}, [pokemonSelection]);
  return (
    <>
      <h1>Select your pokemons</h1>
      {pokemons && pokemons.length > 0 && (
        <div
          className="pokemon-list"
          style={{ display: 'flex', flexWrap: 'wrap' }}
        >
          {pokemons.map((pokemon: Pokemon) => (
            <>
              <PokemonCard pokemon={pokemon} />
              <input
                type="checkbox"
                name=""
                id=""
                onChange={() => {
                  onPokemonSelection(pokemon);
                }}
              />
            </>
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
