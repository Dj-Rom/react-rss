import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { vi } from 'vitest';

import Card from '../components/Card';
import itemsReducer from '../redux/slices/ItemsSlices';
import { apiSlice, useGetPokemonByIdQuery } from '../redux/slices/apiSlice';

vi.mock('../redux/slices/apiSlice', async () => {
  const originalModule = await vi.importActual('../redux/slices/apiSlice');
  return {
    ...originalModule,
    useGetPokemonByIdQuery: vi.fn(),
  };
});

function createTestStore() {
  const store = configureStore({
    reducer: {
      items: itemsReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });

  setupListeners(store.dispatch);
  return store;
}

describe('Card component integration test (no mocks)', () => {
  const store = createTestStore();

  const props = {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
    onItemClick: vi.fn(),
  };

  beforeEach(() => {
    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: { name: 'pikachu', height: 4, weight: 60 },
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });
  });

  it('renders with real store and apiSlice, and responds to checkbox', async () => {
    render(
      <Provider store={store}>
        <ul>
          <Card {...props} />
        </ul>
      </Provider>
    );

    expect(screen.getByText('pikachu')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Height:/)).toBeInTheDocument();
      expect(screen.getByText(/Weight:/)).toBeInTheDocument();
    });

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });

    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(checkbox).not.toBeChecked();
    });

    fireEvent.click(screen.getByTestId('mock-card'));
    expect(props.onItemClick).toHaveBeenCalledWith('pikachu');
  });
});
