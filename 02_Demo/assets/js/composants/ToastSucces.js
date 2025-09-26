import Toast from "./Toast.js";

class ToastErreur extends Toast {
    constructor(conteneurHTML, message, duree) {
        super(conteneurHTML, message, duree);
    }

    /**
     * Fonction servant à injecter le gabarit spécifique au toast succes
     */
    _injecterHTML() {
        const gabarit = `<div class="toast succes" data-toast>${this._message}</div>`;

        this._conteneurHTML.insertAdjacentHTML("beforeend", gabarit);
        this._elementHTML = this._conteneurHTML.lastElementChild;

        this._elementHTML.addEventListener("click", this._cacher.bind(this));
        setTimeout(this._cacher.bind(this), this._duree);
    }
}

export default ToastErreur;
