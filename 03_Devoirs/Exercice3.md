# Exercice : Gestion de tâches avec JavaScript orienté objet

## Objectif

Dans cet exercice, vous allez adapter un frontend JavaScript orienté objet pour gérer une liste de tâches (ToDo).
Une partie du frontend (HTML/CSS/JS) et du backend (PHP) sont fournis, vous devez modifier les fichiers JavaScript afin d'intégrer la manipulation des données à l'aide des requêtes Fetch.

Vous n'avez pas à créer de nouvelles fonctions dans le JavaScript, mais à modifier les fonctions existantes pour qu'elles utilisent les requêtes Fetch avec `async/await` pour communiquer avec le backend PHP.

## Contexte

Vous disposez d’un site avec :

-   Une base de donnée avec une table taches en base de données (id, nom, etat)

-   Des fichiers PHP pour le CRUD :

    -   rechercherTout.php
    -   ajouter.php
    -   modifier.php
    -   supprimer.php

-   Une interface HTML et CSS pour l’affichage, incluant :
-   Un tableau pour la liste des tâches
-   Une boîte modale pour le formulaire d’ajout/modification fonctionnelle

## Consignes

1. Créez la base de données et, à l'aide du fichier SQL fourni, créez la table taches et insérez quelques données de test.
2. Modifiez le fichier de configuration `config.php` pour qu'il corresponde à votre environnement de base de données.
3. Dans le fichier `Application.js`, implémentez les fonctionnalités suivantes en utilisant des requêtes Fetch avec `async/await` :

    - Récupérer et afficher la liste des tâches depuis le serveur lors du chargement de la page.
    - Ajouter une nouvelle tâche en envoyant les données au serveur et en mettant à jour l'affichage. Le formulaire envoie les données de la tâche à ajouter à l'application.
    - Modifier une tâche existante en envoyant les données mises à jour au serveur et en mettant à jour l'affichage. Le formulaire envoie les données de la tâche à modifier à l'application.
    - Supprimer une tâche en envoyant la demande au serveur et en mettant à jour l'affichage.

4. En cas de succès des requêtes Fetch, affichez un message de succès en utilisant la classe `ToastSucces` fournie.
5. En cas d'erreur lors des requêtes Fetch, affichez un message d'erreur en utilisant la classe `ToastErreur` fournie.

## Remise

Vous devez remettre le dossier complet de l’exercice, incluant les fichiers PHP, CSS et HTML fournis, ainsi que vos fichiers JavaScript. Assurez-vous que tout fonctionne correctement avant de soumettre votre travail. NE MODIFIEZ PAS LES FICHIERS PHP, ni la structure des dossiers.

L'utilisation de frameworks ou bibliothèques externes (comme jQuery, React, etc.) n'est pas autorisée. Vous devez utiliser uniquement du JavaScript natif.

L'utilisation de la génération de code automatique (comme GitHub Copilot) est interdite. Vous devez écrire le code vous-même pour bien comprendre les concepts enseignés.

L'exercice compte pour 10% de la note finale du cours.
