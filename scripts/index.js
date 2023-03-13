import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {formValidationConfig} from './FormValidator.js';

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
const popupUserForm = document.forms['profile-form'];
const popupUserNameInput = popupUser.querySelector('.popup__input_type_name');
const popupUserJobInput = popupUser.querySelector('.popup__input_type_job');

const popupCard = document.querySelector('.popup_add-card');
const popupCardForm = document.forms['card-form'];
// const popupCardSubmit = popupCard.querySelector('.popup__submit')
const popupCardNameInput = popupCard.querySelector('.popup__input_type_card-name');
const popupCardUrlInput = popupCard.querySelector('.popup__input_type_card-url');

export const popupPreview = document.querySelector('.popup_open-card');
export const popupPreviewImg =  popupPreview.querySelector('.popup__img');
export const popupPreviewCaption =  popupPreview.querySelector('.popup__caption');

const templateCard = document.querySelector('.template-card').content;
// const closeButtons = document.querySelectorAll('.popup__close-btn');
const popups = document.querySelectorAll('.popup')

function closeOnEscape(e) {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

export function openPopup (popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closeOnEscape);
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnEscape);
}

function hideInputError (formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  errorElement.textContent = '';
  errorElement.classList.remove(config.inputErrorActiveClass);
  inputElement.classList.remove(config.inputErrorClass);
}

//! открытие попапа-профайла по клику
function openProfilePopup () {
  openPopup(popupUser);
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
  const inputCardNameValue = popupCardNameInput.value;
  const inputCardUrlValue = popupCardUrlInput.value;
  renderCard(inputCardNameValue, inputCardUrlValue);
  popupCardForm.reset();
  closePopup(popupCard);
}

profileEditButton.addEventListener('click', openProfilePopup);

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

//! рендер карточки на странице
function renderCard (name, link) {
  const card = new Card(name, link, templateCard);
  const cardElement = card.createCard();
  gridCardsContainer.prepend(cardElement);
}

//! создание карточек из массива
initialCards.forEach((item) => {
  renderCard(item.name, item.link);
});

const formList = Array.from(document.querySelectorAll(formValidationConfig.formSelector));

formList.forEach((formElement) => {
  const formValidator = new FormValidator(formElement, formValidationConfig);
  formValidator.enableValidation();
})

//////////
