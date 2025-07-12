import React, { Component } from 'react';

type Props = {
  value: string;
  onSearch: (query: string) => void;
};

type State = {
  input: string;
};

class Search extends Component<Props, State> {
  state: State = {
    input: this.props.value,
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.onSearch(this.state.input.trim());
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleChange}
          placeholder="Search Pokémon"
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default Search;
