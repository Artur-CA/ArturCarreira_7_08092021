const { Comment } = require('../models/index');

// Création d'un commentaire
exports.createComment = (req, res, next) => {
    const comment = {
        userId: req.decodedToken.userId,
        postId: req.body.postId,
        content: req.body.content
    };
    Comment.create(comment)
        .then(() => res.status(201).json({ message: "Commentaire envoyé !" }))
        .catch(error => res.status(400).json({ error }));
};

// Récupération de tous les commentaires
exports.getAllComments = (req, res, next) => {
    Comment.findAll({
        where: { postId: req.params.id },
    })
        .then((comments) => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error }));
};

// Récupération d'un commentaire
exports.getOneComment = (req, res, next) => {
    Comment.findOne({
        where: { postId: req.params.id },
    })
        .then((comment) => res.status(200).json(comment))
        .catch(error => res.status(400).json({ error }));
};

// Suppression d'un commentaire
exports.deleteComment = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.id } }) // On trouve l'objet dans la DB
        .then((comment) => {
            Comment.destroy({ where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};