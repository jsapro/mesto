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

// import {
//   openPopup,
//   closePopup,
// } from './utils/utils.js';

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';


// function renderCard (cardData) {
//   const card = new Card;
//   const cardElement = card.createCard(cardData);
//   gridCardsContainer.prepend(element);
// }

//! превью фото
const handleCardPreview = (data) => {
//  popupPreviewImg.src = data.link;
//  popupPreviewImg.alt = data.name;
//  popupPreviewCaption.textContent = data.name;
 const popup = new PopupWithImage(popupPreview, popupPreviewImg, popupPreviewCaption, data);
 popup.setEventListeners();
 popup.openPopup();
 setTimeout(popup.closePopup, 7000); // bind(this) in Popup
}

const section = new Section({items: initialCards, renderer:  renderCard}, 'grid-cards__container');
section.renderInitialItems();

//! рендер карточки на странице
function renderCard (data) { //метод renderer в Section
  const card = new Card(data, templateCard, handleCardPreview);
  const cardElement = card.createCard();
  // const section = new Section({items: initialCards, renderer: renderCard}, 'grid-cards__container');
  section.addItem(cardElement);
}







const formList = Array.from(document.querySelectorAll(formValidationConfig.formSelector));
const formValidators = {};

formList.forEach((formElement) => {
    const formValidator = new FormValidator(formElement, formValidationConfig);
    formValidators[formElement.name] = formValidator;
    formValidator.enableValidation();
})

// console.dir(formValidators['card-form']);
// console.dir(formValidators['profile-form']);

//! открытие попапа-профайла по клику
function handleProfilePopup () {
  const popupWithForm = new PopupWithForm(popupUser, (e) => {
    e.preventDefault();
    profileNameElement.textContent = popupUserNameInput.value;
    profileJobElement.textContent = popupUserJobInput.value;

    popupWithForm.closePopup();
  });

  popupWithForm.setEventListeners();
  popupWithForm.openPopup();
  formValidators['profile-form'].removeValidationErrors(popupUserForm);
  popupUserNameInput.value = profileNameElement.textContent;
  popupUserJobInput.value = profileJobElement.textContent;
}

        // //! submit попапа-профайла
        // function handleUserFormSubmit (e) { // перенёс в аргумент handleProfilePopup
        //   e.preventDefault();
        //   profileNameElement.textContent = popupUserNameInput.value;
        //   profileJobElement.textContent = popupUserJobInput.value;

        //   closePopup(popupUser);
        //   // popup.closePopup();
        // }

        //! обработка submit и закрытие попапа-карточек
        // function handleCardFormSubmit (e) {  // перенёс в аргумент handleAddCardPopup
        //   e.preventDefault();
        //   const inputCardNameValue = popupCardNameInput.value;
        //   const inputCardUrlValue = popupCardUrlInput.value;
        //   renderCard({name: inputCardNameValue, link: inputCardUrlValue});
        //   popupCardForm.reset();
        //   closePopup(popupCard);
        //   // popup.closePopup();
        // }

profileEditButton.addEventListener('click', handleProfilePopup);


// popupUserForm.addEventListener('submit', handleUserFormSubmit); //перенёс в PopupWithForm

function handleAddCardPopup (popupCard) {
  const popupWithForm = new PopupWithForm(popupCard, (e) => {
    e.preventDefault();
    const inputCardNameValue = popupCardNameInput.value;
    const inputCardUrlValue = popupCardUrlInput.value;
    renderCard({name: inputCardNameValue, link: inputCardUrlValue});
    // popupCardForm.reset();
    popupWithForm.closePopup();
  });

  popupWithForm.setEventListeners();
  popupWithForm.openPopup(popupCard);
  formValidators['card-form'].removeValidationErrors(popupCardForm);
}

profileAddCardButton.addEventListener('click', () => {
  handleAddCardPopup (popupCard)
})

// popupCardForm.addEventListener('submit', handleCardFormSubmit); //перенёс в PopupWithForm

// //! рендер карточки на странице
// function renderCard (data) {
  //   const card = new Card(data, templateCard);
  //   const cardElement = card.createCard();
  //   gridCardsContainer.prepend(cardElement);
  // }

  // //! создание карточек из массива
  // initialCards.forEach((item) => {
    //   renderCard(item);
    // });


    // const formList = Array.from(document.querySelectorAll(formValidationConfig.formSelector));

    // formList.forEach((formElement) => {
      //   const formValidator = new FormValidator(formElement, formValidationConfig);
      //   formValidator.enableValidation();
      // })


      ////////////////////////
      // const formValidators = {};
      // formValidators.edit = new FormValidator('form[name="edit"]');

      // // а потом можно использовать вот так:
      // formValidators[form.name].disableButton();

      //////////


      // popups.forEach(popup => {

      //   popup.addEventListener('mousedown', (e) => {

      //     if (e.target.classList.contains('popup_opened') || e.target.classList.contains('popup__close-btn')) {
      //       closePopup(popup);
      //     }

      //   })
      // })

