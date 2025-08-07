import { render, screen, fireEvent } from '@testing-library/react';
import Main, { type CardListItem } from '../components/Main';
import CardList from '../components/CardList';
import { vi, afterEach, describe, test, expect } from 'vitest';

// Mock CardList with Vitest syntax
vi.mock('../components/CardList', () => ({
  default: vi.fn(() => <div>CardList Mock</div>),
}));

describe('Main component', () => {
  const mockOnItemClick = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders loading state', () => {
    render(
      <Main
        items={[]}
        loading={true}
        error={null}
        onItemClick={mockOnItemClick}
      />
    );
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test('renders error message', () => {
    const errorMsg = 'Failed to fetch';
    render(
      <Main
        items={[]}
        loading={false}
        error={errorMsg}
        onItemClick={mockOnItemClick}
      />
    );
    expect(
      screen.getByText(new RegExp(`error: ${errorMsg}`, 'i'))
    ).toBeInTheDocument();
  });

  test('renders no results message when items is empty', () => {
    render(
      <Main
        items={[]}
        loading={false}
        error={null}
        onItemClick={mockOnItemClick}
      />
    );
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  test('renders CardList with items and handles onItemClick', () => {
    const items: CardListItem[] = [
      { name: 'Item 1', url: 'url1' },
      { name: 'Item 2', url: 'url2' },
    ];

    // Update mock implementation for CardList
    (CardList as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      ({ items, onItemClick }) => (
        <div>
          {items.map((item: CardListItem) => (
            <button key={item.name} onClick={() => onItemClick(item.name)}>
              {item.name}
            </button>
          ))}
        </div>
      )
    );

    render(
      <Main
        items={items}
        loading={false}
        error={null}
        onItemClick={mockOnItemClick}
      />
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Item 1'));
    fireEvent.click(screen.getByText('Item 2'));

    expect(mockOnItemClick).toHaveBeenCalledTimes(2);
    expect(mockOnItemClick).toHaveBeenCalledWith('Item 1');
    expect(mockOnItemClick).toHaveBeenCalledWith('Item 2');
  });
});
