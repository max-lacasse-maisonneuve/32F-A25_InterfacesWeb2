# Exercice cours 06 - Boites modales spécialisées

## Tâches

Vous devez créer des boîtes modales en JavaScript, en utilisant vos connaissances de la programmation orientée objet (POO) avec l'encapsulation, l'héritage et le polymorphisme.

Chaque boîte modale doit pouvoir s’afficher dans la page HTML, se fermer, et afficher un contenu dynamique.

### Exigences

-   La boîte modale est affichée dans un élément HTML avec l’attribut data-boite-modale.
-   Le contenu (titre, texte, boutons) doit pouvoir changer dynamiquement.

-   Une classe BoiteModale (classe parente) doit :

    -   Créer et afficher la boîte modale.
    -   Permettre de la fermer.
    -   Permettre de changer le contenu.
    -   Être centrée à l’écran avec un fond semi-transparent par-dessus le contenu de la page (via CSS).

-   Trois sous-classes spécialisées doivent être créées :

    -   BoiteInformation : titre en bleu + bouton OK
    -   BoiteSucces : titre en vert + bouton Fermer
    -   BoiteErreur : titre en rouge + bouton Fermer

-   Le style des boîtes doit être appliqué grâce aux attributs dataset et au CSS (pas de style en ligne).

## Étapes

1. Créer la classe BoiteModale avec ses propriétés (elementHTML, titre, contenu).
2. Faire le HTML et le CSS de base pour la boîte modale.
3. Ajouter les méthodes pour afficher, fermer et modifier le contenu de la boîte modale.
4. Créer la classe BoiteInformation (hérite de BoiteModale).
    - Spécificité : titre bleu, bouton OK.
5. Créer la classe BoiteSucces (hérite de BoiteModale).
    - Spécificité : titre vert, bouton Fermer.
6. Créer la classe BoiteErreur (hérite de BoiteModale).
    - Spécificité : titre rouge, bouton Fermer.

## Remise

L'exercice est à remettre avant le cours 07 sur Teams dans la section `devoirs`. Vous devez remettre un dossier ZIP contenant l'ensemble du projet.

La génération de code par intelligence artificielle est interdite pour cet exercice. Je me réserve le droit de vous rencontrer pour tout soupçon de plagiat. Si vous êtes bloqué, n'hésitez pas à consulter les notes de cours et ensuite à venir me voir si vous avez de la difficulté.

## Critères d'évaluation

L'exercice compte pour 5% de la note finale du cours.

-   L'énoncé est respecté et toutes les fonctionnalités sont implémentées

    -   Classe parente BoiteModale (affichage, fermeture).
    -   Classes enfants BoiteInformation, BoiteSucces, BoiteErreur (méthode afficher() redéfinie).
    -   Gestion des styles via dataset + CSS.

-   Les classes utilisent l'encapsulation : Les propriétés sont privées lorsque nécessaire, avec des accesseurs (getters) et mutateurs (setters) appropriés.
-   Les classes utilisent l'héritage et le polymorphisme pour réduire la duplication de code

-   Le code est bien organisé, clair, indenté, commenté, sans erreur dans la console.
-   Le projet est remis dans les délais et selon les exigences demandées

<!-- Ne pas tenir compte du bloc ci-dessous. Cela sert pour la mise en forme de la page en pdf -->
<style>
    html, body {
        font-family: 'Arial', sans-serif;
        color: #333;
        background-color: #f4f4f4;
    }

    h1 {
        color: color-mix(in oklab, cornflowerblue 70%, black 30%);
    }

    h2, h3, h4 {
        color: cornflowerblue;
    }

    a, a:visited {
        color: tomato;
    }
</style>
