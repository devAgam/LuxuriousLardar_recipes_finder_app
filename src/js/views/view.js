import icons from "url:../../img/icons.svg";
export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  // !!! IMPORTANT !!!
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // Creating virtual DOM
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElement = Array.from(newDOM.querySelectorAll("*"));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll("*")
    );

    newElement.forEach((newEl, i) => {
      const currentEl = currentElements[i];

      // Updates changed text
      if (
        !newEl.isEqualNode(currentEl) &&
        newEl.firstChild.nodeValue.trim() !== ""
      ) {
        currentEl.textContent = newEl.textContent;
      }

      // Updates changed attributes
      if (!newEl.isEqualNode(currentEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          currentEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  // Rendering spinner
  renderSpinner() {
    const markup = `
  <div class="spinner">
  <svg>
    <use href="${icons}#icon-loader"></use>
  </svg>
</div>
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="message message--recipe">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="message message--recipe">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
