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
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';

const userInfo = new UserInfo(
  {
    nameInputSelector: '.profile__name',
    professionInputSelector: '.profile__job'
  }
);

const userInputData = {name: null, profession: null}

//! превью фото
const handleCardPreview = (data) => {
 const popup = new PopupWithImage(popupPreview, popupPreviewImg, popupPreviewCaption, data);
 popup.setEventListeners();
 popup.openPopup();
//  setTimeout(popup.closePopup, 7000); // bind(this) in Popup
}

const section = new Section({data: initialCards, renderer:  renderCard}, 'grid-cards__container');
section.renderInitialItems();

//! рендер карточки на странице
function renderCard (data) { //метод renderer в Section
  const card = new Card(data, templateCard, handleCardPreview);
  const cardElement = card.createCard();
  section.addItem(cardElement);
}

const formList = Array.from(document.querySelectorAll(formValidationConfig.formSelector));
const formValidators = {};

formList.forEach((formElement) => {
    const formValidator = new FormValidator(formElement, formValidationConfig);
    formValidators[formElement.name] = formValidator;
    formValidator.enableValidation();
})

//! открытие попапа-профайла по клику
function handleProfilePopup () {
  const userPopup = new PopupWithForm(popupUser, ({nickname, job}) => {
    userInputData.name = popupUserNameInput.value;
    userInputData.profession = popupUserJobInput.value;

    userInfo.setUserInfo ({name: nickname, profession:job});
    userPopup.closePopup();
  });

  userPopup.setEventListeners();
  userPopup.openPopup();
  formValidators['profile-form'].removeValidationErrors(popupUserForm);
  popupUserNameInput.value = userInfo.getUserInfo().name;
  popupUserJobInput.value = userInfo.getUserInfo().profession;
}

function handleAddCardPopup (popupCard) {
  const cardPopup = new PopupWithForm(popupCard, ({description, url}) => {
    // const inputCardNameValue = popupCardNameInput.value;
    // const inputCardUrlValue = popupCardUrlInput.value;
    renderCard({ name: description, link:url });
    cardPopup.closePopup();
  });

  cardPopup.setEventListeners();
  cardPopup.openPopup(popupCard);
  formValidators['card-form'].removeValidationErrors(popupCardForm);
}

profileEditButton.addEventListener('click', handleProfilePopup);

profileAddCardButton.addEventListener('click', () => {
  handleAddCardPopup (popupCard)
})
