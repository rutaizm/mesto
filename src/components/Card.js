export class Card {
    constructor (data, cardSelector, handleCardClick, api, userId) {
      this._name = data.name;
      this._src = data.link;
      this._alt = data.name;
      this._id = data._id;
      this._cardUserId = data.owner._id;
      this._cardSelector = cardSelector;
      this.handleCardClick = handleCardClick;
      this._api = api;
      this._userId = userId;
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
      this._title.textContent = this._name;
      this._likeButton = this._element.querySelector('.element__like-button');
      this._deleteButton = this._element.querySelector('.element__delete-button');

      this._loadDeleteButton();
      this._setEventListeners();
      return this._element;
    }

    _loadDeleteButton() {
      if (!this._userId) {
        this._deleteButton.remove();
      }
    }

    _handleLike() {
      this._likeButton.classList.toggle('element__like-button_active');
      }
    
    _deleteCard () {
      this._api.deleteCard(this._id)
        .then (() => this._element = null,
                     this._element.remove());     
    }

    _setEventListeners() {
      this._likeButton.addEventListener('click', () => {
        this._handleLike();
      });
      
      this._deleteButton.addEventListener('click', () => {
        this._deleteCard();
      });

      this._image.addEventListener('click', () => {
          this.handleCardClick(this._src, this._name, this._alt);
      });
    }  
}