import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary';

const consoleErrorMock = vi
  .spyOn(console, 'error')
  .mockImplementation(() => {});

afterEach(() => {
  consoleErrorMock.mockClear();
});

afterAll(() => {
  consoleErrorMock.mockRestore();
});

const Bomb = () => {
  throw new Error('Boom!');
};

const ErrorTriggerButton = () => {
  const [throwError, setThrowError] = React.useState(false);
  return throwError ? (
    <Bomb />
  ) : (
    <button onClick={() => setThrowError(true)}>Trigger Error</button>
  );
};

describe('ErrorBoundary', () => {
  test('displays fallback UI when a child throws', () => {
    render(
      <ErrorBoundary>
        <ErrorTriggerButton />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText(/trigger error/i));

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(consoleErrorMock).toHaveBeenCalled();
  });

  test('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <p>Normal content</p>
      </ErrorBoundary>
    );

    expect(screen.getByText(/normal content/i)).toBeInTheDocument();
  });

  test('resets error state when "Try again" is clicked', () => {
    render(
      <ErrorBoundary>
        <ErrorTriggerButton />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText(/trigger error/i));
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/try again/i));
    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
    expect(screen.getByText(/trigger error/i)).toBeInTheDocument(); // Child re-rendered
  });
});
