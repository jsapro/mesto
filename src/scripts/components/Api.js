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
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
        // if (res.ok) {
        //     // console.log(res)
        //     return res.json();
        // }
        // // return new Error('errrrr')
        // return Promise.reject(`Ошибка: ${res.status}`);
    })
    // .then(cards => {
    //   // console.log('cards', cards);
    //   // cards.forEach(card => console.log(card.name, card.link))
    // })
    // .catch(err => console.log(err));
  }


}



//
