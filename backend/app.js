const express = require('express'); 
const bodyParser = require('body-parser'); 
const helmet = require('helmet');

const path = require('path'); // Donne acçès au chemin du système de fichiers

// Import des routeurs
const userRoutes = require("./routes/user"); // Import de la route user
const postRoutes = require("./routes/post"); // Import de la route post
const commentRoutes = require("./routes/comment"); // Import de la route commentaire

const app = express(); // Création application Express

// Middleware général appliqué à toutes les requêtes envoyées au serveur
// afin d'éviter les erreurs CORS  (système de sécurité qui bloque les requêtes malveillantes)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

// Acçès aux routes
app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes); 
app.use('/api/comments', commentRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

// Export application Express
module.exports = app;