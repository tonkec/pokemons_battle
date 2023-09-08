export interface PokemonData {
  id: number;
  name: string;
  types: PokemonType[];
  stats: PokemonStats[];
  abilities: PokemonAbility[];
  weight: number;
  height: number;
  species: species;
}

export interface PokemonType {
  slot: number;
  type: {
    name: TypeName;
    url: string;
  };
}

interface PokemonStats {
  base_stat: number;
  effort: number;
  stat: Stat;
}

interface species {
  name: string;
  url: string;
}

interface PokemonAbility {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
}

type TypeName =
  | 'normal'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dark'
  | 'dragon'
  | 'steel'
  | 'fairy';

interface Ability {
  name: string;
  url: string;
}

interface Stat {
  name: StatName;
  url: string;
}

type StatName =
  | 'hp'
  | 'attack'
  | 'defense'
  | 'special-attack'
  | 'special-defense'
  | 'speed';

export interface PokemonList {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
}

export interface Pokemon {
  name: string;
  url: string;
}
