# Mise à jour

Le plugin système qui montre ta version de NeoDex, cherche les nouvelles versions et les installe en un clic, et liste les plugins qui ont une mise à jour en attente.

*English version: [README.en.md](README.en.md)*

## Ce qu'il affiche

- **NeoDex** et son numéro de version, avec l'état de la mise à jour juste en dessous.
- **Version** : le numéro exact.
- **Moteur** : la version d'Electron sur laquelle NeoDex tourne.
- **Installation** : « installée » (mises à jour automatiques) ou « copie de développement » (lancée depuis le code, sans mise à jour automatique).

## Mettre NeoDex à jour

NeoDex vérifie tout seul au lancement. Dans le plugin :

- **Vérifier les mises à jour** relance la recherche tout de suite ; « NeoDex est à jour » s'affiche avec la version, sinon la nouvelle version est annoncée.
- **Télécharger et redémarrer** récupère la nouvelle version, avec une barre de progression, puis redémarre NeoDex pour l'installer. NeoDex vérifie la signature du fichier avant de l'installer.
- En cas d'échec (réseau coupé par exemple), le message d'erreur s'affiche avec **Réessayer**.
- **Notes de version** ouvre la liste des versions publiées et de leurs nouveautés.

## Les plugins

Sous la partie NeoDex, le plugin compare tes plugins installés au catalogue du NeoStore et liste ceux qui ont une nouvelle version (« Nom · 1.2.0 → 1.3.0 »). **Ouvrir NeoStore** permet de les mettre à jour. Si le catalogue ne répond pas, il l'indique.

## Données et synchronisation

Rien n'est synchronisé : le plugin ne garde aucune donnée.

## Installer

Plugin système : il est livré avec NeoDex, ne peut pas être désinstallé et ne s'ouvre que s'il est signé par NeoDex.

Développer un plugin : voir le [SDK NeoDex](https://github.com/NDesumeur/neodex-sdk).
