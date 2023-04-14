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

const api = new Api();

const userInfo = new UserInfo({
  nameInputSelector: ".profile__name",
  professionInputSelector: ".profile__job",
});

const popupWithSubmit = new PopupWithSubmit(".popup_delete-card", (card) => {
  popupWithSubmit.setButtonText("Удаление...");
  api
    .deleteCard(card.getCardId())
    .then((res) => {
      console.log("ответ сервера на удаление: ", res);
      card.deleteCard();
      popupWithSubmit.closePopup();
    })
    .catch((err) => console.log("ошибка при удалении карточки: ", err))
    .finally(() => {
      popupWithSubmit.setButtonText("Да");

    })
});

const imagePopup = new PopupWithImage(".popup_open-card");

const userPopup = new PopupWithForm(
  ".popup_edit-profile",
  ({ nickname, job }) => {
    userPopup.setButtonText("Сохранение...");
    api
      .setUserInfo(nickname, job)
      .then((res) => {
        userInfo.setUserInfo({ name: nickname, about: job });
      })
      .catch((err) => console.log("ошибка-setUserInfo: ", err))
      .finally(() => {
        userPopup.closePopup();
        userPopup.setButtonText("Сохранить");
      })

  }
);

const cardPopup = new PopupWithForm(
  ".popup_add-card",
  ({ description, url }) => {
    cardPopup.setButtonText("Сохранение...");
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
      .catch((err) => console.log("ошибка-postCard: ", err))
      .finally(() => {
        cardPopup.closePopup();
        cardPopup.setButtonText("Сохранить");
      });
  }
);

const avatarPopup = new PopupWithForm(
  ".popup_avatar-update",
  ({ avatarUrl: avatarUrlFromInput }) => {
    avatarPopup.setButtonText("Сохранение...");
    api
      .setUserAvatar(avatarUrlFromInput)
      .then((res) => console.log("setUserAvatar", res))
      .then(() => {
        document.querySelector(".profile__photo").src = avatarUrlFromInput;
      })
      .catch((err) => console.log("ошибка-setUserAvatar: ", err))
      .finally(() => {
        avatarPopup.closePopup();
        avatarPopup.setButtonText("Сохранить");
      })
  }
);

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
            console.log(res.likes.length);
            card.setLikesCount(res.likes);
            card.updateLikeArray(res.likes);
            card.deleteLike();
          })
          .catch((err) => console.log("ошибка-handleLikeClick-DELETE: ", err));
      } else {
        api
          .setLike(cardId)
          .then((res) => {
            console.log(res.likes.length);
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
  cardPopup.openPopup(popupCard);
  formValidators["card-form"].removeValidationErrors();
}

function handleAvatarPopup() {
  avatarPopup.openPopup();
  formValidators["avatar-update-form"].removeValidationErrors();
}

function setInitialUser(res) {
  userInfo.setUserInfo(res);
  document.querySelector(".profile__photo").src = res.avatar;
}

Promise.all([api.getUserInfoFromServer(), api.getInitialCards()])
  .then((res) => {
    myId = res[0]._id;
    setInitialUser(res[0]);
    section.renderInitialItems(res[1]);
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
