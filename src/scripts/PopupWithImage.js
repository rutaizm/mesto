import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
    }

    openPopup(src, name, alt) {
        const popupImage = this._popup.querySelector('.image-popup__item');
        const popupImageText = this._popup.querySelector('.image-popup__caption');
        popupImage.src = src;
        popupImageText.textContent = name || alt;
        super.openPopup();

    }
}