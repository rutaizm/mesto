// переменные
const popup = document.querySelector('.pop-up'); 
const editProfile = document.querySelector('.profile__edit-button'); 
const closeBtn = document.querySelector('.pop-up__close'); 
const formElement = document.querySelector('.edit-form'); 
const nameInput = formElement.querySelector('.edit-form__field_type_name');
const jobInput = formElement.querySelector('.edit-form__field_type_info');
const names = document.querySelector('.profile__name');
const job = document.querySelector('.profile__info');
const addPhoto = document.querySelector('.popup-photo');
const addPhotoBtn = document.querySelector('.profile__add-photo-button');
const addPhotoCloseBtn = document.querySelector('.popup-photo__close');
const placeInput = document.querySelector('.edit-form__field_type_place');
const linkInput = document.querySelector('.edit-form__field_type_link');
const addPhotoForm = document.querySelector('.edit-form_type_photo');
const photoList = document.querySelector('.elements__photoes'); 
const editPopup = document.querySelector('.popup-edit');
const addPhotoPopup = document.querySelector('.popup-photo');
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
}

function editProfilePopup() {
    openPopup();
    nameInput.value = names.textContent;
    jobInput.value = job.textContent;
}

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

// попап с картинкой
const bigPhotoPopup = document.querySelector('.image-popup');
const imageListItem = document.querySelector('.element'); 
const imageText = document.querySelector('.element__title');
const imagePhoto = document.querySelector('.element__image');// слушатель картинки
const popupPhoto = document.querySelector('.image-popup');
const popupImage = document.querySelector('.image-popup__item');
const popupImageText = document.querySelector('.image-popup__caption');
const popupClose = document.querySelector('.image-popup__close-button');

function openImagePopup () {
    bigPhotoPopup.classList.add('pop-up_opened');
}

imagePhoto.addEventListener('click', showBigPhoto); // повесили слушатель на картинку
popupClose.addEventListener('click', closePopup);

function showBigPhoto(image) {
    image.src = imagePhoto.src;
    image.textContent = imageText.textContent;

    popupImage.src = image.src;
    popupImageText.textContent = image.textContent;
    popupImage.alt = image.textContent;

    openImagePopup();
}