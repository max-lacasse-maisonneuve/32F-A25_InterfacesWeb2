class Pagination {
    #application;
    #conteneurHTML;
    #elementHTML;

    #totalItems;
    #itemsParPage;
    #pageCourante;

    constructor(application, totalItems, itemsParPage = 10, pageCourante = 1) {
        this.#application = application;
        this.#conteneurHTML = this.#application.conteneurHTML.querySelector("[data-pagination]");

        this.#totalItems = totalItems;
        this.#itemsParPage = itemsParPage;
        this.#pageCourante = pageCourante;
        this.injecterHTML();
    }

    get totalPages() {
        return Math.ceil(this.#totalItems / this.#itemsParPage);
    }
    get indexDebut() {
        return (this.#pageCourante - 1) * this.#itemsParPage;
    }

    #onClicPagination(evenement) {
        const direction = evenement.target.dataset.direction;
        if (direction === "precedent" && this.#pageCourante > 1) {
            this.#pageCourante--;
        } else if (direction === "suivant" && this.#pageCourante < this.totalPages) {
            this.#pageCourante++;
        }

        const donnees = {
            detail: {
                page: this.#pageCourante,
                indexDebut: this.indexDebut,
                itemsParPage: this.#itemsParPage,
                totalPages: this.totalPages,
            },
        };

        this.mettreAJour(this.#pageCourante, this.#totalItems, this.#itemsParPage);

        const evenementPagination = new CustomEvent("pagination", donnees);
        window.dispatchEvent(evenementPagination);
    }

    mettreAJour(pageCourante, totalItems, itemsParPage) {
        this.#pageCourante = pageCourante;
        this.#totalItems = totalItems;
        this.#itemsParPage = itemsParPage;

        this.#elementHTML.querySelector("[data-page-courante]").textContent = this.#pageCourante;
        this.#elementHTML.querySelector("[data-total-pages]").textContent = this.totalPages;
        this.#elementHTML.querySelector(".precedent").disabled = this.#pageCourante === 1;
        this.#elementHTML.querySelector(".suivant").disabled = this.#pageCourante === this.totalPages;
    }

    injecterHTML() {
        const gabarit = `
        <div>
            <button class="precedent" ${
                this.#pageCourante === 1 ? "disabled" : ""
            } data-direction="precedent">&laquo; Précédent</button>
            <span>Page 
                <span class="page-courante" data-page-courante>${this.#pageCourante}</span> 
                    sur
                <span class="total-pages" data-total-pages>${this.totalPages}</span>
            </span>
            <button class="suivant" ${
                this.#pageCourante === this.totalPages ? "disabled" : ""
            } data-direction="suivant">Suivant &raquo;</button>
        </div>
        `;

        this.#conteneurHTML.insertAdjacentHTML("beforeend", gabarit);
        this.#elementHTML = this.#conteneurHTML.lastElementChild;

        this.#elementHTML.querySelector(".precedent").addEventListener("click", this.#onClicPagination.bind(this));
        this.#elementHTML.querySelector(".suivant").addEventListener("click", this.#onClicPagination.bind(this));
    }
}

export default Pagination;
