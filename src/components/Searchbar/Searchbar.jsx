import { Component } from 'react';
import styles from './Searchbar.module.css';
import PropTypes from 'prop-types';

import { ReactComponent as SearchIcon } from '../../icons/search-icon.svg';
export default class Searchbar extends Component {
  state = {
    searchResult: '',
  };

  handleChange = event => {
    this.setState({ searchResult: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchResult.trim() === '') {
      alert('you have nothing written yet');
      return;
    }
    this.props.onSubmit(this.state.searchResult);
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.SearchForm__button}>
            <SearchIcon />
            <span className={styles.SearchForm__button_label}>Search</span>
          </button>

          <input
            onChange={this.handleChange}
            className={styles.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
