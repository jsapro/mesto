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

const gridCardsContainer = document.querySelector('.grid-cards__container');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileNameElement = document.querySelector('.profile__name');
const profileJobElement = document.querySelector('.profile__job');

const popupUser = document.querySelector('.popup_edit-profile');
const popupUserFormElement = popupUser.querySelector('.popup__info');
const popupUserCloseButton = popupUser.querySelector('.popup__close-btn');
const popupUserNameInput = popupUser.querySelector('.popup__input_type_name');
const popupUserJobInput = popupUser.querySelector('.popup__input_type_job');

const popupCard = document.querySelector('.popup_add-card');
const popupCardFormElement = popupCard.querySelector('.popup__info');
const popupCardSubmit = popupCard.querySelector('.popup__submit')
const popupCardCloseButton = popupCard.querySelector('.popup__close-btn')

const templateCard = document.querySelector('.template-card').content;
const templateCardImg = templateCard.querySelector('.grid-card__img');
const templateCardName = templateCard.querySelector('.grid-card__name');

//! открытие-закрытие попапов
function openPopup (elem) {
  elem.classList.add('popup_opened')
}

function closePopup (elem) {
  elem.classList.remove('popup_opened');
}


//! открыть попап и заполнить
function handlePopupProfile () {
  openPopup(popupUser);
  // popupElement.classList.add('popup_opened');
  popupUserNameInput.value = profileNameElement.textContent;
  popupUserJobInput.value = profileJobElement.textContent;
}


//! открытие попапа-профайла по клику
profileEditButton.addEventListener('click', handlePopupProfile);


//! закрытие попапа-профайла по клику
popupUserCloseButton.addEventListener('click', () => closePopup(popupUser));


//! submit попапа-профайла
function handleUserFormSubmit (e) {
  e.preventDefault();
  profileNameElement.textContent = popupUserNameInput.value;
  profileJobElement.textContent = popupUserJobInput.value;
  closePopup(popupUser);
}
popupUserFormElement.addEventListener('submit', handleUserFormSubmit);


//! открытие попапа-карточек по клику
profileAddButton.addEventListener('click', () => openPopup(popupCard));


//! submit попапа-карточек по клику
function handleCardFormSubmit (e) {
  console.log(e);
  console.log(popupCardSubmit);
  e.preventDefault();
  closePopup(popupCard);
}
popupCardFormElement.addEventListener('submit', handleCardFormSubmit);


//! закрытие попапа-карточек по клику
popupCardCloseButton.addEventListener('click', () => closePopup(popupCard));


//! создание карточек из массива --- создание карточек из массива --- создание карточек из массива

//! создание элемента из шаблона

// templateCardName
// templateCardImg

const createCard = function () {
  const newCard = templateCard
  .querySelector('.grid-card')
  .cloneNode(true);
  // console.log(newCard);
  return newCard;
}

createCard();

// const templateCard = document.querySelector('.template-card');
// console.log(templateCard.content);
// templateCard.content.document.querySelector('.grid-card')


const renderCard = function (name, link) {
  templateCardName.textContent = name;
  templateCardImg.src = link;
  let d = createCard();
  console.log('555--  ' + name, templateCardName.textContent)
  // templateCardImg.src = link;
    // d.textContent = item;
    // d.style.color = 'red';

    gridCardsContainer.append(d);

  // gridCardsContainer.prepend(createCard(item, link));
  // let d = document.createElement('img');
  // return d
}

initialCards.forEach((item) => {
  renderCard(item.name, item.link);
  // add renderCard

  // console.log(item.name)
});


// git test pull request
/////////////
