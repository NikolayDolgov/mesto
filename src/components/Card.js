//--------//
// Классы //
//--------//

class Card {
	constructor(cardSelector, myUserInfo, cardElement, handleCardClick, handleDeleteCard, api) {
    this._cardTemplate = document.querySelector(cardSelector).content;
    this._cardElement = cardElement;
		this._cardName = cardElement.name;
    this._cardLink = cardElement.link;
    this._cardLikeArray = cardElement.likes;
    this._cardLike = cardElement.likes.length; // не передаётся лайк, не добавляется карточка
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard; // кол-бэк удаления
    this._cardOwner = cardElement.owner._id; //id обладателя карточки
    this._user = myUserInfo._id; // id пользователя
    this._api = api; // для использования аpi в классе
    this._cardId = cardElement._id;
    //console.log(cardElement.likes);
	}

  // приватные методы обработчиков
  _likeCard() {
    this._elementLike.classList.toggle('elements__element_active');
  }

  _removeCard() { // удаление карточки
    //this._element.remove(); // удаление из разметки
    this._handleDeleteCard(this._cardId, this._element);
    
  }

  _openCard() {
    this._handleCardClick();
  }

  // навешивание обработчиков
  _addListeners() {
    this._elementLike.addEventListener('click', () => {
      if(!(this._elementLike.classList.contains('elements__element_active'))) {
        this._api.addLike(this._cardId)
          .then((item) => {
            this._likeCard();
            this.card.querySelector('.elements__like-quantity').textContent = item.likes.length;
          })
          .catch((err) =>{ //обязательно ловим возможные ошибки в конце запроса )
            console.log(err);
          })
          .finally(() => {//в этом блоке чаще всего изменяют текст кнопки и скрывают эффект загрузки)
            console.log("Лайк поставлен")
          });
      }
      else {
        this._api.deleteLike(this._cardId)
          .then((item) => {
            this._likeCard();
            this.card.querySelector('.elements__like-quantity').textContent = item.likes.length; 
          })
          .catch((err) =>{ //обязательно ловим возможные ошибки в конце запроса )
            console.log(err);
          })
          .finally(() => {//в этом блоке чаще всего изменяют текст кнопки и скрывают эффект загрузки)
            console.log("Лайк снят")
          });
      }
    });

    this._element.querySelector('.elements__img').addEventListener('click', () => {
      this._openCard();
    });

    this._element.querySelector('.elements__button-delete').addEventListener('click', () => {
      this._removeCard();
      if(this._cardOwner = this._user){ // добавляем кнопку удаления

      }
    });

    return this._element;
  }

  // приватный метод, заполняет карточку данными
  _getElement() {
    const  card = this._cardTemplate.querySelector('.elements__element').cloneNode(true);
    card.querySelector('.elements__img').src = this._cardLink;
    card.querySelector('.elements__img').alt = this._cardName;
    card.querySelector('.elements__text').textContent = this._cardName;
    card.querySelector('.elements__like-quantity').textContent = this._cardLike;
    if(this._cardOwner != this._user) // отражаем иконку удаления
      card.querySelector('.elements__button-delete').classList.add('elements__button-delete_hidden');
      this.card = card;
      return this.card;
  }

  // публичный метод, создание карточки
  generate() {
    this._element = this._getElement();
    this._elementLike = this._element.querySelector('.elements__button-view');
    this._cardLikeArray.forEach(item => { // отражаем лайк пользователя
      if(item._id == this._user){
        this._elementLike.classList.add('elements__element_active');
        console.log("Нашёл");
        return;
      }
    });
   
    this._addListeners();

    return this._element;
  }
}

export {Card}; 