import {
  gridCardsContainer,
  profileEditButton,
  profileAddCardButton,
  profileNameElement,
  profileJobElement,
  popupUser,
  popupUserForm,
  popupUserNameInput,
  popupUserJobInput,
  popupCard,
  popupCardForm,
  popupCardNameInput,
  popupCardUrlInput,
  popupPreview,
  popupPreviewImg,
  popupPreviewCaption,
  templateCard,
  popups,
  initialCards,
  formValidationConfig,
} from './utils/constants.js';

import Card from './Card.js';

import FormValidator from './FormValidator.js';

import { removeValidationErrors } from './FormValidator.js';

import {
  closeOnEscape,
  openPopup,
  closePopup,
} from './utils/utils.js';

//! открытие попапа-профайла по клику
function handleProfilePopup () {
  openPopup(popupUser);
  removeValidationErrors(popupUserForm);
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
  renderCard({name: inputCardNameValue, link: inputCardUrlValue});
  popupCardForm.reset();
  closePopup(popupCard);
}

profileEditButton.addEventListener('click', handleProfilePopup);

popups.forEach(popup => {

  popup.addEventListener('mousedown', (e) => {

    if (e.target.classList.contains('popup_opened') || e.target.classList.contains('popup__close-btn')) {
      closePopup(popup);
    }

  })
})

popupUserForm.addEventListener('submit', handleUserFormSubmit);

function handleAddCardPopup (popupCard) {
  openPopup(popupCard);
  removeValidationErrors(popupCardForm);
}

profileAddCardButton.addEventListener('click', () => {
  handleAddCardPopup (popupCard)
})

popupCardForm.addEventListener('submit', handleCardFormSubmit);

//! рендер карточки на странице
function renderCard (data) {
  const card = new Card(data, templateCard);
  const cardElement = card.createCard();
  gridCardsContainer.prepend(cardElement);
}

//! создание карточек из массива
initialCards.forEach((item) => {
  renderCard(item);
});

const formList = Array.from(document.querySelectorAll(formValidationConfig.formSelector));

formList.forEach((formElement) => {
  const formValidator = new FormValidator(formElement, formValidationConfig);
  formValidator.enableValidation();
})


// ////////////////////////
//   // const formValidators = {};
//   // formValidators.edit = new FormValidator('form[name="edit"]');

//   // // а потом можно использовать вот так:
//   // formValidators[form.name].disableButton();

//   //////////
//   const formList = Array.from(document.querySelectorAll(formValidationConfig.formSelector));
//   const formValidators = {};

//   formList.forEach((formElement) => {
//       const formValidator = new FormValidator;(formElement, formValidationConfig);
//       const formName = formElement.getAttribute("name");
//       formValidators[formName] = formValidator;
//       formValidators.enableValidation();
//     })

//   console.dir(formValidators);

