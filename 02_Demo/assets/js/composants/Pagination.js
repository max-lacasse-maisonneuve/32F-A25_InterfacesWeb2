class Pagination {
    #pageCourante;
    #totalPages;
    #totalItems;
    #itemsParPage;
    #conteneurHTML;
    #elementHTML;
    #boutonPrecedentHTML;
    #boutonSuivantHTML;
    #pageCouranteHTML;
    #totalPagesHTML;
    #application;
    constructor(application, conteneurHTML, totalItems, itemsParPage = 10, pageCourante = 1) {
        this.#application = application;
        this.#pageCourante = pageCourante;
        this.#totalItems = totalItems;
        this.#itemsParPage = itemsParPage;
        this.#totalPages = Math.ceil(this.#totalItems / this.#itemsParPage);
        this.#conteneurHTML = conteneurHTML;

        this.#injecterHTML();
    }

    get pageCourante() {
        return this.#pageCourante;
    }
    get itemsParPage() {
        return this.#itemsParPage;
    }

    #onClicPagination(evenement) {
        const declencheur = evenement.target;
        // console.log(declencheur);

        if (declencheur.closest("[data-direction]")) {
            const direction = declencheur.dataset.direction;
            if (direction == "precedent") {
                this.#pageCourante--;
                this.#pageCourante = Math.max(this.#pageCourante, 1);
            } else if (direction == "suivant") {
                this.#pageCourante++;
                this.#pageCourante = Math.min(this.#pageCourante, this.#totalPages);
            }
            this.#application.changerPage(this.#pageCourante, this.#itemsParPage);
        }
    }

    #injecterHTML() {
        const gabarit = `<div>
            <button class="precedent" data-direction="precedent" ${this.#pageCourante == 1 ? "disabled" : ""}>Précédent</button>
            <span> Page <span data-page-courante>${this.#pageCourante}</span> / <span data-total-page>${this.#totalPages}</span>
            </span>
            <button class="suivant" data-direction="suivant"  ${this.#pageCourante == this.#totalPages ? "disabled" : ""}>Suivant</button>
        </div>`;

        this.#conteneurHTML.insertAdjacentHTML("beforeend", gabarit);
        this.#elementHTML = this.#conteneurHTML.lastElementChild;
        this.#boutonPrecedentHTML = this.#elementHTML.querySelector(".precedent");
        this.#boutonSuivantHTML = this.#elementHTML.querySelector(".suivant");
        this.#pageCouranteHTML = this.#elementHTML.querySelector("[data-page-courante]");
        this.#totalPagesHTML = this.#elementHTML.querySelector("[data-total-page]");

        this.#elementHTML.addEventListener("click", this.#onClicPagination.bind(this));
    }

    mettreAJour(pageCourante, itemsParPage, totalItems) {
        this.#pageCourante = pageCourante;
        this.#totalItems = totalItems;
        this.#itemsParPage = itemsParPage;
        this.#totalPages = Math.ceil(this.#totalItems / this.#itemsParPage);

        //Si on supprime le dernier élément, le total diminue et on affiche la dernière page.
        if (this.#pageCourante > this.#totalPages) {
            this.#application.changerPage(this.#totalPages, this.#itemsParPage);
        }

        this.#boutonPrecedentHTML.disabled = this.#pageCourante == 1 ? "disabled" : "";
        this.#boutonSuivantHTML.disabled = this.#pageCourante == this.#totalPages ? "disabled" : "";
        this.#pageCouranteHTML.textContent = this.#pageCourante;
        this.#totalPagesHTML.textContent = this.#totalPages;
    }
}

export default Pagination;
