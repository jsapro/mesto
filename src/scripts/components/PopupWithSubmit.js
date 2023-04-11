import Popup from './Popup.js'

export default class PopupWithSubmit extends Popup {
  constructor (popupSelector, submitCallback) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._submitButton = this._popup.querySelector('.popup__submit')
    console.log(this._submitButton);
    this._submitCallback = submitCallback;
  }

  setEventListeners () {
    super.setEventListeners();
    this._submitButton.addEventListener('click', () => {
      this._submitCallback(this.card);
    });
  }

  setCardToDelete (card) {
    this.card = card;
  }
}

//
