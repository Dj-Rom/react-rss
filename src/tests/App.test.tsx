import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

function navigate(path: string) {
  window.history.pushState({}, '', `/react-rss${path}`);
}

describe('App routing with basename', () => {
  it('renders SearchPage on "/" route', async () => {
    navigate('/');
    render(<App />);

    expect(screen.getByRole('status')).toBeInTheDocument(); // Spinner

    await waitFor(() => {
      expect(screen.getByTestId('search-page')).toBeInTheDocument();
    });
  });

  it('renders About page on "/about" route', async () => {
    navigate('/about');
    render(<App />);

    expect(screen.getByRole('status')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('about-page')).toBeInTheDocument();
    });
  });

  it('renders NotFound404 on unknown route', async () => {
    navigate('/non-existent');
    render(<App />);

    expect(screen.getByRole('status')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('not-found')).toBeInTheDocument();
    });
  });
});
