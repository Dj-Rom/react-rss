import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header.tsx';
import Main, { type CardListItem } from '../components/Main.tsx';
import { Details } from '../components/Details.tsx';
import { Pagination } from '../components/Pagination.tsx';
import Spinner from '../components/Spinner.tsx';
import { useGetAllPokemonQuery } from '../redux/slices/apiSlice.tsx';

const ITEMS_PER_PAGE = 10;

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const details = searchParams.get('details');
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const initialQuery = searchParams.get('query') ?? '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const { data, isLoading, isError, error } = useGetAllPokemonQuery();

  useEffect(() => {
    if (!searchParams.has('query') || !searchParams.has('page')) {
      setSearchParams({ query: '', page: '1' });
    }
  }, [searchParams, setSearchParams]);
  useEffect(() => {
    const element = document.getElementById('cardList');
    if (!element) return;

    const handler = () => setIsOpenDetails(false);
    element.addEventListener('click', handler);

    return () => {
      element.removeEventListener('click', handler);
    };
  }, []);

  useEffect(() => {
    const maxPage =
      Math.ceil((data?.results.length ?? 0) / ITEMS_PER_PAGE) || 1;

    if (page > maxPage) {
      setSearchParams({ query: searchParams.get('query') ?? '', page: '1' });
    }
  }, [data, page, searchParams, setSearchParams]);

  const handleSearch = (newQuery: string) => {
    console.log(newQuery);
    setSearchQuery(newQuery);
    setSearchParams({ query: newQuery, page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      query: searchParams.get('query') ?? '',
      page: newPage.toString(),
      ...(details ? { details } : {}),
    });
  };

  const handleSelectDetail = (name: string) => {
    if (details) setIsOpenDetails(true);
    setSearchParams({
      query: searchParams.get('query') ?? '',
      page: page.toString(),
      details: name,
    });
  };

  const filteredItems =
    data?.results?.filter((item: { name: string }) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) ?? [];

  const paginatedItems: CardListItem[] =
    filteredItems.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE) ??
    [];

  return (
    <div style={{ display: 'flex' }} data-test-id="search-page">
      <div style={{ flex: 1 }}>
        <Header initialValue={initialQuery} onSearch={handleSearch} />
        {isLoading && <Spinner />}
        {isError && <p>Error: {error?.status || 'Unknown error'}</p>}
        <Main
          items={paginatedItems}
          loading={isLoading}
          error={error?.toString()}
          onItemClick={handleSelectDetail}
        />

        <Pagination
          currentPage={page}
          totalItems={filteredItems.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
        />
      </div>

      <div style={{ flex: 1, padding: '0 20px' }}>
        {details && isOpenDetails && (
          <Details name={details} setIsOpenDetails={setIsOpenDetails} />
        )}
      </div>
    </div>
  );
}

export default SearchPage;
