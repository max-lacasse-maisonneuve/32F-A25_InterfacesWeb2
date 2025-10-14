import Tache from "./Tache.js";
import Formulaire from "./Formulaire.js";
import ToastErreur from "./ToastErreur.js";
import ToastSucces from "./ToastSucces.js";

class Application {
    #listeTaches = [];
    #conteneurHTML;
    #conteneurListeHTML;
    #boutonAjouter;
    #formulaire;

    constructor() {
        this.#conteneurHTML = document.querySelector("[data-application]");
        this.#conteneurListeHTML = this.#conteneurHTML.querySelector("[data-conteneur-taches]");
        this.#boutonAjouter = document.querySelector("[data-tache-btn][data-action='ajouter']");

        this.#formulaire = new Formulaire(this);

        this.#rechercherToutesTaches();

        this.#boutonAjouter.addEventListener("click", this.#onClickAjouter.bind(this));
    }

    get conteneurHTML() {
        return this.#conteneurHTML;
    }

    get formulaire() {
        return this.#formulaire;
    }

    /**
     * Ouvre le formulaire en mode ajout.
     */
    #onClickAjouter() {
        this.#formulaire.ouvrir();
    }

    /**
     * Affiche la liste des tâches.
     * @param {Tache[]} taches un tableau d'objets Tache à afficher
     */
    #afficherListe(taches) {
        this.#conteneurListeHTML.innerHTML = "";
        taches.forEach(
            function (tache) {
                tache.injecterHTML();
            }.bind(this)
        );
    }

    /**
     * Récupère toutes les tâches depuis l'API et les affiche.
     */
    async #rechercherToutesTaches() {
        try {
            //Recuperer les données de l'API
            //Lorsque la réponse est reçue, la convertir en JSON
            //Créer une instance de Tache pour chaque élément du tableau reçu
            //Stocker les instances dans this.#listeTaches
            //Afficher la liste
        } catch (erreur) {
            //Afficher un message d'erreur avec ToastErreur
        }
    }

    /**
     * Ajoute une nouvelle tâche en envoyant les données à l'API avec une requête POST.
     * Si l'ajout est un succès, la tâche est ajoutée individuellement à la liste et affichée.
     * @param {String} nom
     * @param {Number} etat non terminée ou terminée
     */
    async ajouterTache(nom, etat) {
        try {
            //Envoyer les données à l'API avec fetch en POST
            //Si la réponse n'est pas ok, générer une erreur
            //Convertir la réponse en JSON pour obtenir les données de la nouvelle tâche (id, nom, etat)
            //Créer une instance de Tache avec les données reçues
            //Ajouter l'instance au tableau this.#listeTaches
            //Afficher la tâche en appelant sa méthode injecterHTML()
            //Afficher un message de succès avec ToastSucces
        } catch (e) {
            //Afficher un message d'erreur avec ToastErreur
        }
    }

    /**
     * Modifie une tâche existante.
     * Si la modification est un succès, la tâche est modifiée individuellement dans la liste et l'affichage est mis à jour.
     * @param {Number} id
     * @param {String} nom
     * @param {Number} etat
     */
    async modifierTache(id, nom, etat) {
        try {
            //Envoyer les données à l'API avec fetch en PUT
            //Si la réponse n'est pas ok, générer une erreur
            //Trouver l'instance de Tache dans this.#listeTaches avec l'id
            //Si l'instance n'est pas trouvée, générer une erreur
            //Mettre à jour l'affichage en appelant la méthode modifierHTML() de l'instance
        } catch (e) {
            //Afficher un message d'erreur avec ToastErreur
        }
    }

    /**
     * On supprime une tâche en envoyant l'id à l'API avec une requête GET.On passe l'id en paramètre d'URL.
     * Si la suppression est un succès, la tâche est supprimée individuellement de la liste et de l'affichage sans recharger toute la liste.
     * @param {Number} id
     */
    async supprimerTache(id) {
        try {
            //Envoyer l'id à l'API avec fetch en DELETE
            //Si la réponse n'est pas ok, générer une erreur
            //Trouver l'instance de Tache dans this.#listeTaches avec l'id
            //Si l'instance n'est pas trouvée, générer une erreur
            //Supprimer l'instance du tableau avec filter
            //Supprimer l'élément HTML en appelant la méthode supprimerHTML() de l'instance
        } catch (e) {
            //Afficher un message d'erreur avec ToastErreur
        }
    }

    /**
     * Change l'état de la tâche. Si l'état est modifié avec succès côté serveur, met à jour l'affichage.
     * Est appelé par une instance de Tache lorsque l'utilisateur clique sur le bouton de changement d'état.
     * Vous n'avez pas à modifier cette méthode.
     * @param {Number} id
     * @param {Boolean} nouvelEtat
     */
    async changerEtat(id, nouvelEtat) {
        try {
            const etat = nouvelEtat;

            const tache = this.#listeTaches.find(function (tache) {
                return tache.id === id;
            });

            if (!tache) throw new Error("Tâche introuvable");

            await this.modifierTache(id, tache.nom, etat);
            tache.modifierHTML(tache.nom, nouvelEtat);
        } catch (e) {
            new ToastErreur("Erreur lors de la modification de l'état de la tâche");
            console.error("Erreur modification état :", e);
        }
    }
}
export default Application;
