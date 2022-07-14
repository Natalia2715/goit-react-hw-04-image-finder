import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscPress);
  }

  onEscPress = element => {
    if (element.code === 'Escape') {
      this.props.closeModal();
    }
  };

  onBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };
  render() {
    const { largeImageURL, tags } = this.props;
    return createPortal(
      <div
        className={styles.overlay}
        onClick={event => {
          this.onBackdropClick(event);
        }}
      >
        <div className={styles.modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  closeModal: PropTypes.func,
};
