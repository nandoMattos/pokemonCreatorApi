export type PokemonEntity = {
  id: number;
  name: string;
  weight: number;
};

export type PokemonBody = {
  id?: number;
  name: string;
  weight: number;
  type: string[];
};
