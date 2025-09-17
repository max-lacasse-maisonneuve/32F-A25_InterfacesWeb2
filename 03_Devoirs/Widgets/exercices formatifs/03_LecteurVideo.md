# Exercice cours 03 - Liste vidéo

## Tâches

Lors du design d'un site de ressources Web, vous avez la tâche de créer une liste de visionnement Youtube en utilisant Javascript.

Normalement, nous utiliserons les données depuis un tableau d’objets dans le fichier youTubeVideos.js (dossier data).

L’exercice consiste à injecter un composant affichant le titre, la chaîne et la vidéo [via l’API Share > Embed de YouTube](https://developers.google.com/youtube/player_parameters?hl=fr#Manual_IFrame_Embeds) à partir de ce tableau en utilisant la programmation orientée objet.

Le code HTML à injecter est en commentaire sur la page HTML pour vous aider. Vous n'avez qu'à remplacer les éléments.

### Exigences

-   Pour chaque objet du tableau youTubeVideos, vous devez faire l’instance de la classe **YouTubeVideo** qui s’acquitte de la création du composant Web puis son injection à l’intérieur du parent identifié par l’attribut **data-youtube-videos**.
-   Vous devez utiliser les classes pour cet exercice.

## Étapes

1.  Analyser la page HTML
2.  Analyser le fichier tableauVideosYoutube.js
3.  Créer une classe de YouTubeVideo comprenant un constructeur avec les propriétés (infos de la video et le conteneur parent) et une méthode pour injecter le code HTML.
4.  Pour chaque élément du tableau youTubeVideos, instancier la classe dans le fichier principal et injecter le code HTML dans la page Web.
5.  Commentez votre code.

## Remise

Cet exercice n'est pas à remettre

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
