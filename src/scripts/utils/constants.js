export const gridCardsContainer = document.querySelector('.grid-cards__container');

export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddCardButton = document.querySelector('.profile__add-button');
export const profileNameElement = document.querySelector('.profile__name');
export const profileJobElement = document.querySelector('.profile__job');

export const popupUser = document.querySelector('.popup_edit-profile');
export const popupUserForm = document.forms['profile-form'];
export const popupUserNameInput = popupUser.querySelector('.popup__input_type_name');
export const popupUserJobInput = popupUser.querySelector('.popup__input_type_job');

export const popupCard = document.querySelector('.popup_add-card');
export const popupCardForm = document.forms['card-form'];
export const popupCardNameInput = popupCard.querySelector('.popup__input_type_card-name');
export const popupCardUrlInput = popupCard.querySelector('.popup__input_type_card-url');

export const popupPreview = document.querySelector('.popup_open-card');
export const popupPreviewImg =  popupPreview.querySelector('.popup__img');
export const popupPreviewCaption =  popupPreview.querySelector('.popup__caption');

export const templateCard = document.querySelector('.template-card').content;
export const popups = document.querySelectorAll('.popup')

export const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  inputErrorActiveClass: 'popup__input-error_active',
  errorClass: 'popup__error_visible'
};
