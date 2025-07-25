import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../components/NotFound';

describe('NotFound page', () => {
  it('renders correctly and handles hover events on the link', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const notFound = screen.getByTestId('not-found');
    expect(notFound).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /go home/i });
    expect(link).toHaveAttribute('href', '/');

    fireEvent.mouseEnter(link);
    expect(link).toHaveStyle({ backgroundColor: '#ff7259', color: '#fff' });

    fireEvent.mouseLeave(link);
    expect(link).toHaveStyle({ backgroundColor: '#fff', color: '#ff4b2b' });
  });
});
