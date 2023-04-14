import {
  profileEditButton,
  profileAddCardButton,
  profileNameElement,
  profileJobElement,
  popupUserNameInput,
  popupUserJobInput,
  popupCard,
  templateCard,
  initialCards,
  formValidationConfig,
} from "../scripts/utils/constants.js";

import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import Popup from "../scripts/components/Popup.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithSubmit from "../scripts/components/PopupWithSubmit.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";

import "./index.css";

const api = new Api();

const userInfo = new UserInfo(
  {
    nameInputSelector: ".profile__name",
    professionInputSelector: ".profile__job",
  },
  api
);

const popupWithSubmit = new PopupWithSubmit(".popup_delete-card", (card) => {
  console.log("идёт подтверждение удаления");
  api
    .deleteCard(card.getCardId())
    .then((res) => {
      console.log("ответ сервера на удаление: ", res);
      card.deleteCard();
      popupWithSubmit.closePopup();
    })
    .catch((err) => console.log("cought-error-on-delete//", err));
});
popupWithSubmit.setEventListeners();

const imagePopup = new PopupWithImage(".popup_open-card");
imagePopup.setEventListeners();

const userPopup = new PopupWithForm(
  ".popup_edit-profile",
  ({ nickname, job }) => {
    api
      .setUserInfo(nickname, job)
      .then((res) => {
        console.log("setUserInfo", res);
        userInfo.setUserInfo({ name: nickname, about: job });
      })
      .catch((err) => console.log("setUserInfo", err));
    userPopup.closePopup();
  }
);
userPopup.setEventListeners();

const cardPopup = new PopupWithForm(
  ".popup_add-card",
  ({ description, url }) => {
    cardPopup.setButtonText("Загрузка...");
    api
      .postCard({ name: description, link: url })
      .then((res) => {
        console.log("postCard-ответ-сервера: ", res);
        renderCard({
          name: res.name,
          link: res.link,
          _id: res._id,
          likes: res.likes,
          owner: res.owner,
        });
        console.log("renderCard _id с сервера: ", res._id);
      })
      .catch((err) => console.log("cought-err-on-post//", err))
      .finally(() => {
        cardPopup.closePopup();
        cardPopup.setButtonText("Сохранить");
      });
  }
);
cardPopup.setEventListeners();

const avatarPopup = new PopupWithForm(
  ".popup_avatar-update",
  ({ avatarUrl: avatarUrlFromInput }) => {
    api
      .setUserAvatar(avatarUrlFromInput)
      .then((res) => console.log("setUserAvatar", res))
      .then(() => {
        document.querySelector(".profile__photo").src = avatarUrlFromInput;
      })
      .catch((err) => console.log("setUserAvatar", err));
    avatarPopup.closePopup();
  }
);

avatarPopup.setEventListeners();

const formList = Array.from(
  document.querySelectorAll(formValidationConfig.formSelector)
);
const formValidators = {};

formList.forEach((formElement) => {
  const formValidator = new FormValidator(formElement, formValidationConfig);
  formValidators[formElement.name] = formValidator;
  formValidator.enableValidation();
});

//! превью фото
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
    handleLikeClick: (cardId, cardLikeCounterElement, hasMyLike) => {
      if (hasMyLike) {
        api
          .deleteLike(cardId)
          .then((res) => {
            // console.log(111111111, res);
            console.log(res.likes.length);
            card.setLikesCount(res.likes);
            card.updateLikeArray(res.likes);
            card.deleteLike();
          })
          .catch((err) => console.log("handleLikeClick-DELETE", err));
      } else {
        api
          .setLike(cardId)
          .then((res) => {
            console.log(res.likes.length);
            card.setLikesCount(res.likes);
            card.updateLikeArray(res.likes);
            card.setLike();
          })
          .catch((err) => console.log("handleLikeClick-PUT", err));
      }
    },
    userIdFromServer: myId,
  });
  const cardElement = card.createCard();
  return cardElement;
}

//! рендер карточки на странице
function renderCard(item) {
  //метод renderer в Section
  const cardElement = createCard(item);
  section.addItem(cardElement);
}

//! открытие попапа-профайла по клику
function handleProfilePopup() {
  //submitCallback в PopupWithForm
  userPopup.openPopup();
  formValidators["profile-form"].removeValidationErrors();
  const userData = userInfo.getUserInfo();
  userPopup.setInputValues(userData);
}

function handleAddCardPopup(popupCard) {
  //submitCallback в PopupWithForm
  cardPopup.openPopup(popupCard);
  formValidators["card-form"].removeValidationErrors();
}

profileEditButton.addEventListener("click", handleProfilePopup);

profileAddCardButton.addEventListener("click", () => {
  handleAddCardPopup(popupCard);
});

function handleAvatarPopup() {
  avatarPopup.openPopup();
  formValidators["avatar-update-form"].removeValidationErrors();
}

const profileAvatarButton = document.querySelector(".profile__avatar-button");
profileAvatarButton.addEventListener("click", handleAvatarPopup);

function setInitialUser(res) {
  userInfo.setUserInfo(res);
  document.querySelector(".profile__photo").src = res.avatar;
}

Promise.all([api.getUserInfoFromServer(), api.getInitialCards()])
  .then((res) => {
    console.log(res);
    console.log(res[0]._id);
    myId = res[0]._id;

    setInitialUser(res[0]);

    section.renderInitialItems(res[1]);
  })
  .catch((err) => console.log("Promise.all: ", err));
