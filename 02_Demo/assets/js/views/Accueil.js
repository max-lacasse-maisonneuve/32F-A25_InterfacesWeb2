import dompurify from "dompurify";

class Accueil {
    #application;
    #listesTravauxHTML;

    constructor(application) {
        this.#application = application;
        this.render();
    }

    render() {
        this.#application.conteneurHTML.innerHTML = ` 
          <div class="container flex flex-col justify-center items-center min-h-screen mx-auto bg-slate-100">
            <h1 class="text-2xl text-orange-800 font-bold">Cônes oranges</h1>
            <h2 class="text-base">L'application de suivis des travaux de <span class="text-orange-500 font-light">Montréal</span></h2>
            <div data-liste-travaux></div>
        </div>
        `;
        this.#listesTravauxHTML = this.#application.conteneurHTML.querySelector("[data-liste-travaux]");

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
            <div class="p-5 bg-slate-800 text-white basis-1/3" >
                <h3 class="text-slate-300 font-bold"><i class="fa-solid fa-trowel mr-4 text-orange-500"></i>${entry.dc_title}</h3>
            </div>`;
        });
        gabarit += "</div>";

        const gabaritPropre = dompurify.sanitize(gabarit);

        this.#listesTravauxHTML.insertAdjacentHTML("beforeend", gabaritPropre);
    }
}

export default Accueil;
