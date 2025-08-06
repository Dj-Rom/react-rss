import { render, screen, fireEvent } from '@testing-library/react';
import CardList from '../components/CardList';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { vi } from 'vitest';

vi.mock('../components/Flyout', () => ({
  default: () => <div data-testid="flyout" />,
}));

vi.mock('../components/Card', () => ({
  default: ({
    name,
    onItemClick,
  }: {
    name: string;
    onItemClick: (name: string) => void;
  }) => (
    <div data-testid="card-item" onClick={() => onItemClick(name)}>
      {name}
    </div>
  ),
}));

const itemsSlice = createSlice({
  name: 'items',
  initialState: { selectedItems: [] as string[] },
  reducers: {
    setSelectedItems(state, action) {
      state.selectedItems = action.payload;
    },
  },
});

const { setSelectedItems } = itemsSlice.actions;

// Helper function to render with Redux store and set selectedItems
function renderWithSelectedItems(
  selectedItems: string[],
  items: Array<{ name: string; url: string }>,
  onItemClick: (name: string) => void
) {
  const store = configureStore({
    reducer: {
      items: itemsSlice.reducer,
    },
  });

  store.dispatch(setSelectedItems(selectedItems));

  return render(
    <Provider store={store}>
      <CardList items={items} onItemClick={onItemClick} />
    </Provider>
  );
}

describe('CardList component', () => {
  const items = [
    { name: 'pikachu', url: '/pikachu' },
    { name: 'bulbasaur', url: '/bulbasaur' },
  ];

  let onItemClick: (name: string) => void;

  beforeEach(() => {
    onItemClick = vi.fn();
  });

  test('renders all items passed in props', () => {
    renderWithSelectedItems([], items, onItemClick);
    const cardItems = screen.getAllByTestId('card-item');
    expect(cardItems).toHaveLength(items.length);
    expect(cardItems[0]).toHaveTextContent('pikachu');
    expect(cardItems[1]).toHaveTextContent('bulbasaur');
  });

  test('renders Flyout if there are selected items', () => {
    renderWithSelectedItems(['pikachu'], items, onItemClick);
    expect(screen.getByTestId('flyout')).toBeInTheDocument();
  });

  test('does not render Flyout if selectedItems is empty', () => {
    renderWithSelectedItems([], items, onItemClick);
    expect(screen.queryByTestId('flyout')).toBeNull();
  });

  test('calls onItemClick when a card is clicked', () => {
    renderWithSelectedItems([], items, onItemClick);
    const firstCard = screen.getAllByTestId('card-item')[0];
    fireEvent.click(firstCard);
    expect(onItemClick).toHaveBeenCalledWith('pikachu');
  });
});
