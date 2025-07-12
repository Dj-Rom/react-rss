import { Component } from 'react';
import Card from './Card.tsx';
import styles from '../css/main.module.css';
type Props = {
  items: Array<{ name: string; description: string }>;
};

class CardList extends Component<Props> {
  render() {
    return (
      <div className={styles.cardList}>
        {this.props.items.map((item) => (
          <Card
            key={Math.random()}
            name={item.name}
            description={item.description}
          />
        ))}
      </div>
    );
  }
}

export default CardList;
