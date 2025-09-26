class Carrousel {
    #conteneurParent;
    #listeSourcesImages;
    #elementHTML;
    #imageActuelleHTML;
    #boutonsHTML;
    #index;

    constructor(conteneurParent, listeSourcesImages) {
        this.#conteneurParent = conteneurParent;
        //Si le conteneur parent n'est pas fourni, on utilise le main ou le body
        if (this.#conteneurParent == null) {
            this.#conteneurParent = document.querySelector("main") || document.body;
        }
        this.#elementHTML;
        this.#imageActuelleHTML;
        this.#boutonsHTML;

        this.#listeSourcesImages = listeSourcesImages;
        this.#index = 0;

        this.#injecterCarrousel();
        this.#afficherImage();
    }

    /**
     * Fonction appelée lors du clic sur un des boutons du carrousel.
     * @param {Event} evenement
     */
    #clicBoutons(evenement) {
        const declencheur = evenement.currentTarget;
        const direction = Number(declencheur.dataset.direction);

        if (direction === 1) {
            this.#avancer();
        } else if (direction === -1) {
            this.#reculer();
        }
    }

    /**
     * Injecte le HTML du carrousel dans le conteneur parent.
     */
    #injecterCarrousel() {
        //On génère le HTML
        const gabaritHTML = `
          <div data-carrousel>
              <div class="conteneur-image">
                  <img data-carrousel-img src="" alt="">
              </div>
              <div class="conteneur-boutons">
                <div data-boutons data-direction="-1">Reculer</div>
                <div data-boutons data-direction="1">Avancer</div>
              </div>
          </div>
          `;

        this.#conteneurParent.insertAdjacentHTML("beforeend", gabaritHTML);

        //On récupère les éléments ajoutés pour les mettres en mémoire
        this.#elementHTML = this.#conteneurParent.lastElementChild;
        this.#imageActuelleHTML = this.#elementHTML.querySelector("[data-carrousel-img]");
        this.#boutonsHTML = this.#elementHTML.querySelectorAll("[data-boutons]");

        //On ajoute les écouteurs d'événements sur les boutons
        this.#boutonsHTML.forEach(
            function (element) {
                element.addEventListener("click", this.#clicBoutons.bind(this));
            }.bind(this)
        );
    }

    // Met à jour l'image affichée dans le carrousel.
    #afficherImage() {
        const urlImage = this.#listeSourcesImages[this.#index];

        this.#imageActuelleHTML.src = `assets/img/${urlImage}`;
        this.#imageActuelleHTML.alt = `Image ${this.#index + 1}`;
    }

    /**
     * Fait avancer le carrousel d'une image.
     */
    #avancer() {
        this.#index++;
        if (this.#index >= this.#listeSourcesImages.length) {
            this.#index = 0;
        }
        this.#afficherImage();
    }

    /**
     * Fait reculer le carrousel d'une image.
     */
    #reculer() {
        this.#index--;

        if (this.#index < 0) {
            this.#index = this.#listeSourcesImages.length - 1;
        }

        this.#afficherImage();
    }
}

export default Carrousel;
