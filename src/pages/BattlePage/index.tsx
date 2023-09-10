import { useCallback, useEffect, useState } from 'react';
import useTournament from '../../hooks/useTournament';
import { useAuth } from '../../hooks/useAuth';
import UserService from '../../services/UserService';
import { DocumentData } from '@firebase/firestore-types';
import AuthorizedLayout from '../../layout/AuthorizedLayout';
import { Button, Heading } from '@chakra-ui/react';
import TrainerCard from '../../components/TrainerCard';
import Toast, { toastType } from '../../components/Toast';
import { useNavigate } from 'react-router';

const BattlePage = () => {
  const navigate = useNavigate();
  const [winner, setWinner] = useState<DocumentData | null>(null);
  const [enemy, setEnemy] = useState<DocumentData | null>(null);
  const [hasBattleStarted, setHasBattleStarted] = useState(false);
  const [currentUserFromDb, setcurrentUserFromDb] =
    useState<DocumentData | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<toastType>();
  const { endTournament, tournamentEnded } = useTournament();
  const { user } = useAuth();

  const fetchCurrentUserFromDb = (userId: string) => {
    UserService.getUserById(userId).then((res) => {
      const user = res;
      if (user.pokemons?.length > 3) {
        setcurrentUserFromDb(user);
      } else {
        setToastMessage('You need at least 3 pokemons to start a battle!');
        setToastType('error');
      }
    });
  };

  const startBattle = useCallback(
    (enemy: DocumentData) => {
      setHasBattleStarted(true);

      const winner = Math.random() > 0.5 ? currentUserFromDb : enemy;
      setWinner(winner);
      endTournament();
      setTimeout(() => {
        navigate('/');
      }, 3000);
    },
    [setWinner, currentUserFromDb, endTournament, navigate]
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

      {!enemy && (
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
        {enemy && (
          <>
            <TrainerCard trainer={enemy} />
            <Heading as="h2" size="sm" marginLeft={10} marginRight={10}>
              VS.
            </Heading>
          </>
        )}

        {currentUserFromDb && <TrainerCard trainer={currentUserFromDb} />}
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
