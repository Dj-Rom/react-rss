import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import useFetchItems from '../hooks/useFetchItems';

function TestComponent({ query }: { query: string }) {
  const { items, loading, error } = useFetchItems(query);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <ul>
      {items.map((item) => (
        <li key={item.name}>
          {item.name} - {item.description}
        </li>
      ))}
    </ul>
  );
}

describe('useFetchItems', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('fetches and filters items', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          { name: 'pikachu', url: 'url1' },
          { name: 'bulbasaur', url: 'url2' },
          { name: 'pidgey', url: 'url3' },
        ],
      }),
    });

    render(<TestComponent query="pik" />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    });

    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
  });

  it('shows error message on fetch failure', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
    });
    global.fetch = fetchMock;

    render(<TestComponent query="any" />);

    await waitFor(() => {
      expect(screen.getByText(/Error/i)).toBeInTheDocument();
    });
  });

  it('handles network error', async () => {
    global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network fail'));

    render(<TestComponent query="any" />);

    await waitFor(() => {
      expect(screen.getByText(/Network fail/i)).toBeInTheDocument();
    });
  });
});
