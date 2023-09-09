import { useEffect, useState } from 'react';
import PokemonService from '../../services/PokemonService';
import { Pokemon } from '../../services/types';
import PokemonCard from './../../components/PokemonCard';
import usePokemonSelection from '../../hooks/usePokemonSelection';
import UserService from '../../services/UserService';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import useTournament from '../../hooks/useTournament';
import { toastType } from '../../components/Toast';
import { Heading, Button } from '@chakra-ui/react';
import Toast from '../../components/Toast';

const Pokemons = () => {
  const navigate = useNavigate();
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
          })
          .catch((error: any) => {
            setToastMessage(error.message);
            setToastType('error');
          });

        // navigate('/');
      }
    }
  };

  useEffect(() => {
    getPokemons(limit, offset);
  }, [limit, offset]);

  return (
    <div style={{ paddingBottom: 40 }}>
      {toastMessage && <Toast type={toastType} message={toastMessage} />}
      <Heading
        as="h1"
        size="xl"
        textAlign="center"
        marginBottom={50}
        marginTop={50}
      >
        Select your pokemons
      </Heading>
      {tournamentStarted && !tournamentEnded && (
        <p>You can not change pokemons during tournament</p>
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
    </div>
  );
};

export default Pokemons;
