// components/Header.tsx
import { Component } from 'react';
import Search from './Search.tsx';
import styles from '../css/header.module.css';

type Props = {
  value: string;
  onSearch: (query: string) => void;
};

type State = {
  input: string;
};

class Header extends Component<Props, State> {
  state: State = {
    input: this.props.value,
  };

  render() {
    return (
      <header className={styles.header}>
        <Search value={this.props.value} onSearch={this.props.onSearch} />
      </header>
    );
  }
}

export default Header;
