import { render, screen } from '@testing-library/react';
import Flyout from '../components/Flyout';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import itemsReducer, { type Item } from '../redux/slices/ItemsSlices';

import { vi } from 'vitest';

const mockItems: Item[] = [
  {
    id: '1',
    name: 'Item1',
    description: 'Desc1',
    detailsUrl: '/items/1.png',
  },
];

const renderWithStore = (selectedItems: Item[]) => {
  const store = configureStore({
    reducer: {
      itemsReducer,
    },
    preloadedState: {
      itemsReducer: {
        selectedItems,
      },
    },
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    ),
  };
};

describe('Flyout component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('does not render when no items are selected', () => {
    renderWithStore([]);
    expect(screen.queryByText(/selected/i)).not.toBeInTheDocument();
  });

  it('renders when items are selected', () => {
    renderWithStore(mockItems);
    expect(screen.getByText('1 item selected')).toBeInTheDocument();
    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });
});
