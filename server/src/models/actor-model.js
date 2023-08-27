const {DataTypes} = require('sequelize');
const sequelize = require('../database');

const ActorModel = sequelize.define('Actor', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  indexes: [
    {
      unique: true,
      fields: ['name', 'surname'],
    },
  ],
});


module.exports = ActorModel;
