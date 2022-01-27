//---------------------------------------//
// объявление и инициализация переменных //
//---------------------------------------//
// изначальные переменные
let buttonProfileInfo = document.querySelector('.profile__button-name');
let buttonAddCard = document.querySelector('.profile__add-button');
let profileInfo = document.querySelector('.profile');
let profileTitle = profileInfo.querySelector('.profile__title-name');
let profileText = profileInfo.querySelector('.profile__text');
// для elements
let buttonViewElements = document.querySelector('.elements');
let buttonDeleteElements = buttonViewElements;
// переменные формы
let popup = document.querySelector('.popup'); 
let popupContainer = popup.querySelector('.popup__container'); 
let popupClose = popupContainer.querySelector('.popup__close');
// поля ввода
let inputTitleName = popupContainer.querySelector('#title');
let inputText = popupContainer.querySelector('#text');
let inputPlace = popupContainer.querySelector('#place-card');
let inputLink = popupContainer.querySelector('#link-card');

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
// получаем селекторы для заполнения листа
const elementTemplate = document.querySelector('#element').content;
const elementOnline = document.querySelector('.elements');

//---------//
// функции //
//---------//
function openForm() { // функция открытия формы
  outputPlaceholder();
  popup.classList.add('popup_opened'); //добавляем класс
}

function outputPlaceholder () { // Функция для заполнения placeholder
  inputTitleName.value = profileTitle.textContent;
  inputText.value = profileText.textContent;
}

function formSubmitHandler(evt) { // Функция перезаписи profile__profile-info 
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Перезапись атрибута textContent
  profileTitle.textContent = inputTitleName.value;
  profileText.textContent = inputText.value;
  closeForm ();
}

function formAddCardSubmitHandler(evt) { // Функция добавления карточки
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // клонируем и перезаписываем
  const  cardElement = elementTemplate.querySelector('.elements__element').cloneNode(true);
  cardElement.querySelector('.elements__img').src = inputLink.value;
  cardElement.querySelector('.elements__img').alt = inputPlace.value;
  cardElement.querySelector('.elements__text').textContent = inputPlace.value;
  // добавляем на страницу
  elementOnline.prepend(cardElement);

  closeForm ();
}

function closeForm() { // Функция закрытия формы
  if (popupContainer.querySelector('.form').classList.contains('form_opend')) {
    popupContainer.querySelector('.form').classList.remove('form_opend');
  }
  if (popupContainer.querySelector('.form-card').classList.contains('form-card_opend')) {
    popupContainer.querySelector('.form-card').classList.remove('form-card_opend');
  }
  popup.classList.remove('popup_opened'); // удаляем класс
}

//-------------//
// обработчики //
//-------------//
// записываем объекты массива в DOM
Array.from(initialCards).forEach((item) => {
  const  cardElement = elementTemplate.querySelector('.elements__element').cloneNode(true);
  cardElement.querySelector('.elements__img').src = item.link;
  cardElement.querySelector('.elements__img').alt = item.name;
  cardElement.querySelector('.elements__text').textContent = item.name;
  // добавляем на страницу
  elementOnline.append(cardElement);
});

buttonProfileInfo.addEventListener('click', function () { // обаботчик изменения имени/должности
  openForm(); // открываем попап
  popupContainer.querySelector('.form').classList.add('form_opend');
});

buttonAddCard.addEventListener('click', function () { // обаботчик добавления карточки
  openForm(); // открываем попап
  popupContainer.querySelector('.form-card').classList.add('form-card_opend');
});

popupContainer.querySelector('.form').addEventListener('submit', formSubmitHandler);
popupContainer.querySelector('.form-card').addEventListener('submit', formAddCardSubmitHandler);
popupClose.addEventListener('click', closeForm);

buttonViewElements.addEventListener('click', function (evt) { // функция оценки (лайк)
  const eventTarget = evt.target;

  if(eventTarget.classList.contains('elements__button-view')) {
    eventTarget.classList.toggle('elements__element_active');
  }
});

/*buttonDeleteElements.addEventListener('click', function (evt) { // функция удаления
  const eventTarget = evt.target;

  if(eventTarget.classList.contains('elements__button-delete')) {
    const listItem = deleteButton.closest('.elements__element');
    listItem.remove();
  }
});*/