import React from 'react';
import type { SortKey, SortDir } from '../App';

interface Props {
  year: number;
  onYearChange: (y: number) => void;
  region: string;
  onRegionChange: (r: string) => void;
  search: string;
  onSearchChange: (q: string) => void;
  sortBy: SortKey;
  sortDir: SortDir;
  onSortChange: (k: SortKey, d: SortDir) => void;
  onOpenModal: () => void;
}

const Controls: React.FC<Props> = ({
  year,
  onYearChange,
  region,
  onRegionChange,
  search,
  onSearchChange,
  sortBy,
  sortDir,
  onSortChange,
  onOpenModal,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <input
        type="number"
        value={year}
        onChange={(e) => onYearChange(Number(e.target.value))}
        className="border p-1 rounded"
        placeholder="Year"
      />
      <input
        type="text"
        value={region}
        onChange={(e) => onRegionChange(e.target.value)}
        className="border p-1 rounded"
        placeholder="Region"
      />
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="border p-1 rounded"
        placeholder="Search country"
      />
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortKey, sortDir)}
        className="border p-1 rounded"
      >
        <option value="name">Name</option>
        <option value="population">Population</option>
      </select>
      <select
        value={sortDir}
        onChange={(e) => onSortChange(sortBy, e.target.value as SortDir)}
        className="border p-1 rounded"
      >
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
      <button
        onClick={onOpenModal}
        className="bg-blue-600 text-white px-2 py-1 rounded"
      >
        Columns
      </button>
    </div>
  );
};

export default React.memo(Controls);
