import Piscine from "./Piscine.js";
import Pagination from "./Pagination.js";
import Formulaire from "./Formulaire.js";
import ToastErreur from "./ToastErreur.js";
import ToastSucces from "./ToastSucces.js";

class Application {
    #conteneurHTML = null;
    #conteneurListePiscinesHTML = null;
    #boutonGeolocalisationHTML = null;
    #paginationConteneurHTML = null;
    #listePiscines = [];
    #formulaire = null;
    #pagination = null;
    //Pour la carte leaflet
    #map;
    #markersLayer;
    constructor() {
        this.#conteneurHTML = document.querySelector("[data-application]");
        this.#conteneurListePiscinesHTML = this.#conteneurHTML.querySelector("[data-liste-piscine]");
        this.#boutonGeolocalisationHTML = this.#conteneurHTML.querySelector("[data-geolocalisation]");
        this.#paginationConteneurHTML = this.#conteneurHTML.querySelector("[data-pagination]");

        this.#boutonGeolocalisationHTML.addEventListener("click", this.#onClicGeolocalisation.bind(this));
        this.#formulaire = new Formulaire(this);

        //Initialiser la carte
        this.#map = L.map("map").setView([45.5017, -73.5673], 13);
        this.#markersLayer = L.layerGroup().addTo(this.#map);

        this.recupererDonnees();
    }

    get conteneurHTML() {
        return this.#conteneurHTML;
    }

    get formulaire() {
        return this.#formulaire;
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
    // recupererDonnees() {
    //         fetch(`http://localhost:8888/api/piscine/rechercherPagination.php?limite=5&page=1`)
    //             .then(
    //                 function (reponse) {
    //                     console.log(reponse);

    //                     if (!reponse.ok) {
    //                         return reponse.json().then(function (reponseErreur) {
    //                             throw new Error(reponseErreur.erreur);
    //                         });
    //                     }
    //                     return reponse.json();
    //                 }.bind(this)
    //             )
    //             .then(
    //                 function (donnees) {
    //                     this.#listePiscines = donnees.resultats.map(
    //                         function (donneesPiscine) {
    //                             const { id, type_piscine, arrondissement, nom, adresse, gestion, equipement, latitude, longitude } = donneesPiscine;
    //                             const nouvellePiscine = new Piscine(this, id, type_piscine, nom, arrondissement, adresse, gestion, equipement, longitude, latitude);
    //                             // console.log(donneesPiscine);

    //                             return nouvellePiscine;
    //                         }.bind(this)
    //                     );

    //                     this.afficherListe(this.#listePiscines);
    //                     // this.#afficherCarte();
    //                     this.#pagination = new Pagination(this, this.#paginationConteneurHTML, donnees.total, 5, 1);
    //                 }.bind(this)
    //             )
    //             .catch(
    //                 function (reponseErreur) {
    //                     console.log(reponseErreur);
    //                     new ToastErreur(document.body, reponseErreur);
    //                 }.bind(this)
    //             );
    //     }

    async recupererDonnees() {
        try {
            const reponse = await fetch(`http://localhost:8888/api/piscine/rechercherPagination.php?limite=5&page=1`);
            const donnees = await reponse.json();

            if (!reponse.ok) {
                throw new Error(donnees.erreur);
            }

            this.#listePiscines = donnees.resultats.map(
                function (donneesPiscine) {
                    const { id, type_piscine, arrondissement, nom, adresse, gestion, equipement, latitude, longitude, image } = donneesPiscine;
                    const nouvellePiscine = new Piscine(this, id, type_piscine, nom, arrondissement, adresse, gestion, equipement, longitude, latitude, image);
                    // console.log(donneesPiscine);

                    return nouvellePiscine;
                }.bind(this)
            );

            this.afficherListe(this.#listePiscines);
            this.#afficherCarte();
            this.#pagination = new Pagination(this, this.#paginationConteneurHTML, donnees.total, 5, 1);
        } catch (erreur) {
            new ToastErreur(document.body, erreur);
        }
    }

    //  changerPage(pageCourante, nbElementsParPage) {
    //     const params = new URLSearchParams({ limite: nbElementsParPage, page: pageCourante });
    //     fetch(`http://localhost:8888/api/piscine/rechercherPagination.php?${params}`)
    //         .then(
    //             function (reponse) {
    //                 return reponse.json();
    //             }.bind(this)
    //         )
    //         .then(
    //             function (donnees) {
    //                 console.log(donnees);

    //                 this.#listePiscines = donnees.resultats.map(
    //                     function (donneesPiscine) {
    //                         const { id, type_piscine, arrondissement, nom, adresse, gestion, equipement, latitude, longitude } = donneesPiscine;
    //                         const nouvellePiscine = new Piscine(this, id, type_piscine, nom, arrondissement, adresse, gestion, equipement, longitude, latitude);

    //                         return nouvellePiscine;
    //                     }.bind(this)
    //                 );

    //                 this.afficherListe(this.#listePiscines);
    //                 this.#afficherCarte();
    //                 this.#pagination.mettreAJour(donnees.page, donnees.limite, donnees.total);
    //             }.bind(this)
    //         );
    // }

    async changerPage(pageCourante, nbElementsParPage) {
        try {
            const params = new URLSearchParams({ limite: nbElementsParPage, page: pageCourante });
            const reponse = await fetch(`http://localhost:8888/api/piscine/rechercherPagination.php?${params}`);
            const donnees = await reponse.json();
            console.log(donnees);

            this.#listePiscines = donnees.resultats.map(
                function (donneesPiscine) {
                    const { id, type_piscine, arrondissement, nom, adresse, gestion, equipement, latitude, longitude, image } = donneesPiscine;
                    const nouvellePiscine = new Piscine(this, id, type_piscine, nom, arrondissement, adresse, gestion, equipement, longitude, latitude, image);

                    return nouvellePiscine;
                }.bind(this)
            );

            this.afficherListe(this.#listePiscines);
            this.#afficherCarte();
            this.#pagination.mettreAJour(donnees.page, donnees.limite, donnees.total);
        } catch (erreur) {
            new ToastErreur(document.body, erreur.erreur);
        }
    }

    rechercherParId(id) {}

    async ajouterPiscine(nouvellePiscine, fichierImage) {
        const config = {
            method: "POST",
            header: {
                "Content-Type": "application/JSON",
            },
            body: JSON.stringify(nouvellePiscine),
        };

        const reponse = await fetch(`http://localhost:8888/api/piscine/ajouterUn.php`, config);
        const donnees = await reponse.json();

        const formData = new FormData();
        formData.append("id", donnees.id);
        formData.append("image", fichierImage);

        const configImage = {
            method: "POST",
            body: formData,
        };
        const reponseImage = await fetch(`http://localhost:8888/api/piscine/ajouterUneImage.php`, configImage);
        const donneesImage = await reponseImage.json();

        this.#formulaire.viderFormulaire();

        this.changerPage(this.#pagination.pageCourante, this.#pagination.itemsParPage);
    }

    modifierPiscine(donneesPiscine) {
        const config = {
            method: "POST",
            header: {
                "Content-Type": "application/JSON",
            },
            body: JSON.stringify(donneesPiscine),
        };

        fetch(`http://localhost:8888/api/piscine/modifierUn.php`, config)
            .then(
                function (reponse) {
                    return reponse.json();
                }.bind(this)
            )
            .then(
                function (donnees) {
                    // console.log("formulaire envoyé", donnees);
                    this.#formulaire.viderFormulaire();
                    //Changer l'affichage
                    //Stratégie 1: On trouve l'instance, on modifie l'affichage directement avec la classe
                    // const piscine = this.#listePiscines.find(
                    //     function (piscine) {
                    //         return piscine.id == donnees.id;
                    //     }.bind(this)
                    // );

                    // if (piscine !== null) {
                    //     piscine.modifier(donnees);
                    // }

                    //Stratégie 2: On rappelle les méthodes de pagination dans notre cas.
                    this.changerPage(this.#pagination.pageCourante, this.#pagination.itemsParPage);
                }.bind(this)
            );
    }

    supprimerPiscine(id) {
        const config = {
            method: "DELETE",
        };
        const param = new URLSearchParams({ id });
        fetch(`http://localhost:8888/api/piscine/supprimerUn.php?${param}`, config)
            .then(
                function (reponse) {
                    return reponse.json();
                }.bind(this)
            )
            .then(
                function (donnees) {
                    // console.log(donnees);
                    const message = donnees.message;
                    //Supprimer l'élément de la page
                    //Stratégie 1: On trouve l'instance, on modifie l'affichage directement avec la classe
                    // const piscine = this.#listePiscines.find(
                    //     function (piscine) {
                    //         return piscine.id == donnees.id;
                    //     }.bind(this)
                    // );

                    // if (piscine !== null) {
                    //     piscine.supprimer();
                    // }

                    //Stratégie 2: avec pagination
                    new ToastSucces(document.body, message);
                    this.changerPage(this.#pagination.pageCourante, this.#pagination.itemsParPage);
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
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
        }).addTo(this.#map);

        this.#markersLayer.clearLayers();

        this.#listePiscines.forEach(
            function (piscine) {
                const position = piscine.position;

                L.marker([position.latitude, position.longitude]).addTo(this.#markersLayer);
            }.bind(this)
        );
    }

    /**
     * Centrer la carte sur une position donnée
     * @param {number} latitude
     * @param {number} longitude
     */
    centrerCarte(latitude, longitude) {
        this.#map.setView([latitude, longitude], 15);
    }
}

export default Application;
