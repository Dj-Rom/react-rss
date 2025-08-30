import React, { useMemo } from 'react';

interface Props {
  name: string;
  country: any;
  year: number;
  columns: string[];
}

const CountryCard: React.FC<Props> = ({ name, country, year, columns }) => {
  const row = useMemo(
    () => country.data.find((d: any) => d.year === year),
    [country, year]
  );

  if (!row)
    return (
      <div>
        {name}: No data for {year}
      </div>
    );

  return (
    <div className="border p-2 rounded shadow tableDiv">
      <h3 className="font-semibold">{name}</h3>
      <table className="table-auto w-full text-sm mt-1 border-collapse">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col} className="border px-1">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {columns.map((col) => (
              <td key={col} className="border px-1">
                {row[col] ?? 'N/A'}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(CountryCard);
