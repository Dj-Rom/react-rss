import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../../App';
import { Provider } from 'react-redux';
import { store } from '../../store/store.ts'; // adjust path as needed

describe('App component', () => {
  it('renders MainPage content', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(
      screen.getByRole('heading', { name: /Forms in Modal Windows/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Open Uncontrolled Form/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Open Controlled Form/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Form Data/i })
    ).toBeInTheDocument();
  });
});
