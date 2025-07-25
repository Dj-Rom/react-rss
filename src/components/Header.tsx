import Search from './Search.tsx';
import styles from '../css/header.module.css';
import { Link } from 'react-router-dom';

type Props = {
  value: string;
  onSearch: (query: string) => void;
  setSearchQuery: (query: string) => void;
};

const Header = (props: Props) => {
  return (
    <header className={styles.header}>
      <Link to={'/about'} className={styles.about_link}>
        About
      </Link>
      <Search
        value={props.value}
        setSearchQuery={props.setSearchQuery}
        onSearch={props.onSearch}
      />
    </header>
  );
};

export default Header;
