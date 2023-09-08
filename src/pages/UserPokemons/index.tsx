import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import UserService from '../../services/UserService';
import { Pokemon } from '../../services/types';
import { DocumentData } from '@firebase/firestore-types';
import PokemonCard from '../../components/PokemonCard';

const UserPokemons = () => {
  const [userPokemons, setUserPokemons] = useState<DocumentData | never[][]>();
  const { user } = useAuth();

  useEffect(() => {
    user &&
      UserService.getAllUserPokemons(user)
        .then((pokemons) => {
          setUserPokemons(pokemons);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [user]);

  return userPokemons && userPokemons.length > 0 ? (
    <div>
      {userPokemons.map((pokemon: Pokemon) => (
        <PokemonCard hasDeleteButton pokemon={pokemon} />
      ))}
    </div>
  ) : (
    <p>No pokemons</p>
  );
};

export default UserPokemons;
