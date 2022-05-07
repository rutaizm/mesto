import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.image-popup__item');
        this._popupImageText = this._popup.querySelector('.image-popup__caption');
    }

    openPopup(src, name, alt) {
        this._popupImage.src = src;
        this._popupImage.alt = alt || name;
        this._popupImageText.textContent = name;
        super.openPopup();
    }
}