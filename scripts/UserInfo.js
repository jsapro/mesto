class UserInfo {
  constructor ({nameInputSelector, professionInputSelector}) {
    this._name = document.querySelector(nameInputSelector);
    this._profession = document.querySelector(professionInputSelector);
  }

  getUserInfo () {
    //возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    const userInputData = {
      name: this._name.textContent,
      profession: this._profession.textContent
    }
    return userInputData;
  }

  setUserInfo (userInputData) {
    //принимает новые данные пользователя и добавляет их на страницу
    this._name.textContent = userInputData.name;
    this._profession.textContent = userInputData.profession;
  }
}

export default UserInfo;

// Класс `UserInfo` отвечает за управление отображением информации о пользователе на странице. Этот класс:

// - Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
// - Содержит публичный метод `getUserInfo`, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
// - Содержит публичный метод `setUserInfo,` который принимает новые данные пользователя и добавляет их на страницу.
