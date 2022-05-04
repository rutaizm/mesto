export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
    }

    openPopup() {
        this._popup.classList.add('pop-up_opened');
        this.setEventListeners();
    }

    closePopup() {
        this._popup.classList.remove('pop-up_opened');
        this.removeEventListeners();
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.closePopup();
        }
    }

    _handleOverlayClose(evt) {
        if(evt.target.classList.contains('pop-up') || evt.target.classList.contains('pop-up__close')) {
            this.closePopup(); 
        }
    }
    
    setEventListeners() {
        this._popup.addEventListener('click', this._handleOverlayClose);
        document.addEventListener('keydown', this._handleEscClose);
    }

    removeEventListeners(){
        this._popup.removeEventListener('click', this._handleOverlayClose);
        document.removeEventListener('keydown', this._handleEscClose);
    }
  }