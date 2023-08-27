const {DataTypes} = require('sequelize');
const sequelize = require('../database');

const MoviesModel = sequelize.define('Movie', {
  title: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  format: {
    type: new DataTypes.ENUM('VHS', 'DVD', 'Blu-ray'),
    allowNull: false,
  },
});


module.exports = MoviesModel;
