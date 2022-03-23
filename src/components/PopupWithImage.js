//----------------------------//
// Импорт из других JS файлов //
//----------------------------//
import {Popup} from './Popup.js';

//--------//
// Классы //
//--------//

class PopupWithImage extends Popup {
    
	constructor(popupSelector) {
    super(popupSelector);
		this._popupSelector = popupSelector;
    this.popupElement = document.querySelector(this._popupSelector);

		this.figureImgData = this.popupElement.querySelector('.figure__img');
		this.figureCaption = this.popupElement.querySelector('.figure__caption');
	}

	open(item, link) {
		super.open();
		/*this.figureImgData.src = event.target.src;
		this.figureImgData.alt = event.target.alt;
		this.figureCaption.textContent = event.target.alt;*/
		this.figureImgData.src = link;
		this.figureImgData.alt = item;
		this.figureCaption.textContent = item;
	}
}

//---------//
// Экспорт //
//---------//

export {PopupWithImage}; 