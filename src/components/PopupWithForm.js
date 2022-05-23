import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._submitButtonSelector = this._popup.querySelector('.pop-up__save');
        this._buttonText = this._popup.querySelector('.pop-up__save').textContent;
        this._handleSubmitForm = this._handleSubmitForm.bind(this);
        this._form = this._popup.querySelector('.edit-form');
        this._inputList = Array.from(this._form.querySelectorAll('.edit-form__field'));
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        });
    }

    _getInputValues() {
        const formValues = {};
        this._inputList.forEach(input => {
            formValues[input.name] = input.value;
        });
        return formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleSubmitForm);
        this._form.addEventListener('submit', this.showPreloader.bind(this));
    }
    
    _handleSubmitForm(evt) {
        evt.preventDefault();
        this._submitForm(this._getInputValues());
    }   

    closePopup() {
        super.closePopup();
        this._form.reset();
    }

    showPreloader() {
        this._submitButtonSelector.textContent = "Сохранение...";
    }

    hidePreloader() {
        this._submitButtonSelector.textContent = this._buttonText;
    }  
}