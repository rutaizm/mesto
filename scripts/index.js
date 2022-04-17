import { Card } from "./Card.js";
import { FormValidator } from "./validation.js";

// переменные
const profilePopup = document.querySelector('.popup-edit');
const editProfile = document.querySelector('.profile__edit-button');
const formProfilePopup = document.querySelector('.edit-form');
const nameInput = formProfilePopup.querySelector('.edit-form__field_type_name');
const jobInput = formProfilePopup.querySelector('.edit-form__field_type_info');
const names = document.querySelector('.profile__name');
const job = document.querySelector('.profile__info');
const profilePopupCloseBtn = document.querySelector('.popup-edit__close-button');

const photoPopup = document.querySelector('.popup-photo'); 
const photoPopupAddBtn = document.querySelector('.profile__add-photo-button'); 
const photoPopupForm = document.querySelector('.edit-form_type_photo');
const addPhotoCloseBtn = document.querySelector('.popup-photo__close-button');
const placeInput = document.querySelector('.edit-form__field_type_place');
const linkInput = document.querySelector('.edit-form__field_type_link');
const photoPopupSaveBtn = document.querySelector('.popup-photo__save-button');
const photoList = document.querySelector('.elements__photoes');

const bigPhotoPopup = document.querySelector('.image-popup');
const popupImage = document.querySelector('.image-popup__item');
const popupImageText = document.querySelector('.image-popup__caption');
const popupClose = document.querySelector('.image-popup__close-button');

const profileForm = document.querySelector('.edit-form[name=profileEditForm]');
const photoForm =document.querySelector('.edit-form[name=addPhotoForm]');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
  
const config = {
  formSelector: '.edit-form',
  inputSelector: '.edit-form__field',
  submitButtonSelector: '.pop-up__save',
  inactiveButtonClass: 'pop-up__save_type_disabled',
  inputErrorClass: 'edit-form__field_type_error',
  errorClass: 'edit-form__input-error_active',
 }

// валидация форм 
const profileFormValidation = new FormValidator (config, profileForm);
const photoFormValidation = new FormValidator (config, photoForm);
profileFormValidation.enableValidation();
photoFormValidation.enableValidation();

editProfile.addEventListener('click', () => {
  nameInput.value = names.textContent;
  jobInput.value = job.textContent;
  profileFormValidation.resetFormValidation();
  openPopup (profilePopup);
}); 

photoPopupAddBtn.addEventListener('click', () => {
  photoFormValidation.resetFormValidation();
  photoPopupForm.reset();
  photoPopupSaveBtn.setAttribute('disabled', true);
  photoPopupSaveBtn.classList.add('pop-up__save_type_disabled');
  openPopup(photoPopup);
});

function showBigPhoto() {
  popupImage.src = this._src;
  popupImageText.textContent = this._name;
  popupImage.alt = this._name;
  openPopup(bigPhotoPopup);
}

// открытие и закрытие 
function openPopup (data) {
  data.classList.add('pop-up_opened');
  document.addEventListener('mousedown', closeOverlayClick);
  document.addEventListener('keydown', closeEscPress);
}

function closePopup (data) {
  data.classList.remove('pop-up_opened');
  document.removeEventListener('mousedown', closeOverlayClick);
  document.removeEventListener('keydown', closeEscPress);
}

const closeOverlayClick = (evt) => {
  if(evt.target.classList.contains('pop-up') || evt.target.classList.contains('pop-up__close')){   
    const popupOpen = document.querySelector('.pop-up_opened');     
    closePopup(popupOpen);
  };
}

const closeEscPress = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.pop-up_opened');
    closePopup(popupOpen);
  };
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  names.textContent = nameInputValue;
  job.textContent = jobInputValue; 

  closePopup(profilePopup);
}
 
initialCards.forEach((item) => {
  const card = new Card (item, '.photo-template', showBigPhoto);
  const cardElement = card.generateCard();

  photoList.append(cardElement);
})

function addCard (event) {
  event.preventDefault();
  const newCard = new Card({name:placeInput.value, link: linkInput.value},'.photo-template', showBigPhoto);
  const newCardElement = newCard.generateCard();
  photoList.prepend(newCardElement);

  closePopup(photoPopup);
}

// слушатели
popupImage.addEventListener('click', () => openPopup(bigPhotoPopup));
popupClose.addEventListener('click', () =>  closePopup(bigPhotoPopup));
profilePopupCloseBtn.addEventListener('click', () => closePopup(profilePopup));
addPhotoCloseBtn.addEventListener('click', () => closePopup(photoPopup));
formProfilePopup.addEventListener('submit', formSubmitHandler);
photoPopupForm.addEventListener ('submit', addCard);