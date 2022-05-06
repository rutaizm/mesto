import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/validation.js";
import { Section } from "../scripts/section.js";
import { Popup } from "../scripts/Popup.js";
import { PopupWithForm } from "../scripts/PopupWithForm.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import { initialCards, config, profileForm, photoForm,
  buttonProfile, formProfilePopup, nameInput, jobInput, name, job,
  buttonAddPhoto, photoPopupForm, placeInput, linkInput, photoList } from "../scripts/utils.js";
import { UserInfo } from "../scripts/UserInfo.js";

import "../pages/index.css"

const userInfo = new UserInfo(name, job);

// сабмиты
function submitProfileForm (userInputs) {
  userInfo.setUserInfo(userInputs);
  this.closePopup();
}

function submitCard(userInputs) {
  const newCard = createCard ({name:placeInput.value, link: linkInput.value},'.photo-template', handleCardClick);
  photoList.prepend(newCard);
  editPhotoForm.closePopup();
}

//попапы
 const userInfoForm = new PopupWithForm('.popup-edit', submitProfileForm);
 const editPhotoForm = new PopupWithForm('.popup-photo', submitCard);
 const showBigPhoto = new PopupWithImage('.image-popup');

//валидация форм 
const profileFormValidation = new FormValidator (config, profileForm);
const photoFormValidation = new FormValidator (config, photoForm);
profileFormValidation.enableValidation();
photoFormValidation.enableValidation();


// слушатели
buttonProfile.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value =userData.name;
  jobInput.value = userData.job; 
  profileFormValidation.resetFormValidation();
  userInfoForm.openPopup();
}); 

buttonAddPhoto.addEventListener('click', () => {
  photoPopupForm.reset();
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