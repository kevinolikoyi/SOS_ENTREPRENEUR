# Fichier des candidatures retenues

Placez ici l'un de ces fichiers quand la présélection est prête :

- `candidatures-retenues.xlsx`
- `candidatures-retenues.xls`
- `candidatures-retenues.csv`
- `candidatures-retenues.json`

Le site détecte automatiquement le fichier. Dès qu'il existe et qu'il n'est
pas vide, la page `/candidatures-cloturees` remplace le message d'attente par
un formulaire de vérification.

Colonnes conseillées :

- `email`
- `telephone`
- `statut`

Si le fichier contient uniquement les 100 candidats retenus, la colonne
`statut` n'est pas obligatoire. Si elle existe, utilisez une valeur comme
`retenu`, `selectionne`, `oui` ou `1` pour les candidats retenus.
