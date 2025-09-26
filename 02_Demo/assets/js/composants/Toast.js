class Toast {
    //Propriétés privées
    #conteneurHTML;
    #message;
    #elementHTML;
    #duree;

    constructor(conteneurHTML = document.body, message, duree = 5000) {
        this.#conteneurHTML = conteneurHTML;
        this.#elementHTML = null;
        this.#message = message;
        this.#duree = duree;

        //On crée et affiche le toast lors de la création de l'instance
        this._injecterHTML();

        //On affiche de façon animée
        this._afficher();
    }

    //==== Getters & Setters ====//

    get _elementHTML() {
        return this.#elementHTML;
    }

    set _elementHTML(nouvelElement) {
        if (!(nouvelElement instanceof HTMLElement)) {
            console.warn("Attention élément HTML invalide");
            return;
        }
        this.#elementHTML = nouvelElement;
    }

    get _conteneurHTML() {
        return this.#conteneurHTML;
    }
    get _duree() {
        return this.#duree;
    }
    set _message(nouveauMessage) {
        if (nouveauMessage == "") {
            console.warn("Attention message invalide");
            return;
        }

        this.#message = nouveauMessage;
    }

    get _message() {
        return this.#message;
    }

    //==== Méthodes ====//
    #clicToast() {
        this._cacher();
    }

    /**
     * Affiche le toast en ajoutant la classe "animer"
     */
    _afficher() {
        if (this._elementHTML != null) {
            this._elementHTML.classList.add("animer");
        }
    }

    /**
     * Cache le toast en le supprimant du DOM
     */
    _cacher() {
        // On s'assure que l'élément HTML existe avant de le manipuler
        if (this._elementHTML != null) {
            this._elementHTML.remove();
        }
    }

    /**
     * Fonction servant à injecter le gabarit du toast générique
     */
    _injecterHTML() {
        // On crée le toast dans le DOM
        const gabarit = `<div class="toast" data-toast>${this._message}</div>`;
        this._conteneurHTML.insertAdjacentHTML("beforeend", gabarit);

        // On référence le toast dans l'instance pour pouvoir le manipuler après
        this._elementHTML = this._conteneurHTML.lastElementChild;

        // On affiche le toast de manière animée

        // On cache le toast au clic ou au bout de 5 secondes
        this._elementHTML.addEventListener("click", this.#clicToast.bind(this));
        setTimeout(this._cacher.bind(this), this._duree);
    }
}

export default Toast;
