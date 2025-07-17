import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Header from '../components/Header';

describe('Header component', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('renders input with initial value', () => {
    render(<Header value="Pikachu" onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(
      /search pokémon/i
    ) as HTMLInputElement;
    expect(input.value).toBe('Pikachu');
  });

  it('calls onSearch prop with input value on form submit (userEvent)', async () => {
    render(<Header value="" onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(/search pokémon/i);
    await userEvent.type(input, 'pikachu');

    const form = input.closest('form');
    expect(form).toBeInTheDocument();

    if (form) fireEvent.submit(form);

    expect(mockOnSearch).toHaveBeenCalledWith('pikachu');
  });

  it('calls onSearch when form is submitted after manual input change', () => {
    render(<Header value="" onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(/search pokémon/i);

    fireEvent.change(input, { target: { value: 'Eevee' } });

    const form = input.closest('form');
    expect(form).toBeInTheDocument();

    if (form) fireEvent.submit(form);

    expect(mockOnSearch).toHaveBeenCalledWith('Eevee');
  });

  it('calls preventDefault and onSearch with correct input (handleSubmit logic)', async () => {
    const onSearchMock = vi.fn();
    render(<Header onSearch={onSearchMock} value="" />);

    const input = screen.getByPlaceholderText(/search pokémon/i);
    await userEvent.type(input, 'pikachu');

    const form = input.closest('form');
    const preventDefault = vi.fn();

    if (form) {
      const submitEvent = new Event('submit', {
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(submitEvent, 'preventDefault', {
        value: preventDefault,
        writable: true,
      });
      form.dispatchEvent(submitEvent);
    }

    expect(preventDefault).toHaveBeenCalled();
    expect(onSearchMock).toHaveBeenCalledWith('pikachu');
  });
});
