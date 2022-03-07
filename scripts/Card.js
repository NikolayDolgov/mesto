//----------------------------//
// Импорт из других JS файлов //
//----------------------------//
import {openImgPopup} from './index.js';

//--------//
// Классы //
//--------//

// cardElement - карточка
// cardName - название карточки
// cardLink - ссылка на карточку

class Card {
	constructor(cardElement, cardName, cardLink) {
		this._cardElement = cardElement;
		this._cardName = cardName;
    this._cardLink = cardLink;
	}

  // приватные методы обработчиков
  _likeCard() {
    this._element.querySelector('.elements__button-view').addEventListener('click', function (evt) { // обработчик оценки
      const eventTarget = evt.target;
      eventTarget.classList.toggle('elements__element_active');
    });
    return this._element;
  }

  _removeCard() {
    this._element.querySelector('.elements__button-delete').addEventListener('click', function (evt) { // обработчик удаления
      const eventTarget = evt.target.closest('.elements__element');
      eventTarget.remove();
    });
    return this._element;
  }

  _openCard() {
    this._element.querySelector('.elements__img').addEventListener('click', function (evt) { // обработчик открытия img карточки
      const eventTarget = evt.target;
      openImgPopup(eventTarget);
    });
    return this._element;
  }

  // приватный метод, заполняет карточку данными
  _getElement() {
    const  card = this._cardElement.querySelector('.elements__element').cloneNode(true);
    card.querySelector('.elements__img').src = this._cardLink;
    card.querySelector('.elements__img').alt = this._cardName;
    card.querySelector('.elements__text').textContent = this._cardName;
    return card;
  }

  // публичный метод, создание карточки
  generate() {
    this._element = this._getElement();

    this._likeCard();
    this._removeCard();
    this._openCard();

    return this._element;
  }
}

export {Card}; 