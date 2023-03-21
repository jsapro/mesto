export default class Card {
    constructor (data, template, handleCardPreview) {
      this._data = data;
      this._name = data.name;
      this._link = data.link;
      this._template = template;
      this._handleCardPreview = handleCardPreview;
    }

    //! клонирование карточки
    _cloneCardTemplate () {
      const newCard = this._template
      .querySelector('.grid-card')
      .cloneNode(true);
      return newCard;
    }

    _setEventListeners (createdCard, cardImage) {
      const cardDeleteButton = createdCard.querySelector('.grid-card__delete')
      const cardLikeButton = createdCard.querySelector('.grid-card__like');
      cardDeleteButton.addEventListener('click', () => createdCard.remove());
      cardLikeButton.addEventListener('click', this._toggleLikeButton);
      cardImage.addEventListener('click', () => this._handleCardPreview(this._data));
    }

    //! создание нужной карточки с данными
    createCard () {
        const createdCard = this._cloneCardTemplate();
        const cardImage = createdCard.querySelector('.grid-card__img');
        createdCard.querySelector('.grid-card__name').textContent = this._name;
        cardImage.src = this._link;
        cardImage.alt = this._name;
        this._setEventListeners(createdCard, cardImage);
        return createdCard;
    }

    _toggleLikeButton (e) {
      e.target.classList.toggle('grid-card__like_active');
    }

}
