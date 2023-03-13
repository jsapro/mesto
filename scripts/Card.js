import {
  popupPreviewImg,
  popupPreviewCaption,
  popupPreview,
  openPopup
} from './index.js'

export default class Card {
  constructor (name, link, template) {
    this._name = name;
    this._link = link;
    this._template = template;
  }

  //! клонирование карточки
  _cloneCardTemplate () {
    const newCard = this._template
    .querySelector('.grid-card')
    .cloneNode(true);
    return newCard;
  }

  //! создание нужной карточки с данными
 createCard (name, link) {
    const createdCard = this._cloneCardTemplate();
    const cardDeleteButton = createdCard.querySelector('.grid-card__delete')
    const cardLikeButton = createdCard.querySelector('.grid-card__like');
    const cardImage = createdCard.querySelector('.grid-card__img');
    createdCard.querySelector('.grid-card__name').textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardDeleteButton.addEventListener('click', () => createdCard.remove());
    cardLikeButton.addEventListener('click', this._toggleLikeButton);
    cardImage.addEventListener('click', () => this._handleCardPreview(this._name, this._link));

    return createdCard;
 }

 _toggleLikeButton (e) {
   e.target.classList.toggle('grid-card__like_active');
 }

 //! превью фото
 _handleCardPreview (name, link) {
   popupPreviewImg.src = link;
   popupPreviewImg.alt = name;
   popupPreviewCaption.textContent = name;
   openPopup(popupPreview);
 }
}
