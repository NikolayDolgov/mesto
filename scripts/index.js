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
// получаем селекторы для заполнения листа
const elementTemplate = document.querySelector('#element').content;

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

//---------//
// функции //
//---------//
// cardElement - карточка
// cardName - название карточки
// cardLink - ссылка на карточку
// card - результат выполнения
function createCard (cardElement, cardName, cardLink) {
  const  card = cardElement.querySelector('.elements__element').cloneNode(true);
  card.querySelector('.elements__img').src = cardLink;
  card.querySelector('.elements__img').alt = cardName;
  card.querySelector('.elements__text').textContent = cardName;

  // добавляем обработчики
  card.querySelector('.elements__button-view').addEventListener('click', function (evt) { // обработчик оценки
    const eventTarget = evt.target;
    eventTarget.classList.toggle('elements__element_active');
  });

  card.querySelector('.elements__button-delete').addEventListener('click', function () { // обработчик удаления
    card.remove();
  });

  card.querySelector('.elements__img').addEventListener('click', function (evt) { // обработчик открытия img карточки
    const eventTarget = evt.target;
    openImgPopup(eventTarget);
  });

  return card;
}

function openPopup(popup) { // открытие попап
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', identifyButtonDown); // добавляем слушатель
}

function openPropfilePopup() { // Функция вызова PropfilePopup
  // заполняем value
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;

  openPopup(popupChangeProfile); // открываем попап
  doValidForm(popupChangeProfile);
}

function openAddCardPopup() { // Функция вызова addCardPopup
  openPopup(popupAdd); // открываем попап
  doValidForm(popupAdd);
}

function openImgPopup(eventTarget) { // Функция вызова ImgPopup
  // записываем переменные в img
  figureImgData.src = eventTarget.src;
  figureImgData.alt = eventTarget.alt;
  figureCaption.textContent = eventTarget.alt;
  
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
  cardContainer.prepend(createCard(elementTemplate, inputPlace.value, inputLink.value)); // вызываем метод создания карточки
  closePopup(popupAdd);
  formAddCard.reset();// очистка формы
}

const closePopup = (popup) => { // закрытие попап
  popup.classList.remove('popup_opened');
  if(popup.classList.contains('popup_task_add')) // очищаем форму добавления картоки
    formAddCard.reset();
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

//-------------//
// обработчики //
//-------------//
// записываем объекты массива в DOM
initialCards.forEach((item) => {
  cardContainer.append(createCard(elementTemplate, item.name, item.link));
});

buttonProfileInfo.addEventListener('click', function() {  // обаботчик изменения имени/о себе
  openPropfilePopup()
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