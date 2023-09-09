import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import UserService from '../../services/UserService';
import { Pokemon } from '../../services/types';
import { DocumentData } from '@firebase/firestore-types';
import PokemonCard from '../../components/PokemonCard';

const UserPokemons = () => {
  const [userPokemons, setUserPokemons] = useState<DocumentData | never[][]>();
  const [errorMessage, setErrorMessage] = useState<string>('');

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
            } catch (error: any) {
              setErrorMessage(error.message);
            }
          }}
          pokemon={pokemon}
          errorMessage={errorMessage}
        />
      ))}
    </div>
  ) : (
    <p>No pokemons</p>
  );
};

export default UserPokemons;
