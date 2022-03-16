// переменные
const editPopup = document.querySelector('.popup-edit');
const editProfile = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.edit-form');
const nameInput = formElement.querySelector('.edit-form__field_type_name');
const jobInput = formElement.querySelector('.edit-form__field_type_info');
const names = document.querySelector('.profile__name');
const job = document.querySelector('.profile__info');
const editProfileSave = document.querySelector('.popup-edit__save-button');
const closeEditPopup = document.querySelector('.popup-edit_close-button');

const addPhotoPopup = document.querySelector('.popup-photo'); 
const addPhotoBtn = document.querySelector('.profile__add-photo-button'); 
const addPhotoForm = document.querySelector('.edit-form_type_photo');
const addPhotoCloseBtn = document.querySelector('.popup-photo__close-button');
const placeInput = document.querySelector('.edit-form__field_type_place');
const linkInput = document.querySelector('.edit-form__field_type_link');
const addPhotoSaveBtn = document.querySelector('.popup-photo__save-button');
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

// поп-апы открыли
function openPopup (data) {
    data.classList.add('pop-up_opened');
}

editProfile.addEventListener('click', () => {
    openPopup (editPopup);
    nameInput.value = names.textContent;
    jobInput.value = job.textContent;
}); 

addPhotoBtn.addEventListener('click', () => {
    openPopup(addPhotoPopup);
    addPhotoForm.reset();
});

// поп-апы закрыли
function closePopup (data) {
    data.classList.remove('pop-up_opened');
}
closeEditPopup.addEventListener('click', () => closePopup(editPopup));
addPhotoCloseBtn.addEventListener('click', () => closePopup(addPhotoPopup));

// редактирование формы о себе
formElement.addEventListener('submit', formSubmitHandler);

function formSubmitHandler (evt) {
    evt.preventDefault();

    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;

    names.textContent = nameInputValue;
    job.textContent = jobInputValue; 

    closePopup(editPopup);
}
 
// распределить исходный массив
function renderPhoto () {
    const photoInfo = initialCards.map (createCard);
    photoList.append(...photoInfo);
} 

// создать карточку
const photoTemplate = document.querySelector('.photo-template').content;
function createCard (card) {
    
    let newCard = photoTemplate.querySelector('.element').cloneNode(true);

    let newCardTitle = newCard.querySelector('.element__title');
    let newCardImage = newCard.querySelector('.element__image');
      
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
addPhotoForm.addEventListener ('submit', addCard);

function addCard (event) {
    event.preventDefault();
   
    let newCardsTitle = placeInput.value;
    let newCardsImage = linkInput.value;

    let newCards = createCard({ name: newCardsTitle, link: newCardsImage });
    photoList.prepend(newCards);

    closePopup(addPhotoPopup);
}

renderPhoto();

// попап с картинкой
popupImage.addEventListener('click', () => openPopup(bigPhotoPopup));
popupClose.addEventListener('click', () =>  closePopup(bigPhotoPopup));

function showBigPhoto(image, title) {
    openPopup(bigPhotoPopup);
  
    popupImage.src = image.src;
    popupImageText.textContent = title.textContent;
    popupImage.alt = image.textContent;
}

