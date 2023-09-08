import {
  useState,
  ReactNode,
  useMemo,
  createContext,
  useCallback,
} from 'react';
import { Pokemon } from '../services/types';

export const PokemonSelectionContext = createContext({
  pokemonSelection: [] as Pokemon[],
  onPokemonSelection: (pokemon: Pokemon) => {},
});

export const PokemonSelectionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [pokemonSelection, setPokemonSelection] = useState<Pokemon[]>([]);

  const onPokemonSelection = useCallback((pokemon: Pokemon) => {
    setPokemonSelection((prev) => {
      const pokemonIndex = prev.findIndex(
        (pokemonInSelection) => pokemonInSelection.name === pokemon.name
      );

      if (pokemonIndex > -1) {
        return prev.filter(
          (pokemonInSelection) => pokemonInSelection.name !== pokemon.name
        );
      }

      if (prev.length >= 6) {
        return prev;
      }

      return [...prev, pokemon];
    });
  }, []);

  const value = useMemo(
    () => ({
      pokemonSelection,
      onPokemonSelection,
    }),
    [pokemonSelection, onPokemonSelection]
  );

  return (
    <PokemonSelectionContext.Provider value={value}>
      {children}
    </PokemonSelectionContext.Provider>
  );
};
