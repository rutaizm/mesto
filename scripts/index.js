// переменные
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
let placeInput = document.querySelector('.edit-form__field_type_place');
let linkInput = document.querySelector('.edit-form__field_type_link');
let addPhotoForm = document.querySelector('.edit-form_type_photo');
const photoList = document.querySelector('.elements__photoes'); 
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

// поп-апы
function openPopup() {
    popup.classList.add('pop-up_opened');
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

function editProfilePopup (){
    openPopup();
    nameInput.value = names.textContent;
    jobInput.value = job.textContent;
}

// обрабочики событий
editProfile.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);
addPhotoBtn.addEventListener('click', openPopupAddPhoto);
addPhotoCloseBtn.addEventListener('click', closePopupAddPhoto);
formElement.addEventListener('submit', formSubmitHandler);
addPhotoForm.addEventListener('submit', addCard);

function formSubmitHandler (evt) {
    evt.preventDefault();

    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;

    names.textContent = nameInputValue;
    job.textContent = jobInputValue; 

    closePopup ();
}
 
// распределить исходный массив
function renderPhoto () {
    const photoInfo = initialCards.map (createCard);
    photoList.append(...photoInfo);
} 

// создать карточку
function createCard (card) {
    const photoTemplate = document.querySelector('.photo-template').content;
    let newCard = photoTemplate.querySelector('.element').cloneNode(true);

    newCard.querySelector('.element__title').textContent = card.name;
    newCard.querySelector('.element__image').src = card.link;
    newCard.querySelector('.element__image').alt = card.name;
    
    newCard.querySelector('.element__like-button').addEventListener('click', function(event){
        event.target.classList.toggle('element__like-button_active');
    })

    const deleteButton = newCard.querySelector('.element__delete-button');

    deleteButton.addEventListener('click', function(event) {
        photoList.removeChild(event.target.closest('.element'));
    });

    return newCard;
}    

// добавить карточку
function addCard (event) {
    event.preventDefault();
   
    let newCardsTitle = placeInput.value;
    let newCardsImage = linkInput.value;

    let newCards = createCard({ name: newCardsTitle, link: newCardsImage });
    photoList.prepend(newCards);

    closePopupAddPhoto ();
}

renderPhoto();

  


const image = document.querySelector('.element__image');
const imageText = document.querySelectorAll('.element__title');
const popupPhoto = document.querySelector('.image-popup');
const popupImage = document.querySelector('.image-popup__item');
const popupImageText = document.querySelector('.image-popup__caption');
const popupClose = document.querySelector('.image-popup__close-button');

function openImagePopup() {
    popupPhoto.classList.add('pop-up_opened');
}

function closeImagePopup() {
    popupPhoto.classList.remove('pop-up_opened');
}

image.addEventListener('click', openImagePopup);
popupClose.addEventListener('click', closeImagePopup);

function showBigPhoto(image) {
    const popupImage = document.querySelector('.image-popup__item');
    popupImage.src = image.src;
    popupImageText.textContent = image.textContent;
    popupImage.alt = image.textContent;
    openImagePopup();
}