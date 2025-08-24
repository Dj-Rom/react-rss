import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../Modal';

describe('Modal component', () => {
  let onClose: () => void;

  beforeEach(() => {
    onClose = vi.fn();
    render(
      <Modal title="Test Modal" onClose={onClose}>
        <p>Modal content</p>
      </Modal>
    );
  });

  it('renders title and children', () => {
    expect(
      screen.getByRole('heading', { name: /Test Modal/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Modal content/i)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /закрыть/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when Escape key is pressed', () => {
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when clicking outside modal', () => {
    fireEvent.mouseDown(document.body);
    expect(onClose).toHaveBeenCalled();
  });

  it('focuses the close button on mount', () => {
    const closeButton = screen.getByRole('button', { name: /закрыть/i });
    expect(document.activeElement).toBe(closeButton);
  });
});
