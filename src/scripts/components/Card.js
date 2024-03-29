export default class Card {
  constructor({
    data,
    template,
    handleCardPreview,
    handleDeleteClick,
    handleLikeClick,
    userIdFromServer,
  }) {
    this._data = data;
    this._name = data.name;
    this._cardId = data._id;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._myId = userIdFromServer;
    this._template = template;
    this._handleCardPreview = handleCardPreview;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._cardElement = this._cloneCardTemplate();
    this._cardImage = this._cardElement.querySelector(".grid-card__img");
    this._cardDeleteButton =
      this._cardElement.querySelector(".grid-card__delete");
    this._cardLikeButton = this._cardElement.querySelector(".grid-card__like");
    this._cardLikeCounter = this._cardElement.querySelector(
      ".grid-card__like-counter"
    );
  }

  _cloneCardTemplate() {
    const cardElement = this._template
      .querySelector(".grid-card")
      .cloneNode(true);
    return cardElement;
  }

  deleteCard() {
    this._cardElement.remove();
  }

  getCardId() {
    return this._cardId;
  }

  _setEventListeners() {
    this._cardDeleteButton?.addEventListener("click", this._handleDeleteClick); //optional chaining ???
    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeClick(
        this.getCardId(),
        this._isCardLiked()
      );
    });
    this._cardImage.addEventListener("click", () =>
      this._handleCardPreview(this._data)
    );
  }

  createCard() {
    this._owner._id === this._myId
      ? console.log(`createCard name: ${this._name}`, this._owner)
      : this._cardDeleteButton.remove();
    this._cardElement.querySelector(".grid-card__name").textContent =
      this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._toggleLikeButton();
    this.setLikesCount(this._likes);
    this._setEventListeners();
    return this._cardElement;
  }

  _toggleLikeButton() {
    if (this._isCardLiked()) {
      this._cardLikeButton.classList.add("grid-card__like_active");
    } else {
      this._cardLikeButton.classList.remove("grid-card__like_active");
    }
  }

  setLike() {
    this._cardLikeButton.classList.add("grid-card__like_active");
  }

  deleteLike() {
    this._cardLikeButton.classList.remove("grid-card__like_active");
  }

  _isCardLiked() {
    return this._likes.some((user) => user._id === this._myId);
  }

  updateLikeArray(likeArrayFromServer) {
    this._likes = likeArrayFromServer;
  }

  setLikesCount(likeArray) {
    this._cardLikeCounter.textContent = likeArray.length;
  }
}
