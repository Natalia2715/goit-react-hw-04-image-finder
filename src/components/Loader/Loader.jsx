import styles from './Loader.module.css';
import { MutatingDots } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div className={styles.loader}>
      <MutatingDots ariaLabel="loading-indicator" />
    </div>
  );
}
