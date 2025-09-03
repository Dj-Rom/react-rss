import React from 'react';

interface DataTableProps {
  entry: Record<string, any>;
  selectedColumns: string[];
}

const DataTable: React.FC<DataTableProps> = ({ entry, selectedColumns }) => {
  if (selectedColumns.length === 0) return null;

  return (
    <table className="data-table">
      <thead>
        <tr>
          {selectedColumns.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {selectedColumns.map((col) => (
            <td key={col}>{entry[col] ?? 'N/A'}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default React.memo(DataTable);
