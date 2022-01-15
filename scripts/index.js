// Открываем форму
let buttonName = document.querySelector('.profile__button-name');
function openForm() {
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
  console.log(inputAll[0].placeholder = nameInputOld.textContent);
  console.log(inputAll[1].placeholder = jobInputOld.textContent);
  return inputAll;
}
formSpaceholder ();

// Находим форму в DOM
let formElement = document.querySelector('.popup__container');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelectorAll('.popup__input')[0];// Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelectorAll('.popup__input')[1];// Воспользуйтесь инструментом .querySelector()
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.                                          
  // Получите значение полей jobInput и nameInput из свойства value
  nameInput = nameInput.value;
  jobInput = jobInput.value;
  // Проверяем наличие value
  if (nameInput.value === '') {
    inputAll = formSpaceholder ();
    nameInput.textContent = inputAll[0].placeholder;
    jobInput.textContent = inputAll[1].placeholder;
  }
  else {
    // Выберите элементы, куда должны быть вставлены значения полей
    let profileElements = document.querySelector('.profile');
    let newNameInput = profileElements.querySelector('.profile__title-name');
    let jobNameInput = profileElements.querySelector('.profile__text');
    // Вставьте новые значения с помощью textContent
    console.log(newNameInput.textContent = nameInput);
    console.log(jobNameInput.textContent = jobInput);
  }
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

// Постановка/снятие "лайков"
let buttonLike = document.querySelector('.elements');
function LikeСheck() {

  let like = document.querySelector('.elements');
  /*if (like.classList.contains('element__button-view_active') === true) {
    like.classList.toggle('element__button-view_active');
    like.classList.toggle('element__button-view_disabled');
  } 
  else {
    like.classList.toggle('element__button-view_active');
    like.classList.toggle('element__button-view_disabled');
  }*/

    document.addEventListener('click', function (e) {
      if (e.target.tagName === 'BUTTON') {
        //e.target.remove();
        let likeName = like.querySelectorAll('.element__button-view');
        if (likeName.classList.contains('element__button-view_active') === true) {
            likeName.classList.toggle('element__button-view_active');
            likeName.classList.toggle('element__button-view_disabled');
          } 
          else {
            likeName.classList.toggle('element__button-view_active');
            likeName.classList.toggle('element__button-view_disabled');
          }
      }
    });
}
buttonLike.addEventListener('click', LikeСheck);