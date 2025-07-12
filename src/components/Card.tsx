import { Component } from 'react';
import styles from '../css/main.module.css';
type Props = {
  name: string;
  description: string;
};

class Card extends Component<Props> {
  render() {
    return (
      <div className={styles.card}>
        <h3>{this.props.name}</h3>
        <p>{this.props.description}</p>
      </div>
    );
  }
}

export default Card;
