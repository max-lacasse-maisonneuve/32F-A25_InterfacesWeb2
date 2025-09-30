import Activite from "../composants/Activite.js";
import PanierAchat from "../composants/PanierAchat.js";
import activites from "../data/activites.js";
import Modale from "./Modale.js";
import Filtre from "./Filtre.js";

class Application {
    #dataActivites;
    #listeActivites;
    #panierAchat;

    #conteneurPanierAchatHTML;
    #conteneurActivitesHTML;
    #conteneurFiltres;
    #modale;
    #filtre;

    constructor() {
        this.#conteneurPanierAchatHTML = document.querySelector("[data-panier-conteneur]");
        this.#conteneurActivitesHTML = document.querySelector("[data-liste-activites]");
        this.#conteneurFiltres = document.querySelector("[data-filtres-conteneur]");

        this.#listeActivites = [];

        this.#recupererDonnees();

        this.#modale = new Modale("", "", document.body);
        this.#panierAchat = new PanierAchat(this.#conteneurPanierAchatHTML);
        this.#filtre = new Filtre(this.#conteneurFiltres, this);

        this.#dataActivites.forEach(
            function (activite) {
                const nouvelleActivite = new Activite(
                    this.#conteneurActivitesHTML,
                    activite.description,
                    activite.prix,
                    this.#panierAchat,
                    this.#modale
                );
                this.#listeActivites.push(nouvelleActivite);
            }.bind(this)
        );
    }

    get listeActivites() {
        return this.#listeActivites;
    }

    set listeActivites(nouvelleListeActivites) {
        this.#listeActivites = nouvelleListeActivites;
        //Changer l'affichage sur la page.
        this.#conteneurActivitesHTML.innerHTML = "";
        this.#listeActivites.forEach(
            function (activite) {
                activite.injecterHTML();
            }.bind(this)
        );
    }

    #recupererDonnees() {
        this.#dataActivites = activites;
    }
}
export default Application;
