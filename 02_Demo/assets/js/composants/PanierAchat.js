import EnregistreurDonneesLocales from "./EnregistreurDonneesLocales.js";

// Constantes pour les taxes
// On les enregistre en tant que constante car elles ne changeront jamais
// plus facile à modifier si jamais le taux change
const TAUX_TVQ = 5;
const TAUX_TPS = 9.975;

// Classe qui gère le panier d'achat
export default class PanierAchat {
    // Propriétés privées
    #achats;

    #conteneurHTML;
    #declencheur;
    #panierModale;
    #listeProduitsHTML;

    #soustotalHTML;
    #tpsHTML;
    #tvqHTML;
    #totalHTML;

    #timeout;
    constructor(conteneur) {
        this.#achats = [];
        this.#conteneurHTML = conteneur;
        this.#declencheur;

        //On ajoute le contenu sur la page
        this.#injecterHTML();

        // Ajout d'un écouteur d'événement personnalisé
        // On écoute l'événement "ajoutPanier" qui est déclenché au clic du bouton ajouter quelque part sur la page
        // On l'ajoute sur l'élément du DOM sur lequel l'événement est déclenché

        // Vérifie si des données sont enregistrées dans le local storage au chargement de la page
    }

    //============
    // ÉVÉNEMENTS
    //============

    // Méthode privée qui gère les clics sur le bouton panier d'achat dans l'entête
    #clicConteneur() {
        // On vérifie si la modale est ouverte, si oui on la ferme, sinon on l'ouvre
        let estOuvert = this.#panierModale.classList.contains("invisible") == false;

        // On passe l'opposé de la valeur actuelle
        this.#afficherPanier(!estOuvert);
    }

    //==============
    // AFFICHAGE DU PANIER
    //===============

    /**
     * Méthode qui injecte le HTML du panier d'achat
     */
    #injecterHTML() {
        const gabarit = `
                    <i class="fa fa-shopping-cart btn-modale" data-btn-declencheur></i>

                    <!--  Modale du panier achat -->
                    <div data-panier-modale class="panier-modale invisible">
                        <h3>Panier d'achat</h3>
                        <div class="liste-panier-modale" data-panier-liste></div>
                        <hr />
                        <div class="sous-total">Sous-total: <span data-sous-total></span>&nbsp;$</div>
                        <div class="tvq">TVQ: <span data-tvq></span>&nbsp;$</div>
                        <div class="tps">TPS: <span data-tps></span>&nbsp;$</div>
                        <div class="total">Total: <span data-total></span>&nbsp;$</div> 
                    </div>`;

        this.#conteneurHTML.insertAdjacentHTML("beforeend", gabarit);

        this.#declencheur = this.#conteneurHTML.querySelector("[ data-btn-declencheur]");

        this.#panierModale = this.#conteneurHTML.querySelector("[data-panier-modale]");
        this.#listeProduitsHTML = this.#conteneurHTML.querySelector("[data-panier-liste]");
        this.#soustotalHTML = this.#conteneurHTML.querySelector("[data-sous-total]");
        this.#tvqHTML = this.#conteneurHTML.querySelector("[data-tvq]");
        this.#tpsHTML = this.#conteneurHTML.querySelector("[data-tps]");
        this.#totalHTML = this.#conteneurHTML.querySelector("[data-total]");

        //On ajoute un clic sur l'icône qui sert à afficher le panier d'achat
        this.#conteneurHTML.addEventListener("click", this.#clicConteneur.bind(this));
    }

    /**
     * On affiche le panier d'achat et on
     * @param {Boolean} estVisible Si vrai, le panier est affichée, sinon il est caché
     */
    #afficherPanier(estVisible = true) {
        const peutDefiler = estVisible == false;
        this.#panierModale.classList.toggle("invisible", estVisible == false);

        this.#activerDefilementPage(peutDefiler);
    }

    // Méthode qui met à jour le panier d'achat
    #mettreAJourPanier() {
        if (this.#achats.length > 0) {
            // On vide la liste avant de la remplir
            // On boucle sur le tableau des achats
            // On calcule le total et on l'affiche
            this.#listeProduitsHTML.innerHTML = "";
            this.#achats.forEach(
                function (achat, index) {
                    const gabarit = `
                        <div class="item-panier-modale">
                            <span class="nom-produit">${achat.description}</span>
                            <span class="prix-produit">${achat.prix.toFixed(2)}&nbsp;$</span>
                        </div>`;
                    this.#listeProduitsHTML.insertAdjacentHTML("beforeend", gabarit);
                }.bind(this)
            );
        } else {
            //On affiche que le panier est vide
            this.#listeProduitsHTML.innerHTML = "<p>Le panier est vide</p>";
        }
        this.#calculerTotal();
    }

    /**
     * Méthode privée qui calcule le total des achats
     */
    #calculerTotal() {
        let sousTotal = 0;

        // On boucle sur le tableau des achats et on additionne les prix
        // On utilise Number pour convertir le prix en nombre décimal
        this.#achats.forEach(
            function (achat) {
                sousTotal += achat.prix;
            }.bind(this)
        );
        let tvq = (sousTotal * TAUX_TVQ) / 100;
        let tps = (sousTotal * TAUX_TPS) / 100;
        let total = sousTotal + tvq + tps;

        // On affiche les résultats dans la modale
        // On utilise la méthode toFixed pour arrondir à 2 décimales
        this.#soustotalHTML.innerText = sousTotal.toFixed(2);
        this.#tvqHTML.innerText = tvq.toFixed(2);
        this.#tpsHTML.innerText = tps.toFixed(2);
        this.#totalHTML.innerText = total.toFixed(2);
    }

    // ========
    // Autres fonctions
    #activerDefilementPage(peutDefiler = true) {
        //Modifier le css pour bloquer le défilement
    }

    /**
     * Méthode qui ajoute une activité au panier d'achat
     * La méthode enregistre les données dans le local storage
     * Met à jour le panier et l'affiche
     * Est appelée lorsqu'un événement personnalisé est déclenché
     * @param {*} evenement
     */
    ajouterAuPanier(achat) {
        //TODO: Activer la méthode via un événement personnalisé

        // On ajoute l'achat au tableau des achats
        this.#achats.push(achat);
        this.#mettreAJourPanier();
        this.#afficherPanier(true);

        // On enregistre  la liste des achats dans le local storage
        // On utilise la méthode statique de la classe EnregistreurDonneesLocales
    }

    /**
     *Méthode qui récupère les données du local storage
     * Est appelée lors de l'initialisation de la classe, donc au chargement de la page
     */
    #recupererDonneesLocales() {
        // On utilise la méthode statique de la classe EnregistreurDonneesLocales
        // On passe la clé qui sert à identifier les données
        // Si des données sont retournées, on écrase le tableau de livres avec ces données
        // On met à jour la modale avec les données récupérées
    }
}
