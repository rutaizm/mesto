let popup = document.querySelector('.pop-up'); 
let editProfile = document.querySelector('.profile__edit-button'); 
let closeBtn = document.querySelector('.pop-up__close'); 
let formElement = document.querySelector('.edit-form'); 
let nameInput = formElement.querySelector('.edit-form__field_type_name');
let jobInput = formElement.querySelector('.edit-form__field_type_info');
let names = document.querySelector('.profile__name');
let job = document.querySelector('.profile__info');
let addPhoto = document.querySelector('.popup-photo');
let addPhotoBtn = document.querySelector('.profile__add-photo-button');
let addPhotoCloseBtn = document.querySelector('.popup-photo__close');

function openPopup() {
    popup.classList.add('pop-up_opened');
    nameInput.value = names.textContent;
    jobInput.value = job.textContent;
}

function closePopup () {
    popup.classList.remove('pop-up_opened');
}

function openPopupAddPhoto() {
    addPhoto.classList.add('pop-up_opened');
}

function closePopupAddPhoto () {
    addPhoto.classList.remove('pop-up_opened');
}

editProfile.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);
addPhotoBtn.addEventListener('click',openPopupAddPhoto);
addPhotoCloseBtn.addEventListener('click', closePopupAddPhoto);

function formSubmitHandler (evt) {
    evt.preventDefault();

    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;

    names.textContent = nameInputValue;
    job.textContent = jobInputValue; 

    closePopup ();
}

formElement.addEventListener('submit', formSubmitHandler); 

for (let likeBtn of document.querySelectorAll(".element__like-button")) {
    likeBtn.addEventListener("click", function () {
      this.classList.toggle("element__like-button_active");
    });
  }

  
  let img = document.querySelectorAll('.element__image');
  let popupImg = document.querySelector('.image-popup__item');
  let captionImg = document.querySelector('.image-popup__caption');

  img.onclick = function(){

  }
