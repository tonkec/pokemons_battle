import { useEffect, useState } from 'react';
import UserService from '../../services/UserService';
import { useParams } from 'react-router';
import PokemonCard from '../../components/PokemonCard';
import { Pokemon } from '../../services/types';
import {
  Heading,
  Card,
  CardHeader,
  CardBody,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { SunIcon } from '@chakra-ui/icons';
import AuthorizedLayout from '../../layout/AuthorizedLayout';

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
    <AuthorizedLayout>
      <Heading as="h1" size="xl" textAlign="center" marginBottom={50}>
        Trainer Page
      </Heading>

      {user && (
        <Heading as="h2" size="md" textAlign="center" marginBottom={50}>
          {user.name} has {user.pokemons?.length} pokemons
        </Heading>
      )}

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
        {user &&
          user.pokemons &&
          user.pokemons.length > 0 &&
          user.pokemons.map((pokemon: Pokemon) => (
            <PokemonCard pokemon={pokemon} key={pokemon.url} />
          ))}
      </div>

      {user && (
        <Heading as="h2" size="md" textAlign="center" marginTop={50}>
          Rank {user.rank}
        </Heading>
      )}
    </AuthorizedLayout>
  );
};

export default TrainerPage;
