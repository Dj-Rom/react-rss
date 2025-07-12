// components/Header.tsx
import React, { Component } from 'react';
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

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.onSearch(this.state.input);
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
