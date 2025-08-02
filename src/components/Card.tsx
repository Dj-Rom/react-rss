import { useDispatch, useSelector } from 'react-redux';
import { addItem, type Item, removeItem } from './../redux/slices/ItemsSlices';
import type { ChangeEvent } from 'react';
import type { RootState } from '../redux/store';
import styles from './../css/main.module.css';
type Props = {
  name: string;
  description: string;
  url: string;
  onItemClick: (name: string) => void;
};

const Card = ({ name, description, url, onItemClick }: Props) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.itemsReducer.selectedItems
  );

  const cardId = `${name}`;

  const handleCheck = (item: Item) => {
    dispatch(addItem(item));
  };

  const handleUncheck = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleLongClick = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();

    const item: Item = {
      id: cardId,
      name,
      description,
      detailsUrl: url,
    };

    if (event.target.checked) {
      handleCheck(item);
    } else {
      handleUncheck(cardId);
    }
  };

  const isChecked = selectedItems.some((item) => item.id === cardId);

  return (
    <li className={styles.cardLi}>
      <label className={styles.cardLabel}>
        <input
          name={cardId}
          type="checkbox"
          checked={isChecked}
          onChange={handleLongClick}
        />
      </label>
      <div
        id={cardId}
        data-testid="mock-card"
        className={styles.card}
        onClick={() => onItemClick(name)}
      >
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </li>
  );
};

export default Card;
