import Popup from './Popup.js'

class PopupWithImage extends Popup {
  constructor (popupSelector, popupPreviewImg, popupPreviewCaption, data) {
    super(popupSelector);
    this._popupPreviewImg = popupPreviewImg;
    this._popupPreviewCaption = popupPreviewCaption;
    this._data = data;
  }

  openPopup () {
    this._popupPreviewImg.src = this._data.link;
    this._popupPreviewImg.alt = this._data.name;
    this._popupPreviewCaption.textContent = this._data.name;


    super.openPopup();
  }

}

export default PopupWithImage;
//
