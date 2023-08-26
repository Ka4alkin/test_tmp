const {DataTypes} = require('sequelize');
const sequelize = require('../database');

const Movie = sequelize.define('Movie', {
  title: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  releaseYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  format: {
    type: new DataTypes.ENUM('VHS', 'DVD', 'Blu-ray'),
    allowNull: false,
  },
});


module.exports = Movie;
