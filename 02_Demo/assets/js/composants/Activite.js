class Activite {
    #conteneurHTML;
    #elementHTML;
    #boutonHTML;

    #description;
    #prix;

    constructor(conteneurHTML, description, prix, panierAchat, modale) {
        this.#conteneurHTML = conteneurHTML;
        this.#description = description;
        this.#prix = prix;
        // this.panierAchat = panierAchat;
        this.modale = modale;
        this.injecterHTML();
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
        const paramEvenement = {
            detail: {
                achat: this,
            },
        };
        const evenementAjoutPanier = new CustomEvent("ajoutPanier", paramEvenement);
        document.dispatchEvent(evenementAjoutPanier);

        // this.panierAchat.ajouterAuPanier(this);
    }

    #clicTitre(evenement) {
        this.modale.titre = this.#description;
        this.modale.message = this.#prix;
        this.modale.afficher();
    }

    //==============
    // AFFICHAGE
    //==============
    /**
     * Fonction qui sert à ajouter une carte d'activité sur la page
     */
    injecterHTML() {
        const gabarit = `<div class="carte">
            <h2>${this.#description}</h2>
            <h3>${this.#prix}$</h3>
            <button>Ajouter au panier</button>
        </div>`;

        this.#conteneurHTML.insertAdjacentHTML("beforeend", gabarit);

        this.#elementHTML = this.#conteneurHTML.lastElementChild;
        this.#boutonHTML = this.#elementHTML.querySelector("button");

        this.#elementHTML.querySelector("h2").addEventListener("click", this.#clicTitre.bind(this));
        //Ajouter une activite sur la page qui inclut description, prix, bouton
        this.#boutonHTML.addEventListener("click", this.#clicBoutonAchat.bind(this));
    }
}

export default Activite;
