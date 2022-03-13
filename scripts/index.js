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
        likeBtn.classList.toggle("element__like-button_active");
    });
  }

const photoList = document.querySelector('.elements__photoes'); 
const photoInfo = initialCards.map(function (item){
    return { 
        name: item.name,
        link: item.link
    };
});

function renderPhoto (card) {
    const photoTemplate = document.querySelector('.photo-template').content;
    const photoItem = photoTemplate.querySelector('.element').cloneNode(true);
   
    photoItem.querySelector('.element__title').textContent = card.name;
    photoItem.querySelector('.element__image').src = card.link;
       
    photoList.append(photoItem);
} 

photoInfo.forEach(renderPhoto);

  


  let img = document.querySelectorAll('.element__image');
  let popupImg = document.querySelector('.image-popup__item');
  let captionImg = document.querySelector('.image-popup__caption');

  img.onclick = function(){

  }
