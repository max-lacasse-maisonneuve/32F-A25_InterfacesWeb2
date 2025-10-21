import AccueilVue from "../vues/AccueilVue.js";
import FormulaireVue from "../vues/FormulaireVue.js";
import Page404Vue from "../vues/Page404Vue.js";

class Router {
    #routes;

    constructor() {
        this.#routes = {
            "": AccueilVue,
            admin: FormulaireVue,
        };

        this.vueActuelle;

        document.body.addEventListener("click", this.onClicLien.bind(this));
        window.addEventListener("popstate", this.miseAJour.bind(this));

        this.miseAJour();
    }

    onClicLien(evenement) {
        const declencheur = evenement.target;

        if (declencheur.closest("[data-link]")) {
            evenement.preventDefault();
            const url = new URL(declencheur.href);
            this.naviguerVers(url.pathname, url.search);
        }
    }

    naviguerVers(chemin, paramsRecherche = "") {
        const href = chemin + paramsRecherche;
        history.pushState({}, "", href);
        this.miseAJour();
    }

    miseAJour() {
        const href = window.location.href;
        const url = new URL(href);
        const pathname = url.pathname;
        const searchParams = url.searchParams;

        const tableau = pathname.split("/");
        const route = tableau[tableau.length - 1];

        const Vue = this.#routes[route];

        if (Vue) {
            this.vueActuelle = new Vue();
            this.vueActuelle.injecterHTML();
        } else {
            this.vueActuelle = new Page404Vue();
            this.vueActuelle.injecterHTML();

            // this.naviguerVers("/");
        }
    }
}
export default Router;
