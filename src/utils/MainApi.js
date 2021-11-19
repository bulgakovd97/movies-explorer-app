import { MAIN_OPTIONS } from './options';

class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res);
  }

  register({ email, password, name }) {
    return fetch(`${this.url}/signup`, {
      headers: this.headers,
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    }).then(this._checkResponse);
  }

  authorize({ email, password }) {
    return fetch(`${this.url}/signin`, {
      headers: this.headers,
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  }

  getUser(token) {
    return fetch(`${this.url}/users/me`, {
      headers: {
        ...this.headers,
        authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  updateUser({ name, email }) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this.headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({ name, email }),
    }).then(this._checkResponse);
  }

  getMovies() {
    return fetch(`${this.url}/movies`, {
      headers: {
        ...this.headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._checkResponse);
  }

  saveMovie({
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
  }) {
    return fetch(`${this.url}/movies`, {
      method: 'POST',
      headers: {
        ...this.headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
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
      }),
    }).then(this._checkResponse);
  };

  deleteMovie(id) {
    return fetch(`${this.url}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        ...this.headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._checkResponse);
  };
};

const mainApi = new Api(MAIN_OPTIONS);

export default mainApi;