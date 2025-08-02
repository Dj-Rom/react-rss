import Card from './Card';
import styles from './../css/main.module.css';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import Flyout from '../components/Flyout.tsx';

export type CardListProps = {
  items: Array<{ name: string; description: string; url: string }>;
  onItemClick: (name: string) => void;
};

const CardList = ({ items, onItemClick }: CardListProps) => {
  const selectedItems = useSelector(
    (state: RootState) => state.itemsReducer.selectedItems
  );

  return (
    <div id="cardList" className={styles.cardList} data-testid="card">
      {selectedItems.length > 0 && <Flyout />}

      {items.map((item) => (
        <Card
          key={item.name}
          name={item.name}
          description={item.description}
          url={item.url}
          onItemClick={onItemClick}
        />
      ))}
    </div>
  );
};

export default CardList;
