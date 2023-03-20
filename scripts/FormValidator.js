export default class FormValidator {
  constructor (formElement, config) {
    this._formElement = formElement;
    this._config = config;
    this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    this._buttonElement = formElement.querySelector(config.submitButtonSelector);
  }

  _setEventListeners (formElement, config) {
    this._toggleButtonState(config);
    formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState(config);
      }, 0);
    })
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input',() => {
        this._toggleButtonState(config);
        this._checkInputValidity(formElement, inputElement, config);
      });
    });
  }


  _checkInputValidity (formElement, inputElement, config) {
    if (inputElement.validity.valid) {
      this._hideInputError(formElement, inputElement, config);
    } else {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, config)
    }
  }

  _toggleButtonState (config) {
    const form = this._buttonElement.closest('.popup__form');
    if (!form.checkValidity()) {
      this._buttonElement.classList.add(config.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(config.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
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

  enableValidation () {
    this._formElement.addEventListener('submit', function (e) {
      e.preventDefault();
    });
    this._setEventListeners (this._formElement, this._config);
  }

  removeValidationErrors (formElement) {
    const imputList = formElement.querySelectorAll('.popup__input');
    imputList.forEach(imput => {
      const errorElement = formElement.querySelector(`.${imput.id}-error`)
      errorElement.textContent = '';
      errorElement.classList.remove(this._config.inputErrorActiveClass);
      imput.classList.remove(this._config.inputErrorClass);
    });
    formElement.reset();
  }
}
