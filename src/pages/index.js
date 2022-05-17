import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { initialCards, config, profileForm, photoForm,
  buttonProfile, formProfilePopup, nameInput, jobInput, name, job,
  buttonAddPhoto, photoPopupForm, placeInput, linkInput, photoList } from "../utils/constants.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import "../pages/index.css"

const api = new Api({
  url:'https://mesto.nomoreparties.co/v1/cohort-41/',
  headers: {
    authorization: "381dea00-c956-4a18-991b-777a11869f64",
    "Content-Type":"application/json", 
  }
});

const cards = api.getInitialCards();
cards.then((data) => {
  const defaultCards = new Section ({
    items: data,
    renderer: (item) => {
      const cardElement = createCard (item, '.photo-template', handleCardClick, api);
      defaultCards.addItem(cardElement);
    }
  },
  '.elements__photoes');  
  defaultCards.renderItems();
})  
    .catch((err) => console.log("Ошибка"(err)));

const userInfo = new UserInfo(name, job);

// сабмиты
function submitProfileForm (userInputs) {
  api.editProfileInfo(userInputs.name, userInputs.about)
     .then((data) => {
        userInfo.setUserInfo(data);
        userInfoForm.closePopup();
     }) 
     .catch((err) => console.log("Ошибка"(err)));
}

function submitCard(userInputs) {
  const newItem = api.addCard(userInputs.name, userInputs.link, userInputs._id);
    newItem.then((data) => {
      const newCard = createCard (data,'.photo-template', handleCardClick, api);
      cards.prependItem(newCard);
      editPhotoForm.closePopup();
  })
  .catch((err) => console.log("Ошибка"(err)));
}

const info = api.getProfileInfo();
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

function handleCardClick(src, name, alt) {
  showBigPhoto.openPopup(src, name, alt);
}

function createCard (data, cardSelector,handleCardClick, api) {
  const card = new Card (data, cardSelector, handleCardClick, api);
  return card.generateCard();
}

//попапы
const userInfoForm = new PopupWithForm('.popup-edit', submitProfileForm);
const editPhotoForm = new PopupWithForm('.popup-photo', submitCard);
const showBigPhoto = new PopupWithImage('.image-popup');
userInfoForm.setEventListeners();
editPhotoForm.setEventListeners();
showBigPhoto.setEventListeners();

//валидация форм 
const profileFormValidation = new FormValidator (config, profileForm);
const photoFormValidation = new FormValidator (config, photoForm);
profileFormValidation.enableValidation();
photoFormValidation.enableValidation();