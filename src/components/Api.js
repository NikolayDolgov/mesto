class Api {
  constructor({baseUrl, headers}) {
    // тело конструктора
    this._baseUrl = baseUrl;
    this._headers = headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {headers: this._headers})
    .then(this._checkResponse)
  }

  putchtUser(user) {
    return fetch(`${this._baseUrl}/users/me`,  {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: user.name,
        about: user.about
      })})
    .then(this._checkResponse)
  }


  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {headers: this._headers})
    .then(this._checkResponse)
  }

  postCard(card) {
    return fetch(`${this._baseUrl}/cards`, {headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: card.name,
        link: card.link})
    })
    .then(this._checkResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {headers: this._headers,
      method: 'DELETE'})
    .then(this._checkResponse)
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {headers: this._headers,
      method: 'PUT'})
    .then(this._checkResponse)
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {headers: this._headers,
      method: 'DELETE'})
    .then(this._checkResponse)
  }

  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: avatar
      })})
    .then(this._checkResponse)
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '61c26732-c0b1-4455-b980-e65336351013',
    'Content-Type': 'application/json'
  }
});

export {api}