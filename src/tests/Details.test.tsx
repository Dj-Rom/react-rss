import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import { Details } from './../components/Details';

vi.mock('./../redux/slices/apiSlice', () => ({
  useGetPokemonByIdQuery: vi.fn(),
}));

import { useGetPokemonByIdQuery } from './../redux/slices/apiSlice';

describe('Details component', () => {
  const setIsOpenDetailsMock = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('shows Spinner while loading', () => {
    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<Details name="pikachu" setIsOpenDetails={setIsOpenDetailsMock} />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows error message when isError is true', () => {
    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(<Details name="pikachu" setIsOpenDetails={setIsOpenDetailsMock} />);

    expect(screen.getByText(/no details found/i)).toBeInTheDocument();
  });

  it('shows details when data is available', () => {
    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: {
        name: 'pikachu',
        height: 4,
        base_experience: 112,
        abilities: [
          { ability: { name: 'static' } },
          { ability: { name: 'lightning-rod' } },
        ],
      },
      isLoading: false,
      isError: false,
    });

    render(<Details name="pikachu" setIsOpenDetails={setIsOpenDetailsMock} />);

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/height: 4/i)).toBeInTheDocument();
    expect(screen.getByText(/base xp: 112/i)).toBeInTheDocument();
    expect(
      screen.getByText(/abilities: static, lightning-rod/i)
    ).toBeInTheDocument();
  });

  it('calls setIsOpenDetails(false) when X is clicked', () => {
    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: {
        name: 'pikachu',
        height: 4,
        base_experience: 112,
        abilities: [{ ability: { name: 'static' } }],
      },
      isLoading: false,
      isError: false,
    });

    render(<Details name="pikachu" setIsOpenDetails={setIsOpenDetailsMock} />);

    const closeBtn = screen.getByText('X');
    fireEvent.click(closeBtn);

    expect(setIsOpenDetailsMock).toHaveBeenCalledWith(false);
  });
});
