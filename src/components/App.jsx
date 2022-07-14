import { Component } from 'react';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Searchbar from '../Searchbar/Searchbar';
import fetchGallery from '../services/api';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { animateScroll as scroll, scrollSpy } from 'react-scroll';

export default class App extends Component {
  state = {
    searchQuery: '',
    currentPage: 1,
    photos: [],
    error: null,
    isLoading: false,
    showModal: false,
  };

  componentDidMount() {
    scrollSpy.update();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.fetchGallery();
    }
  }

  handleFormSubmit = searchResult => {
    this.setState({
      searchQuery: searchResult,
      currentPage: 1,
      photos: [],
      error: null,
      modalData: null,
    });
  };

  fetchGallery = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { searchQuery, currentPage };

    this.setState({ isLoading: true });
    setTimeout(() => {
      fetchGallery(options)
        .then(photos => {
          if (!photos.length) {
            return toast.error(
              'There is no images found with that search request'
            );
          }
          this.setState(prevState => ({
            photos: [...prevState.photos, ...photos],
          }));
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ isLoading: false }));
    }, 1000);
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onSchowModal = id => {
    this.toggleModal();
    const modalPhoto = this.state.photos.find(photo => photo.id === id);
    this.setState({
      modalData: {
        largeImageURL: modalPhoto.largeImageURL,
        tags: modalPhoto.tags,
      },
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
    scroll.scrollMore(150);
  };

  render() {
    const { error, photos, isLoading, showModal, modalData } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {error && toast.error(`Something went wrong! ${error.message}`)}

        {photos.length > 0 && (
          <>
            <ImageGallery openModal={this.onSchowModal} photos={photos} />
            <Button onClick={this.scrollMore} LoadMore={this.loadMore} />
          </>
        )}

        {isLoading && <Loader />}

        {showModal && (
          <Modal
            largeImageURL={modalData.largeImageURL}
            tags={modalData.tags}
            closeModal={this.toggleModal}
          />
        )}
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
