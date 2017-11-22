const connPool = require('../db_connect');
const dbQueries = require('../db_queries');
const { parallel } = require('async');

const dbController = module.exports = {};

// POST DB-ARTISTS - ADD NEW ARTIST TO DB
dbController.addArtist = (req, res) => {
  dbQueries.addArtist(connPool, req.body, (err, result) => {
    if (err) return res.status(500).send(`Error adding artist to DB: ${err}`);

    return res.status(201).send('Artist added to DB');
  });
};

// POST DB-ALBUMS - ADD NEW ALBUM TO DB
dbController.addAlbum = (req, res) => {
	const addAlbumArtist = (callback) => {
		dbQueries.addAlbumArtist(connPool, req.body, (err, result) => {
			if (err) return callback(err);
			return callback(null, result);
		});
	};

	const addAlbum = (callback) => {
		dbQueries.addAlbum(connPool, req.body, (err, result) => {
			if (err) return callback(err);
			return callback(null, result);
		});
	};

	parallel([
		addAlbumArtist,
		addAlbum
	], (err, result) => {
		if (err) return res.status(500).send(`Error adding album to DB: ${err}`);

		return res.status(201).send('Album added to DB');
	});
};
