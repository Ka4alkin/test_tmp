const sequelize = require('../database');
const Actor = require('./actor-model');
const Movie = require('./movies-model');


const MovieActor = sequelize.define('MovieActor', {}, {timestamps: false});
Actor.belongsToMany(Movie, {through: MovieActor});
Movie.belongsToMany(Actor, {through: MovieActor});

module.exports = MovieActor;
