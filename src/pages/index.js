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

import "../pages/index.css"

const userInfo = new UserInfo(name, job);

// сабмиты
function submitProfileForm (userInputs) {
  userInfo.setUserInfo(userInputs);
  userInfoForm.closePopup();
}

function submitCard(userInputs) {
  const newCard = createCard (userInputs,'.photo-template', handleCardClick);
  defaultCards.prependItem(newCard);
  editPhotoForm.closePopup();
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

function createCard (data, cardSelector) {
  const card = new Card (data, cardSelector, handleCardClick);
  return card.generateCard();
}

const defaultCards = new Section ({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard (item, '.photo-template', handleCardClick);
    defaultCards.addItem(cardElement);
  }
},
'.elements__photoes');

defaultCards.renderItems();