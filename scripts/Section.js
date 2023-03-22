class Section {
  constructor ({items, renderer}, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = selector;
    this._container = document.querySelector('.'+selector);
  }

  renderInitialItems () {
    this._items.forEach(item => this._renderer(item))
  }

  addItem (itemHtml) {
    this._container.prepend(itemHtml)
  }
}

export default Section;
