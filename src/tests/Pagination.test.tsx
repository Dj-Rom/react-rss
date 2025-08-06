import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Pagination } from '../components/Pagination';

describe('Pagination', () => {
  it('renders all pages if totalPages <= maxVisiblePages + 4', () => {
    render(
      <Pagination
        currentPage={1}
        totalItems={7}
        itemsPerPage={1}
        onPageChange={() => {}}
      />
    );

    for (let i = 1; i <= 7; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }

    expect(screen.queryByText('...')).not.toBeInTheDocument();
  });

  it('renders ellipsis and pages correctly for large page counts', () => {
    render(
      <Pagination
        currentPage={10}
        totalItems={20}
        itemsPerPage={1}
        onPageChange={() => {}}
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();

    // Should have ellipsis spans
    expect(screen.getAllByText('...').length).toBe(2);
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('11')).toBeInTheDocument();
  });

  it('disables the button for the current page', () => {
    render(
      <Pagination
        currentPage={3}
        totalItems={10}
        itemsPerPage={1}
        onPageChange={() => {}}
      />
    );

    const currentPageBtn = screen.getByText('3');
    expect(currentPageBtn).toBeDisabled();

    const otherPageBtn = screen.getByText('2');
    expect(otherPageBtn).not.toBeDisabled();
  });

  it('calls onPageChange with the correct page number when a page button is clicked', () => {
    const onPageChange = vi.fn();

    render(
      <Pagination
        currentPage={1}
        totalItems={5}
        itemsPerPage={1}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByText('3'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
