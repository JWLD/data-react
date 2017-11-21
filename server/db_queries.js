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
    'INSERT INTO albums (title, year, spotify_id, spotify_img) VALUES ($1, $2, $3, $4)',
    [data.title, data.year, data.album_id, data.spotify_img],
    callback
  );
};

dbQueries.addAlbumArtist = (connPool, data, callback) => {
	connPool.query(
		'INSERT INTO albums_artists (artist_id, album_id) VALUES ($1, $2)',
		[data.artist_id, data.album_id],
		callback
	);
};

module.exports = dbQueries;
