import React from 'react';
import { useDispatch } from 'react-redux';
import { clearError } from './redux/slices/errorSlice.tsx';

type Props = {
  children: React.ReactNode;
};

export function ErrorBoundaryWrapper({ children }: Props) {
  const dispatch = useDispatch();

  class InnerErrorBoundary extends React.Component<
    Props,
    { hasError: boolean }
  > {
    state = { hasError: false };

    static getDerivedStateFromError(): { hasError: boolean } {
      return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      console.error('Caught by ErrorBoundary:', error, errorInfo);
    }

    handleReset = () => {
      dispatch(clearError());
      this.setState({ hasError: false });
    };

    render() {
      if (this.state.hasError) {
        return (
          <div>
            <h1>Something went wrong.</h1>
            <button onClick={this.handleReset}>Try again</button>
          </div>
        );
      }

      return this.props.children;
    }
  }

  return <InnerErrorBoundary>{children}</InnerErrorBoundary>;
}
