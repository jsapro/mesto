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


const profileEditBtnElement = document.querySelector('.profile__edit-button');
const profileAddBtnElement = document.querySelector('.profile__add-button');
const profileNameElement = document.querySelector('.profile__name');
const profileJobElement = document.querySelector('.profile__job');

// const popupOpenedElement = document.querySelector('.popup_opened');
const popupUserCloseBtnElement = document.querySelector('.popup__close-btn');
// const popupSubmitElement = document.querySelector('.popup__submit');
const popupElement = document.querySelector('.popup_edit-profile');
const popupInfoElement = popupElement.querySelector('.popup__info');
const popupNameElement = popupElement.querySelector('.popup__input_type_name');
const popupJobElement = popupElement.querySelector('.popup__input_type_job');

// const gridCardLikeElement = document.querySelector('.grid-card__like');

const popupAddCardElement = document.querySelector('.popup_add-card');
// const popupCardNameElement = popupAddCardElement.querySelector('.popup__input_type_card-name');
// const popupCardUrlElement = popupAddCardElement.querySelector('.popup__input_type_card-url');
const popupSubmitCardElement = popupAddCardElement.querySelector('.popup__submit')
const popupCardCloseBtnElement = popupAddCardElement.querySelector('.popup__close-btn')


//! открытие-закрытие попапов
function openPopup (elem) {
  elem.classList.add('popup_opened')
}

function closePopup (elem) {
  elem.classList.remove('popup_opened');
}


//! открыть попап и заполнить
function handlePopupProfile () {
  openPopup(popupElement);
  // popupElement.classList.add('popup_opened');
  popupNameElement.value = profileNameElement.textContent;
  popupJobElement.value = profileJobElement.textContent;
}


//! открытие попапа-профайла по клику
profileEditBtnElement.addEventListener('click', handlePopupProfile);


//! закрытие попапа-профайла по клику
popupUserCloseBtnElement.addEventListener('click', () => closePopup(popupElement));


//! submit попапа-профайла
function handleUserFormSubmit (e) {
  e.preventDefault();
  profileNameElement.textContent = popupNameElement.value;
  profileJobElement.textContent = popupJobElement.value;
  closePopup(popupElement);
}
popupInfoElement.addEventListener('submit', handleUserFormSubmit);


//! открытие попапа-карточек по клику
profileAddBtnElement.addEventListener('click', () => openPopup(popupAddCardElement));

// function openPopupCard () {
//   // popupAddCardElement.classList.add('popup_opened');
//   openPopup(popupAddCardElement);
// }

//! закрытие попапа-карточек по клику
const popupAddCardFormElement = popupAddCardElement.querySelector('.popup__info');

// function closePopup_2 () {
//   popupAddCardElement.classList.remove('popup_opened');
// }

function handleCardFormSubmit (e) {
  console.log(e);
  console.log(popupSubmitCardElement);
  e.preventDefault();
  closePopup(popupAddCardElement);
}

popupAddCardFormElement.addEventListener('submit', handleCardFormSubmit);

popupCardCloseBtnElement.addEventListener('click', () => closePopup(popupAddCardElement));


// initialCards.forEach(console.log(value));




/////////////
