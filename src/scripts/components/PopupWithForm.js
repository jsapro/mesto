import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor (popupSelector, submitCallback) {
    super(popupSelector)
    this._submitForm = this._popup.querySelector('.popup__form');
    this._submitButton = this._submitForm.querySelector('.popup__submit');
    this._submitCallback = submitCallback.bind(this);
    this._inputList = Array.from(this._submitForm.querySelectorAll('.popup__input'));
  }

  _getInputValues () {
    // собирает данные всех полей формы
    this._dataFromInput = {};
    this._inputList.forEach(input => {
      this._dataFromInput[input.name] = input.value;
    })
    return this._dataFromInput;
  }

  setButtonText(text) {
    this._submitButton.textContent = text;
  }

  setEventListeners () {
    super.setEventListeners();
    this._submitForm.addEventListener('submit', () => {
      this._submitCallback(this._getInputValues());
    });
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  closePopup () {
    this._submitForm.reset();
    super.closePopup();
  }
}

export default PopupWithForm;
