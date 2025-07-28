import { useState, type ChangeEvent, type FormEvent } from 'react';
import styles from '../css/header.module.css';
import { Link } from 'react-router-dom';

type Props = {
  initialValue: string;
  onSearch: (query: string) => void;
};

const Header = ({ initialValue, onSearch }: Props) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    onSearch(trimmed);
  };

  return (
    <header className={styles.header}>
      <Link to={'/about'} className={styles.about_link}>
        About
      </Link>

      <form onSubmit={handleSubmit} role="form">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Search..."
          aria-label="Search input"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default Header;
