import { describe, it, expect } from 'vitest';
import { apiSlice } from '../redux/slices/apiSlice';

describe('apiSlice', () => {
  it('should be defined', () => {
    expect(apiSlice).toBeDefined();
  });

  it('should have the correct reducerPath', () => {
    expect(apiSlice.reducerPath).toBe('api');
  });

  it('should have getAllPokemon endpoint', () => {
    expect(apiSlice.endpoints.getAllPokemon).toBeDefined();
  });

  it('should have getPokemonById endpoint', () => {
    expect(apiSlice.endpoints.getPokemonById).toBeDefined();
  });
});
