import { render, screen, fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { ThemeProvider, useTheme } from './../context/ThemeContext.tsx';

describe('useTheme hook', () => {
  it('throws error if used outside ThemeProvider', () => {
    expect(() => {
      renderHook(() => useTheme());
    }).toThrow('useTheme must be used within a ThemeProvider');
  });
});

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </>
  );
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.className = '';
  });

  it('provides default theme "light" and sets body class and localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme').textContent).toBe('light');
    expect(document.body.className).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('toggles theme from light to dark and updates DOM and localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Toggle Theme'));

    expect(screen.getByTestId('theme').textContent).toBe('dark');
    expect(document.body.className).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('initializes theme from localStorage correctly', () => {
    localStorage.setItem('theme', 'dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme').textContent).toBe('dark');
    expect(document.body.className).toBe('dark');
  });
});
