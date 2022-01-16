// Открываем форму
let buttonName = document.querySelector('.profile__button-name');
function openForm() {
  formSpaceholder (); // запускаем функцию для заполнения input of profile
  let popup = document.querySelector('.popup');
  popup.classList.add('popup_opened');
}
buttonName.addEventListener('click', openForm);

// Функция для заполнения input of profile
function formSpaceholder () {
  // Находим profile
  let profileElements = document.querySelector('.profile');

  // Поиск значений полей profile и их запись в переменные
  let nameInputOld = profileElements.querySelector('.profile__title-name');
  let jobInputOld = profileElements.querySelector('.profile__text');
  // Находим popup
  let popupElements = document.querySelector('.popup');
  // Поиск значений полей popup и их запись в массив
  let inputAll = popupElements.querySelectorAll('.popup__input');

  // Перезапись атрибута placeholder в массиве и вывод в консоль
  inputAll[0].placeholder = nameInputOld.textContent;
  inputAll[1].placeholder = jobInputOld.textContent;

   // Перезапись атрибута value в массиве
  nameInputOld.textContent = nameInputOld.textContent;
  jobInputOld.value = jobInputOld.textContent;
  
  // Перезапись атрибута value в массиве
  inputAll[0].value = '';
  inputAll[1].value = '';
}

// Находим форму в DOM
let formElement = document.querySelector('.popup__container');// Воспользуйтесь методом querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.   

  // Получите значение полей jobInput и nameInput из свойства value
  let nameInput = formElement.querySelectorAll('.popup__input')[0].value;
  let jobInput = formElement.querySelectorAll('.popup__input')[1].value;
  
  // Выберите элементы, куда должны быть вставлены значения полей
  let profileElements = document.querySelector('.profile');
  let newNameInput = profileElements.querySelector('.profile__title-name');
  let newJobInput = profileElements.querySelector('.profile__text');

  // Вставьте новые значения с помощью textContent
  newNameInput.textContent = nameInput;
  newJobInput.textContent = jobInput;

  // закрываем форму
  let popup = document.querySelector('.popup');
  popup.classList.toggle('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

// Закрываем форму
let closePopup = document.querySelector('.popup__close');
function closeForm() {
  let popup = document.querySelector('.popup');
  popup.classList.remove('popup_opened');
}
closePopup.addEventListener('click', closeForm);