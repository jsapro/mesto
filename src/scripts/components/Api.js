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
  _request(endPoint, options = {}) {
    const params = {
      headers: this._headers,
      ...options,
    };
    return fetch(`${this._baseUrl}/${endPoint}`, params).then(
      this._checkResponse
    );
  }

  getInitialCards() {
    return this._request(`cards`);
  }

  deleteCard(id) {
    return this._request(`cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  postCard({ description: name, url: link }) {
    return this._request(`cards/`, {
      method: "POST",
      body: JSON.stringify({ name: name, link: link }),
    });
  }

  setUserInfo({ nickname, job }) {
    return this._request(`users/me`, {
      method: "PATCH",
      body: JSON.stringify({
        name: nickname,
        about: job,
      }),
    });
  }

  getUserInfoFromServer() {
    return this._request(`users/me`, {
      method: "GET",
    });
  }

  setUserAvatar({ avatarUrl }) {
    return this._request(`users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    });
  }

  setLike(id) {
    return this._request(`cards/${id}/likes`, {
      method: "PUT",
    });
  }

  deleteLike(id) {
    return this._request(`cards/${id}/likes`, {
      method: "DELETE",
    });
  }
}
