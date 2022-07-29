import { useEffect, useReducer } from 'react';
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

function countReducer(state, action) {
  switch (action.type) {
    case 'error':
      return { ...state, error: action.payload };

    case 'fetched':
      return { ...state, photos: action.payload, totalHits: action.totalHits };
    case 'loading':
      return { ...state, isLoading: action.payload };
    case 'submit':
      return {
        ...state,
        searchQuery: action.query,
        currentPage: 1,
        photos: [],
        error: null,
        modalData: null,
        totalHits: '',
      };
    case 'showModal':
      return { ...state, showModal: action.show };
    case 'data':
      return { ...state, modalData: action.data };
    case 'loadMore':
      return { ...state, currentPage: state.currentPage + 1, isLoading: true };
    default:
      return;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(countReducer, {
    searchQuery: '',
    currentPage: 1,
    photos: [],
    error: null,
    modalData: null,
    isLoading: false,
    showModal: false,
    totalHits: '',
  });
  // const [searchQuery, setSearchQuery] = useState('');
  // const [currentPage, setCurrentPage] = useState(1);
  // // const [photos, setPhotos] = useState([]);
  // const [error, setError] = useState(null);
  // const [modalData, setModalData] = useState(null);
  // // const [isLoading, setIsLoading] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  // const [totalHits, setTotalHits] = useState('');

  useEffect(() => {
    scrollSpy.update();
    if (!state.searchQuery) {
      return;
    }
    const { searchQuery, currentPage } = state;
    const options = { searchQuery, currentPage };
    dispatch({ type: 'loading', payload: true });
    // setIsLoading(true);
    setTimeout(() => {
      fetchGallery(options)
        .then(data => {
          const photos = data.hits;

          if (!photos.length) {
            return toast.error(
              'There is no images found with that search request'
            );
          }
          dispatch({
            type: 'fetched',
            payload: [...state.photos, ...photos],
            totalHits: data.totalHits,
          });
          // setTotalHits(data.totalHits);
          // setPhotos(prevState => [...prevState, ...photos]);
        })
        .catch(
          error => dispatch({ type: 'error', payload: error })
          // setError({ error })
        )
        .finally(
          () => dispatch({ type: 'loading', payload: false })
          // setIsLoading(false)
        );
    }, 1000);
  }, [state.searchQuery, state.currentPage]);

  const handleFormSubmit = searchResult => {
    if (state.searchResult !== state.searchQuery) {
      dispatch({ type: 'submit', query: searchResult });
      // setSearchQuery(searchResult);
      // setCurrentPage(1);
      // dispatch({ type: 'fetched', payload: [] });
      // // setPhotos([]);
      // setError(null);
      // setModalData(null);
      // setTotalHits('');
    }
  };

  const toggleModal = () => {
    dispatch({ type: 'show', show: !state.showModal });
    // setShowModal(!showModal);
  };

  const onSchowModal = id => {
    toggleModal();
    const modalPhoto = state.photos.find(photo => photo.id === id);
    dispatch({
      type: 'data',
      data: { largeImageURL: modalPhoto.largeImageURL, tags: modalPhoto.tags },
    });
  };

  const loadMore = () => {
    dispatch({ type: 'loadMore' });
    // setIsLoading(true);
    // setCurrentPage(prevState => prevState + 1);
    scroll.scrollMore(150);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {state.error &&
        toast.error(`Something went wrong! ${state.error.message}`)}

      {state.photos.length > 0 && (
        <>
          <ImageGallery openModal={onSchowModal} photos={state.photos} />
          {state.photos.length < state.totalHits && !state.isLoading && (
            <Button onClick={scroll.scrollMore} LoadMore={loadMore} />
          )}
        </>
      )}

      {state.isLoading && <Loader />}

      {state.showModal && (
        <Modal
          largeImageURL={state.modalData.largeImageURL}
          tags={state.modalData.tags}
          closeModal={toggleModal}
        />
      )}
      <ToastContainer autoClose={3000} />
    </>
  );
}
