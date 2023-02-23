const gridCardsContainer = document.querySelector('.grid-cards__container');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileNameElement = document.querySelector('.profile__name');
const profileJobElement = document.querySelector('.profile__job');

const popupUser = document.querySelector('.popup_edit-profile');
const popupUserForm = popupUser.querySelector('.popup__form');
const popupUserCloseButton = popupUser.querySelector('.popup__close-btn');
const popupUserNameInput = popupUser.querySelector('.popup__input_type_name');
const popupUserJobInput = popupUser.querySelector('.popup__input_type_job');

const popupCard = document.querySelector('.popup_add-card');
const popupCardForm = popupCard.querySelector('.popup__form');
const popupCardCloseButton = popupCard.querySelector('.popup__close-btn')
const popupCardSubmit = popupCard.querySelector('.popup__submit')
const popupCardNameInput = popupCard.querySelector('.popup__input_type_card-name');
const popupCardUrlInput = popupCard.querySelector('.popup__input_type_card-url');

const popupPreview = document.querySelector('.popup_open-card');
const popupPreviewСloseButton = popupPreview.querySelector('.popup__close-btn');
const popupPreviewImg =  popupPreview.querySelector('.popup__img');
const popupPreviewCaption =  popupPreview.querySelector('.popup__caption');

const templateCard = document.querySelector('.template-card').content;
const templateCardImg = templateCard.querySelector('.grid-card__img');
const templateCardName = templateCard.querySelector('.grid-card__name');

function openPopup (popup) {
  popup.classList.add('popup_opened')
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

//! обработка попапа-профайла по клику
function handlePopupProfile () {
  openPopup(popupUser);
  popupUserNameInput.value = profileNameElement.textContent;
  popupUserJobInput.value = profileJobElement.textContent;
}

//! submit попапа-профайла
function handleUserFormSubmit (e) {
  // слишком громоздко - поискать другой способ
  const hasDisabledClassOnUserBtn = popupUser.querySelector('.popup__submit').classList.contains('popup__submit_disabled');
  e.preventDefault();
  if (!hasDisabledClassOnUserBtn) {
    profileNameElement.textContent = popupUserNameInput.value;
    profileJobElement.textContent = popupUserJobInput.value;
    closePopup(popupUser);
  } else {
    console.log('User form is not valid ❌⛔');

    !popupUserNameInput.validity.valid
    ? console.log('name > ' + popupUserNameInput.validationMessage)
    : console.log('name > ✅');

   !popupUserJobInput.validity.valid
    ? console.log('job > ' + popupUserJobInput.validationMessage)
    : console.log('job > ✅');
  }
}

//! обработка submit и закрытие попапа-карточек
function handleCardFormSubmit (e) {
  // слишком громоздко - поискать другой способ
  const hasDisabledClassOnCardBtn = popupCard.querySelector('.popup__submit').classList.contains('popup__submit_disabled');
  e.preventDefault();
  if (!hasDisabledClassOnCardBtn) {
    const inputCardNameValue = popupCardNameInput.value;
    const inputCardUrlValue = popupCardUrlInput.value;
    renderCard(inputCardNameValue, inputCardUrlValue);
    popupCardForm.reset();
    closePopup(popupCard);
  } else {
    console.log('Card form is not valid ❌⛔')

    !popupCardNameInput.validity.valid
    ? console.log('place > ' + popupCardNameInput.validationMessage)
    : console.log('place > ✅');

    !popupCardUrlInput.validity.valid
    ? console.log('url > ' + popupCardUrlInput.validationMessage)
    : console.log('url > ✅');

  }
}

//! клонирование карточки
function cloneCardTemplate () {
  const newCard = templateCard
  .querySelector('.grid-card')
  .cloneNode(true);
  return newCard;
}

//! создание нужной карточки с данными
function createCard (name, link) {
  const createdCard = cloneCardTemplate();
  const cardDeleteButton = createdCard.querySelector('.grid-card__delete')
  const cardLikeButton = createdCard.querySelector('.grid-card__like');
  const cardImage = createdCard.querySelector('.grid-card__img');
  createdCard.querySelector('.grid-card__name').textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  cardDeleteButton.addEventListener('click', () => createdCard.remove());
  cardLikeButton.addEventListener('click', toggleLikeButton);
  cardImage.addEventListener('click', () => handleCardPreview(name, link));
  return createdCard;
}

function toggleLikeButton (e) {
  e.target.classList.toggle('grid-card__like_active');
}

//! рендер карточки на странице
function renderCard (name, link) {
  newCard = createCard(name, link);
  gridCardsContainer.prepend(newCard);
}

//! превью фото
function handleCardPreview (name, link) {
  popupPreviewImg.src = link;
  popupPreviewImg.alt = name;
  popupPreviewCaption.textContent = name;
  openPopup(popupPreview);
}

//! создание карточек из массива
initialCards.forEach((item) => {
  renderCard(item.name, item.link);
});


profileEditButton.addEventListener('click', handlePopupProfile);
popupUserCloseButton.addEventListener('click', () => closePopup(popupUser));
popupUserForm.addEventListener('submit', handleUserFormSubmit);

profileAddButton.addEventListener('click', () => openPopup(popupCard));
popupCardForm.addEventListener('submit', handleCardFormSubmit);

popupCardCloseButton.addEventListener('click', () => closePopup(popupCard));
popupPreviewСloseButton.addEventListener('click', () => closePopup(popupPreview));

/////////////////////////////////

//! ВАЛИДАЦИЯ ФОРМ---ВАЛИДАЦИЯ ФОРМ---ВАЛИДАЦИЯ ФОРМ

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

function enableValidation (setup) {   //? на каждую форму preventDefault по submit + вызывает setEventListeners
  // найти массив форм
  const formList = Array.from(document.querySelectorAll(setup.formSelector));
  // через forEach каждой форме повесить слушатель submit
  // console.log(formList);
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (e) {
       // в слушателе поставить preventDefault
      e.preventDefault();

    });

    // функция setEventListeners(аргумент - форма)
    setEventListeners(formElement);
  })
}

function setEventListeners (formElement) {  //? toggleButton вначале + на каждый инпут вешает слушатель который toggleButton и проверяет поля на валидность
  //найти массив инпутов
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  //найти кнопку
  const buttonElement = formElement.querySelector('.popup__submit');

  //запустить toggleButtonState(аргументы - 1>>массив, 2>>кнопка). Это провалидирует форму до начала ввода туда значений
  toggleButtonState(inputList, buttonElement);
  //запустить forEach для массива и повесить слушатель input
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      //в слушателе коллбэк это функции toggleButtonState(аргументы - массив и кнопка) и checkInputValidity (аргументы - 1>>форма, принятая в setEventListeners, 2>>элемент из forEach)
      toggleButtonState(inputList, buttonElement);
      checkInputValidity(formElement, inputElement);
    });
  });
}

function checkInputValidity (formElement, inputElement) {  //? либо показать ошибки либо скрыть
  //если не валидная !validity.valid - запустить showInputError
  if (!inputElement.validity.valid) {
    //showInputError(аргументы - 1>>форма, 2>>input, 3>>validationMessage из input)
    showInputError(formElement, inputElement, inputElement.validationMessage)
  } else {
    //иначе (если валидная) запустить hideInputError
    //hideInputError(аргументы - 1>>форма, 2>>input)
    hideInputError(formElement, inputElement);
  }

}

function toggleButtonState(inputList, buttonElement) {  //? выключает кнопку если поля невалидны
  //если инпуты не валидные то кнопке добавить класс inactive
  //внутри if запустить проверку массива инпутов на валидность - функция hasInvalidInput (аргумент - 1>>массив инпутов)
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit_disabled');
  } else {
    //если валидные, то класс убрать
    buttonElement.classList.remove('popup__submit_disabled');
  }
}

function hasInvalidInput(inputList) {  //? проверка полей на валидность (итог true или false)
  //через some и validity.valid проверить массив на валидность - итог true или false
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function showInputError (formElement, inputElement, errorMessage) {  //? добавить класс для span и вставить текст ошибки
  //найти errorElement через `.${inputElement.id}-error`
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  //errorElement'у добавить  класс ...error_active
  errorElement.classList.add('popup__input-error_active');
  //errorElement'у добавить textContent
  errorElement.textContent = errorMessage;
  //инпуту добавить класс ...type_error
  inputElement.classList.add('popup__input_type_error');
    //удалить submit  если форма невалидна
    // popupUserForm.removeEventListener('submit', handleUserFormSubmit);
    // popupCardForm.removeEventListener('submit', handleCardFormSubmit);

}

function hideInputError(formElement, inputElement) {//? убрать класс для span и убрать текст ошибки
  //найти errorElement также как в showInputError
 const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  //errorElement'у убрать textContent
  errorElement.textContent = '';
  //errorElement'у удалить класс ...error_active
  errorElement.classList.remove('popup__input-error_active');
  //инпуту удалить класс ...type_error
  inputElement.classList.remove('popup__input_type_error');
   //submit только если форма валидна
}



/////////////////////
