<!DOCTYPE html>
<html lang="fr">

<head>
    <base href="/paysagement/" />
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="module" src="assets/js/index.js"></script>
    <link rel="stylesheet" href="assets/css/styles.css">
    <title>Paysagement</title>
</head>

<body>
    <mon-spinner msg="allo"></mon-spinner>
    <header>
        <h1>Paysagement</h1>
        <nav>
            <a href="/" data-link>Accueil</a>
            <a href="/admin" data-link data-admin>Admin</a>

            <form id="connexion">
                <div class="input-group">
                    <label for="nom">Nom d'utilisateur</label>
                    <input type="text" maxlength="200" name="nom" id="nom" required>
                </div>
                <div class="input-group">
                    <label for="mdp">Mot de passe</label>
                    <input type="password" id="mdp" name="mdp" maxlength="200" required>
                </div>
                <div class="input-groupe">
                    <input type="submit" value="Connexion">
                </div>
            </form>
            <div class="input-groupe" data-deconnexion>
                <button>Déconnexion</button>
            </div>
        </nav>
    </header>
    <main data-application></main>
    <footer>Tous droits réservés</footer>
</body>

</html>