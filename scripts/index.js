let profileEditBtnElement = document.querySelector('.profile__edit-button');
let profileAddBtnElement = document.querySelector('.profile__add-button');

let popupOpenedElement = document.querySelector('.popup_opened');

let popupCloseBtnElement = document.querySelector('.popup__close-btn');
let popupSubmitElement = document.querySelector('.popup__submit');
let gridCardLikeElement = document.querySelector('.grid-card__like');
let popupElement = document.querySelector('.popup');
let popupInfoElement = document.querySelector('.popup__info');
let popupNameElement = document.querySelector('.popup__input_type_name');
let popupJobElement = document.querySelector('.popup__input_type_job');
let profileNameElement = document.querySelector('.profile__name');
let profileJobElement = document.querySelector('.profile__job');


function openPopup () {
  popupElement.classList.add('popup_opened');
  popupNameElement.value = profileNameElement.textContent;
  popupJobElement.value = profileJobElement.textContent;
}

profileEditBtnElement.addEventListener('click', openPopup);

function closePopup () {
  popupElement.classList.remove('popup_opened');
}

popupCloseBtnElement.addEventListener('click', closePopup);

function handleFormSubmit (e) {
  e.preventDefault();
  profileNameElement.textContent = popupNameElement.value;
  profileJobElement.textContent = popupJobElement.value;
  closePopup();
}

popupInfoElement.addEventListener('submit', handleFormSubmit);

//test pull request-3


