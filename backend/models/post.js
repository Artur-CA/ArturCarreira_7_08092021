'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  let Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  });

Post.associate = function (models) {
  Post.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE', 
  });
  Post.hasMany(models.Comment, {
    foreignKey: 'postId',
    as: 'comments', 
  }); 
}
  return Post;
};