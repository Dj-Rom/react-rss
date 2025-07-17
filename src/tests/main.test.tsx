import * as ReactDOMClient from 'react-dom/client';
import { render, screen } from '@testing-library/react';
import Main from '../components/Main';
import { vi } from 'vitest';

describe('Main component', () => {
  const mockItems = [{ name: 'pikachu', description: 'Electric type' }];

  it('renders Spinner when loading is true', () => {
    render(<Main items={[]} loading={true} error={null} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders error message when error is set', () => {
    render(<Main items={[]} loading={false} error="API error" />);
    expect(screen.getByText(/could not find/i)).toBeInTheDocument();
  });

  it('renders CardList when items are present and not loading or error', () => {
    render(<Main items={mockItems} loading={false} error={null} />);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
  it('renders "Could not find" when no items, no loading, and no error', () => {
    render(<Main items={[]} loading={false} error={null} />);
    expect(
      screen.getByText(/could not find the requested pokémon/i)
    ).toBeInTheDocument();
  });
});
vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

vi.mock('react-dom/client', () => {
  return {
    createRoot: vi.fn(() => ({
      render: vi.fn(),
    })),
  };
});

describe('main.tsx initialization', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    container.id = 'root';
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    vi.clearAllMocks();
  });

  it('calls createRoot and render in main.tsx', async () => {
    await import('../main');

    const mockedCreateRoot = ReactDOMClient.createRoot as unknown as ReturnType<
      typeof vi.fn
    >;

    expect(mockedCreateRoot).toHaveBeenCalledWith(container);

    const root = mockedCreateRoot.mock.results[0].value;

    expect(root.render).toHaveBeenCalled();
  });
});
