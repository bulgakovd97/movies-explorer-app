const movieRouter = require('express').Router();

const { createMovieValid, deleteMovieValid } = require('../utils/validation');

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');


movieRouter.get('/movies', getMovies);

movieRouter.post('/movies', createMovieValid, createMovie);

movieRouter.delete('/movies/:id', deleteMovieValid, deleteMovie);


module.exports = movieRouter;
