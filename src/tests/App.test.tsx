import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import App from './../App';

vi.mock('../pages/SearchPage', () => ({
  default: () => <div data-testid="search-page">SearchPage Mock</div>,
}));

vi.mock('../pages/About.tsx', () => ({
  default: () => <div data-testid="about-page">About Mock</div>,
}));

vi.mock('../pages/NotFound', () => ({
  default: () => <div data-testid="notfound-page">NotFound Mock</div>,
}));

vi.mock('../components/Spinner', () => ({
  default: () => <div data-testid="spinner">Loading...</div>,
}));

describe('App routing', () => {
  it('renders SearchPage at "/" route', async () => {
    window.history.pushState({}, 'SearchPage', '/react-rss/');

    render(<App />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('search-page')).toBeInTheDocument();
    });
  });

  it('renders About page at "/about" route', async () => {
    window.history.pushState({}, 'About', '/react-rss/about');

    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('about-page')).toBeInTheDocument();
    });
  });

  it('renders NotFound page at unknown route', async () => {
    window.history.pushState({}, 'NotFound', '/react-rss/unknown');

    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('notfound-page')).toBeInTheDocument();
    });
  });
});
