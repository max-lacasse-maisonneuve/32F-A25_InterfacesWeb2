import moment from "moment";
import "moment/locale/fr";
import Chart from "chart.js/auto";
moment.locale("fr");

class Donnees {
    #application;

    constructor(application) {
        this.#application = application;
        this.render();
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
                <p>Données récupérées le ${moment().format("dddd, DD-MM-YYYY")}</p>
                <h3 class="mt-5">
                    <a href="https://www.donneesquebec.ca/recherche/dataset/vmtl-info-travaux" target="_blank" rel="noopener noreferrer" class="font-underline" >Lien vers le portail Données Montréal</a>
                </h3>
                <div>
                    Vous pouvez consulter et télécharger les données des travaux en cours à Montréal en visitant le portail Données Montréal à l'adresse suivante :
                </div>
                <div class="mt-4">VILLE DE MONTRÉAL. Entraves et travaux en cours (anciennement Info-travaux), dans Données Québec, 2013, mis à jour le
                ${moment("2025-11-10")
                    .add(7, "days")
                    .format("YYYY-MM-DD")}. [https://www.donneesquebec.ca/recherche/dataset/vmtl-info-travaux], (consulté le ). </div>
            </section>
            <div><canvas id="graphique"></canvas></div>
            <form><input type="date" min="${moment().subtract(7, "days").format("YYYY-MM-DD")}" max="${moment()
            .add(7, "days")
            .format("YYYY-MM-DD")}"></form>
            
        `;
        const data = {
            datasets: [
                {
                    label: "My First Dataset",
                    data: [65, 59, 80, 81, 56, 55, 40],
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                        "rgba(255, 205, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(201, 203, 207, 0.2)",
                    ],
                    borderColor: [
                        "rgb(255, 99, 132)",
                        "rgb(255, 159, 64)",
                        "rgb(255, 205, 86)",
                        "rgb(75, 192, 192)",
                        "rgb(54, 162, 235)",
                        "rgb(153, 102, 255)",
                        "rgb(201, 203, 207)",
                    ],
                    borderWidth: 1,
                },
            ],
        };
        const chart = new Chart(document.querySelector("#graphique"), {
            type: "line",
            data: data,
        });
    }
}
export default Donnees;
