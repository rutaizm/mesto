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
export const avatar = document.querySelector('.profile__avatar');

export const buttonAddPhoto = document.querySelector('.profile__add-photo-button'); 
export const photoPopupForm = document.querySelector('.edit-form_type_photo');
export const placeInput = document.querySelector('.edit-form__field_type_place');
export const linkInput = document.querySelector('.edit-form__field_type_link');
export const photoList = document.querySelector('.elements__photoes');

export const buttonAvatar = document.querySelector('.profile__avatar-button');
export const avatarEditForm = document.querySelector('.edit-form[name=addAvatarForm]');