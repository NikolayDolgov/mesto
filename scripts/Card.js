//----------------------------//
// Импорт из других JS файлов //
//----------------------------//
import {openImgPopup} from './index.js';

//--------//
// Классы //
//--------//

// cardSelector - селектор темплэйт элемента
// cardName - название карточки
// cardLink - ссылка на карточку

class Card {
	constructor(cardSelector, cardName, cardLink) {
    this._cardTemplate = document.querySelector(cardSelector).content;
		this._cardName = cardName;
    this._cardLink = cardLink;
	}

  // приватные методы обработчиков
  _likeCard() {
    this._elementLike.classList.toggle('elements__element_active');
  }

  _removeCard() {
    this._element.remove();
  }

  _openCard() {
    openImgPopup(this._cardName, this._cardLink);
  }

  // навешивание обработчиков
  _addListeners() {
    this._elementLike.addEventListener('click', () => {
      this._likeCard();
    });

    this._element.querySelector('.elements__img').addEventListener('click', () => {
      this._openCard();
    });

    this._element.querySelector('.elements__button-delete').addEventListener('click', () => {
      this._removeCard();
    });

    return this._element;
  }

  // приватный метод, заполняет карточку данными
  _getElement() {
    const  card = this._cardTemplate.querySelector('.elements__element').cloneNode(true);
    card.querySelector('.elements__img').src = this._cardLink;
    card.querySelector('.elements__img').alt = this._cardName;
    card.querySelector('.elements__text').textContent = this._cardName;
    return card;
  }

  // публичный метод, создание карточки
  generate() {
    this._element = this._getElement();
    this._elementLike = this._element.querySelector('.elements__button-view');

    this._addListeners();

    return this._element;
  }
}

export {Card}; 