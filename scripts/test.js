class FormValidator {
  constructor (formElement, formValidationConfig) {
    this._formElement = formElement;
    this._formValidationConfig = formValidationConfig;
  }

  enableValidation () {
    this._formElement.addEventListener('submit', function (e) {
      e.preventDefault();
    });
    setEventListeners( this._formElement, this._formValidationConfig);
  }

}


const formList = Array.from(document.querySelectorAll(config.formSelector));

formList.forEach((formElement) => {
  const formValidator = new FormValidator(formElement, formValidationConfig);
  formValidator.enableValidation();
})
