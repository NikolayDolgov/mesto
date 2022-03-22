//----------------------------//
// Импорт из других JS файлов //
//----------------------------//
import {formValidationAddCard, formValidationСhangeProfile} from '../index.js';

//--------//
// Классы //
//--------//

class Popup {
	constructor(popupSelector) {
		this._popupSelector = popupSelector;
    this.popupElement = document.querySelector(this._popupSelector);
	}

	open() {
		this.popupElement.classList.add('popup_opened');
    this._handleEscClose();
    this.setEventListeners()
    formValidationAddCard.toggleButtonState(); // проводим валидацию для кнопки
    formValidationСhangeProfile.toggleButtonState(); // проводим валидацию для кнопки
	}

  _handleEscClose() {
    this.identifyButtonDown = (evt) => { // функция идентификации нажатия кнопки
      if(evt.key === 'Escape') { // закрываем если нажата Escape
        this.close();
      }
    }
    document.addEventListener('keydown', this.identifyButtonDown); // добавляем слушатель
  }

	close() {
		this.popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this.identifyButtonDown); // удаляем слушатель
	}

  setEventListeners() { // закрытие попап на overlay и на визуальную кнопку
    this.identifyClickPopup = (evt) => { // функция идентификации клика
      if(evt.target === evt.currentTarget) { // закрываем если на overlay
        this.close();
      }
      if(evt.target.classList.contains('popup__close')) { // закрываем если на кнопку закрытия
        this.close();
      }
    }
    this.popupElement.addEventListener('mousedown', this.identifyClickPopup);
  }
}

//---------//
// Экспорт //
//---------//

export {Popup}; 