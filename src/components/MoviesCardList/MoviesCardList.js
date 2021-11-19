import React, { useState, useContext, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { Route, Switch } from 'react-router';
import { MoviesContext } from '../../contexts/MoviesContext';
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';


const MoviesCardList = ({
    showError,
    errorMessage,
    onMovieLike,
    checkIsMovieSaved,
    isSending
  }) => {

  const movies = useContext(MoviesContext);
  const savedMovies = useContext(SavedMoviesContext);

  const [amountOfItemsToShow, setAmountOfItemsToShow] = useState(0);

  const showInitialAmountOfMovie = () => {
    if (window.innerWidth >= 1015) {
      setAmountOfItemsToShow(12);
    } else if (window.innerWidth < 1015 && window.innerWidth >= 590) {
      setAmountOfItemsToShow(8);
    } else if (window.innerWidth <= 589) {
      setAmountOfItemsToShow(5);
    } else {
      return;
    }
  };

  const handleMoreClick = () => {
    if (window.innerWidth >= 1015) {
      setAmountOfItemsToShow(amountOfItemsToShow + 3);
    } else {
      setAmountOfItemsToShow(amountOfItemsToShow + 2);
    }
  };

  useEffect(() => {
    showInitialAmountOfMovie();
    window.addEventListener('resize', () => {
      setTimeout(showInitialAmountOfMovie, 2000);
    });


    return () => {
      window.removeEventListener('resize', showInitialAmountOfMovie);
    };
  }, []);


  return (
    <section className='movies-cards'>
      <Switch>
        <Route path='/movies'>
          {movies && (
            <>
              <ul className='elements'>
                {movies.map((movie) => (
                  <MoviesCard
                    movie={movie}
                    key={movie.id}
                    onMovieLike={onMovieLike}
                    checkIsMovieSaved={checkIsMovieSaved}
                    isSending={isSending}
                  />
                )).slice(0, amountOfItemsToShow)}
              </ul>

              {movies.length !== 0 && (
                <button className={`elements__more-button ${(amountOfItemsToShow < 3 || amountOfItemsToShow >= movies.length) && 'elements__more-button_invisible'}`} type='button' onClick={handleMoreClick}>
                  Ещё
                </button>
              )}
            </>
          )}

          {showError && (
            <span className='movies-cards__error movies-cards__error_visible'>
              {errorMessage}
            </span>
          )}
        </Route>

        <Route path='/saved-movies'>
          {savedMovies && (
            <ul className='elements'>
              {savedMovies.map((movie) => (
                <MoviesCard
                  movie={movie}
                  key={movie.id}
                  onMovieLike={onMovieLike}
                  checkIsMovieSaved={checkIsMovieSaved}
                  isSending={isSending}
                />
              ))}
            </ul>
          )}

          {showError && (
            <span className='movies-cards__error movies-cards__error_visible'>
              {errorMessage}
            </span>
          )}
        </Route>
      </Switch>
    </section>
  );
};

export default MoviesCardList;