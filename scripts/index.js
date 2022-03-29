// переменные
const profilePopup = document.querySelector('.popup-edit');
const editProfile = document.querySelector('.profile__edit-button');
const formProfilePopup = document.querySelector('.edit-form');
const nameInput = formProfilePopup.querySelector('.edit-form__field_type_name');
const jobInput = formProfilePopup.querySelector('.edit-form__field_type_info');
const names = document.querySelector('.profile__name');
const job = document.querySelector('.profile__info');
const profilePopupSaveBtn = document.querySelector('.popup-edit__save-button');
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
const imageText = document.querySelector('.element__title');
const imagePhoto = document.querySelector('.element__image');
const popupPhoto = document.querySelector('.image-popup');
const popupImage = document.querySelector('.image-popup__item');
const popupImageText = document.querySelector('.image-popup__caption');
const popupClose = document.querySelector('.image-popup__close-button');

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
  
editProfile.addEventListener('click', () => {
  openPopup (profilePopup);
  nameInput.value = names.textContent;
  jobInput.value = job.textContent;
});

function formSubmitHandler (evt) {
  evt.preventDefault();

  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  names.textContent = nameInputValue;
  job.textContent = jobInputValue; 

  closePopup(profilePopup);
}  

function showBigPhoto(image, title) {
  openPopup(bigPhotoPopup);  
  popupImage.src = image.src;
  popupImageText.textContent = title.textContent;
  popupImage.alt = title.textContent;
}

photoPopupAddBtn.addEventListener('click', () => {
  openPopup(photoPopup);
  photoPopupForm.reset();
});
popupImage.addEventListener('click', () => openPopup(bigPhotoPopup));
popupClose.addEventListener('click', () =>  closePopup(bigPhotoPopup));
profilePopupCloseBtn.addEventListener('click', () => closePopup(profilePopup));
addPhotoCloseBtn.addEventListener('click', () => closePopup(photoPopup));
formProfilePopup.addEventListener('submit', formSubmitHandler);

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
  evt.preventDefault();
  if(evt.target.classList.contains('pop-up') || evt.target.classList.contains('pop-up__close')){   
    const popupOpen = document.querySelector('.pop-up_opened');     
    closePopup(popupOpen);
  };
};

const closeEscPress = (evt) => {  
  evt.preventDefault();
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.pop-up_opened');
    closePopup(popupOpen);
  };
};
 
// распределить исходный массив
function renderPhoto () {
    const photoInfo = initialCards.map (createCard);
    photoList.append(...photoInfo);
} 

// создать карточку
const photoTemplate = document.querySelector('.photo-template').content;
function createCard (card) {
    
    const newCard = photoTemplate.querySelector('.element').cloneNode(true);

    const newCardTitle = newCard.querySelector('.element__title');
    const newCardImage = newCard.querySelector('.element__image');
      
    newCardTitle.textContent = card.name;
    newCardImage.src = card.link;
    newCardImage.alt = card.name;

    newCard.querySelector('.element__like-button').addEventListener('click', function(event){
        event.target.classList.toggle('element__like-button_active');
    })

    const deleteButton = newCard.querySelector('.element__delete-button');
    deleteButton.addEventListener('click', function(event) {
        photoList.removeChild(event.target.closest('.element'));
    });

    newCardImage.addEventListener('click', () => showBigPhoto(newCardImage, newCardTitle));

    return newCard;
}    

// добавить карточку
photoPopupForm.addEventListener ('submit', addCard);

function addCard (event) {
    event.preventDefault();
   
    const newCardsTitle = placeInput.value;
    const newCardsImage = linkInput.value;

    const newCards = createCard({ name: newCardsTitle, link: newCardsImage });
    photoList.prepend(newCards);

    closePopup(photoPopup);
}

renderPhoto();