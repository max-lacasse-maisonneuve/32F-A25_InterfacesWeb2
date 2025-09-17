# Exercice cours 05 - Générateur dégradé

## Tâches

Lors du design d'un site de ressources Web, vous avez la tâche de créer un générateur de dégradé en JavaScript qui doit être affiché dans une page HTML. Vous devez utiliser les classes et vos connaissance de l'héritage.

### Exigences

-   Le générateur de dégradé doit être affiché dans un élément HTML identifié par un attribut `data-generateur-degrade`.
-   Le générateur de dégradé doit être capable de créer un dégradé à partir de deux couleurs.
-   Le générateur de dégradé doit être encapsulé dans une classe.
-   Vous devez ensuite créer une sous-classe pour afficher un dégradé linéaire et une sous-classe pour afficher un dégradé radial.

## Étapes

1.  Analyser la page HTML
2.  Créer la classe GenerateurDegrade avec les propriétés nécessaires (elementHTML, couleur1, couleur2, type).
3.  Ajouter les méthodes pour créer et afficher le dégradé.
4.  Au changement des inputs de couleur, le dégradé doit se mettre à jour automatiquement en utilisant l'attribut `style` sur la div `data-degrade-apercu`.
5.  Créer les sous-classes pour les dégradés linéaires et radiaux et appelez le constructeur de la classe parent.

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
