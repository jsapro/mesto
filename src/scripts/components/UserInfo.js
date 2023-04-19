class UserInfo {
  constructor ({nameInputSelector, professionInputSelector, avatarSelector}) {
    this._nameElement = document.querySelector(nameInputSelector);
    this._professionElement = document.querySelector(professionInputSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo () {
    //возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    const userInputData = {
      nickname: this._nameElement.textContent,
      job: this._professionElement.textContent,
      avatar: this._avatarElement,
      myId: this._myId
    }
    return userInputData;
  }

  setUserInfo ( { name, about, avatar, _id } ) {
    //принимает новые данные пользователя и добавляет их на страницу
    this._nameElement.textContent = name;
    this._professionElement.textContent = about;
    this._avatarElement.src = avatar;
    this._myId = _id;
  }
}

export default UserInfo;

// Класс `UserInfo` отвечает за управление отображением информации о пользователе на странице. Этот класс:

// - Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
// - Содержит публичный метод `getUserInfo`, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
// - Содержит публичный метод `setUserInfo,` который принимает новые данные пользователя и добавляет их на страницу.
