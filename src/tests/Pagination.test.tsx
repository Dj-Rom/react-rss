import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Pagination } from './../components/Pagination';

describe('Pagination', () => {
  it('renders nothing if total pages <= 1', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        totalItems={5}
        itemsPerPage={10}
        onPageChange={() => {}}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders all pages when totalPages is small', () => {
    render(
      <Pagination
        currentPage={1}
        totalItems={40}
        itemsPerPage={10}
        onPageChange={() => {}}
      />
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(4);
    expect(buttons[0]).toHaveTextContent('1');
    expect(buttons[3]).toHaveTextContent('4');
  });

  it('renders ellipsis when totalPages is large', () => {
    render(
      <Pagination
        currentPage={5}
        totalItems={100}
        itemsPerPage={5}
        onPageChange={() => {}}
      />
    );

    const ellipses = screen.getAllByText('...');
    expect(ellipses).toHaveLength(2);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('disables current page button', () => {
    render(
      <Pagination
        currentPage={3}
        totalItems={30}
        itemsPerPage={5}
        onPageChange={() => {}}
      />
    );
    const button = screen.getByRole('button', { name: '3' });
    expect(button).toBeDisabled();
  });

  it('calls onPageChange with correct page number on button click', async () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={1}
        totalItems={50}
        itemsPerPage={5}
        onPageChange={onPageChange}
      />
    );

    const pageButton = screen.getByRole('button', { name: '2' });
    await userEvent.click(pageButton);

    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
