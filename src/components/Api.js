class Api {
  constructor({baseUrl, headers}) {
    // тело конструктора
    this._baseUrl = baseUrl;
    this._headers = headers
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {headers: this._headers})
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }); 
  }

  putchtUser(user) {
    return fetch(`${this._baseUrl}/users/me`,  {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: user.name,
        about: user.about
      })})
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }); 
  }


  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {headers: this._headers})
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }); 
  }

  postCard(card) {
    return fetch(`${this._baseUrl}/cards`, {headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })})
    .then(res => {
      if (res.ok) { 
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }); 
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {headers: this._headers,
      method: 'DELETE'})
    .then(res => {
      if (res.ok) { 
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }); 
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {headers: this._headers,
      method: 'PUT'})
    .then(res => {
      if (res.ok) { 
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }); 
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {headers: this._headers,
      method: 'DELETE'})
    .then(res => {
      if (res.ok) { 
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }); 
  }

  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: avatar
      })})
    .then(res => {
      if (res.ok) { 
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }); 
  }
  // другие методы работы с API
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '61c26732-c0b1-4455-b980-e65336351013',
    'Content-Type': 'application/json'
  }
});

export {api}