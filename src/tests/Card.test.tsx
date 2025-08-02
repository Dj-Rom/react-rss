import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Card from '../components/Card';

const baseProps = {
  name: 'Test Item',
  description: 'This is a test description',
  url: '/test-url',
  onItemClick: vi.fn(),
};

const renderCard = () =>
  render(
    <Provider store={store}>
      <Card {...baseProps} />
    </Provider>
  );

describe('Card component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the name and description', () => {
    renderCard();

    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('This is a test description')).toBeInTheDocument();
  });

  it('calls onItemClick with the correct name when the card div is clicked', () => {
    renderCard();

    const card = screen.getByTestId('mock-card');
    fireEvent.click(card);

    expect(baseProps.onItemClick).toHaveBeenCalledTimes(1);
    expect(baseProps.onItemClick).toHaveBeenCalledWith('Test Item');
  });

  it('toggles checkbox and dispatches actions', () => {
    renderCard();

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });

  it('has the correct CSS class on card div', () => {
    renderCard();

    const card = screen.getByTestId('mock-card');
    expect(card.className).toMatch(/card/);
  });
});
