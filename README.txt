Prérequis pour lancer le projet sans docker:
	- maven (mvn) en ligne de commande (version >=3.8.3)
	- serveur de base de données relationnelles comme PHPMyAdmin (installer avec WampServer par exemple) avec :
		- base de données sur 			: 	localhost:3306
		- identifiant de la base de données 	: 	root
		- mot de passe de la base de données 	: 	root

Prérequis pour lancer le projet avec docker:
	- docker
	- docker-compose

Lancer le projet (sans docker): 

1) lancer la base de données PHPMyAdmin

2) Créer une base de données vierge nommée "alphapair" et y importer le fichier "alphapair.sql" qui se trouve dans /alphapair

3) Récupérer le projet sur Github à l'aide de la commande :
	- git clone https://github.com/Matheo-bis/alphapair.git

4) Sans src/main/frontend/src/services/Protocol.js et src/main/java/fr/uha/ensisa/alphapair/security/CookieManager.java, remplacer "localhost" par le nom de domaine (ou addresse IP le cas échéant) sur laquelle l'application sera déployée.

5) Dans le répertoire /alphapair (là où se trouve le fichier pom.xml), lancer les commandes suivantes :
		- mvn clean install (cette commande peut prendre environ 5 minutes, elle installe tous les modules React nécessaires)
	puis
		- mvn spring-boot:run

6) L'application est disponible sur le port 8080 du nom de domaine indiqué à l'étape 4.

Lancer le projet (avec docker):

1) Dans docker/dockerfile-app, fixer la variable DOMAIN sur le nom de domaine (ou addresse IP le cas échéant) sur laquelle l'application sera déployée.

2) Dans le répertoire /docker, lancer les commandes suivantes :
		- docker-compose build
	puis
		- docker-compose up -d

3) L'application est disponible sur le port 8080 du nom de domaine indiqué à l'étape 1.