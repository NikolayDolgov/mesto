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
    this._submitButton = this._popupForm.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._popupForm.querySelectorAll(this._inputSelector));
  }
 
  _setEventListeners() {
    // Обойдём все элементы формы
    this._inputList.forEach((formInput) => {
      // каждому полю добавим обработчик события input
      formInput.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        this._isValid(formInput);
        
        // Вызовем _toggleButtonState и передадим ей массив полей и кнопку
        this._toggleButtonState();
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

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      // сделай кнопку неактивной
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute("disabled", "disabled");
    } else {
      // иначе сделай кнопку активной
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute("disabled");
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  
  // публичный метод включения валидации
  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._toggleButtonState(); // деактивация/активация кнопки
    this._inputList.forEach((input) => { // проверка на наличие ошибок
      this._hideInputError(input);
    });
  }
}

export {FormValidator};