import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, ThemeContext } from '../context/ThemeContext';

describe('ThemeContext and ThemeProvider', () => {
  test('provides default theme as light', () => {
    const TestComponent = () => {
      const { theme } = React.useContext(ThemeContext);
      return <div>Theme is {theme}</div>;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText(/Theme is light/i)).toBeInTheDocument();
  });

  test('toggles theme from light to dark and back', () => {
    const TestComponent = () => {
      const { theme, toggleTheme } = React.useContext(ThemeContext);
      return (
        <>
          <div>Theme is {theme}</div>
          <button onClick={toggleTheme}>Toggle</button>
        </>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const themeText = screen.getByText(/Theme is light/i);
    const toggleButton = screen.getByRole('button', { name: /toggle/i });

    expect(themeText).toBeInTheDocument();
    expect(document.body.className).toBe('light');

    fireEvent.click(toggleButton);
    expect(screen.getByText(/Theme is dark/i)).toBeInTheDocument();
    expect(document.body.className).toBe('dark');

    fireEvent.click(toggleButton);
    expect(screen.getByText(/Theme is light/i)).toBeInTheDocument();
    expect(document.body.className).toBe('light');
  });

  test('reads theme from localStorage on mount', () => {
    localStorage.setItem('theme', 'dark');

    const TestComponent = () => {
      const { theme } = React.useContext(ThemeContext);
      return <div>Theme is {theme}</div>;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText(/Theme is dark/i)).toBeInTheDocument();
    expect(document.body.className).toBe('dark');

    localStorage.removeItem('theme');
  });
});
