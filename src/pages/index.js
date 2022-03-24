import './index.css'; // добавьте импорт главного файла стилей
//-------------------//
// Импорт переменных //
//-------------------//
import {buttonProfileInfo,
  buttonAddCard,
  profileData,
  popupChangeProfile,
  inputName,
  inputDescription,
  popupAdd,
  containerSelector,
  validationSettings,
  initialCards} from '../utils/constants.js';

//----------------------------//
// Импорт из других JS файлов //
//----------------------------//
import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {FormValidator} from '../components/FormValidator.js';
import {UserInfo} from '../components/UserInfo.js';

const userInfo = new UserInfo(profileData);

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

const sendFormChangeName = (inputName, inputDescription) => { // Функция перезаписи profile__profile-info 

  userInfo.setUserInfo(inputName, inputDescription);
 
  popupChangeProfileNew.close();
}

const sendFormAddCard = (inputPlace, inputLink) => { // Функция добавления карточки (submit)
  cardSection.addItem(createCard(inputPlace, inputLink));
  popupAddNew.close();
}

const createCard = (name, link) => { // создание карточки
  const popupImgOpen = () => {
    popupImg.open(name, link);
  }
  const card = new Card('#element', name, link, popupImgOpen);
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

// объявим экземпляры классов для валидации поп-апов
const formValidationСhangeProfile = new FormValidator(validationSettings, popupChangeProfile);
const formValidationAddCard = new FormValidator(validationSettings, popupAdd);

//-------------//
// обработчики //
//-------------//
// активируем валидацию форм
formValidationСhangeProfile.enableValidation();
formValidationAddCard.enableValidation();

// навешиваем обработчики на попапы
popupAddNew.setEventListeners();
popupChangeProfileNew.setEventListeners();
popupImg.setEventListeners();

// записываем объекты массива в DOM
cardSection.renderingAllItems();

buttonProfileInfo.addEventListener('click', function() {  // обаботчик изменения имени/о себе
  openPropfilePopup();
});

buttonAddCard.addEventListener('click', function() { // обаботчик добавления карточки
  popupAddNew.open();
  formValidationAddCard.resetValidation(); // проводим валидацию
});