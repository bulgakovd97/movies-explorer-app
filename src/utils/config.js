const { production } = process.env;

export const MAIN_URL = production ? 'https://api.movies.bulgakovd.nomoredomains.club' : 'http://localhost:3005';

export const BEATFILMS_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const MOVIES_URL = 'https://api.nomoreparties.co';