import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import ErrorBoundary from '../ErrorBoundary';
import { vi, afterEach, beforeEach } from 'vitest';

type MockableGlobal = typeof globalThis & { fetch?: ReturnType<typeof vi.fn> };

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
  (globalThis as MockableGlobal).fetch = vi.fn();
});

describe('App Component', () => {
  it('renders default UI with search input', () => {
    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('shows error UI after triggering error', () => {
    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText(/trigger error/i));
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('resets error UI after clicking "Try Again"', () => {
    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText(/trigger error/i));
    fireEvent.click(screen.getByText(/try again/i));

    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('fetchItems returns filtered and detailed items', async () => {
    const mockPokemonList = {
      results: [
        { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7' },
      ],
    };
    const mockSquirtleDetails = {
      height: 5,
      base_experience: 63,
      abilities: [
        { ability: { name: 'torrent' } },
        { ability: { name: 'rain-dish' } },
      ],
    };

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemonList,
      })
      .mockResolvedValueOnce({
        json: async () => mockSquirtleDetails,
      });

    (globalThis as MockableGlobal).fetch = fetchMock;

    const appInstance = new App({});
    const result = await appInstance.fetchItems('S');

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(result).toEqual([
      {
        name: 'squirtle',
        description: 'Height: 5, Base XP: 63, Abilities: torrent, rain-dish',
      },
    ]);
  });

  it('fetchItems returns empty array if no matches', async () => {
    const mockPokemonList = {
      results: [
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25' },
      ],
    };

    (globalThis as MockableGlobal).fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockPokemonList,
    });

    const appInstance = new App({});
    const result = await appInstance.fetchItems('xyz');

    expect(result).toEqual([]);
  });

  it('handleSearch saves query to localStorage, updates state, and calls loadItems', () => {
    const appInstance = new App({});
    const localStorageSetSpy = vi.spyOn(
      window.localStorage.__proto__,
      'setItem'
    );

    appInstance.setState = vi.fn((_state, cb) => {
      if (cb) cb();
    });
    appInstance.loadItems = vi.fn();

    const query = 'pikachu';
    appInstance.handleSearch(query);

    expect(localStorageSetSpy).toHaveBeenCalledWith('searchQuery', query);
    expect(appInstance.setState).toHaveBeenCalledWith(
      { query },
      expect.any(Function)
    );
    expect(appInstance.loadItems).toHaveBeenCalledWith(query);

    localStorageSetSpy.mockRestore();
  });
});
