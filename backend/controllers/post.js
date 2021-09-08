const { Post } = require('../models/index');

// Création d'un post
exports.createPost = (req, res, next) => {
    const post = {
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content
    }; 
    Post.create(post)
        .then(() => res.status(201).json({ post: "Post envoyé!" }))
        .catch(error => res.status(400).json({ error }));
};