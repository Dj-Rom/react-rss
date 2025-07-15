import { render, screen } from '@testing-library/react';
import Card from '../components/Card';

describe('Card component', () => {
    it('renders the name and description', () => {
        render(<Card name="Pikachu" description="An electric Pokémon" />);

        expect(screen.getByText('Pikachu')).toBeInTheDocument();
        expect(screen.getByText('An electric Pokémon')).toBeInTheDocument();
    });
});
