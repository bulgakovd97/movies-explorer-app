const mongoose = require('mongoose');

const regex = require('../utils/regex');


const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return regex.test(link);
      },
      message: props => `${props.value} — некорректная ссылка`,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return regex.test(link);
      },
      message: props => `${props.value} — некорректная ссылка`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return regex.test(link);
      },
      message: props => `${props.value} — некорректная ссылка`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model('movie', movieSchema);
