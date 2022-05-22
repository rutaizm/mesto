import { Popup } from "./Popup.js";

    export class PopupWithConfirmation extends Popup {
        constructor (popupSelector, submitForm) {
            super (popupSelector);
            this.submitForm = submitForm;
        }

    openPopup(card) {
        super.openPopup();
        this._card = card;
    }

    _confirmDeleting(evt) {
        evt.preventDefault();
        this.submitForm (this._card);
    }    

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', this._confirmDeleting.bind(this)); 
    }
}    