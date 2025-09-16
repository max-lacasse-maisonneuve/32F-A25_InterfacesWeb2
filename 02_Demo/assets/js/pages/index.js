import Carrousel from "../composants/Carrousel.js";
import Bouton from "../composants/Bouton.js";
console.log(this);

// Variables globales

// Sélections HTML
const mainHTML = document.querySelector("main");
// mainHTML.addEventListener("click", function () {
//   console.log(this);
// });
// Fonctions
function initialiser() {
  const carrousel = new Carrousel(mainHTML, [
    "Photo1.webp",
    "Photo2.webp",
    "Photo3.webp",
    "Photo4.webp",
  ]);
  new Bouton(mainHTML, "Allo");
  new Bouton(mainHTML, "Cliquez-moi");
}
// Exécution
initialiser();
