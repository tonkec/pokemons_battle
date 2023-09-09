import { useEffect, useState } from 'react';
import PokemonService from '../../services/PokemonService';
import { Pokemon } from '../../services/types';
import PokemonCard from './../../components/PokemonCard';
import usePokemonSelection from '../../hooks/usePokemonSelection';
import UserService from '../../services/UserService';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import useTournament from '../../hooks/useTournament';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

const Pokemons = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tournamentStarted, tournamentEnded } = useTournament();
  const { onPokemonSelection, pokemonSelection } = usePokemonSelection();
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>();
  const [error, setError] = useState<string>();
  const [offset, setOffset] = useState<number>(0);
  const limit = 10;

  const getPokemons = async (limit: number, offset: number) => {
    const pokemons = await PokemonService.getAllPokemonPages(limit, offset);
    setAllPokemons(pokemons);
  };

  const addPokemon = async () => {
    if (pokemonSelection && user) {
      if (pokemonSelection.length > 0) {
        UserService.addPokemonToUser(user, pokemonSelection)
          .then(() => {})
          .catch((error) => {
            setError(error.message);
          });

        navigate('/');
      }
    }
  };

  useEffect(() => {
    getPokemons(limit, offset);
  }, [limit, offset]);

  console.log(tournamentEnded, 'ended');
  console.log(tournamentStarted, 'started');

  return (
    <>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <h1>Select your pokemons</h1>
      {tournamentStarted && !tournamentEnded && (
        <p>You can not change pokemons during tournament</p>
      )}
      {allPokemons && allPokemons.length > 0 && (
        <div
          className="pokemon-list"
          style={{ display: 'flex', flexWrap: 'wrap' }}
        >
          {' '}
          {allPokemons.map((pokemon: Pokemon) => (
            <>
              <PokemonCard pokemon={pokemon} />

              {!tournamentStarted && tournamentEnded && (
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => {
                    onPokemonSelection(pokemon);
                  }}
                />
              )}
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

      <button onClick={addPokemon}>Add pokemon</button>
    </>
  );
};

export default Pokemons;
