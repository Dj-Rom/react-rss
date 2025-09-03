import React from 'react';

interface Props {
  isOpen: boolean;
  availableColumns: string[];
  selectedColumns: string[];
  onChange: (cols: string[]) => void;
  onClose: () => void;
}

const ColumnModal: React.FC<Props> = ({
  isOpen,
  availableColumns,
  selectedColumns,
  onChange,
  onClose,
}) => {
  if (!isOpen) return null;

  const toggle = (col: string) =>
    onChange(
      selectedColumns.includes(col)
        ? selectedColumns.filter((c) => c !== col)
        : [...selectedColumns, col]
    );

  return (
    <div className="colums">
      <div className="bg-white p-4 rounded w-80 max-h-[80vh] overflow-y-auto">
        <h2 className="font-bold mb-2">Select Columns</h2>
        <ul className="space-y-1">
          {availableColumns.map((col) => (
            <li key={col}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedColumns.includes(col)}
                  onChange={() => toggle(col)}
                  className="mr-1"
                />
                {col}
              </label>
            </li>
          ))}
        </ul>
        <div className="flex justify-end mt-3 gap-2">
          <button onClick={onClose} className="px-2 py-1 border rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ColumnModal);
