//---------------------------------------//
// объявление и инициализация переменных //
//---------------------------------------//

//---------//
// функции //
//---------//
/*const enableValidation = (validationSettings) => {
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
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
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
  formError.textContent = ''; // Очистим ошибку
};

const hasInvalidInput = (inputList) => { // Функция принимает массив полей
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const doValidForm = (popup) => { // проверка валидности формы
  const formPopup = popup.querySelector(validationSettings.formSelector);
  const inputform = Array.from(formPopup.querySelectorAll(validationSettings.inputSelector));
  const buttonform = formPopup.querySelector(validationSettings.submitButtonSelector);
  toggleButtonState(inputform, buttonform); // проверяем кнопку
}

const hideErrorForm = (popup) => { // скрытие ошибок у форм с всегда корректными значениями
  const formPopup = popup.querySelector(validationSettings.formSelector);
  const inputform = Array.from(formPopup.querySelectorAll(validationSettings.inputSelector));
  inputform.forEach((input) => {
    hideInputError(formPopup, input);
  });
}*/

//-------------//
// обработчики //
//-------------//

/*enableValidation(validationSettings); // включение валидации
*/



class FormValidator {
	constructor(validationSettings, popupForm) {
    this._formSelector = validationSettings.formSelector;
    this._inputSelector = validationSettings.inputSelector;
    this._submitButtonSelector = validationSettings.submitButtonSelector;
    this._inactiveButtonClass = validationSettings.inactiveButtonClass;
    this._inputErrorClass = validationSettings.inputErrorClass;
    this._errorClass = validationSettings.errorClass;
    this._patternErrorClass = validationSettings.patternErrorClass;

    this._popupForm = popupForm;
	}
 
  ///////////////////

 //форм инпут
  _setEventListeners() {
      // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(this._popupForm.querySelectorAll(this._inputSelector));
  
    // Обойдём все элементы полученной коллекции
    inputList.forEach((formInput) => {
      // каждому полю добавим обработчик события input
      formInput.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        this._isValid(formInput);
        
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        this._toggleButtonState();
      });
    });
  }; 

  _isValid(formInput) {
    if (!formInput.validity.valid) { //форм инпут
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(formInput);
    } else {
      // Если проходит, скроем
      this._hideInputError(formInput);
    }
  }


// id у форм input
  _showInputError(formInput) {
    const formError = this._popupForm.querySelector(`${this._patternErrorClass}${formInput.id}`);
    formInput.classList.add(this._inputErrorClass); // элементы фореч из input list
    // Заменим содержимое span с ошибкой на переданный параметр
    formError.textContent = formInput.validationMessage;
    // Показываем сообщение об ошибке
    formError.classList.add(this._errorClass);
  }

  _hideInputError(formInput) {
    const formError = this._popupForm.querySelector(`${this._patternErrorClass}${formInput.id}`);
    formInput.classList.remove(this._inputErrorClass); // элементы фореч из input list
    console.log(this._popupForm);
    formError.classList.remove(this._errorClass);
    formError.textContent = ''; // Очистим ошибку
  }

  _toggleButtonState() {
    const buttonElement = this._popupForm.querySelector(this._submitButtonSelector);
    if (this._hasInvalidInput()) {
      // сделай кнопку неактивной
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute("disabled", "disabled");
    } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  }

  _hasInvalidInput() {
    const inputList = Array.from(this._popupForm.querySelectorAll(this._inputSelector));
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  /////////////////
  
  enableValidation() {
    this._setEventListeners();
  }

  // метод очистки ошибок и валидации форм

  doValidForm() { // проверка валидности формы
    this._toggleButtonState(); // проверяем кнопку
  }
  
  hideErrorForm() { // скрытие ошибок у форм с всегда корректными значениями
    const inputform = Array.from(this._popupForm.querySelectorAll(this._inputSelector));
    inputform.forEach((input) => {
      this._hideInputError(input);
    });
  }
}

const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
// Переберём полученную коллекцию
formList.forEach((popupForm) => {
  popupForm.addEventListener('submit', (evt) => {
    // У каждой формы отменим стандартное поведение
    evt.preventDefault();
  });
  const popupFormValidation = new FormValidator(validationSettings, popupForm);
  popupFormValidation.enableValidation();
});

const popupFormValidationTwo = new FormValidator(validationSettings, popupChangeProfile);
const popupFormValidationAdd = new FormValidator(validationSettings, popupAdd);