import { useState, useEffect } from 'react';
import Spinner from './Spinner.tsx';

type Props = {
  name: string;
};

type Ability = {
  ability: {
    name: string;
    url: string;
  };
};

type PokemonDetails = {
  name: string;
  height: number;
  base_experience: number;
  abilities: Ability[];
};

export function Details({ name }: Props) {
  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!res.ok) throw new Error('Failed to load details');
        const data: PokemonDetails = await res.json();
        setDetails(data);
      } catch {
        setDetails(null);
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [name]);

  if (loading) return <Spinner />;
  if (!details) return <p>No details found.</p>;

  return (
    <div>
      <h3>{details.name}</h3>
      <p>Height: {details.height}</p>
      <p>Base XP: {details.base_experience}</p>
      <p>
        Abilities: {details.abilities.map((a) => a.ability.name).join(', ')}
      </p>
    </div>
  );
}
