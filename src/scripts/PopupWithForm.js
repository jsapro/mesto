import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor (popupSelector, submitCallback) {
    super(popupSelector)
    this._popupSelector = popupSelector;
    this._submitForm = this._popupSelector.querySelector('.popup__form');
    this._submitCallback = submitCallback.bind(this);
    this._inputList = Array.from(this._submitForm.querySelectorAll('.popup__input'));
  }

  _getInputValues () {
    // собирает данные всех полей формы
    this._dataFromInput = {};
    this._inputList.forEach(input => {
      this._dataFromInput[input.name] = input.value;
    })
    console.log(this._dataFromInput);
    return this._dataFromInput;
  }

  setEventListeners () {
    // Перезаписывает родительский метод
    super.setEventListeners();
    // должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
    this._submitForm.addEventListener('submit', () => {
      this._submitCallback(this._getInputValues())
    });
  }



  // setInputValues(data) {
  //   this._inputList.forEach((input) => {
  //     // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
  //     input.value = data[input.name];
  //     console.log(data);
  //   });
  // }



  closePopup () {
    // Перезаписывает родительский метод
    // при закрытии попапа форма должна ещё и сбрасываться.
    this._submitForm.reset();
    // this._submitForm.removeEventListener('submit', this._submitCallback);
    super.closePopup();
  }
}

export default PopupWithForm;
