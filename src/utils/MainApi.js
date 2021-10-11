import { mainOptions } from './options';

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
  
    // addCard(name, link) {
    //   return fetch(`${this.url}/cards`, {
    //     method: "POST",
    //     headers: {
    //       ...this.headers,
    //       authorization: `Bearer ${localStorage.getItem("jwt")}`,
    //     },
    //     body: JSON.stringify({ name, link }),
    //   }).then(this._checkApiRequest);
    // }
  
    // removeCard(id) {
    //   return fetch(`${this.url}/cards/${id}`, {
    //     method: "DELETE",
    //     headers: {
    //       ...this.headers,
    //       authorization: `Bearer ${localStorage.getItem("jwt")}`,
    //     },
    //   }).then(this._checkApiRequest);
    // }
  
    // changeLikeCardStatus(id, isLiked) {
    //   return fetch(`${this.url}/cards/${id}/likes`, {
    //     method: isLiked ? "DELETE" : "PUT",
    //     headers: {
    //       ...this.headers,
    //       authorization: `Bearer ${localStorage.getItem("jwt")}`,
    //     },
    //   }).then(this._checkApiRequest);
    // }
  }
  
  const mainApi = new Api(mainOptions);
  
  export default mainApi;