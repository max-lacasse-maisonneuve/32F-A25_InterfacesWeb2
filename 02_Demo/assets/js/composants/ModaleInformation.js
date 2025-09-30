import Modale from "./Modale.js";

/**
 * Classe pour une modale d'information, hérite de la classe Modale
 */
class ModaleInformation extends Modale {
    constructor(titre, message, conteneurHTML) {
        // Appelle le constructeur de la classe parente Modale
        super(titre, message, conteneurHTML);
    }

    /**
     * Méthode "protégée" pour injecter le HTML de la modale dans le DOM
     * Crée un élément HTML pour la modale et l'ajoute au conteneur HTML
     * Ajoute un écouteur d'événement pour fermer la modale lorsqu'on clique dessus
     */
    _injecterHTML() {
        let gabarit = `<div class="modale__conteneur invisible" data-etat="information">
            <div class="modale__carte">
                <div class="modale__btn_fermer">X</div>
                <h2 class="modale__titre">${this.titre}</h2>
                <p class="modale__message">${this.message}</p>
                <button class="modale__btn">OK</button>
            </div>
        </div>`;
        this.conteneurHTML.insertAdjacentHTML("afterbegin", gabarit);
        this.elementHTML = this.conteneurHTML.firstElementChild;

        this.elementHTML.querySelector(".modale__btn_fermer").addEventListener("click", this.fermer.bind(this));
        this.elementHTML.querySelector(".modale__btn").addEventListener("click", this.fermer.bind(this));
    }
}

export default ModaleInformation;
