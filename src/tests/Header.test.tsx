import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from '../components/Header';
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (ui: React.ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Header', () => {
  it('renders About link and input with initial value', () => {
    renderWithRouter(<Header initialValue="init" onSearch={vi.fn()} />);
    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /search input/i })).toHaveValue(
      'init'
    );
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('updates input value on user typing', () => {
    renderWithRouter(<Header initialValue="" onSearch={vi.fn()} />);
    const input = screen.getByRole('textbox', { name: /search input/i });
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(input).toHaveValue('hello');
  });

  it('calls onSearch with trimmed input on submit', () => {
    const onSearchMock = vi.fn();
    renderWithRouter(<Header initialValue="" onSearch={onSearchMock} />);
    const input = screen.getByRole('textbox', { name: /search input/i });
    const form = screen.getByRole('form');

    fireEvent.change(input, { target: { value: '  test  ' } });
    fireEvent.submit(form);

    expect(onSearchMock).toHaveBeenCalledTimes(1);
    expect(onSearchMock).toHaveBeenCalledWith('test');
  });

  it('calls onSearch even with empty trimmed input', () => {
    const onSearchMock = vi.fn();
    renderWithRouter(<Header initialValue="" onSearch={onSearchMock} />);
    const input = screen.getByRole('textbox', { name: /search input/i });
    const form = screen.getByRole('form');

    fireEvent.change(input, { target: { value: '     ' } });
    fireEvent.submit(form);

    expect(onSearchMock).toHaveBeenCalledWith('');
  });
});
