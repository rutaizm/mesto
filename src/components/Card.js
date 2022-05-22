export class Card {
    constructor (data, cardSelector, handleCardClick, userId, {addLike, deleteLike, handleDeleteIconClick}) {
      this._data = data;
      this._name = data.name;
      this._src = data.link;
      this._alt = data.name;
      this._id = data._id;
      this._cardUserId = data.owner._id;
      this._likes = data.likes;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
      this._userId = userId;
      this._addLike = addLike;
      this._deleteLike = deleteLike;
      this._handleDeleteIconClick = handleDeleteIconClick;
    }
  
    _getTemplate() {
      const cardElement = document.querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
      
      return cardElement;  
    }
  
    _loadDeleteButton() {
      if (this._cardUserId !== this._userId) {
        this._deleteButton.remove();
      }
    }

    _handleLike() {
      this._likeButton.classList.toggle('element__like-button_active');
      }
    
    deleteCard () {
      this._element.remove();  
      this._element = null;   
    }

    _checkIfLiked() {
      if(this._likes.some ((user) => user._id === this._userId)) {
        this._handleLike();
      };
    }

    countLikes(data) {
      this._likeCounter.textContent = data;
    }

    _setEventListeners() {
      this._likeButton.addEventListener('click', () => {
        if (this._likeButton.classList.contains('element__like-button_active')) {
            this._deleteLike(this._id);
            this._handleLike();
          } else { 
            this._addLike(this._id);
            this._handleLike();
          }
      });
      
      this._deleteButton.addEventListener('click', () => {
        this._handleDeleteIconClick();
      });

      this._image.addEventListener('click', () => {
          this._handleCardClick(this._src, this._name, this._alt); 
      });
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
      this._likeCounter = this._element.querySelector('.element__like-counter');
      
      this.countLikes(this._likes.length);
      this._checkIfLiked();
      this._loadDeleteButton();
      this._setEventListeners();
      return this._element;
    } 
}