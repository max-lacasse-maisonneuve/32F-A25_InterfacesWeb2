class Toast {
    #conteneurHTML;
    #elementHTML;
    #message;

    constructor(conteneurHTML, message) {
        this.#conteneurHTML = conteneurHTML;
        this.#elementHTML;
        this.#message = message;
        this.#injecterHTML();
    }

    set message(nouveauMessage) {
        if (nouveauMessage == "" || nouveauMessage == "Patate") {
            console.warn("Attention message invalide");

            return;
        }
        this.#message = nouveauMessage.toLowerCase();
    }

    get message() {
        return this.#message;
    }

    afficher() {}

    cacher() {
        if (this.#elementHTML != null) {
            this.#elementHTML.remove();
        }
    }

    #injecterHTML() {
        const gabarit = `<div class="toast" data-toast>${this.#message}</div>`;

        this.#conteneurHTML.insertAdjacentHTML("beforeend", gabarit);
        this.#elementHTML = this.#conteneurHTML.lastElementChild;

        this.#elementHTML.addEventListener("click", this.cacher.bind(this));
        setTimeout(this.cacher.bind(this), 5000);
    }
}

export default Toast;
