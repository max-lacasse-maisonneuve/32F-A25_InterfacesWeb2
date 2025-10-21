class Formulaire {
    #application;
    #conteneurHTML;
    #elementHTML;
    #boutonSubmitHTML;
    #boutonResetHTML;
    #champsHTML;
    #methode;
    #bEstValide = false;
    #donneesFormulaire = {};
    #fichierImage;
    #visualisateurFichier;
    constructor(application) {
        this.#application = application;
        this.#elementHTML = this.#application.conteneurHTML.querySelector("[data-formulaire]");
        this.#boutonSubmitHTML = this.#elementHTML.querySelector("button[type='submit']");
        this.#boutonResetHTML = this.#elementHTML.querySelector("button[type='reset']");
        this.#champsHTML = this.#elementHTML.querySelectorAll("[name]");
        this.#visualisateurFichier = this.#elementHTML.querySelector("[data-visualisateur-image]");

        this.#visualisateurFichier.addEventListener("click", this.#onClicVisualisateur.bind(this));
        this.#elementHTML.addEventListener("submit", this.#onSubmitFormulaire.bind(this));
        this.#elementHTML.addEventListener("change", this.#onChangementChamps.bind(this));
        this.#elementHTML.addEventListener("reset", this.#onResetFormulaire.bind(this));

        this.#methode = "POST";
        this.viderFormulaire();
        this.#validerFormulaire();
        this.chainagePromesses();
    }

    //On en profite au passage pour également vider les données
    #onResetFormulaire(evenement) {
        this.viderFormulaire(); //Vide les donnees
    }

    #onClicVisualisateur() {
        this.#elementHTML.querySelector("[name='image']").value = "";
        this.#visualisateurFichier.src = "";
    }

    #onSubmitFormulaire(evenement) {
        evenement.preventDefault(); // On bloque l'envoi de formulaire par défaut

        if (this.#validerFormulaire()) {
            //Envoyer les infos de notre formulaire
            this.#champsHTML.forEach(
                function (champ) {
                    const name = champ.name;
                    // const type = champ.type;
                    if (name == "image") {
                        const fichier = champ.files[0];
                        if (!fichier || champ.files.length == 0) {
                            // new toast erreur = vous devez ajouter un fichier
                        }

                        const types = ["image/jpg", "image/jpeg", "image/png"];

                        if (!types.includes(fichier.type)) {
                            //Retourner toast erreur, pas du bon type.
                        }

                        const tailleMax = 5 * 1024 * 1024;
                        if (fichier.size > tailleMax) {
                            //REtourner une erreur, le fichier est trop grand
                        }
                        this.#fichierImage = fichier;
                    } else {
                        const value = champ.value;
                        this.#donneesFormulaire[name] = value;
                    }
                }.bind(this)
            );

            if (this.#methode === "POST") {
                this.#application.ajouterPiscine(this.#donneesFormulaire, this.#fichierImage);
            } else if (this.#methode === "PUT") {
                this.#application.modifierPiscine(this.#donneesFormulaire, this.#fichierImage);
            }
        }
    }

    async #onChangementChamps(evenement) {
        // Au changement d'info d'un champs
        const declencheur = evenement.target;
        // Valider les informations du champs et nettoyer
        if (declencheur.closest("[name]")) {
            this.#validerChamp(declencheur);
        }

        if (declencheur.closest("[type='file']")) {
            const fichier = declencheur.files[0];

            try {
                const donneesImage = await this.lireFichierImage(fichier);
                this.#visualisateurFichier.src = donneesImage;
            } catch (erreur) {
                //TODO: ajouter un toast en cas d'erreur
            }
        }
        // Valider le formulaire
        this.#validerFormulaire();
    }

    async chainagePromesses() {
        const donnees = [1, 2, 3, 4, 5];
        const tableauPromesses = donnees.map(function (element) {
            return new Promise(function (resolve, reject) {
                //Implémenter votre logique
                setTimeout(resolve, 1000);
            });
        });

        await Promise.all(tableauPromesses);

        console.log("batch terminée");
    }

    lireFichierImage(fichier) {
        return new Promise(function (resolve, reject) {
            const lecteur = new FileReader();

            lecteur.addEventListener("load", function () {
                resolve(lecteur.result);
            });

            lecteur.addEventListener("error", function () {
                reject(lecteur.error);
            });

            lecteur.readAsDataURL(fichier);
        });
    }

    remplirFormulaire(donnees) {
        this.#methode = "PUT";
        this.#boutonSubmitHTML.textContent = "Modifier la piscine";
        this.#donneesFormulaire = donnees;

        for (const name in donnees) {
            const value = donnees[name];

            const elementHTML = this.#elementHTML.querySelector(`[name="${name}"]`);

            if (elementHTML !== null) {
                elementHTML.value = value;
            }
        }
        this.#validerFormulaire();
    }

    #validerFormulaire() {
        this.#champsHTML.forEach(
            function (champ) {
                this.#validerChamp(champ);
            }.bind(this)
        );

        const estValide = this.#elementHTML.checkValidity();

        //Bloquer le bouton submitthis.
        this.#boutonSubmitHTML.disabled = this.#elementHTML.checkValidity() == false ? "disabled" : "";

        return estValide;
    }

    #validerChamp(champ) {
        //Nettoyer
        if (champ.type == "file") {
            return;
        }
        champ.value = champ.value.trim();

        //Formatter les donnees au besoin
        if (champ.name == "telephone") {
            ///
        }

        //Afficher le message d'erreur personnalisé au besoin
        // champ.closest(".input-group").querySelector(".message-erreur").classList.toggle("invisible",champ.checkValidity())
    }

    viderFormulaire() {
        this.#donneesFormulaire = {};
        this.#elementHTML.reset();
        this.#methode = "POST";
        this.#fichierImage = null;
        this.#boutonSubmitHTML.textContent = "Ajouter la piscine";
    }
}
export default Formulaire;
