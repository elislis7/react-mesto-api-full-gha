class Api {
  constructor(data) {
    this._url = data.url;
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
    const token = localStorage.getItem("jwt");
    return this._request('users/me','GET')
  }

  getCards() {
    const token = localStorage.getItem("jwt");
    return this._request('cards', 'GET')
  }

  editProfile(data) {
    const token = localStorage.getItem("jwt");
    return this._request('users/me', 'PATCH', data)
  }

  editProfileAvatar(avatar) {
    const token = localStorage.getItem("jwt");
    return this._request('users/me/avatar', 'PATCH', avatar) 
  }

  createCard(card) {
    const token = localStorage.getItem("jwt");
    return this._request('cards', 'POST', card)
  }

  deleteCardApi(id) {
    const token = localStorage.getItem("jwt");
    return this._request(`cards/${id}`, 'DELETE')
  }

  updateLikes(cardId, isLiked) {
    const token = localStorage.getItem("jwt");
    return this._request(`cards/${cardId}/likes`, isLiked ? 'DELETE' : 'PUT')
  }
}

const jwtToken = localStorage.getItem("jwt");
const api = new Api({ url:'https://api.elislis.nomoredomains.rocks/',
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${jwtToken}`,
  }
});

export default api;