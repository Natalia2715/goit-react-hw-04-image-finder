import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ photos, openModal }) {
  return (
    <ul className={styles.gallery}>
      {photos.map(photo => (
        <ImageGalleryItem
          key={photo.id}
          onClick={() => {
            openModal(photo.id);
          }}
          webformatURL={photo.webformatURL}
          tags={photo.tags}
          id={photo.id}
        ></ImageGalleryItem>
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  photos: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};
