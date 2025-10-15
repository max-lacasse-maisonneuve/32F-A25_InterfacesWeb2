class Bouton {
    constructor(conteneurHTML, texte) {
        this.conteneurHTML = conteneurHTML;
        this.texte = texte;
        this.elementHTML;

        this.injecter();
    }

    clicBouton() {
        // console.log(this.texte);
    }

    injecter() {
        let gabaritHTML = `
            <div data-bouton class="bouton">${this.texte}</div>
        `;
        this.conteneurHTML.insertAdjacentHTML("beforeend", gabaritHTML);

        this.elementHTML = this.conteneurHTML.lastElementChild;
        this.elementHTML.addEventListener("click", this.clicBouton.bind(this));
    }
}

export default Bouton;
