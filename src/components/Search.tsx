import React, { useRef } from 'react';

type Props = {
  value: string;
  onSearch: (query: string) => void;
  setSearchQuery: (query: string) => void;
};

const Search = ({ value, onSearch, setSearchQuery }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (inputRef.current) {
      onSearch(inputRef.current.value.trim());
    }
  }

  return (
    <form onSubmit={handleSubmit} role="form">
      <input
        ref={inputRef}
        name="search"
        data-testid="search-input"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search Pokémon"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
