<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Gestion des tâches</title>
    <link rel="stylesheet" href="assets/css/styles.css">
    <script type="module" src="assets/js/pages/index.js"></script>
</head>

<body data-application>

    <header>
        <h1>Liste des tâches</h1>
        <button id="ajouterBtn" data-tache-btn data-action="ajouter">+ Ajouter une tâche</button>
    </header>

    <main>
        <table id="table-todo">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>État</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody data-conteneur-taches>
                <!-- Lignes ajoutées dynamiquement -->
            </tbody>
        </table>
    </main>

    <!-- Boîte modale et le formulaire -->
    <div id="modal" class="modal invisible">
        <div class="modal-content">
            <span id="fermerModal" class="fermer">&times;</span>
            <h2 id="modalTitre">Ajouter une tâche</h2>
            <form id="formTodo">
                <input type="hidden" id="todoId" name="todoId">
                <div class="form-groupe">
                    <label for="todoNom">Nom</label>
                    <input type="text" id="todoNom" name="todoNom" required>
                </div>
                <div class="form-groupe">
                    <label for="todoEtat">État</label>
                    <select id="todoEtat" name="todoEtat">
                        <option value="non terminée">À faire</option>
                        <option value="terminée">Terminée</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="submit" data-form-action="envoyer">Enregistrer</button>
                    <button type="button" id="annulerBtn" data-form-action="annuler">Annuler</button>
                </div>
            </form>
        </div>
    </div>
</body>

</html>