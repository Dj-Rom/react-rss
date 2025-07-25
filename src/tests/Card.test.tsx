import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Card from './../components/Card';

vi.mock('../css/main.module.css', () => ({
  default: {
    card: 'card_mock',
  },
}));

describe('Card component', () => {
  const mockClick = vi.fn();

  const defaultProps = {
    name: 'Test Item',
    description: 'This is a test description',
    onItemClick: mockClick,
  };

  beforeEach(() => {
    mockClick.mockClear();
  });

  it('renders the name and description', () => {
    render(<Card {...defaultProps} />);

    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('This is a test description')).toBeInTheDocument();
  });

  it('calls onItemClick with the correct name when clicked', () => {
    render(<Card {...defaultProps} />);

    fireEvent.click(screen.getByText('Test Item'));
    expect(mockClick).toHaveBeenCalledOnce();
    expect(mockClick).toHaveBeenCalledWith('Test Item');
  });

  it('has the correct CSS class', () => {
    render(<Card {...defaultProps} />);
    const card = screen.getByText('Test Item').closest('div');
    expect(card).toHaveClass('card_mock');
  });
});
