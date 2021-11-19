const Movie = require('../models/movie');

const NotFoundError = require('../errors/NotFoundError');
const NotValidError = require('../errors/NotValidError');

const { NOT_FOUND, BAD_REQUEST } = require('../utils/errorMessage');
const { CAST_ERROR, VALID_ERROR } = require('../utils/errorName');


const getMovies = (req, res, next) => {
  Movie.find()
    .then((movies) => {
      const savedMovies = movies.filter(movie => {
        if (!movie.owner.equals(req.user._id)) {
          return null;
        }

        return movie;
      });

      res.send(savedMovies);
    })
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
    image,
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
  Movie.findOne({ id: req.params.id })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NOT_FOUND);
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
