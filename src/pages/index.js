import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { initialCards, config, profileForm, photoForm,
  buttonProfile, formProfilePopup, nameInput, jobInput, name, job,
  buttonAddPhoto, photoPopupForm, placeInput, linkInput, photoList, buttonAvatar, avatarEditForm, avatar} from "../utils/constants.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import "../pages/index.css"
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";

let userId = null;
const userInfo = new UserInfo(name, job);

function createCard (data) {
  const card = new Card (data,'.photo-template', handleCardClick, userId, {
    addLike: (data) => {
      api.addLike(data)
      .then((res) => { 
        card(res.likes.length);
    })
      .catch((err) => console.log((err)));
    },
    deleteLike: (data) => {
      api.deleteLike(data)
        .then((res) => { 
          card(res.likes.length);
    })
        .catch((err) => console.log((err)));
  }, 
  deleteCard: (data) => {
    api.deleteCard(data)
      .then((res) =>{
        card.deleteCard(res);
      })
      .catch((err) => console.log((err)));
    }    
});
  return card.generateCard();
}

const api = new Api({
  url:'https://mesto.nomoreparties.co/v1/cohort-41/',
  headers: {
    authorization: "381dea00-c956-4a18-991b-777a11869f64",
    "Content-Type":"application/json", 
  }
});

api.getProfileInfo()
  .then((res) => {
    userInfo.getUserInfo(res.name, res.about, res._id);
    userInfoForm.setInputValues(res.name, res.about);
    userInfo.setUserInfo(res);
    avatar.src = res.avatar;
    userId = res._id;
  })
    .catch((err) => console.log(err));

const defaultCards = new Section ({ 
  renderer: (data) => {
    const cardElement = createCard(data, userId);
    defaultCards.addItem(cardElement);    
  }
}, '.elements__photoes');    

api.getInitialCards()
  .then((cards) => {
    defaultCards.renderItems(cards)
  })
  .catch((err) => console.log(err));

  
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
      const newCard = createCard(data);
      defaultCards.prependItem(newCard);
      editPhotoForm.closePopup();
  })
  .catch((err) => console.log("Ошибка"(err)));
}

function submitAvatar(userInputs) {
  api.addAvatar(userInputs.avatar)
    .then((res)=> {
      avatar.src = res.avatar;
      avatarForm.closePopup();
    })
    .catch((err) => console.log("Ошибка"(err)));
}

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

buttonAvatar.addEventListener('click', () => {
  avatarFormValidation.resetFormValidation();
  avatarForm.openPopup();
});

function handleCardClick(src, name, alt) {
  showBigPhoto.openPopup(src, name, alt);  
}

//попапы
const userInfoForm = new PopupWithForm('.popup-edit', submitProfileForm);
const editPhotoForm = new PopupWithForm('.popup-photo', submitCard);
const showBigPhoto = new PopupWithImage('.image-popup');
const avatarForm = new PopupWithForm('.new-avatar-popup', submitAvatar);
userInfoForm.setEventListeners();
editPhotoForm.setEventListeners();
showBigPhoto.setEventListeners();
avatarForm.setEventListeners();

//валидация форм 
const profileFormValidation = new FormValidator (config, profileForm);
const photoFormValidation = new FormValidator (config, photoForm);
const avatarFormValidation = new FormValidator (config, avatarEditForm);
profileFormValidation.enableValidation();
photoFormValidation.enableValidation();
avatarFormValidation.enableValidation();