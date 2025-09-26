class Minuterie {
    // Propriétés privées
    #compteur;
    #duree;
    #intervalID;
    #elementHTML;
    #tempsHTML;
    #conteneurHTML;
    #boutonDemarrer;
    #boutonArreter;
    #boutonRedemarrer;

    constructor(conteneurHTML, duree = 15) {
        this.#conteneurHTML = conteneurHTML;
        this.#duree = duree;
        this.#compteur = this.#duree;
        this.#injecterHTML();
    }

    /**
     * Injecte le HTML du minuteur dans la page.
     */
    #injecterHTML() {
        let gabarit = `
            <div class="minuteur">
                <span class="temps"></span>
                <button class="btn-demarrer">Démarrer</button>
                <button class="btn-arreter">Arrêter</button>
                <button class="btn-redemarrer">Redémarrer</button>
            </div>
        `;

        this.#conteneurHTML.insertAdjacentHTML("beforeend", gabarit);

        //On sélectionne les éléments HTML nécessaires pour l'affichage
        this.#elementHTML = this.#conteneurHTML.lastElementChild;
        this.#tempsHTML = this.#elementHTML.querySelector(".temps");

        this.#boutonDemarrer = this.#elementHTML.querySelector(".btn-demarrer");
        this.#boutonArreter = this.#elementHTML.querySelector(".btn-arreter");
        this.#boutonRedemarrer = this.#elementHTML.querySelector(".btn-redemarrer");

        //On ajoute les clics sur chaque bouton
        this.#boutonDemarrer.addEventListener("click", this.#demarrer.bind(this));
        this.#boutonArreter.addEventListener("click", this.#arreter.bind(this));
        this.#boutonRedemarrer.addEventListener("click", this.#redemarrer.bind(this));

        this.#afficherTemps();
    }

    /**
     * Diminue le temps du minuteur de 1 seconde.
     * Si le temps est écoulé, arrête le minuteur et affiche une notification.
     */
    #diminuerTemps() {
        this.#compteur--;

        if (this.#compteur <= 0) {
            this.#compteur = 0;
            this.#arreter();

            //TODO:AFFICHER TOAST LORSQUE FINI
        }

        this.#afficherTemps();
    }

    /**
     * Met à jour l'affichage du temps restant.
     */
    #afficherTemps() {
        this.#tempsHTML.textContent = this.#compteur;
    }

    /**
     * Démarre le minuteur.
     * Si le minuteur est déjà en cours, ne fait rien.
     * Si le compteur est à 0, le réinitialise à la durée initiale.
     */
    #demarrer() {
        if (this.#intervalID != undefined) {
            return;
        }
        if (this.#compteur === 0) {
            this.#compteur = this.#duree;
            this.#afficherTemps();
        }
        this.#intervalID = setInterval(this.#diminuerTemps.bind(this), 1000);
    }

    /**
     * Arrête le minuteur.
     * Si le minuteur n'est pas en cours, ne fait rien.
     */
    #arreter() {
        clearInterval(this.#intervalID);
        this.#intervalID = undefined;
    }

    #redemarrer() {
        this.#arreter();
        this.#compteur = this.#duree;
        this.#afficherTemps();
        this.#demarrer();
    }
}
export default Minuterie;
