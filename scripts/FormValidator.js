export const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  inputErrorActiveClass: 'popup__input-error_active',
  errorClass: 'popup__error_visible'
};
export default class FormValidator {
  constructor (formElement, config) {
    this._formElement = formElement;
    this._config = config;
  }

  _setEventListeners (formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement, config);
    formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState(inputList, buttonElement, config);
      }, 0);
    })
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input',() => {
        this._toggleButtonState(inputList, buttonElement, config);
        this._checkInputValidity(formElement, inputElement, config);
      });
    });
  }

  enableValidation () {
    this._formElement.addEventListener('submit', function (e) {
      e.preventDefault();
    });
    this._setEventListeners (this._formElement, this._config);
  }

  _checkInputValidity (formElement, inputElement, config) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, config)
    } else {
      this._hideInputError(formElement, inputElement, config);
    }
  }

  _toggleButtonState (inputList, buttonElement, config) {
    const form = buttonElement.closest('.popup__form');
    // console.log('form', form)
    if (!form.checkValidity()) {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  _showInputError (formElement, inputElement, errorMessage, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    errorElement.classList.add(config.inputErrorActiveClass);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(config.inputErrorClass);
  }

  _hideInputError (formElement, inputElement, config) {
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    errorElement.textContent = '';
    errorElement.classList.remove(config.inputErrorActiveClass);
    inputElement.classList.remove(config.inputErrorClass);
  }
}







