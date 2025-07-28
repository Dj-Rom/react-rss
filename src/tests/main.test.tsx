import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Main from './../components/Main';

type Item = {
  name: string;
  description: string;
};

type CardListProps = {
  items: Item[];
  onItemClick: (name: string) => void;
};

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
      { name: 'Item 1', description: 'Desc 1' },
      { name: 'Item 2', description: 'Desc 2' },
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
    expect(screen.getByText('Item 1 - Desc 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2 - Desc 2')).toBeInTheDocument();
  });
});
