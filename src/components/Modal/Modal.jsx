import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ closeModal, largeImageURL, tags }) {
  useEffect(() => {
    window.addEventListener('keydown', onEscPress);
    return () => {
      window.removeEventListener('keydown', onEscPress);
    };
  });
  // componentDidMount() {
  //   window.addEventListener('keydown', this.onEscPress);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.onEscPress);
  // }

  const onEscPress = element => {
    if (element.code === 'Escape') {
      closeModal();
    }
  };

  const onBackdropClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <div
      className={styles.overlay}
      onClick={event => {
        onBackdropClick(event);
      }}
    >
      <div className={styles.modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
