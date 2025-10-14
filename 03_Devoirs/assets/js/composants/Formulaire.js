class Formulaire {
    #application;
    #modale;
    #formHTML;

    #champIdHTML;
    #champNomHTML;
    #champEtatHTML;

    #btnSubmitHTML;
    #btnAnnulerHTML;
    #btnModaleFermerHTML;
    #titreModaleHTML;

    constructor(application) {
        this.#application = application;
        this.#modale = document.querySelector("#modal");
        this.#formHTML = document.querySelector("#formTodo");

        this.#champIdHTML = this.#formHTML.querySelector("[name='todoId']");
        this.#champNomHTML = this.#formHTML.querySelector("[name='todoNom']");
        this.#champEtatHTML = this.#formHTML.querySelector("[name='todoEtat']");

        this.#btnSubmitHTML = this.#formHTML.querySelector("[data-form-action='envoyer']");
        this.#btnAnnulerHTML = this.#formHTML.querySelector("[data-form-action='annuler']");
        this.#btnModaleFermerHTML = this.#modale.querySelector("#fermerModal");
        this.#titreModaleHTML = this.#modale.querySelector("#modalTitre");

        // Événements
        this.#formHTML.addEventListener("change", this.#valider.bind(this));
        this.#formHTML.addEventListener("submit", this.#envoyer.bind(this));
        this.#btnAnnulerHTML.addEventListener("click", this.#fermer.bind(this));
        this.#btnModaleFermerHTML.addEventListener("click", this.#fermer.bind(this));
    }

    /**
     * Si des paramètres sont fournis, le formulaire est en mode modification et les champs sont préremplis.
     * Sinon, le formulaire est en mode ajout et les champs sont vides.
     * @param {Number} id
     * @param {String} nom
     * @param {Number} etat
     */
    ouvrir(id = null, nom = null, etat = null) {
        // Les champs sont préremplis si on est en mode modification
        if (id !== null && nom !== null && etat !== null) {
            this.#titreModaleHTML.textContent = "Modifier une tâche";
            this.#champIdHTML.value = id;
            this.#champNomHTML.value = nom;
            this.#champEtatHTML.value = etat;
        } else {
            this.#titreModaleHTML.textContent = "Ajouter une tâche";
            this.#champIdHTML.value = ""; //On s'assure que le champ id est vide
            this.#formHTML.reset(); // Vide les champs et remet l'état à "À faire"
        }

        //Par défaut, le bouton submit est désactivé
        this.#btnSubmitHTML.disabled = true;
        this.#modale.classList.remove("invisible");
    }

    /**
     * Fonction qui ferme la modale
     */
    #fermer() {
        this.#modale.classList.add("invisible");
    }

    /**
     * Fonction qui valide le formulaire et active/désactive le bouton submit en conséquence
     * @returns {Boolean} indiquant si le formulaire est valide ou non
     */
    #valider() {
        const estValide = this.#formHTML.checkValidity();
        this.#btnSubmitHTML.disabled = !estValide;

        return estValide;
    }

    /**
     * Fonction qui envoie les données du formulaire à l'application
     * On bloque l'envoi du formulaire de manière traditionnelle pour éviter le rechargement de la page
     * On envoie les données à l'application via les méthodes ajouterTache ou modifierTache selon le mode avec Fetch API
     * @param {Event} evenement
     * @returns
     */
    #envoyer(evenement) {
        evenement.preventDefault();

        const donnees = {
            id: this.#champIdHTML.value || null,
            nom: this.#champNomHTML.value.trim(),
            etat: this.#champEtatHTML.value,
        };

        //Si la validation front-end échoue, on ne fait rien
        //C'est-à-dire que les attributs "required" et "minlength" ne sont pas respectés
        if (!this.#valider()) return;

        //Selon le mode, on ajoute ou modifie une tâche
        //Quand on crée une tâche, l'id est null car il sera généré par le serveur
        if (donnees.id !== null) {
            this.#application.modifierTache(donnees.id, donnees.nom, donnees.etat);
        } else {
            this.#application.ajouterTache(donnees.nom, donnees.etat);
        }
        this.#fermer();
    }
}

export default Formulaire;
