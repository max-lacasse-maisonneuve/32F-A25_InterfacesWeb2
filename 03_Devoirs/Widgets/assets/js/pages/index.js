class Bouton {
    constructor(conteneurHTML, label, couleur = "red") {
        this.conteneurHTML = conteneurHTML;
        this.label = label;
        this.couleur = couleur;
        this.element = null;
        this.generer();
    }

    generer = () => {
        const gabarit = `<button data-couleur=${this.couleur}>${this.label}</button>`;
        this.conteneurHTML.insertAdjacentHTML("beforeend", gabarit);

        //On enregistre l'élément ajouté pour y ajouter un écouteur d'événement plus tard
        this.element = this.conteneurHTML.lastElementChild;
        //Si on n'utilise pas bind, this ne fera pas référence à l'instance de la classe
        this.element.addEventListener("click", this.cliquer);
    };

    cliquer = () => {
        //Sans bind, impossible d'accéder aux autres propriétés de l'instance
        console.log(`Le bouton ${this.label} a été cliqué!`);
    };
}

new Bouton(document.body, "patate");
