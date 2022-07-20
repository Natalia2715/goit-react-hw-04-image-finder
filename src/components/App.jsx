import { useState, useEffect } from 'react';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import fetchGallery from '../services/api';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { animateScroll as scroll, scrollSpy } from 'react-scroll';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [totalHits, setTotalHits] = useState('');

  useEffect(() => {
    scrollSpy.update();
    if (!searchQuery) {
      return;
    }
    const options = { searchQuery, currentPage };

    setIsLoading(true);
    setTimeout(() => {
      fetchGallery(options)
        .then(data => {
          const photos = data.hits;

          if (!photos.length) {
            return toast.error(
              'There is no images found with that search request'
            );
          }
          setTotalHits(data.totalHits);
          setPhotos(prevState => [...prevState, ...photos]);
        })
        .catch(error => setError({ error }))
        .finally(() => setIsLoading(false));
    }, 1000);
  }, [searchQuery, currentPage]);

  const handleFormSubmit = searchResult => {
    if (searchResult !== searchQuery) {
      setSearchQuery(searchResult);
      setCurrentPage(1);
      setPhotos([]);
      setError(null);
      setModalData(null);
      setTotalHits('');
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onSchowModal = id => {
    toggleModal();
    const modalPhoto = photos.find(photo => photo.id === id);
    setModalData({
      largeImageURL: modalPhoto.largeImageURL,
      tags: modalPhoto.tags,
    });
  };

  const loadMore = () => {
    setIsLoading(true);
    setCurrentPage(prevState => prevState + 1);
    scroll.scrollMore(150);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {error && toast.error(`Something went wrong! ${error.message}`)}

      {photos.length > 0 && (
        <>
          <ImageGallery openModal={onSchowModal} photos={photos} />
          {photos.length < totalHits && !isLoading && (
            <Button onClick={scroll.scrollMore} LoadMore={loadMore} />
          )}
        </>
      )}

      {isLoading && <Loader />}

      {showModal && (
        <Modal
          largeImageURL={modalData.largeImageURL}
          tags={modalData.tags}
          closeModal={toggleModal}
        />
      )}
      <ToastContainer autoClose={3000} />
    </>
  );
}
