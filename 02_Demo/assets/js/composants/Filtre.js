class Filtre {
    #conteneurHTML;
    #elementHTML;

    constructor(conteneurHTML) {
        this.#conteneurHTML = conteneurHTML;
    }

    injecterHTML() {
        const gabarit = `
            <div class="filtres" data-action="tri">
                <div class="filtre" data-categorie="prix" data-direction="asc">Prix ascendant</div>
                <div class="filtre" data-categorie="prix" data-direction="desc">Prix descendant</div>
            </div>`;
        this.#conteneurHTML.insertAdjacentHTML("beforeend", gabarit);

        this.#elementHTML = this.#conteneurHTML.lastElementChild;
        this.#elementHTML.addEventListener("click", this.clicTri.bind(this));
    }

    clicTri(evenement) {}

    trierParPrix(direction) {}
}

export default Filtre;
