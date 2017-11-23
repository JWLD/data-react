const dbQueries = {};

// ARTISTS

dbQueries.addArtist = (connPool, data, callback) => {
  connPool.query(
    'INSERT INTO artists (name, spotify_id, spotify_img) VALUES ($1, $2, $3)',
    [data.name, data.id, data.img],
    callback
  );
};

dbQueries.checkArtist = (connPool, id, callback) => {
  connPool.query(
    'SELECT EXISTS(SELECT 1 FROM artists WHERE spotify_id = $1)',
    [id],
    callback
  );
};

// ALBUMS

dbQueries.addAlbum = (connPool, data, callback) => {
  connPool.query(
    'INSERT INTO albums (title, year, spotify_id, spotify_img) VALUES ($1, $2, $3, $4)',
    [data.title, data.year, data.album_id, data.spotify_img],
    callback
  );
};

dbQueries.checkAlbum = (connPool, id, callback) => {
	connPool.query(
		'SELECT EXISTS(SELECT 1 FROM albums WHERE spotify_id = $1)',
		[id],
		callback
	);
};

// ALBUMS-ARTISTS

dbQueries.addAlbumArtist = (connPool, data, callback) => {
	connPool.query(
		'INSERT INTO albums_artists (artist_id, album_id) VALUES ($1, $2)',
		[data.artist_id, data.album_id],
		callback
	);
};

dbQueries.checkAlbumArtist = (connPool, data, callback) => {
	connPool.query(
		'SELECT EXISTS(SELECT 1 FROM albums_artists WHERE artist_id = $1 AND album_id = $2)',
		[data.artist_id, data.album_id],
		callback
	);
};

dbQueries.getAlbumIds = (connPool, artistId, callback) => {
	connPool.query(
		'SELECT spotify_id FROM albums WHERE spotify_id IN (SELECT album_id FROM albums_artists WHERE artist_id = $1)',
		[artistId],
		callback
	);
};

module.exports = dbQueries;