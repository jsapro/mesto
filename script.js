const popupElement = document.querySelector('.popup');
const closeBtnElement = popupElement.querySelector('.popup__close-btn');
const submitBtnElement = popupElement.querySelector('.popup__submit');
const editBtnElement = document.querySelector('.profile__edit-button');
const addBtnElement = document.querySelector('.profile__add-button');
let profileNameElement = document.querySelector('.profile__name');
let profileJobElement = document.querySelector('.profile__job');


console.dir(popupElement);
// console.log(popupElement);
console.log(closeBtnElement);
console.log(submitBtnElement);
console.log(editBtnElement);
console.log('addBtnElement', addBtnElement);

editBtnElement.addEventListener('click', toggle);
closeBtnElement.addEventListener('click', toggle);

function toggle() {
  return popupElement.classList.toggle('popup_opened');
}

const popupInfoElement = document.querySelector('.popup__info');
popupInfoElement.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('форма отправлена');
})

addBtnElement.addEventListener('click', addCard);

function addCard () {
  let cardsContainerElement = document.querySelector('.grid-cards__container');
  let gridCardElement = document.querySelector('.grid-card');
  let gridCardNameElement = document.querySelector('.grid-card__name');

  cardsContainerElement.insertAdjacentHTML('beforeend', `
  <li class="grid-card">
  <img class="grid-card__img" src="https://picsum.photos/281" alt="">
  <div class="grid-card__caption">
  <h2 class="grid-card__name">NEW 1234567 1234567 1234567 1234567 1234567 1234567 1234567 </h2>
  <img src="./images/grid-card-heart.svg" alt="символ сердца" class="grid-card__heart">
  </div>
  </li>
  `)
}

let gridCardNameElement = document.querySelector('.grid-card__name');
console.log('---gridCardNameElement', gridCardNameElement.value);
console.log('---gridCardNameElement', gridCardNameElement.value);

// addCard();

let formElement = document.querySelector('.popup__info');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__job');

console.log('nameInput.value', nameInput.value)
function nameInput111 () {
  let z = nameInput.value;
  console.log('z+z', z+z);
}
nameInput111()

submitBtnElement.addEventListener('click', d)
function d () {
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;


  console.log('d + d', nameInput.value);
  popupElement.classList.toggle('popup_opened');
  // return profileNameElement.textContent;
}
d();

// -----------------------------------------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------

// Находим форму в DOM
// let formElement = // Воспользуйтесь методом querySelector()
// // Находим поля формы в DOM
// let nameInput = // Воспользуйтесь инструментом .querySelector()
// let jobInput = // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);


// -----------------------------------------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------

/*
https://practicum.yandex.ru/trainer/web/lesson/f8a62796-314e-4fe1-add1-f6feb72d9940/task/2ddc3d9e-29fb-416b-9417-d5910efdda20/?searchedText=submit

Событие отправки формы — submit
Кроме событий, про которые мы рассказали в начале урока, — есть ещё события, которые можно отслеживать. Например, событие отправки формы или "submit". Этот слушатель добавляется на элемент формы:

<form class='form'>
    <input class='form__input' type='text'>
    <button class='form__button' type='submit'>
        Сохранить
    </button>
</form>
let formElement = document.querySelector('.form');

formElement.addEventListener('submit', function () {
    console.log('Форма отправлена');
});

Функция-обработчик срабатывает в момент отправки формы, когда все обязательные поля заполнены. К сожалению, при успешной отправке формы и отсутствующем атрибуте action страница перезагружается — это называется стандартным событием.
Чтобы такого поведения не происходило — передайте в функцию-обработчик параметр evt. В самом начале тела функции вызовите метод evt.preventDefault() — это отменит стандартное событие. Подробнее о стандартных событиях и об их отмене расскажем в следующих спринтах, а сейчас — переходите к заданиям.
   */
