import { Pokemon } from '../../services/types';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';

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
      <Card
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
        cursor="pointer"
        marginLeft={2}
        marginTop={2}
        onClick={onClick}
        backgroundColor="white"
      >
        <CardHeader>{trainer.name}</CardHeader>
        <CardBody>
          <p>Rank: {trainer.rank}</p>
          <p>Number of pokemons: {trainer.pokemons?.length || 0}</p>
        </CardBody>
      </Card>
    )
  );
};

export default TrainerCard;
