class AccueilView {
    #application;
    #services = [];

    constructor(application) {
        this.#application = application;
    }

    #genererCarte(service) {
        const gabarit = `
            <div class="carte">
               
                    ${
                        service.image_url
                            ? `
                        <div class="service-card-image">
                            <img src="assets/img/${service.image_url}" alt="${service.nom}">
                        </div>
                    `
                            : `
                        <div class="service-card-image placeholder">
                            <span class="placeholder-icon">🌿</span>
                        </div>
                    `
                    }
                    <div class="service-card-content">
                        <h3 class="service-card-title">${service.nom}</h3>
                        ${service.description ? `<p class="service-card-description">${service.description}</p>` : ""}
                        <div class="service-card-footer">
                            <span class="service-card-prix">${service.prix}$</span>

                            <a href="/service/${service.id}" data-link class="bouton">Voir détail</a>
                        </div>
                    </div>
               
            </div>
        `;
        return gabarit;
    }

    /**
     * Génère la grille de services
     * @returns {string} Le HTML de la liste de services
     */
    #genererListe() {
        // Récupérer les services

        let grille = '<div class="grille">';

        this.#services.forEach((service) => {
            grille += this.#genererCarte(service);
        });

        grille += "</div>";
        return grille;
    }

    /**
     * Rend la vue d'accueil
     */
    async render() {
        try {
            this.#services = await this.#application.rechercherServices();
            // Nettoyer le conteneur
            this.#application.conteneurHTML.innerHTML = "";

            // Générer le gabarit complet
            const gabarit = `
                <div class="accueil-container">
                    <div class="services-section">
                        ${this.#genererListe()}
                    </div>
                </div>
            `;

            // Insérer le HTML
            this.#application.conteneurHTML.insertAdjacentHTML("beforeend", gabarit);

            // Attacher les événements
        } catch (erreur) {
            //TODO: Afficher un message d'erreur
        }
    }
}

export default AccueilView;
