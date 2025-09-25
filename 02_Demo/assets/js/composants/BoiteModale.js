class BoiteModale {
    #contenu;
    #conteneurHTML;

    constructor(conteneurHTML, contenu) {
        this.#conteneurHTML = conteneurHTML;
        this.#contenu = contenu;
        this.injecterHTML();
        this.ouvrir();
    }

    get contenu() {
        return this.#contenu;
    }

    set contenu(nouveauContenu) {
        this.#contenu = nouveauContenu;
    }

    injecterHTML() {}

    ouvrir() {}

    fermer() {}
}

export default BoiteModale;
