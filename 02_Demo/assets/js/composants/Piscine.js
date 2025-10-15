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

    onClicCarte(evenement) {
        const declencheur = evenement.target;

        if (declencheur.closest("[ data-action='modifier']")) {
            const donnees = {
                id: this.#id,
                type_piscine: this.#type,
                arrondissement: this.#arrondissement,
                nom: this.#nom,
                adresse: this.#adresse,
                gestion: this.#gestion,
                equipement: this.#equipement,
                latitude: this.#latitude,
                longitude: this.#longitude,
            };

            this.#application.formulaire.remplirFormulaire(donnees);
        } else if (declencheur.closest("[ data-action='supprimer']")) {
            this.#application.supprimerPiscine(this.#id);
        } else {
            this.#application.centrerCarte(this.#latitude, this.#longitude);
        }
    }

    injecterHTML() {
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
                <button class="supprimer" data-action="modifier">Modifier</button>
                <button class="supprimer" data-action="supprimer">Supprimer</button>
            </div>
        `;
        this.#conteneurHTML.insertAdjacentHTML("beforeend", gabarit);
        this.#elementHTML = this.#conteneurHTML.lastElementChild;
        this.#elementHTML.addEventListener("click", this.onClicCarte.bind(this));
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
