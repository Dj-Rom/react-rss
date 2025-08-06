import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';
import { clearItems, type ItemSlice } from '../redux/slices/ItemsSlices.ts';

function downloadCSV(items: ItemSlice[]) {
  if (items.length === 0) return;

  const header = Object.keys(items[0]).join(',');
  const rows = items.map((item) =>
    Object.values(item)
      .map((value) => `"${String(value).replace(/"/g, '""')}"`)
      .join(',')
  );

  const csvContent = [header, ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${items.length}_items.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

const Flyout: React.FC = () => {
  const dispatch = useDispatch();
  const selectedItems: ItemSlice[] = useSelector(
    (state: RootState) => state.items.selectedItems
  );

  if (selectedItems.length === 0) return null;

  return (
    <div
      data-testid="flyout"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#222',
        color: '#fff',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <span>
        {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''}{' '}
        selected
      </span>
      <div>
        <button
          style={{ marginRight: '1rem' }}
          onClick={() => dispatch(clearItems())}
        >
          Unselect all
        </button>
        <button onClick={() => downloadCSV(selectedItems)}>Download</button>
      </div>
    </div>
  );
};

export default Flyout;
