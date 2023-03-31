class Popup {
  constructor (popupSelector) {
    // this._popupSelector = popupSelector;
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.closePopup();
    }
  }

  openPopup () {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_opened')
  }

  closePopup () {
    document.removeEventListener('keydown', this._handleEscClose);
      this._popup.classList.remove('popup_opened');
  }

  setEventListeners () {
    this._popup.addEventListener('mousedown', (e) => {

      if (e.target.classList.contains('popup_opened') || e.target.classList.contains('popup__close-btn')) {
        this.closePopup();
      }

    })
  }
}

export default Popup;
