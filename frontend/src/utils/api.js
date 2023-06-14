class Api {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res);
      }
  }

  _request(endpoint, method, body) {
    const fetchInit = {
      method: method,
      headers: this._headers
    }
    return fetch(`${this._url}/${endpoint}`,
    body 
    ? {
        ...fetchInit,
        body: JSON.stringify(body)
      }
    : fetchInit)
    .then(this._handleResponse)
  }

  getUserInfo() {
    return this._request('users/me','GET')
  }

  getCards() {
    return this._request('cards', 'GET')
  }

  editProfile(data) {
    return this._request('users/me', 'PATCH', data)
  }

  editProfileAvatar(avatar) {
    return this._request('users/me/avatar', 'PATCH', avatar) 
  }

  createCard(card) {
    return this._request('cards', 'POST', card)
  }

  deleteCardApi(id) {
    return this._request(`cards/${id}`, 'DELETE')
  }

  updateLikes(cardId, isLiked) {
    return this._request(`cards/${cardId}/likes`, isLiked ? 'DELETE' : 'PUT')
  }
}

export const token = localStorage.getItem('jwt');

const api = new Api({
  url:'https://api.elislis.nomoredomains.rocks/',
  headers: {
    authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

export default api;