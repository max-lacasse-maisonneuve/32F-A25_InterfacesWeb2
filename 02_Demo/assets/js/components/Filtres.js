class Filtres {
    #application;
    constructor(application) {
        this.#application = application;
    }

    trierParPrix(liste) {
        const clone = [...liste];

        clone.sort(function (a, b) {
            return a.prix - b.prix;
        });

        return clone;
    }

    trierParNom(liste) {}

    render() {
        const gabarit = `<div>
            <button data-prix>Trier par prix</button>
            <button data-nom>Trier par nom</button>
        </div>`;

        this.#application.conteneurHTML.insertAdjacentHTML("beforeend", gabarit);
        this.#application.querySelector("data-prix").addEventListener("click", this.trierParPrix.bind(this));
    }
}

export default Filtres;
