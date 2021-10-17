const Movie = require('../models/movie');

const moviesUrl = require('../utils/moviesUrl');

const NoAccessError = require('../errors/NoAccessError');
const NotFoundError = require('../errors/NotFoundError');
const NotValidError = require('../errors/NotValidError');

const { NOT_FOUND, BAD_REQUEST, NO_ACCESS } = require('../utils/errorMessage');
const { CAST_ERROR, VALID_ERROR } = require('../utils/errorName');


const getMovies = (req, res, next) => {
  Movie.find()
    .then((movies) => res.send(movies))
    .catch((err) => {
      next(err);
    });
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    id,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image: moviesUrl + image.url,
    trailerLink,
    thumbnail,
    id,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === VALID_ERROR) {
        throw new NotValidError(BAD_REQUEST);
      }

      return next(err);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NOT_FOUND);
      } else if (!movie.owner.equals(req.user._id)) {
        throw new NoAccessError(NO_ACCESS);
      }

      return Movie.deleteOne({ id: movie.id })
        .then((movie) => res.status(200).send(movie))
        .catch(next);
    })
    .catch(err => {
      if (err.name === CAST_ERROR) {
        throw new NotValidError(BAD_REQUEST);
      }

      return next(err);
    })
    .catch(next);
};


module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
