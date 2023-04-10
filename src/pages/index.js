import {
  profileEditButton,
  profileAddCardButton,
  popupUserNameInput,
  popupUserJobInput,
  popupCard,
  templateCard,
  initialCards,
  formValidationConfig,
} from '../scripts/utils/constants.js';

import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import Popup from '../scripts/components/Popup.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';

import './index.css';

const userInfo = new UserInfo(
  {
    nameInputSelector: '.profile__name',
    professionInputSelector: '.profile__job'
  }
);

const imagePopup = new PopupWithImage('.popup_open-card');
imagePopup.setEventListeners();

const userPopup = new PopupWithForm('.popup_edit-profile', ({ nickname, job }) => {
  userInfo.setUserInfo (nickname, job);
  userPopup.closePopup();
});
userPopup.setEventListeners();

const cardPopup = new PopupWithForm('.popup_add-card', ({ description, url }) => {
  renderCard({ name: description, link: url });
  cardPopup.closePopup();
});
cardPopup.setEventListeners();

const avatarPopup = new PopupWithForm('.popup_avatar-update', ({avatarUrl}) => {
  document.querySelector('.profile__photo').src = avatarUrl;
  avatarPopup.closePopup();
});

avatarPopup.setEventListeners();

const formList = Array.from(document.querySelectorAll(formValidationConfig.formSelector));
const formValidators = {};

formList.forEach((formElement) => {
  const formValidator = new FormValidator(formElement, formValidationConfig);
  formValidators[formElement.name] = formValidator;
  formValidator.enableValidation();
})

//! превью фото
const handleCardPreview = (data) => { // метод в Card
  imagePopup.openPopup(data);
}

const section = new Section({renderer:  renderCard}, '.grid-cards__container');

// const handleDeleteClick = (id) => {
//   api.deleteCard(id)
//   .then(res => {
//     console.log(55, res);
//     card.deleteCard();
//   })
// };
const handleLikeClick = () => {};

function createCard(item) {
  const card = new Card({data: item,
    template: templateCard,
    handleCardPreview: handleCardPreview,
    handleDeleteClick: (id) => {
      api.deleteCard(id)
      .then(res => {
        console.log(55, res);
        card.deleteCard();
      })
      .catch(err => console.log(778, err))
    },
    handleLikeClick});
  const cardElement = card.createCard();
  return cardElement;
}

//! рендер карточки на странице
function renderCard (item) { //метод renderer в Section
  const cardElement = createCard(item);
  section.addItem(cardElement);
}

//! открытие попапа-профайла по клику
function handleProfilePopup () {   //submitCallback в PopupWithForm
  userPopup.openPopup();
  formValidators['profile-form'].removeValidationErrors();
  const userData = userInfo.getUserInfo();
  userPopup.setInputValues(userData);
}

function handleAddCardPopup (popupCard) {  //submitCallback в PopupWithForm
  cardPopup.openPopup(popupCard);
  formValidators['card-form'].removeValidationErrors();
}

profileEditButton.addEventListener('click', handleProfilePopup);

profileAddCardButton.addEventListener('click', () => {
  handleAddCardPopup (popupCard)
})

function handleAvatarPopup () {
  avatarPopup.openPopup();
  formValidators['avatar-update-form'].removeValidationErrors();
}

const profileAvatarButton = document.querySelector('.profile__avatar-button');
profileAvatarButton.addEventListener('click', handleAvatarPopup);


const api = new Api();

api.getInitialCards()
.then(res => {
  res.forEach(card => console.log(card.name))
  section.renderInitialItems(res);
});

// api.deleteCard()
// .then()

