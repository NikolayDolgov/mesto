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
	}
  open(cardId, cardElement) {
		super.open();
		this.cardId = cardId;
		console.log(this.cardElement);
		this.cardElement = cardElement;

		this.popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._sendDeleteCard(this.cardId, this.cardElement);
    })
	}
}

//---------//
// Экспорт //
//---------//

export {PopupDeleteCard}; 