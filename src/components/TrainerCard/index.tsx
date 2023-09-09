import { Pokemon } from '../../services/types';
type Trainer = {
  name: string;
  rank: number;
  pokemons: Pokemon[];
};

const TrainerCard = ({
  trainer,
  onClick,
}: {
  trainer: Trainer;
  onClick: () => void;
}) => {
  return (
    trainer && (
      <div onClick={onClick}>
        <h2>{trainer.name}</h2>
        <p>Rank: {trainer.rank}</p>
        <p>Number of pokemons: {trainer.pokemons?.length || 0}</p>
      </div>
    )
  );
};

export default TrainerCard;
