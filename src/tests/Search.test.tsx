import { render, screen, fireEvent } from '@testing-library/react';
import Search from './../components/Search';
import { vi } from 'vitest';

describe('Search component', () => {
    const mockOnSearch = vi.fn();

    beforeEach(() => {
        localStorage.clear();
        mockOnSearch.mockClear();
    });

    it('renders input and button', () => {
        render(<Search value="" onSearch={mockOnSearch} />);
        expect(screen.getByPlaceholderText(/search pokémon/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    });

    it('renders saved search term from props', () => {
        render(<Search value="Pikachu" onSearch={mockOnSearch} />);
        expect(screen.getByDisplayValue('Pikachu')).toBeInTheDocument();
    });

    it('updates input value when user types', () => {
        render(<Search value="" onSearch={mockOnSearch} />);
        const input = screen.getByPlaceholderText(/search pokémon/i) as HTMLInputElement;

        fireEvent.change(input, { target: { value: 'Bulbasaur' } });
        expect(input.value).toBe('Bulbasaur');
    });

    it('calls onSearch with trimmed input on submit', () => {
        render(<Search value="" onSearch={mockOnSearch} />);
        const input = screen.getByPlaceholderText(/search pokémon/i);
        const button = screen.getByRole('button', { name: /search/i });

        fireEvent.change(input, { target: { value: '  charmander  ' } });
        fireEvent.click(button);

        expect(mockOnSearch).toHaveBeenCalledWith('charmander');
        expect(mockOnSearch).toHaveBeenCalledTimes(1);
    });
});
