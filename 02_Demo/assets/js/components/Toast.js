class Toast {
    constructor(conteneurHTML, message) {
        this._conteneurHTML = conteneurHTML;
        this._elementHTML;
        this._message = message;
        this.injecterHTML();
    }

    set message(nouveauMessage) {
        if (nouveauMessage == "" || nouveauMessage == "Patate") {
            console.warn("Attention message invalide");

            return;
        }
        this._message = nouveauMessage.toLowerCase();
    }

    get message() {
        return this._message;
    }

    afficher() {}

    cacher() {
        if (this._elementHTML != null) {
            this._elementHTML.remove();
        }
    }

    injecterHTML() {
        const gabarit = `<div class="toast" data-toast>${this._message}</div>`;

        this._conteneurHTML.insertAdjacentHTML("beforeend", gabarit);
        this._elementHTML = this._conteneurHTML.lastElementChild;

        this._elementHTML.addEventListener("click", this.cacher.bind(this));
        setTimeout(this.cacher.bind(this), 5000);
    }
}

export default Toast;
