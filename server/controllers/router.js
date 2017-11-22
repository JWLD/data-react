const Router = require('express').Router();

// middleware
const spotifyAuth = require('../middleware/spotifyAuth');
const getAlbumIds = require('../middleware/getAlbumIds');
const checkExists = require('../middleware/checkExists');

// controllers
const authController = require('./auth');
const spotifyController = require('./spotify');
const dbController = require('./database');

// AUTH
Router.get('/login', authController.login);
Router.get('/redirect', authController.redirect);

// SPOTIFY
Router.get('/artists', spotifyAuth, spotifyController.artists);
Router.get('/albums', spotifyAuth, getAlbumIds, spotifyController.albums);
Router.get('/album-date', spotifyAuth, spotifyController.albumDate);

// DATABASE
Router.post('/db-artists', checkExists.artist, dbController.addArtist);
Router.post('/db-albums', dbController.addAlbum);

module.exports = Router;
