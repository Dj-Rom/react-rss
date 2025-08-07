import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import { ErrorBoundaryWrapper } from '../ErrorBoundary';
import { clearError } from '../redux/slices/errorSlice.tsx';

beforeEach(() => {
  vi.clearAllMocks();
});

vi.mock('react-redux', async () => {
  const actual =
    await vi.importActual<typeof import('react-redux')>('react-redux');
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

vi.mock('../redux/slices/errorSlice.tsx', () => ({
  clearError: vi.fn(() => ({ type: 'CLEAR_ERROR' })),
}));

const mockDispatch = vi.fn();
(useDispatch as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
  mockDispatch
);

function ProblemChild(): JSX.Element {
  throw new Error('Boom!');
  return <div />;
}

const mockStore = {
  getState: () => ({}),
  subscribe: () => () => {},
  dispatch: vi.fn(),
};

describe('ErrorBoundaryWrapper', () => {
  it('renders children without error', () => {
    render(
      <Provider store={mockStore}>
        <ErrorBoundaryWrapper>
          <div>Safe child</div>
        </ErrorBoundaryWrapper>
      </Provider>
    );

    expect(screen.getByText('Safe child')).toBeInTheDocument();
  });

  it('catches error and shows fallback UI', () => {
    render(
      <Provider store={mockStore}>
        <ErrorBoundaryWrapper>
          <ProblemChild />
        </ErrorBoundaryWrapper>
      </Provider>
    );

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /try again/i })
    ).toBeInTheDocument();
  });

  it('resets error state and dispatches clearError on button click', () => {
    render(
      <Provider store={{ ...mockStore, dispatch: mockDispatch }}>
        <ErrorBoundaryWrapper>
          <ProblemChild />
        </ErrorBoundaryWrapper>
      </Provider>
    );

    const button = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(button);

    expect(clearError).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(clearError());
  });
});
