import { render, screen, fireEvent } from '@testing-library/react';
import Search from './../components/Search';

test('calls onSearch with trimmed query on submit', () => {
  const onSearch = vi.fn();
  const setSearchQuery = vi.fn();
  let value = '';

  const { rerender } = render(
    <Search value={value} onSearch={onSearch} setSearchQuery={setSearchQuery} />
  );

  const input = screen.getByTestId('search-input');

  fireEvent.change(input, { target: { value: '  Pikachu  ' } });
  expect(setSearchQuery).toHaveBeenCalledWith('  Pikachu  ');

  value = '  Pikachu  ';
  rerender(
    <Search value={value} onSearch={onSearch} setSearchQuery={setSearchQuery} />
  );

  fireEvent.submit(screen.getByRole('form'));
  expect(onSearch).toHaveBeenCalledWith('Pikachu');
});
