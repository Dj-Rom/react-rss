import Spinner from './Spinner';
import { useGetPokemonByIdQuery } from '@/redux/slices/apiSlice';

type Props = {
  name: string;
  setIsOpenDetails: (isOpen: boolean) => void;
};

export function Details({ name, setIsOpenDetails }: Props) {
  const { data, isLoading, isError } = useGetPokemonByIdQuery(name);

  if (isLoading) return <Spinner />;
  if (isError || !data) return <p>No details found.</p>;

  return (
    <div>
      <span
        onClick={() => setIsOpenDetails(false)}
        style={{
          position: 'relative',
          top: '15px',
          left: '49%',
          cursor: 'pointer',
        }}
      >
        X
      </span>
      <br />
      <h3 style={{ textTransform: 'capitalize' }}>{data.name}</h3>
      <p>Height: {data.height}</p>
      <p>Base XP: {data.base_experience}</p>
      <p>
        Abilities:{' '}
        {data.abilities
          .map((a: { ability: { name: string } }) => a.ability.name)
          .join(', ')}
      </p>
    </div>
  );
}
