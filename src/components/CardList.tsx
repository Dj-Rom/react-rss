import Card from './Card';
import styles from './../css/main.module.css';
type Props = {
  items: Array<{ name: string; description: string }>;
  onItemClick: (name: string) => void;
};

const CardList = ({ items, onItemClick }: Props) => {
  return (
    <div id="cardList" className={styles.cardList} data-testid="card">
      {items.map((item) => (
        <Card
          key={item.name}
          name={item.name}
          description={item.description}
          onItemClick={onItemClick}
        />
      ))}
    </div>
  );
};

export default CardList;
