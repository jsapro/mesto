const gridCardsContainer = document.querySelector('.grid-cards__container');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileNameElement = document.querySelector('.profile__name');
const profileJobElement = document.querySelector('.profile__job');

const popupUser = document.querySelector('.popup_edit-profile');
const popupUserForm = popupUser.querySelector('.popup__info');
const popupUserCloseButton = popupUser.querySelector('.popup__close-btn');
const popupUserNameInput = popupUser.querySelector('.popup__input_type_name');
const popupUserJobInput = popupUser.querySelector('.popup__input_type_job');

const popupCard = document.querySelector('.popup_add-card');
const popupCardForm = popupCard.querySelector('.popup__info');
const popupCardCloseButton = popupCard.querySelector('.popup__close-btn')
const popupCardSubmit = popupCard.querySelector('.popup__submit')
const popupCardNameInput = popupCard.querySelector('.popup__input_type_card-name');
const popupCardUrlInput = popupCard.querySelector('.popup__input_type_card-url');

const popupPreview = document.querySelector('.popup_open-card');
const popupPreviewСloseButton = popupPreview.querySelector('.popup__close-btn');
const popupPreviewImg =  popupPreview.querySelector('.popup__img');
const popupPreviewCaption =  popupPreview.querySelector('.popup__caption');

const templateCard = document.querySelector('.template-card').content;
const templateCardImg = templateCard.querySelector('.grid-card__img');
const templateCardName = templateCard.querySelector('.grid-card__name');

function openPopup (popup) {
  popup.classList.add('popup_opened')
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

//! обработка попапа-профайла по клику
function handlePopupProfile () {
  openPopup(popupUser);
  popupUserNameInput.value = profileNameElement.textContent;
  popupUserJobInput.value = profileJobElement.textContent;
}

//! submit попапа-профайла
function handleUserFormSubmit (e) {
  e.preventDefault();
  profileNameElement.textContent = popupUserNameInput.value;
  profileJobElement.textContent = popupUserJobInput.value;
  closePopup(popupUser);
}

//! обработка submit и закрытие попапа-карточек
function handleCardFormSubmit (e) {
  e.preventDefault();
  const inputCardNameValue = popupCardNameInput.value;
  const inputCardUrlValue = popupCardUrlInput.value;
  renderCard(inputCardNameValue, inputCardUrlValue);
  popupCardNameInput.value = '';
  popupCardUrlInput.value = '';
  closePopup(popupCard);
}

//! клонирование карточки
function cloneCardTemplate () {
  const newCard = templateCard
  .querySelector('.grid-card')
  .cloneNode(true);
  return newCard;
}

//! создание нужной карточки с данными
function createCard (name, link) {
  const createdCard = cloneCardTemplate();
  const cardDeleteButton = createdCard.querySelector('.grid-card__delete')
  const cardLikeButton = createdCard.querySelector('.grid-card__like');
  const cardImage = createdCard.querySelector('.grid-card__img');
  createdCard.querySelector('.grid-card__name').textContent = name;
  createdCard.querySelector('.grid-card__img').src = link;
  cardImage.alt = name;
  cardDeleteButton.addEventListener('click', () => createdCard.remove());

  // если передать с параметром, то надо использовать стрелочную функцию, но тогда слушатель нельзя будет удалить
  // если передать без параметра, то надо как-то найти кнопку like на которой произошло событие
  // cardLikeButton.addEventListener('click', (e) => {toggleLikeButton(e)});

  cardImage.addEventListener('click', () => handleCardPreview(name, link));
  return createdCard;
}

function toggleLikeButton (e) {
  e.target.classList.toggle('grid-card__like_active');
}

//! рендер карточки на странице
function renderCard (name, link) {
  newCard = createCard(name, link);
  gridCardsContainer.prepend(newCard);
}

//! превью фото
function handleCardPreview (name, link) {
  popupPreviewImg.src = link;
  popupPreviewImg.alt = name;
  popupPreviewCaption.textContent = name;
  openPopup(popupPreview);
}

//! создание карточек из массива
initialCards.forEach((item) => {
  renderCard(item.name, item.link);
});

//! второй вариант активизации кнопки лайк
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('grid-card__like')) {
    e.target.classList.toggle('grid-card__like_active')
  }
} )

profileEditButton.addEventListener('click', handlePopupProfile);
popupUserCloseButton.addEventListener('click', () => closePopup(popupUser));
popupUserForm.addEventListener('submit', handleUserFormSubmit);
profileAddButton.addEventListener('click', () => openPopup(popupCard));
popupCardForm.addEventListener('submit', handleCardFormSubmit);
popupCardCloseButton.addEventListener('click', () => closePopup(popupCard));
popupPreviewСloseButton.addEventListener('click', () => closePopup(popupPreview));

/////////////
