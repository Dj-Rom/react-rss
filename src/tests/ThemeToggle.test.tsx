import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ThemeToggle from '../components/ThemeToggle';
import { ThemeProvider } from '../context/ThemeContext';
import { waitFor } from '@testing-library/react';
const renderWithThemeProvider = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('ThemeToggle', () => {
  it('shows ☀️ for light theme by default', () => {
    renderWithThemeProvider(<ThemeToggle />);
    expect(screen.getByText('☀️')).toBeInTheDocument();
  });

  it('toggles to dark theme on click', () => {
    renderWithThemeProvider(<ThemeToggle />);
    const toggle = screen.getByText('☀️');
    fireEvent.click(toggle);
    expect(screen.getByText('🌙')).toBeInTheDocument();
  });
  it('toggles back to light theme on second click', async () => {
    renderWithThemeProvider(<ThemeToggle />);

    const darkIcon = screen.getByText('🌙');
    fireEvent.click(darkIcon);

    const lightIcon = await screen.findByText('☀️');
    fireEvent.click(lightIcon); // switch back to dark

    await waitFor(() => {
      expect(screen.getByText('🌙')).toBeInTheDocument();
    });
  });
});
