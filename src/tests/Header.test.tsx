import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Header from './../components/Header';

vi.mock('../css/header.module.css', () => ({
  default: {
    header: 'header_mock',
  },
}));

type SearchProps = {
  value: string;
  setSearchQuery: (query: string) => void;
  onSearch: (term: string) => void;
};

vi.mock('./../components/Search.tsx', () => ({
  default: ({ value, setSearchQuery, onSearch }: SearchProps) => (
    <div>
      <p>Search value: {value}</p>
      <button onClick={() => setSearchQuery('mocked')}>Set Query</button>
      <button onClick={() => onSearch('go')}>Search</button>
    </div>
  ),
}));

describe('Header component', () => {
  const mockSetQuery = vi.fn();
  const mockSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Search with correct props and uses CSS class', () => {
    render(
      <Header
        value="Pikachu"
        onSearch={mockSearch}
        setSearchQuery={mockSetQuery}
      />
    );

    expect(screen.getByText('Search value: Pikachu')).toBeInTheDocument();
    expect(document.querySelector('header')).toHaveClass('header_mock');
  });

  it('calls setSearchQuery and onSearch when buttons are clicked', () => {
    render(
      <Header
        value="Charmander"
        onSearch={mockSearch}
        setSearchQuery={mockSetQuery}
      />
    );

    screen.getByText('Set Query').click();
    expect(mockSetQuery).toHaveBeenCalledWith('mocked');

    screen.getByText('Search').click();
    expect(mockSearch).toHaveBeenCalledWith('go');
  });
});
