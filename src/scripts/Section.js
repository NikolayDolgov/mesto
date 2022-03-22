//----------------------------//
// Импорт из других JS файлов //
//----------------------------//
import {cardSelector} from '../index.js';

//--------//
// Классы //
//--------//

class Section {
	constructor({initialCards, createCard}, containerSelector) {
		this._items = initialCards;
		this._renderer = createCard;
		this._containerSelector = containerSelector;
		this.cardContainer = document.querySelector(this._containerSelector);
	}

	renderingAllItems() {
		this._items.forEach((item) => {
			this.cardContainer.append(this._renderer(cardSelector, item.name, item.link));
		});
	}

	addItem(item) {
		this.cardContainer.prepend(item);
	}
}

//---------//
// Экспорт //
//---------//

export {Section}; 