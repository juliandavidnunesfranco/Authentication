const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {


  sequelize.define('password', {
    
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },    
    });
  };