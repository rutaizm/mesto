import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { initialCards, config, profileForm, photoForm,
  buttonProfile, formProfilePopup, nameInput, jobInput, name, job,
  buttonAddPhoto, photoPopupForm, placeInput, linkInput, photoList} from "../utils/constants.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import "../pages/index.css"
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";

let userId;

const api = new Api({
  url:'https://mesto.nomoreparties.co/v1/cohort-41/',
  headers: {
    authorization: "381dea00-c956-4a18-991b-777a11869f64",
    "Content-Type":"application/json", 
  }
});

Promise.all ([
  api.getInitialCards(),
  api.getProfileInfo(),
])
  .then((res) => {
    const [cards, user] = res;
    defaultCards.renderItems(cards);
    userInfoForm.setInputValues(user.name, user.about);
    userId = user._id;
  })
  .catch((err) => console.log(err));



const defaultCards = new Section ({
  renderer: (item) => {
    const cardElement = createCard (item, '.photo-template', handleCardClick, api, userId);
    defaultCards.addItem(cardElement);
  }
}, '.elements__photoes');  

const userInfo = new UserInfo(name, job);

// сабмиты
function submitProfileForm (userInputs) {
  api.editProfileInfo(userInputs.name, userInputs.about)
     .then((data) => {
        userInfo.setUserInfo(data);
        userInfoForm.closePopup();
     }) 
     .catch((err) => console.log(err));
}

function submitCard(userInputs) {
  const newItem = api.addCard(userInputs.name, userInputs.link, userInputs._id);
    newItem.then((data) => {
      const newCard = createCard (data,'.photo-template', handleCardClick, api, userId);
      defaultCards.prependItem(newCard);
      editPhotoForm.closePopup();
  })
  .catch((err) => console.log("Ошибка"(err)));
}

const info = api.getProfileInfo(); // тут разобраться
info.then((data) => { 
     userInfo.getUserInfo(data.name, data.about);
     userInfoForm.setInputValues(data);
     userInfo.setUserInfo(data);
}); 
// слушатели
buttonProfile.addEventListener('click', () => {
  userInfoForm.setInputValues(userInfo.getUserInfo());
  profileFormValidation.resetFormValidation();   
  userInfoForm.openPopup();
}); 

buttonAddPhoto.addEventListener('click', () => {
  photoFormValidation.resetFormValidation();
  editPhotoForm.openPopup();
});

// deleteButton.addEventListener('click', () => {
//   confirmDelete.openPopup();
// });

// console.log (deleteButton);
// console.log(buttonProfile);

function handleCardClick(src, name, alt) {
  showBigPhoto.openPopup(src, name, alt);
}

function createCard (data, cardSelector,handleCardClick, api, userId) {
  const card = new Card (data, cardSelector, handleCardClick, api, userId);
  return card.generateCard();
}

//попапы
const userInfoForm = new PopupWithForm('.popup-edit', submitProfileForm);
const editPhotoForm = new PopupWithForm('.popup-photo', submitCard);
const showBigPhoto = new PopupWithImage('.image-popup');
// const confirmDelete = new PopupWithConfirmation('.confirmation-popup',);
userInfoForm.setEventListeners();
editPhotoForm.setEventListeners();
showBigPhoto.setEventListeners();
// confirmDelete.setEventListeners();

//валидация форм 
const profileFormValidation = new FormValidator (config, profileForm);
const photoFormValidation = new FormValidator (config, photoForm);
profileFormValidation.enableValidation();
photoFormValidation.enableValidation();