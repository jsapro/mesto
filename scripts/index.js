const gridCardsContainer = document.querySelector('.grid-cards__container');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileNameElement = document.querySelector('.profile__name');
const profileJobElement = document.querySelector('.profile__job');

const popupUser = document.querySelector('.popup_edit-profile');
const popupUserForm = document.forms['profile-form'];
const popupUserNameInput = popupUser.querySelector('.popup__input_type_name');
const popupUserJobInput = popupUser.querySelector('.popup__input_type_job');

const popupCard = document.querySelector('.popup_add-card');
const popupCardForm = document.forms['card-form'];
const popupCardSubmit = popupCard.querySelector('.popup__submit')
const popupCardNameInput = popupCard.querySelector('.popup__input_type_card-name');
const popupCardUrlInput = popupCard.querySelector('.popup__input_type_card-url');

const popupPreview = document.querySelector('.popup_open-card');
const popupPreviewImg =  popupPreview.querySelector('.popup__img');
const popupPreviewCaption =  popupPreview.querySelector('.popup__caption');

const templateCard = document.querySelector('.template-card').content;

const closeButtons = document.querySelectorAll('.popup__close-btn');
const popups = document.querySelectorAll('.popup')

function closeOnEscape(e) {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
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
}

//! открытие попапа-профайла по клику
function openProfilePopup () {
  openPopup(popupUser);
  // popupUser.querySelector('.name-input-error').textContent = '';
  // popupUser.querySelector('.job-input-error').textContent = '';
  const popupUserForm = popupUser.querySelector('.popup__form');
  const popupUserInputList = popupUser.querySelectorAll('.popup__input');
  popupUserInputList.forEach(input => {
    // если был escape при невалидной форме - уберёт неактуальные error при следующем открытии
    hideInputError(popupUserForm, input, formValidationConfig);
  })
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
    // console.log(popupCardForm.checkValidity());
    const inputCardNameValue = popupCardNameInput.value;
    const inputCardUrlValue = popupCardUrlInput.value;
    renderCard(inputCardNameValue, inputCardUrlValue);
    popupCardForm.reset();
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
  const newCard = createCard(name, link);
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

profileEditButton.addEventListener('click', openProfilePopup);

// closeButtons.forEach((button) => {
//   const popup = button.closest('.popup');
//   button.addEventListener('click', () => closePopup(popup));
// })

popups.forEach(popup => {

  popup.addEventListener('mousedown', (e) => {

    if (e.target.classList.contains('popup_opened') || e.target.classList.contains('popup__close-btn')) {
      closePopup(popup);
    }

  })
})

popupUserForm.addEventListener('submit', handleUserFormSubmit);
profileAddButton.addEventListener('click', () => openPopup(popupCard));
popupCardForm.addEventListener('submit', handleCardFormSubmit);

//////////
