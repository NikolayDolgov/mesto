//---------------------------------------//
// объявление и инициализация переменных //
//---------------------------------------//

//---------//
// функции //
//---------//
const enableValidation = (validationSettings) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
  //const popupForm = document.querySelector(validationSettings.formSelector);
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

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
  
  // Вызовем toggleButtonState как только откроется попап
  toggleButtonState(inputList, buttonElement);

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

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
  }
};

// Функция, которая проверяет валидность поля
const isValid = (popupForm, formInput) => {
  if (!formInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(popupForm, formInput, formInput.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(popupForm, formInput);
  }
};

// Функция, которая добавляет класс с ошибкой
const showInputError = (popupForm, formInput, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const formError = popupForm.querySelector(`${validationSettings.patternErrorClass}${formInput.id}`);
  formInput.classList.add(validationSettings.inputErrorClass);
  // Заменим содержимое span с ошибкой на переданный параметр
  formError.textContent = errorMessage;
  // Показываем сообщение об ошибке
  formError.classList.add(validationSettings.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (popupForm, formInput) => {
  const formError = popupForm.querySelector(`${validationSettings.patternErrorClass}${formInput.id}`);

  formInput.classList.remove(validationSettings.inputErrorClass);
  
  formError.classList.remove(validationSettings.errorClass);
  // Очистим ошибку
  formError.textContent = '';
};

const hasInvalidInput = (inputList) => { // Функция принимает массив полей
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
};

//-------------//
// обработчики //
//-------------//