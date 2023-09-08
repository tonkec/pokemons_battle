import { useEffect, useState } from 'react';
import PokemonService from '../../services/PokemonService';
import { Pokemon } from '../../services/types';
import { getIdFromUrl } from '../../helpers';
import UserService from '../../services/UserService';
import { useAuth } from '../../hooks/useAuth';
import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';

const PokemonCard = ({
  pokemon,
  hasDeleteButton,
}: {
  pokemon: Pokemon;
  hasDeleteButton: boolean;
}) => {
  const { user } = useAuth();
  const [pokemonImage, setPokemonImage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  useEffect(() => {
    const getPokemonData = async () => {
      const pokemonId = getIdFromUrl(pokemon.url);
      const pokemonData =
        pokemonId && (await PokemonService.getPokemonByUrl(pokemonId));
      setPokemonImage(pokemonData.sprites.front_default);
    };

    getPokemonData();
  }, [pokemon.url]);

  return (
    <>
      {errorMessage && (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      <div className="pokemon-card">
        <div className="pokemon-card__img">
          <img src={pokemonImage} alt={pokemon.name} />
        </div>
        <div className="pokemon-card__name">{pokemon.name}</div>
        {hasDeleteButton && user && (
          <div className="pokemon-card__remove">
            <button
              onClick={async () => {
                try {
                  await UserService.removePokemonFromUser(pokemon.url, user);
                } catch (error: any) {
                  setErrorMessage(error.message);
                }
              }}
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default PokemonCard;
