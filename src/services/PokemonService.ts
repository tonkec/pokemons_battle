import { Pokemon, PokemonList } from './types';

const PokemonService = {
  async getPokemon(id: number): Promise<any> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return data;
  },

  async getAllPokemons(limit: number): Promise<PokemonList> {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
    );
    const pokemons = await response.json();
    return pokemons;
  },

  async getAllPokemonPages(limit: number, offset: number): Promise<Pokemon[]> {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const pokemons = await response.json();
    return pokemons.results;
  },
};

export default PokemonService;
