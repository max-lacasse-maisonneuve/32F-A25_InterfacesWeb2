class Piscine {
    #application;
    #elementHTML;
    #conteneurHTML;

    #id;
    #type;
    #nom;
    #arrondissement;
    #adresse;
    #gestion;
    #equipement;
    #longitude;
    #latitude;
    #image;

    constructor(application, id, type, nom, arrondissement, adresse, gestion, equipement, longitude, latitude, image) {
        this.#application = application;
        this.#conteneurHTML = this.#application.conteneurHTML.querySelector("[data-liste-piscine]");
        this.#id = id;
        this.#type = type;
        this.#nom = nom;
        this.#arrondissement = arrondissement;
        this.#adresse = adresse;
        this.#gestion = gestion;
        this.#equipement = equipement;
        this.#longitude = longitude;
        this.#latitude = latitude;
        this.#image = image;
    }

    get id() {
        return this.#id;
    }

    get position() {
        return { latitude: this.#latitude, longitude: this.#longitude };
    }

    onClicSupprimer(evenement) {
        this.#application.supprimerPiscine(this.#id);
    }

    onClicCarte() {
        this.#application.centrerCarte(this.#latitude, this.#longitude);
    }

    injecterHTML() {
        console.log(this.#image);

        const img = this.#image ? `<img src="${this.#image}" alt="Image de la piscine ${this.#nom}">` : "";
        const gabarit = `
            <div class="piscine carte" data-id="${this.#id}" data-longitude="${this.#longitude}" data-latitude="${this.#latitude}">
                <h2 data-nom>${this.#nom}</h2>
                <p>Type : <span data-type>${this.#type}</span></p>
                <p>Arrondissement : <span data-arrondissement>${this.#arrondissement}</span></p>
                <p>Adresse : <span data-adresse>${this.#adresse}</span></p>
                <p>Gestion : <span data-gestion>${this.#gestion}</span></p>
                <p>Équipement : <span data-equipement>${this.#equipement}</span></p>
                ${img}
                <button class="supprimer" data-action="supprimer">Supprimer</button>
            </div>
        `;
        this.#conteneurHTML.insertAdjacentHTML("beforeend", gabarit);
        this.#elementHTML = this.#conteneurHTML.lastElementChild;
        // this.#elementHTML.addEventListener("click", this.onClicCarte.bind(this));
        this.#elementHTML.querySelector("[data-action='supprimer']").addEventListener("click", this.onClicSupprimer.bind(this));
    }

    modifier(nouvellePiscine) {
        this.#elementHTML.dataset.id = nouvellePiscine.id;
        this.#elementHTML.dataset.latitude = nouvellePiscine.latitude;
        this.#elementHTML.dataset.longitude = nouvellePiscine.longitude;

        this.#elementHTML.querySelector("[data-nom]").textContent = nouvellePiscine.nom;
        this.#elementHTML.querySelector("[data-type]").textContent = nouvellePiscine.type;
        this.#elementHTML.querySelector("[data-arrondissement]").textContent = nouvellePiscine.arrondissment;
        this.#elementHTML.querySelector("[data-adresse]").textContent = nouvellePiscine.adresse;
        this.#elementHTML.querySelector("[data-gestion]").textContent = nouvellePiscine.gestion;
        this.#elementHTML.querySelector("[data-equipement]").textContent = nouvellePiscine.equipement;
    }

    supprimer() {
        this.#elementHTML.remove();
    }
}

export default Piscine;
