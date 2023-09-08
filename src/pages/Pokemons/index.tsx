import { useEffect, useState } from 'react';
import PokemonService from '../../services/PokemonService';
import { Pokemon } from '../../services/types';
import PokemonCard from './PokemonCard';
import usePokemonSelection from '../../hooks/usePokemonSelection';
import UserService from '../../services/UserService';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router';

const Pokemons = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
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

      <button
        onClick={async () => {
          if (pokemonSelection && user) {
            if (pokemonSelection.length > 0) {
              pokemonSelection.forEach(async (pokemon) => {
                try {
                  await UserService.addPokemonToUser(pokemon.url, user);
                  navigate('/dashboard');
                } catch (error) {
                  console.log(error);
                }
              });
            }
          }
        }}
      >
        Confirm
      </button>
    </>
  );
};

export default Pokemons;
