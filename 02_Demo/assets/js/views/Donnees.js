class Donnees {
    #application;

    constructor(application) {
        this.#application = application;
    }

    render() {
        this.#application.conteneurHTML.innerHTML = `
            <section class="p-5 container mx-auto bg-slate-100 min-h-screen">
                <h2 class="text-xl font-bold mb-3">Données des travaux en cours à Montréal</h2>
                <h3>Sources des données</h3>
                <div>
                    Les données des travaux en cours à Montréal sont accessibles publiquement via le portail Données Montréal.
                    Elles sont mises à jour régulièrement par la Ville de Montréal pour refléter les entraves et travaux en cours sur le territoire montréalais.
                </div>
                <h3 class="mt-5">
                    <a href="https://www.donneesquebec.ca/recherche/dataset/vmtl-info-travaux" target="_blank" rel="noopener noreferrer" class="font-underline" >Lien vers le portail Données Montréal</a>
                </h3>
                <div>
                    Vous pouvez consulter et télécharger les données des travaux en cours à Montréal en visitant le portail Données Montréal à l'adresse suivante :
                </div>
                <div class="mt-4">VILLE DE MONTRÉAL. Entraves et travaux en cours (anciennement Info-travaux), dans Données Québec, 2013, mis à jour le 10 novembre 2025. [https://www.donneesquebec.ca/recherche/dataset/vmtl-info-travaux], (consulté le ). </div>
            </section>
        `;
    }
}
export default Donnees;
