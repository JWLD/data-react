const Router = require('express').Router();

// controllers
const authController = require('./auth');
const spotifyController = require('./spotify');
const dbController = require('./database');

// AUTH
Router.get('/login', authController.login);
Router.get('/redirect', authController.redirect);

// SPOTIFY
Router.get('/artists', spotifyController.artists);

// DATABASE
Router.post('/db-artists', dbController.checkForArtist, dbController.addArtist);

module.exports = Router;
