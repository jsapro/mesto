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
        // profileNameElement.textContent = res.name;
        // profileJobElement.textContent = res.about;
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

// const handleDeleteClick = (id) => {
//   api.deleteCard(id)
//   .then(res => {
//     console.log(55, res);
//     card.deleteCard();
//   })
// };
// const handleLikeClick = (cardId, cardLikeCounterElement, hasMyLike) => {
//   console.log("cardId----:", cardId);
//   console.log("hasMyLike----:", hasMyLike);
//   if (hasMyLike) {
//     api
//       .deleteLike(cardId)
//       .then((res) => {
//         console.log(111111111, res);
//         cardLikeCounterElement.textContent = res.likes.length;
//         card.setMyLike(!hasMyLike);
//       })
//       .catch((err) => console.log("handleLikeClick-DELETE", err));
//   } else {
//     api
//       .setLike(cardId)
//       .then((res) => {
//         console.log(res.likes.length);
//         cardLikeCounterElement.textContent = res.likes.length;
//       })
//       .catch((err) => console.log("handleLikeClick-PUT", err));
//   }
// };

// const deleteSubmitPopup = document.querySelector('.popup_delete-card');
let myId;
function createCard(item) {
  const card = new Card({
    data: item,
    template: templateCard,
    handleCardPreview: handleCardPreview,
    handleDeleteClick: () => {
      popupWithSubmit.openPopup();
      popupWithSubmit.setCardToDelete(card);
      // api.deleteCard(card.getId())
      // .then(res => {
      //   console.log('card deleted', res);
      //   card.deleteCard();
      // })
      // .catch(err => console.log('cought-error-on-delete//', err))
    },
    handleLikeClick: (cardId, cardLikeCounterElement, hasMyLike) => {
      // console.log(card._isCardLiked(), 'card._isCardLiked()');
      // console.log("cardId----:", cardId);
      // console.log("hasMyLike----:", hasMyLike);
      if (hasMyLike) {
        api
          .deleteLike(cardId)
          .then((res) => {
            // console.log(111111111, res);
            console.log(res.likes.length);
            card.setLikesCount (res.likes);
            card.updateLikeArray (res.likes);
            card.deleteLike();
            // cardLikeCounterElement.textContent = res.likes.length;
            // card.setMyLike(!hasMyLike);
          })
          .catch((err) => console.log("handleLikeClick-DELETE", err));
      } else {
        api
          .setLike(cardId)
          .then((res) => {
            console.log(res.likes.length);
            card.setLikesCount (res.likes);
            card.updateLikeArray (res.likes);
            card.setLike();
            // cardLikeCounterElement.textContent = res.likes.length;
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

// api.getInitialCards()
// .then(res => {
//   console.groupCollapsed(res);
//   res.forEach(card => console.log('initialCards-с-сервера: ', card.name, 1, card.owner.name, 1, card.owner.about))
//   console.groupEnd();
//   section.renderInitialItems(res);
// })
// .catch(err => console.log('getInitialCards', err))

// api.setUserInfo(profileNameElement, profileJobElement)
// .then(res => {
//   console.log('setUserInfo', res);
//   // profileNameElement.textContent = res.name;
//   // profileJobElement.textContent = res.about;
// })
// .catch(err => console.log('setUserInfo', err))

function setInitialUser(res) {
  // profileNameElement.textContent = res.name;
  // profileJobElement.textContent = res.about;
  userInfo.setUserInfo(res);
  document.querySelector(".profile__photo").src = res.avatar;
}

// api.getUserInfoFromServer()
// .then(res => {
//   console.log('getUserInfoFromServer', res);
//   setInitialUser(res);
//   console.log(333333, userInfo.getUserInfo());
// })
// .catch(err => console.log('getUserInfoFromServer', err));

Promise.all([api.getUserInfoFromServer(), api.getInitialCards()])
  .then((res) => {
    console.log(res);
    console.log(res[0]._id);
    myId = res[0]._id;

    // console.log("getUserInfoFromServer", res[0]);
    setInitialUser(res[0]);
    console.log(333333, userInfo.getUserInfo());

    console.groupCollapsed(res[1]);
    res[1].forEach((card) =>
      console.log(
        "initialCards-с-сервера: ",
        card.name,
        1,
        card.owner.name,
        1,
        card.owner.about
      )
    );
    console.groupEnd();
    section.renderInitialItems(res[1]);
  })
  .catch((err) => console.log("Promise.all: ", err));

// api.deleteCard()
// .then()
