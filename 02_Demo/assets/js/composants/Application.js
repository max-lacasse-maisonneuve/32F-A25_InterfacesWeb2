import Piscine from "./Piscine.js";
import Pagination from "./Pagination.js";
import Formulaire from "./Formulaire.js";
import ToastErreur from "./ToastErreur.js";

class Application {
    #conteneurHTML = null;
    #conteneurListePiscinesHTML = null;
    #boutonGeolocalisationHTML = null;
    #listePiscines = [];
    #formulaire = null;
    #pagination = null;

    constructor() {
        this.#conteneurHTML = document.querySelector("[data-application]");
        this.#conteneurListePiscinesHTML = this.#conteneurHTML.querySelector("[data-liste-piscine]");
        this.#boutonGeolocalisationHTML = this.#conteneurHTML.querySelector("[data-geolocalisation]");

        // setTimeout(function () {
        //     console.log("delai terminé");
        // }, 3000);

        // console.log("après le settimeout");
        this.#boutonGeolocalisationHTML.addEventListener("click", this.#onClicGeolocalisation.bind(this));
        this.rechercherParId(1);
        this.recupererDonnees();

        let testNouvellePiscine = {
            id: "48",
            type_piscine: "Piscine modifiée encore",
            nom: "TEST sdfsdf",
            arrondissement: "Ahuntsic-Cartierville",
            adresse: "TEST sdfsdf",
            gestion: "Municipale",
            equipement: "Complexe aquatique",
            longitude: "-73.6363901",
            latitude: "45.5525260",
        };

        this.modifierPiscine(testNouvellePiscine);
    }

    get conteneurHTML() {
        return this.#conteneurHTML;
    }

    #onClicGeolocalisation() {
        if ("getBattery" in navigator) {
            navigator.getBattery().then(function (infos) {
                console.log(infos);
            });
        }

        navigator.geolocation.getCurrentPosition(
            function (position) {
                const { latitude, longitude } = position.coords;
                this.centrerCarte(latitude, longitude);
            }.bind(this),
            function (erreur) {
                new ToastErreur(document.body, erreur.message);
            }
        );
    }

    //======Événements personnalisés======//

    /**
     * Récupérer les données des piscines à partir de la base de données de manière asynchrone
     */

    recupererDonnees() {
        fetch("http://localhost:8888/api/piscine/rechercherTout.php")
            .then(
                function (reponse) {
                    return reponse.json();
                }.bind(this)
            )
            .then(
                function (donnees) {
                    this.#listePiscines = donnees.map(
                        function (donneesPiscine) {
                            const { id, type_piscine, arrondissement, nom, adresse, gestion, equipement, latitude, longitude } = donneesPiscine;
                            const nouvellePiscine = new Piscine(this, id, type_piscine, nom, arrondissement, adresse, gestion, equipement, longitude, latitude);

                            return nouvellePiscine;
                        }.bind(this)
                    );

                    this.afficherListe(this.#listePiscines);
                }.bind(this)
            );
    }

    rechercherParId(id) {
        const params = new URLSearchParams({ id: id, nom: "montréal" });

        fetch(`http://localhost:8888/api/piscine/rechercherUn.php?${params}`)
            .then(function (reponse) {
                return reponse.json();
            })
            .then(function (donnees) {
                console.log(donnees);
            });
    }

    ajouterPiscine(nouvellePiscine) {
        const donneesEncodees = JSON.stringify(nouvellePiscine);

        const config = {
            method: "POST",
            header: {
                "Content-Type": "application/json",
            },
            body: donneesEncodees,
        };

        fetch("http://localhost:8888/api/piscine/ajouterUn.php", config)
            .then(
                function (reponse) {
                    return reponse.json();
                }.bind(this)
            )
            .then(
                function (donnees) {
                    const { id } = donnees;
                    const { type_piscine, arrondissement, nom, adresse, gestion, equipement, latitude, longitude } = nouvellePiscine;

                    const instancePiscine = new Piscine(this, id, type_piscine, nom, arrondissement, adresse, gestion, equipement, longitude, latitude);
                    this.#listePiscines.push(instancePiscine);
                    instancePiscine.injecterHTML();
                }.bind(this)
            );
    }

    modifierPiscine(donneesPiscine) {
        const donneesEncodees = JSON.stringify(donneesPiscine);

        const config = {
            method: "POST",
            header: {
                "Content-Type": "application/json",
            },
            body: donneesEncodees,
        };

        fetch("http://localhost:8888/api/piscine/modifierUn.php", config)
            .then(
                function (reponse) {
                    return reponse.json();
                }.bind(this)
            )
            .then(
                function (donnees) {
                    const instancePiscine = this.#listePiscines.find(
                        function (piscine) {
                            return piscine.id == donneesPiscine.id;
                        }.bind(this)
                    );

                    instancePiscine.modifier(donneesPiscine);
                }.bind(this)
            );
    }

    supprimerPiscine(id) {
        const params = new URLSearchParams({ id });
        fetch(`http://localhost:8888/api/piscine/supprimerUn.php?id=${id}`)
            .then(
                function (reponse) {
                    return reponse.json();
                }.bind(this)
            )
            .then(
                function (donnees) {
                    console.log(donnees);
                    this.#listePiscines = this.#listePiscines.filter(
                        function (piscine) {
                            console.log(piscine, id);

                            if (piscine.id == id) {
                                piscine.supprimer();
                            }

                            return piscine.id != id;
                        }.bind(this)
                    );
                }.bind(this)
            );
    }

    /**
     * Afficher la liste des piscines dans le HTML
     * @param {Array} liste
     */
    afficherListe(liste) {
        this.#conteneurListePiscinesHTML.innerHTML = "";

        liste.forEach(
            function (piscine) {
                piscine.injecterHTML();
            }.bind(this)
        );
    }
    /**
     * Afficher la carte avec les piscines en utilisant LeafletJS
     * Le JS et le CSS de Leaflet sont dans index.php
     * LeafletJS est une librairie open-source pour les cartes interactives comme Google Maps
     * https://leafletjs.com/
     */
    #afficherCarte() {
        this.map = L.map("map").setView([45.5017, -73.5673], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
        }).addTo(this.map);

        this.#listePiscines.forEach(
            function (piscine) {
                const position = piscine.position;
                console.log(position);

                L.marker([position.latitude, position.longitude]).addTo(this.map);
            }.bind(this)
        );
    }

    /**
     * Centrer la carte sur une position donnée
     * @param {number} latitude
     * @param {number} longitude
     */
    centrerCarte(latitude, longitude) {
        this.map.setView([latitude, longitude], 15);
    }
}

export default Application;
