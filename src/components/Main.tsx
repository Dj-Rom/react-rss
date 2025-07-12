import { Component } from 'react';
import CardList from './CardList.tsx';
import styles from '../css/main.module.css';
import ErrorButton from './ErrorButton.tsx';

type Props = {
  items: Array<{ name: string; description: string }>;
  loading: boolean;
  error: string | null;
  onTriggerError?: () => void;
};

class Main extends Component<Props> {
  render() {
    const { items, loading, error, onTriggerError } = this.props;
    return (
      <main className={styles.main}>
        {loading && <h2>Loading...</h2>}
        {!loading && !error && items.length > 0 ? (
          <CardList items={items} />
        ) : !loading ? (
          <h2>Could not find the requested Pokémon</h2>
        ) : null}
        <ErrorButton onClick={onTriggerError} />
      </main>
    );
  }
}

export default Main;
