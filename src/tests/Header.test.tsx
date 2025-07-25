/// <reference types="vitest" />
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header'; // adjust path as needed
import { BrowserRouter } from 'react-router-dom';

vi.mock('../components/Search.tsx', () => ({
  default: ({ value, setSearchQuery, onSearch }: any) => (
      <div data-testid="search-component">
        <p>Search: {value}</p>
        <button onClick={() => setSearchQuery('new query')}>Set Query</button>
        <button onClick={() => onSearch('search now')}>Search</button>
      </div>
  ),
}));

describe('Header component', () => {
  it('renders About link and Search component', () => {
    const setSearchQuery = vi.fn();
    const onSearch = vi.fn();

    render(
        <BrowserRouter>
          <Header value="test" setSearchQuery={setSearchQuery} onSearch={onSearch} />
        </BrowserRouter>
    );

    // Check About link
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/about');

    // Check mocked Search component
    expect(screen.getByTestId('search-component')).toBeInTheDocument();
    expect(screen.getByText(/Search: test/i)).toBeInTheDocument();
  });

  it('calls callbacks passed to Search', () => {
    const setSearchQuery = vi.fn();
    const onSearch = vi.fn();

    render(
        <BrowserRouter>
          <Header value="test" setSearchQuery={setSearchQuery} onSearch={onSearch} />
        </BrowserRouter>
    );

    screen.getByText('Set Query').click();
    screen.getByText('Search').click();

    expect(setSearchQuery).toHaveBeenCalledWith('new query');
    expect(onSearch).toHaveBeenCalledWith('search now');
  });
});
