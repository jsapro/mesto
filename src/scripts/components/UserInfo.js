class UserInfo {
  constructor ({nameInputSelector, professionInputSelector}) {
    this._name = document.querySelector(nameInputSelector);
    this._profession = document.querySelector(professionInputSelector);
  }

  getUserInfo () {
    //возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    const userInputData = {
      nickname: this._name.textContent,
      job: this._profession.textContent,
      avatar: this._avatar,
      myId: this._myId
    }
    return userInputData;
  }

  setUserInfo (data) {
    //принимает новые данные пользователя и добавляет их на страницу
    this._name.textContent = data.name;
    this._profession.textContent = data.about;
    this._avatar = data.avatar;
    this._myId = data._id;
  }
}

export default UserInfo;

// Класс `UserInfo` отвечает за управление отображением информации о пользователе на странице. Этот класс:

// - Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
// - Содержит публичный метод `getUserInfo`, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
// - Содержит публичный метод `setUserInfo,` который принимает новые данные пользователя и добавляет их на страницу.
