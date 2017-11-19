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
    'INSERT INTO artists (name, spotify_id, spotify_img) VALUES ($1, $2, $3)',
    [data.name, data.id, data.img],
    callback
  );
};

dbQueries.addAlbum = (connPool, data, callback) => {
  connPool.query(
    'INSERT INTO albums (title, year, spotify_id, spotify_img, artist_id) VALUES ($1, $2, $3, $4, $5)',
    [data.title, data.year, data.spotify_id, data.spotify_img, data.artist_id],
    callback
  );
};

module.exports = dbQueries;
