import Toast from "./Toast.js";

class ToastErreur extends Toast {
    constructor(conteneurHTML, message, fctRappel) {
        super(conteneurHTML, message);
        this.fctRappel = fctRappel;
        this.fctRappel();
        this.debug();
    }

    debug() {
        console.error(this._message);
    }

    injecterHTML() {
        const gabarit = `<div class="toast erreur" data-toast>${this.message}</div>`;

        this._conteneurHTML.insertAdjacentHTML("beforeend", gabarit);
        this._elementHTML = this._conteneurHTML.lastElementChild;

        this._elementHTML.addEventListener("click", this.cacher.bind(this));
        setTimeout(this.cacher.bind(this), 2000);
    }
}

export default ToastErreur;
