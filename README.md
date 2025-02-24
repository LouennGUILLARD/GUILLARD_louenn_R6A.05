# 🎬 Exercice développement avancé R6A.05

## 🎯 Objectif
Le but de ce projet est de modifier une application déjà existante et d'ajouter des fonctionnalités supplémentaires.

## 📋 Prérequis
Pour démarrer le projet, il faut installer les dépendances suivantes :
- Node.js
- npm
- Docker

## ⚙️ Installation
Pour installer les dépendances, il suffit de lancer la commande suivante :
```bash
npm i
```

### 🐳 Créer un serveur MySQL avec Docker
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

## 🚀 Lancer l'application
Pour lancer l'application, il suffit de lancer la commande suivante :
```bash
npm start
```

## 📧 Configuration des variables d'environnement
Créez un fichier `.env` à la racine du projet avec le contenu suivant :
```
MAIL_HOST=smtp.ethereal.email
MAIL_PORT=587
MAIL_USER=your_ethereal_user
MAIL_PASS=your_ethereal_pass
MAIL_FROM=no-reply@yourdomain.com
```

## 📚 Fonctionnalités
- Envoyer un mail de bienvenue lorsqu'un utilisateur est créé
- Créer une bibliothèque de films
- Notifications par mail lors de l'ajout ou de la modification d'un film
- Gestion des permissions pour les utilisateurs admin et user
- Export CSV des films via un message broker


## 📄 Documentation
Pour pouvoir tester les différentes routes de l'application vous pouvez allez sur le swagger du projet : 
http://localhost:3000/documentation
