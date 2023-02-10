const initialCards = [
   {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


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

const popupPreview = document.querySelector('.popup_open-card');
const PopupPreviewСloseButton = popupPreview.querySelector('.popup__close-btn');

const templateCard = document.querySelector('.template-card').content;
const templateCardImg = templateCard.querySelector('.grid-card__img');
const templateCardName = templateCard.querySelector('.grid-card__name');

//! открытие-закрытие попапов
function openPopup (e) {
  e.classList.add('popup_opened')
}

function closePopup (e) {
  e.classList.remove('popup_opened');
}


//! обработка попапа-профайла по клику
function handlePopupProfile () {
  openPopup(popupUser);
  popupUserNameInput.value = profileNameElement.textContent;
  popupUserJobInput.value = profileJobElement.textContent;
}

profileEditButton.addEventListener('click', handlePopupProfile);
popupUserCloseButton.addEventListener('click', () => closePopup(popupUser));


//! submit попапа-профайла
function handleUserFormSubmit (e) {
  e.preventDefault();
  profileNameElement.textContent = popupUserNameInput.value;
  profileJobElement.textContent = popupUserJobInput.value;
  closePopup(popupUser);
}

popupUserForm.addEventListener('submit', handleUserFormSubmit);


//! обработка открытия попапа-карточек по клику
profileAddButton.addEventListener('click', () => openPopup(popupCard));


//! обработка submit и закрытие попапа-карточек
function handleCardFormSubmit (e) {
  e.preventDefault();

  const inputCardNameValue = popupCard.querySelector('.popup__input_type_card-name').value;
  const inputCardUrlValue = popupCard.querySelector('.popup__input_type_card-url').value;

  renderCard(inputCardNameValue, inputCardUrlValue);
  popupCard.querySelector('.popup__input_type_card-name').value = '';
  popupCard.querySelector('.popup__input_type_card-url').value = '';

  closePopup(popupCard);
}

popupCardForm.addEventListener('submit', handleCardFormSubmit);
popupCardCloseButton.addEventListener('click', () => closePopup(popupCard));


//! создание карточки
const createCard = function () {
  const newCard = templateCard
  .querySelector('.grid-card')
  .cloneNode(true);
  return newCard;
}

//! рендер карточки на странице
const renderCard = function (name, link) {
  templateCardName.textContent = name;
  templateCardImg.src = link;

  const createdCard = createCard();
  const cardDeleteButton = createdCard.querySelector('.grid-card__delete')
  const cardLikeButton = createdCard.querySelector('.grid-card__like');
  const cardImage = createdCard.querySelector('.grid-card__img');

  cardImage.alt = name;

  cardDeleteButton.addEventListener('click', () => createdCard.remove());
  cardLikeButton.addEventListener('click', () => cardLikeButton.classList.toggle('grid-card__like_active'));
  cardImage.addEventListener('click', () => handleCardPreview(name, link));

  gridCardsContainer.prepend(createdCard);
}

//! превью фото и закрытие превью
function handleCardPreview (name, link) {
  popupPreview.querySelector('.popup__img').src = link;
  popupPreview.querySelector('.popup__img').alt = name;
  popupPreview.querySelector('.popup__caption').textContent = name;

  openPopup(popupPreview);
}

PopupPreviewСloseButton.addEventListener('click', () => closePopup(popupPreview));

//! создание карточек из массива
initialCards.forEach((item) => {
  renderCard(item.name, item.link);
});


/////////////
