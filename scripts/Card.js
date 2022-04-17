export class Card {
    constructor (data, cardSelector, showBigPhoto) {
      this._name = data.name;
      this._src = data.link;
      this._alt = data.name;
      this._cardSelector = cardSelector;
      this._showBigPhoto = showBigPhoto;
    }
  
    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
  
      return cardElement;  
    }
  
    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
  
      this._element.querySelector('.element__image').src = this._src;
      this._element.querySelector('.element__image').alt = this._alt;
      this._element.querySelector('.element__title').textContent = this._name;
  
      return this._element;
    }
  
    _setEventListeners() {
      this._element.querySelector('.element__like-button').addEventListener('click', () => {
          this._handleLike();
      });
      this._element.querySelector('.element__delete-button').addEventListener('click', () => {
          this._deleteCard();
      });
      this._element.querySelector('.element__image').addEventListener('click', () => {
          this._showBigPhoto();
      });
    }  
  
   _handleLike() {
      this._element.querySelector('.element__like-button')
        .classList.toggle('element__like-button_active');
    }
  
    _deleteCard() {
        document.querySelector('.elements__photoes').removeChild(this._element.closest('.element'));
    }

}