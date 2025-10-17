<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="shortcut icon" href="assets/img/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
    <link rel="stylesheet" href="assets/css/styles.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin="" defer></script>
    <script type="module" src="assets/js/pages/index.js"></script>
    <title>Requêtes asynchrones</title>
</head>

<body>
    <header>
        <h1>Liste des piscines de Montréal</h1>
    </header>
    <main data-application>
        <form action="" data-formulaire>
            <div class="input-group">
                <label for="nom">Nom de la piscine</label>
                <input type="text" id="nom" name="nom" required maxlength="200" minlength="3" />
                <p class="message-erreur">Vous devez corriger le champ suivant</p>
            </div>
            <!-- <div class="input-group">
                <label for="nom">Nom de la piscine</label>
                <input type="number" id="nom" name="nom" required max="200" min="3" step="0.1" />
            </div>
            <div class="input-group">
                <label for="nom">Nom de la piscine</label>
                <input type="date" id="nom" name="nom" required min="2025-09-30" max="2025-10-15" />
            </div> -->

            <div class="input-group">
                <label for="type_piscine">Type de piscine</label>
                <select name="type_piscine" id="type_piscine" required>
                    <option value="">Sélectionner un type</option>
                    <option value="Piscine intérieure">Intérieure</option>
                    <option value="Piscine extérieure">Extérieure</option>
                    <option value="Jeu d'eau">Jeu d'eau</option>
                    <option value="Pataugeoire">Pataugeoire</option>
                </select>
                <p class="message-erreur">Vous devez corriger le champ suivant</p>
            </div>

            <div class="input-group">
                <label for="arrondissement">Arrondissement</label>
                <input type="text" id="arrondissement" name="arrondissement" required />
                <p class="message-erreur">Vous devez corriger le champ suivant</p>
            </div>

            <div class="input-group">
                <label for="adresse">Adresse</label>
                <input type="text" id="adresse" name="adresse" required />
                <p class="message-erreur">Vous devez corriger le champ suivant</p>
            </div>

            <div class="input-group">
                <label for="gestion">Gestion</label>
                <select name="gestion" id="gestion" required>
                    <option value="">Sélectionner</option>
                    <option value="Municipale">Municipale</option>
                    <option value="Privé">Privé</option>
                    <option value="OBNL">OBNL</option>
                    <option value="Parapublique">Parapublique</option>
                </select>
                <p class="message-erreur">Vous devez corriger le champ suivant</p>
            </div>

            <div class="input-group">
                <label for="equipement">Équipement</label>
                <input type="text" id="equipement" name="equipement" placeholder="Ex: Piscine récréative" required />
                <p class="message-erreur">Vous devez corriger le champ suivant</p>
            </div>

            <div class="input-group">
                <label for="longitude">Longitude</label>
                <input type="number" step="0.000001" id="longitude" name="longitude" required />
                <p class="message-erreur">Vous devez corriger le champ suivant</p>
            </div>

            <div class="input-group">
                <label for="latitude">Latitude</label>
                <input type="number" step="0.000001" id="latitude" name="latitude" required />
                <p class="message-erreur">Vous devez corriger le champ suivant</p>
            </div>

            <div class="input-group">
                <label for="image">Image</label>
                <input type="file" id="image" name="image" accept="image/*" data-image />
                <p class="message-erreur">Vous devez corriger le champ suivant</p>
            </div>

            <button type="submit">Ajouter la piscine</button>
            <button type="reset">Réinitialiser le formulaire</button>
        </form>

        <section class="grille" data-liste-piscine></section>
        <div class="pagination-container" data-pagination></div>
        <div>
            <button data-geolocalisation>Me géolocaliser</button>
        </div>
        <div id="map" style="height: 400px;width: 100%;"></div>
    </main>
</body>

</html>