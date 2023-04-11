export default class Card {
    constructor ({data, template, handleCardPreview, handleDeleteClick, handleLikeClick}) {
      this._data = data;
      this._name = data.name;
      this._id = data._id;
      this._link = data.link;
      this._template = template;
      this._handleCardPreview = handleCardPreview;
      this._handleDeleteClick = handleDeleteClick;
      this._handleLikeClick = handleLikeClick;
      this._cardElement = this._cloneCardTemplate();
      this._cardImage = this._cardElement.querySelector('.grid-card__img');
      this._cardDeleteButton = this._cardElement.querySelector('.grid-card__delete');
      this._cardLikeButton = this._cardElement.querySelector('.grid-card__like');
    }

    _cloneCardTemplate () {
      const cardElement = this._template
      .querySelector('.grid-card')
      .cloneNode(true);
      return cardElement;
    }

    deleteCard () {
      this._cardElement.remove();
     }

    getId () {
      return this._id;
    }

    _setEventListeners () {
      // this._cardDeleteButton.addEventListener('click', () => this._handleDeleteClick(this._id));
      this._cardDeleteButton.addEventListener('click', this._handleDeleteClick);
      this._cardLikeButton.addEventListener('click', this._toggleLikeButton);
      this._cardImage.addEventListener('click', () => this._handleCardPreview(this._data));
    }

    createCard () {
        this._cardElement.querySelector('.grid-card__name').textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._setEventListeners();
        return this._cardElement;
    }

    _toggleLikeButton (e) {
      e.target.classList.toggle('grid-card__like_active');
    }

}
