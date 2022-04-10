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
		this.button = this.popupForm.querySelector('.popup__button');
		this.callBack = callBack;

		this.submit = (evt) => {
			evt.preventDefault();
			this.callBack(this._getInputValues(), this.button);
		}
	}

	_getInputValues() {
		this._formValues = {}
		this.inputs.forEach(input => this._formValues[input.id] = input.value);
		return this._formValues;
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
