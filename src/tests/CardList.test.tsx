import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import CardList from '../components/CardList';

vi.mock('../components/Card', () => ({
    default: (props: any) => (
        <div data-testid="card">
            <h2>{props.name}</h2>
            <p>{props.description}</p>
        </div>
    ),
}));

describe('CardList component', () => {
    const items = [
        { name: 'Card 1', description: 'Description 1' },
        { name: 'Card 2', description: 'Description 2' },
    ];

    it('renders correct number of Card components', () => {
        render(<CardList items={items} />);
        const cards = screen.getAllByTestId('card');
        expect(cards.length).toBe(items.length);
    });

    it('renders Card components with correct props', () => {
        render(<CardList items={items} />);
        items.forEach(({ name, description }) => {
            expect(screen.getByText(name)).toBeDefined();
            expect(screen.getByText(description)).toBeDefined();
        });
    });
});
