// переменные
const popup = document.querySelector('.pop-up'); 
const editProfile = document.querySelector('.profile__edit-button'); 
const closeBtn = document.querySelector('.pop-up__close'); 
const formElement = document.querySelector('.edit-form'); 
const nameInput = formElement.querySelector('.edit-form__field_type_name');
const jobInput = formElement.querySelector('.edit-form__field_type_info');
const names = document.querySelector('.profile__name');
const job = document.querySelector('.profile__info');
const editProfileSave = document.querySelector('.popup-edit__save-button');
const addPhoto = document.querySelector('.popup-photo');
const addPhotoBtn = document.querySelector('.profile__add-photo-button');
const addPhotoCloseBtn = document.querySelector('.popup-photo__close');
const placeInput = document.querySelector('.edit-form__field_type_place');
const linkInput = document.querySelector('.edit-form__field_type_link');
const addPhotoForm = document.querySelector('.edit-form_type_photo');
const photoList = document.querySelector('.elements__photoes'); 
const editPopup = document.querySelector('.popup-edit');
const addPhotoPopup = document.querySelector('.popup-photo');
const bigPhotoPopup = document.querySelector('.image-popup');
const imageListItem = document.querySelector('.element'); 
const imageText = document.querySelector('.element__title');
const imagePhoto = document.querySelector('.element__image');// слушатель картинки
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

  // обрабочики событий
editProfile.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);
addPhotoBtn.addEventListener('click', openPopup);
addPhotoCloseBtn.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
addPhotoForm.addEventListener('submit', addCard);
editProfileSave.addEventListener('click', closePopup);

// поп-апы
function openPopup(event) {
    if (event.target.classList.contains('profile__edit-button')) {
        editPopup.classList.add('pop-up_opened');
    } else if (event.target.classList.contains('profile__add-photo-button')) {
        addPhotoPopup.classList.add('pop-up_opened');
    } 
}

function closePopup(event) {
    if (event.target.classList.contains('pop-up__close')) {
        event.target.closest('.pop-up').classList.remove('pop-up_opened');
    } 
    else if (event.target.classList.contains('popup-edit__save-button')) {
        event.target.closest('.pop-up').classList.remove('pop-up_opened');
    } 
}

function editProfilePopup() {
        nameInput.value = names.textContent;
        jobInput.value = job.textContent;

        openPopup();
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;

    names.textContent = nameInputValue;
    job.textContent = jobInputValue; 

    closePopup();
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
function addCard (event) {
    event.preventDefault();
   
    let newCardsTitle = placeInput.value;
    let newCardsImage = linkInput.value;

    let newCards = createCard({ name: newCardsTitle, link: newCardsImage });
    photoList.prepend(newCards);

    closePopup();
}

renderPhoto();

// попап с картинкой
function openImagePopup () {
    bigPhotoPopup.classList.add('pop-up_opened');
}

popupClose.addEventListener('click', closePopup);

function showBigPhoto(image, title) {
    openImagePopup(popupPhoto);
  
    popupImage.src = image.src;
    popupImageText.textContent = title.textContent;
    popupImage.alt = image.textContent;
}

