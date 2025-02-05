# Exercice développement avancé R6A.05
## Objectif
Le but de ce projet est de modifier une application déjà existante et d'ajouter des fonctionnalités supplémentaires.

## Prérequis
Pour démarer le projet, il faut installer les dépendances suivantes:
- Node.js
- npm
- docker


## Installation
Pour installer les dépendances, il suffit de lancer la commande suivante:
```bash
npm i
```

Penser à créer un serveur MySQL avec docker:
```bash
docker run -d \
  --name hapi-mysql \
  --network my-network \
  -p 127.0.0.1:3306:3306 \
  -e MYSQL_ROOT_PASSWORD=hapi \
  -e MYSQL_DATABASE=user \
  --restart=no \
  -v MYSQL_R6A.05/var/lib/mysql \
  mysql:8.0 
```

## Lancer l'application
Pour lancer l'application, il suffit de lancer la commande suivante:
```bash
npm start
```
