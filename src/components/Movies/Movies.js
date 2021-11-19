import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { MoviesContext } from '../../contexts/MoviesContext';
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';


const Movies = ({
  onSearch,
  isLoggedIn,
  showError,
  errorMessage,
  searchTerm,
  setSearchTerm,
  checked,
  setChecked,
  isSending,
  movies,
  isMoviesLoading,
  onMovieLike,
  savedMovies,
  checkIsMovieSaved
}) => {

  return (
    <MoviesContext.Provider value={movies}>
      <SavedMoviesContext.Provider value={savedMovies}>
        <section className='movies'>
          <Header isLoggedIn={isLoggedIn} />

          <SearchForm
            onSearch={onSearch}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            checked={checked}
            setChecked={setChecked}
            isSending={isSending}
          />

          {isMoviesLoading ? (
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
    </MoviesContext.Provider>
  );
};

export default Movies;