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
  
// поп-апы открыли
function openPopup (data) {
  data.classList.add('pop-up_opened');
  document.addEventListener('mousedown', closeOverlayClick);
  document.addEventListener('keydown', closeEscPress);
}

editProfile.addEventListener('click', () => {
    openPopup (profilePopup);
    nameInput.value = names.textContent;
    jobInput.value = job.textContent;
}); 

photoPopupAddBtn.addEventListener('click', () => {
    openPopup(photoPopup);
    photoPopupForm.reset();
});

// поп-апы закрыли
function closePopup (data) {
    data.classList.remove('pop-up_opened');
}
profilePopupCloseBtn.addEventListener('click', () => closePopup(profilePopup));
addPhotoCloseBtn.addEventListener('click', () => closePopup(photoPopup));

const closeOverlayClick = (evt) => {
  const popupOpen = document.querySelector('.pop-up_opened');
    if(evt.target === popupOpen){        
      closePopup(popupOpen);
    };
}

const closeEscPress = (evt) => {
  const popupOpen = document.querySelector('.pop-up_opened');
    if (evt.key === 'Escape' && popupOpen !== null) {
      closePopup(popupOpen);
    };
}


// редактирование формы о себе
formProfilePopup.addEventListener('submit', formSubmitHandler);

function formSubmitHandler (evt) {
    evt.preventDefault();

    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;

    names.textContent = nameInputValue;
    job.textContent = jobInputValue; 

    closePopup(profilePopup);
}
 
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

// попап с картинкой
popupImage.addEventListener('click', () => openPopup(bigPhotoPopup));
popupClose.addEventListener('click', () =>  closePopup(bigPhotoPopup));

function showBigPhoto(image, title) {
    openPopup(bigPhotoPopup);
  
    popupImage.src = image.src;
    popupImageText.textContent = title.textContent;
    popupImage.alt = title.textContent;
}

// Валидация

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList, config)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage,  config);
  } else {
    hideInputError(formElement, inputElement,  config);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector)); 
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
      inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
      });
    });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
         evt.preventDefault();
         });
      setEventListeners(formElement, config);
     
    });
}
 
enableValidation({
  formSelector: '.edit-form',
  inputSelector: '.edit-form__field',
  submitButtonSelector: '.pop-up__save',
  inactiveButtonClass: 'pop-up__save_type_disabled',
  inputErrorClass: '.edit-form__field_type_error',
  errorClass: 'edit-form__input-error_active'
});
