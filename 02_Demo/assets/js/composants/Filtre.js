class Filtre {
    #conteneurHTML;
    #elementHTML;
    #application;

    constructor(conteneurHTML, application) {
        this.#conteneurHTML = conteneurHTML;
        this.#application = application;
        this.injecterHTML();
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

    clicTri(evenement) {
        const declencheur = evenement.target.closest("[data-categorie]");

        if (declencheur != null) {
            const direction = declencheur.dataset.direction;
            const listeTriee = this.trierParPrix(direction, this.#application.listeActivites);
            this.#application.listeActivites = listeTriee;
        }
    }

    trierParPrix(direction, listeATrier) {
        const clone = [...listeATrier];
        clone.sort(function (a, b) {
            if (direction == "asc") {
                if (a.prix < b.prix) {
                    return -1;
                } else if (a.prix > b.prix) {
                    return 1;
                }
            } else {
                if (a.prix < b.prix) {
                    return 1;
                } else if (a.prix > b.prix) {
                    return -1;
                }
            }
        });

        return clone;
    }
}

export default Filtre;
