import Toast from "./Toast.js";

class ToastSucces extends Toast {
    constructor(conteneurHTML, message, fctRappel) {
        super(conteneurHTML, message);
    }

    animer() {}

    injecterHTML() {
        const gabarit = `<div class="toast succes" data-toast>${this.message}</div>`;

        this._conteneurHTML.insertAdjacentHTML("beforeend", gabarit);
        this._elementHTML = this._conteneurHTML.lastElementChild;

        this._elementHTML.addEventListener("click", this.cacher.bind(this));
        setTimeout(this.cacher.bind(this), 2000);
    }
}

export default ToastSucces;
