export default class Api {
  constructor(options) {}

  getInitialCards() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-64/cards", {
      headers: {
        authorization: "7b039d36-24df-4fc5-8845-0a44a0767175",
      },
    }).then((res) => {
      return res.ok
        ? res.json()
        : Promise.reject(`Ошибка-getInitialCards: ${res.status}`);
    });
  }

  deleteCard(id) {
    console.log("id-удаляемой карточки", id);
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-64/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: "7b039d36-24df-4fc5-8845-0a44a0767175",
      },
    }).then((res) => {
      return res.ok
        ? res.json()
        : Promise.reject(`Ошибка-deleteCard: ${res.status}`);
    });
  }

  postCard({ name, link }) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-64/cards/`, {
      method: "POST",
      headers: {
        authorization: "7b039d36-24df-4fc5-8845-0a44a0767175",
        "content-type": "application/json",
      },
      body: JSON.stringify({ name: name, link: link }),
    }).then((res) => {
      return res.ok
        ? res.json()
        : Promise.reject(`Ошибка-postCard: ${res.status}`);
    });
  }

  setUserInfo(nickname, job) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-64/users/me`, {
      method: "PATCH",
      headers: {
        authorization: "7b039d36-24df-4fc5-8845-0a44a0767175",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: nickname,
        about: job,
      }),
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject(`Ошибка-setUserInfo: ${res}`);
    });
  }

  getUserInfoFromServer() {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-64/users/me`, {
      method: "GET",
      headers: {
        authorization: "7b039d36-24df-4fc5-8845-0a44a0767175",
        "content-type": "application/json",
      },
    }).then((res) => {
      return res.ok
        ? res.json()
        : Promise.reject(`Ошибка-getUserInfoFromServer: ${res}`);
    });
  }

  setUserAvatar(avatarUrl) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/cohort-64/users/me/avatar`,
      {
        method: "PATCH",
        headers: {
          authorization: "7b039d36-24df-4fc5-8845-0a44a0767175",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          avatar: avatarUrl,
        }),
      }
    ).then((res) => {
      return res.ok
        ? res.json()
        : Promise.reject(`Ошибка-setUserAvatar: ${res}`);
    });
  }

  setLike(id) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/cohort-64/cards/${id}/likes`,
      {
        method: "PUT",
        headers: {
          authorization: "7b039d36-24df-4fc5-8845-0a44a0767175",
          "content-type": "application/json",
        },
      }
    ).then((res) => {
      return res.ok ? res.json() : Promise.reject(`Ошибка-setLike: ${res}`);
    });
  }

  deleteLike(id) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/cohort-64/cards/${id}/likes`,
      {
        method: "DELETE",
        headers: {
          authorization: "7b039d36-24df-4fc5-8845-0a44a0767175",
          "content-type": "application/json",
        },
      }
    ).then((res) => {
      return res.ok ? res.json() : Promise.reject(`Ошибка-deleteLike: ${res}`);
    });
  }
}
