import { render, screen } from '@testing-library/react';
import Spinner from '../components/Spinner';

describe('Spinner component', () => {
    it('renders loading text', () => {
        render(<Spinner />);
        expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });
});
