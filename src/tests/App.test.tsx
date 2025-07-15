import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import ErrorBoundary from '../ErrorBoundary';
import { vi, afterEach, beforeEach } from 'vitest';

beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
    vi.restoreAllMocks();
    delete (global as any).fetch;
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
            results: [{ name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7' }],
        };
        const mockSquirtleDetails = {
            height: 5,
            base_experience: 63,
            abilities: [{ ability: { name: 'torrent' } }, { ability: { name: 'rain-dish' } }],
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

        (global as any).fetch = fetchMock;

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
            results: [{ name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25' }],
        };

        (global as any).fetch = vi.fn().mockResolvedValueOnce({
            ok: true,
            json: async () => mockPokemonList,
        });

        const appInstance = new App({});
        const result = await appInstance.fetchItems('xyz');

        expect(result).toEqual([]);
    });

    it('sets error state and throws if fetch response is not ok', async () => {
        (global as any).fetch = vi.fn().mockResolvedValue({
            ok: false,
            status: 500,
        });

        const appInstance = new App({});
        const setStateSpy = vi.spyOn(appInstance, 'setState');

        await expect(appInstance.fetchItems('any')).rejects.toThrow('API error: 500');
        expect(setStateSpy).toHaveBeenCalledWith({ hasError: true });
    });



    it('handleSearch saves query to localStorage, updates state, and calls loadItems', () => {
        const appInstance = new App({});
        const localStorageSetSpy = vi.spyOn(window.localStorage.__proto__, 'setItem');

        appInstance.setState = vi.fn((_state, cb) => {
            if (cb) cb();
        });
        appInstance.loadItems = vi.fn();

        const query = 'pikachu';
        appInstance.handleSearch(query);

        expect(localStorageSetSpy).toHaveBeenCalledWith('searchQuery', query);
        expect(appInstance.setState).toHaveBeenCalledWith({ query }, expect.any(Function));
        expect(appInstance.loadItems).toHaveBeenCalledWith(query);

        localStorageSetSpy.mockRestore();
    });

    it('loadItems updates state correctly on success', async () => {
        const mockItems = [{ name: 'bulbasaur', description: 'desc' }];
        const fetchItemsMock = vi.fn().mockResolvedValue(mockItems);

        const appInstance = new App({});
        appInstance.fetchItems = fetchItemsMock;
        appInstance.setState = vi.fn();

        await appInstance.loadItems('bulb');

        expect(appInstance.setState).toHaveBeenCalledWith({ loading: true, error: null });
        expect(fetchItemsMock).toHaveBeenCalledWith('bulb');
    });
});
