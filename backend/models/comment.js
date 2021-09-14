'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  let Comment = sequelize.define('Comment', {
    content: DataTypes.TEXT,
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  });
  
  Comment.associate = function (models) {
    Comment.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    Comment.belongsTo(models.Post, {
      foreignKey: 'postId',
      onDelete: 'CASCADE', 
    });
  }
  return Comment;
};