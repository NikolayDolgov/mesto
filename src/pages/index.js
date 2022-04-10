import './index.css'; // добавьте импорт главного файла стилей
//-------------------//
// Импорт переменных //
//-------------------//
import {buttonProfileInfo,
  buttonAddCard,
  profileData,
  profileAvatar,
  popupAvatar,
  popupChangeProfile,
  inputName,
  inputDescription,
  popupAdd,
  containerSelector,
  validationSettings,
  initialCards} from '../utils/constants.js';


import {api} from '../components/Api.js';
//----------------------------//
// Импорт из других JS файлов //
//----------------------------//
import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {FormValidator} from '../components/FormValidator.js';
import {UserInfo} from '../components/UserInfo.js';
import {PopupDeleteCard} from '../components/PopupDeleteCard.js';

const userInfo = new UserInfo(profileData);

let myUserInfo; // Информация пользователя

//api.updateAvatar("https://avatars.mds.yandex.net/i?id=ec7ac223d49401a92c770c31a79e9b64-5859525-images-thumbs&n=13");

//---------//
// функции //
//---------//
function openPropfilePopup() { // Функция вызова PropfilePopup
  const {name, description} = userInfo.getUserInfo();
  inputName.value = name;
  inputDescription.value = description;
  formValidationСhangeProfile.resetValidation(); // проводим валидацию
  popupChangeProfileNew.open(); // открываем попап
}

const sendFormChangeName = (userData, button) => { // Функция перезаписи profile__profile-info 
  api.putchtUser({name: userData.name, about: userData.description})
    .then((res) => {//`res` - это ответ от сервера при успешном запросе, в котором чаще всего вся нужная информация для изменения DOM. Тут делаем все изменения DOM (лайки, удаления, добавления карточки, закрытия попапов и тд     )
      button.textContent = "Сохранение...";
      userInfo.getUserDOM(res);
      popupChangeProfileNew.close();
    })
    .catch((err) =>{ //обязательно ловим возможные ошибки в конце запроса )
      console.log(err);
    })
    .finally(() => {//в этом блоке чаще всего изменяют текст кнопки и скрывают эффект загрузки)
      button.textContent = "Сохранить";
    });
}

const sendFormUpdateAvatar = (userData, button) => { // Функция перезаписи profile__profile-info 
  api.updateAvatar(userData["link-avatar"])
    .then((res) => {//`res` - это ответ от сервера при успешном запросе, в котором чаще всего вся нужная информация для изменения DOM. Тут делаем все изменения DOM (лайки, удаления, добавления карточки, закрытия попапов и тд     )
      button.textContent = "Обновление...";
      userInfo.getUserDOM(res);
      popupAvatarNew.close();
    })
    .catch((err) =>{ //обязательно ловим возможные ошибки в конце запроса )
      console.log(err);
    })
    .finally(() => {//в этом блоке чаще всего изменяют текст кнопки и скрывают эффект загрузки)
      button.textContent = "Сохранить";
    });
}

const sendFormAddCard = (cardData, button) => { // Функция добавления карточки (submit)
  const cardElement = {name: cardData["place-card"], link: cardData["link-card"], likes: [], owner: {_id: myUserInfo._id}, _id: ""};
  api.postCard(cardElement)
    .then((res) => {//`res` - это ответ от сервера при успешном запросе, в котором чаще всего вся нужная информация для изменения DOM. Тут делаем все изменения DOM (лайки, удаления, добавления карточки, закрытия попапов и тд     )
      button.textContent = "Создание...";
      cardElement.name = res.name;
      cardElement.link = res.link;
      cardElement.likes = res.likes;
      cardElement._id = res._id;
      cardElement.owner._id = res.owner._id;
      cardSection.addItem(createCard(cardElement));
      popupAddNew.close();
    })
    .catch((err) =>{ //обязательно ловим возможные ошибки в конце запроса )
      console.log(err);
    })
    .finally(() => {//в этом блоке чаще всего изменяют текст кнопки и скрывают эффект загрузки)
      button.textContent = "Создать";
    });
}

const sendDeleteCard = (cardId, cardElement) => { // Функция удаления карточки (submit)
  api.deleteCard(cardId); // отправка запроса на сервер
  cardElement.remove();
  popupImgDelete.close();
}

const createCard = (cardElement) => { // создание карточки
  const popupImgOpen = () => {
    popupImg.open(cardElement.name, cardElement.link);
  }
  const popupDeleteOpen = (cardId, cardElement) => { //кол-бэк удаления
    popupImgDelete.open(cardId, cardElement); // id только что созданной карточки не найдено
  }
  const card = new Card('#element', myUserInfo, cardElement, popupImgOpen, popupDeleteOpen, api);
	return card.generate();
}

//--------------------//
// экземпляры классов //
//--------------------//

// создадим экземпляр класса Section для записи объектов в DOM
const cardSection = new Section({initialCards, createCard}, containerSelector);

// создадим экземпляры классов для всех поп-апов
const popupAddNew = new PopupWithForm('.popup_task_add', sendFormAddCard);
const popupChangeProfileNew = new PopupWithForm('.popup_task_change-profile', sendFormChangeName);
const popupAvatarNew = new PopupWithForm('.popup_task_update-avatar', sendFormUpdateAvatar);
const popupImg = new PopupWithImage('.popup_task_img');
const popupImgDelete = new PopupDeleteCard('.popup_task_confirm-deletion', sendDeleteCard);

// объявим экземпляры классов для валидации поп-апов
const formValidationСhangeProfile = new FormValidator(validationSettings, popupChangeProfile);
const formValidationAddCard = new FormValidator(validationSettings, popupAdd);
const formValidationUpdateAvatar = new FormValidator(validationSettings, popupAvatar);

//-------------//
// обработчики //
//-------------//
// активируем валидацию форм
formValidationСhangeProfile.enableValidation();
formValidationAddCard.enableValidation();
formValidationUpdateAvatar.enableValidation();

// навешиваем обработчики на попапы
popupAddNew.setEventListeners();
popupChangeProfileNew.setEventListeners();
popupImg.setEventListeners();
popupImgDelete.setEventListeners();
popupAvatarNew.setEventListeners();

// записываем объекты в DOM
// обновление профиля при ответе от сервера
api.getUser()
  .then((res) => {
    // присваиваем полученные значения
    userInfo.getUserDOM(res);
  })
  .catch((err) =>{ //обязательно ловим возможные ошибки в конце запроса)
    console.log(err);
  });

// отрисовка карточек
Promise.all([api.getUser(), api.getInitialCards()]) // не проверено
  .then(([userData, cards]) => {
      // тут установка данных пользователя
      // и тут отрисовка карточек
      myUserInfo = userData;
      cards.forEach(cardElement => {
        cardSection.addItem(createCard(cardElement));
      });
  })
  .catch(err => {
    // тут ловим ошибку
  });

buttonProfileInfo.addEventListener('click', function() {  // обаботчик изменения имени/о себе
  openPropfilePopup();
});

buttonAddCard.addEventListener('click', function() { // обаботчик добавления карточки
  popupAddNew.open();
  formValidationAddCard.resetValidation(); // проводим валидацию
});

profileAvatar.addEventListener('click', function() { // обаботчик обновления аватара
  popupAvatarNew.open();
  formValidationUpdateAvatar.resetValidation(); // проводим валидацию
});