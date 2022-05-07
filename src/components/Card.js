export class Card {
    constructor (data, cardSelector, handleCardClick) {
      this._place = data.place;
      this._src = data.link;
      this._alt = data.name;
      this._cardSelector = cardSelector;
      this.handleCardClick = handleCardClick;
    }
  
    _getTemplate() {
      const cardElement = document.querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
      
      return cardElement;  
    }
  
    generateCard() {
      this._element = this._getTemplate();       
      this._image = this._element.querySelector('.element__image');
      this._image.src = this._src;
      this._image.alt = this._alt;
      this._title = this._element.querySelector('.element__title');
      this._title.textContent = this._place;
      this._likeButton = this._element.querySelector('.element__like-button');
      this._deleteButton = this._element.querySelector('.element__delete-button');

      this._setEventListeners();
      return this._element;
    }

    _handleLike() {
      this._likeButton.classList.toggle('element__like-button_active');
      console.log (this._likeButton);
      }
    
    _deleteCard() {
      this._element.remove();
      this._element = null;
    }
  
    _setEventListeners() {
      this._likeButton.addEventListener('click', () => {
        this._handleLike();
      });
      
      this._deleteButton.addEventListener('click', () => {
        this._deleteCard();
      });

      this._image.addEventListener('click', () => {
          this.handleCardClick(this._src, this._place, this._alt);
      });
    }  
}