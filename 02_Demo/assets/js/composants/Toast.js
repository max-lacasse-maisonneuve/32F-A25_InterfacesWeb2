class Toast {
    constructor(conteneurHTML, message) {
        this.conteneurHTML = conteneurHTML;
        this.message = message;
        this.elementHTML;
        this.injecterHTML();
    }

    afficher() {}

    cacher() {
        if (this.elementHTML != null) {
            this.elementHTML.remove();
        }
    }

    injecterHTML() {
        const gabarit = `<div class="toast" data-toast>${this.message}</div>`;

        this.conteneurHTML.insertAdjacentHTML("beforeend", gabarit);
        this.elementHTML = this.conteneurHTML.lastElementChild;

        this.elementHTML.addEventListener("click", this.cacher.bind(this));
        setTimeout(this.cacher.bind(this), 5000);
    }
}

export default Toast;
