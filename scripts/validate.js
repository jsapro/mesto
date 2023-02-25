const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  inputErrorActiveClass: 'popup__input-error_active',
  errorClass: 'popup__error_visible'
};

enableValidation(formValidationConfig);

function enableValidation (config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (e) {
      e.preventDefault();

    });
    setEventListeners(formElement, config);
  })
}

function setEventListeners (formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      toggleButtonState(inputList, buttonElement, config);
      checkInputValidity(formElement, inputElement, config);
    });
  });
}

function checkInputValidity (formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config)
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList, config)) {
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function showInputError (formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  errorElement.classList.add(config.inputErrorActiveClass);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(config.inputErrorClass);
}

function hideInputError(formElement, inputElement, config) {
 const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  errorElement.textContent = '';
  errorElement.classList.remove(config.inputErrorActiveClass);
  inputElement.classList.remove(config.inputErrorClass);
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('popup_edit-profile')) {
  closePopup(popupUser);
  }
  else if (e.target.classList.contains('popup_add-card')) {
  closePopup(popupCard);
  }
  else if (e.target.classList.contains('popup_open-card')) {
    closePopup(popupPreview);
  }
})



/////////////////////////////////////
// Проверить:
// поставить form.checkValidity вместо input.validity.valid
// popupCardSubmit.disabled = hasInvalidInput  - выключить кнопку сабмита
// у element.classList.toggle вторй параметр true или false
// form.addEventListener('input', function () {**toggleButtonState**})
// document.forms.popup__form

// document.addEventListener('click', (e) => {
//   console.log(321);
//  }, { once: true });

// const onClick = () => {
//   console.log('onClick')
//   document.removeEventListener('click', onClick);
// }
// document.addEventListener('click', onClick);



