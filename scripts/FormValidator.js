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
        this.toggleButtonState();
      });
    });
  }; 

  _isValid(formInput) {
    if (!formInput.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(formInput);
    } else {
      // Если проходит, скроем
      this._hideInputError(formInput);
    }
  }

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
    formError.classList.remove(this._errorClass);
    formError.textContent = ''; // Очистим ошибку
  }

  toggleButtonState() { // публичный метод, для использования при открытии поп-апа
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
  
  // публичный метод включения валидации
  enableValidation() {
    this._setEventListeners();
  }

  // публичный метод очистки ошибок при открытии поп-апа
  hideErrorForm() { // скрытие ошибок у форм с всегда корректными значениями
    const inputform = Array.from(this._popupForm.querySelectorAll(this._inputSelector));
    inputform.forEach((input) => {
      this._hideInputError(input);
    });
  }
}

export {FormValidator};