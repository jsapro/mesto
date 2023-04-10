class Section {
  constructor ({ renderer}, selector) {
    // this._initialArray = data;
    this._renderer = renderer;
    this._selector = selector;
    this._container = document.querySelector(selector);
  }

  renderInitialItems (serverArray) {
    serverArray.forEach(item => this._renderer(item))
  }

  addItem (element) {
    this._container.prepend(element)
  }
}

export default Section;
