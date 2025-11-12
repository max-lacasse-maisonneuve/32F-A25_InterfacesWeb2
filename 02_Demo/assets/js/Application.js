import Accueil from "./views/Accueil.js";
import Donnees from "./views/Donnees.js";
import Page404 from "./views/Page404.js";
import page from "page";
import Three from "./views/Three.js";

class Application {
    #listesTravauxHTML;
    #conteneurHTML;
    #vueActuelle;

    constructor() {
        this.#conteneurHTML = document.querySelector("[data-application]");

        page(
            "/",
            function () {
                this.#vueActuelle = new Accueil(this);
            }.bind(this)
        );
        // page(
        //     "/pizzas/:id",
        //     function (contexte) {
        //         console.log(contexte.params.id);

        //         this.#vueActuelle = new Accueil(this);
        //     }.bind(this)
        // );

        page(
            "/sources",
            function () {
                this.#vueActuelle = new Donnees(this);
            }.bind(this)
        );
        page(
            "/three",
            function () {
                this.#vueActuelle = new Three(this);
            }.bind(this)
        );

        page(
            "/*",
            function () {
                this.#vueActuelle = new Page404(this);
            }.bind(this)
        );

        page();
    }

    get conteneurHTML() {
        return this.#conteneurHTML;
    }
}

export default Application;
