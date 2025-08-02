import CardList from './CardList.tsx';

type Item = {
  name: string;
  description: string;
  url: string;
};

type Props = {
  items: Item[];
  loading: boolean;
  error: string | null;
  onItemClick: (name: string) => void;
};

const Main = ({ items, loading, error, onItemClick }: Props) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!items.length) return <p>No results found.</p>;
  return <CardList items={items} onItemClick={onItemClick} />;
};
export default Main;
