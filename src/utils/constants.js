//---------------------------------------//
// объявление и инициализация переменных //
//---------------------------------------//
// изначальные переменные
const buttonProfileInfo = document.querySelector('.profile__button-name');
const buttonAddCard = document.querySelector('.profile__add-button');
const profileData = {profileName: '.profile__title-name', profileDescription: '.profile__text'};
const profileAvatar = document.querySelector('.profile__avatar-hover');
const profileImg = document.querySelector('.profile__avatar');

// попап изменения имени/аватара
const popupChangeProfile = document.querySelector('.popup_task_change-profile');
const inputName = popupChangeProfile.querySelector('#name');
const inputDescription = popupChangeProfile.querySelector('#description');
const popupAvatar = document.querySelector('.popup_task_update-avatar');

// попап добавления карточки
const popupAdd = document.querySelector('.popup_task_add');

// селектор контейнера
const containerSelector = '.elements';

const validationSettings = { // селекторы для валидации
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive', // деактивация кнопки
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  patternErrorClass: '.popup__input-error_type_' // шаблон ошибки
}

// массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export {
  buttonProfileInfo,
  buttonAddCard,
  profileData,
  profileAvatar,
  popupAvatar,
  profileImg,
  popupChangeProfile,
  inputName,
  inputDescription,
  popupAdd,
  containerSelector,
  validationSettings,
  initialCards
}