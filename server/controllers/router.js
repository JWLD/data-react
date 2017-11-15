const Router = require('express').Router();

// controllers
const spotifyController = require('./spotify');

// SPOTIFY
Router.get('/login', spotifyController.login);
Router.get('/redirect', spotifyController.redirect);

module.exports = Router;
