//---------------------------------------//
// объявление и инициализация переменных //
//---------------------------------------//
// изначальные переменные
let buttonProfileInfo = document.querySelector('.profile__button-name');
let profileInfo = document.querySelector('.profile');
let profileTitle = profileInfo.querySelector('.profile__title-name');
let profileText = profileInfo.querySelector('.profile__text');
// переменные формы
let popup = document.querySelector('.popup'); 
let popupContainer = popup.querySelector('.popup__container'); 
let popupClose = popupContainer.querySelector('.popup__close'); 
let inputTitleName = popupContainer.querySelectorAll('#title')[0];
let inputText = popupContainer.querySelectorAll('#text')[0];

//---------//
// функции //
//---------//
function openForm() { // функция открытия формы
  outputPlaceholder ();
  popup.classList.add('popup_opened'); //добавляем класс
}

function outputPlaceholder () { // Функция для заполнения placeholder
  /*// Перезапись атрибута placeholder
  inputTitleName.placeholder = profileTitle.textContent;
  inputText.placeholder = profileText.textContent;
  // Перезапись атрибута value (чтобы можно было вводить без очистки input)
  inputTitleName.value = '';
  inputText.value = '';*/
  
  inputTitleName.value = profileTitle.textContent;
  inputText.value = profileText.textContent;
}

function formSubmitHandler(evt) { // Функция перезаписи profile__profile-info 
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // блокирует перезапись пустым значением
  if(inputTitleName.value !== '' && inputText !== '')
  {
    // Перезапись атрибута textContent
    profileTitle.textContent = inputTitleName.value;
    profileText.textContent = inputText.value;
    closeForm ();
  }
}

function closeForm() { // Функция закрытия формы
  popup.classList.remove('popup_opened'); //удаляем класс
}

//-------------//
// обработчики //
//-------------//
buttonProfileInfo.addEventListener('click', openForm);
popupContainer.addEventListener('submit', formSubmitHandler);
popupClose.addEventListener('click', closeForm);

// Большое спасибо, не знаю как Вам, а мне стало понятней :)