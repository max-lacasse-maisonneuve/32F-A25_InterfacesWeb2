import Activite from "../composants/Activite.js";
import PanierAchat from "../composants/PanierAchat.js";
import activites from "../data/activites.js";

class Application {
    #dataActivites;
    #listeActivites;
    #panierAchat;

    #conteneurPanierAchatHTML;
    #conteneurActivitesHTML;

    constructor() {
        this.#conteneurPanierAchatHTML = document.querySelector("[data-panier-conteneur]");
        this.#conteneurActivitesHTML = document.querySelector("[data-liste-activites]");
        this.#listeActivites = [];

        this.#recupererDonnees();

        this.#panierAchat = new PanierAchat(this.#conteneurPanierAchatHTML);

        this.#dataActivites.forEach(
            function (activite) {
                const nouvelleActivite = new Activite(
                    this.#conteneurActivitesHTML,
                    activite.description,
                    activite.prix,
                    this.#panierAchat
                );
                this.#listeActivites.push(nouvelleActivite);
            }.bind(this)
        );
    }

    #recupererDonnees() {
        this.#dataActivites = activites;
    }
}
export default Application;
