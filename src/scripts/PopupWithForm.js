//----------------------------//
// Импорт из других JS файлов //
//----------------------------//
import {Popup} from './Popup.js';
import {formValidationAddCard, formValidationСhangeProfile} from '../index.js';

//--------//
// Классы //
//--------//

class PopupWithForm extends Popup {
    
	constructor(popupSelector, callBack) {
    super(popupSelector);
		this._popupSelector = popupSelector;
    this.popupElement = document.querySelector(this._popupSelector);
		this.callBack = callBack;

		this.submit = (evt) => {
			evt.preventDefault();
			const inputsValueV = this._getInputValues();
			this.callBack(inputsValueV[0], inputsValueV[1]);
		}
	}

	_getInputValues() {
		const inputs = this.popupElement.querySelectorAll('.popup__input');
		const inputsValue = [inputs[0].value, inputs[1].value]
		return inputsValue;
	}

	setEventListeners() {
		this.identifyClickPopup = (evt) => { // функция идентификации клика
      if(evt.target === evt.currentTarget) { // закрываем если на overlay
        this.close();
      }
      if(evt.target.classList.contains('popup__close')) { // закрываем если на кнопку закрытия
        this.close();
      }
    }
    this.popupElement.addEventListener('mousedown', this.identifyClickPopup);
		
		// обработчики форм submit
		this.popupElement.querySelector('.popup__form').addEventListener('submit', this.submit);
	
	}
	close() {
		this.popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this.identifyButtonDown); // удаляем слушатель
		this.popupElement.querySelector('.popup__form').removeEventListener('submit', this.submit);
		if('.popup_task_add' == this._popupSelector) {
			const formAddCard = this.popupElement.querySelector('#add-card');
			formAddCard.reset(); // сбрасываем форму
			formValidationAddCard.hideErrorForm(); // очищаем ошибки
		}
		if('.popup_task_change-profile' == this._popupSelector) {
			const formChangeProfile = this.popupElement.querySelector('#change-profile');
			formChangeProfile.reset(); // сбрасываем форму
			formValidationСhangeProfile.hideErrorForm(); // очищаем ошибки
		}
	}
}

//---------//
// Экспорт //
//---------//

export {PopupWithForm}; 
