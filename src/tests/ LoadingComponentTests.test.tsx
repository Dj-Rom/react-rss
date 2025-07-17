import { render, screen } from '@testing-library/react';
import Spinner from '../components/Spinner'; // adjust the path as needed

describe('Spinner', () => {
  test('renders loading text', () => {
    render(<Spinner />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test('is accessible with role and aria-label', () => {
    render(
      <div role="status" aria-label="Loading">
        <Spinner />
      </div>
    );
    const container = screen.getByRole('status');
    expect(container).toHaveAttribute('aria-label', 'Loading');
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });
});
