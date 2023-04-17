import Popup from './Popup.js'

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, confirmCallback) {
    super(popupSelector);
    this._submitButton = this._popup.querySelector('.popup__submit')
    this._confirmCallback = confirmCallback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', () => {
      this._confirmCallback(this.card);
    });
  }

  setCardToDelete(card) {
    this.card = card;
  }

  setButtonText(text) {
    this._submitButton.textContent = text;
  }
}
