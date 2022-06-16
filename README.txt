Prérequis pour lancer le projet :
	- maven (mvn) en ligne de commande (version >=3.8.3)
	- serveur de base de données relationnelles comme PHPMyAdmin (installer avec WampServer par exemple) avec :
		- base de données sur 			: 	localhost:3306
		- identifiant de la base de données 	: 	root
		- mot de passe de la base de données 	: 	root

Lancer le projet : 

1) lancer la base de données PHPMyAdmin

2) Créer une base de données vierge nommée "alphapair" et y importer le fichier "alphapair.sql" qui se trouve dans /alphapair

3) Récupérer le projet sur Github à l'aide de la commande :
	- git clone https://github.com/alphapair/alphapair.git

4) Dans le répertoire /alphapair (là où se trouve le fichier pom.xml), lancer les commandes suivantes :
		- mvn clean install (cette commande peut prendre environ 5 minutes, elle installe tous les modules React nécessaires)
	puis
		- mvn spring-boot:run

5) L'application est disponible sur localhost:8080.

Note : 	il est également possible, après avoir installé nodejs en ligne de commande, de lancer l'application React du frontend sur localhost:3000,
	en exécutant, dans alphapair/src/main/frontend/, la commande "npm start".
	
	Les modifications alors apportées aux composants React du dossier frontend/ seront ainsi visibles en temps réel sur :3000,
	mais pas sur le :8080, qu'il faudra alors relancer entièrement pour voir les modifications.
	