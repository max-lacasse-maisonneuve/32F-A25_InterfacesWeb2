import Router from "./Router.js";
import Toast from "./components/Toast.js";
import Spinner from "./components/Spinner.js";

class Application {
    #router;
    #listeServices;
    #conteneurHTML;

    #utilisateur;
    #formulaireConnexion;
    #spinnerHTML;

    constructor() {
        this.#conteneurHTML = document.querySelector("[data-application]");
        this.#spinnerHTML = document.querySelector("mon-spinner");
        this.#formulaireConnexion = document.querySelector("#connexion");

        this.#formulaireConnexion.addEventListener("submit", this.onEnvoiFormConnexion.bind(this));
        document.querySelector("[data-deconnexion]").addEventListener("click", this.deconnexion.bind(this));

        this.#router = new Router(this);
        this.mettreAJourNavigation();

        if (localStorage.getItem("theme")) {
            document.body.dataset.theme = localStorage.getItem("theme");
        }
    }

    get conteneurHTML() {
        return this.#conteneurHTML;
    }

    get router() {
        return this.#router;
    }

    set listeServices(nouvelleListe) {
        this.#listeServices = nouvelleListe;

        //Modifier l'affichage
    }

    onEnvoiFormConnexion(evenement) {
        evenement.preventDefault();

        const nom = this.#formulaireConnexion.elements.nom.value;
        const mdp = this.#formulaireConnexion.elements.mdp.value;
        //Vérifier, valider...
        this.connexion(nom, mdp);
    }

    async connexion(nom, mdp) {
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/JSON",
            },
            body: JSON.stringify({ nom, mdp }),
        };

        const reponse = await fetch("api/utilisateurs/Connexion.php", config);
        const resultat = await reponse.json();

        // this.#spinnerHTML.cacher();
        if (reponse.status == "200") {
            //Stocker dans le localstorage
            localStorage.setItem("utilisateur", resultat.utilisateur);
        } else {
            //Vider le localstorage
            localStorage.removeItem("utilisateur");
        }

        this.mettreAJourNavigation();
    }

    deconnexion() {
        localStorage.removeItem("utilisateur");
        this.mettreAJourNavigation();
    }

    mettreAJourNavigation() {
        this.#utilisateur = localStorage.getItem("utilisateur") || null;

        document.querySelector("[data-admin]").classList.toggle("invisible", !this.#utilisateur);
        this.#formulaireConnexion.classList.toggle("invisible", this.#utilisateur);
        document.querySelector("[data-deconnexion]").classList.toggle("invisible", !this.#utilisateur);
    }

    async rechercherServices() {
        this.#spinnerHTML.setAttribute("msg", "patate");
        this.#spinnerHTML.afficher();
        const reponse = await fetch("api/services/RechercherTout.php");
        const resultat = await reponse.json();
        setTimeout(
            function () {
                this.#spinnerHTML.cacher();
            }.bind(this),
            500
        );
        // localStorage.setItem("services", JSON.stringify(resultat.donnees));
        // const liste = JSON.parse(localStorage.getItem("services"));
        // console.log(liste);

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
