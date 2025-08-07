import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundaryWrapper } from './ErrorBoundary.tsx';

import './index.css';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store';
const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundaryWrapper>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundaryWrapper>
    </Provider>
  </StrictMode>
);
