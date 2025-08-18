'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useGetAllPokemonQuery } from '@/redux/slices/apiSlice';
import styles from '../../../css/main.module.css'
import Header from "@/components/Header";
const ITEMS_PER_PAGE = 10;
import './globals.css'
import Card from "@/components/Card";
import Flyout from "@/components/Flyout";
type CardListItem = {
  name: string;
  url: string;
};

export default function Page() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const details = searchParams.get('details');
  const initialQuery = searchParams.get('query') ?? '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isOpenDetails, setIsOpenDetails] = useState(false);

  const { data, isLoading, isError, error } = useGetAllPokemonQuery();

  const handleSearch = (newQuery: string) => {
    setSearchQuery(newQuery);
    router.push(`${pathname}?query=${newQuery}&page=1`);
  };


  const handlePageChange = (newPage: number) => {
    router.push(
        `${pathname}?query=${searchParams.get('query') ?? ''}&page=${newPage}${
            details ? `&details=${details}` : ''
        }`
    );
  };

  const handleSelectDetail = (name: string) => {
    setIsOpenDetails(true);
    router.push(
        `${pathname}?query=${searchParams.get('query') ?? ''}&page=${page}&details=${name}`
    );
  };

  useEffect(() => {
    setIsOpenDetails(!!details);
  }, [details]);

  const filteredItems =
      data?.results?.filter((item: { name: string }) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) ?? [];

  const paginatedItems: CardListItem[] =
      filteredItems.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE) ?? [];



  return (
      <>
        <div className={styles.main} data-test-id="search-page">
          <div className={styles.left}>
            {/* Header */}
            <div className="p-4 border-b">

              <Header initialValue={searchQuery} onSearch={handleSearch}/>

            </div>

            {/* Loading/Error */}
            {isLoading && <p className="p-4">Loading...</p>}
            {isError && (
                <p className="p-4 text-red-500">
                  {t('common.error', {error: error?.message || 'Something went wrong.'})}
                </p>
            )}

            {/* Main List */}

            <div
            >
              <ul className={styles.cardList}>
                {paginatedItems.map((item) => (
                    <Card key={item.url} name={item.name} url={item.url}
                          onItemClick={() => handleSelectDetail(item.name)}/>
                ))}
              </ul>
            </div>
            {/* Pagination */}
            <div className="p-4 flex justify-between items-center">
              <button
                  disabled={page <= 1}
                  onClick={() => handlePageChange(page - 1)}
                  className="px-4 py-2 border rounded disabled:opacity-50"
              >
                ← {t('common.page')} {page - 1}
              </button>
              <span>
                      {t('common.page')} {page}
                  </span>
              <button
                  disabled={page * ITEMS_PER_PAGE >= filteredItems.length}
                  onClick={() => handlePageChange(page + 1)}
                  className="px-4 py-2 border rounded disabled:opacity-50"
              >
                {t('common.page')} {page + 1} →
              </button>
            </div>
          </div>

          {/* Details Panel */}
          <div className={styles.right}>
            {details && isOpenDetails && (
                <div className="p-4 border rounded bg-gray-50">
                  <h2 className="text-xl font-bold mb-2">{details}</h2>
                  <button
                      onClick={() => setIsOpenDetails(false)}
                      className="text-sm text-blue-500 underline"
                  >
                    {t('common.close')} X
                  </button>
                  {/* You can expand this with more Pokémon details */}
                  <p className="mt-2">Details about {details} go here.</p>
                </div>
            )}
          </div>
        </div>
        <Flyout/></>
  );
}
