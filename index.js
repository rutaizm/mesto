let popup = document.querySelector('.pop-up');
let editProfile = document.querySelector('.profile__edit-button');
let closeBtn = document.querySelector('.pop-up__close');
let formElement = document.querySelector('.edit-form');
let nameInput = formElement.querySelector('.edit-form__name');
let jobInput = formElement.querySelector('.edit-form__info');


function openPopup() {
    popup.classList.remove("pop-up__hidden");

    let name = document.querySelector('.profile__name');
    let job = document.querySelector('.profile__info');

    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
}

function closePopup () {
    popup.classList.add("pop-up__hidden");
}

editProfile.addEventListener("click", openPopup);
closeBtn.addEventListener("click", closePopup);
