import styles from '../css/main.module.css';

type Props = {
  name: string;
  description: string;
  onItemClick: (name: string) => void;
};

const Card = ({ name, description, onItemClick }: Props) => {
  return (
    <div className={styles.card} onClick={() => onItemClick(name)}>
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Card;
