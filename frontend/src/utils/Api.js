class Api {
  constructor(config) {
    // тело конструктора
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  _getResponseData(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  _getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  _getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  getNeededAll() {
    return Promise.all([this._getUserInfo(), this._getInitialCards()]);
  }

  patchUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._getResponseData);
  }

  createNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._getResponseData);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}${"/cards/"}${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  putLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  patchAvatar({avatar}) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._getResponseData);
  }

  changeLikeCard(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers
    })
    .then(this._getResponseData);
  }

  getToken() {
    this._headers.authorization = `Bearer ${localStorage.getItem('jwt')}`;
  }

  setToken() {
    return this._headers.authorization;
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3005',
  // baseUrl: "https://mesto.nomoreparties.co/v1/cohort-64",
  headers: {
    // authorization: "68cde520-ac6c-40b9-a1ad-21ed7cb7863b",
    "Content-Type": "application/json",
  },
});

export default api;
