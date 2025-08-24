import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../../App';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('Root App rendering', () => {
  it('renders App inside Redux Provider without crashing', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(
      screen.getByRole('heading', { name: /Forms in Modal Windows/i })
    ).toBeInTheDocument();
  });
});
