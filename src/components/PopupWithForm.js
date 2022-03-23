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
    //this.popupElement = document.querySelector(this._popupSelector);
		this.inputs = this.popupElement.querySelectorAll('.popup__input');
		this.callBack = callBack;

		this.submit = (evt) => {
			evt.preventDefault();
			const inputsValueArray = this._getInputValues();
			this.callBack(inputsValueArray[0], inputsValueArray[1]);
		}

		this.formAddCard = this.popupElement.querySelector('#add-card');
		this.formChangeProfile = this.popupElement.querySelector('#change-profile');
	}

	_getInputValues() {
		// такой код мне больше понятен, в ближайшее время разберу ваше предложение (можно лучше), спасибо
		return [this.inputs[0].value, this.inputs[1].value];
	}

	setEventListeners() {
		super.setEventListeners();
		// обработчики форм submit
		this.popupElement.querySelector('.popup__form').addEventListener('submit', this.submit);
	
	}
	close() {
		super.close();
		this.popupElement.querySelector('.popup__form').removeEventListener('submit', this.submit);
		if('.popup_task_add' == this._popupSelector) {
			this.formAddCard.reset(); // сбрасываем форму
		}
		if('.popup_task_change-profile' == this._popupSelector) {
			this.formChangeProfile.reset(); // сбрасываем форму
		}
	}
}

//---------//
// Экспорт //
//---------//

export {PopupWithForm}; 
