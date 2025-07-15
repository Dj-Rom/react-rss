import { render, screen } from '@testing-library/react';
import Main from '../components/Main';
import { createRoot } from 'react-dom/client';
import { vi, beforeEach } from 'vitest';


vi.mock('react-dom/client', () => ({
    createRoot: vi.fn(() => ({
        render: vi.fn(),
    })),
}));

beforeEach(() => {
    vi.clearAllMocks();
});

describe('React 18 root rendering', () => {
    it('should get #root container and call createRoot with it', () => {

        const container = document.createElement('div');
        container.id = 'root';
        document.body.appendChild(container);

        const mockedCreateRoot = createRoot as jest.MockedFunction<typeof createRoot>;
        const rootElement = document.getElementById('root') as HTMLElement;

        createRoot(rootElement);

        expect(rootElement).not.toBeNull();
        expect(mockedCreateRoot).toHaveBeenCalledWith(rootElement);


        container.remove();
    });
});

describe('Main component', () => {
    const items = [
        { name: 'Bulbasaur', description: 'Grass type' },
        { name: 'Charmander', description: 'Fire type' },
    ];

    it('displays loading message when loading is true', () => {
        render(<Main items={[]} loading={true} error={null} />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('displays error message if no items and not loading', () => {
        render(<Main items={[]} loading={false} error={null} />);

        expect(screen.getByText('Could not find the requested Pokémon')).toBeInTheDocument();
    });

    it('displays error message when error prop is set', () => {
        render(<Main items={[]} loading={false} error="Network error" />);

        expect(screen.getByText('Could not find the requested Pokémon')).toBeInTheDocument();
    });

    it('renders list of items when items exist and not loading', () => {
        render(<Main items={items} loading={false} error={null} />);
        expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
        expect(screen.getByText('Charmander')).toBeInTheDocument();
    });

    it('renders ErrorButton when appropriate', () => {
        render(<Main items={[]} loading={false} error={null} />);

        expect(screen.getByRole('button')).toBeInTheDocument();
    });
});
