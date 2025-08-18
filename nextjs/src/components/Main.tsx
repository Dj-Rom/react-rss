import CardList from './CardList';

export type CardListItem = {
  name: string;
  url: string;
};

type Props = {
  items: CardListItem[];
  loading: boolean;
  error: string | null | undefined;
  onItemClick: (name: string) => void;
};

const Main = ({ items, loading, error, onItemClick }: Props) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!items.length) return <p>No results found.</p>;
  return <CardList items={items} onItemClick={onItemClick} />;
};
export default Main;
