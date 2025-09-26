class Youtube {
    #id;
    #titre;
    #chaine;
    #conteneurHTML;

    constructor(conteneurHTML, id, titre, chaine) {
        this.#conteneurHTML = conteneurHTML;
        this.#id = id;
        this.#titre = titre;
        this.#chaine = chaine;

        this.#injecterHTML();
    }

    /**
     * Injecte le gabarit HTML de la vidéo YouTube dans le conteneur spécifié.
     */
    #injecterHTML() {
        const gabaritHTML = `
        <div class="video">
                    <div class="video__infos">
                        <h2 class="video__titre">${this.#titre}</h2>
                        <h3 class="video__chaine">${this.#chaine}</h3>
                    </div>
                    <div class="video__cadre">
                        <iframe
                            src="https://www.youtube.com/embed/${this.#id}"
                            class="video__iframe"
                            title="Lecteur vidéo YouTube"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>
        `;
        this.#conteneurHTML.insertAdjacentHTML("beforeend", gabaritHTML);
    }
}

export default Youtube;
