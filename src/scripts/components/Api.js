export default class Api {
  constructor (options) {

  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-64/cards', {
        headers: {
            authorization: '7b039d36-24df-4fc5-8845-0a44a0767175'
        }
    })
    .then(res => {
      return res.ok ? res.json() : Promise.reject(`Ошибка-getInitialCards: ${res.status}`)
        // if (res.ok) {
        //     // console.log(res)
        //     return res.json();
        // }
        // // return new Error('errrrr')
        // return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => console.log(err));
    // .then(cards => {
    //   // console.log('cards', cards);
    //   // cards.forEach(card => console.log(card.name, card.link))
    // })
    // .catch(err => console.log(err));
  }

  deleteCard(id) {
    console.log('id-удаляемой карточки', id)
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-64/cards/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: '7b039d36-24df-4fc5-8845-0a44a0767175'
        }
    })
    .then(res => {
      return res.ok ? res.json() : Promise.reject(`Ошибка-deleteCard: ${res.status}`)
    })
    .catch(err => console.log(err));

  }

  postCard({name, link}) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-64/cards/`, {
        method: 'POST',
        headers: {
            authorization: '7b039d36-24df-4fc5-8845-0a44a0767175',
            'content-type': 'application/json'
        },
        body: JSON.stringify({name: name, link: link})
    })
    .then(res => {
      return res.ok ? res.json() : Promise.reject(`Ошибка-postCard: ${res.status}`)
    })
    .catch(err => console.log(err));
  }

  setUserInfo (nickname, job) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-64/users/me`, {
      method: 'PATCH',
      headers: {
          authorization: '7b039d36-24df-4fc5-8845-0a44a0767175',
          'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: nickname,
        about: job})
    })
    .then(res => {
      return res.ok ? res.json() : Promise.reject(`Ошибка-setUserInfo: ${res}`)
    })
    .catch(err => console.log(err));
  }

  getUserInfo () {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-64/users/me`, {
      method: 'GET',
      headers: {
          authorization: '7b039d36-24df-4fc5-8845-0a44a0767175',
          'content-type': 'application/json'
      }
    })
    .then(res => {
      return res.ok ? res.json() : Promise.reject(`Ошибка-getUserInfo: ${res}`)
    })
    .catch(err => console.log(err));
  }
}
