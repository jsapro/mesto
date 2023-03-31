import Popup from './Popup.js'

class PopupWithImage extends Popup {
  constructor (popupSelector, popupPreviewImg, popupPreviewCaption) {
    super(popupSelector);
    this._popupPreviewImg = popupPreviewImg;
    this._popupPreviewCaption = popupPreviewCaption;
  }

  openPopup (data) {
    this._data = data;
    this._popupPreviewImg.src = this._data.link;
    this._popupPreviewImg.alt = this._data.name;
    this._popupPreviewCaption.textContent = this._data.name;
    super.openPopup();
  }

  closePopup () {
    super.closePopup();
    this._popupPreviewImg.src = '#'; // убирает мелькание предыдущей картинки перед загрузкой новой
  }
}

export default PopupWithImage;

