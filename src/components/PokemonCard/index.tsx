import { useEffect, useState } from 'react';
import PokemonService from '../../services/PokemonService';
import { Pokemon } from '../../services/types';
import { getIdFromUrl } from '../../helpers';
import { useAuth } from '../../hooks/useAuth';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';

const PokemonCard = ({
  pokemon,
  pokemonSelection,
  onDelete,
  onClick,
}: {
  pokemon: Pokemon;
  pokemonSelection?: Pokemon[];
  onDelete?: () => void;
  onClick?: () => void;
}) => {
  const { user } = useAuth();
  const [pokemonImage, setPokemonImage] = useState<string>('');
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    const getPokemonData = async () => {
      const pokemonId = getIdFromUrl(pokemon.url);
      const pokemonData =
        pokemonId && (await PokemonService.getPokemonByUrl(pokemonId));
      setPokemonImage(pokemonData.sprites.front_default);
    };

    getPokemonData();
  }, [pokemon.url]);

  useEffect(() => {
    if (pokemonSelection) {
      const isSelected = pokemonSelection.find(
        (pokemonSelected) => pokemonSelected.name === pokemon.name
      );

      if (isSelected) {
        setIsSelected(true);
      } else {
        setIsSelected(false);
      }
    }
  }, [pokemonSelection, pokemon.name]);

  return (
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
      backgroundColor={isSelected ? 'blue.200' : 'white'}
    >
      <CardHeader>{pokemon.name}</CardHeader>
      <CardBody>
        <img src={pokemonImage} alt={pokemon.name} />
      </CardBody>
      <CardFooter>
        {user && onDelete && (
          <button onClick={onDelete} className="btn btn-danger">
            Delete
          </button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PokemonCard;
