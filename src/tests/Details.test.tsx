import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Details } from './../components/Details';

vi.mock('./Spinner.tsx', () => ({
  default: () => <div>Loading...</div>,
}));

interface MockResponse {
  ok: boolean;
  json: () => Promise<unknown>;
}

const mockFetch = (data: unknown, ok = true) => {
  global.fetch = vi.fn(
    (): Promise<MockResponse> =>
      Promise.resolve({
        ok,
        json: () => Promise.resolve(data),
      })
  ) as unknown as typeof fetch;
};

// 🔧 Mock function for required prop
const mockSetIsOpenDetails = vi.fn();

describe('Details component', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('shows loading spinner initially', async () => {
    mockFetch({
      name: 'pikachu',
      height: 4,
      base_experience: 112,
      abilities: [],
    });

    render(<Details name="pikachu" setIsOpenDetails={mockSetIsOpenDetails} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    );
  });

  it('renders fetched Pokémon details', async () => {
    mockFetch({
      name: 'pikachu',
      height: 4,
      base_experience: 112,
      abilities: [
        { ability: { name: 'static', url: 'url1' } },
        { ability: { name: 'lightning-rod', url: 'url2' } },
      ],
    });

    render(<Details name="pikachu" setIsOpenDetails={mockSetIsOpenDetails} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await screen.findByText('pikachu');
    expect(screen.getByText('Height: 4')).toBeInTheDocument();
    expect(screen.getByText('Base XP: 112')).toBeInTheDocument();
    expect(screen.getByText(/Abilities:/)).toHaveTextContent(
      'Abilities: static, lightning-rod'
    );
  });

  it('handles fetch error and displays fallback text', async () => {
    global.fetch = vi.fn(
      (): Promise<MockResponse> =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve(null),
        })
    ) as unknown as typeof fetch;

    render(
      <Details name="missingno" setIsOpenDetails={mockSetIsOpenDetails} />
    );

    await screen.findByText('No details found.');
  });
});
