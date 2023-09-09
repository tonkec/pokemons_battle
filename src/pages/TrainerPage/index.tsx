import { useEffect, useState } from 'react';
import UserService from '../../services/UserService';
import { useParams } from 'react-router';
import { Pokemon } from '../../services/types';

const TrainerPage = () => {
  const [user, setUser] = useState<any>(null);
  const { id } = useParams();
  useEffect(() => {
    id &&
      UserService.getUserById(id)
        .then((user) => {
          setUser(user);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [id]);
  return (
    <div>
      <h1>TrainerPage</h1>
      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Rank: {user.rank}</p>
          <p>
            Pokemons:
            {user.pokemons.map((pokemon: Pokemon) => {
              return <span>{pokemon.name},</span>;
            })}
          </p>
        </div>
      )}
    </div>
  );
};

export default TrainerPage;
