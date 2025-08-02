import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';

vi.mock('../components/ThemeToggle.tsx', () => {
  return {
    default: () => <button aria-label="toggle theme">Toggle Theme</button>,
  };
});

describe('Header component', () => {
  const renderHeader = (initialValue = '', onSearch = vi.fn()) => {
    return render(
      <BrowserRouter>
        <Header initialValue={initialValue} onSearch={onSearch} />
      </BrowserRouter>
    );
  };

  it('renders About link and input with initial value', () => {
    renderHeader('init');

    const aboutLink = screen.getByText(/about/i);
    const input = screen.getByRole('textbox', { name: /search input/i });
    const button = screen.getByRole('button', { name: /search/i });

    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink.closest('a')).toHaveAttribute('href', '/about');
    expect(input).toHaveValue('init');
    expect(button).toBeInTheDocument();
  });

  it('updates input value when user types', () => {
    renderHeader('');
    const input = screen.getByRole('textbox', { name: /search input/i });

    fireEvent.change(input, { target: { value: 'React' } });
    expect(input).toHaveValue('React');
  });

  it('submits trimmed input via onSearch', () => {
    const onSearchMock = vi.fn();
    renderHeader('  ', onSearchMock);

    const input = screen.getByRole('textbox', { name: /search input/i });
    const form = screen.getByRole('form');

    fireEvent.change(input, { target: { value: '  vite test  ' } });
    fireEvent.submit(form);

    expect(onSearchMock).toHaveBeenCalledWith('vite test');
    expect(onSearchMock).toHaveBeenCalledTimes(1);
  });

  it('calls onSearch with empty string if input is whitespace only', () => {
    const onSearchMock = vi.fn();
    renderHeader('', onSearchMock);

    const input = screen.getByRole('textbox', { name: /search input/i });
    const form = screen.getByRole('form');

    fireEvent.change(input, { target: { value: '     ' } });
    fireEvent.submit(form);

    expect(onSearchMock).toHaveBeenCalledWith('');
    expect(onSearchMock).toHaveBeenCalledTimes(1);
  });

  it('renders mocked ThemeToggle component', () => {
    renderHeader('');
    const toggle = screen.getByRole('button', { name: /toggle theme/i });
    expect(toggle).toBeInTheDocument();
  });
});
