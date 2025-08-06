type PaginationProps = {
  currentPage: number;
  totalItems: number | undefined;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems ? totalItems : 0 / itemsPerPage);
  if (totalPages <= 1) return null;

  const maxVisiblePages = 5;

  const createPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisiblePages + 4) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = createPageNumbers();

  return (
    <div data-testid="pagination">
      {pages.map((p, i) =>
        typeof p === 'number' ? (
          <button
            key={i}
            disabled={p === currentPage}
            onClick={() => onPageChange(p)}
            style={{ margin: 2 }}
          >
            {p}
          </button>
        ) : (
          <span key={i} style={{ margin: '0 4px' }}>
            {p}
          </span>
        )
      )}
    </div>
  );
}
