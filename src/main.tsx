import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './ErrorBoundary.tsx';

import './index.css';
import App from './App.tsx';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);

