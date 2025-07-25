import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import useFetchItems from '../hooks/useFetchItems';
import useLocalStorage from '../hooks/useLocalStorage';
import Header from './Header';
import Main from './Main';
import { Details } from './Details.tsx';
import { Pagination } from './Pagination.tsx';
import Spinner from './Spinner.tsx';

const ITEMS_PER_PAGE = 10;

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') ?? '';
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const details = searchParams.get('details');

  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', query);
  const { items, loading, error } = useFetchItems(searchQuery);

  useEffect(() => {
    if (!searchParams.has('query') || !searchParams.has('page')) {
      setSearchParams({ query: '', page: '1' });
    }
  }, [searchParams, setSearchParams]);

  const handleSearch = (newQuery: string) => {
    setSearchQuery(newQuery);
    setSearchParams({ query: newQuery, page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      query: searchQuery,
      page: newPage.toString(),
      ...(details ? { details } : {}),
    });
  };

  const handleSelectDetail = (name: string) => {
    setSearchParams({
      query: searchQuery,
      page: page.toString(),
      details: name,
    });
  };

  const paginatedItems = items.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div style={{ display: 'flex' }} data-testid="search-page">
      <div style={{ flex: 1 }}>
        <Header
          value={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />

        {loading && <Spinner />}
        {error && <p>Error: {error}</p>}

        <Main
          items={paginatedItems}
          loading={loading}
          error={error}
          onItemClick={handleSelectDetail}
        />

        <Pagination
          currentPage={page}
          totalItems={items.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
        />
      </div>

      <div style={{ flex: 1, padding: '0 20px' }}>
        {details ? (
          <Details name={details} />
        ) : (
          <p>Select an item to see details</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
