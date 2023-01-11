let profileEditBtnElement = document.querySelector('.profile__edit-button');
let profileAddBtnElement = document.querySelector('.profile__add-button');

let popupOpenedElement = document.querySelector('.popup_opened');

let popupCloseBtnElement = document.querySelector('.popup__close-btn');
let popupSubmitElement = document.querySelector('.popup__submit');
let gridCardLikeElement = document.querySelector('.grid-card__like');
let popupElement = document.querySelector('.popup');
let popupInfoElement = document.querySelector('.popup__info');
let popupNameElement = document.querySelector('.popup__name');
let popupJobElement = document.querySelector('.popup__job');
let profileNameElement = document.querySelector('.profile__name');
let profileJobElement = document.querySelector('.profile__job');


function popupOpend () {
  popupElement.classList.add('popup_opened');
}

profileEditBtnElement.addEventListener('click', popupOpend);

function popupClosed () {
  popupElement.classList.remove('popup_opened');
}

popupCloseBtnElement.addEventListener('click', popupClosed);

function handleFormSubmit (e) {
  e.preventDefault();
}

popupInfoElement.addEventListener('submit', handleFormSubmit);
popupInfoElement.addEventListener('submit', addInfo);

function addInfo () {
  profileNameElement.textContent = popupNameElement.value;
  profileJobElement.textContent = popupJobElement.value;
}

popupSubmitElement.addEventListener('click', popupClosed);
