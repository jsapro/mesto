import Popup from './Popup.js'

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, confirmCallback) {
    super(popupSelector);
    this._submitButton = this._popup.querySelector('.popup__submit');
    this._submitButtonText = this._submitButton.textContent;
    this._confirmCallback = confirmCallback;
  }

  renderLoading(isLoading, loadingText = 'Удаление...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
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
}
