class Activite {
    #conteneurHTML;
    #elementHTML;
    #boutonHTML;

    #description;
    #prix;

    constructor(conteneurHTML, description, prix, panierAchat) {
        this.#conteneurHTML = conteneurHTML;
        this.#description = description;
        this.#prix = prix;
        this.panierAchat = panierAchat;
        this.#injecterHTML();
    }

    get description() {
        return this.#description;
    }

    get prix() {
        return this.#prix;
    }
    //==============
    // ÉVÉNEMENTS
    //==============
    /**
     * Fonction qui se déclenche au clic du bouton d'ajout au panier d'achat
     * @param {Event} evenement
     */
    #clicBoutonAchat(evenement) {
        this.panierAchat.ajouterAuPanier(this);
    }

    //==============
    // AFFICHAGE
    //==============
    /**
     * Fonction qui sert à ajouter une carte d'activité sur la page
     */
    #injecterHTML() {
        const gabarit = `<div class="carte">
            <h2>${this.#description}</h2>
            <h3>${this.#prix}$</h3>
            <button>Ajouter au panier</button>
        </div>`;

        this.#conteneurHTML.insertAdjacentHTML("beforeend", gabarit);

        this.#elementHTML = this.#conteneurHTML.lastElementChild;
        this.#boutonHTML = this.#elementHTML.querySelector("button");

        //Ajouter une activite sur la page qui inclut description, prix, bouton
        this.#boutonHTML.addEventListener("click", this.#clicBoutonAchat.bind(this));
    }
}

export default Activite;
