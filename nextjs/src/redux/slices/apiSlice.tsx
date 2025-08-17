import type { ReactNode } from 'react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface PokemonList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
}

export interface Pokemon {
  abilities: { ability: { name: string } }[];
  base_experience: ReactNode;
  height: ReactNode;
  weight: ReactNode;
  id: number;
  name: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getAllPokemon: builder.query<PokemonList, undefined>({
      query: () => 'pokemon?limit=1000',
    }),
    getPokemonById: builder.query<Pokemon, number | string>({
      query: (id) => `pokemon/${id}`,
    }),
  }),
});

export const { useGetAllPokemonQuery, useGetPokemonByIdQuery } = apiSlice;
