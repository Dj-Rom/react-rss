import React, {useEffect, useState} from 'react';
import { useSearchParams } from 'react-router-dom';

import useFetchItems from '../hooks/useFetchItems';
import Header from './Header';
import Main from './Main';
import { Details } from './Details.tsx';
import { Pagination } from './Pagination.tsx';
import Spinner from './Spinner.tsx';

const ITEMS_PER_PAGE = 10;

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('query') ?? '';
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const details = searchParams.get('details');
  const [isOpenDetails, setIsOpenDetails]=useState(false);
  const [searchQuery, setSearchQuery] = React.useState(queryParam);
  const { items, loading, error } = useFetchItems(searchQuery);

  document.getElementById("cardList")?.addEventListener("click",()=> setIsOpenDetails(false))
  useEffect(() => {
    if (!searchParams.has('query') || !searchParams.has('page')) {
      setSearchParams({ query: '', page: '1' });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const maxPage = Math.ceil(items.length / ITEMS_PER_PAGE) || 1;
    if (page > maxPage) {
      setSearchParams({ query: searchParams.get('query') ?? '', page: '1' });
    }
  }, [items, page, searchParams, setSearchParams]);

  const handleSearch = (newQuery: string) => {
    setSearchQuery(newQuery);
    setSearchParams({ query: newQuery, page: '1' }); // сбрасываем страницу
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      query: searchParams.get('query') ?? '',
      page: newPage.toString(),
      ...(details ? { details } : {}),
    });
  };

  const handleSelectDetail = (name: string) => {
    if(details)setIsOpenDetails(true);
    setSearchParams({
      query: searchParams.get('query') ?? '',
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
        <Header initialValue={queryParam} onSearch={handleSearch} />

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
        {details && isOpenDetails ? (
          <Details name={details} setIsOpenDetails={setIsOpenDetails} />
        ) : (
         ""
        )}
      </div>
    </div>
  );
}

export default SearchPage;
