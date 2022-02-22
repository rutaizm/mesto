let popup = document.querySelector('.pop-up');
let editProfile = document.querySelector('.profile__edit-button');
let closeBtn = document.querySelector('.pop-up__close');
let formElement = document.querySelector('.edit-form');
let nameInput = formElement.querySelector('.edit-form__name');
let jobInput = formElement.querySelector('.edit-form__info');
let names = document.querySelector('.profile__name');
let job = document.querySelector('.profile__info');

function openPopup() {
    popup.classList.remove("hidden");
    nameInput.value = names.textContent;
    jobInput.value = job.textContent;  
}

function closePopup () {
    popup.classList.add("hidden");
}

editProfile.addEventListener("click", openPopup);
closeBtn.addEventListener("click", closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameInput = nameInput.value;
    jobInput = jobInput.value;
    names.textContent = nameInput;
    job.textContent = jobInput;
}
formElement.addEventListener('submit', formSubmitHandler); 