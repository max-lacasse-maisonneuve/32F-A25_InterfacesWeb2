import Carrousel from "../composants/Carrousel.js";
import Bouton from "../composants/Bouton.js";
import Toast from "../composants/Toast.js";
import ToastSucces from "../composants/ToastSucces.js";
import ToastErreur from "../composants/ToastErreur.js";
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
    const toast = new ToastErreur(mainHTML, "Message de toast", test);
}

function test() {
    console.log("La fonction a été déclenchée");
}
// Exécution
initialiser();
