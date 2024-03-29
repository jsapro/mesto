import {
  profileEditButton,
  profileAddCardButton,
  profileNameElement,
  profileJobElement,
  popupUserNameInput,
  popupUserJobInput,
  popupCard,
  popupUser,
  templateCard,
  formValidationConfig,
} from "../scripts/utils/constants.js";

import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithSubmit from "../scripts/components/PopupWithSubmit.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";

import "./index.css";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-64",
  headers: {
    authorization: "7b039d36-24df-4fc5-8845-0a44a0767175",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameInputSelector: ".profile__name",
  professionInputSelector: ".profile__job",
  avatarSelector: ".profile__photo",
});

function handleSubmit(request, popupInstance, loadingText = "Сохранение...") {
  popupInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      popupInstance.closePopup();
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}

const popupWithSubmit = new PopupWithSubmit(".popup_delete-card", (card) => {
  // confirmCallback в PopupWithSubmit
  function makeRequest() {
    return api.deleteCard(card.getCardId()).then(() => {
      card.deleteCard();
    });
  }
  handleSubmit(makeRequest, popupWithSubmit, "Удаление...");
});

const imagePopup = new PopupWithImage(".popup_open-card");

const userPopup = new PopupWithForm(".popup_edit-profile", (inputValues) => {
  function makeRequest() {
    return api.setUserInfo(inputValues).then((userData) => {
      userInfo.setUserInfo(userData);
    });
  }
  handleSubmit(makeRequest, userPopup);
});

const cardPopup = new PopupWithForm(".popup_add-card", (inputValues) => {
  function makeRequest() {
    return api.postCard(inputValues).then((cardData) => {
      renderCard(cardData);
    });
  }
  handleSubmit(makeRequest, cardPopup);
});

const avatarPopup = new PopupWithForm(".popup_avatar-update", (inputValues) => {
  function makeRequest() {
    return api.setUserAvatar(inputValues).then((userData) => {
      userInfo.setUserInfo(userData);
    });
  }
  handleSubmit(makeRequest, avatarPopup);
});

const formList = Array.from(
  document.querySelectorAll(formValidationConfig.formSelector)
);

const formValidators = {};

formList.forEach((formElement) => {
  const formValidator = new FormValidator(formElement, formValidationConfig);
  formValidators[formElement.name] = formValidator;
  formValidator.enableValidation();
});

const handleCardPreview = (data) => {
  // метод в Card
  imagePopup.openPopup(data);
};

const section = new Section({ renderer: renderCard }, ".grid-cards__container");

let myId = null;

function createCard(item) {
  const card = new Card({
    data: item,
    template: templateCard,
    handleCardPreview: handleCardPreview,
    handleDeleteClick: () => {
      popupWithSubmit.openPopup();
      popupWithSubmit.setCardToDelete(card);
    },
    handleLikeClick: (cardId, hasMyLike) => {
      if (hasMyLike) {
        api
          .deleteLike(cardId)
          .then((res) => {
            card.setLikesCount(res.likes);
            card.updateLikeArray(res.likes);
            card.deleteLike();
          })
          .catch((err) => console.log("ошибка-handleLikeClick-DELETE: ", err));
      } else {
        api
          .setLike(cardId)
          .then((res) => {
            card.setLikesCount(res.likes);
            card.updateLikeArray(res.likes);
            card.setLike();
          })
          .catch((err) => console.log("ошибка-handleLikeClick-PUT: ", err));
      }
    },
    userIdFromServer: myId,
  });
  const cardElement = card.createCard();
  return cardElement;
}

function renderCard(item) {
  //метод renderer в Section
  const cardElement = createCard(item);
  section.addItem(cardElement);
}

function handleProfilePopup() {
  //submitCallback в PopupWithForm
  userPopup.openPopup();
  formValidators["profile-form"].removeValidationErrors();
  const userData = userInfo.getUserInfo();
  userPopup.setInputValues(userData);
}

function handleAddCardPopup(popupCard) {
  //submitCallback в PopupWithForm
  cardPopup.openPopup();
  formValidators["card-form"].removeValidationErrors();
}

function handleAvatarPopup() {
  avatarPopup.openPopup();
  formValidators["avatar-update-form"].removeValidationErrors();
}

function setInitialUser(data) {
  userInfo.setUserInfo(data);
}

Promise.all([api.getUserInfoFromServer(), api.getInitialCards()])
  .then(([userData, cards]) => {
    myId = userData._id;
    setInitialUser(userData);
    section.renderInitialItems(cards);
  })
  .catch((err) => console.log("ошибка-Promise.all: ", err));

popupWithSubmit.setEventListeners();
imagePopup.setEventListeners();
userPopup.setEventListeners();
avatarPopup.setEventListeners();
cardPopup.setEventListeners();

const profileAvatarButton = document.querySelector(".profile__avatar-button");
profileAvatarButton.addEventListener("click", handleAvatarPopup);
profileEditButton.addEventListener("click", handleProfilePopup);
profileAddCardButton.addEventListener("click", () => {
  handleAddCardPopup(popupCard);
});
