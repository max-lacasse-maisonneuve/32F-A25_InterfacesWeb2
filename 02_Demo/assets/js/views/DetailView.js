import Toast from "../components/Toast.js";

class DetailView {
    #application;
    #id;
    #service;
    #btnSupprimer;

    constructor(application, id) {
        this.#application = application;
        this.#id = id;
    }

    #genererDetail(service) {
        const image = service.image_url ? `<img href=${service.image_url} alt=${service.nom}>` : "";

        const gabarit = `
            <div class="service-detail">
                <div class="service-header">
                    <h2>${service.nom}</h2>
                    <span class="service-prix">${service.prix} $</span>
                </div>
                
                ${image}
                
                <div class="service-description">
                    <h3>Description</h3>
                    <p>${service.description}</p>
                </div>
                
                <div class="service-actions">
                    <button class="bouton" data-supprimer>Supprimer le service</button>
                    <a href="/" data-link class="bouton">Retour à la liste</a>
                </div>
            </div>
        `;
        return gabarit;
    }

    async render() {
        this.#service = await this.#application.rechercherServiceParId(this.#id);

        this.#application.conteneurHTML.innerHTML = "";

        const gabarit = `
            <div class="detail-container">
                <h1>Détails du service</h1>
                ${this.#genererDetail(this.#service)}
            </div>
        `;

        this.#application.conteneurHTML.insertAdjacentHTML("beforeend", gabarit);

        this.#btnSupprimer = this.#application.conteneurHTML.querySelector("[data-supprimer]");

        this.#btnSupprimer.addEventListener("click", this.#onClick.bind(this));
    }

    async #onClick(evenement) {
        const resultat = await this.#application.supprimerService(this.#service.id);
        new Toast(document.body, resultat.message);
        setTimeout(
            function () {
                this.#application.router.naviguer("/");
            }.bind(this),
            2000
        );
    }
}

export default DetailView;
