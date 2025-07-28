import { useState, useEffect } from 'react';

type Item = {
  name: string;
  description: string;
};

type PokemonApiResult = {
  name: string;
  url: string;
};

type PokemonApiResponse = {
  results: PokemonApiResult[];
};

export default function useFetchItems(query: string) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=1000'
        );
        if (!response.ok) throw new Error('Failed to fetch items');
        const data: PokemonApiResponse = await response.json();

        const filtered = data.results.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        );

        const items: Item[] = filtered.map((item) => ({
          name: item.name,
          description: `More info at ${item.url}`,
        }));

        setItems(items);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error');
        }
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, [query]);

  return { items, loading, error };
}
