import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import SearchPage from './../components/SearchPage';

const mockSetSearchParams = vi.fn();

vi.mock('react-router-dom', () => ({
  useSearchParams: () => [
    new URLSearchParams('query=test&page=1'),
    mockSetSearchParams,
  ],
}));

vi.mock('./../hooks/useFetchItems', () => ({
  default: () => ({
    items: [
      { name: 'Item 1' },
      { name: 'Item 2' },
      { name: 'Item 3' },
      { name: 'Item 4' },
      { name: 'Item 5' },
      { name: 'Item 6' },
      { name: 'Item 7' },
      { name: 'Item 8' },
      { name: 'Item 9' },
      { name: 'Item 10' },
      { name: 'Item 11' },
    ],
    loading: false,
    error: null,
  }),
}));

type HeaderProps = {
  onSearchInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: () => void;
};

vi.mock('./../components/Header', () => ({
  default: (props: HeaderProps) => (
    <div data-testid="header">
      Mock Header
      <input
        type="text"
        aria-label="search input"
        onChange={props.onSearchInputChange}
        defaultValue=""
      />
      <button onClick={props.onSearch}>Search Pokémon</button>
    </div>
  ),
}));

type Item = { name: string };
type MainProps = {
  items: Item[];
  onItemClick: (name: string) => void;
};

vi.mock('./../components/Main', () => ({
  default: (props: MainProps) => (
    <div data-testid="main">
      {props.items.map((item) => (
        <button key={item.name} onClick={() => props.onItemClick(item.name)}>
          {item.name}
        </button>
      ))}
    </div>
  ),
}));

describe('SearchPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders and displays header and main', () => {
    render(<SearchPage />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('main')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('handles item click', () => {
    render(<SearchPage />);
    fireEvent.click(screen.getByText('Item 1'));
    expect(mockSetSearchParams).toHaveBeenCalled();
  });
});
