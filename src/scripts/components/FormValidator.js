export default class FormValidator {
  constructor (formElement, config) {
    this._formElement = formElement;
    this._config = config;
    this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    this._buttonElement = formElement.querySelector(config.submitButtonSelector);
  }

  _setEventListeners () {
    this._toggleButtonState();
    this._formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState();
      }, 0);
    })
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input',() => {
        this._toggleButtonState();
        this._checkInputValidity(inputElement);
      });
    });
  }

  _checkInputValidity (inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage)
    }
  }

  _toggleButtonState () {
    const form = this._buttonElement.closest('.popup__form');
    if (!form.checkValidity()) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`)
    errorElement.classList.add(this._config.inputErrorActiveClass);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(this._config.inputErrorClass);
  }

  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`)
    errorElement.textContent = '';
    errorElement.classList.remove(this._config.inputErrorActiveClass);
    inputElement.classList.remove(this._config.inputErrorClass);
  }

  enableValidation () {
    this._formElement.addEventListener('submit', function (e) {
      e.preventDefault();
    });
    this._setEventListeners ();
  }

  removeValidationErrors () {
    this._toggleButtonState();
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    })
    this._formElement.reset();
  }
}
