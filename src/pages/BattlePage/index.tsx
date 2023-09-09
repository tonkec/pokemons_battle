import { useCallback, useEffect, useState } from 'react';
import useTournament from '../../hooks/useTournament';
import { useAuth } from '../../hooks/useAuth';
import UserService from '../../services/UserService';
import { DocumentData } from '@firebase/firestore-types';

const BattlePage = () => {
  const [winner, setWinner] = useState<DocumentData | null>(null);
  const { endTournament } = useTournament();
  const { user } = useAuth();

  const startBattle = useCallback(
    (enemy: DocumentData) => {
      const winner = Math.floor(Math.random() * 2) === 0 ? user : enemy;
      setWinner(winner);
    },
    [user, setWinner]
  );

  const findEnemy = useCallback(() => {
    UserService.getAllUsers().then((res) => {
      const users = res;
      const enemies = users?.filter((u) => u.userId !== user);
      const enemy =
        enemies && enemies[Math.floor(Math.random() * enemies.length)];

      if (enemy) {
        startBattle(enemy);
      }
    });
  }, [user, startBattle]);

  useEffect(() => {
    findEnemy();
  }, [findEnemy]);

  return (
    <>
      <h1>Battle Page</h1>

      {winner && (
        <div>
          <h2>Winner: {winner.name}</h2>
        </div>
      )}
      <button
        onClick={() => {
          endTournament();
        }}
      >
        End Tournament
      </button>
    </>
  );
};

export default BattlePage;
