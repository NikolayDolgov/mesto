import './index.css'; // добавьте импорт главного файла стилей
//-------------------//
// Импорт переменных //
//-------------------//
import {buttonProfileInfo,
  buttonAddCard,
  profileData,
  profileAvatar,
  popupAvatar,
  profileImg,
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
import {Popup} from '../components/Popup';
import {PopupDeleteCard} from '../components/PopupDeleteCard.js';
import {PopupUpdateAvatar} from '../components/PopupUpdateAvatar.js';

const userInfo = new UserInfo(profileData);

let myId; // Id пользователя

api.getUser()
.then((user) => {
  myId = user._id;
});

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

const sendFormChangeName = (inputName, inputDescription, button) => { // Функция перезаписи profile__profile-info 
  button.textContent = "Сохранение...";
  userInfo.setUserInfo(inputName, inputDescription);
  button.textContent = "Сохранить";
  popupChangeProfileNew.close();
}

const sendFormUpdateAvatar = (link, button) => { // Функция перезаписи profile__profile-info 
  button.textContent = "Обновление...";
  api.updateAvatar(link)
    .then(res => {
      profileImg.src = link;
    })
  button.textContent = "Сохранить";
  popupAvatarNew.close();
}

const sendFormAddCard = (name, link, button) => { // Функция добавления карточки (submit)
  button.textContent = "Создание...";
  const cardElement = {name: name, link: link, likes: [], owner: {_id: myId}, _id: ""};
  api.postCard(cardElement)
    .then(res => {
      cardElement.name = res.name;
      cardElement.link = res.link;
      cardElement.likes = res.likes;
      cardElement._id = res._id;
      cardElement.owner._id = res.owner._id;
    }); // отправка на сервер
  
  cardSection.addItem(createCard(cardElement));
    
  //const card = {name: "Карта", link: "https://avatars.mds.yandex.net/i?id=ec7ac223d49401a92c770c31a79e9b64-5859525-images-thumbs&n=13"}
  
  button.textContent = "Создать";
  popupAddNew.close();
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
  const card = new Card('#element', myId, cardElement, popupImgOpen, popupDeleteOpen, api);
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
const popupImg = new PopupWithImage('.popup_task_img');
const popupImgDelete = new PopupDeleteCard('.popup_task_confirm-deletion', sendDeleteCard);
const popupAvatarNew = new PopupUpdateAvatar('.popup_task_update-avatar', sendFormUpdateAvatar);

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

// записываем объекты массива в DOM
//cardSection.renderingAllItems();
api.getInitialCards()
  .then((cards) => {
    cards.forEach(cardElement => {
      cardSection.addItem(createCard(cardElement));
    });
  });

  const user = {name: "Имя", about: "О себе"}
  api.putchtUser(user);

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