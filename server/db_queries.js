const dbQueries = {};

dbQueries.checkForArtist = (connPool, id, callback) => {
  connPool.query(
    'SELECT EXISTS(SELECT 1 FROM artists WHERE spotify_id = $1)',
    [id],
    callback
  );
};

dbQueries.addArtist = (connPool, data, callback) => {
  connPool.query(
    'INSERT INTO artists (name, spotify_id) VALUES ($1, $2)',
    [data.name, data.id],
    callback
  );
};

module.exports = dbQueries;
