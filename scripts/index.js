let popup = document.querySelector('.pop-up');
let editProfile = document.querySelector('.profile__edit-button');
let closeBtn = document.querySelector('.pop-up__close');
let formElement = document.querySelector('.edit-form');
let nameInput = formElement.querySelector('.form_name-js');
let jobInput = formElement.querySelector('.form_info-js');
let names = document.querySelector('.profile__name');
let job = document.querySelector('.profile__info');

function openPopup() {
    popup.classList.add("pop-up_opened");
    nameInput.value = names.textContent;
    jobInput.value = job.textContent;  
}

function closePopup () {
    popup.classList.remove("pop-up_opened");
}

editProfile.addEventListener("click", openPopup);
closeBtn.addEventListener("click", closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameInput = nameInput.value;
    jobInput = jobInput.value;
    names.textContent = nameInput;
    job.textContent = jobInput;
    closePopup ();
}
formElement.addEventListener('submit', formSubmitHandler); 