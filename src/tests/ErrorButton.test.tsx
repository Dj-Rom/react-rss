import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ErrorButton from '../components/ErrorButton';

describe('ErrorButton component', () => {
  it('renders the button with correct text', () => {
    render(<ErrorButton />);
    const button = screen.getByRole('button', { name: /trigger error/i });
    expect(button).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<ErrorButton onClick={handleClick} />);
    const button = screen.getByRole('button', { name: /trigger error/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
