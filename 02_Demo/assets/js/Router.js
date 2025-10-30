import AccueilView from "./views/AccueilView.js";
import Page404View from "./views/Page404View.js";
import AjoutView from "./views/AjoutView.js";
import DetailView from "./views/DetailView.js";

class Router {
    #application;
    #routes;
    #vueActuelle;
    #basename;

    constructor(application) {
        this.#application = application;
        this.#basename = "/paysagement";
        this.#routes = {
            "": AccueilView,
            admin: AjoutView,
            service: DetailView,
        };

        this.miseAJour();
        document.body.addEventListener("click", this.#onClicLien.bind(this));
        window.addEventListener("popstate", this.miseAJour.bind(this));
    }

    #onClicLien(evenement) {
        const declencheur = evenement.target;

        if (declencheur.closest("[data-link]")) {
            evenement.preventDefault();

            const url = new URL(declencheur.href);
            this.naviguer(url.pathname);
        }
    }

    naviguer(chemin) {
        const baseComplete = window.location.origin + this.#basename;
        const href = baseComplete + chemin;

        history.pushState({}, "", href);
        this.miseAJour();
    }

    miseAJour() {
        const url = new URL(window.location.href);
        let pathname = url.pathname;
        const searchParams = url.searchParams;

        if (pathname.startsWith(this.#basename)) {
            pathname = pathname.slice(this.#basename.length);
        }

        const tableau = pathname.split("/").filter((element) => {
            return element != "";
        });

        const route = tableau.length > 0 ? tableau[0] : "";
        const parametreDynamique = tableau[1];
        console.log(route);

        let Vue = this.#routes[route];

        if (Vue) {
            this.#vueActuelle = new Vue(this.#application, parametreDynamique);
        } else {
            this.#vueActuelle = new Page404View(this.#application);
        }

        this.#vueActuelle.render();
    }
}

export default Router;
