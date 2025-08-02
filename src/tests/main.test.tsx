import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Main from './../components/Main';
import type { CardListProps } from '../components/CardList.tsx';

vi.mock('./../components/CardList.tsx', () => ({
  default: ({ items, onItemClick }: CardListProps) => (
    <div data-testid="card-list">
      {items.map((item) => (
        <div key={item.name} onClick={() => onItemClick(item.name)}>
          {item.name} - {item.description}
        </div>
      ))}
    </div>
  ),
}));

describe('Main component', () => {
  const mockClick = vi.fn();

  it('renders loading state', () => {
    render(
      <Main items={[]} loading={true} error={null} onItemClick={mockClick} />
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(
      <Main
        items={[]}
        loading={false}
        error="Failed to fetch"
        onItemClick={mockClick}
      />
    );
    expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(
      <Main items={[]} loading={false} error={null} onItemClick={mockClick} />
    );
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('renders CardList when items are present', () => {
    const items = [
      { name: 'Item1', description: 'Desc1', url: 'https://example.com/item1' },
      { name: 'Item2', description: 'Desc2', url: 'https://example.com/item2' },
    ];

    render(
      <Main
        items={items}
        loading={false}
        error={null}
        onItemClick={mockClick}
      />
    );
    expect(screen.getByTestId('card-list')).toBeInTheDocument();
    expect(
      screen.getByText((_, element) => element?.textContent === 'Item1 - Desc1')
    ).toBeInTheDocument();

    expect(
      screen.getByText((_, element) => element?.textContent === 'Item2 - Desc2')
    ).toBeInTheDocument();
  });
});
