import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MainPage from '../MainPage';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../../store/formSlice';

const renderWithStore = () => {
  const store = configureStore({
    reducer: {
      form: formReducer,
    },
  });

  return render(
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
};

describe('MainPage component', () => {
  beforeEach(() => {
    vi.useFakeTimers(); // for highlight timeout
  });

  it('renders heading and buttons', () => {
    renderWithStore();
    expect(
      screen.getByRole('heading', { name: /Forms in Modal Windows/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Open Uncontrolled Form/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Open Controlled Form/i })
    ).toBeInTheDocument();
  });

  it('opens and closes uncontrolled modal', () => {
    renderWithStore();
    fireEvent.click(
      screen.getByRole('button', { name: /Open Uncontrolled Form/i })
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /закрыть/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens and closes controlled modal', () => {
    renderWithStore();
    fireEvent.click(
      screen.getByRole('button', { name: /Open Controlled Form/i })
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
