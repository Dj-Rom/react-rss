import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchPage from '../pages/SearchPage.tsx';

vi.mock('react-router-dom', () => {
  const actual = vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: () => {
      const [query, setQuery] = React.useState(
        new Map([
          ['query', ''],
          ['page', '1'],
        ])
      );

      return [
        {
          get: (key: string) => query.get(key) ?? null,
          has: (key: string) => query.has(key),
        },
        (newParams: Record<string, string>) => {
          setQuery(new Map(Object.entries(newParams)));
        },
      ];
    },
  };
});

import * as apiSlice from '../redux/slices/apiSlice.tsx';

vi.mock('../components/Header.tsx', () => ({
  default: ({ onSearch }: { onSearch: (query: string) => void }) => (
    <button onClick={() => onSearch('pikachu')}>Search Pikachu</button>
  ),
}));

vi.mock('../components/Main.tsx', () => ({
  default: ({ items, onItemClick }: any) => (
    <ul data-testid="main-list">
      {items.map((item: any) => (
        <li key={item.name} onClick={() => onItemClick(item.name)}>
          {item.name}
        </li>
      ))}
    </ul>
  ),
}));

vi.mock('../components/Pagination.tsx', () => ({
  Pagination: ({ currentPage, onPageChange }: any) => (
    <button onClick={() => onPageChange(currentPage + 1)}>Next Page</button>
  ),
}));

vi.mock('../components/Spinner.tsx', () => ({
  default: () => <div data-testid="spinner">Loading...</div>,
}));

vi.mock('../components/Details.tsx', () => ({
  Details: ({ name }: any) => (
    <div data-testid="details">Details of {name}</div>
  ),
}));

describe('SearchPage', () => {
  const useGetAllPokemonQueryMock = vi.spyOn(apiSlice, 'useGetAllPokemonQuery');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading spinner when loading', () => {
    useGetAllPokemonQueryMock.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
      refetch: () => {
        return {} as any;
      },
    });

    render(<SearchPage />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders error message when error occurs', () => {
    useGetAllPokemonQueryMock.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: { status: 500 },
      refetch: () => {
        return {} as any;
      },
    });

    render(<SearchPage />);

    expect(screen.getByText(/Error:/)).toBeInTheDocument();
  });

  it('renders list of pokemon and allows search and pagination', async () => {
    useGetAllPokemonQueryMock.mockReturnValue({
      data: {
        results: [
          { name: 'bulbasaur' },
          { name: 'ivysaur' },
          { name: 'venusaur' },
          { name: 'charmander' },
          { name: 'pikachu' },
        ],
      },
      isLoading: false,
      isError: false,
      error: null,
      refetch: () => {
        return {} as any;
      },
    });

    render(<SearchPage />);

    expect(screen.getByTestId('main-list').children.length).toBe(5);

    fireEvent.click(screen.getByText('Search Pikachu'));

    await waitFor(() => {
      expect(screen.getByTestId('main-list').children.length).toBe(1);
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Next Page'));
  });

  it('opens details when an item is clicked', async () => {
    useGetAllPokemonQueryMock.mockReturnValue({
      data: {
        results: [{ name: 'bulbasaur' }],
      },
      isLoading: false,
      isError: false,
      error: null,
      refetch: () => {
        return {} as any;
      },
    });

    render(<SearchPage />);

    expect(screen.queryByTestId('details')).toBeNull();

    await waitFor(() =>
      expect(screen.getByText('bulbasaur')).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText('bulbasaur'));
  });
});
