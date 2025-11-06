class Application {
    #listesTravauxHTML;

    constructor() {
        this.#listesTravauxHTML = document.querySelector("[data-liste-travaux]");

        this.rechercherTravaux();
    }

    async rechercherTravaux() {
        const requete = await fetch(
            "https://donnees.montreal.ca/dataset/667342f7-f667-4c3c-9837-65e81312cd8d/resource/535c090c-2f74-4398-83ec-2771a6ce7174/download/informations-complementaires-entraves-travaux.json"
        );

        const reponse = await requete.json();

        this.#listesTravauxHTML.innerHTML = "";

        let gabarit = "<div class='p-5 grid grid-cols-3 gap-3'>";
        reponse.entries.forEach(function (entry) {
            gabarit += `
            <div class="p-5 bg-slate-800 text-white basis-1/3">
                <h3 class="text-slate-300 font-bold">${entry.dc_title}</h3>
            </div>`;
        });
        gabarit += "</div>";

        this.#listesTravauxHTML.insertAdjacentHTML("beforeend", gabarit);
    }
}

export default Application;
