import React, { Suspense, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const LoadingSpinner: React.FC = () => {
  const [sec, setSec] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSec((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);
  return <div className="spinner">Loading... {sec}s</div>;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<LoadingSpinner />}>
      <App />
    </Suspense>
  </React.StrictMode>
);
