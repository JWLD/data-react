const Router = require('express').Router();

// controllers
const authController = require('./auth');
const spotifyController = require('./spotify');

// AUTH
Router.get('/login', authController.login);
Router.get('/redirect', authController.redirect);

// SPOTIFY
Router.get('/artists', spotifyController.artists);

module.exports = Router;
