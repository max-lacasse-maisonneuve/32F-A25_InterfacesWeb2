# Exercice cours 04 - Minuterie

## Tâches

Lors du design d'un site de ressources Web, vous avez la tâche de créer une minuterie en JavaScript qui doit être affichée dans une page HTML. Vous devez utiliser les classes et vos connaissance de l'encapsulation.

### Exigences

-   La minuterie doit être affichée dans un élément HTML identifié par un attribut `data-minuterie`.
-   La minuterie doit être capable de démarrer, arrêter et réinitialiser.
-   La minuterie doit être encapsulée dans une classe.
-   Pour régler la durée de la minuterie, on doit utiliser un mutateur (setter) lors de la création de l'instance de la classe.
-   Lorsque la minuterie est terminée, elle doit afficher un message dans l'élément HTML et arrêter le compte à rebours.

## Étapes

1.  Analyser la page HTML
2.  Créer la classe Minuterie avec les propriétés nécessaires (conteurParent, durée, élément HTML, intervalle, temps restant).
3.  Ajouter les méthodes pour démarrer, arrêter et réinitialiser la minuterie.
4.  Mettre les propriétés en privé et créer les accesseurs (getters) et mutateurs (setters) nécessaires.

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
