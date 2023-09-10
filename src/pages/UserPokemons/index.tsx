import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import UserService from '../../services/UserService';
import { Pokemon } from '../../services/types';
import { DocumentData } from '@firebase/firestore-types';
import PokemonCard from '../../components/PokemonCard';
import Toast, { toastType } from '../../components/Toast';
import { Heading } from '@chakra-ui/react';
import AuthorizedLayout from '../../layout/AuthorizedLayout';

const UserPokemons = () => {
  const [userPokemons, setUserPokemons] = useState<DocumentData | never[][]>();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorType, setErrorType] = useState<toastType>(undefined);

  const { user } = useAuth();

  const fetchAllPokemons = useCallback(async () => {
    if (user) {
      const pokemons = await UserService.getAllUserPokemons(user);
      setUserPokemons(pokemons);
    }
  }, [user]);

  useEffect(() => {
    fetchAllPokemons();
  }, [fetchAllPokemons]);

  return user && userPokemons && userPokemons.length > 0 ? (
    <AuthorizedLayout>
      <Heading as="h1" size="lg" marginBottom={'2rem'} textAlign="center">
        Your Pokemons
      </Heading>
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
        {userPokemons.map((pokemon: Pokemon, index: number) => (
          <PokemonCard
            onDelete={async () => {
              try {
                await UserService.removePokemonFromUser(pokemon.url, user);
                fetchAllPokemons();
                setErrorMessage('Pokemon removed successfully');
                setErrorType('success');
              } catch (error: any) {
                setErrorMessage(error.message);
                setErrorType('error');
              }
            }}
            pokemon={pokemon}
            key={index}
          />
        ))}

        {errorMessage && <Toast message={errorMessage} type={errorType} />}
      </div>
    </AuthorizedLayout>
  ) : (
    <AuthorizedLayout>
      <p>No pokemons</p>
    </AuthorizedLayout>
  );
};

export default UserPokemons;
