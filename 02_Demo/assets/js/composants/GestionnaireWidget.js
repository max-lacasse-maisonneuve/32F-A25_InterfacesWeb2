import Widget from "./Widget.js";

class GestionnaireWidget {
    #conteneurHTML;
    #conteneurWidgetsHTML;
    #listeWidgets;
    #cibleWidget;
    constructor(conteneurHTML) {
        this.#conteneurHTML = conteneurHTML;
        this.#listeWidgets = [];
        this.#cibleWidget = null;

        this.#injecterHTML();
        this.ajouterWidget();
        this.ajouterWidget();
        this.ajouterWidget();
    }

    //================
    // GETTERS & SETTERS
    //================
    get conteneurWidgetsHTML() {
        return this.#conteneurWidgetsHTML;
    }
    get listeWidgets() {
        return this.#listeWidgets;
    }

    //================
    // GESTION DES ÉVÉNEMENTS
    //================
    /**
     * Fonction qui gère le clic de la souris sur un widget avant le déplacement
     * @param {Event} evenement
     * @returns
     */
    #clicSouris(evenement) {
        const widgetHTML = evenement.target.closest("[data-widget-conteneur]");
        if (!widgetHTML) return;

        this.#cibleWidget = this.#listeWidgets.find(
            function (widget) {
                return widget.elementHTML === widgetHTML;
            }.bind(this)
        );

        if (this.#cibleWidget) {
            this.#cibleWidget.elementHTML.classList.add("dragging");
        }
    }

    /**
     * Fonction qui gère le déplacement de la souris lorsqu'on déplace un widget
     * @param {Event} evenement
     * @returns
     */
    #deplacementSouris(evenement) {
        if (!this.#cibleWidget) return;

        const widgetHTML = this.#cibleWidget.elementHTML;
        const widgetCibleHTML = document
            .elementFromPoint(evenement.clientX, evenement.clientY)
            ?.closest("[data-widget-conteneur]");

        if (widgetCibleHTML && widgetCibleHTML !== widgetHTML) {
            // Trouver les widgets correspondants
            const widgetCible = this.#listeWidgets.find((w) => w.elementHTML === widgetCibleHTML);
            const indexCible = this.#listeWidgets.indexOf(widgetCible);
            const indexActuel = this.#listeWidgets.indexOf(this.#cibleWidget);

            if (indexCible !== -1 && indexCible !== indexActuel) {
                // Réorganiser la liste
                this.#listeWidgets.splice(indexActuel, 1);
                this.#listeWidgets.splice(indexCible, 0, this.#cibleWidget);

                // Mettre à jour l'ordre flex
                this.#mettreAJourOrdreAffichage();
            }
        }
    }

    /**
     * Fonction qui gère le relâchement de la souris sur un widget
     * @param {Event} evenement
     */
    #relacherSouris(evenement) {
        this.#cibleWidget.elementHTML.classList.remove("dragging");
        this.#cibleWidget = null;
    }

    //================
    // MÉTHODES PUBLIQUES
    //================
    /**
     * Méthode publique qui ajoute un widget au gestionnaire
     */
    ajouterWidget() {
        const widgetInstance = new Widget(this, this.#listeWidgets.length);
        this.#listeWidgets.push(widgetInstance);
    }

    //================
    // MÉTHODES PRIVÉES
    //================

    //================
    // AFFICHAGE DU GESTIONNAIRE
    //================
    /**
     * Fonction qui injecte le HTML du gestionnaire de widgets
     */
    #injecterHTML() {
        const gabarit = `
            <section class="gestionnaire-widget" data-gestionnaire-widget>
                <header class="gestionnaire-widget-header">
                    <h2 class="gestionnaire-widget-titre">Gestionnaire de widgets</h2>
                </header>
                <div class="gestionnaire-widget-contenu" data-gestionnaire-widget-contenu>
                </div>
            </section>
        `;
        this.#conteneurHTML.insertAdjacentHTML("beforeend", gabarit);
        this.#conteneurWidgetsHTML = this.#conteneurHTML.querySelector("[data-gestionnaire-widget-contenu]");

        this.#conteneurWidgetsHTML.addEventListener("mousedown", this.#clicSouris.bind(this));
        this.#conteneurWidgetsHTML.addEventListener("mouseup", this.#relacherSouris.bind(this));
        this.#conteneurWidgetsHTML.addEventListener("mousemove", this.#deplacementSouris.bind(this));
    }
    /**
     * Méthode privée qui met à jour l'ordre d'affichage des widgets. Active le setter ordreAffichage de chaque widget
     * Cela met à jour la propriété CSS order de chaque widget
     */
    #mettreAJourOrdreAffichage() {
        this.#listeWidgets.forEach((widget, index) => {
            widget.ordreAffichage = index;
        });
    }
}

export default GestionnaireWidget;
