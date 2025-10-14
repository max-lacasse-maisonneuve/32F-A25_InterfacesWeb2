class Formulaire {
    #application;
    #conteneurHTML;
    #elementHTML;
    #boutonSubmitHTML;

    #bEstValide = false;
    #donneesFormulaire = {};

    constructor(application) {
        this.#application = application;
        this.#conteneurHTML = this.#application.conteneurHTML.querySelector("[data-formulaire]");
        this.#elementHTML = this.#conteneurHTML.querySelector("form");
        this.#boutonSubmitHTML = this.#elementHTML.querySelector("button[type='submit']");
    }

    #onSubmitFormulaire(evenement) {}

    #onChangementChamps(evenement) {}

    #validerFormulaire() {}

    #envoyerFormulaire() {}
}
export default Formulaire;
