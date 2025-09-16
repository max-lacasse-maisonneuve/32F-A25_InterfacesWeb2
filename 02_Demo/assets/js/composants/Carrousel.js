class Carrousel {
  constructor(conteneurParent, listeImages) {
    this.conteneurParent = conteneurParent;
    this.listeImages = listeImages;

    this.elementHTML;
    this.imageActuelleHTML;
    this.boutonsHTML;

    this.index = 0;

    this.injecterCarrousel();
    this.afficherImage(listeImages[0]);
  }

  clicBoutons(evenement) {
    const declencheur = evenement.currentTarget;
    const direction = Number(declencheur.dataset.direction);
    this.index += direction;

    if (this.index < 0) {
      this.index = this.listeImages.length - 1;
    }

    if (this.index >= this.listeImages.length) {
      this.index = 0;
    }

    this.afficherImage(this.listeImages[this.index]);
  }

  injecterCarrousel() {
    //On génère le HTML
    const gabaritHTML = `
    <div data-carrousel>
        <div>
            <img data-carrousel-img src="" alt="">
        </div>
        <div>
            <div data-boutons data-direction="1">Avancer</div>
            <div data-boutons data-direction="-1">Reculer</div>
        </div>
    </div>
    `;
    this.conteneurParent.insertAdjacentHTML("beforeend", gabaritHTML);

    //On récupère les éléments ajoutés pour les mettres en mémoire
    this.elementHTML = this.conteneurParent.lastElementChild;
    this.imageActuelleHTML = this.elementHTML.querySelector(
      "[data-carrousel-img]"
    );

    this.boutonsHTML = this.elementHTML.querySelectorAll("[data-boutons]");

    this.boutonsHTML.forEach(
      function (element) {
        element.addEventListener("click", this.clicBoutons.bind(this));
      }.bind(this)
    );
  }

  afficherImage(urlImage) {
    this.imageActuelleHTML.src = `assets/img/${urlImage}`;
  }

  avancer() {}
  reculer() {}
}

export default Carrousel;
