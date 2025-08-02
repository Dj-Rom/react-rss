import { render, screen, fireEvent } from '@testing-library/react';
import CardList from './../components/CardList';
import { Provider } from 'react-redux';
import { describe, it, expect, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import type { FC } from 'react';

type CardListProps = {
  name: string;
  description: string;
  url: string;
  onItemClick: (name: string) => void;
};
vi.mock('./Card', () => ({
  default: (props: CardListProps) => (
    <div data-testid="mock-card" onClick={() => props.onItemClick(props.name)}>
      {props.name}
    </div>
  ),
}));

vi.mock('../components/Flyout.tsx', () => {
  const FlyoutMock: FC = () => <div data-testid="flyout" />;
  return { default: FlyoutMock };
});

const createStore = (selectedItems: string[]) =>
  configureStore({
    reducer: {
      itemsReducer: (state = { selectedItems }) => state,
    },
  });

describe('CardList', () => {
  const items = [
    { name: 'Item1', description: 'Desc1', url: 'url1' },
    { name: 'Item2', description: 'Desc2', url: 'url2' },
  ];

  it('renders items and calls onItemClick when card clicked', () => {
    const store = createStore([]);

    const onItemClick = vi.fn();

    render(
      <Provider store={store}>
        <CardList items={items} onItemClick={onItemClick} />
      </Provider>
    );

    const cards = screen.getAllByTestId('mock-card');
    expect(cards).toHaveLength(items.length);

    fireEvent.click(cards[0]);
    expect(onItemClick).toHaveBeenCalledWith('Item1');
  });

  it('renders Flyout if selectedItems length > 0', () => {
    const store = createStore(['selected']);

    render(
      <Provider store={store}>
        <CardList items={items} onItemClick={() => {}} />
      </Provider>
    );

    expect(screen.getByTestId('flyout')).toBeInTheDocument();
  });

  it('does not render Flyout if selectedItems is empty', () => {
    const store = createStore([]);

    render(
      <Provider store={store}>
        <CardList items={items} onItemClick={() => {}} />
      </Provider>
    );

    expect(screen.queryByTestId('flyout')).not.toBeInTheDocument();
  });
});
