class Tache {
    #application;
    #conteneurHTML;
    #elementHTML;
    #id;
    #nom;
    #etat;
    #ligne;

    constructor(app, id, nom, etat) {
        this.#application = app;
        this.#conteneurHTML = this.#application.conteneurHTML.querySelector("[data-conteneur-taches]");
        this.#id = id;
        this.#nom = nom;
        this.#etat = etat;
    }

    get id() {
        return this.#id;
    }

    get nom() {
        return this.#nom;
    }

    get etat() {
        return this.#etat;
    }

    /**
     * Fonction appelée lors du clic sur une ligne de tâche.
     * @param {Event} evenement
     */
    #onClicLigne(evenement) {
        const declencheur = evenement.target;

        if (declencheur.closest("[data-action='modifier']") !== null) {
            this.#application.formulaire.ouvrir(this.#id, this.#nom, this.#etat);
        } else if (declencheur.closest("[data-action='supprimer']") !== null) {
            this.#application.supprimerTache(this.#id);
        } else if (declencheur.closest("[data-action='changer-etat']") !== null) {
            this.#application.changerEtat(this.#id, declencheur.checked ? "terminée" : "non terminée");
        }
    }

    /**
     * Injecte le HTML de la tâche dans le conteneur.
     */
    injecterHTML() {
        const ligneHTML = `
        <tr data-id="${this.#id}">
            <td>${this.#id}</td>
            <td class="nom ${this.#etat ? "terminee" : ""}">${this.#nom}</td>
            <td><input type="checkbox" class="etat" ${this.#etat === "terminée" ? "checked" : ""} data-action="changer-etat"></td>
            <td>
                <button class="btn modifier" data-action="modifier">Modifier</button>
                <button class="btn supprimer" data-action="supprimer">Supprimer</button>
            </td>
        </tr>`;

        this.#conteneurHTML.insertAdjacentHTML("beforeend", ligneHTML);

        this.#elementHTML = this.#conteneurHTML.lastElementChild;
        this.#elementHTML.addEventListener("click", this.#onClicLigne.bind(this));
    }

    /**
     * Fonction appelée lors de la modification d'une tâche.
     * @param {String} nom
     * @param {Boolean} etat
     */
    modifierHTML(nom, etat) {
        this.#nom = nom;
        this.#etat = etat;
        this.#elementHTML.querySelector(".nom").textContent = this.#nom;
        this.#elementHTML.querySelector(".etat").checked = this.#etat === "terminée";
        this.#elementHTML.querySelector(".nom").classList.toggle("terminee", this.#etat === "terminée");
    }

    /**
     * Supprime l'élément HTML de l'affichage dans la liste.
     */
    async supprimer() {
        this.#elementHTML.remove();
    }
}

export default Tache;
