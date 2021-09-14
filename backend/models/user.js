'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    jobtitle: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
  });
  User.associate = function (models) {
    User.hasMany(models.Post,{
      foreignKey: 'userId',
      as: 'posts',
    }); 
  };
  
  
  return User;
};