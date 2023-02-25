const gridCardsContainer = document.querySelector('.grid-cards__container');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileNameElement = document.querySelector('.profile__name');
const profileJobElement = document.querySelector('.profile__job');

const popupUser = document.querySelector('.popup_edit-profile');
const popupUserForm = popupUser.querySelector('.popup__form');
const popupUserCloseButton = popupUser.querySelector('.popup__close-btn');
const popupUserNameInput = popupUser.querySelector('.popup__input_type_name');
const popupUserJobInput = popupUser.querySelector('.popup__input_type_job');

const popupCard = document.querySelector('.popup_add-card');
const popupCardForm = popupCard.querySelector('.popup__form');
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

function closeOnEscape(e) {
  const popup = document.querySelector('.popup_opened');
  if (e.key === 'Escape') {
    closePopup(popup);
  }
};

function openPopup (popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closeOnEscape);
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnEscape);
  if (popup.closest('.popup_edit-profile')) {
    popupUserForm.reset();
  } else if (popup.closest('.popup_add-card')) {
    popupCardForm.reset();
  }
}

//! обработка попапа-профайла по клику
function handlePopupProfile () {
  openPopup(popupUser);
  popupUserNameInput.value = profileNameElement.textContent;
  popupUserJobInput.value = profileJobElement.textContent;
}

//! submit попапа-профайла
function handleUserFormSubmit (e) {
  // слишком громоздко - поискать другой способ
  const hasDisabledClassOnUserBtn = popupUser.querySelector('.popup__submit').classList.contains('popup__submit_disabled');
  e.preventDefault();
  if (!hasDisabledClassOnUserBtn) {
    profileNameElement.textContent = popupUserNameInput.value;
    profileJobElement.textContent = popupUserJobInput.value;
    closePopup(popupUser);
  } else {
    console.log('User form is not valid ❌⛔');

    !popupUserNameInput.validity.valid
    ? console.log('name > ' + popupUserNameInput.validationMessage)
    : console.log('name > ✅');

   !popupUserJobInput.validity.valid
    ? console.log('job > ' + popupUserJobInput.validationMessage)
    : console.log('job > ✅');
  }
}

//! обработка submit и закрытие попапа-карточек
function handleCardFormSubmit (e) {
  // слишком громоздко - поискать другой способ
  const hasDisabledClassOnCardBtn = popupCard.querySelector('.popup__submit').classList.contains('popup__submit_disabled');
  e.preventDefault();
  if (!hasDisabledClassOnCardBtn) {
    // console.log(popupCardForm.checkValidity());
    const inputCardNameValue = popupCardNameInput.value;
    const inputCardUrlValue = popupCardUrlInput.value;
    renderCard(inputCardNameValue, inputCardUrlValue);
    popupCardForm.reset();
    closePopup(popupCard);

  } else {
    // console.log(popupCardForm.checkValidity());
    console.log('Card form is not valid ❌⛔')

    !popupCardNameInput.validity.valid
    ? console.log('place > ' + popupCardNameInput.validationMessage)
    : console.log('place > ✅');

    !popupCardUrlInput.validity.valid
    ? console.log('url > ' + popupCardUrlInput.validationMessage)
    : console.log('url > ✅');
  }
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
  cardImage.src = link;
  cardImage.alt = name;
  cardDeleteButton.addEventListener('click', () => createdCard.remove());
  cardLikeButton.addEventListener('click', toggleLikeButton);
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

profileEditButton.addEventListener('click', handlePopupProfile);
popupUserCloseButton.addEventListener('click', () => closePopup(popupUser));
popupUserForm.addEventListener('submit', handleUserFormSubmit);

profileAddButton.addEventListener('click', () => openPopup(popupCard));
popupCardForm.addEventListener('submit', handleCardFormSubmit);

popupCardCloseButton.addEventListener('click', () => closePopup(popupCard));
popupPreviewСloseButton.addEventListener('click', () => closePopup(popupPreview));

//////////
