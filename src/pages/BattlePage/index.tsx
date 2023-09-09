import useTournament from '../../hooks/useTournament';

const BattlePage = () => {
  const { endTournament } = useTournament();
  return (
    <>
      <h1>Battle Page</h1>
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
