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

// валидация //
// Вынесем все необходимые элементы формы в константы
const popupForm = document.querySelector('.popup__form');
const formInput = popupForm.querySelector('.popup__input');

// попап изменения
const popupChangeProfile = document.querySelector('.popup_task_change-profile');
const popupChangeProfileClose = popupChangeProfile.querySelector('.popup__close');
// поля ввода
const inputName = popupChangeProfile.querySelector('#name');
const inputDescription = popupChangeProfile.querySelector('#description');

// попап добавления
const popupAdd = document.querySelector('.popup_task_add');
const popupAddClose = popupAdd.querySelector('.popup__close');
const inputPlace = popupAdd.querySelector('#place-card');
const inputLink = popupAdd.querySelector('#link-card');
// получаем селекторы для заполнения листа
const elementTemplate = document.querySelector('#element').content;

// попап открытия
const popupImg = document.querySelector('.popup_task_img');
const popupImgClose = popupImg.querySelector('.popup__close');

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
}

function openPropfilePopup() { // Функция вызова PropfilePopup
  // заполняем value
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;

  openPopup(popupChangeProfile); // открываем попап
}

function openImgPopup(eventTarget) { // Функция вызова ImgPopup
  // записываем переменные в img
  popupImg.querySelector('.figure__img').src = eventTarget.src;
  popupImg.querySelector('.figure__img').alt = eventTarget.alt;
  popupImg.querySelector('.figure__caption').textContent = eventTarget.alt;
  
  openPopup(popupImg); // открываем попап
}

function formChangeNameSubmitHandler(evt) { // Функция перезаписи profile__profile-info 
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Перезапись атрибута textContent
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupChangeProfile);
}

function formAddCardSubmitHandler(evt) { // Функция добавления карточки
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // вызываем метод создания карточки
  cardContainer.prepend(createCard(elementTemplate, inputPlace.value, inputLink.value));
  // закрываем форму
  closePopup(popupAdd);
  // очистка формы
  popupAdd.querySelector('#add-card').reset();
}

/// валидация ///
// Функция, которая добавляет класс с ошибкой
const showInputError = (popupForm, formInput, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const formError = popupForm.querySelector(`.${formInput.id}-input-error`);
  formInput.classList.add('popup__input_type_error');//?
  // Заменим содержимое span с ошибкой на переданный параметр
  formError.textContent = errorMessage;
  // Показываем сообщение об ошибке
  formError.classList.add('popup__input-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (popupForm, formInput) => {
  const formError = popupForm.querySelector(`.${formInput.id}-input-error`);
  
  formInput.classList.remove('popup__input_type_error');
  
  formError.classList.remove('popup__input-error_active');
  // Очистим ошибку
  formError.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (popupForm, formInput) => {
  console.log('work');
  if (!formInput.validity.valid) {
    console.log('work');
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(popupForm, formInput, formInput.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(popupForm, formInput);
  }
};

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  

  // Обойдём все элементы полученной коллекции
  inputList.forEach((formInput) => {
    // каждому полю добавим обработчик события input
    formInput.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, formInput);

          // Вызовем toggleButtonState и передадим ей массив полей и кнопку
  toggleButtonState(inputList, buttonElement);

    });
  });
};

const hasInvalidInput = (inputList) => { // Функция принимает массив полей
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    console.log(inputElement);
    console.log(!inputElement.validity.valid);
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('popup__button_inactive');
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__button_inactive');
  }
};


const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach((popupForm) => {
    popupForm.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });
    
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(popupForm);
  });
};

// Вызовем функцию
enableValidation();

function closePopup(popup) { // закрытие попап
  popup.classList.remove('popup_opened');
}

//-------------//
// обработчики //
//-------------//
// записываем объекты массива в DOM
initialCards.forEach((item) => {
  cardContainer.append(createCard(elementTemplate, item.name, item.link));
});

buttonProfileInfo.addEventListener('click', function() {  // обаботчик изменения имени/должности
  openPropfilePopup()
});

buttonAddCard.addEventListener('click', function() { // обаботчик добавления карточки
  openPopup(popupAdd);
});

// обработчики форм
// Вызовем функцию isValid на каждый ввод символа
/*formInput.addEventListener('input',  function() {
  console.log("work");
  isValid();
}); */

popupChangeProfile.querySelector('.popup__form').addEventListener('submit', formChangeNameSubmitHandler);
popupAdd.querySelector('.popup__form').addEventListener('submit', formAddCardSubmitHandler);

// закрытие попап
popupChangeProfileClose.addEventListener('click', function() {
  closePopup(popupChangeProfile)
});

popupAddClose.addEventListener('click', function() {
  closePopup(popupAdd)
});

popupImgClose.addEventListener('click', function() {
  closePopup(popupImg)
});