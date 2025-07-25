import { useState, type ChangeEvent, type FormEvent } from 'react';
import styles from '../css/search.module.css';

type Props = {
  value: string;
  onSearch: (query: string) => void;
  setSearchQuery: (query: string) => void;
};

const Search = ({ value, setSearchQuery, onSearch }: Props) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    setSearchQuery(trimmed);
    onSearch(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search..."
        aria-label="Search input"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
