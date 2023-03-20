function closeOnEscape(e) {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

export function openPopup (popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closeOnEscape);
}

export function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnEscape);
}
