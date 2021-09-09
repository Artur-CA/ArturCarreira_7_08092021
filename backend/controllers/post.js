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

// Suppression d'un post
exports.deletePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id }}) // On trouve l'objet dans la DB
        .then((post) => {
            Post.destroy({ where: { id: req.params.id } })
                .then(() => res.status(200).json({ post: 'Post supprimé' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Récupération d'un post
exports.getOnePost = (req, res, next) => {
    db.Posts.findByPk(req.params.id,
        {
            include: [
                {
                    model: db.Users,
                    attributes: ['username']
                },
                {
                    model: db.Comments,
                    attributes: ['content'],
                    include: { model: db.Users, attributes: ['username'] }
                },
            ]
        }
    )
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
};

// Récupération de tous les posts
exports.getAllPosts = (req, res, next) => {     
    Post.findAll({
        include: ["user", "comments"]
    }
    )
        .then((posts) => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};