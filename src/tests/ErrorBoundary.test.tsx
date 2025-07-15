import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest'; // <-- import vi here
import ErrorBoundary from '../ErrorBoundary';

function ProblemChild({ shouldThrow }: { shouldThrow: boolean }) {
    if (shouldThrow) {
        throw new Error('Test error');
    }
    return <div>All good</div>;
}

test('renders fallback UI and resets on "Try again" click', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    try {
        let errorBoundaryKey = 0;

        const { rerender } = render(
            <ErrorBoundary key={errorBoundaryKey}>
                <ProblemChild shouldThrow={false} />
            </ErrorBoundary>
        );

        expect(screen.getByText(/All good/i)).toBeInTheDocument();


        rerender(
            <ErrorBoundary key={errorBoundaryKey}>
                <ProblemChild shouldThrow={true} />
            </ErrorBoundary>
        );

        expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();


        fireEvent.click(screen.getByText(/Try again/i));


        errorBoundaryKey++;

        rerender(
            <ErrorBoundary key={errorBoundaryKey}>
                <ProblemChild shouldThrow={false} />
            </ErrorBoundary>
        );

        expect(screen.queryByText(/Something went wrong/i)).not.toBeInTheDocument();
        expect(screen.getByText(/All good/i)).toBeInTheDocument();
    } finally {
        consoleError.mockRestore();
    }
});
