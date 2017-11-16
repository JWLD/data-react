const connPool = require('../db_connect');
const dbQueries = require('../db_queries');

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

    return res.status(201).send(result);
  });
};
