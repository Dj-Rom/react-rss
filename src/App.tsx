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

type PokemonItem = {
  name: string;
  url: string;
};

type Ability = {
  ability: {
    name: string;
  };
};

type PokemonDetails = {
  height: number;
  base_experience: number;
  abilities: Ability[];
};

class App extends Component<object, State> {
  state: State = {
    query: localStorage.getItem('searchQuery') || '',
    items: [],
    loading: true,
    error: null,
    hasError: false,
  };

  fetchItems = async (query: string): Promise<Item[]> => {
    const url = `https://pokeapi.co/api/v2/pokemon/`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = (await response.json()) as { results: PokemonItem[] };

    const matchingPokemon: PokemonItem[] = data.results.filter((pokemon) =>
      pokemon.name.startsWith(query.trim().toLowerCase())
    );

    return await Promise.all(
      matchingPokemon.map(async (item) => {
        const res = await fetch(item.url);
        const details = (await res.json()) as PokemonDetails; // cast JSON response

        return {
          name: item.name,
          description: `Height: ${details.height}, Base XP: ${details.base_experience}, Abilities: ${details.abilities
            .map((a) => a.ability.name)
            .join(', ')}`,
        };
      })
    );
  };

  loadItems = async (query: string) => {
    this.setState({ loading: true, error: null, hasError: false });
    try {
      const items = await this.fetchItems(query);
      this.setState({ items, loading: false, hasError: false });
    } catch (err) {
      this.setState({
        error: (err as Error).message,
        loading: false,
        hasError: true,
      });
    }
  };

  handleSearch = (query: string) => {
    localStorage.setItem('searchQuery', query);
    this.setState({ query }, () => this.loadItems(query));
  };

  triggerError = () => {
    this.setState({ hasError: true });
  };
  componentDidMount() {
    this.loadItems(this.state.query);
  }

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
