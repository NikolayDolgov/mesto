//----------------------------//
// Импорт из других JS файлов //
//----------------------------//
import {Popup} from './Popup.js';

//--------//
// Классы //
//--------//

class PopupDeleteCard extends Popup {
    
	constructor(popupSelector, sendDeleteCard) {
    super(popupSelector);
		this._popupSelector = popupSelector;
    this._sendDeleteCard = sendDeleteCard;
		this.popupForm = this.popupElement.querySelector('.popup__form');
		this.button = this.popupForm.querySelector('.popup__button');
	}
  open(cardId, cardElement) {
		super.open();
		this.cardId = cardId;
		this.cardElement = cardElement;

		this.popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._sendDeleteCard(this.cardId, this.cardElement, this.button);
    })
	}
}

//---------//
// Экспорт //
//---------//

export {PopupDeleteCard}; 