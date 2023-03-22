class Popup {
    constructor (popupSelector) {
      this._popupSelector = popupSelector;
      this._handleEscClose = this._handleEscClose.bind(this);
      this.closePopup = this.closePopup.bind(this);
    }

    _handleEscClose(e) {
      if (e.key === 'Escape') {
        console.log(this);
        // const popup = document.querySelector('.popup_opened');
        this.closePopup();
      }
    }

    openPopup () {
      document.addEventListener('keydown', this._handleEscClose);
      this._popupSelector.classList.add('popup_opened')
    }

    closePopup () {
      document.removeEventListener('keydown', this._handleEscClose);
        this._popupSelector.classList.remove('popup_opened');
    }

    setEventListeners () {
      this._popupSelector.addEventListener('mousedown', (e) => {

        if (e.target.classList.contains('popup_opened') || e.target.classList.contains('popup__close-btn')) {
          this.closePopup();
        }

      })
    }
  }

  export default Popup;
