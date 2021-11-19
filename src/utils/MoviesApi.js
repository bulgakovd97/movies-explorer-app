import { MOVIES_OPTIONS } from './options';

class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  };

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res);
  };

  getBeatfilmMovies() {
    return fetch(`${this.url}`, {
      headers: {
        ...this.headers,
      },
    }).then(this._checkResponse);
  };
};

const moviesApi = new Api(MOVIES_OPTIONS);

export default moviesApi;