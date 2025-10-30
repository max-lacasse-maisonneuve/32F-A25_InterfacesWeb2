import Router from "./Router.js";
import Toast from "./components/Toast.js";
import Spinner from "./components/Spinner/Spinner.js";

class Application {
    #router;
    #listeServices;
    #conteneurHTML;
    #spinner;

    constructor() {
        this.#conteneurHTML = document.querySelector("[data-application]");
        this.#router = new Router(this);
        this.#spinner = document.querySelector("loading-spinner");
        // this.#spinner.hide();
        console.log(this.#spinner);
    }

    get conteneurHTML() {
        return this.#conteneurHTML;
    }

    get router() {
        return this.#router;
    }

    async rechercherServices() {
        const reponse = await fetch("api/services/RechercherTout.php");
        const resultat = await reponse.json();
        console.log(reponse);

        return resultat.donnees;
    }

    async rechercherServiceParId(id) {
        const reponse = await fetch(`api/services/RechercherUn.php?id=${id}`);
        const resultat = await reponse.json();

        return resultat.donnees;
    }

    async ajouterService(donnees) {
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(donnees),
        };

        const reponse = await fetch("api/services/AjouterUn.php", config);
        const resultat = await reponse.json();

        return resultat.id;
    }

    modifierService() {}

    async supprimerService(id) {
        try {
            const reponse = await fetch(`api/services/SupprimerUn.php?id=${id}`);
            const resultat = await reponse.json();

            if (!reponse.ok) {
                throw new Error(resultat);
            }

            return resultat;
        } catch (erreur) {
            new Toast(document.body, erreur.message);
        }
    }
}

export default Application;
