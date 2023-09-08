import { useContext } from 'react';
import { PokemonSelectionContext } from '../context/PokemonSelectionProvider';

const usePokemonSelection = () => {
  return useContext(PokemonSelectionContext);
};

export default usePokemonSelection;
