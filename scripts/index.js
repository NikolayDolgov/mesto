//----------------------------//
// Импорт из других JS файлов //
//----------------------------//
import {initialCards} from './initialCards.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

//---------------------------------------//
// объявление и инициализация переменных //
//---------------------------------------//
// изначальные переменные
const buttonProfileInfo = document.querySelector('.profile__button-name');
const buttonAddCard = document.querySelector('.profile__add-button');
const profileInfo = document.querySelector('.profile');
const profileName = profileInfo.querySelector('.profile__title-name');
const profileDescription = profileInfo.querySelector('.profile__text');
// для elements
const cardContainer = document.querySelector('.elements');

// попап изменения имени
const popupChangeProfile = document.querySelector('.popup_task_change-profile');
const inputName = popupChangeProfile.querySelector('#name');
const inputDescription = popupChangeProfile.querySelector('#description');

// попап добавления карточки
const popupAdd = document.querySelector('.popup_task_add');
const formAddCard = popupAdd.querySelector('#add-card')
const inputPlace = popupAdd.querySelector('#place-card');
const inputLink = popupAdd.querySelector('#link-card');
// селектор карточки
const cardSelector = '#element';

// попап открытия фото
const popupImg = document.querySelector('.popup_task_img');
const figureImgData = popupImg.querySelector('.figure__img');
const figureCaption = popupImg.querySelector('.figure__caption');

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive', // деактивация кнопки
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  patternErrorClass: '.popup__input-error_type_' // шаблон ошибки
}

// объявим классы через заранее обозначенные переменные,
// для дальнейшего использования в функциях
const formValidationСhangeProfile = new FormValidator(validationSettings, popupChangeProfile);
formValidationСhangeProfile.enableValidation();
const formValidationAddCard = new FormValidator(validationSettings, popupAdd);
formValidationAddCard.enableValidation();

//---------//
// функции //
//---------//
function openPropfilePopup() { // Функция вызова PropfilePopup
  // заполняем value
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;

  openPopup(popupChangeProfile); // открываем попап
  formValidationСhangeProfile.toggleButtonState(); // проводим валидацию для кнопки
  formValidationСhangeProfile.hideErrorForm(); // очищаем ошибки
}

function openAddCardPopup() { // Функция вызова addCardPopup
  openPopup(popupAdd); // открываем попап
  formValidationAddCard.toggleButtonState(); // проводим валидацию для кнопки
} //!!! ревью от другого проверяющего не рекомендовало использовать здесь очистку ошибок

function openPopup(popup) { // открытие попап
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', identifyButtonDown); // добавляем слушатель
}

function openImgPopup(cardName, cardLink) { // Функция вызова ImgPopup
  // записываем переменные в img
  figureImgData.src = cardLink;
  figureImgData.alt = cardName;
  figureCaption.textContent = cardName;
  
  openPopup(popupImg); // открываем попап
}

function sendFormChangeName(evt) { // Функция перезаписи profile__profile-info 
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Перезапись атрибута textContent
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupChangeProfile);
}

function sendFormAddCard(evt) { // Функция добавления карточки
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  cardContainer.prepend(createCard(cardSelector, inputPlace.value, inputLink.value)); // добавляем карточку в начало

  closePopup(popupAdd);
  formAddCard.reset();// очистка формы
}

const closePopup = (popup) => { // закрытие попап
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', identifyButtonDown); // удаляем слушатель
}

const identifyClickPopup = (evt) => { // функция идентификации клика
  if(evt.target === evt.currentTarget) { // закрываем если на overlay
    closePopup(evt.currentTarget);
  }
  if(evt.target.classList.contains('popup__close')) { // закрываем если на кнопку закрытия
    closePopup(evt.currentTarget);
  }
}

const identifyButtonDown = (evt) => { // функция идентификации нажатия кнопки
  if(evt.key === 'Escape') { // закрываем если нажата Escape
    const popupButtonClose = document.querySelector('.popup_opened');
    closePopup(popupButtonClose);
  }
}

const createCard = (cardSelector, name, link) => { // создание карточки
  const card = new Card(cardSelector, name, link);
	return card.generate();
}

//-------------//
// обработчики //
//-------------//
// записываем объекты массива в DOM
initialCards.forEach((item) => {
  cardContainer.append(createCard(cardSelector, item.name, item.link));
});

buttonProfileInfo.addEventListener('click', function() {  // обаботчик изменения имени/о себе
  openPropfilePopup();
});

buttonAddCard.addEventListener('click', function() { // обаботчик добавления карточки
  openAddCardPopup();
});

// обработчики форм submit
popupChangeProfile.querySelector('.popup__form').addEventListener('submit', sendFormChangeName);
popupAdd.querySelector('.popup__form').addEventListener('submit', sendFormAddCard);

// закрытие попап на overlay и на визуальную кнопку
popupChangeProfile.addEventListener('mousedown', identifyClickPopup);
popupAdd.addEventListener('mousedown', identifyClickPopup);
popupImg.addEventListener('mousedown', identifyClickPopup);

//-----------------//
// Экспорт функций //
//-----------------//
export {openImgPopup};