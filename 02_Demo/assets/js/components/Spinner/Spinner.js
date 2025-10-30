class Spinner extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        // Créer la structure du spinner
        this.render();
    }
    onClick() {
        alert("Composant cliqué!");
        this.setAttribute("name", "Utilisateur Cliqué");
    }
    connectedCallback() {
        // Appelé quand l'élément est ajouté au DOM
        // Idéal pour ajouter du contenu ou des événements
        this.addEventListener("click", this.onClick.bind(this));
    }

    disconnectedCallback() {
        // Appelé quand l'élément est retiré du DOM
        // Nettoyer les événements, timers, etc.
        this.removeEventListener("click", this.onClick.bind(this));
    }
    static get observedAttributes() {
        return ["name"]; // Attributs à surveiller
    }
    attributeChangedCallback(name, oldValue, newValue) {
        // Appelé quand un attribut observé change
        this.render();
    }

    // Méthodes pour contrôler le spinner
    show() {
        this.removeAttribute("hidden");
    }

    hide() {
        this.setAttribute("hidden", "");
    }
    render() {
        const name = this.getAttribute("name") || "Invité";
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./assets/js/components/Spinner/spinner.css">
            
            <div class="spinner-overlay">
                <div class="spinner-container">
                    <div class="spinner"></div>
                    <div class="message">
                        <slot>Chargement en cours...${name}</slot>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define("loading-spinner", Spinner);

export default Spinner;
