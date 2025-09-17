import Carrousel from "../composants/Carrousel.js";
import Bouton from "../composants/Bouton.js";
import Toast from "../composants/Toast.js";
import Youtube from "../composants/Youtube.js";
import tableauVideosYouTube from "../data/tableauVideosYoutube.js";

// Variables globales

// Sélections HTML
const mainHTML = document.querySelector("main");
const conteneurYoutube = document.querySelector("[data-videos-youtube]");

// mainHTML.addEventListener("click", function () {
//   console.log(this);
// });
// Fonctions
function initialiser() {
    // const carrousel = new Carrousel(mainHTML, ["Photo1.webp", "Photo2.webp", "Photo3.webp", "Photo4.webp"]);
    // new Bouton(mainHTML, "Allo");
    // new Bouton(mainHTML, "Cliquez-moi");
    // new Toast(mainHTML, "Message de toast");
    // new Youtube(
    //     conteneurYoutube,
    //     "-22uczx3Tb4",
    //     "Tutoriel JavaScript : Programmation orientée Objet en Javascript",
    //     "Grafikart.fr"
    // );

    tableauVideosYouTube.forEach(function (elementVideo) {
        const video = new Youtube(conteneurYoutube, elementVideo.id, elementVideo.titre, elementVideo.chaineYouTube);
        console.log(video);
    });
}
// Exécution
initialiser();
