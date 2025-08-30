import { useState, useMemo, useCallback } from 'react';
import { co2DataResource, type Co2Dataset } from './dataResource';
import Controls from './components/Controls';
import CountryCard from './components/CountryCard';
import ColumnModal from './components/ColumnModal';

export type SortKey = 'name' | 'population';
export type SortDir = 'asc' | 'desc';

export default function App() {
  const data: Co2Dataset = co2DataResource.read();

  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [region, setRegion] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    'year',
    'population',
    'co2',
    'co2_per_capita',
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleYearChange = useCallback((y: number) => setYear(y), []);
  const handleRegionChange = useCallback((r: string) => setRegion(r), []);
  const handleSearchChange = useCallback((q: string) => setSearch(q), []);
  const handleSortChange = useCallback((k: SortKey, d: SortDir) => {
    setSortKey(k);
    setSortDir(d);
  }, []);
  const handleColumnsChange = useCallback((cols: string[]) => {
    setSelectedColumns(cols);
  }, []);

  const countryList = useMemo(() => {
    let entries = Object.entries(data);

    if (region !== 'all') {
      entries = entries.filter(([, val]) =>
        (val.region ?? '').toLowerCase().includes(region.toLowerCase())
      );
    }

    if (search.trim()) {
      entries = entries.filter(([name]) =>
        name.toLowerCase().includes(search.toLowerCase())
      );
    }

    entries.sort(([aName, aData], [bName, bData]) => {
      if (sortKey === 'name') {
        return sortDir === 'asc'
          ? aName.localeCompare(bName)
          : bName.localeCompare(aName);
      } else {
        const aPop = aData.data.find((d) => d.year === year)?.population ?? 0;
        const bPop = bData.data.find((d) => d.year === year)?.population ?? 0;
        return sortDir === 'asc' ? aPop - bPop : bPop - aPop;
      }
    });

    return entries;
  }, [data, region, search, sortKey, sortDir, year]);

  const availableColumns = useMemo(() => {
    const keys = new Set<string>();
    for (const [, val] of Object.entries(data)) {
      for (const row of val.data) Object.keys(row).forEach((k) => keys.add(k));
    }
    [
      'year',
      'population',
      'co2',
      'co2_per_capita',
      'iso_code',
      'region',
    ].forEach((k) => keys.delete(k));
    return Array.from(keys).sort();
  }, [data]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🌍 CO₂ Emissions Explorer</h1>

      <Controls
        year={year}
        onYearChange={handleYearChange}
        region={region}
        onRegionChange={handleRegionChange}
        search={search}
        onSearchChange={handleSearchChange}
        sortBy={sortKey}
        sortDir={sortDir}
        onSortChange={handleSortChange}
        onOpenModal={() => setIsModalOpen(true)}
      />

      <div className="grid gap-4">
        {countryList.map(([name, country]) => (
          <CountryCard
            key={name}
            name={name}
            country={country}
            year={year}
            columns={selectedColumns}
          />
        ))}
      </div>

      <ColumnModal
        isOpen={isModalOpen}
        availableColumns={availableColumns}
        selectedColumns={selectedColumns}
        onChange={handleColumnsChange}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
