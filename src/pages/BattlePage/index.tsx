import { useCallback, useEffect, useState } from 'react';
import useTournament from '../../hooks/useTournament';
import { useAuth } from '../../hooks/useAuth';
import UserService from '../../services/UserService';
import { DocumentData } from '@firebase/firestore-types';
import AuthorizedLayout from '../../layout/AuthorizedLayout';
import { Button, Heading } from '@chakra-ui/react';
import Toast, { toastType } from '../../components/Toast';
import { Pokemon } from '../../services/types';
import PokemonCard from '../../components/PokemonCard';

const BattlePage = () => {
  const [winner, setWinner] = useState<DocumentData | null>(null);
  const [enemy, setEnemy] = useState<DocumentData | null>(null);
  const [hasBattleStarted, setHasBattleStarted] = useState(false);
  const [currentUserFromDb, setcurrentUserFromDb] =
    useState<DocumentData | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<toastType>();
  const [userPokemon, setUserPokemon] = useState<Pokemon>();
  const [enemyPokemon, setEnemyPokemon] = useState<Pokemon>();
  const { endTournament, tournamentEnded, startTournament } = useTournament();
  const { user } = useAuth();

  const fetchCurrentUserFromDb = (userId: string) => {
    UserService.getUserById(userId).then((res) => {
      const user = res;
      if (user.pokemons?.length > 3) {
        setcurrentUserFromDb(user);
        setUserPokemon(user.pokemons[Math.floor(Math.random() * 3)]);
      } else {
        setToastMessage('You need at least 3 pokemons to start a battle!');
        setToastType('error');
      }
    });
  };

  const startBattle = useCallback(
    (enemy: DocumentData) => {
      setHasBattleStarted(true);
      startTournament();
      const winner = Math.random() > 0.5 ? currentUserFromDb : enemy;
      setWinner(winner);
      if (winner) {
        UserService.updateUserRank(winner.userId, winner.rank + 1);
        endTournament();
      }
    },
    [setWinner, currentUserFromDb, endTournament, startTournament]
  );

  const findEnemy = useCallback(() => {
    UserService.getAllUsers().then((res) => {
      const users = res;
      const haveThreePokemons = users?.filter(
        (u) => u.userId !== user && u.pokemons?.length > 3
      );
      const enemy =
        haveThreePokemons &&
        haveThreePokemons[Math.floor(Math.random() * haveThreePokemons.length)];

      if (enemy) {
        setEnemy(enemy);
        const enemyPokemon =
          enemy.pokemons[Math.floor(Math.random() * enemy.pokemons.length)];
        setEnemyPokemon(enemyPokemon);
      }
    });
  }, [user]);

  useEffect(() => {
    findEnemy();
  }, [findEnemy]);

  useEffect(() => {
    if (user) {
      fetchCurrentUserFromDb(user);
    }
  }, [user]);

  return (
    <AuthorizedLayout>
      {toastMessage && <Toast message={toastMessage} type={toastType} />}

      <Heading as="h1" size="lg" marginBottom={10} textAlign="center">
        It is time to battle!
      </Heading>

      {!enemyPokemon && (
        <Heading as="h2" size="sm" marginTop={2}>
          No enemies yet. Please come back later.
        </Heading>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {enemyPokemon && (
          <>
            <div>
              {enemy?.name}
              <PokemonCard pokemon={enemyPokemon} />
            </div>
            <Heading as="h2" size="sm" marginLeft={10} marginRight={10}>
              VS.
            </Heading>
          </>
        )}

        {userPokemon && (
          <div>
            You:
            <PokemonCard pokemon={userPokemon} />
          </div>
        )}
      </div>

      <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}>
        {enemy && (
          <Button
            colorScheme="pink"
            onClick={() => {
              startBattle(enemy);
            }}
            disabled={tournamentEnded}
          >
            Start Battle
          </Button>
        )}
      </div>

      <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}>
        {hasBattleStarted && winner && (
          <Toast message={`The winner is ${winner.name}`} type="success" />
        )}
      </div>
    </AuthorizedLayout>
  );
};

export default BattlePage;
