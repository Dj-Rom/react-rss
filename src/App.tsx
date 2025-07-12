import { Component } from 'react';
import Header from './components/Header.tsx';
import Main from './components/Main.tsx';
import type { Item } from './api.ts';

type State = {
  query: string;
  items: Item[];
  loading: boolean;
  error: string | null;
  hasError: boolean;
};

class App extends Component<object, State> {
  state: State = {
    query: localStorage.getItem('searchQuery') || '',
    items: [],
    loading: false,
    error: null,
    hasError: false,
  };
  fetchItems = async (query: string): Promise<Item[]> => {
    const url = `https://pokeapi.co/api/v2/pokemon/`;
    const response = await fetch(url);

    if (!response.ok) {
      this.setState({ hasError: true });
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const matchingPokemon: Item[] = data.results.filter((pokemon: Item) =>
      pokemon.name.startsWith(query.trim().toLowerCase())
    );
    return await Promise.all(
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      matchingPokemon.map(async (item: any) => {
        const res = await fetch(item.url);
        const details = await res.json();
        return {
          name: item.name,
          // eslint-disable-next-line  @typescript-eslint/no-explicit-any
          description: `Height: ${details.height}, Base XP: ${details.base_experience}, Abilities: ${details.abilities.map((a: any) => a.ability.name).join(', ')}`,
        };
      })
    );
  };

  loadItems = (query: string) => {
    this.setState({ loading: true, error: null });

    this.fetchItems(query)
      .then((items) => {
        this.setState({ items, loading: false });
      })
      .catch((err) => {
        this.setState({ error: err.message, loading: false });
      });
  };

  handleSearch = (query: string) => {
    localStorage.setItem('searchQuery', query);
    this.setState({ query }, () => this.loadItems(query));
  };

  triggerError = () => {
    this.setState({ hasError: true });
    throw new Error('Manual error triggered!');
  };
  render() {
    const { hasError, query, items, loading, error } = this.state;
    if (hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    document.title = 'Class components';
    return (
      <>
        <Header value={query} onSearch={this.handleSearch} />
        <Main
          items={items}
          loading={loading}
          error={error}
          onTriggerError={this.triggerError}
        />
      </>
    );
  }
}

export default App;
