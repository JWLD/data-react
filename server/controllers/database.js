const connPool = require('../db_connect');
const dbQueries = require('../db_queries');
const parallel = require('../helpers/parallel');

const dbController = module.exports = {};

// MIDDLEWARE - CHECK IF ARTIST EXISTS IN DB
dbController.checkForArtist = (req, res, next) => {
  dbQueries.checkForArtist(connPool, req.body.id, (err, result) => {
    if (err) return res.status(500).send(`Error checking DB for artist: ${err}`);

    // exit early if artist already exists
    if (result.rows[0].exists) {
      return res.send('Artist already exists in DB');
    }

    next();
  });
};

// POST DB-ARTISTS - ADD NEW ARTIST TO DB
dbController.addArtist = (req, res) => {
  dbQueries.addArtist(connPool, req.body, (err, result) => {
    if (err) return res.status(500).send(`Error adding artist to DB: ${err}`);

    return res.status(201).send('Artist added to DB');
  });
};

// POST DB-ALBUMS - ADD NEW ALBUM TO DB
dbController.addAlbum = (req, res) => {
	const addAlbum = (callback) => {
		dbQueries.addAlbum(connPool, req.body, (err, result) => {
			if (err) return callback(err);
			return callback(null, result);
		});
	};

	const addAlbumArtist = (callback) => {
		dbQueries.addAlbumArtist(connPool, req.body, (err, result) => {
			if (err) return callback(err);
			return callback(null, result);
		});
	};

	parallel([
		addAlbum,
		addAlbumArtist
	], (err, result) => {
		if (err) return res.status(500).send(`Error adding album to DB: ${err}`);

		return res.status(201).send('Album added to DB');
	});
};
