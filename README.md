*** Présentation ***

Créer un réseau social d'entreprise

Le client souhaite que ses employés écrivent et/ou partagent des articles avec leurs collègues sur des sujets qui les intéressent.

*** Technologies utilisées ***

▹ HTML
▹ CSS
▹ JavaScript
▹ Vue.js
▹ Node.js
▹ Express.js
▹ MySQL
▹ SQL

*** Prérequis ***

Vous devrez avoir Vue CLI, Node et MySQL installés localement sur votre machine.

*** Installation ***

Backend :
▹ Clonez ce repository ;
▹ A partir du dossier backend, exécutez npm install puis nodemon server ;
▹ Le serveur doit fonctionner sur localhost avec le port par défaut 3000 ;

Base de données :
▹ Exécutez sequelize model:create pour créer les tables;
▹ Exécutez sequelize db:migrate pour intégrer les modèles créés dans la base de données ;

Frontend :
▹ A partir du dossier frontend, exécutez npm install puis npm run serve ;
▹ Le frontend de l'application doit fonctionner sur localhost avec le port par défaut 8080.


*** Droits Administrateur ***
Via mySQL, taper la commande suivante => UPDATE users SET isAdmin = 1 WHERE id = X ; X = identifiant du salarié concerné