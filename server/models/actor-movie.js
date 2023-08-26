const sequelize = require('../database');
const Actor = require('./actor');
const Movie = require('./movie');


const MovieActor = sequelize.define('MovieActor', {}, {timestamps: false});
Actor.belongsToMany(Movie, {through: MovieActor});
Movie.belongsToMany(Actor, {through: MovieActor});

module.exports = MovieActor;
