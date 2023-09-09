import { useContext } from 'react';
import { TournamentContext } from '../context/TournamentProvider';

const useTournament = () => {
  return useContext(TournamentContext);
};

export default useTournament;
