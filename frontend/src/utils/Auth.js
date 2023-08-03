
class Auth {
    constructor(config) {
      this._url = config.BASE_URL;
      this._headers = config.headers;
    }
  
    _getResponse(response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  
    register({ password, email }) {
      return fetch(`${this._url}/signup`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({ password, email }),
      }).then(this._getResponse);
    }
  
    authorize({ password, email }) {
      return fetch(`${this._url}/signin`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({ password, email }),
      }).then(this._getResponse);
    }
    
    getContent(token) {
      return fetch(`${this._url}/users/me`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then(this._getResponse);
    }
  }
  
  const auth = new Auth({
    BASE_URL: 'http://api.mesto-practicum.nomoreparties.co',
    headers: { "Content-Type": "application/json" },
  });
  
  export default auth;
  