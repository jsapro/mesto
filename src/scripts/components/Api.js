export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
  // возможно надо как-то уменьшить дублирование headers
  _request(endPoint, options) {
    return fetch(`${this._baseUrl}/${endPoint}`, options).then(
      this._checkResponse
    );
  }

  getInitialCards() {
    return this._request(`cards`, {
      headers: this._headers,
    });
  }

  deleteCard(id) {
    return this._request(`cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  postCard({ name, link }) {
    return this._request(`cards/`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name: name, link: link }),
    });
  }

  setUserInfo( {nickname, job} ) {
    return this._request(`users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: nickname,
        about: job,
      }),
    });
  }

  getUserInfoFromServer() {
    return this._request(`users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  setUserAvatar(avatarUrl) {
    return this._request(`users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    });
  }

  setLike(id) {
    return this._request(`cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  deleteLike(id) {
    return this._request(`cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}
