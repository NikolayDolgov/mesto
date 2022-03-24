//----------------------------//
// Импорт из других JS файлов //
//----------------------------//
import {Popup} from './Popup.js';

//--------//
// Классы //
//--------//

class PopupWithForm extends Popup {
    
	constructor(popupSelector, callBack) {
    super(popupSelector);
		this._popupSelector = popupSelector;
    this.popupForm = this.popupElement.querySelector('.popup__form');
		this.inputs = this.popupForm.querySelectorAll('.popup__input');
		this.callBack = callBack;

		this.submit = (evt) => {
			evt.preventDefault();
			const inputsValueArray = this._getInputValues();
			this.callBack(inputsValueArray[0], inputsValueArray[1]);
		}
	}

	_getInputValues() {
		// такой код мне больше понятен, в ближайшее время разберу ваше предложение (можно лучше), спасибо
		return [this.inputs[0].value, this.inputs[1].value];
	}

	setEventListeners() {
		super.setEventListeners();
		// обработчики форм submit
		this.popupForm.addEventListener('submit', this.submit);
	}

	close() {
		super.close();
		this.popupForm.reset(); // сбрасываем форму
	}
}

//---------//
// Экспорт //
//---------//

export {PopupWithForm}; 
