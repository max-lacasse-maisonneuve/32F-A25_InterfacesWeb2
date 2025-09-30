/**
 * Classe Modale
 * Classe de base pour créer des modales
 * Permet d'afficher des messages à l'utilisateur dans une boîte de dialogue
 * Pour que toutes les modales aient le même style, on utilise une classe de base et on doit importer le fichier CSS de la modale
 */
class Modale {
    #message;
    #conteneurHTML;
    #elementHTML;
    #titre;

    constructor(titre, message, conteneurHTML) {
        this.#titre = titre;
        this.#message = message;
        this.#conteneurHTML = conteneurHTML;
        this.#elementHTML;

        this._injecterHTML();
    }

    // Accesseurs et mutateurs (getters et setters)
    get titre() {
        return this.#titre;
    }

    set titre(nouveauTitre) {
        this.#titre = nouveauTitre;
        this.#elementHTML.querySelector(".modale__titre").textContent = this.#titre;
    }

    get message() {
        return this.#message;
    }

    set message(nouveauMessage) {
        this.#message = nouveauMessage;
        this.#elementHTML.querySelector(".modale__message").textContent = this.#message;
    }

    get conteneurHTML() {
        return this.#conteneurHTML;
    }

    set conteneurHTML(nouveauConteneur) {
        this.#conteneurHTML = nouveauConteneur;
    }

    get elementHTML() {
        return this.#elementHTML;
    }
    set elementHTML(nouvelElement) {
        this.#elementHTML = nouvelElement;
    }
    /**
     * Méthode "protégée" pour injecter le HTML de la modale dans le DOM
     * Crée un élément HTML pour la modale et l'ajoute au conteneur HTML
     * Ajoute un écouteur d'événement pour fermer la modale lorsqu'on clique sur le X
     */
    _injecterHTML() {
        let gabarit = `<div class="modale__conteneur invisible">
            <div class="modale__carte">
                <div class="modale__btn_fermer">X</div>
                <h2 class="modale__titre">${this.#titre}</h2>
                <p class="modale__message">${this.#message}</p>
            </div>
        </div>`;
        this.#conteneurHTML.insertAdjacentHTML("beforeend", gabarit);
        this.#elementHTML = this.#conteneurHTML.lastElementChild;

        this.#elementHTML.querySelector(".modale__btn_fermer").addEventListener("click", this.fermer.bind(this));
    }

    /**
     * Méthode publique pour afficher la modale, peut être appelée de l'extérieur
     */
    afficher() {
        this.#elementHTML.classList.remove("invisible");
        document.body.classList.add("modale-verrou"); // Empêche le défilement de la page
    }

    /**
     * Méthode publique pour fermer la modale
     */
    fermer() {
        this.#elementHTML.classList.add("invisible");
        document.body.classList.remove("modale-verrou"); // Rétablit le défilement de la page
    }
}

export default Modale;
