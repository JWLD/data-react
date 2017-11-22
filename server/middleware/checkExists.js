const dbQueries = require('../db_queries');
const connPool = require('../db_connect');

const checkExists = module.exports = {};

checkExists.artist = (req, res, next) => {
	dbQueries.checkArtist(connPool, req.body.id, (err, result) => {
    if (err) return res.status(500).send(`Error checking DB for artist: ${err}`);

    // exit early if artist already exists
    if (result.rows[0].exists) return res.send('Artist already exists in DB');

    next();
  });
};
