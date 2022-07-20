import { useState } from 'react';
import styles from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import { ReactComponent as SearchIcon } from '../../icons/search-icon.svg';

export default function Searchbar({ onSubmit }) {
  const [searchResult, setSearchResult] = useState('');
  // state = {
  //   searchResult: '',
  // };

  const handleChange = event => {
    setSearchResult(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchResult.trim() === '') {
      toast('you have nothing written yet');
      return;
    }
    onSubmit(searchResult);
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchForm__button}>
          <SearchIcon />
          <span className={styles.SearchForm__button_label}>Search</span>
        </button>

        <input
          onChange={handleChange}
          className={styles.SearchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
      <ToastContainer autoClose={3000} />
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
