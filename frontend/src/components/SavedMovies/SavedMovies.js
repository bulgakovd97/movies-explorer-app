import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';
import Preloader from '../Preloader/Preloader';


const SavedMovies = ({
  isLoggedIn,
  showError,
  errorMessage,
  searchTerm,
  setSearchTerm,
  checked,
  setChecked,
  isSending,
  isSavedMoviesLoading,
  savedMovies,
  onMovieLike,
  onSavedSearch,
  checkIsMovieSaved
}) => {

  return (
    <SavedMoviesContext.Provider value={savedMovies}>
      <section className='saved-movies'>
        <Header isLoggedIn={isLoggedIn} />

        <SearchForm
          onSavedSearch={onSavedSearch}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          checked={checked}
          setChecked={setChecked}
          isSending={isSending}
        />

        {isSavedMoviesLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            showError={showError}
            errorMessage={errorMessage}
            onMovieLike={onMovieLike}
            checkIsMovieSaved={checkIsMovieSaved}
            isSending={isSending}
          />
        )}

        <Footer />
      </section>
    </SavedMoviesContext.Provider>
  );
};

export default SavedMovies;