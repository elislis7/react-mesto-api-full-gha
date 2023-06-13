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

  // принемает endpoint(то что идет после главного url/...), метод (метод 'get, post ...') и тело, если есть
  _request(endpoint, method, body) {
    const fetchInit = {
      method: method,
      headers: this._headers
    }
    return fetch(`${this._url}/${endpoint}`,
    body 
    ? { // если есть тело запроса body
        ...fetchInit, //добавляем то что уже есть
        body: JSON.stringify(body) // а это идет плюсом
      }
    : fetchInit) // // если нет  body в запросе, то возвращается только константа fetchInit
    .then(this._handleResponse)
  }

  //получаем инфо пользователя
  getUserInfo() {
    return this._request('users/me','GET')
  }

  //получаем карточки
  getCards() {
    return this._request('cards', 'GET')
  }

  //редактирование профиля
  editProfile(data) {
    return this._request('users/me', 'PATCH', data)
  }

  //редактирование аватара
  editProfileAvatar(avatar) {
    return this._request('users/me/avatar', 'PATCH', avatar) 
  }

  //создание карточки
  createCard(card) {
    return this._request('cards', 'POST', card)
  }

  //удаление карточки
  deleteCardApi(id) {
    return this._request(`cards/${id}`, 'DELETE')
  }

  // добавление лайка
  updateLikes(cardId, isLiked) {
    return this._request(`cards/${cardId}/likes`, isLiked ? 'DELETE' : 'PUT') // изменение лайка карточки, если лайк есть то убираем лайк (DELETE), если его нет, то ставим (PUT)
  }
}

const api = new Api({
  url:'https://mesto.nomoreparties.co/v1/cohort-61',
  headers: {
    authorization: '94d1ffee-3999-4573-85f3-6adc0420e1b3',
    'Content-Type': 'application/json'
  }
});

export default api;