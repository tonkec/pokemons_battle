import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import UserService from '../../services/UserService';
import { Pokemon } from '../../services/types';
import { DocumentData } from '@firebase/firestore-types';
import PokemonCard from '../../components/PokemonCard';
import Toast, { toastType } from '../../components/Toast';

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
    <div>
      {userPokemons.map((pokemon: Pokemon) => (
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
        />
      ))}

      {errorMessage && <Toast message={errorMessage} type={errorType} />}
    </div>
  ) : (
    <p>No pokemons</p>
  );
};

export default UserPokemons;
