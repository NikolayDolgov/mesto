import './pages/index.css'; // добавьте импорт главного файла стилей

//----------------------------//
// Импорт из других JS файлов //
//----------------------------//
import {initialCards} from './scripts/initialCards.js';
import {Card} from './scripts/Card.js';
import {Section} from './scripts/Section.js';
import {PopupWithImage} from './scripts/PopupWithImage.js';
import {PopupWithForm} from './scripts/PopupWithForm.js';
import {FormValidator} from './scripts/FormValidator.js';
import {UserInfo} from './scripts/UserInfo.js';

//---------------------------------------//
// объявление и инициализация переменных //
//---------------------------------------//
// изначальные переменные
const buttonProfileInfo = document.querySelector('.profile__button-name');
const buttonAddCard = document.querySelector('.profile__add-button');
const profileData = {profileName: '.profile__title-name', profileDescription: '.profile__text'};

// попап изменения имени
const popupChangeProfile = document.querySelector('.popup_task_change-profile');
const inputName = popupChangeProfile.querySelector('#name');
const inputDescription = popupChangeProfile.querySelector('#description');

// попап добавления карточки
const popupAdd = document.querySelector('.popup_task_add');

// селектор карточки
const cardSelector = '#element';
// селектор контейнера
const containerSelector = '.elements';

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive', // деактивация кнопки
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  patternErrorClass: '.popup__input-error_type_' // шаблон ошибки
}
//
const userInfo = new UserInfo(profileData);

//---------//
// функции //
//---------//
function openPropfilePopup() { // Функция вызова PropfilePopup
  inputName.value = userInfo.getUserInfo()[0];
  inputDescription.value = userInfo.getUserInfo()[1];

  popupChangeProfileNew.open(); // открываем попап
}

const sendFormChangeName = (inputName, inputDescription) => { // Функция перезаписи profile__profile-info 

  userInfo.setUserInfo(inputName, inputDescription);
 
  popupChangeProfileNew.close();
}

const sendFormAddCard = (inputPlace, inputLink) => { // Функция добавления карточки (submit)
  const cardElement = new Section({initialCards, createCard}, containerSelector);

  cardElement.addItem(createCard(cardSelector, inputPlace, inputLink));
  popupAddNew.close();
}

const createCard = (cardSelector, name, link) => { // создание карточки
  const popupImgOpen = () => {
    popupImg.open();
  }
  const card = new Card(cardSelector, name, link, popupImgOpen);
	return card.generate();
}

//--------------------//
// экземпляры классов //
//--------------------//

// запись объектов массива в DOM

const cardElements = new Section({initialCards, createCard}, containerSelector);

// создадим экземпляры классов для всех поп-апов
const popupAddNew = new PopupWithForm('.popup_task_add', sendFormAddCard);
const popupChangeProfileNew = new PopupWithForm('.popup_task_change-profile', sendFormChangeName);
//popupAddNew._getInputValues();
const popupImg = new PopupWithImage('.popup_task_img');

// объявим экземпляры классов для валидации поп-апов
const formValidationСhangeProfile = new FormValidator(validationSettings, popupChangeProfile);
const formValidationAddCard = new FormValidator(validationSettings, popupAdd);

//-------------//
// обработчики //
//-------------//
// активируем валидацию форм
formValidationСhangeProfile.enableValidation();
formValidationAddCard.enableValidation();

// записываем объекты массива в DOM
cardElements.renderingAllItems();

buttonProfileInfo.addEventListener('click', function() {  // обаботчик изменения имени/о себе
  openPropfilePopup();
});

buttonAddCard.addEventListener('click', function() { // обаботчик добавления карточки
  popupAddNew.open();
  //formValidationAddCard.toggleButtonState(); // проводим валидацию для кнопки
});

//------------------//
// Экспорт констант //
//------------------//
export {cardSelector};
export {popupImg};
export {formValidationAddCard, formValidationСhangeProfile};
export {profileData};
//export {popupImgOpen};
//-----------------//
// Экспорт функций //
//-----------------//
export {sendFormChangeName, sendFormAddCard};