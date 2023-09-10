import { useEffect, useState } from 'react';
import PokemonService from '../../services/PokemonService';
import { Pokemon } from '../../services/types';
import PokemonCard from './../../components/PokemonCard';
import usePokemonSelection from '../../hooks/usePokemonSelection';
import UserService from '../../services/UserService';
import { useAuth } from '../../hooks/useAuth';
import useTournament from '../../hooks/useTournament';
import { toastType } from '../../components/Toast';
import { Heading, Button } from '@chakra-ui/react';
import Toast from '../../components/Toast';
import AuthorizedLayout from '../../layout/AuthorizedLayout';

const Pokemons = () => {
  const { user } = useAuth();
  const { tournamentStarted, tournamentEnded } = useTournament();
  const { onPokemonSelection, pokemonSelection } = usePokemonSelection();
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>();
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<toastType>(undefined);
  const [offset, setOffset] = useState<number>(0);
  const limit = 5;

  const getPokemons = async (limit: number, offset: number) => {
    const pokemons = await PokemonService.getAllPokemonPages(limit, offset);
    setAllPokemons(pokemons);
  };

  const addPokemon = async () => {
    if (pokemonSelection && user) {
      if (pokemonSelection.length > 0) {
        console.log('pokemonSelection', pokemonSelection);
        UserService.addPokemonToUser(user, pokemonSelection)
          .then(() => {
            setToastMessage('Pokemons added successfully');
            setToastType('success');
            // navigate('/');
          })
          .catch((error: any) => {
            setToastMessage(error.message);
            setToastType('error');
          });
      }
    }
  };

  useEffect(() => {
    getPokemons(limit, offset);
  }, [limit, offset]);

  return (
    <AuthorizedLayout>
      <Heading as="h1" size="xl" textAlign="center" marginBottom={30}>
        Select your pokemons
      </Heading>

      {toastMessage && <Toast type={toastType} message={toastMessage} />}

      {tournamentStarted && !tournamentEnded && (
        <div style={{ marginBottom: 50 }}>
          <Toast
            type="error"
            message="You can not change pokemons during tournament"
          />
        </div>
      )}

      {allPokemons && allPokemons.length > 0 && (
        <div
          className="pokemon-list"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            paddingLeft: 30,
            paddingRight: 30,
            marginTop: 20,
          }}
        >
          {allPokemons.map((pokemon: Pokemon) => (
            <PokemonCard
              onClick={() => {
                if (!tournamentStarted && tournamentEnded) {
                  if (pokemonSelection.length < 6) {
                    onPokemonSelection(pokemon);
                  } else {
                    setToastMessage('You can select only 6 pokemons');
                    setToastType('error');
                    onPokemonSelection(pokemon);
                  }
                }
              }}
              pokemon={pokemon}
              pokemonSelection={pokemonSelection}
              key={pokemon.name}
            />
          ))}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
        <Button
          onClick={() => {
            if (offset > 0) {
              setOffset((prev) => prev - limit);
              getPokemons(limit, offset);
            }
          }}
          colorScheme="blue"
          marginRight={2}
        >
          Prev
        </Button>
        <Button
          onClick={() => {
            setOffset((prev) => prev + limit);
            getPokemons(limit, offset);
          }}
          colorScheme="blue"
          marginRight={2}
        >
          Next
        </Button>
        <Button colorScheme="pink" onClick={addPokemon}>
          Add pokemons
        </Button>
      </div>
    </AuthorizedLayout>
  );
};

export default Pokemons;
