import { useDispatch, useSelector } from 'react-redux';
import {
  addItem,
  type ItemSlice,
  removeItem,
} from '@/redux/slices/ItemsSlices';
import type { ChangeEvent } from 'react';
import type { RootState } from '@/redux/store';
import styles from '../../css/main.module.css';
import { useGetPokemonByIdQuery } from '@/redux/slices/apiSlice';
import Spinner from './Spinner';
import { setError } from '@/redux/slices/errorSlice';

export type CartProps = {
  name: string;
  url: string;
  onItemClick: (name: string) => void;
};

const Card = ({ name, url, onItemClick }: CartProps) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.items.selectedItems
  );

  const id = Number(url.split('/').filter(Boolean).pop());
  const { data, isLoading, isError, error } = useGetPokemonByIdQuery(id);
  if (isError) {
    dispatch(
      setError({
        isError: true,
        message:
          typeof error === 'object' && error !== null && 'message' in error
            ? String(error.message)
            : 'An unknown error occurred',
      })
    );
  }
  const cardId = `${name}`;
  const handleCheck = (item: ItemSlice) => {
    dispatch(addItem(item));
  };

  const handleUncheck = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleLongClick = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();

    const item: ItemSlice = {
      id: cardId,
      name,
      detailsUrl: url,
    };
    if (event.target.checked) {
      handleCheck(item);
    } else {
      handleUncheck(cardId);
    }
  };

  const isChecked = selectedItems.some(
    (item: { id: string }) => item.id === cardId
  );
  if (isLoading) return <Spinner />;
  if (isError) return <span>{error.toString()}</span>;

  return (
    <li className={styles.cardLi}>
      <label className={styles.cardLabel}>
        <input
          name={cardId}
          type="checkbox"
          className={styles.cardLabelInput}
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
        <h3 className={styles.h3}>{name}</h3>
        <p className={styles.p}>Height: {data?.height ?? 'no information'},</p>
        <p className={styles.p}>Weight: {data?.weight ?? 'no information'}</p>
      </div>
    </li>
  );
};

export default Card;
