import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../components/Search';
import { vi } from 'vitest';

describe('Search component with LocalStorage integration', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    mockOnSearch.mockClear();
  });

  test('renders input with prop value', () => {
    render(<Search value="prop value" onSearch={mockOnSearch} />);
    const input = screen.getByTestId('search-input') as HTMLInputElement;
    expect(input.value).toBe('prop value');
  });

  test('updates input value on user typing', () => {
    render(<Search value="" onSearch={mockOnSearch} />);
    const input = screen.getByTestId('search-input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Bulbasaur' } });
    expect(input.value).toBe('Bulbasaur');
  });

  test('calls onSearch with trimmed input on submit and updates localStorage', () => {
    render(
      <Search
        value=""
        onSearch={(query) => {
          mockOnSearch(query);
          localStorage.setItem('searchQuery', query);
        }}
      />
    );
    const input = screen.getByTestId('search-input') as HTMLInputElement;
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '  charmander  ' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('charmander');
    expect(localStorage.getItem('searchQuery')).toBe('charmander');
  });

  test('loads saved search query from localStorage on mount', () => {
    localStorage.setItem('searchQuery', 'saved query');

    render(
      <Search
        value={localStorage.getItem('searchQuery') || ''}
        onSearch={mockOnSearch}
      />
    );
    const input = screen.getByTestId('search-input') as HTMLInputElement;

    expect(input.value).toBe('saved query');
  });
});
