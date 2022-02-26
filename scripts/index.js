let popup = document.querySelector('.pop-up');
let editProfile = document.querySelector('.profile__edit-button');
let closeBtn = document.querySelector('.pop-up__close');
let formElement = document.querySelector('.edit-form');
let nameInput = formElement.querySelector('.edit-form__field_type_name');
let jobInput = formElement.querySelector('.edit-form__field_type_info');
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

    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;

    names.textContent = nameInputValue;
    job.textContent = jobInputValue; 

    closePopup ();
}

formElement.addEventListener('submit', formSubmitHandler); 