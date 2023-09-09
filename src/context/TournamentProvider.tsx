import React, { createContext, useState } from 'react';

type TournamentContextType = {
  startTournament: () => void;
  endTournament: () => void;
  tournamentStarted: boolean;
  tournamentEnded: boolean;
};

export const TournamentContext = createContext({
  startTournament: () => {},
  endTournament: () => {},
  tournamentStarted: false,
  tournamentEnded: true,
} as TournamentContextType);

export const TournamentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tournamentStarted, setTournamentStarted] = useState(false);
  const [tournamentEnded, setTournamentEnded] = useState(true);

  const startTournament = () => {
    setTournamentStarted(true);
    setTournamentEnded(false);
  };

  const endTournament = () => {
    setTournamentStarted(false);
    setTournamentEnded(true);
  };

  return (
    <TournamentContext.Provider
      value={{
        startTournament,
        endTournament,
        tournamentStarted,
        tournamentEnded,
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
};
