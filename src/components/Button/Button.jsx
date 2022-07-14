import PropTypes from 'prop-types';

import styles from './Button.module.css';

export default function Button({ LoadMore }) {
  return (
    <button className={styles.Button} type="button" onClick={LoadMore}>
      Load more
    </button>
  );
}

Button.propTypes = {
  LoadMore: PropTypes.func.isRequired,
};
