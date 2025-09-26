class Widget {
    #gestionnaireWidget;
    #ordreAffichage;
    #widgetHTML;

    constructor(gestionnaireWidget, ordreAffichage = 0, composant) {
        this.#gestionnaireWidget = gestionnaireWidget;
        this.#ordreAffichage = ordreAffichage;
        this.#injecterHTML();
    }

    get elementHTML() {
        return this.#widgetHTML;
    }
    get ordreAffichage() {
        return this.#ordreAffichage;
    }

    set ordreAffichage(valeur) {
        this.#ordreAffichage = valeur;
        this.#widgetHTML.style.order = valeur;
        this.#widgetHTML.dataset.position = valeur;
    }

    /**
     * Méthode privée qui injecte le HTML du widget
     */
    #injecterHTML() {
        const gabarit = `
            <div class="widget" data-widget-conteneur data-position="${this.#ordreAffichage}" readonly>
                <header class="widget-header">
                    <h3 class="widget-titre">Widget</h3>
                </header>
                <div class="widget-contenu" data-widget-contenu>
                    Contenu du widget ${this.#ordreAffichage}
                </div>
            </div>
        `;

        this.#gestionnaireWidget.conteneurWidgetsHTML.insertAdjacentHTML("beforeend", gabarit);
        this.#widgetHTML = this.#gestionnaireWidget.conteneurWidgetsHTML.lastElementChild;
        this.#widgetHTML.style.order = this.#ordreAffichage;
    }
}

export default Widget;
