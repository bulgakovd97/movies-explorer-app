import React, { useEffect, useState } from 'react';
import { MOVIES_URL } from '../../utils/config';
import { useLocation } from 'react-router';


const MoviesCard = ({
    movie,
    onMovieLike,
    checkIsMovieSaved,
    isSending
  }) => {
  const [isLiked, setIsLiked] = useState(false);

  const location = useLocation();

  const getTimeFromMins = (mins) => {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;

    const newDuration = hours + 'ч ' + minutes + 'м';
    return newDuration;
  };

  const handleClick = () => {
    setIsLiked(!isLiked);

    onMovieLike(movie);
  };

  const isMovieLiked = checkIsMovieSaved(movie);

  useEffect(() => {
    if (isMovieLiked) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, []);


  return (
    <li className='card'>
      <a className={`card__link ${!movie.trailerLink && 'card__link_disabled'}`} href={movie.trailerLink} target='_blank' rel='noreferrer'>
        <img
          className='card__image'
          alt={movie.nameRU}
          src={location.pathname === '/movies' ? MOVIES_URL + movie.image.url : movie.image}
        />
      </a>
      <div className='card__caption-field'>
        <h2 className='card__title'>
          {movie.nameRU}
        </h2>
        <div className='card__like'>
          <button
            className={location.pathname === '/movies' ? `card__like-button
                                  ${isLiked && 'card__like-button_active'}
                                  ${isSending && 'card__like-button_disabled'}` : `card__delete-button
                                  ${isSending && 'card__delete-button_disabled'}`}
            type='button'
            aria-label='Лайк'
            onClick={handleClick}
            disabled={isSending}
          ></button>
        </div>
        <p className='card__duration'>
          {getTimeFromMins(movie.duration)}
        </p>
      </div>
    </li>
  );
};

export default MoviesCard;