const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/index');
const crypto = require('crypto-js');


// Regex
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{4,8}$/;

// Fonction register, création nouvel utilisateur
exports.register = (req, res, next) => {    
  if (req.body.email == null || req.body.email == '' || req.body.password == null || req.body.password == '' || req.body.username == null || req.body.username == '') {
      return res.status(400).json({ 'error': 'Données manquantes !' });
  }

  if (req.body.username.length <= 2 || req.body.username.length >= 16) {
    return res.status(400).json({ error: 'Le pseudo doit contenir 3 à 15 caractères' });
  }

  if (!EMAIL_REGEX.test(req.body.email)) {
    return res.status(400).json({ 'error': 'Email invalide !' });
  }

  if (!PASSWORD_REGEX.test(req.body.password)) {
    return res.status(400).json({ 'error': 'Le mot de passe doit contenir 4 à 8 caractères dont au moins une majuscule, une minuscule, un chiffre et un symbole' });
  }

  User.findOne({
      attributes: ['email'],
      where: { email: req.body.email }
  }) // Vérification si utilisateur correspond déjà à l'email de la DB

      .then((userFound) => {
          if (!userFound) {
          bcrypt.hash(req.body.password, 10) 
          .then(hash => { 
                       
              const newUser = User.create ({
                  email: crypto.HmacSHA512(req.body.email, 'RANDOM_KEY_SECRET').toString(), // Cryptage de l'email 
                  password : hash,
                  username : req.body.username,
                  jobtitle : req.body.jobtitle,
                  isAdmin : req.body.isAdmin,
              })
                  .then((user) => {
                      res.status(201).json({ message: 'Utilisateur créé !' })
                  });
          })
              .catch(error => res.status(400).json({ error }));

         } else {
           return res.status(409).json({ 'error': 'Utilisateur déjà existant !' });
         }
    })
}


// Fonction login
exports.login = (req, res, next) => {
    if (req.body.email == null || req.body.email == '' || req.body.password == null || req.body.password == '') {
        return res.status(400).json({ 'error': 'Données manquantes !' });
    }

    User.findOne({
        where: { email: crypto.HmacSHA512(req.body.email, 'RANDOM_KEY_SECRET').toString() } // Recherche l'utilisateur dans la DB qui correspond à l'email de la requête
    })

        .then((userFound) => {
            if (userFound) { 
            
            bcrypt.compare(req.body.password, userFound.password, function(errBycrypt, resBycrypt) {
                if(resBycrypt) {
                    return res.status(200).json({ // Si comparaison ok, renvoie un objet JSON
                        userId: userFound.id,
                        isAdmin: userFound.isAdmin,
                        token: jwt.sign( 
                            { userId: userFound.id }, 
                            'RANDOM_TOKEN_SECRET', 
                            { expiresIn: '24h' }
                        ),
                    });
                } else {
                    return res.status(403).json({ 'error' : 'Mot de passe incorrect !' });
                }
            });

            } else {
                return res.status(404).json({ 'error': 'Utilisateur inconnu !' });
            }
        });
}


// Récupération d'un compte
exports.getOneAccount = (req, res, next) => {
    User.findOne({ where: { id: req.params.id }})
        .then((user) => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
};


// Suppression d'un compte
exports.deleteAccount = (req, res, next) => {
    User.findOne({ where: { id: req.params.id }})  
        .then((user) => {
          User.destroy({ where: { id: req.params.id }})
            .then(() => res.status(200).json({ message: 'Compte supprimé' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch (error => res.status(500).json({ error }));
};

// Modification d'un compte
exports.modifyAccount = (req, res, next) => {
    User.findOne({ where: { id: req.params.id }})  
        .then((user) => {
          User.updateOne({ where: { id: req.params.id }})
            .then(() => res.status(200).json({ message: 'Compte modifié' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch (error => res.status(500).json({ error }));
};