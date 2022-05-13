

// export const initialCards = [
//     {
//       place: 'Архыз',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//     },
//     {
//       place: 'Челябинская область',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//     },
//     {
//       place: 'Иваново',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//     },
//     {
//       place: 'Камчатка',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//     },
//     {
//       place: 'Холмогорский район',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//     },
//     {
//       place: 'Байкал',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//     }
//   ];
  
  export const config = {
    formSelector: '.edit-form',
    inputSelector: '.edit-form__field',
    submitButtonSelector: '.pop-up__save',
    inactiveButtonClass: 'pop-up__save_type_disabled',
    inputErrorClass: 'edit-form__field_type_error',
    errorClass: 'edit-form__input-error_active',
 }

export const profileForm = document.querySelector('.edit-form[name=profileEditForm]');
export const photoForm =document.querySelector('.edit-form[name=addPhotoForm]');

export const buttonProfile = document.querySelector('.profile__edit-button');
export const formProfilePopup = document.querySelector('.edit-form');
export const nameInput = formProfilePopup.querySelector('.edit-form__field_type_name');
export const jobInput = formProfilePopup.querySelector('.edit-form__field_type_info');
export const name = document.querySelector('.profile__name');
export const job = document.querySelector('.profile__info');

export const buttonAddPhoto = document.querySelector('.profile__add-photo-button'); 
export const photoPopupForm = document.querySelector('.edit-form_type_photo');
export const placeInput = document.querySelector('.edit-form__field_type_place');
export const linkInput = document.querySelector('.edit-form__field_type_link');
export const photoList = document.querySelector('.elements__photoes');
