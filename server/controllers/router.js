const Router = require('express').Router();

// middleware
const checkToken = require('../middleware/check_token');

// controllers
const authController = require('./auth');
const spotifyController = require('./spotify');
const dbController = require('./database');

// AUTH
Router.get('/login', authController.login);
Router.get('/redirect', authController.redirect);

// SPOTIFY
Router.get('/artists', checkToken, spotifyController.artists);
Router.get('/albums', checkToken, spotifyController.albums);
Router.get('/album-date', checkToken, spotifyController.albumDate);

// DATABASE
Router.post('/db-artists', dbController.checkForArtist, dbController.addArtist);
Router.post('/db-albums', dbController.addAlbum);

module.exports = Router;
