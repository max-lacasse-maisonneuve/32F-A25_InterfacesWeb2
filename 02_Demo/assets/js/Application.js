import Accueil from "./views/Accueil.js";
import Donnees from "./views/Donnees.js";

class Application {
    #listesTravauxHTML;
    #conteneurHTML;
    #vueActuelle;

    constructor() {
        this.#conteneurHTML = document.querySelector("[data-application]");
    }

    get conteneurHTML() {
        return this.#conteneurHTML;
    }
}

export default Application;
