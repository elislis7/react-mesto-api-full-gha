const BASE_URL = 'https://auth.nomoreparties.co';

class Auth {
  constructor(baseURL) {
    this._baseURL = baseURL;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  }

  _request(endpoint, method, body, jwt) {
    const headers = {
      'Content-Type': 'application/json'
    }

    const fetchInit = {
      method: method,
      headers: jwt
        ? {
          ...headers,
          'Authorization': `Bearer ${jwt}`
        }
        : headers
    }

    return fetch(`${this._baseURL}/${endpoint}`, body
      ? {
        ...fetchInit,
        body: JSON.stringify(body)
      }
      : fetchInit
    )
      .then(this._handleResponse)
  }

  login(authData) {
    return this._request('signin', 'POST', authData)
  }

  register(authData) {
    return this._request('signup', 'POST', authData)
  }

  checkToken(jwt) {
    return this._request('users/me', 'GET', null, jwt)
  }
}

export const authApi = new Auth(BASE_URL);